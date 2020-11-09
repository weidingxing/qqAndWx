"ui";
    ui.layout(
        <vertical >
            <toolbar bg="#66CCFF">
                <horizontal>
                    <text textSize="18sp" textColor="white" text="保存脚本配置" />
                </horizontal>
                <horizontal w="*" gravity="right">
                    <button id="save" text="保存脚本配置" textColor="white" style="Widget.AppCompat.Button.Borderless" />
                </horizontal>
            </toolbar>
            <scroll>
                <vertical>
                    <vertical marginTop="5" padding="0 10">
                        <text h="40" gravity="center_vertical" textSize="18sp" text="全局设置" />
                        
                    </vertical>
                <vertical marginTop="5" padding="0 10" >
                <text h="40" textColor="blue" gravity="center_vertical" textSize="18sp"  textColor="black" text="养号设置" />
                    <text h="40" gravity="center_vertical" textSize="18sp" text="微信群创建设置"></text>
                    <horizontal gravity="center_vertical" > 
                    <text  textSize="16sp" text="建群人数:" />
                    <input  id="group_number" inputType="number" hint="默认为全部好友"  />
                    </horizontal>
                    
                </vertical>                    
                    <vertical marginTop="5" padding="10">
                     
                     <checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option=true}}" />
                     <checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option2=true}}"/>
                    </vertical>
                    <text padding="10" id="settingText" />
                 
                </vertical>
            </scroll>
        </vertical>
    );



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
       number_group=ui.group_number.getText();
     threads.start(Sava_config_check);
    // sleep(1500)
       //thread=threads.start(MianWx);
               

    });
    });
var s;
auto.waitFor();//等待打开无障碍辅助
var count=0;//记录加了多少人
var number_group=0;
var  swipe_count=0;
var  count1=39;//拉完39个人后就要先创建
var WX1=null;
var WX2=null;
var thread;
var arra=new Array();//保存群组名到数组
//var path_file="/sdcard/WelHelper/微信群配置.txt"
var mainth
var fullID="com.tencent.mm:id/"
/*======================*/
function Sava_config_check()
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
   config[2]=number_group;
    var path="/sdcard/WelHelper/建群配置.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(let i=0;i<config.length;i++)
    {
        wite.writeline(config[i]);
        wite.flush();
    }
    toast("保存成功")
    wite.close();
    
}

/*=====================================程序的开始================================= */
function st(){
    toast("启动中")
   
    number_group=ui.group_number.getText();
    sleep(1000)
  s=storages.create("start");
   var b=s.get("s");
  if(b!=undefined)
  {
    thread=threads.start(MianWx);
    s.remove("s");
  }
} 


var wemain;

//设置配置内容
var setTh=threads.start(function(){

    wemain  = storages.create("WECHAT");//一开始就创建停止标志

  ui.run(()=>{
    var path="/sdcard/WelHelper/建群配置.txt";
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
   ui.group_number.setText(array_config[2]);
ui.wx1.checked=auto.option=w1;//设置第一个微信
ui.wx2.checked=auto.option2=w2;
number_group=array_config[2];

});

threads.start(st);
sleep(1000)
setTh.interrupt();

} );

