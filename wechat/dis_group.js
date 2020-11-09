"ui";

//保存音乐文件列表的数组
var textFiles = [];
var select_group=[];
ui.layout(
    <vertical  bg="#ffffff">
        <toolbar bg="#66CCFF">
                <horizontal>
                    <text textSize="18sp" textColor="white" text="解散微信群脚本配置" />
                </horizontal>
                <horizontal w="*" gravity="right">
                    <button id="save" text="保存脚本配置" textColor="white" style="Widget.AppCompat.Button.Borderless" />
                </horizontal>
            </toolbar>
        <list id="files"  h="200sp" w="1080sp">
            <linear bg="#FFEFD5" w="1080sp" >
                <img src="http://pics.sc.chinaz.com/Files/pic/icons128/5890/w4.png" w="20" h="20" borderWidth="2dp" borderColor="#202020" margin="16" />
                <vertical>
                <horizontal>
                    <text id="name1" textSize="16sp"   textColor="#4B0082" text="{{this.name}}"  maxLines="1" ellipsize="end"/>
                </horizontal>
                  
                </vertical>
            </linear>
        </list>

        <text textColor="#0000FF" textSize="16sp">被选中的群</text>
        <list id="text1"  h="150sp" w="500sp">
            <linear bg="#FFEFD5" >
            <img src="http://pics.sc.chinaz.com/Files/pic/icons128/5890/w4.png" w="20" h="20" borderWidth="2dp" borderColor="#202020" margin="16" />
                <vertical>
                <horizontal>
                    <text id="name1" textSize="16sp" w="200sp"   textColor="#4B0082" text="{{this.selectname}}"  maxLines="1" ellipsize="end"/>
                </horizontal>
                  
                </vertical>
            </linear>
        </list>

        <text textColor="red">注意:最好一次性选择好要解散的群，选择另外一个微信将自动保存当前微信的配置</text>
        <horizontal marginTop="10sp">
        <button  textSize="15sp" w="100" marginLeft="20" id="w1" text="微信1群" textColor="white" style="Widget.AppCompat.Button.Colored" />
        <button  textSize="15sp" w="100" marginLeft="20" id="w2" text="微信2群" textColor="white" style="Widget.AppCompat.Button.Colored" />
</horizontal>
<vertical>
   <horizontal>
          <checkbox id="wx1" text="微信一" marginLeft="20" textSize="15sp" textColor="blue" marginTop="15" checked="{{auto.option=true}}" />
          <checkbox id="wx2" text="微信二"  marginLeft="20" textSize="15sp" textColor="blue" marginTop="15" checked="{{auto.option2=true}}"/>
   </horizontal>
</vertical>
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



//加群按钮
ui.save.click(function(){
 
    //thread=threads.start(MianWx);
   threads.start(Sava_config_check);
     
});
});
var fullID="com.tencent.mm:id/"
var s;
var mainth
var thread;
let paths="/sdcard/WelHelper/note.txt";
ui.files.setDataSource(textFiles);
ui.text1.setDataSource(select_group)
var WX1=null;
var WX2=null;
var array_nick;
var nickname="wx1";
var save_nick1=Array();
var save_nick2=Array();
var change;
var th=threads.start(function(){
    array_nick=read_content1(paths);
    listMuiscFiles(textFiles);
    th.interrupt();

} )
threads.start(function(){
ui.run(()=>{
    ui.files.on("item_click",function(item){
    // toast(item.name+"|"+item.sort)
     let namew=item.name;
     let s=item.sort;
     //保存用户选择的群名称
     change[s]=namew;
     select_group.push({
        selectname: namew,
        lo:s
     
    });

      
    });
    ui.text1.on("item_click",function(item){
       

      //用户取消的群

       select_group.splice(item.lo-1, 1);
      // save_nick.splice(item.lo,1);
      change[item.lo]="";
      

    });
})


} )

threads.start(function(){
  
ui.w1.click(function(){
 
    nickname="wx1";
    change=save_nick1;
    paths="/sdcard/WelHelper/WXGroup/"+nickname+"群聊.txt";
    array_nick=read_content1(paths);
    textFiles.splice(0, textFiles.length);
    select_group.splice(0,select_group.length)
    listMuiscFiles(textFiles);
   

});
ui.w2.click(function(){
 
    nickname="wx2"
    change=save_nick2;
    paths="/sdcard/WelHelper/WXGroup/"+nickname+"群聊.txt";
    array_nick=read_content1(paths);
    textFiles.splice(0, textFiles.length);
    select_group.splice(0,select_group.length)
    // sleep(1000)
    listMuiscFiles(textFiles);
    

})
} );


function listMuiscFiles(list)
{

;
let fileName;
    for (let i = 0; i <array_nick.length; i++) {
                    //如果文件名的后缀是音乐格式
                 fileName=array_nick[i]
                        //则把它添加到列表中
                        list.push({
                            name: fileName,
                            sort:i
                         
                        });
                    }
               

}

