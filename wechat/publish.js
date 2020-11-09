"ui";
ui.layout(
<vertical bg="#DEB887">
<toolbar bg="#66CCFF">
 <horizontal>
  <text textSize="18sp" textColor="white" text="保存脚本配置" />
        </horizontal>
        <horizontal w="*" gravity="right">
        </horizontal>
    </toolbar>
 
   
    <horizontal marginTop="30">
    <text text="微信朋友圈发布设置" textSize="18sp"></text>
   
    </horizontal>
   <text text="功能选择" textColor="blue" textSize="18sp" marginTop="50" marginLeft="30"/>
   <vertical>

   <checkbox id="cb1" text="发布图片"  marginLeft="30"  marginTop="10" checked="{{auto.ph=false}}"  />
    <checkbox id="cb2" text="发布视频"  marginLeft="30"  marginTop="10"  checked="{{auto.vi=false}}"/>
      <checkbox id="cb3" text="拍摄图片或视频"  marginLeft="30"  marginTop="10" checked="{{auto.pa=false}}"/>
      <checkbox id="cb4" text="发布文字"  marginLeft="30"  marginTop="10"  checked="{{auto.tx=false}}"/>
   </vertical>
   <horizontal>


   <checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginTop="30"  marginLeft="30"  checked="{{auto.option=false}}"/>
      <checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginTop="30"   marginLeft="30" checked="{{auto.option2=false}}"/>
   </horizontal>
   <text text="提醒:拍摄功能系统会随机选择拍摄图片或拍摄视频" textColor="red" textSize="15sp"  marginLeft="30"  marginTop="10" />
   <button marginTop="20" textSize="15sp"  id="save1" text="保存并运行脚本" textColor="white" style="Widget.AppCompat.Button.Colored" />
   
</vertical>

);

var fullID="com.tencent.mm:id/"
var photo=1;
var videos=1;
var pv=1;
var text0=1;
var WX1=null;
var WX2=null;
var th1;
var mult_fun=[];
threads.start(function(){

ui.run(function(){

    ui.cb1.on("check",function(checked){
        if(checked)
        {
            photo=ui.cb1.getText()
           
        }
        if(checked==false)
        {
            photo=1
           
        }
        });

    ui.cb2.on("check",function(checked){
    if(checked)
    {
        videos=ui.cb2.getText()
       
    }
    if(checked==false)
    {
        videos=1
       
    }
    });

    ui.cb3.on("check",function(checked){
        if(checked)
        {
            pv=ui.cb3.getText()
           
        }
        if(checked==false)
        {
            pv=1
           
        }
        });

        ui.cb4.on("check",function(checked){
            if(checked)
            {
                text0=ui.cb4.getText()
               
            }
            if(checked==false)
            {
                text0=1
               
            }
            });
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

ui.save1.click(function(){

  
    mult_fun.splice(0,mult_fun.length);  
    threads.start(conf);
   // sleep(500)
  
    threads.start(Sava_config_check);
  // th1=threads.start(MianWx);

});
});
} );


function conf()
{
    if(photo!=1)
    {
        photo="图片";
        mult_fun.push(photo);
    }
    if(videos!=1)
    {
        videos="视频";
          mult_fun.push(videos);

    }
    if(pv!=1)
    {
        pv="拍摄";
        mult_fun.push(pv);
    }
    if(text0!=1)
    {
        text0="文字";
        mult_fun.push(text0);
    }
}

