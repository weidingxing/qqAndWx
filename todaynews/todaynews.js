"ui";
ui.layout(
    <vertical bg="#F5F5DC">
        <appbar bg="#00BFFF" h="60sp">
        <toolbar id="toolbar" title="今日头条极速版">
        <horizontal>
            <button textSize="18sp" id="save" textColor="white" marginLeft="50sp" text="保存脚本配置" />
        </horizontal>
        </toolbar>
        <tabs id="tabs"/>
    </appbar>
    <scroll>
    <vertical>
        <text textColor="blue" bg="#40E0D0" textSize="20sp">小说阅读配置:</text>
        <horizontal h="60sp" bg="#40E0D0">
                <text marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="阅读小说个数:"/>
                <input  id="novel_count" textSize="20sp" marginTop="5sp" inputType="number" w="60sp"></input>
               
        </horizontal>
        <text textColor="red">小说收藏个数为多少则对应着多少个关键字查找小说,每个关键字收藏一本</text>
        <text textColor="blue" bg="#40E0D0" textSize="20sp">文章阅读配置:</text>
        <horizontal h="60sp" bg="#40E0D0">
                <checkbox id="text_normal_statu" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="正常个数:" checked="true"/>
                <input  id="text_normal_count" textSize="20sp" marginTop="5sp" inputType="number" w="50sp"></input>
                <checkbox id="text_innormal_statu" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="非正常个数:" checked="true"/>
                <input id="text_innormal_count" textSize="20sp" w="90sp" marginTop="5sp" inputType="number"></input>
        </horizontal>

        <text textColor="blue" bg="#40E0D0" textSize="20sp">观看视频配置:</text>
       

        <horizontal h="60sp" bg="#40E0D0">
        
                <checkbox id="video_normal_statu" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="正常个数:" checked="true"/>
                <input  id="video_normal_count" textSize="20sp" marginTop="5sp" inputType="number" w="50sp"></input>
                <checkbox id="video_innormal_statu" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="非正常个数:" checked="true"/>
                <input id="video_innormal_count" textSize="20sp" w="50sp" marginTop="5sp" inputType="number"></input>
                
        </horizontal>
        <horizontal  >
        <text textSize="16sp" bg="#40E0D0" textColor="#7B68EE" marginTop="5sp">搜索关键词个数:</text> 
        <input  id="video_key" textSize="20sp" marginTop="5sp" inputType="number" w="50sp"/>
        </horizontal>
        <horizontal  >
        <text textSize="16sp" bg="#40E0D0" textColor="#7B68EE" marginTop="1sp">开宝箱次数:</text> 
        <input  id="openbox_count" textSize="20sp" marginTop="1sp" inputType="number" w="50sp"/>
        </horizontal>
        <vertical>
       
      </vertical>
            <text  textSize="18sp" textColor="#FF1493" marginTop="10sp" >任务或其他功能</text>
            <horizontal marginTop="5sp" bg="#D8BFD8" h="50sp">
                <checkbox id="look_text_state" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="看文章" checked="{{auto.look_video=true}}"/>
                <checkbox id="look_video_state" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="看视频" checked="{{auto.look_video=true}}"/>
                <checkbox id="look_novel_state" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="看小说" checked="{{auto.option_novel=true}}"/>
            </horizontal>
            <horizontal bg="#D8BFD8" h="50sp">
            <checkbox id="novel_collect_state" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="小说收藏:" checked="true"/>
                <checkbox id="today" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="今日签到" checked="{{auto.today=true}}"/>  
                <checkbox  id="openbox" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="开宝箱与任务" checked="{{auto.option_openbox=true}}"/>
            </horizontal>
            <text textColor="red">提示:做任务包括走路赚钱,睡觉赚钱,吃饭补贴,开宝箱,视频文件名请在内存卡的今日头条/视频文件名.txt下写入搜索视频名(第一次运行会创建)其他的脚本已智能设置无需设置</text>
        </vertical>
            
        </scroll>
    </vertical>
);
var box_cout=0;
var readCount=0,videoNormalCount=0,videoInNormalCount=0,textNormalCount=0,textInNormalCount=0,videoKey=0,todayCheck=false,novelCollectKeyCount=1;
var openbox_state=0,videoNormalStatu=0,videoInNormalStatu=0,textNormalstatu=0,textInNormalStatu=0,lookTextStatu=0,look_video,look_novel,collectNovelState;
var create_storage=0;
var Time;
var mstatu;
var ar=["openbox_state","videoNormalStatu","videoInNormalStatu","textNormalstatu","textInNormalStatu","lookTextStatu","look_video","look_novel","collectNovelState"];
var ar_value=[openbox_state,videoNormalStatu,videoInNormalStatu,textNormalstatu,textInNormalStatu,lookTextStatu,look_video,look_novel,collectNovelState]
var numerar=["readCount","videoNormalCount","videoInNormalCount","textNormalCount","textInNormalCount","videoKey","novelCollectKeyCount"]
var nu_value=[readCount,videoNormalCount,videoInNormalCount,textNormalCount,textInNormalCount,videoKey]
var textCount=0 ,videoCount;
threads.start(function(){
ui.run(()=>{

    ui.save.on("click",function(){

        todayCheck=ui.today.isChecked();
        nu_value[0]=ui.novel_count.getText();//获取阅读数量
        nu_value[1]=ui.video_normal_count.getText();//获取视频
        nu_value[2]=ui.video_innormal_count.getText();
        nu_value[3]=ui.text_normal_count.getText()//获取文章
        nu_value[4]=ui.text_innormal_count.getText();
        nu_value[5]=ui.video_key.getText()//获取关键词   
        box_cout=ui.openbox_count.getText();
        if(box_cout=="")
        {
            box_cout=1;
        }
        readCount=nu_value[0]
        novelCollectKeyCount=nu_value[6]
        ar_value[0]=ui.openbox.isChecked();
        ar_value[1]=ui.video_normal_statu.isChecked();//正常
        ar_value[2]=ui.video_innormal_statu.isChecked();//非正常
        ar_value[3]=ui.text_normal_statu.isChecked();//正常
        ar_value[4]=ui.text_innormal_statu.isChecked();//非常
        ar_value[5]=ui.look_text_state.isChecked()//看文章
        ar_value[6]=ui.look_video_state.isChecked()//看视频
        ar_value[7]=ui.look_novel_state.isChecked();//看小说
        ar_value[8]=ui.novel_collect_state.isChecked()//收藏小说
        collectNovelState=ar_value[8];//收藏小说
        openbox_state=ar_value[0]
        var values = "false";
        var flags = values ==="false" ? false : true
        mstatu= ar_value[5]
        if(mstatu==undefined)
        {
            mstatu=flags;
        }
       
        if(todayCheck==undefined)
        {
            todayCheck=flags;
        }
        create_storage.put("mstatus",mstatu)
        create_storage.put("openbox_count",box_cout+"")
        create_storage.put("todayCheck",todayCheck)

        for(let i=0;i<ar.length;i++)
        {
           if(ar_value[i]==undefined)
           {
               ar_value[i]=flags;
           }
            create_storage.put(ar[i],ar_value[i])
        }
        for(let j=0;j<numerar.length;j++)
        {
            if(nu_value[j]=="")
            {
                nu_value[j]="0";
            }
            create_storage.put(numerar[j],nu_value[j]+"")
        }
        
        textCount=Number(nu_value[3])+Number(nu_value[4])//总的文章阅读
        textNormalCount=Number(nu_value[3]);
        textInNormalCount=Number(nu_value[4])
        videoCount=Number(nu_value[1])+Number(nu_value[2])//视频的总
        videoNormalCount=Number(nu_value[1]);
        videoInNormalCount=Number(nu_value[2]);
        videoKey=Number(nu_value[5])
        look_novel=Number(ar_value[7])
        look_video=Number(ar_value[6]) 
        threads.start(Main)
})

});

});

