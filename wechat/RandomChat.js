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

    <text textSize="16sp" text="随机好友聊天" />

<horizontal gravity="center_vertical" >

<text text="好友个数" textColor="green"/>
<input w="50" id="much" inputType="number"  />

</horizontal>
<horizontal gravity="center_vertical" >

<text text="聊天记录浏览个数" textColor="blue"/>
<input w="50" id="wechatm" inputType="number"  />

</horizontal>


<text text="功能选择" w="auto" textSize="15sp" id="sele" textColor="blue" />
<vertical marginLeft="30sp">
<checkbox id="cb1" text="图片" checked="{{auto.ph=false}}"  />
<checkbox id="cb2" text="视频" checked="{{auto.vi=false}}"/>
<checkbox id="cb3" text="文字" checked="{{auto.tx=true}}"/>
<checkbox id="cb5" text="拍摄" checked="{{auto.pa=false}}"/>
<checkbox id="cb4" text="语音" checked="{{auto.voic=false}}"/>
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
var pinyin;
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

  //保存所有配置
ui.save.click(function(){
    
 threads.start(conf )
//threads.start(MianWx);
threads.start(Sava_config_check);

}); 

});

function conf()
{


  much=ui.much.getText();
 wechatms=ui.wechatm.getText();
 
var k=0;  
if(voices!=1)
{
    
    multfun[k]="语音";
    k++
} 
if(text_con!=1)
{
  
    multfun[k]="文字";
    k++;
}
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

if(shooting!=1)
{
    multfun[k]="拍摄";
    k++;

}


}


function Sava_config_check()
{
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
    var path="/sdcard/WelHelper/主页聊天好友功能.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(var i=0;i<7;i++)
    {
        wite.writeline(config[i]);
        wite.flush();
    }
   Sava_config();//保存微信号
   // sleep(2000);
    toast("保存成功")
    wite.close();
    
}


/** ===========================保存配置文件======================*/

function Sava_config()
{

   var config=new Array();

   config[0]=much;//聊天人数
  config[1]= wechatms;//浏览好友聊天记录

    var path="/sdcard/WelHelper/主页聊天好友配置.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    wite.writeline(config[0]);
    wite.flush();
    wite.writeline(config[1]);
    wite.flush();
    //sleep(2000);
    //toast("保存成功")
    wite.close();
}
var s;
function set()
{
    var path="/sdcard/WelHelper/主页聊天好友配置.txt";
    var array_config= read_content1(path);
  ui.much.setText(array_config[0]);//读第一行的内容
  ui.wechatm.setText(array_config[1]);
}
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
   var transfer;
