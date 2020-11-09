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
        <scroll>
        <vertical marginTop="5" padding="0 10" >
            <text h="40" gravity="center_vertical" textSize="18sp"  textColor="black" text="养号设置" />
                <text h="40" gravity="center_vertical" textSize="18sp" text="QQ加群辅助设置"></text>
                <horizontal gravity="center_vertical" > 
                <text  textSize="16sp" text="加群数量:" />
                <input  id="add_group" inputType="number" w="100sp"  />
                </horizontal>
                <horizontal gravity="center_vertical" > 
                <text textSize="16sp" text="加群问题回答:" />
                <input id="asr" w="100sp"  />
                </horizontal>
                <horizontal>
                <checkbox id="wx1" text="QQ一" textSize="15sp" textColor="blue" marginTop="10"  marginLeft="30" checked="{{auto.q1=true}}" />
                 <checkbox id="wx2" text="QQ二" textSize="15sp" textColor="blue" marginTop="10"   marginLeft="30" checked="{{auto.q2=false}}" />
                </horizontal>
                <button id="addgroup" w="130sp" marginLeft="80sp" marginTop="20sp" style="Widget.AppCompat.Button.Colored" text="保存脚本"/>
                </vertical>

        </scroll>
        </vertical>

        );
        var text4;//有问题时回答的
        var number;//加群数
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

//加群按钮
        ui.addgroup.click(function(){

        number=ui.add_group.getText();//加群数量
        text4=ui.asr.getText();//加群问题
    threads.start(Sava_config)
  thread=threads.start(MianWx);
    
})


});        
 });

 const fullid="com.tencent.mobileqq:id/";
var startqq;
function STRTQQ()
{
    startqq=storages.create("startQQ");
    var s=startqq.get("st");
   
    if(s!=undefined)
    {
        toast("启动中")
        threads.start(MianWx);
        startqq.remove("st");
       
    }

}

var t;
var wemain;
t=threads.start(function(){
    wemain=storages.create("end")
    auto.waitFor();
    var path="/sdcard/WelHelper/QQHelper/QQ加群配置.txt";
    var array_config= read_content1(path);
    ui.run(()=>{

        ui.add_group.setText(array_config[0]);
        ui.asr.setText(array_config[1]);
        var b=false;
        if(array_config[2]!=2)
        {
            b=true;
            WX1=1;
        }
    ui.wx1.checked=auto.q1=b;
    b=false;
    if(array_config[3]!=2)
    {
        b=true;
        WX2=1
    }
    ui.wx2.checked=auto.q2=b;

    });
number=ui.add_group.getText();//加群数量
 text4=ui.asr.getText();//加
threads.start(STRTQQ)
t.interrupt();
  } ) ; 
  
  function Sava_config()
{

   var config=new Array();
   config[0]=number;
   config[1]=text4;
   if(WX1==null)
   {
       WX1=2;
   }
   if(WX2==null)
   {
       WX2=2;
   }
   config[2]=WX1;
   config[3]=WX2;
    var path="/sdcard/WelHelper/QQHelper/QQ加群配置.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(var i=0;i<config.length;i++)
    { 
         wite.writeline(config[i]);
         wite.flush();

    }
    toast("保存成功")
    wite.close();
}

