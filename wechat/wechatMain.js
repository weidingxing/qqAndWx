"ui";
ui.layout(

    <relative bg="file:///sdcard/脚本/WeChatProject/bg3.jpeg">
    <vertical>
        <toolbar bg="#66CCFF">
            <horizontal>
                <text textSize="13sp" textColor="red" text="欢迎使用VKWECHAT养号" />
            </horizontal>
            <horizontal w="*" gravity="right">
            <button id="save" text="保存并运行脚本" textColor="green" textSize="18sp" style="Widget.AppCompat.Button.Borderless" />
            </horizontal>
        </toolbar>
        <scroll>
<vertical>
    <text gravity="center" text="请选择以下功能" textColor="red"/>
    <horizontal marginTop="20" marginLeft="10">
    <button id="bs_friends" w="auto" text="微信朋友圈浏览" textSize="15sp" textColor="white" bg="#8470FF"/>
   <text padding="1" text="    [浏览自己的朋友圈和好友的朋友圈]" textColor="gray" />

    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="add_myfriends" w="auto" text="添加微信群好友" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [随机抽群添加好友]" textColor="gray" />
    </horizontal>

    <horizontal marginTop="20" marginLeft="10">
    <button id="with_chat" w="auto" text="和指定好友聊天" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [指定微信好友聊天]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="main_with_chat" w="106sp" text="主页好友聊天" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [随机和主页微信好友聊天]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="look"w="106sp"  text="微信看一看" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [浏览微信看一看]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="publish" w="auto" text="微信朋友圈发布" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [发布图片或视频]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="create_group" w="auto" text="创建微信群         " textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [创建微信群聊]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="dis_group" w="auto" text="解散微信群         " textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [解散微信群聊]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="new_friends" w="auto" text="新好友配置选项" textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [添加好友或同意请求]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="modify" w="auto" text="修改个人资料    " textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [修改头像,昵称 个性签名]" textColor="gray" />
    </horizontal>
    <horizontal marginTop="20" marginLeft="10">
    <button id="out_group" w="auto" text="  小号退群           " textSize="15sp" textColor="white" bg="#8470FF" />
   <text padding="1" text="    [小号退群或者解散所创的群]" textColor="gray" />
    </horizontal>
    <horizontal>
    <text textSize="15sp" textColor="blue" marginTop="10sp">键盘设置</text>
    <input w="260sp" hint="请点击这里设置你的键盘为26键中文输入模式" textSize="13"></input>
    </horizontal>

    <horizontal>
    <checkbox id="f1" text="朋友圈" textSize="15sp" textColor="blue" marginTop="10sp"  checked="{{auto.p1=true}}"></checkbox>
    <checkbox id="f2" text="加群好友" textSize="15sp" textColor="blue" marginTop="10sp"  checked="{{auto.p2=false}}"></checkbox>
    <checkbox id="f3" text="聊天" textSize="15sp" textColor="blue" marginTop="10sp"  checked="{{auto.p3=false}}"></checkbox>
    <checkbox id="f4" text="主页聊天" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p4=false}}"></checkbox>
    
    </horizontal>
    <horizontal>
    <checkbox id="f5" text="看一看" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p6=false}}"></checkbox>
    <checkbox id="f6" text="发布动态" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p5=false}}"></checkbox>
    <checkbox id="f7" text="同意进群" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p7=false}}"></checkbox>
</horizontal>
<horizontal>
<checkbox id="f8" text="创建群" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p8=false}}"></checkbox>
<checkbox id="f9" text="新好友配置" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p9=false}}"></checkbox>
<checkbox id="f10" text="解散群" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p10=false}}"></checkbox>
</horizontal>
<horizontal>
<checkbox id="f11" text="修改个人资料" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p11=false}}"></checkbox>
<checkbox id="f13" text="获取微信群名" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p13=false}}"></checkbox>
</horizontal>
<horizontal>
<checkbox id="f12" text="小号退群/解散群" textSize="15sp" textColor="blue" marginTop="10sp" checked="{{auto.p12=false}}"></checkbox>
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
var m4=1;
var m5=1;
var m6=1;
var m7=1;
var m8=1;
var m9=1;
var m10=1;
var m11=1;
var m12=1;
var m13=1;
var mainF=[];
var k=0;
var flags=2