/**保存配置内容 */
function Sava_config_check()
{
    toastLog(save_nick1)
   // toastLog(save_nick2)
   
   let paths="/sdcard/WelHelper/解散群配置wx1.txt";
   files.createWithDirs(paths);
  let wites=open(paths,mode="w",encoding="utf-8", bufferSize = 8192);
for(let i=0;i<save_nick1.length;i++)
{
    if(save_nick1[i]==undefined)
    {
        continue;
    }
    wites.writeline(save_nick1[i]);
    wites.flush();
}

wites.close();

let paths1="/sdcard/WelHelper/解散群配置wx2.txt";
files.createWithDirs(paths1);
let witess=open(paths1,mode="w",encoding="utf-8", bufferSize = 8192);
for(let i=0;i<save_nick2.length;i++)
{
 if(save_nick2[i]==undefined)
 {
     continue;
 }
 witess.writeline(save_nick2[i]);
 witess.flush();
}

witess.close();
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

    let path="/sdcard/WelHelper/解散群配置.txt";
    files.createWithDirs(path);
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(var i=0;i<config.length;i++)
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
    let path="/sdcard/WelHelper/解散群配置.txt";
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
ui.wx1.checked=auto.option=w1;//设置第一个微信
ui.wx2.checked=auto.option2=w2;

});

threads.start(st);
sleep(1000)
setTh.interrupt();

} );

function read_content1(path)//读取文件保存的内容
{

    let b=files.createWithDirs(path);
    console.log(b);
    ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  let str_content=ReadableTextFile.readlines();
    ReadableTextFile.close();
    return str_content;//返回的是一个数组

}
var change_log;
var nickwx;
function MianWx()
{
    
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
            //cont=arry_content;
            sleep(2000)
            click(300,1352);
            nickwx="wx1";
           
           // change_log=save_nick1;
            Main();
        }
        if(j>0)
        {
            sleep(2000);
            app.launchApp("微信");
           // cont=arry_secoder;
            sleep(2000)
            click(774,1331)
            nickwx="wx2"
           // change_log=save_nick2;
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
    nickwx="wx1"
    //cont=arry_content;
  //  change_log=save_nick1;
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
    nickwx="wx2"
    click(774,1331)
   // change_log=save_nick2;
    Main();
    return 1;
}

}catch(e){
    print(e.massage)
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
    let pathw="/sdcard/WelHelper/解散群配置"+nickwx+".txt";
    change_log=read_content1(pathw);
    if(change_log.length<1)
    {
        toastLog("你没有选择群")
        return 0;
    }
    // toast(change_log)
    sleep(8000)


   let b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
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
        b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
        var mm=id("com.tencent.mm:id/cns").findOne(2000)
      //  toastLog(mm)
        if(b1==true||mm!=null) {break;}
        sleep(1000);
       // back();
    }
   try{
       sleep(2000)
       click(131,1722)
       sleep(1500)
       dele()
       }catch(e){
           log(e)
           }
  
  let b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
  while(!b2)
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
    b2=id("com.tencent.mm:id/cns").text("通讯录").exists();
    var mm=id("com.tencent.mm:id/cns").findOne(2000)
  //  toastLog(mm)
    if(b2==true||mm!=null) {break;}
    sleep(1000);
   // back();
  }
  new_file();
}

function dele()
{
    let c=id(fullID+"f8y").findOne(3000);

    if(c!=null)
    {
        c=c.bounds()
        if(c==undefined){
            sleep(2000)
            click(854,153)
        
        }else{

        
        sleep(3000)
        click(c.centerX(),c.centerY());
        click(838,136);
        sleep(2000)}
    }
else{
    sleep(2000)
    click(854,153)
    sleep(3000)
}
   
    //删除被选中解散的群
    toast(change_log.length)
    for(let i=0;i<change_log.length;i++)
    {
      
        if(change_log[i]==undefined)
        {
            toast("erro")
            sleep(1000)
           
            continue;
        }

    sleep(3000)
    setText(change_log[i]);//输入微信号
  
    sleep(3000);
    var b=id("com.tencent.mm:id/gbv").exists();
    if(b==false)
    {
        toast("没有此群")
        sleep(2000);
        continue;
    }
sleep(3000)
back();
sleep(2000)
let se=id("com.tencent.mm:id/gbv").find();
if(se.length>0)
{
for(let i=0;i<se.length;i++)
{

if(se[i].text()==change_log[i])
{
sleep(1000)
let bs=se[i].bounds();
if(bs==undefined){continue;}
sleep(1000)
click(bs.centerX(),bs.centerY())//点击联系人
sleep(3000)

}

}


}

sleep(3000)
let m=className("android.support.v7.widget.LinearLayoutCompat").depth(7).findOne(3000);
if(m!=null)
{
   let b=m.bounds();
   if(b==undefined){continue;}
   click(b.centerX(),b.centerY());
}


else {
toast("查找不到控件")
    return 0;
}
sleep(2000)

//查找删除按钮
let n=dele_member();

if(n==1)
{
    do{ } while( className("ListView").findOne(5000).scrollForward());
    sleep(1500)
    l=text("删除并退出").exists();
            if(l)
            {
                sleep(1500)
                click("删除并退出")
                sleep(1500)
                click("确定")
                sleep(3000)
            }

let c=id(fullID+"f8y").findOne(3000);//查找

    if(c!=null)
    {
        c=c.bounds()
        if(c==undefined){return 0;}
        sleep(3000)
        click(c.centerX(),c.centerY());
        click(838,136);
        sleep(3000)
    }

    else{

        toast("查找不到搜索控件")
        return 1;
    }

}

    }
}