var th=threads.start(function(){
    create_storage=storages.create("today_news");//创建一个存储
    
    var value = "false";
    var flag = value ==="false" ? false : true
    if(create_storage.get("todayCheck")==undefined)
    {
        create_storage.put("todayCheck",flag)
    }
    for(let i=0;i<ar.length;i++)
        {
            if(create_storage.get(ar[i])==undefined)//状态
            {
               
                create_storage.put(ar[i],flag)
            }
        }
        for(let i=0;i<numerar.length;i++)//值
        {
            if(create_storage.get(numerar[i])==undefined)
            {
                create_storage.put(numerar[i],1+"")
            }

        }
        var box=create_storage.get("openbox_count") ;
        if(box==undefined)
        {
            create_storage.put("openbox_count",1+"")
            ui.openbox_count.setText(create_storage.get("openbox_count"))
        }
        else
        {
            ui.openbox_count.setText(create_storage.get("openbox_count"))
        }    
        ui.novel_count.setText(create_storage.get(numerar[0]));//获取阅读数量
        ui.video_normal_count.setText(create_storage.get(numerar[1]))//获取视频
        ui.video_innormal_count.setText(create_storage.get(numerar[2]));
        ui.text_normal_count.setText(create_storage.get(numerar[3]))//获取文章
        ui.text_innormal_count.setText(create_storage.get(numerar[4]));
        ui.video_key.setText(create_storage.get(numerar[5]))//获取关键词 



        ui.today.setChecked(create_storage.get("todayCheck"))

        ui.openbox.setChecked(create_storage.get(ar[0]));
        ui.video_normal_statu.setChecked(create_storage.get(ar[1]));//正常
        ui.video_innormal_statu.setChecked(create_storage.get(ar[2]));//非正常
        ui.text_normal_statu.setChecked(create_storage.get(ar[3]));//正常
        ui.text_innormal_statu.setChecked(create_storage.get(ar[4]));//非常
        ui.look_text_state.setChecked(create_storage.get(ar[5]))//看文章
        ui.look_video_state.setChecked(create_storage.get(ar[6]))//看视频
        ui.look_novel_state.setChecked(create_storage.get(ar[7]));//看小说
        ui.novel_collect_state.setChecked(create_storage.get(ar[8]))

        
        th.interrupt();
})


var thpop;
var thRun

var kl=0
//程序的入口
function Main()
{
    box_cout=Number(box_cout)
    kl=0;
    var novel_video=[];
    if(look_novel)
    {
        novel_video.push("小说")
       
        
    }
    if(look_video)
    {
        novel_video.push("视频")
       
    }
    app.launchApp("今日头条极速版");  
    toast("程序启动中.....")
    sleep(10000)
    toastLog(todayCheck)
    try{
    thpop=threads.start(thPopWind)
    thRun=threads.start(moniteRun)
    BackMain();
    sleep(4000)
    if(openbox_state&&box_cout>0)
    {
        //看宝箱
        openBox(1);
        sleep(6000)
        box_cout--;
    }
    BackMain();//返回主页
    sleep(6000)
    var c=getPoint_by_text("首页")
    if(c)
    {
        click(c[0],c[1])
    }
    sleep(8000)
    var nv=Math.floor(Math.random() * novel_video.length);

    if(collectNovelState)//收藏小说
    {
        click("小说")
        sleep(3000)
        novelCollect();
        sleep(5000)
       
    }
    sleep(3000)
    BackMain();
    for(let i=0;i<novel_video.length;i++)
    {
        if(novel_video[nv]=="小说")
        {
            var re=NovelM()
            if(re==-1)
            {
               
                return 0; 
            }
            click("小说")
            sleep(3000)
            toastLog("看小说")
            novelMain();//看小说
            sleep(6000)
            toastLog("小说完毕")
            BackMain();
            sleep(6000)
            if(text("任务").exists()&&box_cout>0)
            {
                click(743,1728)//点击任务
                sleep(100)
                click(743,1728)//点击任务
                sleep(25000)
                runbox()
                box_cout--;
                sleep(5000)
                BackMain();
                sleep(5000)
                var c=getPoint_by_text("首页")
                if(c)
                {
                    click(c[0],c[1])
                }
            }
            else
            {
                toast("还没到开宝箱时间")
            }
           
            novel_video[nv]="视频"
            continue;
        }
        if(novel_video[nv]=="视频")
        {
            toast("看视频")
            serVideo();//看视频
            sleep(6000)
            toastLog("视频结束")
            BackMain();
            sleep(6000)
            if(text("任务").exists()&&box_cout>0)
            {
                click(743,1728)//点击任务
                sleep(100)
                click(743,1728)//点击任务
                sleep(25000)
                runbox()
                box_cout--;
                sleep(5000)
                BackMain();
                sleep(5000)
                var c=getPoint_by_text("首页")
                if(c)
                {
                    click(c[0],c[1])
                }
            }
            else
            {
                toast("还没到开宝箱时间")
            }
            novel_video[nv]="小说"
            continue;
            
        }
    }
    if(mstatu)
    {
        sleep(3000)
        var c=getPoint_by_text("首页")
        if(c)
        {
            click(c[0],c[1])
        }
        toast("主页浏览")
        sleep(6000)
        articleMain(textNormalCount)//主页浏览
        sleep(5000)
        BackMain();
        sleep(6000)
        if(text("任务").exists()&&box_cout>0)
        {
            click(743,1728)//点击任务
            sleep(100)
            click(743,1728)//点击任务
            sleep(25000)
            runbox()
            box_cout--;
            sleep(5000)
            BackMain();
            sleep(5000)
        }
        else
        {
            toast("还没到开宝箱时间")
        }

    }
    console.show();
    toastLog("over")
}catch(e)
{
    toastLog("出错了"+e.message)
}finally{
    kl=1;
    toastLog("结束运行")
    home();
    console.show();
    thRun.interrupt();
    thpop.interrupt();
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
         toastLog("文件内容为空!");
         return null;
  }
    var split_content=str_content.split("#");
    ReadableTextFile.close();
        return split_content;

}

