"ui";

ui.layout(
    <vertical bg="#F5F5DC">
        <appbar bg="#00BFFF" h="60sp">
        <toolbar id="toolbar" title="快手极速版">
        <horizontal>
            <button textSize="18sp" id="save" textColor="#8A2BE2" marginLeft="50sp" text="保存脚本配置" />
        </horizontal>
        </toolbar>
        <tabs id="tabs"/>
    </appbar>
    <scroll>
    <vertical>
        <text textColor="blue" bg="#40E0D0" textSize="20sp">观看关注者视频配置:</text>
        <horizontal h="60sp" bg="#40E0D0">
                <text textSize="16sp" bg="#40E0D0" textColor="#7B68EE" marginTop="5sp">视频主个数:</text> 
                <input  id="focus_count" textSize="20sp" marginTop="5sp" inputType="number" w="50sp"></input>
                <text textSize="16sp" bg="#40E0D0" textColor="#7B68EE" marginTop="5sp">总的视频数:</text>
                <input id="focus_videos_count" textSize="20sp" w="90sp" marginTop="5sp" inputType="number"></input>
        </horizontal>
        <text textColor="blue" bg="#40E0D0" textSize="20sp">观看主页视频配置:</text>
        <horizontal h="60sp" bg="#40E0D0">
                <checkbox id="disvideo_normal_statu" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="正常个数:" checked="true"/>
                <input  id="disvideo_normal_count" textSize="20sp" marginTop="5sp" inputType="number" w="50sp"></input>
                <checkbox id="disvideo_innormal_statu" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="非正常个数:" checked="true"/>
                <input id="disvideo_innormal_count" textSize="20sp" w="50sp" marginTop="5sp" inputType="number"></input>
               
        </horizontal>
        <horizontal h="60sp" bg="#40E0D0">
                 <text textSize="16sp" bg="#40E0D0" textColor="#7B68EE" marginTop="5sp">观看多少个视频后就双击:</text>
                <input id="disvideo_agree_count" textSize="20sp" w="50sp" marginTop="5sp" inputType="number"></input>
        </horizontal>
        <vertical> 
       </vertical>
            <text  textSize="18sp" textColor="#FF1493" marginTop="10sp" >功能选项</text>
            <horizontal marginTop="5sp" bg="#D8BFD8" h="50sp">
                <checkbox id="dis_video_state" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="主页视频" checked="{{auto.looks_video=true}}"/>
                <checkbox id="focus_video_state" marginLeft="5sp" textSize="16sp" marginTop="5sp" textColor="#7B68EE" text="看关注者视频" checked="{{auto.look_video=true}}"/>
            </horizontal>
            <text textColor="red">提示:视频主的个数指的是本次要观看,几个自己关注的人,总的视频数是指本次观看自己设定关注的人的视频加起来的总视频。主页视频个数是正常与非正常个数加起来的总个数</text>
        </vertical>
            
        </scroll>
    </vertical>
);
var focus_count,focus_videos_count,disvideo_normal_count,disvideo_innormal_count,disvideo_agree_count//数量值
var disvideo_normal_statu,disvideo_innormal_statu,dis_video_state,focus_video_state//状态值
var quckly_storage=0;
var state=[]
var state_array=["disvideo_normal_statu","disvideo_innormal_statu","dis_video_state","focus_video_state"]
var values=[];
var values_array=["focus_count","focus_videos_count","disvideo_normal_count","disvideo_innormal_count","disvideo_agree_count"];