/*设置配置内容 */
var setTh1=threads.start(function(){
    
     photo=1;//图片
    videos=1;//视频
    text_con=1;//文字
    shooting=1;//拍摄
    voices=1;//语音
  
    wemain= storages.create("WECHAT");
    ui.run(()=>{
        pinyin=require("pinyin.js")
        transfer=require("transfer.js")
     //threads.start(set);
        set();
        var path="/sdcard/WelHelper/主页聊天好友功能.txt";
        var array_config= read_content1(path);
        var b=false;
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

sleep(2000);
threads.start(conf);
sleep(1000)
threads.start(st);//启动微信
setTh1.interrupt();
} );


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

function MianWx()
{
    var i=0;
    var m=much;
    var v=wechatms
    try{
    if(WX1==1&&WX2==1)
    {
        
    
    for(var j=0;j<2;j++)
    {
        i=2;
        much=m;
        wechatms=v;
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
    toastLog("错误信息"+e.massage)
}
finally{
    wemain.put("wx",1);
toastLog("聊天结束");
//th1.stop;
//th2.stop;engines.stopAll();
threads.shutDownAll();
}
}

function Main()//启动微信
{
    toastLog("正在启动微信,请确保你的微信在首页");
sleep(8000);

try{
    BackMain()
sleep(3000)
click(140,1721);

}catch(e){

    toastLog("error"+e.message)
}

sleep(2000)
// waitForActivity("com.tencent.mm.ui.LauncherUI" );
className("android.widget.ListView")
        .findOne(3000).scrollBackward();
sleep(2000)
//随机浏览主页上的好友
var cn=0;
while(much>1)
{
    sleep(3000)
    click(140,1721);
    sleep(2000)
    if(text("小程序").exists())
    {
        swipe(636,1652,636,1200,1000)
        sleep(2000)
    }
    var result=new_chat();//新消息的人

    if(result==1)//已找到新的聊天信息
    {
        //开始聊天
        sleep(3000)
        if(!id("com.tencent.mm:id/aks").exists()&&!id("com.tencent.mm:id/lt").exists())
        {
                                 
            // click(555,146)
            sleep(2000)
            swipe(636,1652,640,1000,1200)
            sleep(3000)
            continue;
        }
        wechats();
        var ii=Math.floor(Math.random() * 3);//设置随机性
        if(ii==0)
        {
            ii=1;
        }
        //聊天页面(ii);
        much--;
        continue;
    }
    sleep(3000)
    var result1=main_flash();//查找主页上的人
    if(result1==-1)//没有点到联系人
    {
        toastLog("没有点到联系人")
        continue;

    }

    if(result1==1)//点到了联系人
    {
        toastLog("请稍后")
        if(cn>5)
        {
            click(391,774);
            sleep(3000)
            cn=0;
        }
        sleep(3000)
        if(!id("com.tencent.mm:id/aks").exists())
        {
            toastLog("没有点到联系人")
            // click(555,146)
            sleep(2000)
            swipe(636,1652,636,1000,1200)
            sleep(3000)
            cn++;
            back();
            continue;
        }
        wechats();//聊天开始
        much--;
    }
    
    var ii1=Math.floor(Math.random() * 3);//设置随机性
    if(ii1==0)
    {
        ii1=1;
    }
    聊天页面(ii1);//滑动主页上的好友
    
}


BackMain()

}

function BackMain()
{
    sleep(3000)
    var b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
    while(b4==false)
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
            sleep(4000)}
            }
        b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
        var mm=id("com.tencent.mm:id/cns").findOne(2000)
      //  toastLog(mm)
        if(b4==true||mm!=null) {break;}
        sleep(4000);
       // back();
    }


}




//=================================================查找主页上的人
function main_flash()
{
  sleep(5000)
  var d=id("com.tencent.mm:id/tm").find();//查找微信主页的人
  var siz=0;
if(d.length>1)
{
  siz=Math.floor(Math.random() * (d.length-1));//设置随机性
  if(siz<=0||siz>d.length)
  {
      siz=1;
  }
}
 
  sleep(3000);
  if(d[siz]!=undefined)
  {
  try{
    var k=d[siz].bounds();
    if(k==undefined){return -1;}
    sleep(2000)
    
    click(k.centerX()+100,k.centerY()-20);//点击微信上的人
  }catch(e){
      toastLog("点击错误"+e.message)
  }
  var bol=false;
  sleep(3000)
  var send=id("com.tencent.mm:id/aks").exists();
  if(send)
  {
      toastLog("send");
      return 1;
  }
  sleep(3000)
  while(!id("com.tencent.mm:id/aks").exists())//判断是否进入了聊天界面 如果不在聊天界面就进入这里
  {
      //滑动随机浏览
      var i=Math.floor(Math.random() * (3));//假如进入了公众号
      sweps_log(i);//滑动浏览
      bol=true;
      //此时应该返回到主页面上

      break;//结束循环
  }
  
      

  if(bol)
  {
    var b3=id("com.tencent.mm:id/cns").text("通讯录").exists();
    while(b3==false)
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
            sleep(4000)}
            }
        b3=id("com.tencent.mm:id/cns").text("通讯录").exists();
        var mm=id("com.tencent.mm:id/cns").findOne(2000)
      //  toastLog(mm)
        if(b3==true||mm!=null) {break;}
        sleep(3000);
       // back();
    }

     return -1;//if找不到就重新找
  }
}
//如果bol不等于true那就和好友聊天