function getPoint(ID,b)//通过id找坐标
{
    let point=[];
    var p;
    if(b==1){
        longClick(1036,322)
         p=id(ID).findOne(3000);
    }
    else{
         p=id(ID).findOne(3000);
    }

    if(p==null)
    {
        toast("找不到坐标")
        return false;
    }
    else{
        var getpoint=p.bounds();
        if(getpoint==undefined){return -1;}
        let x=getpoint.centerX();
        let y=getpoint.centerY();
         x=x>0?x:-x;//判断坐标的值是不是小于0
         y=y>0?y:-y;
        point.push(x)
        point.push(y)
        return point;
    }
  
}

function getText(ID,b)
{
    var p;
    if(b==1){
        longClick(1036,322)
         p=id(ID).findOne(3000);
    }
    else{
         p=id(ID).findOne(3000);
    }
  
    if(p==null)
    {
        toast("找不到文字")
        return false;
    }
    else{
       var gettext=p.text();
       if(gettext.length<1){
           toast("此控件文字为空")
           return false;
       } 
       else{
           return gettext;
       }

    }


}


function getPoint_by_text(texts)
{

   var point=[]
   var p=text(texts).findOne(3000)
   if(p==null){
       toast("找不到坐标")
       return false;
   }
   else{
    var getpoint=p.bounds();
    if(getpoint==undefined){return -1;}
    let x=getpoint.centerX();
    let y=getpoint.centerY();
     x=x>0?x:-x;//判断坐标的值是不是小于0
     y=y>0?y:-y;
    point.push(x)
    point.push(y)
    return point;
   }

}

function getPoint_by_depthAndInParent(dep,index)//直接点击
{
    sleep(4000)
    var k=depth(dep).indexInParent(index).findOne(3000)
    if(k!=null)
    {
        k=k.bounds()
        click(Math.abs(k.centerX()),Math.abs(k.centerY()))
        return true;
    }
    else{
        toast("查找不到播放按钮")
        return false;
    }
}


//进行视频弹窗判断
function multvideo()
{
    if(textContains("打开优酷APP").exists())
    {
        if(text("×").exists())
        {
            click("×")
            sleep(2000)
        }
        if(text("点击试看").exists())
        {
            click("点击试看");
            sleep(3000)
            var re=text("重试").findOne(2000)
            if(re!=null)
            {
                re=re.bounds()
                click(Math.abs(re.centerX()),Math.abs(re.centerY()))
                sleep(3000)
                click("点击试看");
                sleep(3000)
                if(text("重试").exists())
                {
                    toast("此视频不能观看")

                    var e=id("aua").findOne(3000)
                    if(e!=null)
                    {
                        e=e.bounds();
                        click(Math.abs(e.centerX()),Math.abs(e.centerY()))//点击返回
                        sleep(2000)
                        return -1;
                    }
                    else{
                        back();
                        return -1;
                    }
                }
    
            }
        }
    
    }
  
    //以上是优酷的视频判断、
    //乐视的

    if(text("取消").exists())
    {
        click("取消")
        sleep(2000)
        click("取消")
        sleep(2000)
        var e=id("aua").findOne(3000)
        if(e!=null)
        {
            e=e.bounds();
            click(Math.abs(e.centerX()),Math.abs(e.centerY()))//点击返回
            sleep(2000)
        }
        else {
            return -1;
        }
    }

    //哔哩哔哩
    if(text("高清更流畅，App 内打开观看").exists())
    {
        toast("检测到你进入哔哩哔哩界面")
        sleep(2000)
        var b=getPoint_by_depthAndInParent(21,1)
        if(b==false)
        {
            return -2;
        }
     
     
    }
    if(textContains("打开土豆视频").exists())
    {
        toastLog("检测到你进入土豆视频")
        var b=getPoint_by_depthAndInParent(21,1)
        if(b==false)
        {
            return -2;
        }
       
    }
    if(text("m.tv.sohu").exists())
    {
        toastLog("检测到你进入搜狐视频")
        var b=getPoint_by_depthAndInParent(21,1)
        if(b==false)
        {
            return -2;
        }

    }
    if(text("m.56").exists())
    {
        toast("检测到你进入56视频界面")
        var b=getPoint_by_depthAndInParent(21,1)
        if(b==false)
        {
            return -2;
        }
      }

      if(text("腾讯视频").exists())
      {
        toast("检测到你进入腾讯视频界面")
        sleep(2000)
        var paly=text("播放").findOne(2000)
        if(paly!=null)
        {
            paly.click()
        }
        else{
            toast("查找不到播放按钮")
            return -2;
        }

      }
      if(textContains("打开网易").exists())
      {
        toast("检测到你进入网易视频界面")
        var paly=text("视频").findOne(2000)
        if(paly!=null)
        {
            paly=paly.bounds()
            click(Math.abs(paly.centerX()),Math.abs(Math.abs(paly.centerY())))
        }
        else{
            toast("查找不到播放按钮")
            return -2;
        }


      }
      if(textContains("提示，浏览器有新版本，请立即更新！"))
      {
        toastLog("进入到了被入侵的页面")
        back()
        var e=id("aua").findOne(3000)
        if(e!=null)
        {
            e=e.bounds();
            click(Math.abs(e.centerX()),Math.abs(e.centerY()))//点击返回
            sleep(2000)
            return -1;
        }

      }

      else{
          toastLog("检测不到你进入的界面活动,将退出")
          back()
          sleep(2000)
          var e=id("aua").findOne(3000)
          if(e!=null)
          {
              e=e.bounds();
              click(Math.abs(e.centerX()),Math.abs(e.centerY()))//点击返回
              sleep(2000)
              return -1;
          }
          else{
              click(64,156)
              return -1;
          }
         
      }

    }

var VIDEOSTIME=0;
function watchVideo()
{
    toastLog("正在看视频")
    sleep(5000)
    if(text("继续播放").exists()){
        click("继续播放")
        sleep(3000)
         }
        if(currentActivity()=="com.tt.miniapphost.placeholder.MiniappTabActivity0")
        {
            var fasts=Math.floor(Math.random() *30);
            toast("你进入了小视屏观看界面");
            sleep(3000)
            click(543,640)
            sleep(2000)
            while(fasts>1)
            {
                toast("小视屏观看模式")
                sleep(5000);
                fasts--;
            }
                back()
                sleep(3000)
                if(text("我知道了").exists())
                {
                    click("我知道了")
                    sleep(3000)
                }
                if( videoInNormalCount>0)
                {
                    videoInNormalCount--
                }
              
                return 0;
              
        }
   sleep(4000)


if(currentActivity()!="com.ss.android.article.base.feature.detail2.view.NewVideoDetailActivity")
{

    toastLog("检测不到目前视频的活动界面，将使用默认的看视频模式");
    var detime=Math.floor(Math.random() *30);
    sleep(8000)
    var reb=multvideo()//进行视频的弹窗判断
    if(reb==-1||reb==-2)
    {
        toastLog("检测到你的视频可能不能播放")
        sleep(3000)
        back();
        return 0;

    }
    while(detime>1)
    {
        toastLog("观看视频中....")
        if(text("重新播放").exists())
        {
            toastLog("播放结束")
            break;
        }
        if(text("重试").exists())
        {
            toastLog("结束")
            break;
        }
        sleep(5000)
        detime--;
    }
                back()
                sleep(5000)
                if(text("我知道了").exists())
                {
                    click("我知道了")
                    sleep(3000)
                }
                return 0;

}
    var fullscre=getPoint("g6",1);
    if(fullscre==false){
        toastLog("找不到全屏按钮")
        sleep(1000)
       click(981,603)
       click(981,603)
    }
    else{
        sleep(2000)
        click(fullscre[0],fullscre[1])
        click(fullscre[0],fullscre[1])//点击全屏
    
    }
   
    waitLookVideo();//看视频
   
}

