"ui";
auto.waitFor();//等待打开无障碍辅助
    ui.layout(
        <vertical >
            <toolbar bg="#66CCFF">
                <horizontal>
                    <text textSize="18sp" textColor="white" text="微信添加好友配置" />
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
       <text textSize="20sp" textColor="#000000">请选择以下功能</text>
                <vertical>
                    <horizontal padding="10" bg='#00ff00' w="200sp">
                    <radiogroup id="fbName">
                    <radio text='添加好友' textSize="16sp" id="state1" checked="{{auto.st1=false}}"></radio>
                    <radio text='同意好友请求' textSize="16sp" marginTop="20sp" id="state2" checked="{{auto.st2=false}}"></radio>
                    </radiogroup>
                    </horizontal>
                </vertical>
                </vertical>  
                <horizontal>
                    <text textSize="16sp" text="加好友人数:" />
                    <input id="add_number" w="70" inputType="number"  text="5" />
                    
                    </horizontal>                  
                    <vertical marginTop="5" padding="10">
                     
                     <checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option=true}}" />
                     <checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option2=true}}"/>
                    </vertical>
                    <text padding="10" id="settingText" />
                 <text textColor="red">提示:主号发出添加好友请求后副号再执行“同意好友请求”以便达到效果</text>
                </vertical>
            </scroll>
        </vertical>
    );

var add_numbers;


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
    //threads.start(MianWx )
    add_numbers=ui.add_number.getText();
    var thsave= threads.start(Sava_config_check);
    thsave.interrupt();
 

    });
    });
    var radioText="0";
   var start=threads.start(function(){
        ui.run(()=>{
            ui.fbName.setOnCheckedChangeListener(
                function  re(radioGroup,ids){
                  
                  let count=radioGroup.getChildCount()
                  let id=ids % count -1
                 
                  if( ui.state1.isChecked()){
                      radioText="添加好友";
                      }
                      else if( ui.state2.isChecked()){
                          radioText="同意好友请求";
                          }
             toastLog(radioText)
              
                }
              )
        });
        
    } );



var s;

var fullID="com.tencent.mm:id/"
var WX1=null;
var WX2=null;
var thread;
var arra=new Array();//保存群组名到数组
var path_file="/sdcard/WelHelper/AddFriends/添加微信配置.txt"
var mainth
var sta1=0
var sta2=0
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
   let s1="-1";
   let s2="-1";
 
if(radioText=="同意好友请求")
{
    s1=1;//代表勾选中
  

}
else if(radioText=="添加好友")
{
    s2=1;//代表勾选中
}
config[2]=s2;
config[3]=s1;
config[4]=add_numbers;

    var path="/sdcard/WelHelper/AddFriends/添加朋友配置.txt";
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
let setTh=threads.start(function(){
    wemain  = storages.create("WECHAT");
    let state_one=false;
   let  state=false;
  ui.run(()=>{
    let path="/sdcard/WelHelper/AddFriends/添加朋友配置.txt";
   let array_config= read_content1(path);
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
   
ui.wx1.checked=auto.option=w1;//设置第一个微信
ui.wx2.checked=auto.option2=w2;

if(array_config[2]==1)//添加好友
{
    state=true;
    radioText="添加好友";
  // toast("gggg")
}

if(array_config[3]==1)//同意好友请求
{
    state_one=true;
    radioText="同意好友请求";
    //
   //toast("tttttt")
    
}
//toastLog(array_config[3])
if(array_config[2]==1)
{
    radioText="添加好友";
    sta1=1;
 }
 else if(array_config[3]==1)
 {
     radioText="同意好友请求";
     sta2=1;
     
   }
ui.add_number.setText(array_config[4]);

add_numbers=array_config[4];
ui.state1.checked=auto.st1=state;
ui.state2.checked=auto.st2=state_one;

});

threads.start(st);
sleep(1000)
setTh.interrupt();

} );

let read_content1=function(path)//读取文件保存的内容
{
    let b=files.ensureDir(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  let str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;//返回的是一个数组

}


var nm=0;

function MianWx()
{
 
  toast(radioText)
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
         
            sleep(2000)
            click(300,1352);
           
            Main();
        }
        if(j>0)
        {
            sleep(2000);
            app.launchApp("微信");
           
            sleep(2000)
            click(774,1331)
           
            Main();
        }
    }
    return 1;
}
if(WX1==1)
{
  
    sleep(2000);
    app.launchApp("微信");
    sleep(2000)
    click(300,1352);
  
    //cont=arry_content;
    Main();
    return 1;
}
if(WX2==1)
{
  
    sleep(2000);
    toast("正在启动第二个微信");
    //cont=arry_secoder;
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
    toast("正在停止...");
threads.shutDownAll();
exit();
}
}