threads.start(function(){
    ui.run(()=>{
        ui.save.on("click",function()
        {
            focus_count=ui.focus_count.getText();//关注这
            values.push(focus_count)
            focus_videos_count=ui.focus_videos_count.getText();//关注视频
            values.push(focus_videos_count)
            disvideo_normal_count=ui.disvideo_normal_count.getText();
            values.push(disvideo_normal_count)
            disvideo_innormal_count=ui.disvideo_innormal_count.getText();
            values.push(disvideo_innormal_count)
            disvideo_agree_count=ui.disvideo_agree_count.getText();//双击
            values.push(disvideo_agree_count)
            disvideo_agree_count=Number(disvideo_agree_count)//点赞
            disvideo_innormal_count=Number(disvideo_innormal_count)//正常
            disvideo_normal_count=Number(disvideo_normal_count)//不正常
            disvideo_normal_statu=ui.disvideo_normal_statu.isChecked();
            state.push(disvideo_normal_statu)
            disvideo_innormal_statu=ui.disvideo_innormal_statu.isChecked();
            state.push(disvideo_innormal_statu)
            dis_video_state=ui.dis_video_state.isChecked();
            state.push(dis_video_state)
            focus_video_state=ui.focus_video_state.isChecked();
            state.push(focus_video_state)
            var valuesv = "false";
            var flags = valuesv ==="false" ? false : true
            for(let i=0;i<values_array.length;i++)
            {
                if(values[i]=="")
                {
                    values[i]="0";
                }
                quckly_storage.put(values_array[i],values[i]+"");
            }
            for(let i=0;i<state_array.length;i++)
            {
                if(state[i]==undefined)
                {
                    state[i]=flags;
                }
                quckly_storage.put(state_array[i],state[i]);
            }
           
            threads.start(QucklyWorkMain)

        });
    });
} );


var th=threads.start(function(){
    quckly_storage=storages.create("QucklyWork");//创建一个存储
    var value = "false";
    var flag = value ==="false" ? false : true
    for(let i=0;i<state_array.length;i++)
        {
            if(quckly_storage.get(state_array[i])==undefined)//状态
            {
               
                quckly_storage.put(state_array[i],flag)
            }
        }
    for(let i=0;i<values_array.length;i++)//值
        {
            if(quckly_storage.get(values_array[i])==undefined)
            {
                quckly_storage.put(values_array[i],5+"")
            }

        }
    ui.focus_count.setText(quckly_storage.get(values_array[0]))    
    ui.focus_videos_count.setText(quckly_storage.get(values_array[1]))  
    ui.disvideo_normal_count.setText(quckly_storage.get(values_array[2]))  
    ui.disvideo_innormal_count.setText(quckly_storage.get(values_array[3]))  
    ui.disvideo_agree_count.setText(quckly_storage.get(values_array[4]))  

    ui.disvideo_normal_statu.setChecked(quckly_storage.get(state_array[0]));
    ui.disvideo_innormal_statu.setChecked(quckly_storage.get(state_array[1]));
    ui.dis_video_state.setChecked(quckly_storage.get(state_array[2]));
    ui.focus_video_state.setChecked(quckly_storage.get(state_array[3]));
    th.interrupt()    
})


/***
 * 快手极速版脚本 
 * 
 * 针对30秒以内的视频要及时滑动以免重复播放 大于30秒的视频就判断其时间 看完就滑动视频 设定看多少个视频后就双击关注
 * 功能有 看自己关注的视频主的视频 还有看默认的视频
 * 
 */
 //拖动滑块 title_tv
const QucklyWorkFullId="com.kuaishou.nebula:id/";
var stop=1;
function BackMain()
{
    if(currentActivity()!="com.yxcorp.gifshow.HomeActivity")
    {
        while(currentActivity()!="com.yxcorp.gifshow.HomeActivity")
        {
            toastLog("backmain")
            back()
            sleep(4000)
            if(currentActivity()=="com.yxcorp.gifshow.HomeActivity")
            {
                return 0;
            }
        }
    }
}
 function QucklyWorkMain()
 {
    app.launchApp("快手极速版");  
    toast("启动中....")
    var tatolVideo=Number(disvideo_innormal_count)+Number(disvideo_normal_count);//总的视频个数
    var th=threads.start(moniteRun)
    var ve=threads.start(verify)
    sleep(30000)
    while(textContains("向右滑动").exists()||textContains("拖动滑块").exists())
    {
            sleep(10000)
    }
    BackMain()
    sleep(2000)
    var close=getpoint_by_id("close")

    if(close)
    {
        click(close[0],close[1])
    }
    try{
       
        if(focus_video_state)//看关注者视频
        {
            FocusUpVideos(Number(focus_count),Number(focus_videos_count));
            sleep(3000)
        }
        if(dis_video_state)
        {
            toastLog("主页")
            DiscoverVideos(tatolVideo)
        }
        toastLog("正常结束")
    }catch(e)
    {
        toastLog("异常结束,发生错误-->"+e.message);
    }
    finally{
        home();
        stop=0;
        console.show()
        ve.interrupt();
        th.interrupt()
    }

 }