function waitLookVideo()
{

    sleep(5000)
    var stop=Math.floor(Math.random() *60);
    toastLog("stop"+stop)
    var lookTime=Math.floor(Math.random() *10);
    toastLog("innormal="+videoInNormalCount)
    if(lookTime<5)
    {
        lookTime=5;
    }
    lookTime=(lookTime*1000)*60//分钟
    var cutime="";
    var stopTime=1;
    if(stop%5==0)
    {
        stopTime=lookTime;
    }
    else   if(stop%4==0&&videoInNormalCount>1){videoInNormalCount--;}
    else{
        stopTime=1;
    }
    try{
    while(stopTime)//等待视屏观看完
    {
        if(stop%4==0&&videoInNormalCount>1)
        {
            toastLog("st")
            stopTime=stopTime-1500;

        }
        toastLog("正在观看视频")
        var fast=Math.floor(Math.random() *60);
        if(fast<15){
            fast=16;
        }
        sleep(fast*1000)
     
       if(text("重播").exists())
       {
           toastLog("finish")
           toast("观看视频结束")
           return 0;
       }
       if(boundsInside(0,400,device.width , device.height).text("关注").exists())
       {
           
        toastLog("finish")
        toast("观看视频结束")
        return 0;
       }
        
        if(textContains("关闭广告").exists())
        {
            toastLog("广告")
            sleep(2000)
            click("关闭广告")
            sleep(10000)
            if(text("重播").exists())
            {
                toastLog("观看视频结束")
                return 0;
            }
 
        }
        sleep(1000)
        click(739,344)//点击屏幕
        sleep(3000)
        
        var ctime=id("b2e").findOne(2000)//查找时间
        if(ctime!=null){
            var t=ctime.text()
            var k=t.split("/")
            if(k[0]==cutime){
                cutime=k[0];
                toast("检测到视屏可能已经暂停")
                click(739,344)
               var paly= getPoint("b2d",1)
               if(paly!=false){
                click(paly[0],paly[1])
               }
               
            }
            else{
                cutime=k[0];
            }
        }
        if(currentActivity()=="com.ss.android.article.base.feature.detail2.view.NewVideoDetailActivity"&&!textContains("关闭广告").exists())
        {
            if(fast%4==0||fast%3==0){
                toast("快进中...")
             swipe(517+fast,516+fast,1200+fast,516+fast,1500+fast)       //快进     
         }
        }
     
      
    }
}catch(e){
        toastLog("错误信息"+e.message)
    }



}
//线程监控
function moniteRun()
{
    while(1)
    {
        sleep(10000)
        if(currentPackage()!="com.ss.android.article.lite"&&currentPackage()!="com.baidu.input_huawei"&&!text("走路赚钱").exists())
            {

                sleep(2000)
                recents();
                sleep(1500)
                click("今日头条极速版")
                sleep(3*1000);
            }
        if(kl==1)
        {
            return 0;
        }
    }
}


function serVideo()
{
    
    toastLog("搜索视频...")
    
    var path="/sdcard/今日头条/视频文件名.txt"
    var videoName=read_content(path)//读取文件内容
    var randomVideo=0;
    if(videoName==null)
    {
        toastLog("结束")
        return 0;
    }
    else if(videoName.length==1)
    {
        randomVideo=0;
    }
    else
    {
        randomVideo=RandomNumBoth(0,videoName.length-1,0)
    }
    sleep(3000)
   var serp=id("com.ss.android.article.lite:id/ade").findOne(3000)
    if(serp)
    {
       
        var sr=serp.bounds();
        sleep(3000)
        click(Math.abs(sr.centerX()),Math.abs(sr.centerY()))
        sleep(3000)
    }
    else{
       
        if(text("首页").exists())
        {
            click(394,162)//点击搜索框
            sleep(5000)
        }
        
    }

    sleep(3000)
    if(id("com.ss.android.article.lite:id/db").exists())
    {
        setText(videoName[randomVideo])//搜索视频内容
    }
    else
    {
        toastLog("发现你没有进入搜索界面,递归查找")
        BackMain();
        sleep(2000)
        serVideo();

    }
    videoName[randomVideo]=-1;
    sleep(4000)
    click("搜索")
    sleep(10000)
   var v= getPoint_by_text("视频")
   if(v==false){
     return 0;
   }

   else{

    sleep(5000)
    click(v[0],v[1])//点击视频
    sleep(6000)

   }

   //选择视频观看
   //在这里循环
   var vkey=3; 
   var videokeycount=videoKey;
   if(videoKey<=1)
   {
       toastLog("key=1")
    vkey=videoCount;
    selectVideo(vkey)
    return 0;

   }
   toastLog("video="+videoKey)
   var countvideo=-3
   for(let i=0;i<videokeycount;i++)
   {
      countvideo=-3;
        if(videoKey>1&&i!=0)
        {
            toastLog("findkey")
            vkey=1;
            videoKey--;
            videoCount--;
           
            while(1)
            {
                countvideo++;
                if(countvideo>videoName.length)
                {
                    toastLog("关键字已用完")
                    break;

                }
                var k=Math.floor(Math.random() *videoName.length-1);
                if(k<0||k>videoName.length)
                {
                    continue;
                    }
                if(videoName[k]==-1&&videoName[K]!="")
                {
                    continue;
                }
                toastLog(videoName[k])
                sleep(5000)
                setText(videoName[k])
                videoName[k]=-1;
                sleep(4000)
                click("搜索")
                sleep(5000)
               
                break;

            }
         
            selectVideo(vkey)
          
        }
        else
        {
            videoCount--;
            if(i==0)
            {
                vkey=1;
                selectVideo(vkey)
                 videoKey--;
                 continue;

                }
                else
                {
                    toastLog("key finish")
                    vkey=videoCount;
                }
            videoKey--;
         
            while(1)
            {
                var k=Math.floor(Math.random() *videoName.length);
                if(k<0||k>videoName.length)
                {
                    continue;
                    }
                if(videoName[k]==-1)
                {
                    continue;
                }
                toastLog(videoName[k])
                sleep(5000)
                setText(videoName[k])
                videoName[k]=-1;
                sleep(4000)
                click("搜索")
                sleep(5000)
                break;

            }

            selectVideo(vkey)
        }

        
   }
      
}

