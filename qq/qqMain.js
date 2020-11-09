"ui";
ui.layout(

    <relative bg="#DEB887">
    <vertical>
        <toolbar bg="#66CCFF">
            <horizontal>
                <text textSize="13sp" textColor="red" text="欢迎使用VKQQ养号" />
            </horizontal>
            <horizontal w="*" gravity="right">
            <button id="save" text="保存脚本配置" textColor="green" textSize="18sp" style="Widget.AppCompat.Button.Borderless" />
            </horizontal>
        </toolbar>
        <scroll>
<vertical>
    <text gravity="center" text="请选择以下功能" textColor="red"/>
    <horizontal marginTop="20" marginLeft="10">
    <button id="bs_friends" w="auto" text="群聊" textSize="15sp" textColor="white" bg="#8470FF"/>
   <text padding="1" text="    [给群推动消息]" textColor="gray" />

    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="add_myfriends" w="auto" text="添加QQ群" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [根据关键词自动加群]" textColor="gray" />
    </horizontal>

    <horizontal marginTop="20" marginLeft="10">
    <button id="with_chat" w="auto" text="发布动态" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [发布文字动态]" textColor="gray" />
   <checkbox id="qq1" text="QQ一" textSize="15sp" textColor="blue" checked="{{auto.qq=true}}"  />
 <checkbox id="qq2" text="QQ二" textSize="15sp" textColor="blue" checked="{{auto.q2=false}}" />
    </horizontal>
  
    <horizontal>
    <checkbox id="f1" text="群聊" textSize="15sp" textColor="blue" marginTop="10sp"  checked="{{auto.p1=true}}"></checkbox>
    <checkbox id="f2" text="加QQ群" textSize="15sp" textColor="blue" marginTop="10sp"  checked="{{auto.p2=false}}"></checkbox>
    <checkbox id="f3" text="发布动态" textSize="15sp" textColor="blue" marginTop="10sp"  checked="{{auto.p3=false}}"></checkbox>
   
    </horizontal>

    <text marginTop="20sp" textColor="#32CD32" text="注意:使用本软件时如果想要停下来,请按音量上键,本软件可能会报毒,请添加信任,运行本软件时请给于辅助服务的权限,如果看不到界面请往软件
详情设置里给于悬浮窗或置于顶层的权限...软件中可能还有想到不到的bug，如遇请给于反馈..."/>
</vertical>

</scroll>

 </vertical>
 </relative>
);

var m1=1;
var m2=1;
var m3=1;
var mainF=[];
var k=0;

var QQ1=1;
var QQ2=1;
var qqArray=[];
var q=0;
var t;
t=threads.start(function()
{
ui.run(()=>{

ui.add_myfriends.click(function()
{
    engines.execScriptFile("./qq/AddGroup.js");//添加群好友

});
ui.bs_friends.click(function(){


threads.start(function(){

    engines.execScriptFile("./qq/SendMessage.js");//浏览朋友圈


} );
});

});
});
var th1;
var flags="22"
/**
 * 
 * 以下中1代表false 其他数字代表true
 * 
 */

th1=threads.start(function(){
    ui.run(()=>{
    
        ui.f1.on("check",function(checked){
            if(checked)
            {
                m1=2;
            }
            if(checked==false)
            {
               m1=1;
            }
            });
            ui.f2.on("check",function(checked){
            
                if(checked)
                {
                   m2=2;
                }
                if(checked==false)
                {
                    m2=1;
                }
            });
            ui.f3.on("check",function(checked){
            
                if(checked)
                {
                   m3=2;
                }
                if(checked==false)
                {
                    m3=1;
                }
            });

            ui.qq1.on("check",function(checked){
            
                if(checked)
                {
                   QQ1=2;
                }
                if(checked==false)
                {
                    QQ1=1;
                }
            });

            ui.qq2.on("check",function(checked){
            
                if(checked)
                {
                   QQ2=2;
                }
                if(checked==false)
                {
                    QQ2=1;
                }
            });


    });

    ui.save.click(function(){
        flags="1"
        startflag()
        
  
    });
    
    });

