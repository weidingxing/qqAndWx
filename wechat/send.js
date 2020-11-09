"ui";
var currentProcess='0';
var pwdlength=0;
var currentProcess2="0";
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
<horizontal gravity="center_vertical" >
    <text textSize="16sp" text="和指定好友聊天" />
          
<text text="" textColor="black" textSize="32sp" marginTop="32"/>
<input id="weid" hint="请以#号分割多个微信号" textSize="15sp" />
</horizontal>
<horizontal marginBottom="10">
    <text text="红包金额:" textColor="blue" textSize="15" ></text>
    <seekbar id="money" bg='#FF00FF' w="800px" paddingLeft="10" marginLeft="10" />

</horizontal>
<horizontal>
<text text="当前红包金额最大范围=" textColor="red"/>
<text id='currentProcess' text="{{currentProcess}}" textColor="red"/>
</horizontal>
<horizontal>
    <text text="转账金额:" textColor="blue" textSize="15"></text>
    <input id="tm" inputType="number" w="150" hint="输入最大转账金额"/>
</horizontal>
<horizontal>
    <text text="微信一支付密码:" ></text>
    <input id="pwd" inputType="numberPassword"  w="280px"/>

</horizontal>
<checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option=false}}"/>

<horizontal gravity="center_vertical" >
    <text textSize="16sp" text="和指定好友聊天" />
          
<text text="" textColor="black" textSize="32sp" marginTop="32"/>
<input id="weid2" hint="请以#号分割多个微信号" textSize="15sp" />
</horizontal>
<horizontal marginBottom="10">
    <text text="红包金额:" textColor="blue" textSize="15" ></text>
    <seekbar id="money2" max="200" bg='#FF00FF' w="800px" paddingLeft="10" marginLeft="10" />
    
</horizontal>
<horizontal>
<text text="当前红包金额最大范围=" textColor="red"/>
<text id='currentProcess2' text="{{currentProcess2}}" textColor="red"/>
</horizontal>

<horizontal>
    <text text="转账金额:" textColor="blue" textSize="15"></text>
    <input id="tm2" inputType="number" w="150" hint="输入最大转账金额"/>
</horizontal>
<horizontal>
    <text text="微信二支付密码:" ></text>
    <input id="pwdwx2" inputType="numberPassword"  w="280px"/>

</horizontal>


<checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option2=false}}"/>

<text text="功能选择" w="auto" textSize="15sp" id="sele" textColor="blue" />
<horizontal>
<checkbox id="cb1" text="图片 " checked="{{auto.ph=false}}"  />
<checkbox id="cb2" text="视频 " checked="{{auto.vi=false}}"/>
<checkbox id="cb3" text="文字 " checked="{{auto.tx=true}}"/>
<checkbox id="cb5" text="拍摄 " checked="{{auto.pa=false}}"/>
<checkbox id="cb4" text="语音 " checked="{{auto.voic=false}}"/>

</horizontal>
<horizontal>
    <checkbox id="cb6" text="红包 "  />
    <checkbox id="cb7" text="转账"  />
</horizontal>

<text marginTop="50" text="注意:第一次运行时会在手机存储里创建一个文件夹WelHelper,文件夹下有一个聊天内容.txt的文件,请往文件里写内容并以#号来结尾以便于分割多条内容
,当文件里有多条内容时系统会随机抽取一条内容来发送"/>