function selectVideo(vcount)
{
   try{
       toastLog("vk="+vcount)
    for(var i=0;i<vcount;i++)
    {
        
        toastLog("第"+i+"个视频")
        sleep(5000)
        if(i!=0)
        {
            swipe(550,1480,545,900,1000)
        }
    toastLog("查找视频中")
    sleep(5000)
   var s=idContains("card_undefined-default").find()
    if(s.length<1){
        toastLog("找不到相关视频")
        
        return 0;}
    var py=Math.floor(Math.random() *1700);
    if(py<285){
        py=400
    }
    var px=Math.floor(Math.random() *1000);
    if(px<200){
        px=200
    }
    sleep(6000)
    toastLog("正在选择视频")
    click(px,py)//点击视频观看
    sleep(10000)
    
    var b=judgeIsVideo()//这里只是判断了是不是进入到常用的界面而已
    //在这有bug
    if(b==false)
    {
        toastLog("检测不到你进入视频的活动界面")
        sleep(3000)
      
        back();
       continue;
    }
    else if(b==3)//没有点中视频但是在搜索视频页中
    {
        toastLog("递归")
        selectVideo();//递归
    }
    else{
        sleep(10000)
        watchVideo()//看视频
        sleep(3000)
        //看完视频要返回继续选择
        back()
    }
    }
    toastLog("one finish")
   }catch(e){
       toastLog("错误信息"+e.message)
   }
}

function judgeIsVideo()
{
    sleep(4000)
    if(currentActivity()=="com.ss.android.article.base.feature.detail2.view.NewVideoDetailActivity")//视频界面的活动
    {
        return true;
    }
   else if(currentActivity()=="com.ss.android.newmedia.activity.browser.BrowserActivity")//网页视频
    {
        return 1;
    }
    else if(currentActivity()=="com.bytedance.learningplugin.LearningLiteVideoActivity")//付费界面
    {
        return 2;
    }
    else if(currentActivity()=="com.bytedance.ug.sdk.share.impl.ui.b.b")//病毒页面
    {
        return -1;
    }
    else if(currentActivity()=="com.ss.android.article.base.feature.search.SearchActivity")//
    {
        return 3;
    }
    else {return false;}

}

function backSer()
{
    sleep(4000)
    while(currentActivity()!="com.ss.android.article.base.feature.search.SearchActivity")
    {
        toast("back")
        back()
        sleep(6000)
        if(text("相关搜索").exists())
        {
            return 0;
        }
        var history=text("历史记录").findOne(2000)
        if(history!=null)
        {
            setText("武侠")
            sleep(3000)
            click("搜索")
            sleep(3000)
            return 0;
        }
        if(text("首页").exists())
        {
            return 0;
        }
       
    }
}



//随机滑动
function sweps()
{
    
    var ran1=Math.floor(Math.random() * 1300);
    if(ran1<100)
    {
        ran1=900;
    }
    if(ran1==900||ran1%4==0)
    {
       
        swipe(device.width-500,device.height-1500,device.width-510,ran1,1500);//向上滑
        sleep(3000)
        return 1;
    }
    swipe(device.width-500,device.height-300,device.width-510,ran1,1500);//向下滑
    sleep(3000);
    
    
 
}


//看小说
function watchNovel()
{
    toastLog("小说功能")
    if(!text("小说").exists())
    {
        if(id("com.ss.android.article.lite:id/a6s").findOne(3000))
        {
            id("com.ss.android.article.lite:id/a6s").click();
            sleep(4000)
            click("小说")
            sleep(10000)
            return 0;
        }
    }
    else if(text("小说").exists())
    {
        click("小说")
        sleep(10000)
        return 0;
       
    }
    else{
        toastLog("找不到小说功能")
        return -1;
    }
}

function moniteAd()
{
    while(1)
    {
        var c=textContains("视频再领").exists()
        if(c)
        {
            toast("发现弹窗")
            var x=id("com.bytetance.novelplugin:id/novel_coin_exciting_ad_dismiss_btn").findOne(2000)
            if(x)
            {
                toast(9)
                x.click()
            }
            else
            {
                click(548,1459)
                sleep(5000)
            }
        }
    
    }
   
}

function lookNovel()
{
    sleep(3000)
    var currentPage=1;
    var clickNextPage=0;
    var RTime=Math.floor(Math.random() *120);
    if(RTime<20)
    {
        RTime=60;
    }
    RTime=RTime*1000*60
    if(text("广告").exists())
        {
         
                swipe(device.width-100,device.height-1000,device.width/2-310,device.height-1000,1000)
                sleep(5000)
                if(text("广告").exists())
                {
                    swipe(device.width-100,device.height-1000,device.width/2-310,device.height-1000,1000)
                    sleep(5000)
                }
        }
try{
    var mth;
    mth=threads.start(moniteAd)
    var xj=0;
    while(RTime>0)
    {
        xj++;
        toast("阅读中")
        var readTime=Math.floor(Math.random() *30);
        if(readTime<15)
        {
            readTime=18+readTime%4;
        }
        if(text("目录").exists())
        {
            toast("切换全屏")
            var c=Math.floor(Math.random() *1000);
        
            if(c<200)
            {
                c=200;
            }
            click(device.width/2+readTime,c+50);
        }
        RTime=RTime-((readTime+30)*1000);
        sleep((readTime+6)*1000)//阅读时间
        if(!text("广告").exists()&&xj>4)
        {
            xj=0;
            click(548,1459)
        }
        var nextpage=Math.floor(Math.random() *1000);
            if(nextpage<200)
            {
                nextpage=200;
            }
            toastLog("第"+currentPage+"页")
            swipe(device.width-100,device.height-1000,device.width/2-310,device.height-1000,1000)
            sleep(4000)
        if(text("广告").exists())
        {
            clickNextPage++;
            if(clickNextPage==2)
            {
                clickNextPage=0;
                toast("发现广告")
                swipe(device.width-100,device.height-1000,device.width/2-310,device.height-1000,1000)
                sleep(5000)
                continue;
            }
          
        }
        toast(RTime)
        currentPage++;
    }
}   catch(e)
    {
        toastLog("阅读错误"+e.message)
        back();
    }
    finally
    {
        mth.interrupt();
        back();
        sleep(3000)
      
    }
}

function NovelM()
{
    if(currentActivity()!="com.ss.android.article.lite.activity.SplashActivity")
    {
        sleep(3000)
        while(id("com.ss.android.article.lite:id/u_").exists())//返回到主页
        {
            toast("back")
            id("com.ss.android.article.lite:id/u_").click()
            sleep(3000)
        }
        sleep(3000)
    }
    var re=watchNovel();//选中小说功能
    if(re==-1)
    {
        toastLog("找不到小说")
        return -1;
    }

}

function novelSignIn()//小说签到
{
    if(text("签到").exists())
{
    toast("签到")

    var sing= text("签到").findOne(2000)
  if(sing!=null)
  {
      sing=sing.bounds()
      click(Math.abs(sing.centerX()),Math.abs(sing.centerY()))
  }
   
    sleep(4000)
    if(text("好的").exists())
    {
        click("好的")
        sleep(3000)
        back();
    }
    if(text("已签到").exists())
    {
        toast("今日已经签过了")
        sleep(2000)
        back();
    }
    else{
        back();
    }
}

}