//关注的人的视频
 function FocusUpVideos(fCount,Fvideos)
 {
    click(device.width/2,device.height/2)
    sleep(2000)
    var dis=getpoint_by_id("home_search_entrance")
    while(textContains("向右滑动").exists()||textContains("拖动滑块").exists())
    {
            sleep(10000)
    }
    try{
    if(dis)//点击关注
    {
        if(device.width===1080)//适应屏幕
        {
            click(dis[0]-500,dis[1])
            sleep(5000);   
           
        }
        else
        {
            swipe(150,device.height/2,device.width-200,device.height/2-100,1000)
            sleep(5000)
          
        }
        var j=1;
        var s=Fvideos;
        while(1)
        {
            var r=parseInt(s*(j/fCount));//取整。。
            toastLog("第"+j+"个看->"+r) 
            s=s-r;   
            toastLog("剩余->"+s);
            lookUpVideos(r)
            sleep(2000)
            if(j==fCount||r==0||s==0)
            {
                toastLog("看完了")
                return 0;    
            }
            j++;
        
        }
        
    }
    }catch(e)
    {
        toastLog("关注错误"+e.message)
    }

 }

///观看自己关注的人的视频
function lookUpVideos(r)
{
    var rsw=Math.floor(Math.random() * 4);
    if(rsw==0)
    {
        rsw=1;
    }
    while(rsw)
    {
        sweps()//随机滑动
        rsw--;
    }
    if(textContains("向右滑动").exists()){
            sleep(10000)
    }
         
    var cl= getpoint_by_id("player_cover")
    if(cl)
    {
        if(cl[1]<264)
        {
            click(cl[0],1000)
            sleep(4000)
        }
        else
        {
            click (cl[0],cl[1]);
            sleep(4000)
        }
    }

      if(boundsInside(0,0,device.width , device.height).id("home_search_entrance").exists())
      {
          return 0;
      }
        watchVideos(r,0,0)
        //观看完要返回
        if(textContains("向右滑动").exists()){
            sleep(10000)
            }
        sleep(2000)
        BackMain()
        sleep(3000)
}
    


//主页的发现视频
 function DiscoverVideos(videoCount)
 {
    //查找发现按钮 通过搜索按钮的坐标来查找发现的坐标
    click(device.width/2,device.height/2)
    var dis=getpoint_by_id("home_search_entrance")
    if(dis)
    {
        toastLog("主页视频")
        sleep(4000)
        while(textContains("向右滑动").exists()||textContains("拖动滑块").exists())
    {
            sleep(10000)
    }
        click(dis[0]-300,dis[1])
        sleep(5000);
        watchVideos(videoCount,1,1);//需要传参数
    }
    
 }