</vertical>
</scroll>
</vertical>

);
//定义全局变量
var pinyin;
var transfer;
var fullID="com.tencent.mm:id/"
var voice_time1;
var vbtext="";//接受好友的选项
var chatid="";//好友的id
var arry_content=[];//保存第一个微信的微信号
var arry_secoder=[];//保存第二个微信的微信号
var th1;
var th2;
var file_content=new Array();
var photo=1;//图片
var videos=1;//视频
var text_con=1;//文字
var shooting=1;//拍摄
var voices=1;//语音
var multfun=[];
var wechatid=[];
var config1
var config2
var much=0;//用户需要发送文字的数量
var WX1=null;//微信1的选择
var WX2=null;//微信2的选择
var chatid2="";//第二个微信的微信号
var k=0;   
th2=threads.start(function(){

    
    ui.money.setMax(200);
    
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

ui.cb4.on("check",function(checked){
    if(checked)
    {
        
        voices=ui.cb4.getText()
      
    }
  if (checked==false)
    {
        
        voices=1;
    }
      
    });

ui.cb5.on("check",function(checked){
    if(checked)
    {
        shooting=ui.cb5.getText()
      
    }
    if(checked==false)
    {
        shooting=1
      
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

ui.money.setOnSeekBarChangeListener({

    onProgressChanged: function(seekBar, progress, fromUser) {
    ui.currentProcess.setText(String(progress));
    },
  });

  ui.money2.setOnSeekBarChangeListener({

    onProgressChanged: function(seekBar, progress, fromUser) {
    ui.currentProcess2.setText(String(progress));
    },
  });

ui.save.click(function(){
   
    passwordwx1=ui.pwd.getText()
    toast(String(passwordwx1).length)
    passwordwx2=ui.pwdwx2.getText()
    if(String(passwordwx1).length!=6&&String(passwordwx2).length!=6)
    {
        toastLog("微信支付密码长度必须等于6,请重新输入")
        return 0;
    }

threads.start(fun1);
//threads.start(MianWx)
threads.start(Sava_config_check);


});

});

var  passwordwx1;
var  passwordwx2;
var wx1money,wx2money,wx1TransferMoney,wx2TransferMoney;
function Sava_config_check()
{

    let valuesv = "false";
    let flags = valuesv ==="false" ? false : true;
    var status= storages.create("functionstatus");
    status.put("redhat",ui.cb6.isChecked());
    status.put("transfer",ui.cb7.isChecked());

    var storage = storages.create("passwdewx1");
    storage.put("pwd",String(passwordwx1));
    storage.put("pwd2",String(passwordwx2));
    storage.put("currentmoney1",String(ui.currentProcess.getText()))
    wx1money=ui.currentProcess.getText();
    //toast("ttt"+wx1money)
    storage.put("currentmoney2",String(ui.currentProcess2.getText()))
    wx2money=ui.currentProcess2.getText()

    var transfermoney= storages.create("transfermoney");
    transfermoney.put("wx1money",String(ui.tm.getText()))
    wx1TransferMoney=ui.tm.getText();
    transfermoney.put("wx2money",String(ui.tm2.getText()))
    wx2TransferMoney=ui.tm2.getText()
   var config=new Array();
   config[0]=photo;
   config[1]=videos;
   config[2]=text_con;
   config[3]=voices;
   config[4]=shooting;
   if(WX1==null)
   {
       WX1=0;
   }
   if(WX2==null)
   {
       WX2=0;
   }
   config[5]=WX1;
   config[6]=WX2;
    var path="/sdcard/WelHelper/聊天好友功能.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(var i=0;i<7;i++)
    {
        wite.writeline(config[i]);
        wite.flush();
    }
   Sava_config();//保存微信号
    //sleep(2000);
    toast("保存成功")
    wite.close();
    
}

function fun1(){
    
    chatid=ui.weid.getText();//拿到第一微信号
 
    var chatid1=chatid.toString()
    chatid2=ui.weid2.getText();//获取第二个微信的微信号
    var chat=chatid2.toString();
    arry_content=chatid1.split("#");//拿到第一微信号
    arry_secoder=chat.split("#");//保存第二个微信的微信号

if(photo!=1)
{
   
    multfun[k]="图片";
    k++;
}
 if(videos!=1)
{
   
    multfun[k]="视频";
    k++;
}
 if(text_con!=1)
{
  toast(text_con);
  sleep(2000);
  
    multfun[k]="文字";
    k++;
}
if(shooting!=1)
{
    multfun[k]="拍摄";
    k++;

}
 if(voices!=1)
{
    
    multfun[k]="语音";
    k++
}

}



var s
var red=false;
var tr=false;
function st(){

  s=storages.create("start");
  sleep(1000)
var b=s.get("s");
  if(b!=undefined)
  {
      toast("start")
    thread=threads.start(MianWx);
    s.remove("s");
  }
} 
var wemain
var screen;
var getwx1TransferMoney,getwx2TransferMoney;
var setTh1=threads.start(function(){
    wemain= storages.create("WECHAT");
    var pwds = storages.create("passwdewx1");
    var sta= storages.create("functionstatus");
    let getTransferMoney= storages.create("transfermoney");
    ui.run(()=>{
        
    getwx1TransferMoney=getTransferMoney.get("wx1money")==undefined?"1":getTransferMoney.get("wx1money");
    getwx2TransferMoney=getTransferMoney.get("wx2money")==undefined?"1":getTransferMoney.get("wx2money");
    ui.tm.setText(getwx1TransferMoney);
    ui.tm2.setText(getwx2TransferMoney);
   
    red=sta.get("redhat");
    tr=sta.get("transfer");
    let value = "false";
    let flags = value ==="false" ? false : true;
    if(red==undefined)
    {
        red=flags;
    }
    if(tr==undefined)
    {
        tr=flags;
    }
    ui.cb6.setChecked(red);
    ui.cb7.setChecked(tr)
    var spwd=pwds.get("pwd");
    var spwd2=pwds.get("pwd2");
    
    
    var cm=pwds.get("currentmoney1")
    var cm2=pwds.get("currentmoney2")
    if(cm==undefined)
    {
        cm="1";
    }
    if(cm2==undefined)
    {
        cm2="1"
    }

    ui.money.setProgress(String(cm))
    ui.currentProcess.setText(String(cm));
    ui.currentProcess2.setText(String(cm2));
    wx1money=cm;wx2money=cm2;
    ui.money2.setProgress(String(cm2))
    if(spwd==undefined)
    {
        
        spwd="0";
    }
    if(spwd2==undefined)
    {
       
        spwd2="0";
    }
    ui.pwd.setText(spwd);
    ui.pwdwx2.setText(spwd2);
    passwordwx1=spwd;passwordwx2=spwd2;
    
    pinyin=require("pinyin.js")
    transfer=require("transfer.js")
    screen=require("screen.js")
    set();
    //threads.start(set)
    
    var path="/sdcard/WelHelper/聊天好友功能.txt";
   var array_config= read_content1(path);
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
        text_con=2;

    }
    ui.cb3.checked=auto.tx=b;//设置第一个微信号
    b=false;
    if(array_config[3]!=1)
    {
        b=true;
        voices=2;

    }
    ui.cb4.checked=auto.voic=b;//设置第一个微信号
    b=false;
    if(array_config[4]!=1)
    {
        b=true;
        shooting=2;

    }
    ui.cb5.checked=auto.pa=b;//设置第一个微信号
    b=false;
    if(array_config[5]==1)
    {
        b=true;
        WX1=1;
    }
    ui.wx1.checked=auto.option=b;//设置第一个微信号
  
    b=false;
    if(array_config[6]==1)
    {
        b=true;
        WX2=1;
    }
    ui.wx2.checked=auto.option2=b;
});
sleep(1000)
threads.start(fun1);
//
sleep(1000)
threads.start(st);
setTh1.interrupt();
} );

/** ===========================保存配置文件======================*/

function Sava_config()
{

   var config=new Array();
   config[0]=ui.weid.getText();//拿到第一个微信的微信号
   config[1]=ui.weid2.getText();//拿到第二个微信的微信号
    var path="/sdcard/WelHelper/wx1聊天好友配置.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    wite.write(config[0]);//写入第一个微信号
    wite.flush();
    var path1="/sdcard/WelHelper/wx2聊天好友配置.txt";
    wite1=open(path1,mode="w",encoding="utf-8", bufferSize = 8192);
    wite1.write(config[1]);//写入第一个微信号
    wite1.flush();
    toast("保存成功")
    wite.close();
    
}
function set()
{
    var path="/sdcard/WelHelper/wx1聊天好友配置.txt";
     config1= read_content2(path);
  
  ui.weid.setText(config1);//设置第一个微信号
  var path="/sdcard/WelHelper/wx2聊天好友配置.txt";
  config2= read_content2(path);
  ui.weid2.setText(config2)
}
    
var read_content2=function(path)
{

    var path=path;
    var b=files.ensureDir(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.read();
    ReadableTextFile.close();
    return str_content;

}

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
var password;
var Money;
var TransferAccount;
function MianWx()
{
    
    //threads.start(Sava_config_check)
    var i=0;
    try{
    if(WX1==1&&WX2==1)
    {
        i=2;
    
    for(var j=0;j<2;j++)
    {
        app.launchApp("微信");
        if(j==0)
        {
            sleep(2000)
            click(300,1352);
            wechatid=arry_content;
            password=passwordwx1;
            Money=wx1money;
            TransferAccount=getwx1TransferMoney;
            Main();
        }
        if(j>0)
        {
            sleep(2000)
            click(774,1331)
            wechatid=arry_secoder;
            TransferAccount=getwx2TransferMoney;
            password=passwordwx2;
            Money=wx2money;
            Main();
        }
    }
    return 1;
}
if(WX1==1)
{
    app.launchApp("微信");
    sleep(2000)
    wechatid=arry_content;
    password=passwordwx1;
   // toastLog("hh="+password)
    TransferAccount=getwx1TransferMoney;
    Money=wx1money;
    toastLog(wx1money);
    
    click(300,1352);
    Main();
    return 1;
}
if(WX2==1)
{
    app.launchApp("微信");
    sleep(2000)
    wechatid=arry_secoder;
    TransferAccount=getwx2TransferMoney;
    password=passwordwx2;
    Money=wx2money;
    click(774,1331)
    Main();
    return 1;
}

}catch(e){
    toastLog("错误信息"+e.massage)
}
finally{
    wemain.put("wx",1);
toast("finish")
threads.shutDownAll();
}
}


function BackMain(){

    var b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
while(b4==false)
{
    toast("back")
    back()
    sleep(5000)
    if(currentPackage()!="com.tencent.mm"){
        sleep(1000)
        if(currentPackage()!="com.baidu.input_huawei"){
        recents();
        sleep(2000)
        click("微信")
        sleep(4000)}
        }
    b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
    var mm=id("com.tencent.mm:id/cns").findOne(2000)
  //  toastLog(mm)
    if(b4==true||mm!=null) {break;}
    sleep(3000);
   // back();
}
}

function Main()
{
    //toastLog("ww="+password)
toast("正在启动微信,请确保你的微信在首页");
sleep(6000);
//waitForActivity("com.tencent.mm.ui.LauncherUI",3000);
sleep(1000)
try{
BackMain()
}catch(e){
    toastLog("错误信息"+e.message)
    }
sleep(2000)
click(140,1721);
sleep(2000)
className("android.widget.ListView").findOne(3000).scrollBackward();
sleep(2000)

var c=id(fullID+"f8y").findOne(3000);//点击搜索

if(c!=null)
{
  
    c=c.bounds()
    sleep(3000)
    click(c.centerX(),c.centerY());
    click(838,136); 
    sleep(3000)
  
}
else{
    sleep(1000)
    click(838,136);
    sleep(2000)
}
for(let i=0;i<wechatid.length-1;i++)
{
    toast("正在输入微信号")
    sleep(1000)
   if(wechatid[i]==undefined)
   {
       continue;
   }
sleep(2000)
setText(wechatid[i]);//输入微信号

sleep(5000)
var b=id("com.tencent.mm:id/b_l").findOne(3000);
var mk=id("com.tencent.mm:id/tm").findOne(3000);
var jk=idContains("com.tencent.mm:id/b_l").find();
if(b!=null||mk!=null||jk.length>0){
    sleep(3000)
// checkinvaild();
toast("find")
click(404,441)//点击联系人
    }
else if(b==null)
{
    toast("没有此联系人")
    sleep(2000);
    continue;
}


sleep(2000)
let exi=id(fullID+"aks").exists();
if(exi==false&&!text("发送").exists())
{
    toast("没有进入页面")
    sleep(2000)
    back();
    continue;
    }

/**功能的开始执行 */
for(var j=0;j<multfun.length;j++)
{
toastLog("聊天中")
try{
if(  j>0&&multfun[j]==multfun[j-1]){
    
    continue;
    }
    
    var rj=Math.floor(Math.random() * multfun.length-1);
    if(rj<0||rj>multfun.length){rj=0}
sleep(2000)
}catch(e){
    toastLog("r="+e.message)
    }
if(multfun[rj]=="图片"||multfun[rj]=="视频"||multfun[rj]=="拍摄")
{
toastLog("其他")
fun(multfun[rj]);

sleep(2000)

}

if(multfun[rj]=="文字")
{
    toastLog("文字");
    if(text("发送").exists())
    {
        text("发送").click();
    }
    setContent();
    sleep(2000)
   
}
if(multfun[rj]=="语音")
{
    toastLog("语音")
    var voice=id(fullID+"anc").desc("切换到按住说话").findOne(3000);
    if(voice!=null)
    {
        //sleep(3000)
        voice.click();
        sleep(3000);
        longClick("按住 说话");
    }
    
    else if(text("按住 说话").exists()){
        longClick("按住 说话");
        }
    else {
        click(62,1729)
        sleep(1000)
        longClick("按住 说话");
        }
    var ran=Math.floor(Math.random() * 30);
    if(ran<5)
    {
        ran=5;
    }
    swipe(157,1741,815,1741,ran*1000);
    sleep(5000)
    
}

}

try{

    if(red)
    {
        //第一个参数是金额 第二个时密码
      let newMoney=(Math.random()*Number(Money)).toFixed(2)
      toastLog("money="+newMoney)
        transfer.RedHat(newMoney,password);
    }
    if(tr)
    {
        let newMoney=(Math.random()*Number(TransferAccount)).toFixed(2)
        toastLog(newMoney);
        transfer.TransferAccount(newMoney,password)
    }
    if(desc("更多功能按钮，已折叠").exists()||text("发送").exists()
        ||currentActivity()=="com.tencent.mm.ui.LauncherUI")
    {
        threads.start(function a(){
            requestScreenCapture();
            
            });
            sleep(500);
        ranbs();//随机浏览聊天记录
        sleep(1500)
        swipe(692,1377,700,1000,1000)
        transfer.OpenRedhat();
        sleep(1500);
        delete_message();//是否有加群
    }
    

}catch(e){
    toastLog(e)
}
/**
 * 
 * 和一个好友聊天完后就退出
 * 此处有bug
 * 
 */
finally{
    sleep(2000)
    let cancel=text("取消").exists();
    while(!cancel)
    {
        back();
        sleep(2000)
        cancel=text("取消").exists();
        sleep(2000)
    }
}

}
/**
 * 和全部好友聊天完后
 * 
 */
toast("退出")
sleep(2000)

BackMain()

sleep(2000);

}
/**=========================================================================== */

function fun(vbtext)
{
  sleep(2000)
  if(text("发送").exists())
  {
   click("发送");
   sleep(2000)
  }
  try{
var pi=id(fullID+"aks").findOne(2000);
if(pi!=null){
    pi.click();
    }
sleep(1000)
}catch(e){
    toastLog("click"+e.message)
    }
if(vbtext=="拍摄")
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
        return 1;
    }
    click(525,1607);//点击拍照
    sleep(2000)
    click("完成")
    return 1;
    
 }
click("相册")
sleep(2000)
if(vbtext=="视频"){
click("图片和视频")
sleep(2000)
click("所有视频")
sleep(3000)
picture();
}
else {

    picture();

}

sleep(1500);

}
/**=================================随机发送图片 */
function picture()
{
    var random=Math.floor(Math.random() * 5);
    toast(random)
    if(random>2)
    {
        swipe(396,1408,396,500,1000);
    }
    
    sleep(3000)
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
    if(b==undefined){
        return 0
        }
    var x=b.centerX();
    var y=b.centerY();
    if(i==ran)
    {
       
        sleep(3000)
        click(x,y)
        sleep(2000)
        i++;
        var l=id(fullID+"ch").findOne(3000);
        sleep(2000);
        if(l!=null){
        l.click();//点击发送
        sleep(4000)
        }
    
        var bool=id(fullID+"aks").exists();
        if(bool==false)
        {
            back();
            sleep(2000)
        }
        return -1;
    }
   
   i++;

})
return 1;
}