return 1;
}
  /**=====================查找新的消息==================================== */
function new_chat()
{
    sleep(3000)
    var new_chat=id("com.tencent.mm:id/ga3").find();//查找发来新消息的人
        if(new_chat.length>1)
        {
            var y=Math.floor(Math.random() * 3);//设置随机性
            var t=new_chat.length;
            if(y<=1)
        {
                var l=Math.floor(Math.random() * (new_chat.length-1));//设置随机性

                if(l<1||l>new_chat.length){l=0; }
                var n=new_chat[l].bounds();
                sleep(3000)
      if(n!=undefined)
         {
             click(n.centerX()+100,n.centerY());//点击联系人
                    
      var bol=false;
  sleep(3000)
  var send=id("com.tencent.mm:id/aks").exists();
  if(send)
  {
      toastLog("点击联系人");
      return 1;
  }
  sleep(3000)
  while(!id("com.tencent.mm:id/aks").exists())//判断是否进入了聊天界面 如果不在聊天界面就进入这里 返回id
  {
      //滑动随机浏览
      var i=Math.floor(Math.random() * (3));//假如进入了公众号
      sweps_log(i);//滑动浏览
      bol=true;
      //此时应该返回到主页面上

      break;//结束循环
  }
  
  if(bol)
  {
    BackMain()

         return -1;//if找不到
     
     }
     
            else{
                return 1;
            }   
       
       }
       else{
           return -1;
       }
                
    }
    else{
        return -1;
    }
   }
   else{
    return -1;
   }
       
}

//=================================和一个好友聊天
function wechats()
{

for(var j=0;j<multfun.length;j++)//聊天功能选择
{

    var rj=Math.floor(Math.random() * multfun.length);
    if(rj<0||rj>multfun.length){rj=0}
  if(j>0&&multfun[j]==multfun[j-1]){ continue;}
sleep(2000)
if(!id("com.tencent.mm:id/aks").exists())
{
    toastLog("界面错误")
    break;
}
if(multfun[rj]=="文字")
{
   toastLog("文字")
    setContent();
    sleep(2000)
   
}
if(multfun[rj]=="语音")
{
    toastLog("语音")
    var voice=desc("切换到按住说话").findOne(3000);
    //sleep(2000)
    if(voice!=null)
    {
        voice.click();
        sleep(2000)
        longClick("按住 说话");
        
    }
  else if(text("按住 说话").exists()){
      
      longClick("按住 说话");
      }
      else{
          click(62,1720)
          longClick("按住 说话");
          }
   //longClick("按住 说话");
    var ran=Math.floor(Math.random() * 30);//发送语音的时长
    if(ran<5)
    {
        ran=5;
    }
    swipe(157,1741,815,1741,ran*1000);
    sleep(4000)
    
}

sleep(2000)
if(multfun[rj]=="图片"||multfun[rj]=="视频"||multfun[rj]=="拍摄")
{

    toastLog("图片")
fun(multfun[rj]);

sleep(2000)

}

}

/**==============================用户指定查看用户的聊天记录才查看================================ */
if(wechatms>0)
{
    ranbs();//滑动聊天记录并查看图片视频
    wechatms--;
}
if(text("相册").exists())
{
    back();
    sleep(1500)
}
swipe(692,1377,700,1000,1000)
transfer.OpenRedhat();

//一次聊天结束 返回查找下一个

try{
    sleep(1500)
    swipe(692,1377,700,1000,1000)
    transfer.OpenRedhat();
    sleep(1500);
    delete_message();
}catch(e){
toastLog(e.message)

}
sleep(3000)
BackMain()

sleep(2000);

}

function fun(vbtext)
{
  sleep(2000)
  if(text("发送").exists())
  {
      click("发送")
      sleep(2000)
  }
 
var pi=id(fullID+"aks").findOne(2000);
if(pi!=null){pi.click()}
sleep(1000)
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
    sleep(1000)
    return 1;
    
 }
