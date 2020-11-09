"ui";
ui.layout(
<vertical>
 <toolbar bg="#66CCFF">
  <horizontal>
     <text textSize="18sp" textColor="white" text="脚本运行设置" />
        </horizontal>
          <horizontal w="*" gravity="right">
           <button id="save" text="保存脚本配置" textColor="white" style="Widget.AppCompat.Button.Borderless" />
           </horizontal>
            </toolbar>
        <vertical marginTop="5" padding="0 10">
        <text text="看一看功能脚本设置" textSize="18sp"> </text>
        <horizontal marginTop="30">
        <text text="浏览时间:" textSize="18sp"></text>
        <input id="bs" width="90sp" inputType="number" hint="分钟" textSize="18sp" ></input>
        </horizontal>
        <horizontal>

        <checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginTop="50sp" marginLeft="50sp" checked="{{auto.option=true}}" />

        <checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginTop="50sp" marginBottom="10"  checked="{{auto.option2=false}}" />
        </horizontal>
        </vertical>

  </vertical>

);

var contextID="dn"
var fullID="com.tencent.mm:id/"
var videoID="gbv"
var WX1=null;//微信1的选择
var WX2=null;//微信2的选择
var bs1=3;
var mainth;//主线程
var savath;//保存配置的线程
var mt;//启动程序
mainth=threads.start(function(){
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
ui.save.click(function(){

bs1=ui.bs.getText();
if(bs1=="")
{
    bs1=3;
}
threads.start(MianWx);
savath=threads.start(Sava_config);
});

});