/** 发送文字  */
function setContent()
{
    
    try{

    var path="/sdcard/WelHelper/聊天内容.txt"
    
    file_content=read_content(path);//读文件的内容此内容只读一次
    //toastLog("one="+file_content);
    if(file_content==null)
    {
        return 1;
    }
    var chatmuch=Math.floor(Math.random() * 3);
    
    if(chatmuch==0)
    {
        chatmuch=1;
    }

    for(let a=0;a<chatmuch;a++)
    {
       // toast("a="+a)
        var rw=[]
        if(rw.length>0){rw.splice(0)}
    var getContent=read_file(file_content);//返回随机的一个内容
   // toastLog(typeof(getContent))
    //getContent=getContent.toString();
    //rw.push(getContent)
     sleep(2000)
    if(desc("按住说话").id(fullID+"grk").exists())
    {
    sleep(2000)
    var keyboads=desc("切换到键盘");
    sleep(2000)
    keyboads.click();
    }
    sleep(3000);
    var send_face=Math.floor(Math.random() * 5);//设置随机性
    if(send_face<2)
    {
        
        facep();//设置发送表情
        sleep(3000)
       // input(getContent);
       var kl=idContains("g78").findOne(3000)
   if(kl!=null){
       var ky=kl.bounds()
       sleep(1500)
       if(ky!=undefined){
       click(ky.centerX(),ky.centerY())
       sleep(3000)
       let res=screen.CaptureMain(1);
       if(res==-1)
       {
           toastLog("键盘错误");
           return 0;
       }
     }  }
   
       pinyin.result_PinYin(getContent)

        sleep(3000)
        click("发送")
        sleep(1000)
        back();
        sleep(3000)
        continue;
    }
 if(send_face>=4)
 {
    
    toastLog("正在设置")
    sleep(3000)
    //input(getContent);
    var kl=idContains("g78").findOne(3000)
   if(kl!=null){
       toastLog("keyboads")
       var ky=kl.bounds()
       if(ky!=undefined){
       sleep(1500)
       click(ky.centerX(),ky.centerY())
       sleep(3000)
       let res=screen.CaptureMain(1);
       if(res==-1)
       {
           toastLog("键盘错误");
           return 0;
       }
       }}
   
    pinyin.result_PinYin(getContent)
    sleep(3000)
    facep();
    sleep(3000);
    click("发送")
    sleep(1000)
    back();
    sleep(3000)
    continue;
 }
   //setText(getContent);
   sleep(2000)
   var kl=idContains("g78").findOne(3000)
   if(kl!=null){
       toastLog("keyboads")
       var ky=kl.bounds()
       sleep(1500)
       if(ky!=undefined){
       click(ky.centerX(),ky.centerY())
       sleep(3000)
       let res=screen.CaptureMain(1);
       if(res==-1)
       {
           toastLog("键盘错误");
           return 0;
       }
     }  }
   
   pinyin.result_PinYin(getContent)
   sleep(3000);
   if(text("发送").exists()){
       click("发送")
       sleep(2000)
       back()
       }
   //click("发送");
   
  }
   }catch(e){
       toastLog("w="+e.message)
       }
}