function Main()
{
     sleep(8000)
     var b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
     while(b4==false)
     {
        if(textContains("发现").exists())
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
         b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
         var mm=id("com.tencent.mm:id/cns").findOne(2000)
       //  toastLog(mm)
         if(b4==true||mm!=null) {break;}
         sleep(1000);
        // back();
     }
    try{
        sleep(2000)
        if(radioText=="添加好友")
        {
           click(114,1744)//点击主页
           sleep(1500)
           new_friends();
        }
        else if(radioText=="同意好友请求")
        {
            click(139,1731)
            sleep(2000)
           a_Main();
        }

    }catch(e)
    {
        toastLog(e)
    }
    
     sleep(2000)
     var b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
     while(b2==false)
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
         b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
         var mm=id("com.tencent.mm:id/cns").findOne(2000)
       //  toastLog(mm)
         if(b2==true||mm!=null) {break;}
         sleep(1000);
        // back();
     }
     
}

function new_friends()
{
    let h=desc("更多功能按钮").findOne(3000)
    if(h!=null)
{
  let xy=h.bounds()
  if(xy==undefined){return 0}
  let x=xy.centerX();
  let y=xy.centerY();
  x=x<0?-x:x;
  y=y<0?-y:y;
  sleep(1500)
  click(x,y)

}
sleep(1500)
click("添加朋友")
sleep(2000)

add_friend()  

if(new_c.length>0)
{

    let pathn="/sdcard/WelHelper/AddFriends/新的联系人.txt";
    wite=open(pathn,mode="w",encoding="utf-8", bufferSize = 8192);
    for(let i=0;i<new_c.length;i++)
    {
        if(new_c[i]==-1)
        {
            continue;
        }
        wite.writeline(new_c[i]);
        wite.flush();
    }

}
}

var new_contact;
var new_c;
function add_friend()
{
/**
 * 如果要删除前五个联系人的id
 * 可从第六个开始循环这样就保留第六个以后
 * 
 */

    let paths="/sdcard/WelHelper/AddFriends/新的联系人.txt";

    new_c=read_content(paths);//拿到联系人id

    if(new_c==null)
    {
        return 1;
    }
  
    if(Number(add_numbers)>=new_c.length)
    {
        add_numbers=new_c.length;//防止数组越界
    }
    sleep(1000)
    let vb=text("微信号/手机号").findOne(3000)
   if(vb==null)
   {
      return 1;
   }
   let xy=vb.bounds();
   if(xy==undefined){return 0;}
   sleep(1000)
   click(xy.centerX(),xy.centerY());//点击搜索框
     sleep(2000)
try{

    for(let i=0;i<1;i++)
    {
        toastLog("请稍后")
        sleep(2000)
       if(text("微信号/手机号").exists()&&i!=0)
       {
           sleep(1000)
           click(480,282)
       }
       
        sleep(3000)
       setText(new_c[i]);//输入联系人id
        // setText("python")
 
       sleep(2000)
       if(!textContains("搜索").exists())
       {
           new_c[i]=-1;
           continue;
       }
       sleep(3000)
    
       new_c[i]=-1;
       click(599,305);//点击搜索联系人
       
       let r=text("正在查找联系人...").exists();
       while(r)
       {
           r=text("正在查找联系人...").exists();
           sleep(3000)
       }
       sleep(5000)
       //toast("6yyyyyy")
       if(text("发消息").exists())
       {
          toast("此人已是你好友")
          sleep(2000)
          back();
          continue;
       }
       sleep(3000)
       if(id("com.tencent.mm:id/azd").exists())
       {
           if(id("com.tencent.mm:id/azd").findOne(1000).text()!=null)
           {
            click(id("com.tencent.mm:id/azd").findOne(1000).text());
           }
           
       }
       
       sleep(3000)
       if(text("添加到通讯录").exists())
       {
           sleep(2000)
           click("添加到通讯录")
           sleep(5000)
           if(text("发消息").exists())
           {
               toast("添加成功")
               sleep(1000)
               back();
           }
           if(text("发送").exists())
           {
               sleep(1500)
               click("发送")
               sleep(4000)
               if(text("发送").exists())
               {
                   toast("今日加好友频繁为了防止封号已结束加好友")
                   return 1;
               }
              
           }
             back();
             
   
       }
       sleep(1000)
       if(text("该用户不存在").exists())
       {
           toast("你输入的微信号查找不到 请检查是否正确")
           sleep(2000)
           back();
           sleep(1000)
           //click(552,297)
         
       }
   }
}catch(e)
{
toastLog(e.massage)
}


}