var t;
t=threads.start(function()
{
ui.run(()=>{

ui.add_myfriends.click(function()
{
    engines.execScriptFile("./wechat/Add_group.js");//添加群好友

});
ui.out_group.click(function()
{
    engines.execScriptFile("./wechat/disgroupFun.js");//添加群好友

});
ui.modify.click(function()
{
    engines.execScriptFile("./wechat/modify_main.js");//添加群好友

});
ui.dis_group.click(function()
{
    engines.execScriptFile("./wechat/dis_group.js");//解散群
});
ui.create_group.click(function()
{
    engines.execScriptFile("./wechat/create_group.js");//创建群

});
ui.new_friends.click(function()
{
    engines.execScriptFile("./wechat/add_friends.js");//添加好友

});

ui.bs_friends.click(function(){


threads.start(function(){

    engines.execScriptFile("./wechat/new-friend.js");//浏览朋友圈


} );
});

ui.with_chat.click(function(){

    threads.start(function(){

        engines.execScriptFile("./wechat/send.js");//搜获好友聊天
    } );

});
ui.publish.click(function(){
    
    threads.start(function(){
        engines.execScriptFile("./wechat/publish.js");//朋友圈发布
        
        });
    
    });

ui.main_with_chat.click(function(){

    threads.start(function(){
        engines.execScriptFile("./wechat/RandomChat.js");//主页好友聊天
        
        });
});

ui.look.click(function(){

    threads.start(function(){
        engines.execScriptFile("./wechat/welook.js");//看一看
        
        });
});

});
});
var th1;
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

            ui.f4.on("check",function(checked){
            
                if(checked)
                {
                   m4=2;
                }
                if(checked==false)
                {
                    m4=1;
                }
            });
            ui.f5.on("check",function(checked){
            
                if(checked)
                {
                   m5=2;
                }
                if(checked==false)
                {
                    m5=1;
                }
            });

            ui.f6.on("check",function(checked){
            
                if(checked)
                {
                   m6=2;
                }
                if(checked==false)
                {
                    m6=1;
                }
            });
            ui.f7.on("check",function(checked){
            
                if(checked)
                {
                   m7=2;
                }
                if(checked==false)
                {
                    m7=1;
                }
            });
            ui.f8.on("check",function(checked){
            
                if(checked)
                {
                   m8=2;
                }
                if(checked==false)
                {
                    m8=1;
                }
            });

            ui.f9.on("check",function(checked){
            
                if(checked)
                {
                   m9=2;
                }
                if(checked==false)
                {
                    m9=1;
                }
            });
            ui.f10.on("check",function(checked){
            
                if(checked)
                {
                   m10=2;
                }
                if(checked==false)
                {
                    m10=1;
                }
            });

            ui.f11.on("check",function(checked){
            
                if(checked)
                {
                   m11=2;
                }
                if(checked==false)
                {
                    m11=1;
                }
            });
            ui.f12.on("check",function(checked){
            
                if(checked)
                {
                   m12=2;
                }
                if(checked==false)
                {
                    m12=1;
                }
            });
            ui.f13.on("check",function(checked){
            
                if(checked)
                {
                   m13=2;
                }
                if(checked==false)
                {
                    m13=1;
                }
            });
    });

    ui.save.click(function()
    {
        flags=10
        startflag();
    
    });
    })

function startflag()
{

    if(m1!=1)
    {
       // toast(m1);
        mainF[k]="朋友圈浏览";
        k++;
        
    }
    if(m2!=1)
    {
        mainF[k]="加群好友";
        k++;
        
    }
    if(m3!=1)
    {
        mainF[k]="聊天";
        k++;
        
    }

    if(m4!=1)
    {
        mainF[k]="主页聊天";
        k++;
        
    }
    if(m5!=1)
    {
        mainF[k]="看一看";
        k++;
        
    }
    if(m6!=1)
    {
        mainF[k]="发布动态";
        k++;
        
    }
    if(m7!=1)
    {
        mainF[k]="同意进群";
        k++;
        
    }
    if(m8!=1)
    {
        mainF[k]="创建微信群";
        k++;
        
    }
    if(m9!=1)
    {
        mainF[k]="新的好友";
        k++;
        
    }
    if(m10!=1)
    {
        mainF[k]="解散群";
        k++;
    }
    if(m11!=1)
    {
        mainF[k]="个人资料";
        k++;
    }
    if(m12!=1)
    {
        mainF[k]="小号退群";
        k++;
    }
    if(m13!=1)
    {
        mainF[k]="获取群名";
        k++;
    }
    threads.start(Sava_config);
    threads.start(Main);


}