/*===============================================================================================================*/
//读一个文件的内容
var read_content=function(path)
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

//读取文件 返回随机的一个内容
var read_file=function(file_content)
{
    j=-1;

    for(var i in file_content){
        j=j+1;
    }
    var ran=Math.floor(Math.random() * (j-1));
  toast(ran)
    //返回随机的一个值
    return file_content[ran];

}
//随机下滑


/**==============================随机浏览============================================= */

function ranbs()
{

var swe=Math.floor(Math.random() * 6);

while(swe>1)
{
    toastLog("浏览聊天记录中")
    transfer.OpenRedhat()
    bs();//浏览各种
    sweps();
    swe--;
    
    
}
}

function bs()
{
//听语音
if(id(fullID+"aop").exists())
{
    
    var t1=id(fullID+"aop").boundsInside(0, 0, device.width/2, device.height).findOne(2000);
if(t1!=null)
{
var t=t1.bounds();

    var set=id(fullID+"aks").findOne(2000).bounds();
    if((set.centerY())<0)
    {
        set.centerY()=-(set.centerY());
    }

    if((t.centerY())<0)
    {
        sleep(3000)
        t.centerY()=-(t.centerY());
    }

    if(set.centerY()-t.centerY()>100)
    {
        sleep(3000)
    click(t.centerX(),t.centerY());
  
    var rwait=Math.floor(Math.random() * 30);
    if(rwait<5)
    {
        rwait=10;
    }
    sleep(rwait)
}

}
}


//打开视频
if(id(fullID+"ao2").exists())
{
  
    var h1=id(fullID+"ao2").boundsInside(0, 0, device.width/2, device.height).findOne(3000);
if(h1!=null)
{
    var h=h1.bounds();
if(h==undefined){return 0;}
    var set=id(fullID+"aks").findOne(2000);
if(set==null){return 0;}

else{set =set.bounds()}


    if((set.centerY())<0)
    {
        set.centerY()=-(set.centerY());
    }

    if((h.centerY())<0)
    {
        h.centerY()=-(h.centerY());
    }
   
    if(set.centerY()-h.centerY()>100)
    {
        sleep(3000)
        click(h.centerX(),h.centerY())
        var rwait=Math.floor(Math.random() * 15);
        if(rwait<5)
        {
            rwait=10;
        }
        sleep(rwait*1000);
        while(currentActivity()!="com.tencent.mm.ui.LauncherUI")//返回聊天页面
        {
        
            sleep(5000);
            back();
            sleep(3000);
            if(id(fullID+"aks").exists())
            {
                break;
            }
        }
    }

}
 
}
//打开图片
var p=Math.floor(Math.random() * 7);
if(p<3)
{
    p=3;
}
var picture =id(fullID+"al7").boundsInside(0, 0, device.width/2, device.height).findOne(3000);
if(picture!=null)
{
    sleep(3000)
    picture.click();
    
    sleep(p*1000);
    sleep(2000);
    while(currentActivity()!="com.tencent.mm.ui.LauncherUI")//返回聊天页面
  {
  
      sleep(5000);
      back();
      sleep(3000);
      if(id(fullID+"aks").exists())
      {
          break;
      }
  }
}

}