var read_content1=function(path)//读取文件保存的内容
{

    var path=path;
    var b=files.ensureDir(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;//返回的是一个数组

}
var s
function st(){

  s=storages.create("start");
  sleep(2000)
var b=s.get("s")
toastLog("b="+b);
  if(b!=undefined)
  {
    thread=threads.start(MianWx);
    s.remove("s");
  }
} 

var wemain;
//设置配置内容
var setTh=threads.start(function(){
    wemain= storages.create("WECHAT");
    ui.run(()=>{

    var path="/sdcard/WelHelper/看一看.txt";
   var array_config= read_content1(path);
   var w1=false;
   var w2=false;
   if(array_config[0]==1)
   {
       w1=true;
       WX1=1;
   }
   if(array_config[1]==1)
   {
       w2=true;
       WX2=1;
   }
ui.wx1.checked=auto.option=w1;//设置第一个微信号
ui.wx2.checked=auto.option2=w2;
ui.bs.setText(array_config[2]);

});
sleep(1000);
bs1=ui.bs.getText();
toast("启动中..")
sleep(1000)
threads.start(st);
setTh.interrupt();
} );

function Sava_config()
{

var config=new Array();
if(WX1==null)
{
    WX1=0;
}
if(WX2==null)
{
    WX2=0;
}
config[0]=WX1;
config[1]=WX2;

config[2]=bs1;
  
    var path="/sdcard/WelHelper/看一看.txt";//指定保存的路径
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);//打开一个文件以便写入文件
    wite.writeline(config[0]);//写入第一个微信号
    wite.flush();
    wite.writeline(config[1]);//写入第二个微信号
    wite.flush();
    wite.writeline(config[2]);
    wite.flush();
   
    toast("保存成功")
    wite.close();
    
}
var bs
function MianWx()
{
    let i=0;
    bs=bs1;//保存时间
    try{
    if(WX1==1&&WX2==1)
    {
        i=2;
    //bs1=bs;
    for(let j=0;j<2;j++)
    {
        bs1=bs;
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
    sleep(2000)
    click(300,1352);
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
    bs1=bs;
    bs1=bs1*1000;
    bs1=bs1*60;//1分钟

sleep(8000);
var b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
while(!b4)
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
    b4=id(fullID+"cns").text("通讯录").exists();
    var mm=id(fullID+"cns").findOne(2000)
  //  toastLog(mm)
    if(b4==true||mm!=null) {break;}
    sleep(3000);
   // back();
}

try{
sleep(3000)
click(688,1727);//点击发现
sleep(4500);
var ls=text("看一看").findOne(3000)
if(ls)
{
  let  l=ls.bounds();
    click(Math.abs(l.centerX()),Math.abs(l.centerY()))
}
sleep(4000)
waitForActivity("com.tencent.mm.plugin.topstory.ui.home.TopStoryHomeUI" ,5000);
sleep(5000)
click("精选")
while(!text("搜索").exists())
{
    toast("请稍后.....");
    sleep(4000)
}
sleep(3000)
var l=990;
while(bs1>0)
{
var x=Math.floor(Math.random() * 800);
if(x<100)
{
    x=200;
}
var y=Math.floor(Math.random() * 1600);
if(y<500)
{
    y=500;
}
sleep(2000)

click(x,y);//点击了文本或视频
sleep(3000)

if(text("轻触屏幕重新加载").exists())
{
   toast("您的网络不佳，请检查您的网络")
   sleep(2000)
   back();
   sleep(1000)
   sweps_log(i)
   continue;
}

if(text("无法打开页面").exists())
{
    toast("您的网络不佳，请检查您的网络")
    sleep(2000)
    back();
    sleep(1000)
    sweps_log(i)
    continue;
}

sleep(3000);
bs1=bs1-1000;
if(text("不看这个的原因").exists())
{
    sleep(2000)
    back();
   continue;
}
sleep(2000)
if(text("知道了").exists())
{sleep(1000)
    click("知道了");
}
if(text("精选").exists())
{
    continue;
}

sleep(2000)
fin();
sleep(2000);
bs1=bs1-2000;


while(currentActivity()!="com.tencent.mm.plugin.topstory.ui.home.TopStoryHomeUI")
{
    sleep(3000);
    back();
    sleep(3000);

    if(text("精选").exists()){break;}
    else if(text("通讯录").exists())
    {
        sleep(1000)
        click(519,750)
        sleep(4000)
        break;
    }
    else if(text("朋友在看").exists())
    {
        break;
    }
    bs1=bs1-3000;
}



l=l+2;
sweps_log(l);
}


var b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
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
}
catch(e)
{
    toastLog(e.massage)
}


}

function fin()
{
    sleep(3000);
    bs1=bs1-3000;
let h=id(fullID+contextID).findOne(3000);//查找文字的内容
let v=id(fullID+videoID).findOne(3000);
if(h!=null)//选择文字
{
    toast("你点进来了文字");
    sleep(1000)
    bs1=bs1-1000;
    var num=Math.floor(Math.random() * 10);
    if(num<3)
    {
        num=4;
    }
    num=num*1000;
    n=995;
    while(num>1)
    {
        sweps_log(n);//滑动文字
        sleep(1500);
        num=num-800;
        n++;
        sleep(1000);
        bs1=bs1-1000;
        if(text("写留言").exists()||text("用户热评").exists())
        {
            sleep(4000)
            back();
            toast("返回")
            return 1;
        }
        toast(num)
    }
    if(bs1<1)
{
    return -1;
}
    back();
    return 1;
}

if(v!=null)//视频
{
    toastLog("你点进来了视频");
    sleep(1000)
    bs1=bs1-2000;
    var num=Math.floor(Math.random() * 15);
    if(num<6)
    {
        num=10;
    }
    num=num*1000;
    while(num>1)
    {
        sleep(1000)
        if(text("重试").exists())
        {
            toast("您的网络不佳，请检查您的网络")
            sleep(3000)
            break;
        }
        let i=Math.floor(Math.random() * 10);
        if(i<5)
        {
            i=6;
        }
        while(i>1)
        {
            sleep(5000);
            num=num-2000;
            bs1=bs1-5000;
            i--;
        }
        swipe(622,1666,622,300,1000);
        sleep(1500);
        num=num-2000;
        bs1=bs1-3000;
        toastLog("num="+num);
    }
if(bs1<1)
{
    return -1;
}
    back();
}

}

function sweps_log(i)
{
sleep(2000)

var ran1=Math.floor(Math.random() * 1000);

if(ran1<500)
{
    ran1=1000;
}
if(ran1==1000&&i>1000)
{
   
    swipe(657,358,659,ran1,1500);//向下滑
    sleep(5000);
    bs1=bs1-4000;
}
swipe(657,1700,659,ran1,1500);//向上滑
   sleep(5000);
   bs1=bs1-5000;
  

}
