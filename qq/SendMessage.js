"ui";
ui.layout(

    <vertical bg="#DEB887">
        <toolbar bg="#66CCFF">
            <horizontal>
                <text textSize="18sp" textColor="white" text="欢迎使用VKQQ养号" />
            </horizontal>
            <horizontal w="*" gravity="right">
                
            </horizontal>
        </toolbar>
        <text h="40" gravity="center_vertical" textSize="18sp" text="QQ群发辅助设置" marginTop="15" ></text>
            <horizontal gravity="center_vertical" marginTop="5" padding="0 10" > 
             
                <text  textSize="16sp" text="QQ群数量:" />
                <input  id="add_number" inputType="number"  w="100sp" text="5" />
                </horizontal>
                <horizontal>

                <checkbox id="wx1" text="QQ一" textSize="15sp" textColor="blue" marginTop="10"  marginLeft="30" checked="{{auto.q1=true}}" />
                <checkbox id="wx2" text="QQ二" textSize="15sp" textColor="blue" marginTop="10"   marginLeft="30" checked="{{auto.q2=false}}"/>

            </horizontal>

                <button id="send" w="130sp" marginLeft="120sp" marginTop="50sp" style="Widget.AppCompat.Button.Colored" text="保存脚本"/>

</vertical>
);

var number1;//群数量
var thread1;
var thread;
var split_content;
var WX1=null;
var WX2=null;

//启动线程
var mainth=threads.start(function(){
    ui.run(()=>{

        ui.wx1.on("check",function(checked){
            if(checked)
            {
                WX1=1;
            }
            if(checked==false)
            {
                WX1=null;
            }
            });
            
            
        ui.wx2.on("check",function(checked){
            
                if(checked)
                {
                    WX2=1;
                }
                if(checked==false)
                {
                    WX2=null;
                }
            });

        });
        ui.send.click(function(){

            number1=ui.add_number.getText();
          
           threads.start(Sava_config)
         thread1=threads.start(MianWx);
           
    
      
        });        
 
});

const fullid="com.tencent.mobileqq:id/";


function Sava_config()
{

   var config=new Array();
   config[0]=number1;
   if(WX1==null)
   {
       WX1=2;
   }
   if(WX2==null)
   {
       WX2=2;
   }
   config[1]=WX1;
   config[2]=WX2;
    var path="/sdcard/WelHelper/QQHelper/QQ群发消息配置.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(var i=0;i<config.length;i++)
    { 
         wite.writeline(config[i]);
         wite.flush();

    }
    toast("保存成功")
    wite.close();
}



var t;
var wemain;
var pinyin;
t=threads.start(function(){
    wemain=storages.create("end");
    // pinyin=require("pinyin.js")
    //toast(wemain)
    auto.waitFor();
    var path="/sdcard/WelHelper/QQHelper/QQ群发消息配置.txt";
    var array_config= read_content1(path);
    ui.run(()=>{

        ui.add_number.setText(array_config[0]);
   
        var b=false;
        if(array_config[1]!=2)
        {
            b=true;
            WX1=1;
        }
    ui.wx1.checked=auto.q1=b;
    b=false;
    if(array_config[2]!=2)
    {
        b=true;
        WX2=1
    }
    ui.wx2.checked=auto.q2=b;

    });
number1=ui.add_number.getText();
threads.start(STRTQQ)
t.interrupt();
  } ) ; 
  
var startqq;
function STRTQQ()
{

    startqq=storages.create("startQQ");
    var st=startqq.get("st");
    if(st!=undefined)
    {
        threads.start(MianWx);
        startqq.remove("st");
    }

}

