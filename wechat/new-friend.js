"ui";
auto.waitFor();
ui.layout(
    <vertical>
    <toolbar bg="#66CCFF">
        <horizontal>
            <text textSize="18sp" textColor="white" text="保存脚本配置" />
        </horizontal>
        <horizontal w="*" gravity="right">
       
        </horizontal>
    </toolbar>
    <scroll>
<vertical marginTop="0" padding="10">
<text h="30" gravity="center_vertical" textSize="18sp" text="微信朋友圈浏览设置"  />

<horizontal marginTop="3" >

<text textColor="blue"  textSize="15sp" text="本次要浏览多少个朋友圈"/>
<input id="bscount_now"  w="300" inputType="number"  text="10"/>

</horizontal>
<horizontal >
<text  textSize="15sp"   text="浏览自己朋友圈的时长:" textColor="blue" />
<input textSize="19sp"  id="bstime"  w="100" inputType="number" hint="以分钟为单位" text="1"/>
</horizontal>

<horizontal marginTop="3" >
<text textColor="blue"  textSize="15sp" text="浏览别人朋友圈时长"/>
<input id="other_bstime"  w="300" inputType="number" hint="以秒为单位" text="30"/>
</horizontal>
<horizontal marginTop="3" >
<text textColor="blue"  textSize="15sp" text="浏览自己朋友圈点赞个数"/>
<input id="praise_count_myself" w="300" inputType="number" hint="以秒为单位" text="30"/>

</horizontal>
<horizontal marginTop="3" >
<text textColor="blue"  textSize="15sp" text="浏览别人朋友圈点赞个数"/>
<input id="praise_count_other" w="300" inputType="number"  text="10"/>

</horizontal>
<horizontal marginTop="3" >

<text  text="设置评论语:" textSize="18sp" textColor="blue" />
<input  w="300" id="content" text=" 赞你一个...... "/>
</horizontal>

<horizontal marginTop="3" >
    
<text textSize="15sp" text="浏览自己朋友圈评论个数" textColor="blue"/>
<input w="300" id="discuss_count_myself" inputType="number" textSize="15sp" text="10"/>

</horizontal>
<horizontal marginTop="3" >
<text textSize="15sp" text="浏览别人朋友圈评论个数" textColor="blue"/>
<input w="300"  id="discuss_count_other" inputType="number" textSize="15sp" text="10"/>
</horizontal>
<horizontal marginTop="3" >
<checkbox id="zan1" text="点赞" textSize="15sp" textColor="blue" marginLeft="50"  checked="{{auto.g=true}}"/>
<checkbox id="dis" text="评论" textSize="15sp" textColor="blue" marginLeft="25" checked="{{auto.disc=true}}" />
</horizontal>

<horizontal marginTop="3" >
<checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginLeft="50" checked="{{auto.option=true}}" />
<checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginLeft="10" checked="{{auto.option2=false}}"/>
</horizontal>
<button marginTop="20" textSize="15sp"  id="save1" text="保存脚本配置" textColor="white" style="Widget.AppCompat.Button.Colored" />
</vertical>
</scroll>
</vertical>

);
var fullID="com.tencent.mm:id/"
var bscount_now;//本次浏览朋友圈个数
var other_bstime;//浏览别人朋友圈的时长
var praise_count_myself;//浏览自己朋友圈的点赞个数
var praise_count_other;//点赞别人朋友圈的个数
var discuss_count_myself;//评论自己朋友圈的个数
var discuss_count_other;//评论别人朋友圈的个数
var sava_nickname=new Array();
var cu=1; //数组的计数
var sum = 0;//点赞个数
var comment1;//用户的评论语言
var time;//用户浏览的时间
var count=1000;//初始化为0
var th1;
var main_thread;
var th_write;
var WX1=null;
var WX2=null;
var 点赞=null;
var 评论=null;
main_thread=threads.start( function(){

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
       ui.zan1.on("check",function(checked){

            if(checked)
            {
               点赞=1;
            }
            if(checked==false)
            {
                点赞=null;
            }

        });
        ui.dis.on("check",function(checked){

            if(checked)
            {
                评论=1;
            }
            if(checked==false)
            {
                评论=null;
            }

        });
       
        ui.save1.click(function(){
           threads.start(conf );
            
       //  th1= threads.start(MianWx);
        });
    });

}); 

