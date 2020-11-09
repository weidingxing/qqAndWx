var fullID="com.tencent.mm:id/"
var PositionKey;
var T={};

T.RedHat=function(redhatmoney,alipypwd)
{
    sleep(1500)
    if(text("发送").exists())
    {
        click("发送")
        sleep(2000);
    }
    if(textContains("未领取的红包").exists())
    {
        back();
        sleep(2000)
    }
    try{
        let mult;
        if(mult=desc("更多功能按钮，已折叠").findOne(2000))
        {
            
            if(!text("相册").exists())
            {
                mult.click();
            }
            
            sleep(2000)
            let red;
            if(red=text("红包").findOne(2000))
            {
                red=red.bounds();
                click(Math.abs(red.centerX()),Math.abs(red.centerY()));
            }
            else
            {
                toastLog("找不到红包功能")
                return 0;
            }
            sleep(3000)
            if(text("单个金额").findOne(2000))
            {
                toastLog("金额="+redhatmoney)
                click("0.00")
                sleep(2000)
                redhatmoney=String(redhatmoney)
                KeyboaderInput(redhatmoney,false);
                text("塞钱进红包").click();
                sleep(3000)
                PwdKeyboad();
                alipypwd=String(alipypwd)
                KeyboaderInput(alipypwd,true);//输入支付密码
                sleep(5000)
                if(text("忘记密码").exists())
                {
                    click("重试");
                    sleep(2000)
                    KeyboaderInput(alipypwd,true);//输入支付密码
                    sleep(3000)
    
                }
                judgepwd();
              
            }
            else{
                
                toastLog("not found");
                }
        }
    }
    catch(e)
    {
        toastLog("发红包错误"+e)
    }


}


T.TransferAccount=function(transferMoney,alipypassword)
{
    sleep(1500)
    if(text("发送").exists())
    {
        click("发送")
        sleep(2000);
    }
    try{
        let mult;
        if(mult=desc("更多功能按钮，已折叠").findOne(2000))
        {
            if(!text("相册").exists())
            {
                mult.click();
            }
            sleep(2000)
            let red;
            if(red=text("转账").findOne(2000))
            {
                red=red.bounds();
                click(Math.abs(red.centerX()),Math.abs(red.centerY()));
            }
            sleep(3000)
            if(textContains("转账时间").exists())
            {
                toastLog("请先提醒对方收款才能继续转账")
                sleep(2000);
                judgepwd();
                return 0;
            }
           transferMoney=String(transferMoney)
            KeyboaderInput(transferMoney,false);
            sleep(2000)
            text("转账").click();
            sleep(3000)
            if(text("继续转账").exists())
            {
                text("继续转账").click();
                sleep(2500);
            }
            PwdKeyboad();
            alipypassword=String(alipypassword)
            KeyboaderInput(alipypassword,true);//输入支付密码
            sleep(2000)
            if(text("忘记密码").exists())
            {
                click("重试");
                sleep(2000)
                KeyboaderInput(alipypassword,true);//输入支付密码
                sleep(3000)
    
            }
            sleep(2000)
            click("完成")
            sleep(2000)
            judgepwd();
        }
    }catch(e)
    {
        toastLog("转账错误"+e)
    }
    
}

//传来一个数组
function KeyboaderInput(trsanfer_number,flage)
{
    trsanfer_number=trsanfer_number.split("");
    sleep(2000);
    trsanfer_number.forEach(e => 
    {
       
        if(flage)
        {
            // e=Number(e);
            click(PositionKey[e][0],PositionKey[e][1]);
            sleep(2000);
        }
        else
        {
            log(e);
            click(e);
            sleep(2000)
        }
    });
    if(!flage&&!text("转账").exists())
    {
        back();
        sleep(2000)
    }
    
}