function Sava_config_check()
{
   let config=new Array();
   config[0]=photo;
   config[1]=videos;
   config[2]=pv;
   config[3]=text0;
  // toastLog(config[3])
   if(WX1==null)
   {
       WX1=0;
   }
   if(WX2==null)
   {
       WX2=0;
   }
   config[4]=WX1;
   config[5]=WX2;
   //toast(config.length)
    let path1="/sdcard/WelHelper/朋友圈发布.txt";
    wite=open(path1,mode="w",encoding="utf-8", bufferSize = 8192);
    for(let i=0;i<config.length;i++)
    {
        //toast(config[i])
        wite.writeline(config[i]);
        wite.flush();
    }
    toast("保存成功")
    wite.close();
    
}
var s;
function st(){

  s=storages.create("start");
var b=s.get("s");
  if(b!=undefined)
  {
    thread=threads.start(MianWx);
    s.remove("s");
  }
} 
var wemain;
var setTh1=threads.start(function(){
    ui.run(()=>{
    
    wemain= storages.create("WECHAT");
    let path4="/sdcard/WelHelper/朋友圈发布.txt";
   let array_config= read_content1(path4);
    var b=false;
  toastLog(array_config.length);

    if(array_config[0]!=1)
    {
       
       
        b=true;
        photo=2;

    }
    ui.cb1.checked=auto.ph=b;//设置第一个微信号
    b=false;
    if(array_config[1]!=1)
    {
        b=true;
        videos=2;

    }
    ui.cb2.checked=auto.vi=b;//设置第一个微信号
    b=false;



    if(array_config[2]!=1)
    {
        b=true;
        pv=2;

    }
    ui.cb3.checked=auto.pa=b;//设置第一个微信号
    b=false;
//toastLog(array_config[2])
  if(array_config[3]!=1)
    {
        b=true;
        text0=2;

    }
    ui.cb4.checked=auto.tx=b;//设置第一个微信号
    b=false;

    if(array_config[4]==1)
    {
        b=true;
        WX1=1;
    }
    ui.wx1.checked=auto.option=b;//设置第一个微信号
  
    b=false;
    if(array_config[5]==1)
    {
        b=true;
        WX2=1;
    }
    
    ui.wx2.checked=auto.option2=b;
});
threads.start(conf);
sleep(1000);
toast("启动中...")
threads.start(st);
setTh1.interrupt();
} );

function read_content1(path)
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

function MianWx()
{
    let i=0;
    try{
    if(WX1==1&&WX2==1)
    {
        
        i=2;
    
    for(let j=0;j<2;j++)
    {
        app.launchApp("微信");
        if(j==0)
        {
            sleep(2000)
            click(300,1352);
            Main();
        }
        if(j>0)
        {
            sleep(2000)
            click(774,1331)
            Main();
        }
    }
    return 1;
}
if(WX1==1)
{
    
    app.launchApp("微信");
    sleep(3000)
    click(324,1320);
    Main();
    return 1;
}
if(WX2==1)
{ 
    app.launchApp("微信");
    sleep(2000)
    click(774,1331)
    Main();
    return 1;
}

}catch(e){
    toastLog(e.massage)
}
finally{
    wemain.put("wx",1);
toast("finish")
threads.shutDownAll();
}
}
function Main()
{
    // toastLog(mult_fun)
  sleep(4000)
    // waitForActivity("com.tencent.mm.ui.LauncherUI");
       sleep(1000)
       sleep(2000)
       let b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
       while(!b1)
       {
        if(text("发现").exists())
        {
            break;
        }
        toast("back")
        back()
        sleep(5000)
        if(currentPackage()!="com.tencent.mm"){
            sleep(1000)
            if(currentPackage()!="com.baidu.input_huawei"){
            recents();
            sleep(2000)
            var wx=text("微信").find()
            if(wx.length>0)
            {
                wx=wx[wx.length-1].bounds();
                click(wx.centerX(),Math.abs(wx.centerY()))
            }
            sleep(2000)
            sleep(2000)}
            }
        b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
        var mm=id("com.tencent.mm:id/cns").findOne(2000)
      //  toastLog(mm)
        if(b1==true||mm!=null) {break;}
        sleep(1000);
       // back();
       }
       sleep(2000)
        click(677,1709)
        sleep(3000)
        click(559,274)//点击朋友圈
        sleep(3000)
        pub();
        toastLog("发布完成")
      sleep(2000)
        let b12=id("com.tencent.mm:id/cns").text("通讯录").exists();
        while(!b12)
        {
            sleep(1000)
            b12=id("com.tencent.mm:id/cns").text("通讯录").exists();
            if(b12==true) break;
            sleep(2000);
            back();
            sleep(1500)
            if(text("退出").exists()){
                
                click("退出")
        }
        if(text("不保留").exists()){
            click("不保留")
            }

            if(currentPackage()!="com.tencent.mm"){
                sleep(1000)
                if(currentPackage()!="com.baidu.input_huawei"){
                recents();
                sleep(2000)
                var wx=text("微信").find()
                if(wx.length>0)
                {
                    wx=wx[wx.length-1].bounds();
                    click(wx.centerX(),Math.abs(wx.centerY()))
                }
                sleep(2000)
                sleep(2000)}
                }
            
        }
}