click("相册")
sleep(2000)
if(vbtext=="视频"){
click("图片和视频")
sleep(1000)
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
var voice=id("com.tencent.mm:id/dm8").find();//查找图片的控件
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
    swipe(678,354,687,1534,1500);
    sleep(2000)
    ran=1;
}
var i=1;
voice.forEach(item =>{
    try{
    if(item==undefined){return 0;}
    var b=item.bounds();
    
    var x=b.centerX();
    var y=b.centerY();
    if(i==ran)
    {
       
        sleep(3000)
        click(x,y)
        sleep(2000)
        i++;
        var l=id("com.tencent.mm:id/ch").findOne(3000);
        sleep(2000);
        l.click();//点击发送
        sleep(4000)
        var bool=id(fullID+"aks").exists();
        if(bool==false)
        {
            back();
            sleep(2000)
        }
        return -1;
    }
}catch(e){
    toastLog("错误"+e.message)
}
   i++;

})
return 1;
}


/** 发送文字  */
function setContent()
{

    var path="/sdcard/WelHelper/MainWXchat/随机聊天内容.txt"


    file_content=read_content(path);//读文件的内容此内容只读一次
    if(file_content==null)
    {
        return 1;
    }
    var chatmuch=Math.floor(Math.random() * 3);
    
    if(chatmuch==0)
    {
        chatmuch=1;
    }

    for(var a=0;a<chatmuch;a++)
    {
        var rw=[]
        if(rw.length>0){rw.splice(0)}
    var getContent=read_file(file_content);//返回随机的一个内容
    rw.push(getContent)
     sleep(3000)
    if(desc("按住说话").id("com.tencent.mm:id/grk").exists())
    {
    sleep(3000)
    var keyboads=desc("切换到键盘").findOne(3000);
    sleep(3000)
    if(keyboads!=null)
    {
        keyboads.click();
    }
    
    }
    sleep(5000);

    var send_face=Math.floor(Math.random() * 5);//设置随机性
    if(send_face<2)
    {
        
        facep();//设置发送表情
        sleep(3000)
        // input(getContent);
        var kl=idContains("com.tencent.mm:id/g78").findOne(3000)
        if(kl!=null){
            var ky=kl.bounds()
            sleep(1500)
            if(ky!=undefined){
            click(ky.centerX(),ky.centerY())
            sleep(4000)
          }  }
        
            pinyin.result_PinYin(rw)
        sleep(3000)
        click("发送")
        sleep(1000)
        back();
        continue;
    }
 if(send_face>=4)
 {
    sleep(3000)
    toast("正在设置")
    sleep(2000)
    // input(getContent);
    var kl=idContains("com.tencent.mm:id/g78").findOne(3000)
    if(kl!=null){
        var ky=kl.bounds()
        sleep(1500)
        if(ky!=undefined){
        click(ky.centerX(),ky.centerY())
        sleep(4000)
      }  }
    
        pinyin.result_PinYin(rw)
    sleep(3000)
    facep();
    sleep(3000);
    click("发送")
    sleep(1000)
    back();
    continue;
 }
 sleep(2000)
 var kl=idContains("com.tencent.mm:id/g78").findOne(3000)
 if(kl!=null){
     toastLog("keyboads")
     var ky=kl.bounds()
     sleep(2000)
     if(ky!=undefined){
     click(ky.centerX(),ky.centerY())
     sleep(4000)
   }  }
 
 pinyin.result_PinYin(rw)
 sleep(3000);
 if(text("发送").exists()){
     click("发送")
     sleep(2000)
     back()
     }
   
}
}

/*===============================================================================================================*/
//读一个文件的内容
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


/**==============================随机浏览聊天记录并查看视频和语音图片============================================= */

function ranbs()
{

var swe=Math.floor(Math.random() * 4);//滑动聊天记录的次数

while(swe>1)
{
    bs();//打开语音视频图片进行浏览
    transfer.OpenRedhat()
    sweps_log();//滑动聊天记录浏览
    swe--;
    ;
   
}
}