var stop=0;
var read_content1=function(path)
{

    var path=path;
    var b=files.ensureDir(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;

}


function monitor()
{
    while(1)
    {
       
        sleep(3000)
        if(stop==1)
        {
            return 0;
        }
        if(text("稍后处理").exists())
        {
                
            click("稍后处理")
        }
       
    }
}


function MianWx()
  {
      threads.start(monitor)
    stop=0;
      var n=number1;
      var i=0;
      try{
      if(WX1==1&&WX2==1)
      {
        
          i=2;
      
      for(var j=0;j<2;j++)
      {
         number1=n;
          if(j==0)
          {
            app.launchApp("QQ");
              sleep(2000)
              click(300,1352);
              start_sendmes();
          }
          if(j>0)
          {
            app.launchApp("QQ");
              sleep(2000)
              click(774,1331)
              start_sendmes();
          }
      }
      return 1;
  }
  if(WX1==1)
  {
     
      app.launchApp("QQ");
      sleep(3000)
      click(324,1320);
      start_sendmes();
      return 1;
  }
  if(WX2==1)
  { 
      app.launchApp("QQ");
      sleep(2000)
      click(774,1331)
      start_sendmes();
      return 1;
  }
  
  }catch(e){
      toastLog(e.massage)
  }
  finally{
    stop=1;
   // toast(wemain)
   toastLog("正在结束");
   home();
   startqq.remove("st");
    wemain.put("endqq",1);
  threads.shutDownAll();
  }
  }

function contron(){
    while(1)
    {
        toast("monitor")
        sleep(5000)
        if(currentPackage()!="com.tencent.mobileqq"){
            if(currentPackage()!="com.baidu.input_huawei"){
        recents()
        sleep(2000)
        click("QQ")
        sleep(5000)
        }
        if(stop==1)
        {
            return 0;
        }
        }
    }
   
    }

  //在此执行发送
function start_sendmes()
{

    try{
    toast("请稍后");

    var file_path1="/sdcard/WelHelper/QQHelper/群发内容.txt";
    //得到分割字符串
 split_content=read_content(file_path1);
if(split_content==null){toastLog("文件内容为空,请往文件写内容");exit();}

threads.start(contron)//监控

sleep(6000)
while(currentActivity()!="com.tencent.mobileqq.activity.SplashActivity")
{
    toast("back")
    back();
    sleep(5000);
    if(textContains("消息").exists()){
        break;
        }
 
    if(text("联系人").exists()){
     break;
     }

    
}
sleep(1000)

    Add_Main(number1);

    }catch(e)
    {
        toastLog("错误信息"+e.message);
    }

}
var read_content=function(path)
{
   var path=path;
    var b=files.createWithDirs(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.read();
  if(str_content==""||str_content==undefined)
  {
    return null;
  }
  var split_content=str_content.split("#");
  ReadableTextFile.close();
    return split_content;

}

//读取文件 返回随机的一个内容
var read_file=function(file_content)
{
    j=-1;

    for(var i in file_content){
        j=j+1;
    }
    var ran=Math.floor(Math.random() * (j-1));
  
    //返回随机的一个值
    return file_content[ran];

}

var mesg=function(i)
{   

    try{
toast("xx")
   sleep(5000);
while(!text("联系人").exists()){
 back();
 
 sleep(6000)
 if(text("联系人").exists()){
     break;
     }
}sleep(3000)
   var contact=text("联系人").findOne(3000)
      if(contact==null){return 0;}
      else{contact=contact.bounds()
      
      if(contact==undefined){return 0}
      }
 sleep(1000);   
 var cx=contact.centerX();
 var cy=contact.centerY();
 toast("查找联系人坐标")
var ccx=new Array();
ccx[0]=cx;
ccx[1]=cy;
sleep(3000);
if(i!=0){
  click(cx,cy);   
  
}
sleep(2000)
if(!text("群聊").exists()){
    click(407,1710)
    }
  sleep(2000);
 var e=text("群聊").findOne(3000);  
if(e==null){return 0}

else{e=e.bounds()
if(e==undefined){return 0}

}

 click(Math.abs(e.centerX()),Math.abs(e.centerY()));  
   sleep(2000);
   return ccx;

    }catch(e)
    {
        toastLog("erro"+e.message)
    }

 }


 //拿到第一个群的坐标然后以这为起点
 var  serxy=function(bn)
 {  var X=bn.centerX();
    var Y=bn.centerY();
 var bc=new Array();
 bc[0]=X;bc[1]=Y;
 return bc;
 }
//判断是否有群组
 var qun=function()
 {
    var h=id(fullid+"dv_").boundsInside(0,0,device.width , device.height).find();
  //  toastLog(h.length)
   if(h.length<1){return 0}
    var k=h[h.length-1].bounds();
    if(k==undefined){return 0;}
    sleep(3000)
    if(h[h.length-1].checked()!=true)
   {
    click(Math.abs(k.centerX()),Math.abs(k.centerY()))
   }
   
}

//判断是否有禁言
 var bool=function()
 {
     sleep(3000);
 var b=text("全员禁言中").findOne(2000);
 var b1=textContains("禁言中").findOne(2000);
 
 if((b1!=null)||(b!=null))
 {
   return true;
 }
 
 else 
 {
     return false;
 }

 }
//判断是否有群广告
var guanggao=function()
{
    sleep(3000);
   var c=text("群公告").findOne(2000);
   if(c!=null)
   {
       var h=desc("我已阅读新公告").text("我知道了").findOne(2000);
       if(h!=null)
       {
           h=h.bounds()
           if(h==undefined){return 0;}
           sleep(3000);
           click(h.centerX(),h.centerY());
           sleep(3000);  
       }
       else if(h==null)
       {
           back();
       }
      
   }
}
//程序从以下代码开始
/**========================================================================= */
var Add_Main=function(inpu)
{
//打开群聊 并返回联系人的坐标
 var contact_xy=mesg();
 var contact_x=contact_xy[0];
 var contact_y=contact_xy[1];

 sleep(8000); 

 var bx=id(fullid+"d_n").findOne(3000);

 if(bx==null)
 {
    swipe(529,1527,529,480,1000);//滑动群
     sleep(4000);
     qun();
}


sleep(2000);
 //找到第一个群的坐标
 var bn=id(fullid+"d_n").findOne(3000);
 if(bn!=null){bn=bn.bounds()}
 else{return 0;}
  var gruopc=text("群聊").findOne(2000)
if(gruopc!=null){
    gruopc=gruopc.bounds()
}
else{return 0;}
 //
 var arrayxy=serxy(bn);
 //获取到坐标
 var XX=arrayxy[0];
 var YY=arrayxy[1];
 //下一步就是通过点击xx yy
 j=0;
 var con=0;
 var l=1;
//------------------------------------------
sleep(3000)
allgroup();

try{

    sleep(2000)
    mesg(0);//点击群聊
    //下一步就是点击群
    var count=inpu;
    clickGroup(count)

sleep(3000);

 

}
catch(e)
{
    toastLog("发生错误"+e.message)
}

}

      


function deal()
{
    
        // click(XX-100,YY);//点击群
    sleep(5000);
    //先判断判断是否有广告
    guanggao();
    sleep(1000);
    //再判断是否有禁言 if成立的话就是有禁言 直接返回
    if(bool())
    {
    sleep(2000);
    while(!desc("快捷入口").id(fullid+"ba3").exists()){
        back();
        
        sleep(6000)
        if(text("联系人").exists()){
            break;
            }
    }
  
    // continue;
    
    }
    sleep(3000)
    //最后再判断
        var send=text("发送").findOne(5000);
    
        if(send==null)
        {
            toastLog("not")
            return 0;
        }
        var rw=[]
        if(rw.length>0){
            
            rw.splice(0)}
    var random_str=read_file(split_content);
    rw.push(random_str)
    sleep(3000);
    //设置文本内容

    if(text("马上设置").exists())
    {
    
        var close= desc("已关闭").findOne(2000)
        if(close!=null)
        {
            sleep(2000)
            close.click()
            sleep(1500)
        }
    }
    setText(random_str)
    sleep(2000)

    //发送文本
    send.click();
    

}


function findGroup()
{
    var strname=false;
    var c=boundsInside(0,0,device.width,1650).id(fullid+"text1").find();
    for(let i=0;i<c.length;i++)
    {
        if(c[i].text()==""){continue;}
        else if(c[i].text()!="")
        {
            toastLog(c[i].text())
            strname=c[i].bounds();
            return strname;
            // return 0;
          
        }
      
    }

return false;
}

function allgroup()//判断第一个群的坐标是不是低于
{
    var res=findGroup();
    if(res){
        if(Math.abs(res.centerY())>device.height/2+100)
            {
                swipe(551,1626,551,950,1000);
                sleep(5000)
            }
    }

}

function clickGroup(count)
{
   var counts=Number(count);
    var strname=""
    var flag=1;
    while(1)
    {
        sleep(3000)
        var c=boundsInside(0,0,device.width,1650).id(fullid+"text1").find();
        if(strname==c[c.length-1].text())
        {
            toastLog("遍历完毕")
            return 0;
        }
        toastLog("第"+flag+"个");
        var index=0;
        for(let i=0;i<c.length;i++)
        {
            if(c[i].text()==""){continue;}
            else if(c[i].text()!="")
            {
               
               
                if(c[i].text()==strname)
                {
                    index=i;
                    break;
                }
              
            }
          
        }
        strname=c[c.length-1].text();
        toastLog(strname)
        for(let i=index+1;i<c.length;i++){
            if(c[i].text()==""){continue;}
            click (c[i].text())//点击群聊
            //判断是否进入群聊里面
            deal()
            counts--;
            sleep(5000)
            if(!boundsInside(0,0,device.width,device.height).text("群聊").exists())//如果存在就不反回
            {
                while(!desc("快捷入口").id(fullid+"ba3").exists()){
                    back();
                    
                    sleep(6000)
                    if(text("联系人").exists()){
                        break;
                        }
                }
                sleep(3000)
                mesg(1)
            }  
            if(counts<=0){
                toastLog("finish")
                    return 0;
            }   
        }
        sleep(3000)
        swipe(551,1626,551,950,1000);
        sleep(5000)
        current();

    }
    
return false;
}


function current(){
    var bser=className("android.widget.TextView").textContains("展示最近不活跃的群").findOne(2000);
    if(bser!=null)
    {
        swipe(693,1399,693,800,1000);
       var bser1=className("android.widget.TextView").textContains("展示最近不活跃的群").findOne(2000);
       if(bser1!=null){
           var bs=bser1.bounds();
       }
   else{return 0;}
      sleep(1000);
       click(Math.abs(bs.centerX()), Math.abs(bs.centerY()));//点击展开群
       sleep(5000)
      
       
    }
}