//看视频
function watchVideos(counts,fin,agr)
{
    var countFlag=0;
    var foucCount=0;
    toastLog("视频数量->"+counts)
    swipe(device.width/2-100,device.height-500,device.width/2-200,device.height/2-700,1000);;//下滑
    sleep(3000)
    try{
    while(counts>0)
    { 
        if(boundsInside(0,400,device.width , device.height).text("关注").exists ())
        {
            back();
            sleep(2000)
        }
        var disv=Math.floor(Math.random() * 15);
        toastLog("剩余视频个数:"+counts)
        countFlag++;
        if(textContains("直播已结束").exists()){
            swipe(device.width/2-100,device.height-500,device.width/2-200,device.height/2-700,1000)
            sleep(1500)
            }
        if(disv%2==0&&fin!=0&&disvideo_innormal_count>0)
        {
                toastLog("非正常视频")
                var sl=RandomNumBoth(5,8);
                sleep(1000)
                if(countFlag>=disvideo_agree_count&&agr!=0)
                {
                    foucCount++;
                    toastLog("已关注"+foucCount+"个")
                    click(device.width/2,device.height/2-200)
                    click(device.width/2,device.height/2-200)
                    countFlag=0;
                }
                sleep(sl*1000)
                swipe(device.width/2-100,device.height-500,device.width/2-200,device.height/2-700,1000);;//下滑
                sleep(2000)
                disvideo_innormal_count--;//非正常的也减一
                counts--;//总的减一
                continue;
                
        }
        
        if(countFlag>=disvideo_agree_count&&agr!=0&&!boundsInside(0,400,device.width , device.height).textContains("点击全屏").exists())
        {
            foucCount++;
            toastLog("已关注"+foucCount+"个")
            click(device.width/2,device.height/2)
            click(device.width/2,device.height/2)
            countFlag=0;
        }
        if(!boundsInside(0,400,device.width , device.height).textContains("点击打开").exists()&&!boundsInside(0,400,device.width , device.height).id(QucklyWorkFullId+"player_duration").exists())
        {
            sleep(4000)
            if(!boundsInside(0,400,device.width , device.height).textContains("说点什么").exists()&&!boundsInside(0,400,device.width , device.height).textContains("点击全屏").exists())
            {
                click(device.width/2,device.height/2-200)
            }
          
        }
        var videoTime=getText_by_id("player_duration")//查找视频的时间
        if(videoTime)
        {
            sleep(1000)
            click(device.width/2,device.height/2);
            var vmesc=converMesc(videoTime)
            toastLog("视频时间=="+vmesc+"秒")
            sleep((vmesc-3)*1000)
            if(boundsInside(0,400,device.width , device.height).text("关注").exists ())
            {
                back();
                sleep(2000)
            }
            swipe(device.width/2-100,device.height-500,device.width/2-200,device.height/2-700,1000);;//下滑
            sleep(2000)
            counts--;
        }
        else//为30秒以内的视频
        {
            if(boundsInside(0,400,device.width , device.height).textContains("点击打开").exists())
            {
                toast("长图")
                sleep(3000);
                swipe(device.width/2-100,device.height-500,device.width/2-200,device.height/2-700,1000);;//下滑
                sleep(3000)
                counts--;
                continue;
            }
            if(!boundsInside(0,400,device.width , device.height).textContains("说点什么").exists()&&!boundsInside(0,400,device.width , device.height).textContains("点击全屏").exists())
            {
                click(device.width/2,device.height/2-200)
            }
            toastLog("短视频")
            var sleepTime=RandomNumBoth(8,13)
            sleep(sleepTime*1000)//睡眠时间后再滑
            if(boundsInside(0,400,device.width , device.height).text("关注").exists ())
            {
                back();
                sleep(2000)
            }
            toast("下滑")
            swipe(device.width/2-100,device.height-500,device.width/2-200,device.height/2-700,1000);;//下滑
            sleep(2000)
            counts--;
        }
    }
}catch(e)
{
    
    toastLog("看视频发生错误->"+e.message)
    back();
}
    
}

/*
 * 以下为工具方法
 */