var read_content1=function(path)
{

    var path=path;
    var b=files.ensureDir(path);
    console.log(b);
    var ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;

}
var stop=0;
function monitor()
{
    while(1)
    {
        
        sleep(5000)
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


function contron(){
    while(1)
    {
        if(stop==1)
        {
            return 0;
        }
        sleep(3000)
        if(currentPackage()!="com.tencent.mobileqq"){
            if(currentPackage()!="com.baidu.input_huawei"){
        recents()
        sleep(2000)
        click("QQ")
        sleep(5000)
        }
        }
    }
  
    
    }

  function MianWx()
  {
      var i=0;
      var number1=number;
     
      try{
      if(WX1==1&&WX2==1)
      {
        
          i=2;
      
      for(var j=0;j<2;j++)
      {
         number=number1;
          if(j==0)
          {
            app.launchApp("QQ");
              sleep(2000)
              click(300,1352);
              start_Main();
          }
          if(j>0)
          {
            app.launchApp("QQ");
              sleep(2000)
              click(774,1331)
              start_Main();
          }
      }
      return 1;
  }
  if(WX1==1)
  {
     
      app.launchApp("QQ");
      sleep(3000)
      click(324,1320);
      start_Main();
      return 1;
  }
  if(WX2==1)
  { 
      app.launchApp("QQ");
      sleep(2000)
      click(774,1331)
      start_Main();
      return 1;
  }
  
  }catch(e){
      toastLog("发生异常"+e.massage)
  }
  finally{
    stop=1;
    home();
    toastLog("正在结束");
    startqq.remove("st");
    wemain.put("endqq",1)
  
    //exit();
  threads.shutDownAll();
  }
  }

//在此执行加群操作
function start_Main(){
    toast("正在启动QQ,请确保你的QQ在聊天首页哪里");
threads.start(monitor)
sleep(5000)
threads.start(contron)
while(currentActivity()!="com.tencent.mobileqq.activity.SplashActivity")
{
    back();
    sleep(3000);
    if(currentPackage()!="com/tencent.mobileqq")
    {
        recents()
        sleep(2000)
        click("QQ")
    }
}

sleep(2000)
click("消息");
sleep(2000)

var file_path="/sdcard/WelHelper/QQHelper/加群内容关键词.txt";
split_content= read_content(file_path);

if(split_content==null){toastLog("文件内容为空,请往文件写内容");exit();}

var random_content=read_file(split_content);
//start();

Add_Group_Main(random_content);//搜索群
var bn=Number(number)
sleep(4000)
groupName(bn);

sleep(3000);
while(1)
{
   
    back();
    sleep(3000);
    if(text("联系人").exists())
    {
     break; 
    }
}


}
var read_content=function(path)
{
   var path=path;
    var b=files.ensureDir(path);
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

var judge=function(text)
{
if((text=="等待加入该群")||(text=="已加入该群"))
{
    return true;
}
return false;

}

var Add_Group_Main=function(text)
{
    try{
    toast("正在执行操作,请勿触碰屏幕");
    sleep(1500);
    if(!desc("快捷入口").exists())
    {
    sleep(1000)
     click("消息")
     sleep(2000)
    }
    desc("快捷入口").click();
    sleep(2500);
    desc("加好友/群按钮").click();
    sleep(2500);
    desc("找群，按钮").text("找群").click();
    className("android.widget.EditText").text("搜索群号/群名称").click();
    sleep(3000);
    if (text=="")
    {
        text="王者"
    }
    className("android.widget.EditText").text("搜索群号/群名称").setText(text);
    sleep(3000)
    click(1055,1405);//点击确定
    sleep(2000)
    if(!id("ie4").exists())
    {
        click(1024,1545)
        sleep(1000)
        click(1037,1730)
        sleep(100)
        click(1037,1730)
      
    }
    toast("正在查找加入按钮");
    sleep(4000);
    }catch(e)
    {
        toastLog("错误信息="+e)
    }
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


function groupName(bn)
{
    toast("查找中"+bn)
    sleep(5000)
    var index=0;
    var flag=0;
    while(1)
    {
        try{
      
        var gorup=boundsInside(0,190,device.width,1799).depth(18).text("加入").find()//先查找有多少个没有加入的群
        toastLog(gorup.length)
        if(gorup.length<1)
        {
            toastLog("找不到群")
            return false;
        }
        for(let i=0;i<gorup.length;i++)
        {
                var cy;
                if(cy=gorup[i].bounds())
                {
                    cy=Math.abs(cy.centerY());
                    var xy=gorup[i].bounds();
                    var findNumber=boundsInside(0,cy,device.width,cy+200).className("android.view.View").depth(18).findOne(3000)
                    index++;
                    if(findNumber!=null&&findNumber.text()>100)
                    {
                        toastLog("正在加入")
                        sleep(3000)
                        click(Math.abs(xy.centerX()),Math.abs(xy.centerY()))
                        sleep(3000)
                       
                        var res=aGroup();//加群处理
                        if(res==-1)
                        {
                            return 0;
                        }
                        flag++;//判断是否加群频繁
                        if(flag>=bn)
                        {
                            toastLog("完毕")
                            return 0;
                        }
                     
                    }
                    else
                    {
                        toastLog("此群数量小于100")
                        sleep(1000)
                    }
                }
                else
                {
                    index++;
                    toastLog("invalid")
                    //循环下一个
                }
        }
        //滑动
            swipe(300,1700,320,100,1000)
            sleep(4000)
    }catch(e)
    {
        toastLog("加群错误"+e.massage);
        return 0;
    }
    }
        
}

function aGroup()
{

    sleep(3000);
    var join=text("加入").exists();
    if(join)
    {
        return 0;
    }
//  判断是否有支付功能
    if(text("立即支付").exists()){
        sleep(1500);
       id(fullid+"ivTitleBtnLeft").click();
     
       sleep(2000)
     return 0;
    }
    sleep(1000);
//      判断是否需要输入答案
    var h=text("输入答案").findOne(3000);
    //判断是否有问题 有就随便输入一个答案
    if(h!=null){
        sleep(2000)
        setText(text4);
        }
    sleep(2000);
    click("发送");
    sleep(3000);
    //判断答案是否错误
    if(className("android.widget.TextView").text("答案错误").exists())
    {
        var ser=id(fullid+"ivTitleBtnLeft").findOne(2000);
        if(ser==null)
        {
            back();
            return 0;
        }
        ser.click();
        sleep(2000);
       return 0;
    }

    sleep(5000);

    if(text("发送").exists())
    {
        click("发送")
        sleep(4000)
        if(text("发送").exists())
        {
            toast("今天你加群频繁,系统自动结束")
            return -1;
        }

       
    }

    if(text("关闭").exists())
    {
        sleep(2000);

        click("关闭");
        sleep(1000)
        toast("添加群成功");
             
    }
    sleep(2000);
  
    sleep(2000)
    var join=text("加入").exists();
    while(join==false)
    {
        back();
        sleep(2000);
        join=text("加入").exists();
        if(join==true)
        {
            sleep(2000)
           
            break;
        }
    }

 }  