function pub()
{
var ftext=0;
var fp=0;
try{
toast("l="+mult_fun)
 for(let i=0;i<mult_fun.length;i++)
     {
       
        if(mult_fun[i]=="文字")
        {
            ftext++;

        }
        if(mult_fun[i]=="图片")
        {
            fp++;
        }
        if(i>0)
        {
            if(mult_fun[i]==mult_fun[i-1])
            {
                continue;
            }
        }
        if(mult_fun[i]=="文字"&&ftext>1)
        {
            continue;
        }
        if(mult_fun[i]=="图片"&&fp>1)
        {
            continue
        }
        sleep(2000);
        toast(mult_fun[i])
        let c=className("android.support.v7.widget.LinearLayoutCompat").findOne(2000);
        if(c==null)
        {
            toast("查找不到控件,请更新脚本")
            return 1;
        }
if(mult_fun[i]=="文字")
{
    


    sleep(2000);
    c=c.bounds();//点击发布
    sleep(2000)
    longClick(c.centerX(),c.centerY())
    sleep(3000);
if(text("我知道了").exists())
{
    sleep(2000)
    click("我知道了");
    sleep(3000)
}
    sleep(3000)
    let path="/sdcard/WelHelper/publish/发布文字.txt";
   let text_p= read_content(path);
   if(text_p.length==0)
   {
       toast("文件内容为空")
       continue;
       }
   let random1= read_file(text_p);
   sleep(3000);
   setText(random1);
   sleep(2000)
   click("发表");
   sleep(5000)
    continue
}
        
    else if(c!=null)
        {
           c=c.bounds();//点击发布
            sleep(2000)
            click(c.centerX(),c.centerY())
            sleep(2000);
        }
        
        if(c==null)
        {
            return 1;
        }

        if(mult_fun[i]=="拍摄")
        {
            sleep(2000)
            click("拍摄")
            sleep(3000)
         picture(mult_fun[i]);//调用选相片的函数
         text("发表").waitFor();
         sleep(2000);
         let path="/sdcard/WelHelper/发布朋友圈.txt";
         let array_content=read_content(path);
        
         if(array_content!=null)
         {
            let random= read_file(array_content);
            sleep(3000);
            setText(random);
            sleep(2000)
            click("发表");
            sleep(5000)
         }
         
        }

        if(mult_fun[i]!="拍摄")
        {
            click("从相册选择");
            sleep(3000)
        }
       

        if(text("我知道了").exists())
        {
            click("我知道了")
            sleep(2000)
        }
        sleep(2000);
        if(mult_fun[i]=="视频")
        {
            sleep(3000)
            click("图片和视频")
            sleep(3000)
            click("所有视频")
            sleep(3000)
        }
        if( mult_fun[i]=="图片"||mult_fun[i]=="视频")
        {

        picture(mult_fun[i]);//调用选相片的函数
        text("发表").waitFor();
        sleep(2000);
        var path="/sdcard/WelHelper/发布朋友圈.txt";
        var array_content=read_content(path);
      
        if(array_content!=null)
        {
           var random= read_file(array_content);
           sleep(3000);
           //setText(random);
        }
        sleep(2000);
        click("发表");
        sleep(5000)
       }

    }

}catch(e)
{
    toastLog(e.message)
}
finally
{
    while(currentActivity()!="com.tencent.mm.ui.LauncherUI")
    {
        sleep(3000);
        back();
        sleep(3000);
          //sleep(1500)
            if(text("退出").exists()){
                
                click("退出")
        }
        if(text("不保留").exists()){
            click("不保留")
            }
            if(text("通讯录").exists())
            {
                break;
            }

            if(text("通讯录").exists())
            {
            return 0
            }

    }
}

}

 

    /**=================================随机发送图片 */