function collect()
{
        sleep(5000)
        swipe(400,1600,410,500,1000)
        sleep(3000)
        swipe(400,1600,410,500,1000)
        sleep(3000)
        swipe(400,1600,410,500,1000)
        sleep(3000)
        while(1)
        {
            toast("查找中")
           var cl=RandomNumBoth(465,1550,0)
            click(535,cl)
            sleep(10000)
            if(text("加入书架").exists())
            {
                click("加入书架")
                sleep(5000)
                back();
                sleep(3000)
                return 0;
        
            }
            else if(!text("首页").exists())
            {
                toastLog("此书已加入书架或者不能加入书架")
                back();
                sleep(5000)
                swipe(400,1600,410,500,1000)
                sleep(3000)
                
                //调用返回函数
            }
        }
       
    
}

function novelCollect()
{
        sleep(4000)
        novelSignIn();
        toastLog("小说收藏")
        collect()
        while(id("com.ss.android.article.lite:id/u_").exists())//返回到主页
        {
            id("com.ss.android.article.lite:id/u_").click()
            sleep(5000)
        }

}


function novelMain()
{

    toastLog("看小说")
    lookCollect()//点击我的书架


}

function lookCollect()
{
    sleep(8000)
    var more=text("我的书架").findOne(3000)
    if(more!=null)
    {
        var bookArray=[];
        more=more.bounds()
        click(device.width-100,more.centerY()) 
        sleep(16000)
        if(currentActivity()!="com.ss.android.newmedia.activity.browser.BrowserActivity"||!id("com.ss.android.article.lite:id/u_").exists()||!text("阅读记录").exists())
        {
            toastLog("检测不到你进入收藏界面")
            return 0;
        }
        sleep(5000)
        var b=boundsInside(0,1000,device.width ,device.height).className("android.view.View").depth(19).find()//查找收藏的书
        sleep(3000)
       //随机1到2
    try{
        if(b.length>0)
        {
            for(let i=0;i<b.length;i++)
                {
                    if(b[i]!=null)
                    {
                        if(b[i].text()!="")
                        {
                            bookArray.push(b[i].text())
                        }
                    }
                }


            if(bookArray.length==1)
            {
                toastLog("找到一本小说")
                flag=0;
                click(bookArray[flag])
                sleep(3000)
                return 0;
            }
            else if(bookArray.length<1)
            {
               
                toastLog("bookArray.length<1")
                if(!textContains("书架暂无书籍").exists())
                {
                    for(let i=0;i<b.length;i++)
                    {
                        var fl=Math.floor(Math.random() *b.length)
                        if(i>5)
                        {
                            swipe(400,1600,430,1200,1000)
                            sleep(4000)
                        }
                        try{
                            if(b[i].clickable()==true&&fl%2==0)
                            {
                                b[i].click();
                                sleep(8000)
                                if(currentActivity()=="com.bytedance.novel.reader.view.f"||currentActivity()=="com.bytedance.novel.view.NovelReaderActivity" || text("进度").exists())//进去了阅读
                                {
                                    //阅读小说
                                    lookNovel();
                                    if(i>=readCount)
                                    {
                                        toast("阅读完毕")
                                        return 0;
                                    }
                                }
                                else if(!textContains("我的书架").exists())
                                {
                                    back();
                                    sleep(5000)
                                }

                            }
                        }catch(e)
                            {log("点击error"+e.message)}
                    }
                }
                else
                {
                    toastLog("notfound")

                    click(186,1037)
                    sleep(3000)
                    if(currentActivity()=="com.bytedance.novel.reader.view.f"||currentActivity()=="com.bytedance.novel.view.NovelReaderActivity" || text("进度").exists())//进去了阅读
                    {
                        //阅读小说
                        lookNovel();
                        toastLog("over")
                        return 0;
                    }

                    
                }
               
            }
            else
            {
                try{
                if(readCount==1)
                {
                    var flag=Math.floor(Math.random() *bookArray.length)
                    if(flag<0||flag>bookArray.length)
                    {
                        return 0;
                    }
                    toastLog("点击小说")
                    click(bookArray[flag])
                    sleep(10000)
                    if(currentActivity()=="com.bytedance.novel.reader.view.f"||currentActivity()=="com.bytedance.novel.view.NovelReaderActivity" || text("进度").exists())//进去了阅读
                    {
                        //阅读小说
                        lookNovel();
                    }
                    else if(text("我的书架").exists())
                    {
                        toastLog("检测到你没有进入阅读小说界面")

                    }
                }
                else
                {
                    var currntflag=0;
                    var flag=1;
                    var fl=-3;
                    for(let i=0;i<readCount;i++)
                    {
                        fl=-3;
                        f=Math.floor(Math.random() *20)
                        if(f%2==0)
                        {
                            sweps()
                        }
                        while(1)
                        {
                            fl++;
                            if(fl>bookArray.length)
                            {
                                toastLog("查找完毕")
                                return 0;
                            }
                            flag=Math.floor(Math.random() *bookArray.length)
                            if(flag<0||flag>bookArray.length)
                            {
                                continue;
                            }
                            if(flag==currntflag)
                            {
                                continue;
                            }
                            else
                            {
                                break;
                            }
                        }
                        currntflag=flag;//记录上一次的索引
                        toastLog("点击小说")
                        click(bookArray[flag])
                        sleep(10000)
                        if(currentActivity()=="com.bytedance.novel.reader.view.f"||currentActivity()=="com.bytedance.novel.view.NovelReaderActivity" || text("进度").exists())//进去了阅读
                        {
                            //阅读小说
                            lookNovel();//里面带有返回功能
                            sleep(10000)

                        }
                        else if(text("我的书架").exists())
                        {
                            toastLog("检测到你没有进入阅读小说界面")
        
                        }
                    }
                }
            }catch(e)
            {
                toastLog("阅读错误-->"+e.message)
            }
               
            }  
              
        }
        else if(textContains("书架暂无书籍").exists())
        {
            toastLog("你可能没有收藏任何小说")
            return 0;
        }
       
        }catch(e)
        {
            toastLog("查找小说发生错误-->"+e.message)
        }
        
    }
    else if(!textContainsK("我的书架").exists())
    {
        toastLog("找不到我的书架正在进行递归")
        click("推荐")
        sleep(5000)
        click("小说")
        sleep(10000)
        readCount--;
        if(readCount<-1)
        {
            return 0;
        }
        lookCollect()

      
    }

  
}

function RandomNumBoth(Min,Max,f){
    while(1)
    {
        var c=f;
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        if(c=0)
        {
            return num;
        }
        else if(num%2==0)
        {
            return num;
        }
    }
  
   
}