function bs()
{
//打开语音
if(id(fullID+"aop").exists())
{
    
    var t1=id(fullID+"aop").boundsInside(0, 0, device.width/2, device.height).findOne(2000);
if(t1!=null)
{

    var t=t1.bounds();

    var set=id(fullID+"aks").findOne(2000);
    if(set!=null)
    {
        set=set.bounds()

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
else{return 0}


}
}

//打开视频
if(id(fullID+"ao2").exists())
{
  
    var h1=id(fullID+"ao2").boundsInside(0, 0, device.width/2, device.height).findOne(3000);
if(h1!=null)
{
    var h=h1.bounds();

    var set=id(fullID+"aks").findOne(2000)
if(set!=null){
    set=set.bounds();

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

//随机滑动好友的聊天记录
function sweps_log()
{
   
sleep(5000)
var ran1=Math.floor(Math.random() * 1300);
if(ran1<500)
{
    ran1=1000;
}
if(ran1==1000)
{
   
   swipe(657,1584,657,ran1,1500);//向下滑
   sleep(5000);
   
}
   
swipe(657,358,657,ran1,1500);//向上滑
sleep(5000)

}

function delete_message()
{ 
let t1=id(fullID+"akq").textContains("邀请你加入").boundsInside(0, 0, (device.width/2), device.height).exists();

try{
if(t1)
{
    t1=id(fullID+"akq").textContains("邀请你加入").boundsInside(0, 0, (device.width/2), device.height).findOne(2000);
    if(t1!="")
    {

    var ty=t1.bounds();
    sleep(1000);
    var y=ty.centerY();
    y=y<0?-y:y;
    click(ty.centerX(),y)
    sleep(4000)
    if(text("你已接受邀请").exists()||textContains(该邀请).exists())
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
        return 1;
    }
    else if(text("加入群聊").exists())
    {
        sleep(2000)
        click("加入群聊")
        sleep(3000)
        if(textContains("该群因违规").exists())
        {
            sleep(2000)
            back()
            sleep(2000)
            longClick(ty.centerX(),y)
            sleep(2000)
            click("删除")
            sleep(1000)
            click("删除");
            sleep(1000)

        }
        else if(text("该邀请已过期").exists())
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
        sleep(3000)
         if(id(fullID+"aks").exists()&&!text("发送").exists())
        {
            try{
                sleep(1000)
                sava_contact();
                sleep(1000)
            }
          catch(e){
              toastLog(e.message)
          }
        }
        else
        {
            if(!id(fullID+"aks").exists()&&!text("发送").exists())
                {
                    sleep(2000)
                    back();
                }
                
        }
       
}  
else
{
if(!id(fullID+"aks").exists()&&!text("发送").exists())
{
    sleep(2000)
    back();
}
    
    sleep(2000)
    if(id(fullID+"aks").exists()||text("发送").exists())
    {
        longClick(ty.centerX(),y)
        sleep(2000)
        click("删除")
        sleep(1000)
        click("删除");
        sleep(1000)
    }
    
}

    }
}
}catch(e){
    log(e)}
}


/***====================发送表情的功能============================== */

function facep()
{
    sleep(4000)
    var y=text("发送").findOne(2000);
  
    var face=id(fullID+"aks").findOne(2000);//查找添加表情
   
    sleep(2000)
    if(y!=null)
    {
        toastLog("发现发送按钮")
        y=y.bounds();
        if(y==undefined){toastLog("控件为空"); return 0;}
        click(y.centerX()-150,y.centerY())
    }
  
   else if(face!=null)
    {
        toastLog("发现其他按钮")
        var x=face.bounds();
        if(x==undefined){toastLog("控件错误");  return 0;}
        sleep(2000)
        click(x.centerX()-100,x.centerY());//点击表情
        sleep(3000)
    }
    sleep(4000)
    var se=id(fullID+"fjz").find();//查找表情个数
    if(se.length<1){toastLog("找不到表情"); return 0}
    var g=se[1].bounds();
    if(g==undefined){return 0}
    sleep(3000)
    
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
    sleep(3000)
    
    var seleface=id(fullID+"fjz").find();//查找表情个数
    if(seleface.length<1)
    {
        toastLog("low")
        return 0
    }
    var f=Math.floor(Math.random() * (seleface.length-1));//设置随机性
    if(f<2)
    {
       f=2;
    }
    
    if(seleface[f]!=undefined)
    {
       toastLog("f="+f)
        var h=seleface[f].bounds();
        if(h==undefined){return 0;}
        sleep(3000)
        toastLog("开始选择表情类别")
        sleep(1000)
        click(h.centerX(),h.centerY())
        sleep(3000)
        
    }
    
    if(id(fullID+"rv").exists())//开始选择表情
    {
        
        exper();
        return 1;
    
    }
    else//点击此处没有表情 重新选择
     {
    try{
        if(seleface.length<2){return 0;}
        var h=seleface[2].bounds();
        if(h==undefined){return 0}
        sleep(3000)
        click(h.centerX(),h.centerY())
        exper();
    }catch(e){
        toastLog(e.message)
    }
    }
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
        if(exp==0||exp>ex.length)
        {
            exp=1;
        }

        if(exp>15&&exp<ex.length-1)
        {
            exp=9;
        }
        if(ex!="")
        {
            try{
            var t=ex[exp].bounds();
            sleep(3000)
            var nn=id(fullID+"fjz").findOne(2000);
            if(nn!=null)
            {
                nn=nn.bounds();
                if(nn==undefined){return 0;}
                var nv=nn.centerY();
                if(nv<0)
                {
                  
                    nv=-nn.centerY();
                }
               
                toastLog(t.centerY()-nv);
                sleep(2000)
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

            toastLog("表情错误"+e.message)
            
        }

            
        }
   
       
    }

}


//滑动好友主页面
function 聊天页面(i)
{

    while(i)
    {
        var ra3=Math.floor(Math.random() * 1170);
        var ra=Math.floor(Math.random() * 1170);
        if(ra<800)
        {
            ra=1000;
        }
        if(ra3<600)
        {
            ra3=800;
        }
        if(ra3==800)
        {
            sleep(3000)
            swipe(840,596,840,ra3,1000);
            continue;
        }
        sleep(5000)
        swipe(840,1568,840,ra,1000);
        i--;
    }
    
    
}


/**创建完成保存到通讯录 */

function sava_contact()
{
    sleep(3000)
    let m=className("android.support.v7.widget.LinearLayoutCompat").depth(7).findOne(2000);
    if(m!=null)
    {
       let b=m.bounds();
       if(b==undefined){return 0;}
       click(b.centerX(),b.centerY());
    }
   sleep(2000)

    let contact=text("保存到通讯录").findOne(2000);
if(currentActivity()=="com.tencent.mm.chatroom.ui.ChatroomInfoUI")
{

    try{
     sleep(2000)
     mes();//消息免打扰
    sleep(3000)
    while(contact==null)
    {
        className("ListView").findOne().scrollForward();
        sleep(2000)
        contact=text("保存到通讯录").findOne(2000);
    }
        let cxy=contact.bounds();
        if(cxy==undefined){return 0;}
        sleep(1000)
        let cy=cxy.centerY();
        let dx=device.width-64;
        let dy=device.height-cy;
        let c=id(fullID+"aq8").boundsContains(dx, cy,device.width-dx,device.height-dy).findOne(3000);
        let xy=c.bounds();
      
        if(c.desc()=="已关闭")
        {
            click(xy.centerX(),xy.centerY())
            sleep(1000)
           
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
                b1=id(fullID+"cns").text("通讯录").exists();
                var mm=id(fullID+"cns").findOne(2000)
              //  toastLog(mm)
                if(b1==true||mm!=null) {break;}
                sleep(1000);
               // back();
            }
        }
        else
        {
            sleep(2000)
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
    }catch(e){

        toastLog(e.message)
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
    if(cxy==undefined){return 0}
    sleep(100)
}