function picture(texts)
{
    
    var random=Math.floor(Math.random() * 5);
    toast(random)
    if(random>2)
    {
        swipe(396,1408,396,500,1000);
    }
    sleep(3000)
if(texts=="图片")
{

    try{
    var voice=id(fullID+"dm8").find();//查找图片的控件
    var ran=Math.floor(Math.random() * 10);
    var len=voice.size();
    
    if(ran>=len&&len>5)
    {
        ran=5;
    }
    if(ran<4&&len>4)
    {
        ran=5;
    }
    if(len<4)
    {
        swipe(678,354,687,1534,1000);
        sleep(2000)
        ran=1;
    }
    var i=1;
    voice.forEach(item =>{
        var b=item.bounds();
        if(b==undefined){return 0;}
        var x=b.centerX();
        var y=b.centerY();
        if(i==ran)
        {
           
            sleep(3000)
            click(x,y)
            sleep(2000)
            i++;
            var l=id(fullID+"ch").findOne(3000);
            if(l!=null)
            {
                sleep(2000);
                l.click();//点击发送
                sleep(4000)
            }
            
            return -1;
        }
       
       i++;
    
    });

    }catch(e){
        toastLog(e.message)
    }
}
if(texts=="视频")
{

    var voice1=id(fullID+"dm8").find();//查找视频的控件
    var ran1=Math.floor(Math.random() * 10);
    var len1=voice1.size();
    
    if(ran1>=len1&&len1>5)
    {
        ran1=5;
    }
    if(ran1<4&&len1>4)
    {
        ran1=5;
    }
    if(len1<4)
    {
        swipe(678,354,687,1534,1000);
        sleep(2000)
        ran1=1;
    }
    var i=1;
try{
    voice1.forEach(item =>{
        var b=item.bounds();
        if(b==undefined){return 0}
        var x=b.centerX();
        var y=b.centerY();
        if(i==ran1)
        {
            sleep(1000)
            click(x,y);//选择视频
            i++;
            sleep(3000);
            toast("请稍后")
            click("完成");
            sleep(2000);
            if(text("完成").exists())
            {
                click("完成")
                sleep(2000)
            }
            return 1;
        }
i++;
    
});

}catch(e){
    toastLog(e.message)
}

}

if(texts=="拍摄")
{
    var ran_number=Math.floor(Math.random() * 5);
    sleep(1500);
    click("拍摄");
    sleep(3000);
    if(ran_number<=2)
    {
        swipe(457,1611,682,1621,8000)
        sleep(3000);
        click("完成")
        sleep(2000);
        if(text("完成").exists())
        {
            click("完成")
        }
        return 1;
    }
    click(525,1607);//点击拍照
    sleep(3000)
    click("完成")
    sleep(2000)
    if(text("完成").exists())
    {
        click("完成")
        sleep(3000)
    }
    return 1;
    
 }

return 1;
}


function read_content(path)
{
   // var path="/sdcard/Downloadapp/config.txt";
   var path=path;
    var b=files.ensureDir(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.read();
  if(str_content==""||str_content==undefined)
  {
      toastLog("文件内容为空!");
      sleep(1000);
    return null;
  }
  var split_content=str_content.split("#");
  ReadableTextFile.close();
    return split_content;

}


var read_file=function(file_content)
{
    j=-1;

    for(var i in file_content){
        j=j+1;
    }
    var ran=Math.floor(Math.random() * (j-1));
 // toast(ran)
    //返回随机的一个值
    return file_content[ran];

}