//随机滑动
function sweps()
{

sleep(3000)
var ran1=Math.floor(Math.random() * 1300);
if(ran1<500)
{
    ran1=1000;
}
if(ran1==1000)
{
   
   swipe(657,1584,657,ran1,1500);//向下滑
   sleep(3000);
   return 1;
}
   
swipe(657,300,657,ran1,1500);//向上滑
sleep(3000)


}


/***====================发送表情的功能============================== */

function facep()
{
    toast("选择表情")
    sleep(4000)
    var y=text("发送").findOne(2000);
    sleep(2000)
    var face=id(fullID+"aks").findOne(2000);
    if(y!=null)
    {
        toastLog("发现发送按钮")
        y=y.bounds();
        if(y==undefined){return 0}
        click(y.centerX()-150,y.centerY())
        sleep(3000)
    }

   else if(face!=null)
    {
        toastLog("发现其他按钮")
        var x=face.bounds();
        sleep(2000)
        click(x.centerX()-100,x.centerY());//点击表情
        sleep(3000)
    }
    sleep(8000)
    var se=id(fullID+"fjz").find();//查找表情个数
    if(se.length<1){
        return 0}
    var g=se[1].bounds();
    if(g==undefined){return 0}
    sleep(2000)
    
    var w=Math.floor(Math.random() * 100);//设置随机性
    
    if(w<50)
    {
        sleep(3000)
        swipe(g.centerX()+(device.width/2+w),g.centerY(),g.centerX(),g.centerY(),1000);
    }
    if(w>70)
    {
        sleep(3000)
        swipe(g.centerX(),g.centerY(),g.centerX()+(device.width/2+w),g.centerY(),1000);
    }
    sleep(6000)
    
    var seleface=id(fullID+"fjz").find();//查找表情个数
    if(seleface.length<1){return 0}
    var f=Math.floor(Math.random() * (seleface.length-1));//设置随机性
    if(f<2)
    {
       f=2;
    }
    
    if(seleface[f]!=undefined)
    {
     
        var h=seleface[f].bounds();
        if(h==undefined){return 0}
        sleep(3000)
        toastLog("开始选择表情类别")
        sleep(1000)
        if(h!=undefined){
        click(h.centerX(),h.centerY())}
        sleep(3000)
        
    }
   
    
    if(id(fullID+"a14").exists())//开始选择表情
    {
        
        exper();
        return 1;
    
    }
    //try{
    else//点击此处没有表情 重新选择
     {
    if(seleface.length>0){
        var hg=seleface[2].bounds();
        if(hg==undefined){return 0}
        sleep(3000)
        if(hg!=undefined){
        click(hg.centerX(),hg.centerY())
        exper();
        
        }
    }
    }
    //}catch(e){
        
       // toastLog(e.message)}
}

