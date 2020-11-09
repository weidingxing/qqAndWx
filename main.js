"ui";
ui.layout(
<drawer id="drawer">
    <vertical>
        <appbar>

        <toolbar id="toolbar" title="欢迎私信合作"/>
        <tabs id="tabs"/>
    </appbar>
    <viewpager id="viewpager">
         <frame id="f1" bg="#66CCFF">
            <vertical padding="10 10 2 2">
            <button id="with_chat" w="250sp"  h="50sp" text="微信配置" textSize="15sp" textColor="white" bg="#8470FF" />
            <button id="with_qq" w="250sp"  h="50sp" text="QQ配置" textSize="15sp" textColor="white" bg="#8470FF" marginTop="10sp" />
            <button id="today" w="250sp"  h="50sp" text="今日头条" textSize="15sp" textColor="white" bg="#8470FF" marginTop="10sp" />
            <button id="quckly" w="250sp"  h="50sp" text="快手极速版" textSize="15sp" textColor="white" bg="#8470FF" marginTop="10sp" />
             <text text="更多软件敬请期待完善......" textSize="20sp" textColor="green" marginTop="20sp" marginLeft="10sp"></text>   
            </vertical>
        
    </frame>
        <frame>
            <vertical>
            <horizontal>
              <button id="reboot" w="100sp"  h="40sp" text="一键重启" textSize="15sp" textColor="white" bg="#0000FF" />
              <button id="look" w="100sp"  h="40sp" text="查看安卓版本" textSize="15sp" textColor="white" bg="#0000FF" marginLeft="2" />
           
            </horizontal>
            <text textColor="green">更多功能敬请期待</text>
            </vertical>

        </frame>

        <frame>
        <text textColor="#5F9EA0" textSize="15sp">本软件支持微信7.0.16.QQ支持8.2.0,使用本软件请给无障碍辅助服务权限和悬浮窗权限,使用本软件造成的任何影响与作者无关,
使用本软件过程中如发现有bug请给与反馈,欢迎加入交流群723993316,反馈邮箱---->wdxking@163.com
        </text>

    </frame>
</viewpager>

</vertical>

<vertical layout_gravity="left" bg="#F8F8FF" w="230">

            <vertical h="50sp" marginTop="10sp">
         
            <Switch id="autoService" text="无障碍辅助权限" textColor="red" textSize="20sp" checked="{{auto.service != null}}"   />
            </vertical>
            <list id="menu">
                <horizontal>
                    <text textColor="#036289" textSize="27sp" text="{{this.title}}" h="40" layout_gravity="center" marginBottom="10" />
                </horizontal>
            </list>
        </vertical>
</drawer>
);
activity.setSupportActionBar(ui.toolbar);
ui.viewpager.setTitles(["app配置","更多功能","公告"]);
ui.tabs.setupWithViewPager(ui.viewpager)
ui.toolbar.setupWithDrawer(ui.drawer)
ui.autoService.on("check", function (checked) {
    // 用户勾选无障碍服务的选项时，跳转到页面让用户去开启
    if (checked && auto.service == null) {
        app.startActivity({
            action: "android.settings.ACCESSIBILITY_SETTINGS"
        });
    }
    if (!checked && auto.service != null) {
        auto.service.disableSelf();
    }
});

// 当用户回到本界面时，resume事件会被触发
ui.emitter.on("resume", function () {
    // 此时根据无障碍服务的开启情况，同步开关的状态
    ui.autoService.checked = auto.service != null;
});

// 菜单
ui.menu.setDataSource([
    {
        title: "关于软件"
    },
    {
        title: "软件注册"
    }
])

// 菜单
ui.menu.on("item_click", item => {
    switch (item.title) {
        case "关于软件":
            toast("关于软件-功能未完善，敬请期待");
            break;
        case "软件注册":
            toast("软件注册-功能未完善，敬请期待");
    }
})

threads.start(function(){
toastLog("当前运行脚本数量"+engines.all().length)
ui.viewpager.addOnPageChangeListener({
onPageSelected:function(index){
if(index==0){
log(index)
}    
}

})

ui.run(()=>{

    ui.reboot.on("click",function(){

            toast("敬请期待完善...")

    })
    ui.look.on("click",function(){

        toast("敬请期待完善...")

})
    ui.with_chat.on("click",function(){
        try{
            engines.execScriptFile("./wechat/wechatMain.js");//添加群好友
        }
       catch(e){
           toastLog("微信错误信息"+e.message)
       }
      
    });
    ui.with_qq.on("click",function(){
        try{
            engines.execScriptFile("./qq/qqMain.js");//添加群好友
        }
       catch(e){
           toastLog("QQ错误信息"+e.message)
       }
      
    })

    ui.today.on("click",function(){
        try{
            engines.execScriptFile("./todaynews/todaynews.js");//添加群好友
        }
       catch(e){
           toastLog("今日头条错误信息"+e.message)
       }

    })
    ui.quckly.on("click",function(){
        try{
            engines.execScriptFile("./qucklywork/kuaishou.js");//添加群好友
        }
       catch(e){
           toastLog("快手极速版错误信息"+e.message)
       }

    })

    
})

})