//主页浏览
function articleMain(tcount)
{
    toastLog("主页")
   var ct=tcount;
   var sf=1;
   var v=1
   sleep(3000)
   click("推荐")
   sleep(3000)
    while(ct>0)
    {
        toastLog("剩余"+ct)
        sleep(2000)
        if(v>tcount){return 0;}
        if(v!=1)
        { 
            sleep(5000)
            if(!(text("首页").exists()))
            {
               
                toastLog("首页")
                sleep(3000)
                var vk=getPoint("com.ss.android.article.lite:id/a1a")
                if(vk)
                {
                    click(vk[0],vk[1])
                    sleep(3000)
                }
                else
                {
                    toastLog("返回")
                    while(!id("com.ss.android.article.lite:id/ey").text("首页").exists())
                    {
                        toastLog("backMain")
                        back()
                        sleep(5000)
                        var n=idContains("aca").find()
                        if(n.length>0)
                        {
                            break;
                        }
                        if(currentActivity()=="com.ss.android.article.lite.activity.SplashActivity"||text("首页").exists()||idContains("ade").exists())
                        {
                            sleep(5000)
                            break;
                        }
                    }
                    sleep(3000)
                }
            }
            
        }
      
        sleep(3000)
        toastLog("第"+v+"个")
        if(textInNormalCount>0)
        {
            if(ct%2==0)
            {
                sf=0;
                textInNormalCount--; 
            }     
        }
      
   if(!text("推荐").exists())
    {
        if(id("com.ss.android.article.lite:id/a8e").findOne(3000))
        {
            id("com.ss.android.article.lite:id/a8e").click();
            sleep(4000)
            click("推荐")
            sleep(10000)
            
        }

    }
    var ran1=Math.floor(Math.random() * 1300);
    if(ran1<300)
        {
            ran1=800;
        }
        if(!text("首页").exists())
        {
          back();
          sleep(4000)
        }
      if(v>1)
      {
            swipe(device.width-500,device.height-500,device.width-510,ran1,1500);//向下滑
            sleep(3000);
            swipe(device.width-500,device.height-500,device.width-510,ran1,1500);//向下滑
            sleep(3000);
      }
     
    var target =boundsInside(0,400,device.width , device.height).id("com.ss.android.article.lite:id/bz").findOne(3000);//找文章
    if(target!=null)
    {
        var b=target.bounds()
        click(Math.abs(b.centerX()),Math.abs(b.centerY()))
        sleep(3000)
    }
  else
    {
        toastLog("找不到文章")
        continue;
    }
    v++;
    sleep(10*1000)
    if(text("不允许").exists())
    {
        click("不允许")
        sleep(3000)
        back()
        sleep(3000)
        continue;
    }
    var c=currentActivity()
    var x=c.search("Video") != -1;  // true
        if(x)
        {
            toastLog("界面错误")
            sleep(4000)
            back()
            continue;
        }
        else if(c=="com.ss.android.article.base.feature.detail2.view.NewDetailActivity")//阅读界面
        {
            sleep(10000)
            if(!id("com.ss.android.article.lite:id/z1").exists())
            {
                toastLog("此文章阅读过或者页面错误")
                continue ;
            }
            reader(sf);
            if(sf==0)
            {
                continue;
            }
            ct--;
            continue;
        }
       
       else if(c=="com.ss.android.article.base.feature.search.SearchActivity")//搜索页
        {
            continue;
        }
    
        else if(c=="com.ss.android.wenda.answer.list.AnswerListActivity")//问答界面
        {
          
            wenda(sf)
            if(sf==0)
            {
                continue;
            }   
            ct--;
            continue;
        }
        else
           {
                var lk=Math.floor(Math.random() *5)//随机1到2
                while(lk)
                {
                    toast("f")
                    lk--;
                    sleep(lk*1000)
                    swipe(device.width-500,device.height-500,device.width-510,ran1,1500);//向下滑
                    break;
                }
            sleep(3000)
           }
    }

}

//阅读
function reader(st)
{
    toastLog("阅读界面")
    var ct=0;
   if(st==0)
   {
        ct=20;
   }
   else
   {
       ct=20
   }
   var co=0;
  while(1)
    {
        toast("阅读中")
        co++;
        var lk=Math.floor(Math.random() *30)//随机1到2
        if(lk<10)
        {
            lk=13;
        }
       
        sleep(lk*1000)
        
        if(boundsInside(0,400,device.width , device.height-300).id("com.ss.android.article.lite:id/b7b").exists()||boundsInside(0,400,device.width , device.height-300).id("com.ss.android.article.lite:id/a1l").exists()
        ||boundsInside(0,400,device.width , device.height-300).id("com.ss.android.article.lite:id/a1n").exists()||co>ct)
        {
            swipe(device.width-599,device.height-900,device.width-610,device.height-1400,1000)
            toastLog("阅读完毕")
            sleep(3000)
            break;
        }
        swipe(device.width-599,device.height-850-lk,device.width-630,device.height-1400,1000)
        sleep(3000)
        if(boundsInside(0,400,device.width , device.height-300).textContains("暂无评论").exists()||boundsInside(0,400,device.width , device.height-300).textContains("已显示全部评论").exists())
        {
            toastLog("阅读完毕")
            sleep(3000)
            break;
        }

    }


}

function wenda(st)
{
    toastLog("问答界面")
    var ct=0;
    if(st==0)
    {
     ct=20;
    }
    else
    {
        ct=30
    }
  
    var fd=0;
    while(1)
    {
        var lk=Math.floor(Math.random() *10)//随机1到2
        fd++;
        if(lk<5)
        {
            lk=5;
        }
        sleep(lk*1000)
        swipe(device.width-599,device.height-300,device.width-610,device.height-1400,1000)
        sleep(3000)
        if(fd>ct)
        {
            toastLog("阅读结束")
            sleep(2000)
            return 0;
        }

    }
}



function BackMain()
{
    sleep(5000)
    if(text("首页").findOne(3000))
    {
        return 0;
    }
    while(!id("com.ss.android.article.lite:id/ey").text("首页").exists())
    {
        toastLog("backMain")
        back()
        sleep(5000)
        var n=idContains("ade").find()
        if(n.length>0)
        {
            break;
        }
        if(currentActivity()=="com.ss.android.article.lite.activity.SplashActivity"||text("首页").exists()||idContains("ade").exists())
        {
            sleep(5000)
            break;
        }
    }
    sleep(2000)
    click("首页")
    sleep(3000)
}
var prom;
//开宝箱