//*===============设置表情===================
function exper()
{
    sleep(3000)
    var nu=Math.floor(Math.random() * 5);//设置随机性
    if(nu<2)
    {
        swipe(511,1730,511,1374,1000);
    }
    else {
        swipe(511,1243,511,1600,1000);
    }
    sleep(3000)
    var ex=id(fullID+"rv").find();//选择表情
    if(ex.length>0)
    {
       
        var exp=Math.floor(Math.random() * (ex.length-1));//设置随机性
        if(exp==0)
        {
            exp=1;
        }

        if(exp>15&&exp<ex.length)
        {
            exp=9;
        }
        if(ex!="")
        {
            
            var t=ex[exp].bounds();
            if(t==undefined){return 0}
            sleep(3000)
            var nn=id(fullID+"fjz").findOne(2000);
            try{
            if(nn!=null)
            {
                nn=nn.bounds();
                if(nn==undefined){return 0;}
                var nv=nn.centerY();
                if(nv<0)
                {
                  
                    nv=-nn.centerY();
                }
               
              
                sleep(1000)
                if(t.centerY()-nv>100)
                {
                  
                    sleep(2000)
                    click(t.centerX(),t.centerY());
                    return 1;
                }
        
                else{
                   
                    sleep(2000)
                        click(t.centerX(),t.centerY()+160);
                        return -3;
                    }
            }
            }catch(e){
                toastLog(e.message)
                }
        }
   
       
    }

}
function delete_message()
{ 
let t1=id(fullID+"akq").textContains("邀请你加入群聊").boundsInside(0, 0, (device.width/2), device.height).exists();
try{
if(t1)
{
    t1=id(fullID+"akq").textContains("邀请你加入群聊").boundsInside(0, 0, (device.width/2), device.height).findOne(1500);
    if(t1!=null)
    {
        try{
    var ty=t1.bounds();
    if(ty==undefined){return 0}
    sleep(1000);
    var y=ty.centerY();
    y=y<0?-y:y;
    click(ty.centerX(),y)//点击邀请
    }catch(e){
        toastLog(e.message)
    }

    sleep(4000)
    if(text("你已接受邀请").exists()||textContains(该邀请已发送).exists())
    {
        toast("此群你已加入")
        sleep(1000)
        back();
        sleep(2000)
        longClick(ty.centerX(),y)
        sleep(2000)
        click("删除")
        sleep(1000)
        click("删除");

    }
    else if(text("加入群聊").exists())
    {
        sleep(2000)
        click("加入群聊")
        sleep(3000)
        if(text("该邀请已过期").exists())
        {
            sleep(1000)
            back();
            sleep(1000)
            longClick(ty.centerX(),y)
            sleep(2000)
            click("删除")
            sleep(1000)
            click("删除");
            sleep(1000)
        }
        else if(textContains("该群因违规").exists())
        {
            sleep(1500)
            back();
            sleep(2000)
            longClick(ty.centerX(),y)
            sleep(2000)
            click("删除")
            sleep(1000)
            click("删除");
            sleep(1000)

        }

        sleep(2000)
        if(id(fullID+"aks").exists())//加入成功
        {
            sleep(3000)
            sava_contact();
            sleep(3000)
            let c=id(fullID+"f8y").findOne(3000);
                if(c!=null)
                {
                    c=c.bounds()
                    if(c==undefined){return 0}
                    sleep(3000)
                    click(c.centerX(),c.centerY());
                    // click(838,136);
                }

        }

        if(!id(fullID+"aks").exists()&&!text("发送").exists())
        {    sleep(1500)
            back();

        }
     
    }
    else
    {
        if(!id(fullID+"aks").exists()&&!text("发送").exists())
        {    sleep(1500)
            back();

        }
    
    }
}
      
    
}

}catch(e){
    
    toastLog(e.message)}

}