function Main()
{
    console.hide();
   var wemain= storages.create("WECHAT");
   var st= storages.create("start");//开始
  try{
   // for(var i=0;i<mainF.length;i++)
   var l=mainF.length;
     while(l>0)
    {
        wemain.remove("wx");
        st.remove("s");
        //toast(mainF[i])
        var random_number=Math.floor(Math.random() * (mainF.length));//设置随机性 半闭区间
        if( mainF[random_number]==0)
        {
            continue;
        }
        l--;
       if(mainF[random_number]=="朋友圈浏览")
        {
           
            st.put("s",1);//启动标志
            sleep(3000);
            let e=engines.execScriptFile("./wechat/new-friend.js");//浏览朋友圈
          
            while(1)
            {
                toast("浏览朋友圈....")
                sleep(30000);
                let n=wemain.get("wx");//停止
                if(n!=undefined)
                {
                    if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
              
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }
        if(mainF[random_number]=="加群好友")
        {
            
            sleep(3000)
            st.put("s",1);
              sleep(3000)
          let e=engines.execScriptFile("./wechat/Add_group.js");//添加群好友
        
            while(1)
            {
                toast("加群运行中.....")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
              
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }

        if(mainF[random_number]=="个人资料")
        {
            
            sleep(3000)
            st.put("s",1);
              sleep(3000)
          let e=engines.execScriptFile("./wechat/modify_main.js");//添加群好友
            while(1)
            {
                toast("修改资料中.....")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
             

            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }

        if(mainF[random_number]=="聊天")
        {
            st.put("s",1);
            sleep(2000)
           let e= engines.execScriptFile("./wechat/send.js");//搜获好友聊天
         
            while(1)
            {
                toast("好友聊天中.....")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
             
                
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }

        if(mainF[random_number]=="主页聊天")
        {
            st.put("s",1);
            sleep(2000)
           let e= engines.execScriptFile("./wechat/RandomChat.js");//主页好友聊天
         
            while(1)
            {
                sleep(30000);
                toast("聊天运行中.....")
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                    //toastLog("mf")
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
              
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }

        if(mainF[random_number]=="看一看")
        {
            st.put("s",1);
            sleep(3000)
            let e=engines.execScriptFile("./wechat/welook.js");//看一看
         
            while(1)
            {
                toast("看一看运行中...")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
           
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }

/**======================================= */
        if(mainF[random_number]=="解散群")
        {
            st.put("s",1);
            sleep(3000)
            let e=engines.execScriptFile("./wechat/dis_group.js");//看一看
         
            while(1)
            {
                toast("解散群运行中...")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
             
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }


/**========================================================= */

if(mainF[random_number]=="获取群名")
{
    st.put("s",1);
    sleep(3000)
    let e=engines.execScriptFile("./wechat/getGroupName.js");//看一看
 
    while(1)
    {
        toast("解散群运行中...")
        sleep(30000);
        let n=wemain.get("wx");
        if(n!=undefined)
        {
           if(e.getEngine()!=null)
            {
           e.getEngine().forceStop();
           }
            break;
        }
       
    }
    mainF[random_number]=0;
    wemain.remove("wx");
    continue;
}
/**================================================ */



        if(mainF[random_number]=="创建微信群")
        {
            st.put("s",1);
            sleep(3000)
            let e=engines.execScriptFile("./wechat/create_group.js");//看一看
         
            while(1)
            {
                toast("创建群中...")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
             
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;
        }
/**========================================================= */

if(mainF[random_number]=="新的好友")
{
    st.put("s",1);
    sleep(3000)
    let e=engines.execScriptFile("./wechat/add_friends.js");//添加好友
 
    while(1)
    {
        toast("新的好友配置运行中...")
        sleep(30000);
        let n=wemain.get("wx");
        if(n!=undefined)
        {
           if(e.getEngine()!=null)
            {
           e.getEngine().forceStop();
           }
            break;
        }
     
    }
    mainF[random_number]=0;
    wemain.remove("wx");
    continue;
}
/**========================================== */
if(mainF[random_number]=="小号退群")
{
    st.put("s",1);
    sleep(3000)
    let e=engines.execScriptFile("./wechat/disgroupFun.js");//添加好友
 
    while(1)
    {
        toast("小号退群运行中...")
        sleep(30000);
        let n=wemain.get("wx");
        if(n!=undefined)
        {
           if(e.getEngine()!=null)
            {
           e.getEngine().forceStop();
           }
            break;
        }
      
    }
    mainF[random_number]=0;
    wemain.remove("wx");
    continue;
}


/**================================无界面================================ */

if(mainF[random_number]=="同意进群")
{
    st.put("s",1);
            sleep(3000)
            let agr=engines.execScriptFile("./wechat/agree.js");//同意进群
            
            while(1)
            {
                toast("同意进群运行中...")
                sleep(30000);
                let n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(agr.getEngine()!=null)
                    {
                        agr.getEngine().forceStop();
                   }
                    break;
                }
              
            }
            mainF[random_number]=0;
            wemain.remove("wx");
            continue;


}

        if(mainF[random_number]=="发布动态")
        {
            st.put("s",1);
            sleep(2000)
           let e= engines.execScriptFile("./wechat/publish.js");//朋友圈发布
         
            while(1)
            {
                toast("发布动态中....")
                sleep(30000);
                var n=wemain.get("wx");
                if(n!=undefined)
                {
                   if(e.getEngine()!=null)
                    {
                   e.getEngine().forceStop();
                   }
                    break;
                }
             
            }
            mainF[random_number]=0;
            wemain.remove("wx");
        }
    }
      
  }catch(es){
    toastLog(es.message)
  }finally
  {
    console.show()
    sleep(1500)

      // home()
      st.remove("s");
      wemain.remove("wx");
      toastLog("运行完毕...");
    engines.stopAll();
   
    threads.shutDownAll();
  }

}

var read_content1=function(path)//读取文件保存的内容
{

   // let path=path;
    var b=files.createWithDirs(path);
   // console.log("b="+b);
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
config[3]=m4;
config[4]=m5;
config[5]=m6;
config[6]=m7;
config[7]=m8;
config[8]=m9;
config[9]=m10;
config[10]=m11;
config[11]=m12;
config[12]=m13;
    let path="/sdcard/WelHelper/主页配置.txt";//指定保存的路径
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);//打开一个文件以便写入文件
    for(let i=0;i<config.length;i++)
    {
       // log(config[i])
        wite.writeline(config[i]);//写入第一个微信号
        wite.flush();
    }
    //sleep(2000);
    toast("保存成功")
    wite.close();
    
}

var setTh=threads.start(function(){

    var path="/sdcard/WelHelper/主页配置.txt";
   var array_config= read_content1(path);
  // toastLog(array_config.length)
    var b=false;
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
if(array_config[3]!=1)
    {
        b=true;
        m4=2;
    }
ui.f4.checked=auto.p4=b;
b=false;
if(array_config[4]!=1)
    {
        b=true;
        m5=2;
    }
ui.f5.checked=auto.p5=b;
b=false;
if(array_config[5]!=1)
    {
        b=true;
        m6=2;
    }
  
ui.f6.checked=auto.p6=b;
b=false;
if(array_config[6]!=1)
{
    b=true;
    m7=2;
}

ui.f7.checked=auto.p7=b;
b=false;
if(array_config[7]!=1)
{
    b=true;
    m8=2;
}

ui.f8.checked=auto.p8=b;
b=false;
if(array_config[8]!=1)
{
    b=true;
    m9=2;
}

ui.f9.checked=auto.p9=b;
b=false;
if(array_config[9]!=1)
{
    b=true;
    m10=2;
}

ui.f10.checked=auto.p10=b;
b=false;
if(array_config[10]!=1)
{
    b=true;
    m11=2;
}

ui.f11.checked=auto.p11=b;
b=false;
if(array_config[11]!=1)
{
    b=true;
    m12=2;
}

ui.f12.checked=auto.p12=b;
b=false;
if(array_config[12]!=1)
{
    b=true;
    m13=2;
}

ui.f13.checked=auto.p13=b;
b=false;


while(1)
{
    let spath="/sdcard/WelHelper/启动标志.txt"
    let flagss=read_content1(spath)
    //toast(flags[0])
    toast("wait")
    sleep(5000)
    
    if(flagss[0]==11)
    {
        wite=open(spath,mode="w",encoding="utf-8", bufferSize = 8192);
        wite.writeline(-1)
        wite.flush()
        startflag();
        break;
    }
    else if(flags==10){
        
       break; }
}


setTh.interrupt();
} );