function startflag()
{

    if(m1!=1)
    {
        toast(m1);
        mainF[k]="群聊";
        k++;
        
    }
    if(m2!=1)
    {
        mainF[k]="加QQ群";
        k++;
        
    }
    if(m3!=1)
    {
        mainF[k]="发布动态";
        
    }

    threads.start(Sava_config);
 threads.start(Main);


}
var wemain
var st;
function Main()
{
    wemain= storages.create("end");//标志着一个引擎已经
   st= storages.create("startQQ");//开始
  try{
    for(var i=0;i<mainF.length;i++)
    {
        wemain.remove("endqq");
        st.remove("st");
        toast(mainF[i])
       if(mainF[i]=="群聊")
        {
           
            st.put("st",1);
            sleep(3000);
            var e=engines.execScriptFile("./qq/SendMessage.js");//浏览朋友圈
            while(1)
            {
                toast("群聊中....")
                sleep(30000);
                var n=wemain.get("endqq");//停止
                if(n!=undefined)
                {
                    if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }

                if(currentPackage()!="com.tencent.mobileqq")
                {
                    if(currentPackage()!="com.baidu.input_huawei"){
                        recents();
                        sleep(2000)
                        click("微信")
                        sleep(2000)}
                }
            }
          
            wemain.remove("endqq");
            continue;
        }
        if(mainF[i]=="加QQ群")
        {
            
            sleep(3000)
            st.put("st",1);
              sleep(3000)
          var e=  engines.execScriptFile("./qq/AddGroup.js");//添加群好友
            while(1)
            {
                toast("加群运行中.....")
                sleep(30000);
                var n=wemain.get("endqq");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
                if(currentPackage()!="com.tencent.mobileqq")
                {
                    if(currentPackage()!="com.baidu.input_huawei"){
                        recents();
                        sleep(2000)
                        click("微信")
                        sleep(2000)}
                }
            }
            wemain.remove("endqq");
            continue;
        }
        if(mainF[i]=="发布动态")
        {
            st.put("st",1);
            sleep(2000)
            var sq=storages.create("QQ");
           
                if(QQ1==2)
                {
                    sq.put("qq",1);
                }

                if(QQ2==2)
                {
                   sq.put("qq2",1);
                }

           var e= engines.execScriptFile("./qq/public.js");//搜获好友聊天

            while(1)
            {
                toast("发布动态.....")
                sleep(30000);
                var n=wemain.get("endqq");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
                if(currentPackage()!="com.tencent.mobileqq")
                {
                    if(currentPackage()!="com.baidu.input_huawei"){
                        recents();
                        sleep(2000)
                        click("微信")
                        sleep(2000)}
                }
            }
            wemain.remove("endqq");
            continue;
        }
        
    }
      
  }catch(e){
toastLog(e.message)
  }finally
  {
       sleep(1500)
      // home()
      st.remove("st");
      wemain.remove("endqq");//移除结束标志
      toast("运行完毕...");
    engines.stopAll();
    threads.shutDownAll();
  }

}

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

function Sava_config()
{

var config=new Array();
config[0]=m1;
config[1]=m2;
config[2]=m3;
config[3]=QQ1;
config[4]=QQ2;
    var path="/sdcard/WelHelper/QQHelper/主页配置.txt";//指定保存的路径
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);//打开一个文件以便写入文件
    for(var i=0;i<config.length;i++)
    {
        wite.writeline(config[i]);//写入第一个微信号
        wite.flush();
    }
   
    toast("保存成功")
    wite.close();
    
}
/**
 * 
 * 程序一开始就会启动此线程然后就会自动设置上一次的【配置
 * 
 * 
 */
var setTh=threads.start(function(){
    var path="/sdcard/WelHelper/QQHelper/主页配置.txt";
   var array_config= read_content1(path);
    var b=false;
    auto.waitFor();
    //1表示false
    if(array_config[0]!=1)
    {
        b=true;
        m1=2;
    }
ui.f1.checked=auto.p1=b;
b=false;
if(array_config[1]!=1)
    {
        b=true;
        m2=2;
    }
ui.f2.checked=auto.p2=b;
b=false;
if(array_config[2]!=1)
    {
        b=true;
        m3=2;
    }
ui.f3.checked=auto.p3=b;
b=false;
//设置QQ的选择
if(array_config[3]!=1)
    {
        b=true;
        QQ1=2;
    }
    else {
        QQ1=1;
    }
ui.qq1.checked=auto.qq=b;
    b=false;

if(array_config[4]!=1)
    {
        b=true;
        QQ2=2;
    }
    else{
        QQ2=1;
    }
ui.qq2.checked=auto.q2=b;
b=false;

while(1)
{
    fla=read_content1("/sdcard/WelHelper/启动标志.txt")
   toast("wait")
    sleep(5000)
    if(fla[0]=="11")
    {
         let s="/sdcard/WelHelper/启动标志.txt"
        wite=open(s,mode="w",encoding="utf-8", bufferSize = 8192);
        wite.writeline(-1)
        wite.flush()
        startflag();
        break;
        //startflag();
        
       
    }
    else if (flags=="1")
    {
        break;
    }
}

setTh.interrupt();
} );