var read_content1=function(path)//读取文件保存的内容
{

    var path=path;
    var b=files.createWithDirs(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;//返回的是一个数组

}


var nm=0;
var nickwx="";
function MianWx()
{
if(number_group<2)
{
    toast("群人数至少两个人")
    return 1;
}
  
  else if(number_group=="")
   {
      number_group=1000;
   }
    let i=0;
    try{
    if(WX1==1&&WX2==1)
    {
        i=2;
    
    for(let j=0;j<2;j++)
    {
      
        if(j==0)
        {
            app.launchApp("微信");
            nm=number_group;
            sleep(2000)
            click(300,1352);
            nickwx="wx1";
            Main();
        }
        if(j>0)
        {
            sleep(2000);
            app.launchApp("微信");
            nm=number_group;
            sleep(2000)
            click(774,1331)
            nickwx="wx2";
            Main();
        }
    }
    return 1;
}
if(WX1==1)
{
    nm=number_group;
    sleep(2000);
    app.launchApp("微信");
    sleep(2000)
    click(300,1352);
    nickwx="wx1";
    //cont=arry_content;
    Main();
    return 1;
}
if(WX2==1)
{
    nm=number_group;
    sleep(2000);
    toast("正在启动第二个微信");
    //cont=arry_secoder;
    app.launchApp("微信");
    sleep(2000)
    click(774,1331)
    nickwx="wx2";
    Main();
    return 1;
}

}catch(e){
    toastLog(e.massage)
}
finally{

//write_files.close();
   wemain.put("wx",1);
    toast("正在停止...");
threads.shutDownAll();
exit();
}
}
/**
 * 入群操作一次只能选择40个人进来 并且群数量大于40人都要发出邀请请求
 * 
 * 
 */

 var nm=1000;
function Main()
{
  
    sleep(5000)
    BackMain()
    count=0//每次打开宁外一个微信都要清零
    count1=39;
    swipe_count=0;//清空滑动的次数
    nm=number_group;
    sleep(2000)
    click(139,1731)
    sleep(2000)
    let h=desc("更多功能按钮").findOne(3000)
    if(h!=null)
    {
        let xy=h.bounds()
        if(xy==undefined){return 0;}
        let x=xy.centerX();
        let y=xy.centerY();
        x=x<0?-x:x;
        y=y<0?-y:y;
        click(x,y)
      
    }
    else{
        click(1016,144)
        sleep(1000)
    }
    sleep(2000)
    click("发起群聊")
    sleep(2000)
   let res= create_group();
   if(res==-1)
   {

       return -1;
   }

}

//打开群聊创建群
function create_group()
{
  let i=1;
try{
  let current_text="";

  while(1)
  {

    if(i!=1)
    {
    
        sleep(2000)
        /**
         * 应该记录滑动的次数
         * 
         */
        
        swipe(603,1746,603,600,1000)
        swipe_count++;
        sleep(2000)
    }
    i++;
    sleep(3000)
    let last_text=id(fullID+"gbv").find();//查找群成员名字
    if(last_text.length<1){
       toast("找不到人"); return 0
    }
    let lt=last_text.length-1;
    if(lt<0||lt>last_text.length){
    lt=0
    }
    /**
     * count记录的是加了多少个好友
     * count1记录了加了多少个好友之后要先点确定
     * 
     */
    if(count>=count1)
    {

        /**
         * 执行确定操作
         * 
         */
        count=0;
        count1=250;//更新下一次加的好友人数
         sleep(3000)
        click("确定");
         sleep(4500)
         judge();//判断出现的提示
         sleep(3000);
        var r= maingroup();//此时会回到页面 重新进去加好友
        if(r==-1)
        {
            return -1;
        }
         sleep(2000)
       
    }

    /**这里应该是执行加群完毕后的代码 */
    if(current_text==last_text[lt].text())
    {
        toast("选择完毕");
        sleep(3000)
        click("确定")
        sleep(4000)
        judge();
        sleep(4000)
        sava_contact();
        return -1;
    }

    //选择好友中
   let re= selectMember();//选择好友
   if(re==-1)
   {

      toast("选择完毕");
        sleep(2000)
        click("确定")
        sleep(4000)
        if(text("发送朋友验证").exists())
        {
            sleep(3000)
            click("发送朋友验证")
            sleep(1500)
            setText("你好")
            sleep(3000)
            click("确定")
            sleep(3000)
        }
        judge();
        sleep(4000)
        sava_contact();
        return -1;
   }
    current_text=last_text[lt].text();

  }
   return -1;

}catch(e){
    toastLog(e.message)
}
}


//选择好友加入群聊
/**================================================== */
function selectMember()
{
sleep(3000)
let n=className("android.widget.CheckBox").id("com.tencent.mm:id/fa4").find();//查找打钩的按钮
toast("选择好友中")
//选择还没有加群的好友入群
for(let i=0;i<n.length;i++)//遍历一页的好友
{
    try{

    if(n[i].checked()==true)//如果已加群
    {
        continue;
     
    
    }
    
    else{  // 如果没有加群就入群
        let b=n[i].bounds()
        let y=b.centerY();
        if(b==undefined){return 0}
       if(nm<1)
       {
           return -1;
       }
        if(count>=count1)
        {
           
            return 1;

        }
        else if(1798-y>20&&y-330>20)
        {
            sleep(1000)
            click(b.centerX()-10,b.centerY())//点击选择未进群的好友
            count++;
            nm--;//记录了要拉多少个好友进群

        }
          
    }
    sleep(1000)
    }catch(e){
        toastLog("选择好友发生错误"+e.message)
    }

}


}
/**==============判断出现的提示======================================= */
function judge()
{
    sleep(2000)
    if(text("邀请").exists())
    {
        click("邀请")
    }
    if(text("确定").exists())
    {
        click("确定")
    }

sleep(2000)

}
/**==============加入成功会返回群聊天页面 判断并继续进去加入=================================== */
function maingroup()
{
   
    let m=className("android.support.v7.widget.LinearLayoutCompat").depth(7).findOne(3000);
    if(m!=null)
    {
       let b=m.bounds();
       if(b==undefined){return 1;}
       click(b.centerX(),b.centerY());
       sleep(2000);
//查找添加群成员按扭
        add_member();
        sleep(2000)
        /**
         * 重新回到选择群员页面添加群员
         * -1代表退出
         */
      let result= create_group();
      if(result==-1)
      {
          return -1;
      }
    }
   
    
}

//添加好友选择
function add_member()
{
    
    let add=desc("添加成员").findOne(300);
    while(add==null)
    {
        sleep(2000);
        swipe(839,1600,839,1220,1000);
        sleep(3000)
        add=desc("添加成员").findOne(300);
    }

    let xy=add.bounds();
    if(xy==undefined){return 0;}
    let x=xy.centerX();
    let y=xy.centerY();
    x=x<0?-x:x;
    y=y<0?-y:y;
    click(x,y);
    /**
     * 点击进来后记录上次滑动了 多少次 就滑动了多少次
     * 
     * 
     */

     sleep(3000)
     while(swipe_count>1)
     {
        swipe(603,1746,603,600,1000);
        sleep(2000)
        swipe_count--;
     }

}

/**创建完成保存到通讯录 */

function sava_contact()
{
    sleep(3000)
    let m=className("android.support.v7.widget.LinearLayoutCompat").depth(7).findOne(3000);
    if(m!=null)
    {
       let b=m.bounds();
       click(b.centerX(),b.centerY());
    }
   sleep(2000)

    let contact=text("保存到通讯录").findOne(2000);
if(currentActivity()=="com.tencent.mm.chatroom.ui.ChatroomInfoUI")
{

    let nickname=text("群聊名称").findOne(2000);
    while(nickname==null)
    {
        swipe(455,1487,455,286,1000)
        sleep(2000)
        nickname=text("群聊名称").findOne(2000);
    }
     let ny=nickname.bounds();
     if(ny==undefined){return 0;}
     click(ny.centerX(),ny.centerY());
     setNickname();//设置昵称
     sleep(2000)
     mes();
sleep(3000)
    while(contact==null)
    {
        className("ListView").findOne().scrollForward();
        sleep(2000)
        contact=text("保存到通讯录").findOne(2000);
    }
        let cxy=contact.bounds();
        sleep(1000)
        let cy=cxy.centerY();
        let dx=device.width-64;
        let dy=device.height-cy;
        let c=id(fullID+"aq8").boundsContains(dx, cy,device.width-dx,device.height-dy).findOne(3000);
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
       
}
    
else{
    toast("当前页面错误");
    sleep(2000)
    BackMain()
    return -1;
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
    sleep(3000);
  
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
let xy=c.bounds();
if(xy==undefined){return 0}
if(c.desc()=="已关闭")
{
click(xy.centerX(),xy.centerY())
}

}

//设置创建的群的名称
function setNickname()
{

    let now1 = new Date(); 
    let nowTime1 = now1.toLocaleString(); 
    let date1 = nowTime1.substring(0,10);//截取日期 
    let str=dayname();
    let nick=date1+str+"群"
    sleep(3000)
    setText(nick)
    let paths="/sdcard/WelHelper/"+nickwx+"建群名称.txt";
    let write=open(paths,mode = "a", encoding = "utf-8", bufferSize = 8192);//以追加的形式
    write.writeline(nick);
    write.flush();
    toast("写入成功")
    sleep(2000)
    click("完成")
    sleep(3000)
}

function dayname()
{
    let now = new Date(); 
    let count=1;
    let nowTime = now.toLocaleString(); 
    let date = nowTime.substring(0,10);//截取日期 
    let day = now.getDate();//获取天数
    let month = now.getMonth()+1;//获取月
        let path="/sdcard/WelHelper/"+nickwx+"群配置名称.txt";
        let new_name=read_content1(path);
        if(new_name.length==0)//刚创建时
        {
      
            let write=open(path,mode = "w", encoding = "utf-8", bufferSize = 8192);//以追加的形式
            write.writeline(month);
            write.flush();
            write.writeline(day);
            write.flush();
            write.writeline(count);
            write.flush();
            write.close();
        }
else
{
    if(month>new_name[0])//今天刚好是初月
    {
        count=1;
       
    }
    else if(day>new_name[1])
    {
        count=1;
      
    }
    else
    {
        count=new_name[2];
        count++;

    }
    let write=open(path,mode = "w", encoding = "utf-8", bufferSize = 8192);//以追加的形式
            write.writeline(month);
            write.flush();
            write.writeline(day);
            write.flush();
            write.writeline(count);
            write.flush();
            write.close();
}
return count;

}

