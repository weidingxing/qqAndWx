importPackage(java.util)
 var set=new HashSet()    
 var groupname_array;
 var fullID="com.tencent.mm:id/"
var nickwx;
var wemain;
var s;
var setTh=threads.start(function(){
    //toast("hueueueueu")
      wemain  = storages.create("WECHAT");
      threads.start(st);
      sleep(1000)
     setTh.interrupt();
});

function st(){
    toast("启动中")
  
    sleep(1000)
    MianWx()
//   s=storages.create("start");
//    var b=s.get("s");
//   if(b!=undefined)
//   {
//     thread=threads.start(MianWx);
//     s.remove("s");
//   }
} 

function MianWx()
{
    
    try{
   
    for(let j=0;j<2;j++)
    {
       
        if(j==0)
        {
            app.launchApp("微信");
            //cont=arry_content;
            sleep(2000)
            click(300,1352);
            nickwx="wx1";
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
            Main();
        }
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
        sleep(5000)
   
        var b1=id(fullID+"cns").text("通讯录").exists();
        while(!b1)
        {
            sleep(2000)
            b1=id(fullID+"cns").text("通讯录").exists();
            if(b1==true) break;
            sleep(2000);
            back();
        }
       
      
/**
 * 
 * 逻辑函数的开始
 */
        getGroupname();
       
      let b1=id(fullID+"cns").text("通讯录").exists();
      while(!b1)
      {
         
          sleep(2000)
          b1=id(fullID+"cns").text("通讯录").exists();
          if(b1==true) break;
          sleep(1000);
          back();
      }
      
    }
function getGroupname()
{
    
sleep(2000)
click(407,1739)
sleep(2000)
click(566,443)
sleep(2000)
try{
do{
    sleep(2000)
    let getgroup=id(fullID+"b32").find();
    if(getgroup=="")
    {
        return 1;
    }
    getgroup.forEach(item => {
        set.add(item.text())
      
    });
   
}while(className("ListView").findOne().scrollForward())

if(set.size()>0)
{
    groupname_array=set.toArray();
    let path="/sdcard/WelHelper/WXGroup/"+nickwx+"群聊.txt";
    files.ensureDir(path);
    let wop=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    for(let i in groupname_array)
    {
        wop.writeline(groupname_array[i])
        wop.flush();
    }
    wop.close();
    toast("写入成功")
}

}catch(e)
{

}finally{

    set.clear();
    sleep(1000)
   
}

}