function getpoint_by_id(ID)//通过id找坐标
{
    let point=[];
    var p;
   p=boundsInside(0,0,device.width,device.height).id(QucklyWorkFullId+ID).findOne(1500);
    if(p==null)
    {
        
        p=id(QucklyWorkFullId+ID).findOne(1500)
        if(p==null){
        toast("找不到坐标")
        return false;}
    }
    else if(p!=null)
    {
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
function getPoint_by_text(texts)
{

   var point=[]
   var p=boundsInside(0,0,device.width , device.height).text(texts).findOne(1500)
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

function getText_by_id(ID)
{
    var p;
     p=boundsInside(0,400,device.width , device.height).id(QucklyWorkFullId+ID).findOne(1500);
    if(p==null)
    {
        toast("无时间")
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

function RandomNumBoth(Min,Max)
{
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;  
}

function converMesc(stringmes)
{
    if(stringmes)
    {
        var sp=stringmes.split(":");
        var mesc=(Number(sp[0][1])*60)+Number(sp[1]);
        return Number(mesc);  
    }
   
}

function verify()
{
    try{
    while(1)
    {
        toastLog("verity")
        sleep(2000)
        if(textContains("向右拖动").exists()||textContains("滑块拖动").exists())
        {
            toastLog("发现验证码")
            dragSlider();//进行滑块
            if(textContains("滑块拖动").exists())
            {
                back();
            }
        } 
    }
    }
    catch(e)
    {
        toastLog("验证错误->"+e)
    }
}
   
//线程监控
function moniteRun()
{
    try{
    while(1)
    {
        toastLog("monitor")
        if(stop==0)
        {
            return 0;
        }
        sleep(5000)
        
        if(currentPackage()!="com.kuaishou.nebula"&&currentPackage()!="com.baidu.input_huawei")
            {

                sleep(2000)
                recents();
                sleep(1500)
                click("快手极速版")
                sleep(3*1000);
            }
           
        var cs;    
        if(id(QucklyWorkFullId+"close").exists()||text("立即领取").exists())
        {
            if(cs=getpoint_by_id("close"))
            {
                toastLog("发现弹窗")
                click(cs[0],cs[1])
            }
           
        }   
        if(text("我知道了").exists())
        {
            click("知道了")
            sleep(2000)
            
        } 

        if(text("立即邀请").exists())
        {
            sleep(2000)
            back();
            sleep(2000)
        }    
            }
    }catch(e)
    {
        toastLog("线程完毕->"+e.message)
    }
}
//随机滑动
function sweps()
{
    
    var ran1=Math.floor(Math.random() * 1300);
    if(ran1<100)
    {
        ran1=800;
    }
    if(ran1==900||ran1%4==0)
    {
       
        swipe(device.width/2,device.height-1500,device.width/2,ran1,1000);//向上滑
        sleep(3000)
        return 1;  
    }
    swipe(device.width/2,device.height-300,device.width/2,ran1,1000);//向下滑
    sleep(3000);
}

function dragSlider() {
    sleep(2000)
    while (true) {
        toastLog("正在识别")
        threads.start(function () {
            var beginBtn;
               if (beginBtn = classNameContains("Button").textContains("立即开始").findOne(2000)) {
                   beginBtn.click();
               }
           });
           threads.start(function(){
            if(!requestScreenCapture()){
                toastLog("请求截图失败");
                sleep(2000)
                exit();
                
                }
           })
           sleep(3000)
        img = captureScreen();
        if (img) {
            break;
        } else {
            toastLog('截图失败,重新截图');
        }
    }
    var x = discernSlidingblock(img, device.width) + 65

    if(x<100)
    {
        back();
        return 0;
    }
    if (x > -1) {
        toastLog("滑动中")
        randomSwipe(device.width-(device.width-130), 957, x, 957)
        sleep(1000)
        back();
        return 0;
    } else {
        toastLog("识别有误，请确认是否在滑块界面");
        return false;
    }
}
/**
 * 计算滑块位置
 * @param {图片} img 
 * @param {分辨率} ratio 
 */
function discernSlidingblock(img, ratio) {
    //创建识别变量
    var temp, temp2, x, y, num, color, p, temp3, arr1;
    //分析设备分辨率
    if (ratio == 720) {
        var tb = [348, 253, 691, 638, 81]
        log("您的设备分辨率为：720p");
    } else if (ratio == 1080) {
        var tb = [463, 387, 912, 831, 125]
        log("您的设备分辨率为：1080p");
    } else {
        toastLog("当前设备分辨率不符合规范")
        return -2
    }
    num = Math.ceil(tb[4] / 3.3 - 4);
 
    //计算滑块位置
    for (var k = 29; k <= 40; k++) {
        temp2 = "";
        color = "#" + k + "" + k + "" + k + "";
        for (var i = 1; i <= num; i++) {
            temp2 = temp2 + "0|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|0|" + color + ",";
            temp2 = temp2 + "1|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|1|" + color + ",";
            temp2 = temp2 + "2|" + i + "|" + color + ",";
            temp2 = temp2 + i + "|2|" + color + ",";
        }
        x = 0;
        while (x > -2) {
            y = 0;
            while (y > -2) {
                temp = "";
                for (var i = 1; i <= num; i += 2) {
                    temp = temp + "0|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|0|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y) + "|" + color + ",";
                    temp = temp + "1|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + i + "|" + color + ",";
                    temp = temp + (tb[4] + x - 1) + "|" + (tb[4] + y - i - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|1|" + color + ",";
                    temp = temp + i + "|" + (tb[4] + y - 1) + "|" + color + ",";
                    temp = temp + (tb[4] + x - i - 1) + "|" + (tb[4] + y - 1) + "|" + color + ",";
                }
                temp = temp + temp2 + "0|0|" + color;
                arr1 = temp.split(",");
                var arr2 = new Array();
                for (var i = 0; i < arr1.length - 1; i++) {
                    arr2[i] = new Array();
                    temp3 = arr1[i].split("|");
                    arr2[i] = [Number(temp3[0]), Number(temp3[1]), temp3[2]];
                }
                try {
                    p = images.findMultiColors(img, color, arr2, {
                        region: [tb[0], tb[1], tb[2] - tb[0], tb[3] - tb[1]],
                        threshold: (Math.floor(k / 10) * 16 + k % 10)
                    });
                    if (p) {
                        img.recycle();
                        return p.x
                    }
                } catch (error) {
                    //出错
                    toastLog("识别失败，错误原因：" + error);
                    return -1;
                }
                y = --y;
            }
            x = --x;
        }
    }
    try {
        img.recycle();
    } catch (error) {
        toastLog("识别失败，错误原因：" + error);
    }
    return -1;
}
/**
 * 真人模拟滑动函数 （滑块滑动）
 * @param {起点x} sx 
 * @param {起点y} sy 
 * @param {终点x} ex 
 * @param {终点y} ey 
 */
function randomSwipe(sx, sy, ex, ey) {
    //设置随机滑动时长范围
    var timeMin = 1000
    var timeMax = 3000
    //设置控制点极限距离
    var leaveHeightLength = 500
 
    //根据偏差距离，应用不同的随机方式
    if (Math.abs(ex - sx) > Math.abs(ey - sy)) {
        var my = (sy + ey) / 2
        var y2 = my + random(0, leaveHeightLength)
        var y3 = my - random(0, leaveHeightLength)
 
        var lx = (sx - ex) / 3
        if (lx < 0) { lx = -lx }
        var x2 = sx + lx / 2 + random(0, lx)
        var x3 = sx + lx + lx / 2 + random(0, lx)
    } else {
        var mx = (sx + ex) / 2
        var y2 = mx + random(0, leaveHeightLength)
        var y3 = mx - random(0, leaveHeightLength)
 
        var ly = (sy - ey) / 3
        if (ly < 0) { ly = -ly }
        var y2 = sy + ly / 2 + random(0, ly)
        var y3 = sy + ly + ly / 2 + random(0, ly)
    }   
 
    //获取运行轨迹，及参数
    var time = [0, random(timeMin, timeMax)]
    var track = bezierCreate(sx, sy, x2, y2, x3, y3, ex, ey)
 
    
    log("随机控制点A坐标：" + x2 + "," + y2)
    log("随机控制点B坐标：" + x3 + "," + y3)
    log("随机滑动时长：" + time[1])
 
    //滑动
    gestures(time.concat(track))
}
/**
 * 计算滑动轨迹
 */
function bezierCreate(x1, y1, x2, y2, x3, y3, x4, y4) {
    //构建参数
    var h = 100;
    var cp = [{ x: x1, y: y1 + h }, { x: x2, y: y2 + h }, { x: x3, y: y3 + h }, { x: x4, y: y4 + h }];
    var numberOfPoints = 100;
    var curve = [];
    var dt = 1.0 / (numberOfPoints - 1);
 
    //计算轨迹
    for (var i = 0; i < numberOfPoints; i++) {
        var ax, bx, cx;
        var ay, by, cy;
        var tSquared, tCubed;
        var result_x, result_y;
 
        cx = 3.0 * (cp[1].x - cp[0].x);
        bx = 3.0 * (cp[2].x - cp[1].x) - cx;
        ax = cp[3].x - cp[0].x - cx - bx;
        cy = 3.0 * (cp[1].y - cp[0].y);
        by = 3.0 * (cp[2].y - cp[1].y) - cy;
        ay = cp[3].y - cp[0].y - cy - by;
 
        var t = dt * i
        tSquared = t * t;
        tCubed = tSquared * t;
        result_x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x;
        result_y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y;
        curve[i] = {
            x: result_x,
            y: result_y
        };
    }
 
    //轨迹转路数组
    var array = [];
    for (var i = 0; i < curve.length; i++) {
        try {
            var j = (i < 100) ? i : (199 - i);
            xx = parseInt(curve[j].x)
            yy = parseInt(Math.abs(100 - curve[j].y))
        } catch (e) {
            break
        }
        array.push([xx, yy])
    }
 
    return array
}
/**
 * 仿真随机带曲线滑动  (视频滑动)
 * @param {起点x} qx 
 * @param {起点y} qy 
 * @param {终点x} zx 
 * @param {终点y} zy 
 * @param {过程耗时单位毫秒} time 
 */
function sml_move(qx, qy, zx, zy, time) {
    var xxy = [time];
    var point = [];
    var dx0 = {
        "x": qx,
        "y": qy
    };
 
    var dx1 = {
        "x": random(qx - 100, qx + 100),
        "y": random(qy , qy + 50)
    };
    var dx2 = {
        "x": random(zx - 100, zx + 100),
        "y": random(zy , zy + 50),
    };
    var dx3 = {
        "x": zx,
        "y": zy
    };
    for (var i = 0; i < 4; i++) {
 
        eval("point.push(dx" + i + ")");
 
    };
    log(point[3].x)
 
    for (let i = 0; i < 1; i += 0.08) {
        xxyy = [parseInt(bezier_curves(point, i).x), parseInt(bezier_curves(point, i).y)]
 
        xxy.push(xxyy);
 
    }
 
    log(xxy);
    gesture.apply(null, xxy);
};
function bezier_curves(cp, t) {
    cx = 3.0 * (cp[1].x - cp[0].x); 
    bx = 3.0 * (cp[2].x - cp[1].x) - cx; 
    ax = cp[3].x - cp[0].x - cx - bx; 
    cy = 3.0 * (cp[1].y - cp[0].y); 
    by = 3.0 * (cp[2].y - cp[1].y) - cy; 
    ay = cp[3].y - cp[0].y - cy - by; 
    
    tSquared = t * t; 
    tCubed = tSquared * t; 
    result = {
        "x": 0,
        "y": 0
    };
    result.x = (ax * tCubed) + (bx * tSquared) + (cx * t) + cp[0].x; 
    result.y = (ay * tCubed) + (by * tSquared) + (cy * t) + cp[0].y; 
    return result; 
};