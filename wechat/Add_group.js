"ui";
    ui.layout(
        <vertical bg="#DEB887">
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
                        <horizontal>
                        <text h="40" gravity="center_vertical" textSize="18sp" text="全局设置" />  
                        <button text="删除日志记录" textColor="red" marginLeft="150sp" id="deletelog"></button>
                        </horizontal>
            
                    </vertical>
                <vertical marginTop="5" padding="0 10" >
                <text h="40" textColor="blue" gravity="center_vertical" textSize="18sp"  textColor="black" text="养号设置" />
                    <text h="40" gravity="center_vertical" textSize="18sp" text="加微信群好友设置"></text>
                    <horizontal gravity="center_vertical" > 
                    <text  textSize="16sp" text="加好友间隔时间:" />
                    <input  id="time" inputType="number" hint="以秒为单位" text="5" />
                    </horizontal>
                    <horizontal gravity="center_vertical" > 
                    <text textSize="16sp" text="加好友人数:" />
                    <input id="add_number" w="70" inputType="number"  text="5" />
                    </horizontal>
                
                </vertical>                    
                    <vertical marginTop="5" padding="10">
                     
                     <checkbox id="wx1" text="微信一" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option=true}}" />
                     <checkbox id="wx2" text="微信二" textSize="15sp" textColor="blue" marginBottom="10" checked="{{auto.option2=true}}"/>
                     </vertical>
                     <text padding="10" id="settingText" />
                     <text textColor="red">注意:删除日志记录将会把记录在文件里的好友名称清除掉,则将会在所有群中对没有加成功的好友再一次发出添加请求!</text>
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

ui.deletelog.click(function(){

    threads.start(deleteLog)

});


    //加群按钮
ui.save.click(function(){
        interval_time=ui.time.getText();
       user=ui.add_number.getText();

       if((interval_time!="")&&(user!=""))
            {
              //thread=threads.start(MianWx);
               thsave= threads.start(Sava_config_check);
            }

    });
    });
    var s;
    var thsave;
var WX1=null;
var WX2=null;
var thread;
var interval_time=0;//加好友间隔时间
var group_count=10;//每页显示的群数量
var user_group=2;//用户的总群
var total_pages=parseInt(user_group/group_count);//得到群页数
var count1=0;//计算总的群数
var arra=new Array();//保存群组名到数组

var path_file="/sdcard/WelHelper/联系人.txt"
var fullID="com.tencent.mm:id/"
var intnumer=0;//获取此群有多少人
var user=0;//用户指定的人数
var mod=0;//剩余多少人
var total_number=0;// 变量存储加了多少人
var nick_name;//存已经加过的人
var write_files;//打开一个文件
var mainth
var pleper=0;
/*======================*/
//删除加过的好友日志记录
function deleteLog()
{
    let cof=confirm("确定删除加好友日志记录吗")
    if(cof)
    {
        files.remove(path_file);
        toast("删除成功!")
    }
    else
    {
        return 1;
    }
}


function Sava_config_check()
{
   var config=new Array();
   config[0]= interval_time;
   config[1]=user;

   if(WX1==null)
   {
       WX1=0;
   }
   if(WX2==null)
   {
       WX2=0;
   }
   config[2]=WX1;
   config[3]=WX2;
    var path="/sdcard/WelHelper/加群好友.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(var i=0;i<4;i++)
    {
        wite.writeline(config[i]);
        wite.flush();
    }
    toast("保存成功")
    thsave.interrupt();
    wite.close();
    
}

