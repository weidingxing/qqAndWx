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
            <scroll>
<vertical marginTop="5" padding="0 10">

    <text textSize="16sp" text="个人资料修改" />

<horizontal gravity="center_vertical" >
</horizontal>
<text text="功能选择" w="auto" textSize="15sp" id="sele" textColor="blue" />
<vertical marginLeft="30sp">
<checkbox id="cb1" text="头像" checked="{{auto.ph=false}}"  />
<checkbox id="cb2" text="昵称" checked="{{auto.vi=false}}"/>
<checkbox id="cb3" text="个性签名" checked="{{auto.tx=true}}"/>

</vertical>
<horizontal>

<checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginTop="50sp" marginLeft="50sp" checked="{{auto.option=false}}" />

<checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginTop="50sp" marginBottom="10" checked="{{auto.option2=false}}" />
</horizontal>

</vertical>
</scroll>
</vertical>

);

//定义全局变量
var fullID="com.tencent.mm:id/"
var voice_time1;
var vbtext="";//接受好友的选项
var chatid="";//好友的id
var arry_content;//保存第一个微信的微信号
var arry_secoder;//保存第二个微信的微信号
var th1;
var th2;
var file_content=new Array();
var photo=1;//图片
var videos=1;//视频
var text_con=1;//文字
var shooting=1;//拍摄
var voices=1;//语音
var multfun=[];
var much=0;//用户和多少个好友聊天
var WX1=null;//微信1的选择
var WX2=null;//微信2的选择
var chatid2="";//第二个微信的微信号
var wechatms="";
th2=threads.start(function(){
    ui.run(()=>{

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
        text_con=ui.cb3.getText()
      
    }
    if(checked==false)
    {
        text_con=1
     
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


})

  //保存所有配置
ui.save.click(function(){
    
 threads.start(conf )


threads.start(Sava_config);
//threads.start(MianWx);

}); 

});

function conf()
{

var k=0;  
if(text_con!=1)
{
  
    multfun[k]="个性签名";
    k++;
}
if(photo!=1)
{
   
    multfun[k]="头像";
    k++;
}
 if(videos!=1)
{
   
    multfun[k]="昵称";
    k++;
}

}

function Sava_config()
{
   let config=new Array();
   config[0]=photo;//头像
   config[1]=videos;//昵称
   config[2]=text_con;//个性签名

   if(WX1==null)
   {
       WX1=0;
   }
   if(WX2==null)
   {
       WX2=0;
   }
   config[3]=WX1;
   config[4]=WX2;
 
    let pathd="/sdcard/WelHelper/Personal_profile/个人资料配置.txt";
    files.ensureDir(pathd);
   let wites=open(pathd,mode="w",encoding="utf-8", bufferSize = 8192);

    for(let i=0;i<config.length;i++)
    {
        wites.writeline(config[i]);
        wites.flush();
    }
    toast("保存成功")
    wites.close();
    
}


/** ===========================保存配置文件======================*/

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
/*设置配置内容 */
var setTh1=threads.start(function(){
    
     photo=1;//图片
videos=1;//视频
text_con=1;//文字
shooting=1;//拍摄
voices=1;//语音
  
    wemain= storages.create("WECHAT");
    ui.run(()=>{
     //threads.start(set);

   let path="/sdcard/WelHelper/Personal_profile/个人资料配置.txt";
   let array_config= read_content1(path);

    let b=false;
    if(array_config[0]!=1)
    {
       
       
        b=true;
        photo=2;

    }
    ui.cb1.checked=auto.ph=b;//头像
    b=false;
    if(array_config[1]!=1)
    {
        b=true;
        videos=2;

    }
    ui.cb2.checked=auto.vi=b;//昵称
    b=false;
    if(array_config[2]!=1)
    {
        b=true;
        text_con=2;

    }
    
    ui.cb3.checked=auto.tx=b;//个性签名
    b=false;
    if(array_config[3]==1)
    {
        b=true;
        WX1=1;
    }
    ui.wx1.checked=auto.option=b;//设置第一个微信号
  
    b=false;
    if(array_config[4]==1)
    {
        b=true;
        WX2=1;
    }
    ui.wx2.checked=auto.option2=b;
});

sleep(2000);
threads.start(conf);
sleep(1000)
threads.start(st);//启动微信
setTh1.interrupt();
} );


