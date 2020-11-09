//同意进群
var wemain;
var s;
var jj=threads.start(function(){
    wemain  = storages.create("WECHAT");
    jj.interrupt();
} )
function st(){

    toast("启动中")
    sleep(1000)
  s=storages.create("start");
   let b=s.get("s");
  if(b!=undefined)
  {
      MianWx();
    s.remove("s");
  }
} 
let WX1;
var fullID="com.tencent.mm:id/"
function MianWx()
{
    
    try{

    for(let j=0;j<2;j++)
    {
      
        if(j==0)
        {
            app.launchApp("微信");
           
            sleep(2000)
            click(300,1352);
           WX1=1;
           
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


    }catch(e1){
        toastLog(e1.massage)
    }
    finally{
    
    //write_files.close();
       wemain.put("wx",1);
        toast("正在停止...");
    threads.shutDownAll();
    exit();
    }


}

function Main()
{
   sleep(5000)
   let b1=id(fullID+"cns").text("通讯录").exists();
    while(!b1)//等待主页面的打开
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
            sleep(2000)}
            }
        b1=id(fullID+ "cns").text("通讯录").exists();
        var mm=id(fullID+ "cns").findOne(2000)
      //  toastLog(mm)
        if(b1==true||mm!=null) {break;}
        sleep(1000);
       // back();
    }

    sleep(2000);
    let re= new_chat();
    if(re==-1)
    {
        toast("查找不到有信息 可能没有人邀请你进群")
        sleep(1000)
    }
}


//同意加群

function delete_message()
{ 
let t1=id(fullID+"akq").text("邀请你加入群聊").boundsInside(0, 0, (device.width/2)+100, device.height).exists();
if(t1)
{
    t1=id(fullID+"akq").text("邀请你加入群聊").boundsInside(0, 0, (device.width/2)+100, device.height).findOne(1500);
    
        var ty=t1.bounds();
        sleep(1000);
        var y=ty.centerY();
        y=y<0?-y:y;
        click(ty.centerX(),y)
        sleep(3000)
        if(text("你已接受邀请").exists())
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
            if(!id(fullID+"aks").exists()&&!text("发送").exists())
            {
                sleep(2000)
                back();
                sleep(3000)
                longClick(ty.centerX(),y)
                sleep(2000)
                click("删除")
                sleep(3000)
                click("删除");
                sleep(3000)
            }
            sleep(3000)
            if(id(fullID+"aks").exists()||text("发送").exists())
           {
                sleep(3000)
                sava_contact();
                sleep(1000)
           }
           else {
               sleep(1000)
               back();

           }


        }
        else
        {
            sleep(2000)
            back();
        }
    
}

}

 /**=====================查找新的消息==================================== */
 function new_chat()
 {
  
     sleep(3000)
     let new_chat=id(fullID+"ga3").find();//查找发来新消息的人
if(new_chat.length>0)
{
try{
  for(let i=0;i<new_chat.length;i++)
{
    if(new_chat[i]==undefined){continue;}
let n=new_chat[i].bounds();
click(n.centerX()+100,n.centerY());//点击联系人     
let bol=false;
sleep(2000)
while(!id(fullID+"aks").exists())//判断是否进入了聊天界面 如果不在聊天界面就进入这里
{
  
  
   bol=true;
   //此时应该返回到主页面上
   break;//结束循环
}

if(bol)
{
   let b=id(fullID+"cns").text("通讯录").exists();

   while(!b)
   {
       sleep(2000)
       b=id(fullID+"cns").text("通讯录").exists();
       if(b==true) break;
       sleep(2000);
       back();

   }

 continue;
  }

 //处理找到后
 delete_message();
 sleep(2000)
 swipe(457,291,457,1627,1000);
 sleep(2000)
 delete_message();
 sleep(1000)
 let b1=id(fullID+"cns").text("通讯录").exists();

 while(!b1)
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
   

}catch(e){
    toastLog(e.message)
}
 
}
return -1;
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
           
            var b1=id(fullID+"cns").text("通讯录").exists();
            while(!b1)
            {
                sleep(2000)
                b1=id(fullID+"cns").text("通讯录").exists();
                if(b1==true) break;
                sleep(2000);
                back();
            }
            

        }
        else
        {
            sleep(2000)
            let b1=id(fullID+"cns").text("通讯录").exists();
            while(!b1)
            {
                sleep(2000)
                b1=id(fullID+"cns").text("通讯录").exists();
                if(b1==true) break;
                sleep(2000);
                back();
            }
        }
       
}
   
else{
    toast("当前页面错误");
    sleep(2000)
    let b1=id(fullID+"cns").text("通讯录").exists();
    while(!b1)
    {
        sleep(2000)
        b1=id(fullID+"cns").text("通讯录").exists();
        if(b1==true) break;
        sleep(2000);
        back();
    }
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
let cxy=contact.bounds();
sleep(1000)
let cy=cxy.centerY();
let dx=device.width-64;
let dy=device.height-cy;
let c=id(fullID+"aq8").boundsContains(dx, cy,device.width-dx,device.height-dy).findOne(3000);
let xy=c.bounds();

if(c.desc()=="已关闭")
{
    sleep(1000)
click(xy.centerX(),xy.centerY())
}

}




st();