function PwdKeyboad()
{
    var x=boundsInside(0,device.height/2,device.width,device.height).className("android.widget.LinearLayout").find();
    try{

        var ybeigen=x[x.length-4].bounds();

        var Xbeigen=200;
        var Ybeigen=ybeigen.centerY();
    }catch(e)
    {
        toastLog("键盘错误")
    }
    PositionKey=
    {
        1:[Xbeigen,Ybeigen],2:[Xbeigen+300,Ybeigen],3:[Xbeigen+700,Ybeigen],
        4:[Xbeigen,Ybeigen+200],5:[Xbeigen+300,Ybeigen+200],6:[Xbeigen+700,Ybeigen+200],
        7:[Xbeigen,Ybeigen+310],8:[Xbeigen+300,Ybeigen+310],9:[Xbeigen+700,Ybeigen+310],
        0:[Xbeigen+300,Ybeigen+500]
    }

}
function judgepwd()
{
    if(textContains("转账时间").exists()||text("换卡支付").exists()||text("忘记密码").exists())
    {
        toastLog("你的金额可能不足以支付或通知对方收钱或者密码错误");
        sleep(1000)
        click("重试");
        sleep(1500)
        back();
        sleep(2000)
        result("失败")
    }
    else
    {
        result("成功")
    }
}


function result(note)
{
    while(desc("返回").exists())
    {
        back();
        sleep(2000)
        if(currentActivity()=="com.tencent.mm.ui.LauncherUI"||text("相册").exists()||desc("更多功能按钮，已折叠").exists()||text("发送").exists())
        {
            break;
        }
    }
    sleep(2000)
    if(text("相册").exists()||desc("更多功能按钮，已折叠").exists()||text("发送").exists())
    {
        toastLog(note)
     //   click(544,367);//点击屏幕收起更多功能
     sleep(1500)
     if(text("相册").exists())
     {
         back();
     }
        sleep(2000)
    }

}


// RedHat();

T.OpenRedhat=function()
{
    sleep(1500)
    if(boundsInside(0,0,(device.width/2)-200,device.height).text("微信转账").exists()||
    boundsInside(0,0,(device.width/2)-200,device.height).text("微信红包").exists()
    )
    {
        toastLog("发现红包或者转账");
        F();

    }
    
}

function F()
{
    toast("查询红包中..")
    try{

        let trans=boundsInside(0,0,(device.width/2)-200,device.height).text("微信转账").find();
        let red=boundsInside(0,0,(device.width/2)-200,device.height).text("微信红包").find();
        if(trans.length>0)
        {
            for(let i=0;i<trans.length;i++)
            {
                let re=DisRed(trans[i],"转账")
                if(re==1)
                {
                    F();
                }
            }
        }
        if(red.length>0)
        {
            for(let i=0;i<red.length;i++)
            {
               let re= DisRed(red[i],"红包")
               if(re==1)
               {
                   F();
               }
            }
        }
    }catch(e){

    }
}

function DisRed(c,flag)
{
   
    
        sleep(1500)
       let r=c.bounds();
        let y=r.centerY();
        if(y>1656)
        {
            return 0;
        }
        let x=r.centerX();
        let y1=y-148;//计算top的距离
        let y2=device.height-y-212;//计算buttom的距离
        var c1=boundsInside(0,y1,device.width/2,device.height-y2).text("已被领取").findOne(1500);
        var c2=boundsInside(0,y1,device.width/2,device.height-y2).text("已收款").findOne(1500);
        var c3=boundsInside(0,y1,device.width/2,device.height-y2).text("已领取").findOne(1500);//判断红包
        if(flag=="红包")
        {
            if(c3)
            {
                
               return 0;
            }
            else
            {
             
                let re=getmoney(x,y)
                return re;
                
            }
           
        }
        if(flag=="转账")
        {
            if(c1||c2)
            {
                
                return 0;

            }
            else
            {
            
                let re=getmoney(x,y)
                return re;
            }
        }
        
    

}

function getmoney(x,y)
{
    toastLog("发现可能未领的红包");
    sleep(1000)
    click(x,y);
    sleep(2000)
    let openred;
    if(openred=className("android.widget.Button").findOne(2000))
    {
        openred.click();//开红包
        sleep(4000)
        back();
        sleep(2500)
        toastLog("领取成功")
        sleep(2000)
        return 1;
    }
    else
    {
        return 0;
    }
}

//toastLog((Math.random()*10).toFixed(2))

module.exports=T



 