function  read_content1(path)
{
    let b=files.ensureDir(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  let str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;

}




function MianWx()
{
   let i=0;

    try{
    if(WX1==1&&WX2==1)
    {
        
    
    for(let j=0;j<2;j++)
    {
        i=2;
      
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
toastLog("finish");
//th2.stop;engines.stopAll();
threads.shutDownAll();
}
}


function Main()//启动微信
{
toast("正在启动微信,请确保你的微信在首页");
sleep(8000);

var b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
    while(!b2)
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
        if(currentPackage()!="com.baidu.input_huawei")
        {
        recents();
        sleep(2000)
       
        var wx=text("微信").find()
        if(wx.length>0)
        {
            wx=wx[wx.length-1].bounds();
            click(wx.centerX(),Math.abs(wx.centerY()))
        }
        sleep(2000)
    }
        }
    b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
    var mm=id("com.tencent.mm:id/cns").findOne(2000)
  //  toastLog(mm)
    if(b2==true||mm!=null) {break;}
    sleep(3000);
   // back();
    }
sleep(2500)
click(969,1723)//点击我
sleep(3000)
click(173,358)//点击头像


sleep(3000)
try{
   

for(let i=0;i<multfun.length;i++)
{
    sleep(3000)
 
    if(multfun[i]=="头像")
    {
        sleep(2000)
        main_ico();
        continue;

    }
    if(multfun[i]=="昵称")
    {
        sleep(2000)      
        nickName();
        continue;
    }
    if(multfun[i]=="个性签名")
    {
        sleep(2000)
        moreF();
    }
}

}catch(e)
{
    toastLog("错误信息"+e.massage)
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
       sleep(2000)}
       }
   b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
   var mm=id("com.tencent.mm:id/cns").findOne(2000)
 //  toastLog(mm)
   if(b1==true||mm!=null) {break;}
   sleep(1000);
  // back();
    }
sleep(1500)
click(139,1731)
sleep(2000)
}

//修改头像
function main_ico()
{


sleep(3000)
click("头像")
sleep(4000)
click("所有图片")
sleep(5000)
if(!textContains("微信头像").exists())
{
swipe(829,1322,829,654,1500)
}
sleep(6000)
if(!textContains("微信头像").exists())
{
    sleep(2000)
    var j=textContains("微信头像").findOne(3000)
    if(j!=null){
        var v=j.bounds();
        if(v!=undefined){
            click(v.centerX(),v.centerY())
            sleep(2000)
            }
        }
    else{
    toast("找不到文件夹 将使用默认文件夹")
    sleep(2000)
   // back();
     click("所有图片")
    sleep(2000)
    //return 1;
    }
}
else{
    sleep(2000)
    click("微信头像")
}
sleep(3000)
let ran=Math.floor(Math.random() * 5);
while(ran>0)
{
    toastLog("选择图片中")
    swipe(678,1534,687,354,990);
    sleep(2500)
    ran--
    if((ran%2)==0)
    {
        swipe(678,354,678,1520,1200)
        sleep(2500)
        }
  
}
try{
let n=className("android.widget.RelativeLayout").id(fullID+"f4b").find()
if(n.length>0)
{
    toastLog("正在选图片")
    let r=Math.floor(Math.random() * n.length-1);
    if(r<1||r>n.length)
    {
        r=1;
    }
    let h=n[r].bounds();
    if(h==undefined){return 0;}
    sleep(3000)
    click(h.centerX(),h.centerY())
    sleep(2000)
     click("确定")
     sleep(5000)
     if(textContains("正在上传头像").exists())
     {sleep(6000)}
     waitForActivity("com.tencent.mm.plugin.setting.ui.setting.SettingsPersonalInfoUI",10000)
     
}
else{
    toastLog("查找不到相片");
    sleep(1500)
    return 0;
    }
}catch(e){
    toastLog(e.massage)
}

}
//修改昵称
function nickName()
{
    sleep(2000)
    click("昵称");
   let pathnick="/sdcard/WelHelper/Personal_profile/昵称修改.txt"
  
   let nick= read_content(pathnick);
   if(nick==null)
   {
       sleep(2000)
       click(40,137)
       return 1;
   }
   else
   {
    let rn=Math.floor(Math.random() * ((nick.length)-1));
    sleep(3000)
    setText(nick[rn]);
    sleep(2000)
    click("保存")
    sleep(4000)
   }

}

//更多功能 
function moreF()
{
    sleep(3000)
    click("更多")
    sleep(2000)
   let pathn="/sdcard/WelHelper/Personal_profile/个性签名.txt"
   let sign= read_content(pathn);

 //  toastLog(sign)
   if(sign==null)
   {
       sleep(2000)
       click(40,137)
       return 1;
   }
sleep(2000)
   click("个性签名")
   sleep(5000)
   let sig=Math.floor(Math.random() * ((sign.length)-1));
   setText(sign[sig])
   //toastLog(sign[sig])
   sleep(2000)
   click("保存");
   sleep(5000)
   back();
   sleep(2000)
  // back();
}


/*===============================================================================================================*/
//读一个文件的内容
function read_content(path)
{
 
   
    let b=files.ensureDir(path);
    console.log(b);
   let ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  let str_content=ReadableTextFile.read();
  if(str_content==""||str_content==undefined)
  {
      toastLog("文件内容为空!");
      sleep(1000);
    return null;
  }
  let split_content=str_content.split("#");
  ReadableTextFile.close();
    return split_content;

}