//删除好友选择
function dele_member()
{
 
    let add=boundsInside(0, 0, device.width, device.height-300).desc("删除成员").findOne(3000);
    let k=0;
    while(add==null)//查找不到删除按钮
    
    {
        k++;
        if(k>5)
        {
            toast("该群你不是群主或管理员");
            sleep(1000);
            return 1;
        }
        sleep(2000);
        swipe(839,1600,839,1220,1000);
        sleep(3000)
         add=boundsInside(0, 0, device.width, device.height-300).desc("删除成员").findOne(3000);
    }
/**
 * 找到
 */
    let xy=add.bounds();
    if(xy==undefined){return 0;}
    let x=xy.centerX();
    let y=xy.centerY();
    x=x<0?-x:x;
    y=y<0?-y:y;
    click(x,y);//点击删除按钮
    sleep(2000)
    dele_azf()//返回主界面上
    let c=id(fullID+"f8y").findOne(3000);

    if(c!=null)
    {
        c=c.bounds()
        if(c==undefined){return 0;}
        sleep(3000)
        click(c.centerX(),c.centerY());
        click(838,136);
        sleep(3000)
    }
}
//选择群成员删除
function dele_azf()
{
    let sd=id(fullID+"a9d").find();//查找第一项
    for(let i=0;i<sd.length;i++)
    {
        if(sd[i]==undefined){continue;}
        sd[i].click()
        sleep(2000)
    }
    sleep(2000)
    click("删除")
    sleep(2000)
    click("确定")
    sleep(3000)
    let add=desc("删除成员").exists();
 
while(add)
{
   let vb= desc("删除成员").findOne(2000)
   let xy=vb.bounds();
   if(xy==undefined){break;}
    let x=xy.centerX();
    let y=xy.centerY();
    x=x<0?-x:x;
    y=y<0?-y:y;
    sleep(2000)
    click(x,y);//点击删除按钮
    sleep(2000)
    let sd=id(fullID+"a9d").find();//查找第一项
    for(let i=0;i<sd.length;i++)
    {
        if(sd[i]==undefined){continue;}
        sd[i].click()
        sleep(2000)
    }
    sleep(2000)
    click("删除")
    sleep(2000)
    click("确定")
    sleep(3000)
    add=desc("删除成员").exists();
}

    let l;
    do{ } while( className("ListView").findOne().scrollForward())
     l=text("删除并退出").exists();
            if(l)
            {
                sleep(1500)
                click("删除并退出")
                sleep(1500)
                click("确定")
            }
          sleep(2000)
       
          var b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
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
            b1=id("com.tencent.mm:id/cns").text("通讯录").exists();
            var mm=id("com.tencent.mm:id/cns").findOne(2000)
          //  toastLog(mm)
            if(b1==true||mm!=null) {break;}
            sleep(1000);
           // back();
          }
         
}

function new_file()
{

//    let newpath="/sdcard/WelHelper/"+nickwx+"建群名称.txt";
 let  newpath="/sdcard/WelHelper/WXGroup/"+nickname+"群聊.txt";
   let new_log=read_content1(newpath);
   sleep(1000)

 //  let new_array2=new Array()//保存新的群名称
   let l=0;
 for(let i=0;i<change_log.length;i++)
 {
     if(change_log[i]==undefined)
     {
         continue;
     }
   for(let j=0;j<new_log.length;j++)
   {
    
       if(change_log[i]==new_log[j])
       {

           new_log[j]="-1";

       }
   }
    
 }
toast("写入中")
//let p="/sdcard/WelHelper/"+nickwx+"建群名称.txt"
let w1=open(newpath,mode="w",encoding="utf-8", bufferSize = 8192);
for(let i=0;i<new_log.length;i++)
{
    
    if(new_log[i]=="-1")
    {
        continue;
    }
    w1.writeline(new_log[i]);
    w1.flush();
    
}
w1.close();
}