function conf()
        {
            time=ui.bstime.getText();//用户浏览的时间
            time=time*60000;
            comment1=ui.content.getText();//评论内容
            count=0;//计时
            bscount_now=ui.bscount_now.getText();//本次浏览朋友圈个数
            other_bstime=ui.other_bstime.getText();//浏览别人朋友圈的时长
            praise_count_myself=ui.praise_count_myself.getText();//浏览自己朋友圈的点赞个数
            praise_count_other=ui.praise_count_other.getText();//点赞别人朋友圈的点赞个数
            discuss_count_myself=ui.discuss_count_myself.getText();//评论自己朋友圈的个数
            discuss_count_other=ui.discuss_count_other.getText();//评论别人朋友圈的个数
            threads.start(write_config);
        }
        
        
function write_config()//写入用户的配置文件
{
 
    var lines=new Array();
    lines[0]=bscount_now;//本次浏览朋友圈个数
    lines[1]=time/60000//用户浏览的时间
    lines[2]=other_bstime//浏览别人朋友圈的时长
    lines[3]=praise_count_myself//浏览自己朋友圈的点赞个数
    lines[4]=praise_count_other//点赞别人朋友圈的点赞个数
    lines[5]=comment1//评论内容
    lines[6]=discuss_count_myself//评论自己朋友圈的个数
    lines[7]=discuss_count_other//评论别人朋友圈的个数
    if(WX1==null)
   {
       WX1=0;
   }
   if(WX2==null)
   {
       WX2=0;
   }
   lines[8]=WX1;
   lines[9]=WX2;
   if(点赞==null)
   {
    点赞=0;
   }
   if(评论==null)
   {
       评论=0;
   }
   lines[10]=点赞
   lines[11]=评论

 var path="/sdcard/WelHelper/配置.txt";
wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
for(var i=0;i<12;i++)
{

wite.writeline(lines[i]);
wite.flush();
}
wite.flush()
toast("写入完毕....")
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
/**==================================设置配置================================================================= */
var open_config=threads.start(function(){
    ui.run(()=>{
   wemain= storages.create("WECHAT");
    var path="/sdcard/WelHelper/配置.txt";
    var array_config=read_content(path);
    ui.bscount_now.setText(array_config[0])
    ui.bstime.setText(array_config[1])
    ui.other_bstime.setText(array_config[2])
    ui.praise_count_myself.setText(array_config[3])
    ui.praise_count_other.setText(array_config[4])
    ui.content.setText(array_config[5])
    ui.discuss_count_myself.setText(array_config[6])
    ui.discuss_count_other.setText(array_config[7])
    var w1=false;
   var w2=false;
   if(array_config[8]==1)
   {
       w1=true;
       WX1=1;
   }
   if(array_config[9]==1)
   {
       w2=true;
       WX2=1;
   }
   ui.wx1.checked=auto.option=w1;//设置第一个微信号
   ui.wx2.checked=auto.option2=w2;
   var b=false;
   if(array_config[10]==1)
   {
       点赞=1;
       b=true;
   }
   else{
       点赞=null;
   }
   ui.zan1.checked=auto.g=b;
   b=false;
   if(array_config[11]==1)
   {
       评论=1;
       b=true;
   }
   else{
       评论=null;
   }
   ui.dis.checked=auto.disc=b;
   });
   sleep(2000)
   threads.start(conf);//获取配置文件
   sleep(1000);
   threads.start(st);
    open_config.interrupt();
} );


var read_content=function(path)
{

   var path=path;
    var b=files.createWithDirs(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;

}
/**=================================================================================================== */


function MianWx()
{
    
    var bscount_now1=bscount_now;//本次浏览朋友圈个数
var other_bstime1=other_bstime;//浏览别人朋友圈的时长
var praise_count_myself1=praise_count_myself;//浏览自己朋友圈的点赞个数
var praise_count_other1=praise_count_other;//点赞别人朋友圈的个数
var discuss_count_myself1=discuss_count_myself;//评论自己朋友圈的个数
var discuss_count_other1=discuss_count_other;//评论别人朋友
var timer=time;
    
    var i=0;
    //toast(点赞)
    try{
    if(WX1==1&&WX2==1)
    {
        
        
        i=2;
    
    for(var j=0;j<2;j++)
    {
       bscount_now=bscount_now1
       //other_bstime=other_bstime1
      praise_count_myself=praise_count_myself1
      praise_count_other=praise_count_other1
    //  praise_count_other=praise_count_other1
      discuss_count_myself=discuss_count_myself1
      discuss_count_other=discuss_count_other1
      //time=timers
        
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

    var b3=id("com.tencent.mm:id/cns").text("通讯录").exists();
    while(!b3)
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
           toast("发现你退出了微信")
           sleep(1000)
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
   b3=id("com.tencent.mm:id/cns").text("通讯录").exists();
   var mm=id("com.tencent.mm:id/cns").findOne(2000)
 //  toastLog(mm)
   if(b3==true||mm!=null) {break;}
   sleep(4000);
  
       
    }
    wemain.put("wx",1);
    threads.shutDownAll();

    exit();
}
}

function Main()
{
    
    sleep(7000)
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
       if(currentPackage()!="com.baidu.input_huawei"){
           toast("发现你退出了微信")
           sleep(1000)
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
   b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
   var mm=id("com.tencent.mm:id/cns").findOne(2000)
 //  toastLog(mm)
   if(b2==true||mm!=null) {break;}
   sleep(4000);
  
    }
//    toastLog(bscount_now)
    sleep(4000)
    click(696,1730)
    sleep(4000)
    click(576,305)
    sleep(4000);
    if(text("腾讯新闻").exists())
    {
        var b6=id("com.tencent.mm:id/cns").text("通讯录").exists();
        while(!b6)
        {
            if(text("发现").exists())
            {
                break;
            }
            back()
            sleep(5000)
            b6=id("com.tencent.mm:id/cns").text("通讯录").exists();
            if(b6==true){break;}
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

        click(696,1730)
        sleep(2000)
        click(576,305)
        sleep(2000)
        if(text("腾讯新闻").exists()){
            toastLog("程序发生错误"); return 1;}

    }
   try{
    scoll();
   }catch(e)
   {
       toastLog("错误信息"+e.massage)
       
   }

  sleep(2000);
  
  toastLog("结束");

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
       toast("发现你退出了微信")
       sleep(1000)
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
b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
var mm=id("com.tencent.mm:id/cns").findOne(2000)

if(b1==true||mm!=null) {break;}
sleep(4000);

  }
  
  
} 
/**=================================================================================================== */
function scoll() {
    count=0;
      while(1){
          
          if(count>=time){//判断浏览的时间是否大于用户指定的时间
            toastLog("finish")
              return 1;
          }
          toast(count)
        sleep(2000);//暂停2秒 等页面滑动执行完成
        while(text("正在加载...").exists()){toast("正在等待页面加载,请确保你的网络流畅");sleep(4000); count=count+1000;}
        //当前页面逻辑
         comment = desc("评论").find();
         if(comment.length<1)
         {
             return 1;
         }
         icon=desc("头像").id("com.tencent.mm:id/gs").find();//随机抽取某个人来进行浏览
         if(icon.length<1)
         {
             return 1;
         }
         /**
          * 
          * 先浏览别人的朋友圈 再来点击当前的页面
          * 
          * 
          */
         if (!icon.empty()&&bscount_now>=1)   //处理这一页的朋友圈
         {
            let ran=Math.floor(Math.random() * 2);
            let result=browse_my_moments(icon,ran)//点击头像   
            if(result!=-1)
            {
                if(点赞==null&&评论==null)
                {
                        swip();
                }
                else if(点赞!=null||评论!=null)
                {
                    toast("not null")
                     deal();//处理 别人朋友圈
                  

                }
                bscount_now--;//记录浏览了多少个朋友圈
            }
            
            while(currentActivity()!="com.tencent.mm.plugin.sns.ui.SnsTimeLineUI")
            {
                sleep(3000);
                count=count+1000;
                back();
                sleep(4000)
                var tb=id(fullID+"gs").findOne(5000)
                if(tb!=null){break;}
                if(text("发消息").exists())
                {
                    sleep(2000)
                    back();
                    sleep(2000)
                    break;
                }
                else if(text("朋友圈").exists())
                {
                    back();
                    break;
                }
                
                sleep(2000);
            }
            sleep(3000)
         }
         if(count>=time){//判断浏览的时间是否大于用户指定的时间
            return 1;
        }
         //点赞和评论自己的朋友圈
    if (!comment.empty()) 
    {
        toast("点赞或评论")
         comment.forEach(item =>
             {
                var ra=Math.floor(Math.random() * 5);
                
                if(item!=undefined)
                {
                if(ra<=2)
                {
                        try{
                    console.log("找到一个评论框");
                    if(点赞==1||评论==1){
                   var b1 = item.click();//点击评论框
                   }

                   sleep(3000);
                   count=count+1000;
                    console.log(b1? "点击评论成功" : "点击评论失败");
                    sleep(2000);
                    count=count+1000;
                if (className("android.widget.TextView").text("赞").exists()) 
                {
                    if(praise_count_myself>=1&&点赞==1)
                    {
                        
                        className("android.widget.TextView").text("赞").findOne(3000).parent().click();//点赞
                        sleep(1000);
                        count=count+1000;
                        sum++;
                        toast("已赞个数:"+sum);
                        praise_count_myself--;
                    }
               
                    sleep(2000);
                    console.info("已赞个数：" + sum);
                    sleep(2000);
                    count=count+1000;
                    if(discuss_count_myself>=1&&评论==1)
                    {
                        var b = item.click();//点击评论框
                        sleep(2000)
                        count=count+1000;
                        text("评论").findOne(3000).parent().click();
                        sleep(2000)
                        setText(comment1);
                        sleep(2000);
                        count=count+1000;
                        click("发送");
                        sleep(2000)
                        discuss_count_myself--;
                    }
                   
                    sleep(2000);
                    count=count+1000;
                }


            }catch(e){

                toastLog("错误信息"+e.message)
            }
            }
        }
            count=count+2000;
            sleep(3000)

            })
        }

        let ran1=Math.floor(Math.random() * 1300);
if(ran1<500)
{
ran1=1000;

        if(id(fullID+"d3y").exists())
        {
           
            swipe(657,358,659,ran1,1500);//向上滑
            sleep(5000)
            count=count+2000;
            continue;
        }
        swipe(657,1584,659,1000,1500);//向下滑
        sleep(8000);
        count=count+2000;
        continue;
    }
    sleep(3000)
        if(id("com.tencent.mm:id/tm").exists())
        {

            swipe(657,1584,659,1000,1500);//向下滑
            sleep(8000);
            count=count+2000;
           
            continue;
        }
       
        sleep(5000);
        count=count+2000;
}


}
/**====================================滑动函数================================================== */
function swip()
{
    let time4=other_bstime;
    sleep(5000)
     while(time4>1)
     {

        count=count+5000;
       time4--;
        toast(time4)
        
     let ran1=Math.floor(Math.random() * 1300);
     time4--;
     if(ran1<500)
     {
         ran1=1000;
     }
    if(ran1==1000)
    {
        time4--;
        if(id(fullID+"tm").exists())
        {
            swipe(657,1584,659,ran1,1500);//向下滑
            sleep(8000);
            time4--;
            continue;
        }
        swipe(657,358,659,ran1,1500);//向上滑
        sleep(8000)
        continue;
    }
        if(id(fullID+"d3y").exists())
        {
            time4--;
            swipe(657,358,659,ran1,1500);//向上滑
            sleep(5000)
            continue;
        }
        swipe(657,1584,659,ran1,1500);//向下滑
        sleep(8000);
        time4--;
     }
    

    }
/**====================================随机浏览别人的朋友圈=================================================== */
function browse_my_moments(icon,ran)//浏览好友的朋友圈
{
    sleep(2000)
    count=count+1000;//总的时间
    if(icon[ran]==undefined){
      
        ran=0;
    }
    sleep(2000)
    // if(icon[ran].clickabe())
    // {
try{
       icon[ran].click();
    // }

    sleep(2000)
    let ll=text("音视频通话").exists();//自己发布的空间
      if(ll==false)
      {
            return -1;
      }
      
        sleep(3000);
        count=count+1000;
        if(id("com.tencent.mm:id/a16").text("关注公众号").exists())
        {
            sleep(2000);
        toast("这是一个公众号")
            count=count+1000;
            return -1;//此号是公众号
        }

        let ne=id("com.tencent.mm:id/b2f").findOne(2000);
        if(ne!==null)
        {
            sava_nickname[cu]=ne.text();
            if(sava_nickname[cu]==sava_nickname[cu-1])
            {
                toast("此人已浏览过了");
                return -1;
            }
            cu++;
            }


            else{
                return -1;
            }
       
        sleep(3000)
        let c1=id("com.tencent.mm:id/ja").text('朋友圈').findOne(3000);
        sleep(2000);
        count=count+1000;
        if(c1!=null){
            c1=c1.bounds();
            if(c1==undefined){return 0;}
            let y=c1.centerY();
            y=y<0?-y:y;
            click("朋友圈");
            click(c1.centerX(),y);
            sleep(2000);
            count=count+1000;
        }

    }catch(e){
        toastLog(e.message)
    }

}

/**+++++++++++++++++++++++++++处理浏览别人朋友圈++++++++++++++++++++++++++++++ */
function deal()

{
        var count_pra=praise_count_other;
        var disuss_count=discuss_count_other;
        var time2=other_bstime;
        var count_time=time2/2;
     
        sleep(4000);
        swipe(789,1688,800,1254,1800)
        sleep(4000)
        if(textContains("朋友仅展示最近").exists()||textContains("非对方好友的朋友只显示最近").exists())
        {
            toast("此朋友圈较少。。")
            sleep(5000);
            count=count+1000;
            return 1;
        
        }
       else if(id("com.tencent.mm:id/d3y").exists())
        {
            toast("此朋友圈可能不让浏览")
            sleep(2000)
            return 0;
        }
        else if(id("com.tencent.mm:id/esi").exists())
        {
            toast("此朋友圈较少")
            return 0;
        }
        sleep(3000)
    while(1){
/**
 * 设置一个等待时间 当时间到后就直接退出
 * 
 * 
 * 
 */
if(time2<=1||count>time)//判断浏览别人朋友圈的时间
{
   toast("time....")
    return 1;
}

time2--;

       while(text("正在加载...").exists()){toast("正在等待页面加载,请确保你的网络流畅");sleep(4000);}
        sleep(3000)
        count=count+1000;
sleep(2000)
if(textContains("朋友仅展示最近").exists())
{
    toast("浏览完毕")
    return 0;
}
    let pic1=id("com.tencent.mm:id/d2s").boundsInside(0,0,device.width,1780).find();

    sleep(2000)
    let mk1=id("com.tencent.mm:id/b_l").boundsInside(0,0,device.width,1780).find();
    sleep(1000)
    let f=id("com.tencent.mm:id/b3b").boundsInside(0,0,device.width,1780).find();
    if(pic1.length<1&&mk1.length<1&&f.length<1)
    {
    toast("动态列表为空")
    return 0;
    }
    if(pic1==""&&mk1==""&&f=="")
    {
        toast("找不到列表")
        return 1;
    }

  /**================================图片============================== */
  if (!pic1.empty()) 
  {
  
  let result2= pic(pic1,count_pra,disuss_count,time2);
  if(result2==1)
  {
      return 1;
  }

  count_pra=result2[0];
   disuss_count=result2[1];
   time2=result2[2];
   
}

    
    if (!mk1.empty()) 
    {
       
       let result1= mk(mk1,count_pra,disuss_count,time2);
        if(result1==1)
        {
            toastLog("finsh")
            return 1;
        }

        count_pra=result1[0];
        disuss_count=result1[1];
        time2=result1[2];
       
    }
       /**================================other============================== */
   
    
    if (!f.empty())
     {
       
        let result13=mk(f,count_pra,disuss_count,time2);
        if(result13==1)
        {
            return 1;
        }
        count_pra=result13[0];
        disuss_count=result13[1];
        time2=result13[2];
       
    }
 
    let ran1=Math.floor(Math.random() * 1300);
    time2--;
    if(ran1<500)
    {
        ran1=800;
    }
   if(ran1==1000)
   {
    time2--;
       if(id("com.tencent.mm:id/tm").exists())
       {
           swipe(657,1584,659,ran1,1500);//向下滑
           sleep(8000);
           time2--;
           continue;
       }
       swipe(657,358,657,ran1,1500);//向上滑
       sleep(8000)
       continue;
   }
   if(id("com.tencent.mm:id/d3y").exists()||textContains("朋友仅展示最近").exists())
   {
    time2--;
       swipe(657,358,659,ran1,1500);//向上滑
       sleep(5000)
       toast("此朋友圈已浏览到底了")
       return 1;
      
   }
       if(id("com.tencent.mm:id/d3y").exists())
       {
        time2--;
           swipe(657,358,659,ran1,1500);//向上滑
           sleep(5000)
           continue;
       }


       swipe(657,1584,659,ran1,1500);//向下滑
       sleep(8000);
       if(textContains("朋友仅展示最近").exists())
       {
           toast("浏览完毕")
           return 0;
       }
       time2--;
    }
   
            sleep(5000);

    /**================================向下滑动别人朋友圈================================================ */
   
}

/**+++++++++++++++++++++++++++处理文字的控件++++++++++++++++++++++++++++++ */
  function mk(mk,praise,diusss,other_bstime1)//寻找其他文字的控件
  {
      /**
       * 
       * 遍历寻找到的所有文字说说
       * 
       * 
       */
let recode=new Array();
 mk.forEach(item =>
     {
      
        if(other_bstime1<=1)
        {
            return 1;
        }
   
        sleep(1000)
     
            let m=item.bounds();
      if(m!=undefined)
{
            sleep(2000);
            other_bstime1--;
            count=count+1000;
            let yy=m.centerY();
            if(yy<0)
            {
                yy=-yy;
            }
  var hh=Math.floor(Math.random() * 5);

  try{
  if(hh<3)
  {
            click(m.centerX(),yy);
            sleep(3000);
            other_bstime1--;
            if(点赞==1&&praise>1)
            {
                let eyz=id(fullID+"ik").findOne(2000);//点击评论
                if(eyz!=null){
                    eyz.click();
                }
                sleep(2000)
                 if (text("赞").exists())//判断是否已经赞过l 
                  {   
                    sleep(2000);
                    count=count+1000;
                    other_bstime1--;
                
                    sleep(1000)
                    toast("正在点赞")
                    click("赞");
                    praise--;
                }
            
        }
                sleep(2000);
                count=count+1000;
                other_bstime1--;
                if(评论==1&&diusss>1)
                {               
             
                    text("评论").setText(comment1);
                    sleep(3000)
                    click("发送");

                    diusss--;
                
            }
        }


    }catch(e){
        toastLog(e.massage)
    }
    }
                sleep(2000);
                other_bstime1--;
                count=count+1000;
            while(currentActivity()!="com.tencent.mm.plugin.sns.ui.SnsUserUI"){
                
                sleep(3000)
                back();sleep(3000); 
                var tb=id("com.tencent.mm:id/baj").findOne(5000)
                if(tb!=null){break;}
                if(text("发消息").exists())
                {
                    back();
                    sleep(1000)
                    break;
                }
               
                else if(text("朋友圈").exists())
                {
                    break;
                }
        
        }
     });
     recode[0]=praise;
     recode[1]=diusss;
     recode[2]=other_bstime1;
return recode;

  }

/**+++++++++++++++++++++++++++处理图片和视频的控件++++++++++++++++++++++++++++++ */
function pic(pic,praise1,disucc1,time3)
{
    var count_pic=2;
    let re=new Array();
    pic.forEach(item =>
        {
            
            if(time3<=1||count>time)
            {
                return 1;
            }
            toast(time3)
            sleep(1000)
            let b=item.bounds();
            let ra3=Math.floor(Math.random() * 5);
           if(ra3<3)
           {
            if(count_pic==2)
            {
          
            sleep(1000)
            time3--;
           sleep(1000)
           let n=b.centerY();
           if(n<0){n=-n;}
            count_pic=0;
           click(b.centerX()-100,n);
           var ra2=Math.floor(Math.random() * 10);
           if(ra2<5)
           {
               ra2=5;
           }
           sleep(ra2*1000)
           time3--;
           count=count+1000;
        let zan=false;
           if (className("android.widget.TextView").text("赞").exists())//进行判断赞是否存在 存在就评论和点赞
       {
           zan=true;
       }

           if(praise1<=1||disucc1<=1)
           {

           }
try{
         if(zan==true&&点赞==1)//如果还没点赞
         { 
             sleep(5000)
            let n1=id(fullID+"b3v").findOne(2000);
           sleep(1000)
           if(n1!=null){sleep(1000);n1.click();}
           sleep(1000)
          let t= id(fullID+"ik").findOne(2000);
      
          if(t!=null)
          {
              sleep(5000)
           sleep(1000);t.click();       //点击评论
          }
       
           sleep(2000)
           time3--;
           count=count+1000;
           if(praise1>=1)
           {
           
            click("赞");
            praise1--;
           }
        
           sleep(5000)
           time3--;
           count=count+1000;
           if(评论==1)
           {
           if(disucc1>=1)
           {
            text("评论").setText(comment1);
            sleep(5000)
            toastLog("发送")
            click("发送");
            disucc1--;
           }
        }
                    
        }
    }catch(e){toastLog(e.message)}

       sleep(3000)
       time3--;
    }
           count_pic++;
           count=count+1000;

        }

           while(currentActivity()!="com.tencent.mm.plugin.sns.ui.SnsUserUI"){
               sleep(4000); 
               back();
               sleep(4000); 
               var tb=id(fullID+"baj").findOne(5000)
               if(tb!=null){break;}  
               if(text("发消息").exists())
               {
                   back();
                   sleep(1000)
                   break;
               }
              
               else if(text("朋友圈").exists())
               {
                   break;
               }
            }
    });

    re[0]=praise1;
    re[1]=disucc1;
    re[2]=time3;
 return re;
}