/*=====================================程序的开始================================= */
function st(){
    toast("启动中")
    interval_time=ui.time.getText();
    user=ui.add_number.getText();
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
  //toast("hueueueueu")
    wemain  = storages.create("WECHAT");
    //toast("1")
  ui.run(()=>{
    var path="/sdcard/WelHelper/加群好友.txt";
   var array_config= read_content1(path);
   var w1=false;
   var w2=false;
   ui.time.setText(array_config[0]);
   ui.add_number.setText(array_config[1])
   if(array_config[2]==1)
   {
       w1=true;
       WX1=1;
   }
   if(array_config[3]==1)
   {
       w2=true;
       WX2=1;
   }
ui.wx1.checked=auto.option=w1;//设置第一个微信
ui.wx2.checked=auto.option2=w2;

// interval_time=ui.time.getText();
// user=ui.add_number.getText();
});
//toast("111111111111111111111111111111111")
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

function MianWx()
{
    var i=0;
    try{
    if(WX1==1&&WX2==1)
    {
        i=2;
    
    for(var j=0;j<2;j++)
    {
        total_number=0;
        if(j==0)
        {
            app.launchApp("微信");
            //cont=arry_content;
            sleep(2000)
            click(300,1352);
            Main();
        }
        if(j>0)
        {
            sleep(2000);
            app.launchApp("微信");
           // cont=arry_secoder;
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

//write_files.close();
   wemain.put("wx",1);
    toast("正在停止...");
threads.shutDownAll();
exit();
}
}

/*==============;=======*/
function Main() 
{
    toast("请不要触碰屏幕");
    sleep(1000);
    start();
    group();
    radom();
    nick_name=read_file_arrays(path_file);
    write_files=open_file(path_file);//打开一个文件

    toast("正在等待群成员列表的打开");
   sleep(1000);
// waitForActivity("com.tencent.mm.chatroom.ui.ChatroomInfoUI");//等待加群页面是否已经打开了
sleep(2000);
toastLog("请稍后....");
var bool=find_text1_bool();//查找此群有多少人
toast("bool="+bool)
var count_page=calc();//得到滑动的次数
var i=0;

try{

        if(bool)//需要展开群
        {
            toastLog("正在展开群")
            sleep(2000);
            swipe(653,1471,653,200,1000);
            sleep(2000);
            var title=boundsInside(0, 0, device.width, device.height-300).text("查看全部群成员").findOne(5000); //如果此群的群成员大于44个那么应该展开
            if(title==null)
            {
                toastLog("群员为空")
            }
            else{
                title=title.bounds();
            }
            sleep(2000);
            click(title.centerX(),title.centerY());
            sleep(3000);
            toastLog("请稍后,正在查找");
            waitForActivity("com.tencent.mm.chatroom.ui.SeeRoomMemberUI",10000);
            swipe(595,568,595,2647,1000);//向上滑
            while(i<=count_page-1)//页数的滑动
            {
            
                sleep(2000);
                var azd=find_azd();//拿到当前页的群列表
                var new_len =  parseInt( (Object.keys(azd).length)/2);//计算群员
                var result=find_people(azd,new_len);//处理当前页的
                if(result==1)
                {
                    return 1;

                }
                sleep(3000);
                swipe(463,1772,463,296,1000);
                sleep(1000);
                toastLog("第"+(i+1)+"次");
                i++;
            }
            /***
             * 
             * 
             * 以下是处理剩余的人数
             * 
             * 
             * 
             */
            var azd=find_azd();//拿到当前页的群列表
            var new_len =  parseInt( (Object.keys(azd).length)/2);//计算群员
            sleep(1000);
             sleep(1000);
            var result1=surplus(azd,mod,new_len);//剩余人数
        
            if(result1==1){return 1;}
            if(result1==-1){toast("此群已添加完毕");return -1;}
        
            
        }
/*=================================处理不需要展开群==============================================================================*/

        else{ //

            toastLog("不需要展开群")
               var get_ej=find_ej();//拿到当前页的成员id
              var len1 = parseInt( (Object.keys(get_ej).length)/2);
              //var result2=add_friend(get_ej,len1);
              var result2=find_people(get_ej,len1);
      
                if(mod>1)
                {

                    var result3= surpuls_people();
          
                    if(result3==1){return 1;}
                    else {return -1;}

                }

              else if(result2==1){return 1;}
              else{return -1;}

        }
        

    }
    catch(e)
    {
        toastLog(e.message)
    }

finally
{
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




}

/*=======================================获取当前页的人数 并记录========================================================================*/
//获取当前页的人数 并记录
function find_people(azd,len)
{
    for(var j=4;j<len;j++)
    {
        sleep(1000*interval_time)
     if(azd[j]==undefined)
           {
                break;
           }
      if(azd[j].desc()!=""){
          continue;
          }
      
        sleep(2000)
        var c=azd[j].bounds();
        click(c.centerX(),c.centerY()-10);//应该是点击头像
        sleep(3000)
        if(text("发消息").exists())
        {
            sleep(1000);
            toast("此人已是你好友");
            sleep(2000)
            back();
            continue;
         }
        sleep(4000);
        //判断该成员是不是好友
             sleep(1500)
            let add=text("添加到通讯录").findOne(3000);
            if(add==null)
            {
                continue;
            }
            let addb=add.bounds();
            if(addb==undefined){continue;}
                sleep(3000);
                click(addb.centerX(),addb.centerY());
               

                 var names=id(fullID+"f5h").findOne(2000);
                 if(names)
                 {
                     names=names.text();
                     console.log(names);
                 }
                 else
                 {
                     sleep(1000)
                     back();
                     continue;
                 }
                 var bool=判断(names);//判断是否存在
                 if(bool==-2){
                     return 0;}//加群满
                     if(bool==true)//说明已经存在了 不需要添加了
                     {
         
                         toast(names+"已经添加过了");
                         sleep(1000);
                         back();
                         sleep(2000)
                         back();
                           continue;
                     }
                  sleep(2000);
                if(text("确定").exists())
                {
                    sleep(1000)
                    var co=text("确定").findOne(3000);
                    if(co!=null){
                        co.click();
                    }
               
                    sleep(1000)
                    back();
                    continue;
                }
                sleep(3000);
                if(text("发消息").exists())
            {
            
                sleep(3000)    
                back();
                continue;
            }
                
                waitForActivity("com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI",5000);
                sleep(3000);
                
               var t= text("发送").findOne(3000)
               if(t!=null){t.click()}
                sleep(3000)
                if(text("发送").exists())
                {
                    toast("此次加好友过于频繁,为了保护您的账号被封,此次加好友将结束")
                    sleep(1000)
                    return -1;
                }
                waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI",5000);
                sleep(2000);
                //加好友成功后 统计下来
                total_number++;
                if(total_number==user)
                {
                    toast("已添加"+user+"个好友");
                    sleep(2000);
                    back();
                    return 1;
                }
                back();

    }
//如果还没有找到完
return -1;
}
/*=========================================处理展开群的剩余的人======================================================================*/
//
function surplus(azd,mod,len)
{
    sleep(1000);
var l=len-8;
while(mod>0)
{
    if(azd[l].desc()!=""){
        continue;
        }
    sleep(1000*interval_time)
    
    if(azd[l]==undefined){continue;}
    sleep(1000);
   // sleep(1000);
    var c=azd[l].bounds();
 

        sleep(2000);
        click(c.centerX(),c.centerY()-10);
        sleep(5000);
        //判断该成员是不是好友
            if(text("发消息").exists())
            {
                sleep(2000);
                toast("此人已是你好友");
                sleep(3000)
                l--
                mod--;      
                back();
                continue;
            }
            let add=text("添加到通讯录").findOne(3000);
                if(add==null)
                {
                    continue;
                }
                let addb=add.bounds();
                if(addb==undefined){continue;}
                sleep(3000);
                click(addb.centerX(),addb.centerY());
                sleep(3000);


                let names=id(fullID+"f5h").findOne(2000);
                if(names)
                {
                    names=names.text();
                }
                else
                {
                    sleep(1000)
                    back();
                    continue
                }
                var bool=判断(names);//判断是否存在
                if(bool==-2){
                    return 0;}//加群满
                    if(bool==true)//说明已经存在了 不需要添加了
                    {
        
                        toast(names+"已经添加过了");
                        sleep(1000);
                        back();
                        sleep(2000)
                        back();
                          continue;
                    }


                if(text("确定").exists())
                {
                    sleep(1000)
                    var co=text("确定").findOne(3000);
                    co.click();
                    sleep(1000)
                    back();
                    continue;
                }
               
            sleep(3000);
         if(text("发消息").exists())
            {
            
                sleep(3000)    
                back();
                continue;
            }
                waitForActivity("com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI",5000);
                sleep(4000);
                var k= text("发送").findOne(4000);
                if(k==null){continue;}
                k.click();
                sleep(3000)
                if(text("发送").exists())
                {
                    toast("此次加好友过于频繁,为了保护您的账号被封,此次加好友将结束")
                    sleep(1000)
                    return -1;
                }
                waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI",5000);
            //     sleep(4000);
                //加好友成功后 统计下来
                total_number++;
                if(total_number==user)
                {
                    toast("已添加"+total_number+"个好友");
                    return 1;
                }
                //如果还没有就继续添加
                back();
                sleep(5000);
                back();
l--
mod--;
}
toast("此群可能你已经全部添加过所有人了,请去另外一个群添加");
sleep(1000);
return -1;

}

/*=========================================处理不展开群 剩余的人======================================================================*/
function surpuls_people()
{
   
    sleep(1000)
swipe(423,1770 ,423 ,119 ,1200)
sleep(2000)
var ej=id(fullID+"ej_").untilFind();
if(ej==undefined){return 0}
var new_len =  parseInt( (Object.keys(ej).length)/2);//计算群员
for(var i=0;i<new_len-8;i++)
{
    
    if(ej[i]!=""){
        continue;
        }
    sleep(1000*interval_time)
if(ej[i] ==undefined)
{
    break;
}
var c=ej[i].bounds();


    sleep(2000);
    click(c.centerX(),c.centerY()-10);
    sleep(5000);
        //判断该成员是不是好友
            if(text("发消息").exists())
            {
                sleep(2000);
                toast("此人已是你好友");
                sleep(3000)    
                back();
                continue;
            }
            let add=text("添加到通讯录").findOne(3000);
            if(add==null)
            {
                continue;
            }
            try{
            let ad=add.bounds();
            if(ad==undefined){continue;}
                sleep(3000);
                click(ad.centerX(),ad.centerY());
                sleep(3000);


                let names=id(fullID+"f5h").findOne(2000);
                if(names)
                {
                    names=names.text();
                }
                else
                {
                    sleep(1000)
                    back();
                    continue
                }
                var bool=判断(names);//判断是否存在
                if(bool==-2){
                    return 0;}//加群满
                    if(bool==true)//说明已经存在了 不需要添加了
                    {
        
                        toast(names+"已经添加过了");
                        sleep(1000);
                        back();
                        sleep(2000)
                        back();
                          continue;
                    }

                if(text("确定").exists())
                {
                    sleep(2000)
                    var co=text("确定").findOne(3000);
                    co.click();
                    sleep(1000)
                    back();
                    continue;
                }

            }catch(e){

                toastLog(e.message)
            }

                sleep(3000);
                if(text("发消息").exists())
            {
            
                sleep(3000)    
                back();
                continue;
            }
                waitForActivity("com.tencent.mm.plugin.profile.ui.SayHiWithSnsPermissionUI",5000);
                sleep(3000);
                var b=text("发送").findOne(3000);
                if(b!=null)
                {
                    b.click()
                }
           
                sleep(3000)
                if(text("发送").exists())
                {
                    toast("此次加好友过于频繁,为了保护您的账号被封,此次加好友将结束")
                    sleep(1000)
                    return -1;
                }
                waitForActivity("com.tencent.mm.plugin.profile.ui.ContactInfoUI",10000);
            //     sleep(4000);
                //加好友成功后 统计下来
                total_number++;
                if(total_number==user)
                {
                    toast("已添加"+total_number+"个好友");
                    return 1;
                }
                //如果还没有就继续添加
                sleep(2000)
                back();
                sleep(2000);
}
//如果上面没有找到就进来这里
toast("此群已查找完毕,可能之前你已添加过了");
return -1;


}




/*=================================================//查找群展开后的群员列表==============================================================*/

function find_azd()
{
    sleep(2000);
    var azd_id=id(fullID+"f_j").untilFind();
    
    return azd_id;
}


/*=================================================//查找当前的群有多少个联系人=============================================================*/
//查找当前的群有多少个联系人
function find_text1_bool()
{
    sleep(2000);
    var t =className("android.widget.TextView").textContains("聊天信息").findOnce();
    //提取群群员数量
    var str=t.text();
    var str1=str.split('(');
    var str2=str1[1].split(")")
    intnumer=parseInt(str2[0]);
    toastLog("此群有"+intnumer+"人");
    //pleper=intnumer;
    //如果大于44那么就会有多个联系人 那么就应该展开联系人查找
    if(Number(intnumer)>44)
    {
        return true;//应该展开
    }
    else {return false;}

}



/**
 * 算出此群要是展开的话应该怎样
 * 滑动多少次 并查找不重复的值
 * 每个页面的人数是30人
 * 总的人数除30取余 就得到要滑动多少次
 * 
 *//*==========================================计算=====================================================================*/
function calc()
{
    var count=intnumer/30;
    mod =intnumer%30;
    if(mod==intnumer){
        mod=0;}
   // toast("m="+mod);
    return parseInt(count);//得到滑动的次数
}


/*=====================================查找在不展开群成员的状态下的群成员==========================================================================*/
//查找在不展开群成员的状态下的群成员
function find_ej()
{

    waitForActivity("com.tencent.mm.chatroom.ui.ChatroomInfoUI",10000);
    var ej=id(fullID+"f3y").untilFind();
   return ej;
    
}


/*=======================================打开一个文件 并写入========================================================================*/
//打开一个文件 并写入
function open_file(path)
{
    var write=open(path,mode = "a", encoding = "utf-8", bufferSize = 8192);//以追加的形式
    return write;//返回已经打开的文件
}

/*================================判断所加的人是不是已经加过了===============================================================================*/
//
function 判断(text)
{
    pleper=pleper+1;
    if(pleper==intnumer){
        toastLog("pleper="+pleper);
        return -2;
        
        }
    toast("正在判断");
    sleep(1500);
    for(var i=0;i<nick_name.length;i++)
    {

        if(nick_name[i]==text)//如果存在的话那就
        {
            return true;

        }
    }
//如果不在的话就添加到文件
//var write=open_file();
wirte_content(write_files,text);//调用写入函数

return false;

}


/*====================================启动微信==========================================================================*/
function start()
{
//app.launchApp("微信");
toast("正在启动微信,请确保你的微信在首页");
sleep(7000);
//waitForActivity("com.tencent.mm.ui.LauncherUI" );
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
    b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
    var mm=id("com.tencent.mm:id/cns").findOne(2000)
  //  toastLog(mm)
    if(b2==true||mm!=null) {break;}
    sleep(3000);
   // back();
    }

sleep(2000)
click(405,1735)//点击通讯录

sleep(2000)
var oq=text("群聊").findOne(3000)
if(oq!=null)
{
    oq=oq.bounds();
}
else{return 0;}
sleep(3000)
//click("群聊")
click(oq.centerX(),oq.centerY());
sleep(3000);
}


/*==============================================================================================================*/
function group()
{
    toast("正在查找群的个数");
    let group_l=id(fullID+"b32").find();
    let cs=group_l[group_l.length-1].text()
    let xs="";
    while(cs!=xs)
    {
        sleep(2000);
        toast("确保你至少有一个群")
        var group_name=id(fullID+"b32").find();
        var len= group_name.length;
        finds(group_name,len)//保存到数组
        sleep(1500);
        swipe(463,1772,463,296,1000);
        sleep(2000)
        xs=group_name[group_name.length-1].text();
    }

}


/*==================================保存群名到数组============================================================================*/
function finds(group_find,len)
{
    
    for(var i=0;i<len;i++)
    {
        if(group_find[i]==undefined){break;}
        arra[count1]=group_find[i].text();
        count1++;
        
    }
    
}
/*======================================随机抽一个群=========================================================================*/
function radom(t)
{

try{
var ran=Math.floor(Math.random() * count1);
if(arra[ran]==undefined)
{
    toast("正在查找群,请确保你至少有一个群")
    radom();
}
toastLog(arra[ran]);
sleep(2000)
let m=className("android.support.v7.widget.LinearLayoutCompat").findOne(2000);
if(m!=null)
{
   let b=m.bounds();
   if(b==undefined){return 0;}
   click(b.centerX(),b.centerY());//点击搜索框
  
}
sleep(2000);
setText(arra[ran]);
sleep(2000);
click(443,283);
sleep(3000);
desc("聊天信息").click();
sleep(3000);
}catch(e){

    toastLog("发生错误"+e.message)
}

}


/*===============================================================================================================*/
//写内容到已经打开的文件里面
function wirte_content(file_name,text)
{
file_name.writeline(text);
toast("正在把"+text+"写入到文件中.....");
sleep(3000);
file_name.flush();

}


/*===============================================================================================================*/
//读一个文件的内容
function read_file_arrays(path)
{
    var path=path;
    files.createWithDirs(path);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.readlines();
   ReadableTextFile.close();
  //返回一个数组
    return str_content;
}