/**====================================== */

function a_Main()
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
            sleep(2000)}
            }
        b4=id("com.tencent.mm:id/cns").text("通讯录").exists();
        var mm=id("com.tencent.mm:id/cns").findOne(2000)
      //  toastLog(mm)
        if(b4==true||mm!=null) {break;}
        sleep(1000);
       // back();
    }
 
        sleep(3000)
        click(407,1736);//点击通讯录
        sleep(2000)
        while(!text("群聊").exists())
        {
            swipe(407,566,410,1501,1000)
            sleep(2500);
        }
        swipe(407,566,410,1601,1000)
        sleep(2000)
        click(410,292)
        sleep(2000)
        request_addfriend();

        /**
         * 在此执行新好友的写
         * 
*/


}

function request_addfriend()
{
      sleep(1500)
// let n= id("c1p").text("对方请求添加你为朋友").exists();//查找是否有好友请求添加
let ne=text("接受").findOne(2000);
try{
    while(ne!=null)
    {
            let b=ne.bounds();
            if(b==undefined){continue;}
            let y=b.centerY();
            y=y<0?-y:y;
            if(1815-y<70)
            {
                swipe(822,1731,822,1038,1000);//不能点击
                sleep(2000)
                continue;
            }
              sleep(2000)
            click(b.centerX(),y)//点击验证
            sleep(3000)
            if(text("发消息").exists())
            {
                toast("此人已同意")
                sleep(1000)
                back();
                sleep(3000)
                longClick(b.centerX(),y);
                sleep(1500)
                click("删除")
                continue;
            }
            else if(text("前往验证").exists()||text("完成").exists())
            {
                sleep(2000)
                click("前往验证")
                sleep(4000)
                click("完成")
                sleep(5000)
                if(text("完成").exists())
                {
                    toast("今日加好友已上限")
                    sleep(1500)
                    return -1;
                   }
                back();
                sleep(3000)
                longClick(b.centerX(),y);
                sleep(1500)
                click("删除")
                sleep(2000)
            }
            else if(text("添加到通讯录").exists())
            {

                sleep(2000)
                click("添加到通讯录")
                sleep(5000)
              if(text("发消息").exists())
              {
                let m=text("新的朋友").exists();
                while(m==false)
                {
                    back();
                    sleep(2000)
                    m=text("新的朋友").exists();

                }
                sleep(2500)
                longClick(b.centerX(),y);
                sleep(1500)
                click("删除")
                sleep(2000)
              }
            
              else  if(text("发送").exists())
                {
                    sleep(1500)
                    click("发送")
                    sleep(5000)
                    if(text("发送").exists())
                    {
                        toast("今日加好友已上限,为了防止封号,停止执行")
                        sleep(1000)
                        return 1;
                    }
                   
                sleep(2000)
                back()
                sleep(3000)
                longClick(b.centerX(),y);
                sleep(1500)
                click("删除")
                sleep(2000)
            }
        }
            else
            {
                sleep(1000)
                back()
                sleep(3000)
                longClick(b.centerX(),y);
                sleep(1500)
                click("删除")
                sleep(2000)

            }
           sleep(3000)
        ne=text("接受").depth(12).findOne(2000);
        if(ne==null)
        {
            toast("没有人加你了")
            return 1;
        }
        
    
    }
}catch(e)
{
toastLog(e.massage)
}

if(ne==null)
{
    toast("没有人加你")
}
}


/*===============================================================================================================*/
//读一个文件的内容
var read_content=function(path)
{
  
files.ensureDir(path)
  let  ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
       let str_content=ReadableTextFile.readlines();
  if(str_content==""||str_content==undefined)
  {
      toastLog("文件内容为空!");
      sleep(1000);
    return null;
  }

  ReadableTextFile.close();
    return str_content;

}


