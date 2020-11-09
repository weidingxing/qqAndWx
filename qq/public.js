
/**
   * 启动QQ时的选择
   * 
   * 
   */
threads.start(MianWx)

  function MianWx()
  {

var WX1=0;
var WX2=0;

var END=storages.create("end")//创建结束标志
var START=storages.create("startQQ");//创建开始标志
var startqq= START.get("st")//获取开始标志

      var i=0;
      try{

        if(startqq!=undefined)//检测是否打开另两个QQ
        {
        var flag=storages.create("QQ");
        var q1=flag.get("qq");
        var q2=flag.get("qq2");
        if(q1==1)
        {
            WX1=1;
        }
        if(q2==1)
        {
            WX2=1;
        }

      if(WX1==1&&WX2==1)
      {
        
          i=2;
      
      for(var j=0;j<2;j++)
      {
         
          if(j==0)
          {
            app.launchApp("QQ");
              sleep(2000)
              click(300,1352);
              Main();
          }
          if(j>0)
          {
            app.launchApp("QQ");
              sleep(2000)
              click(774,1331)
              Main();
          }
      }
      return 1;
  }
  if(WX1==1)
  {
     
      app.launchApp("QQ");
      sleep(3000)
      click(324,1320);
      Main();
      return 1;
  }
  if(WX2==1)
  { 
      app.launchApp("QQ");
      sleep(2000)
      click(774,1331)
      Main();
      return 1;
  }
}

  }catch(e){
      toadt(e.massage)
  }
  finally{
    home()
    toastLog("正在结束");

    flag.remove("qq");
    flag.remove("qq2")//移除两个QQ的标志
    END.put("endqq",1);//放入结束标志
    START.remove("st");//移除开始标志
   
  threads.shutDownAll();
  exit();
  }
  }

/**
 * 主逻辑
 * 
 * 
 */
//var path="/sdcard/QQHelper/发布动态.txt";




function Main()
{
    var path="/sdcard/WelHelper/QQHelper/发布动态.txt";
sleep(3000)
while(currentActivity()!="com.tencent.mobileqq.activity.SplashActivity")
{
    back();
    sleep(3000);
}
sleep(3000)
if(text("稍后处理").exists())
{
    
    click("稍后处理")
}
var content=read_content(path);//得到一个数组
if(content==null)
{
    toast("请往文件里面加内容...")
    sleep(1000);
    return 1;

}
var random_content=read_file(content)//传入一个数组 并返回一个随机的数组内容

try{
    sleep(3000)
click("动态");
sleep(3000);
click("好友动态")
var add=depth(7).id("dsr").boundsInside(0, 0, device.width, device.height/2).findOne(3000);
if(add!=null)
{
    var click_add=add.bounds();
    var y=click_add.centerY();
    if(y<0)
    {
        y=-y;
    }
    sleep(3500)
    click(click_add.centerX(),y);
    sleep(3000)
    click("说说")
    sleep(5000)
    setText(random_content);
    sleep(4000)
    click("发表")
    }
    sleep(3000)

  }catch(e)
  {
    log(e)
  }finally{
    while(1)
{
   sleep(1000)
    back();
    sleep(3000);
    if(text("联系人").exists())
    {
     break; 
    }

}
  }

}

/**========================================文件的读写======================================================== */
/**
 * 
 * 读取一个文件的内容
 * 此内容需以#号来分开来能把它分开成多个文件的内容
 
*/
//读一个文件的内容 并返回一个数组
function read_content(path)
{
 
   //var path1=path;
    var b=files.ensureDir(path);
    console.log(b);
 var ReadableTextFile=open(path, mode = "r", encoding = "utf-8", bufferSize = 8192);
  //返回读取到的全部内容
  var str_content=ReadableTextFile.read();
  //toast(str_content)
  if(str_content==""||str_content==undefined)
  {
      toastLog("文件内容为空!");
      sleep(1000);
    return null;
  }
  var split_content=str_content.split("#");//以#号分开内容的到一个字符串数组
  ReadableTextFile.close();
    return split_content;

}

//读取文件 返回随机的一个内容
var read_file=function(file_content)
{
    j=-1;

    for(var i in file_content){
        j=j+1;
    }
    var ran=Math.floor(Math.random() * (j-1));
  toast(ran)
    //返回随机的一个值
    return file_content[ran];
}
/**
 * 文件配置内容的保存
 * 以便保存上一次的配置H
 * 
 * 
 * 
 */

function Sava_config()
{

   var config=new Array();
 
    var path="/sdcard/WelHelper/QQHelper/发布动态配置.txt";
    wite=open(path,mode="w",encoding="utf-8", bufferSize = 8192);
    wite.writeline(config[0]);
    wite.flush();
    wite.writeline(config[1]);
    wite.flush();
   
    toast("保存成功")
    wite.close();
}