/**创建完成保存到通讯录 */

function sava_contact()
{
    sleep(3000)
    let m=className("android.support.v7.widget.LinearLayoutCompat").depth(7).findOne(2000);
    if(m!=null)
    {
       let b=m.bounds();
       if(b==undefined){return 0}
       click(b.centerX(),b.centerY());
    }
   sleep(2000)

    let contact=text("保存到通讯录").findOne(2000);
if(currentActivity()=="com.tencent.mm.chatroom.ui.ChatroomInfoUI")
{

    
     sleep(2000)
     mes();//消息免打扰
    sleep(3000)
    while(contact==null)
    {
        className("ListView").findOne().scrollForward();
        sleep(2000)
        contact=text("保存到通讯录").findOne(2000);
    }
    try{
        let cxy=contact.bounds();
        sleep(1000)
        let cy=cxy.centerY();
        let dx=device.width-64;
        let dy=device.height-cy;
        let c=id(fullID+"aq8").boundsContains(dx, cy,device.width-dx,device.height-dy).findOne(3000);
        if(c==null){return 0}
        let xy=c.bounds();
      if(xy==undefined){return 0}
        if(c.desc()=="已关闭")
        {
            click(xy.centerX(),xy.centerY())
            sleep(1000)
           
           BackMain()
            

        }
        else
        {
            sleep(2000)
           BackMain()
        }
    }catch(e){

        toastLog("sava"+e.message)
    }
       
}
   
else{
    toast("当前页面错误");
    sleep(2000)
   BackMain()
    return -1;
}

}

function mes()
{
    let n=text("消息免打扰").exists()
while(n==false)
{
swipe(455,1487,455,286,1000)
sleep(2000)
n=text("消息免打扰").exists()
}
let contact=text("消息免打扰").findOne(2000);
if(contact==null){return 0;}
let cxy=contact.bounds();
sleep(1000)
let cy=cxy.centerY();
let dx=device.width-64;
let dy=device.height-cy;
let c=id(fullID+"aq8").boundsContains(dx, cy,device.width-dx,device.height-dy).findOne(3000);
if(c==null){return 0}
let xy=c.bounds();
if(xy==undefined){return 0}
if(c.desc()=="已关闭")
{
    sleep(1000)
click(xy.centerX(),xy.centerY())
}

}


