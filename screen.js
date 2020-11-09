var P={};
function capture(flag)
{
 
    sleep(2000)
    var height = device.height;
    var width = device.width;
    //设置脚本坐标点击所适合的屏幕宽高。
    setScreenMetrics(width, height);
    //请求截图权限
    threads.start(ca)
    sleep(800)
    threads.start(function q(){
        click("不再显示")
        sleep(800)
        click("立即开始")
        })
    sleep(3000)
    if(flag==1)
    {
        click(458,1718);
    }
    sleep(1000)
    let src=captureScreen();//请求截取当前屏幕
    // var src =images.read("/sdcard/0234" + ".jpg");
    var clip=images.clip( src,0,1000,550,900);
    var logOcr= Baidu_ocr(clip);
    let wordResult=logOcr.words_result;
    src.recycle()//回收images对象
    return wordResult;
   
}
function ca()
{
    if (!requestScreenCapture()) {
        toast("请求截图失败");
        exit();
    }
}

 /***
  * 123中/英 表示为中文输入模式 
  * 
  */

function Result(wordResult)
{
 try
{
    sleep(1500)
    if(wordResult.length>0)
    {
        let result=wordResult[wordResult.length-1]['words'];
        toastLog(result)
        if(result=="123中英"||result=="123中")
        {
            toast("正确")
            return 0;
        }
        else if(result=="123英中abc")
        {
            toast("英文输入模式,切换中...")
            sleep(1500)
            click(246,1722)//切换到中文
            sleep(1500)
            return 1;
        }
        else if(result=="中英")
        {
            toast('九键输入模式，切换中....')
            sleep(1500)
            click(416,1075)
            sleep(1500)
            click(393,1260)
            sleep(1500)
            return 0;
        }
        else
        {
            toastLog("键盘错误,请正确调整键盘");
            return -1;
        }

    }
    
}catch(e)
{
    toastLog("截图发生错误="+e);
    return -1;
}

}

//调用百度文字识别ocr得到当前手机截屏文字
function Baidu_ocr(imgFile){
    log("调用百度ocr开始识图");
    //var imag64 = images.toBase64(imgFile);//转换截屏图片
    var imag64 = images.toBase64(imgFile, "png", 100);//转换截屏图片
    //log(imag64.string());
    //该APIKey和Secret为"这是谁的爽歪歪"所有
    var API_Key="xXLSyVarLbQZarIgPZLyAgMa";
    var Secret_Key="bw1KWXr8TVuLmfwg4qsBhzkrqAnkffXQ";
    //access_token获取地址。
    var getTokenUrl="https://aip.baidubce.com/oauth/2.0/token";
    var token_Res = http.post(getTokenUrl, {
        grant_type: "client_credentials",
        client_id: API_Key,
        client_secret: Secret_Key,
    });
    var access_token=token_Res.body.json().access_token;
    //通用文字识别，50000次/天免费
    var ocrUrl = "https://aip.baidubce.com/rest/2.0/ocr/v1/general_basic";
    var ocr_Res = http.post(ocrUrl, {
        headers: {
            "Content - Type": "application/x-www-form-urlencoded"
        },
        access_token: access_token,
        image: imag64,
        language_type:"CHN_ENG"
    });
    var json = ocr_Res.body.json();
    //log(json);
    return json;
}

P.CaptureMain=function(i)
{
    toast("请稍后")
    let r=capture(i);
    let re=Result(r)
    if(re==1)
    {
        let i=0;
        P.CaptureMain(i);
    }
    else if(re==-1)
    {
        return -1;
    }
}

module.exports=P