function openBox(f)
{
          sleep(5000)
          toastLog("宝箱")
        if(id("a99").exists()||text("任务").exists()||f==1)//检测是否可以开宝箱
        {
        
            storageOpen=storages.create("OpenSleep");//创建一个存储
            var sleepFlag=storageOpen.get("sleeptime",0+"")//0表示睡醒 1睡觉
            if(sleepFlag==undefined)
            {
                sleepFlag="0";
            }
            var d=new Date()
            var xd=text("任务").exists()

            toastLog("xd="+xd)
            sleep(100)
            click(743,1728)//点击任务
            sleep(100)
            click(743,1728)//点击任务
            //等待
             runbox();//开宝箱
                
              }
                                
            sleep(6000);
            // lookAd();
            if(text("关闭").exists())
            {
                sleep(2000)
                var closes=className("android.widget.Button").text("Close").findOne(3000)

                if(closes!=null){
                    closes.click()
                }
                else{
                    if(text("关闭").exists())
                        {
        
                            click("关闭")
                        }
                }

            }
            sleep(3000)
            var foot=getPoint_by_text("走路赚钱")
            if(foot)
            {
                click(foot[0],foot[1])
                sleep(8000)
                if(g=textContains("领取").findOne(3000))
                {
                    g=g.bounds();
                    click(Math.abs(g.centerX()),Math.abs(g.centerY()))
                    sleep(5000)
                }
                back();
                sleep(4000)

            }
            var eat=getPoint_by_text("吃饭补贴")
            if(eat)
            {
                click(eat[0],eat[1])
                sleep(6000)
                if(textContains("奖励按时吃饭的你").exists())
                {
                    k=textContains("领取").findOne(3000)
                    k=k.bounds();
                    click(Math.abs(k.centerX()),Math.abs(k.centerY()))
                    sleep(5000)
                    click(533,1161)//点击看视频
                    sleep(3000)
                    lookAd()
                    back();
                    sleep(3000)

                }
                else
                {
                    back();
                    sleep(3000)
                }

            }
            if(d.getHours()>=20&&sleepFlag==0)
            {
                //睡觉
                var sp=getPoint_by_text("睡觉赚钱")
                if(sp)
                    {
                        click(sp[0],sp[1])
                        sleep(8000)
                    
                        if(h=textContains("领取").findOne(3000))
                        {
                            h=h.bounds()
                            click(Math.abs(h.centerX()),Math.abs(h.centerY()))
                            sleep(3000)
                        }
                        click("我要睡了");
                        storageOpen.put("sleeptime",1+"");
                        sleep(2000)
                        back();
                    }

            }
            if(d.getHours()>=8&&d.getHours()<20&&sleepFlag==1)
            {
                //不睡觉
                var sp=getPoint_by_text("睡觉赚钱")
                if(sp)
                    {
                        click(sp[0],sp[1])
                        sleep(8000)
                        click("我睡醒了")
                        sleep(3000)
                        if(h=textContains("领取").findOne(3000))
                        {
                            h=h.bounds()
                            click(Math.abs(h.centerX()),Math.abs(h.centerY()))
                            sleep(6000)
                            click(533,1161)//点击看视频
                            sleep(3000)
                            lookAd()
                            storageOpen.put("sleeptime",0+"");
                            back();
                        }
                    }
            }

            if(todayCheck)
            {
                sleep (4000)
                if(!text ("首页").exists())
                {
                    back();
                    sleep(3000)
                }
                toastLog("签到")
                sleep(2000)
                swipe(367,1604,370,100,1000);
                sleep(3000)
                if(text("明日签到").exists())
                {
                    swipe(367,1604,370,1200,1000);
                    sleep (3000)
                    var che=getPoint_by_text("明日签到")
                    if(che)
                    {
                        click(che[0],che[1])
                        sleep(3000)
                        click(552,1216)
                        sleep(3000)
                    }
                    else
                    {
                        toastLog("找不到点击按钮")
                    }
                }
                else{toastLog("找不到签到")}
              
            }
 }
       
function runbox()
{
    sleep(15000)
    if(textContains("签到成功").exists())
            {
                toastLog("发现签到")
                sleep(5000)
                click (535,1185)
                sleep(5000)
                if(textContains("关闭广告").exists())
                {
                    lookAd()
                    sleep (3000)
                    if(!text("首页").exists())
                    {
                        back()
                        sleep(5000)
                    }
                }
                else{
                    sleep(3000)
                    back(); 
                    sleep (3000)
                }
               
            }
    sleep (5000)
    var x=textContains("任务").exists();
    if(x)//点击宝箱
    {
        if(text("任务").exists()||id("com.ss.android.article.lite:id/a99").exists())
        {
            sleep(5000)
            click(896,1508)//点击宝箱
            sleep(3000)
            sleep(6000)
            click(464,1238)//点击看视频
            sleep(4000)
            lookAd()//看广告
            if(!text("首页").exists())
            {
                back();
                sleep(2000)
            }
    
        }
        else{toastLog("找不到宝箱,可能还没到开启时间")}
        
    }
    

}

function lookAd()
{

    sleep(5000)
    if(currentActivity()=="com.ss.android.excitingvideo.ExcitingVideoActivity"||textContains("关闭广告").exists()||currentActivity()=="com.bytedance.article.lite.plugin.adbaseplugin.detail.video.VideoAdDetailActivity")
    {
        if(currentActivity()=="com.bytedance.article.lite.plugin.adbaseplugin.detail.video.VideoAdDetailActivity")
        {
            sleep(3000)
            back()
        }
        var ad=Math.floor(Math.random() * 30);
        if(ad<20){ad=20}
        // sleep(ad*1000)
        while(ad>1)
        {
            ad--;
            sleep(10000)
            if(text("关闭广告").exists())
            {
                sleep(2000)
                click("关闭广告")
                sleep(2000)
                if(text("关闭视频").exists())
                {
                    click("关闭视频")
                }
                return 1;    
            }
        }
    }
    else
    {
        return false;
    }
}

function popWind()//弹窗
{
    
    if(text("查看好友").exists()||textContains("恭喜! 邀请到好友啦").exists())
    {
        var closewind=getPoint("f2");
        if(closewind)
        {
            toast("关闭弹窗")
            click(closewind[0],closewind[1])
        }
        else{
            toast("找不到关闭按钮")

        }
    }
  else  if(id("xo").exists())
    {
        var x=id("xo").findOne(3000)
        if(x!=null){
            sleep(2000)
            x.click();
        }
    }

  else if(text("忽略").exists()||text("立即查看").exists())
  {
      click("忽略")
      
  }
 else if(text("我知道了").exists()||text("取消").exists()||text("好的").exists())
  {
    click("我知道了")
    sleep(1000)
    click("取消")
    sleep(1000)
    click("好的")
  }  
}

function popWork()
{
    if(text("输入邀请码").exists()||textContains("去领1元现金").exists())
    {
        sleep(3000)
        var c=text("去领1元现金").findOne(3000)
        if(c!=null)
        {
            
            c=c.bounds()
            click(Math.abs(c.centerX()),Math.abs(Math.abs(c.centerY())))
            sleep(2000)
            back();
            if(text("我知道了").exists())
            {
                click("我知道了")
            }
        }
    }
}

function thPopWind()
{
    try{
        var i=0;
       
    while(1)
    {
        i++;
        sleep(10000)
        toastLog("running")
        popWind();
        popWork();
    
        if(text("不允许").exists())
            {
                toastLog("find..")
                back();
            }
        if(text("立即更新").exists()||text("以后再说").exists())
        {
            toastLog("发现更新提示")
            var n=getPoint_by_text("以后再说")
            if(n)
            {
                click(n[0],n[1])
            }
            else
            {
                click("以后再说")
            }
        }
        if(text("x").exists())
        {
            click("x");
        }
      if(kl==1)
      {
          break;
      }
            
    }
    
    }catch(e){
        toastLog("error"+e.message)
        }
}
//输入邀请码
function inviteCode(code)
{
    click("任务")
    sleep(3000)
    if(text("去填写").exists())
    {
        click("去填写")
        sleep(4000)
        setText(code)
        sleep(5000)
        click("马上提交")
    }
}



