const {  ipcRenderer , shell  } = require('electron');


const links = document.querySelectorAll('open_url[href]');
links.forEach(link => {
    link.addEventListener('click', e => {
        const url = link.getAttribute('href');
        e.preventDefault();
        shell.openExternal(url);
    });
});


// 跳转到全部游戏或者切换回去
function open_url(url) {
    shell.openExternal(url);
}


var Framework // 基座变量


// 服务器弹层变量
var Server_list_layui_box



document.addEventListener('keydown', function(event) {
    // 禁用 F12 打开开发者工具
    if (event.key === 'F12') {
        event.preventDefault();
    }

    // 禁用 Ctrl+Shift+I 或 Ctrl+Shift+C 打开开发者工具
    if ((event.ctrlKey && event.shiftKey && (event.key === 'I' || event.key === 'C')) ||
        // 禁用 Ctrl+Shift+J 或 Ctrl+U 打开开发者工具
        (event.ctrlKey && (event.key === 'J' || event.key === 'U')) ||
        // 禁用 Ctrl+R 或 F5 刷新页面
        ((event.ctrlKey && event.key === 'R') || event.key === 'F5')) {
        event.preventDefault();
    }
});


// // 魔改log
// // 保存原始的 console.log 函数
// const originalConsoleLog = console.log;
// // 重写 console.log 函数
// console.log = function(...args) {
//     // 获取当前本地时间的字符串
//     ipcRenderer.send('web_log', ...args);
//     originalConsoleLog.apply(console, [ ...args]);
// };



$(function() {
    $("[page='home']").trigger("click");
    // 向后端发送指令，告诉后端，可以关闭加载动画了
    setTimeout(() => {
        var window_data =[]
        window_data[0] = "ui"
        window_data[1] = "show"
        if(getUrlParams().silent != "true"){
            ipcRenderer.send('window', window_data);
        }
        
        window_data[0] = "load"
        window_data[1] = "hide"
        ipcRenderer.send('window', window_data);
        
        // 告诉后端可以加载托盘了
        ipcRenderer.send('Tray', "show");
        
        
        // ipcRenderer.send('speed_tips_Window', {"url" : "https://api.jihujiasuqi.com/app_ui/pc/page/tips/tips.php?text= <marquee scrollamount='10'>当前是测试版本,请群内更新！&nbsp;&nbsp;&nbsp;&nbsp;</marquee>"});
        
        
        
    }, 1000);
    // 清除host
    ipcRenderer.send('batchRemoveHostRecords');
    
    // 加载首页滚动图
    render_home() 
})



// 接收主进程的消息
ipcRenderer.on('Framework', (event, message) => {
    Framework = message
    ipcRenderer.send('speed_code_config', {"mode" : "taskkill"});
    console.log('主线程发送信息:', Framework);
    console.log('基座版本:', Framework.version);
    
    re = new RegExp('Chrome/(.+?) ');
    Framework.appVersion = re.exec(navigator.appVersion)[1];
    
    Framework.sysjs = 202406240430
    
    
    $(".Framework").html("基座版本:" + Framework.version + " &nbsp;&nbsp;&nbsp;&nbsp;内核版本:" + Framework.appVersion  + " &nbsp;&nbsp;&nbsp;&nbsp;SYS.JS版本:" + Framework.sysjs  + " &nbsp;&nbsp;&nbsp;&nbsp;" +  `<Dev onclick="app_window('openDevTools')"> 点击打开控制台</Dev>`);
    
    

    
    if(oem_config.up_version != Framework.version){
        console.log('版本不匹配,需要更新:', Framework.version);
        
        if(oem_config.up_url == ""){
            console.log('无下载url');
            return
        }   
        
         content = `
            <div class="update_box">
                
                ` + oem_config.up_content + `
             
                <p class="dl1">0 B/s</p>
                <p class="dl2">0%</p>
                <div class="layui-progress " lay-showpercent="true">
                  <div class="layui-progress-bar layui-bg-blue" ></div>
                </div>
            </div>`
            

        
        
        dl_data(oem_config.up_url,content,"update_blob")
    }else{
        // 测试核心能不能用
        ipcRenderer.send('speed_code_test');
    }
});

ipcRenderer.on('selected-file', (event, message) => {
    console.log('路径选择:',message[0] ,"游戏id" , gameconfig.id);
    
    if(message[0] == "undefined" || message[0] == undefined){
        
      layer.tips('设置路径错误！', '.set_game_user',{
        tips: [2,'#ff5722']
      });
        
        return; 
    }
    
    localStorage.setItem('*start_game_'+gameconfig.id , message[0]);
    layer.tips('设置成功！', '.set_game_user',{
        tips: [2,'#16b777']
      });
});



function start_game_user() {
    game_start = localStorage.getItem('*start_game_'+gameconfig.id)
    console.log('路径:',game_start ,"游戏id" , gameconfig.id);
    
    
    if(game_start == "undefined" || game_start == undefined){
        ipcRenderer.send('user_get_exe');
        return; 
    }
    
    ipcRenderer.send('user_start_exe',game_start);
    layer.tips('正在启动游戏！', '.start_game_user',{
        tips: [1,'#16b777']
      });
}


$('.home_game_list').mouseover(function(){
    // console.log('鼠标放到游戏列表内了:√');
    DOMMouseScroll_lock = false
}).mouseout(function(){
    // console.log('鼠标没有放到游戏列表内了:×');
    DOMMouseScroll_lock = true
})
 
DOMMouseScroll_lock = true //滚轮锁
$(document).on("mousewheel DOMMouseScroll", function (event) {
    
    var delta = (event.originalEvent.wheelDelta && (event.originalEvent.wheelDelta > 0 ? 1 : -1)) ||  // chrome & ie
                (event.originalEvent.detail && (event.originalEvent.detail > 0 ? -1 : 1));              // firefox
    
    if(DOMMouseScroll_lock){
        return; 
    }
    
    
    if (delta > 0) {
    // 向上滚
     console.log("up+++++");
    //  game_list_all_transition(0)
    //do somthing
    } else if (delta < 0) {
      // 向下滚
      console.log("down+++++");
      if(home_game_list_max - Game_history_get().length < 0){
        game_list_all_transition(1)
      }
     //do somthing
    }
    
    // if(home_game_list_max - Game_history_get().length < 0){
    //     if (delta > 0) {
    //     // 向上滚
    //      console.log("up+++++");
    //      Game_history_json = moveLastToFirst(Game_history_json);
    //     //do somthing
    //     } else if (delta < 0) {
    //       // 向下滚
    //       console.log("down+++++");
    //       Game_history_json = moveFirstToLast(Game_history_json);
    //      //do somthing
    //     }
    //     localStorage.setItem('Game_history', JSON.stringify(Game_history_json));
    //     Game_history() // 加载历史游戏
    // }
    
    
});

// 跳转到全部游戏或者切换回去
function game_list_all_transition(mode) {
    if(mode == 1){
        $(".home_game_list").addClass("home_game_list_transition");
        $(".home_carousel").addClass("home_carousel_transition");
        $(".home_game_list_all").addClass("home_game_list_all_transition");
        
        // 滑动到45高度
        $(".home_game_list_all").animate({scrollTop: 6},1);
        
    }
    if(mode == 0){
        $(".home_game_list").removeClass("home_game_list_transition");
        $(".home_carousel").removeClass("home_carousel_transition");
        $(".home_game_list_all").removeClass("home_game_list_all_transition");
        
    }
    
}


var div = document.getElementById("home_game_list_all");
div.onscroll = function() {
  var scrollPosition = div.scrollTop;

  if (scrollPosition < 1) {
    console.log("滚动位置在顶部。");
    game_list_all_transition(0)
  }
};


function moveFirstToLast(arr) {
    if (arr.length > 0) {
        var firstElement = arr.shift(); // Remove the first element
        arr.push(firstElement); // Add the first element to the end
    }
    return arr;
}
function moveLastToFirst(arr) {
        if (arr.length > 0) {
            var lastElement = arr.pop(); // Remove the last element
            arr.unshift(lastElement); // Add the last element to the beginning
        }
        return arr;
    }

// 接收主进程的消息
ipcRenderer.on('checkUpdate_ipc', (event, message) => {
    console.log('更新信息:', message);
});


// 接收主进程的消息(加速状态)
var socksok = {}
var sockstest_setInterval = null
var starttime_setInterval = null
var speed_code_msg = null

var speed_code_get_newdata = 0
ipcRenderer.on('speed_code', (event, message) => {
    
  console.log('主线程发送信息:', message);
  
    speed_code_msg = message
  
    if(message.tag == "net_speed_start"){
        console.log('来自host模块的socks测试信息:', message);
        if(message.start == "SOCKS OK"){
            console.log('来自host模块的socks测试 - 成功！');
            $(".start_game .box .pt_list .pt_box .layui-icon").hide()
            net_speed_list()
            layer.close(net_speed_layui_box)
        }
        
        
        return;
    }
  
  
    if(message.start == "SOCKS OK"){
        socksok['connect_test'] = true
        socksok['test'] = true
    }
    
    if(message.start == "SOCKS ERR"){
        clearInterval(starttime_setInterval);
        stop_speed()
        // alert('服务器检测连通性失败');
        // 打开错误日志页面
        
        
        var r = confirm("当前服务器不可用,请尝试更换其他服务器\n\n\n服务器链接失败，要查看日志么?");
        if (r == true) {
            error_page("服务器检测连通性失败")
        }
        
        return;
    }
    
    if(message.start == "log"){
        $(".error_log").html(message.log);
        return;
    }
    
    
    if(message.start == "OK"){

      
      
      console.log('确认一下 Game_starting_id :', Game_starting_id);
      console.log('确认一下 Game_start_id :', Game_start_id);
      
      
      if(Game_start_id != 0){
            Game_start_id = 0
            // 测试socks是不是好的
            socksok['connect_test'] = false
            
            // console.log('connect_test锁 :', socks_test_lock);
            
            // 测试socks
            if(socks_test_lock == 0){
                socks_test_lock = 1
                ipcRenderer.send('speed_code_config', {"mode" : "socks_test"});
                ipcRenderer.send('socks_connect_test');// 测试udp
                socks_connect_test_ico_set()
                socks_connect_test_data = []
            }
            
            
            
            
            sockstest_setInterval = setInterval(function(){
                if(socksok['connect_test']){
                // if(socksok['connect_test'] && Bandwidthspeed.Bandwidth.traffic > 1024){
                    clearInterval(sockstest_setInterval);
                    clearInterval(starttime_setInterval);
                    Start_speed()// 开始更新加速数据
                    
                    // ipcRenderer.send('speed_tips_Window', {"url" : "https://api.jihujiasuqi.com/app_ui/pc/page/tips/tips.php?text= <marquee scrollamount='10'>已成功加速游戏！丢包防护已启动！&nbsp;&nbsp;&nbsp;&nbsp;</marquee>"});
                    
                    setTimeout(() => {
                        speed_start_id = generateUniqueID(); // 生成本次加速随机id
                        $("[page='start_game']").trigger("click");
                        console.log('加速成功,跳转页面:', Game_starting_id);
                        console.log('耗时:', starttime_timeout);
                        
                        console.log('加速id', speed_start_id);
                        
                        // 上升优先级
                        ipcRenderer.send('high_priority', "sniproxy.exe");
                        ipcRenderer.send('high_priority', "SpeedNet.exe");
                        ipcRenderer.send('high_priority', "SpeedProxy.exe");
                        ipcRenderer.send('high_priority', "SpeedMains.exe");
                        ipcRenderer.send('high_priority', "SpeedFox.tun2socks.exe");
                        
                        
                        $("[start_gameid='"+Game_starting_id +"']").show();
                        
                        $("[start_ing_id='"+Game_starting_id +"']").hide();
                        $("[start_ing_id='"+Game_starting_id +"'] iframe").prop('src', '');
                        
                        
                        

                            if(Game_code_config.config_host.includes("**")){
                                starthost = Game_code_config.config_host.split("\r\n");
                                // starthost = starthost.replaceAll("*","");
                                console.log('检测到需要加速的host 数组',starthost);
                                for (var i = 0; i < starthost.length; i++) {
                                    starthostdata = starthost[i].replaceAll("*","");
                                	console.log('检测到需要加速的host 数组', starthostdata);
                                	net_speed_set(starthostdata,1)
                                }
                            }

                        
                        
                    },1000);
      
                }
            },1000);
      }
      
    }
  
    if(message.start == "close"){
        if(Game_starting_id == 0){
            // 正常停
            console.log('进程停止(正常)');
            return;
        }
        console.log('进程意外终止!(在游戏加速中丢失)');
        // stop_speed()
        // // 打开错误日志页面
        // error_page("进程丢失或被终止")
        
        
        
        
    }
  
});


// 关闭通信
ipcRenderer.on('app_', (event, message) => {
    console.log(`参数: `,message)
    if(message == "exit"){
        app_exit()
    }
});

try {
  const { ipcRenderer  } = require('electron');
} catch (error) {
  console.log("在错误的平台上运行" ,error);
}


// 返回ping数据
ipcRenderer.on('ping-reply', (event, message) => {
    // console.log(`参数: `,message)
    
    // 列表返回延迟
    if(message.pingid == "ping_server_list"){
        // console.log(`PING 返回: `,message)
        updateDelayData(message.res.host, message.res.time);
        networkDelayCanvas_update(message.res.host) // 绘制数据
        
        
        // 外面给用户的延迟也写上
        serverlist_config.forEach(function(item) {
            if (item.test_ip === message.res.host) {
                if(message.res.time == "unknown"){
                    message.res.time = 9999
                }
                item.ping = message.res.time + " ms";
                item.ping_initSort = message.res.time;
            }
        });
        
    }
    
    
    if(message.pingid == "ping_connect_server_test" ){
        // console.log(`PING 返回: `,message)
        Start_speed_ping(message)
    }
    
    
    
});

function updateDelayData(ip, delay) {
    // 检查是否存在对应的 IP 地址
    var existingEntry = server_delayData.find(function(entry) {
        return entry.ip === ip;
    });

    // 如果不存在，创建一个新的对象
    if (!existingEntry) {
        server_delayData.push({
            ip: ip,
            delays: [delay]
        });
    } else {
        // 如果存在，添加延迟数据
        existingEntry.delays.push(delay);
    }
}



function formatTime(seconds) {
    // 计算小时
    const hours = Math.floor(seconds / 3600);
    seconds %= 3600; // 计算剩余秒数

    // 计算分钟
    const minutes = Math.floor(seconds / 60);
    seconds = seconds % 60; // 计算剩余秒数

    // 格式化成两位数
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    // 返回格式化的字符串
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}


// 开始加速,更新数据
var Start_speed_setInterval
var start_time
var code_onlineok
var speed_code_msg_json = []
function Start_speed() {
    start_time = Date.parse(new Date())/1000;
    Start_speed_setInterval = setInterval(function(){
        time_s = Date.parse(new Date())/1000 - start_time;
        // console.log(formatTime(time_s))
        // 计时
        $('.start_game .box .stop_speed time').text(formatTime(time_s))
        

        const pingdata = {
            host: Server_config.ip+":"+Server_config.port,
            timeout: 8, // 超时时间，单位为秒
            C:1,// 次数
            pingid: "ping_connect_server_test"
        };
        
        ipcRenderer.send('ping',pingdata)
        
        // ipcRenderer.send('NET_speed')// 更新流量
        
        
        // 检测组件稳定性
        
        
        code_onlineok = false
        
        
        try {
            speed_code_msg_json = $.parseJSON(speed_code_msg);
        }catch(err) {}
        
        if(start_server_config.mode == "nf2_start"){
            code_onlineok = false
            // nf2组件重点关照
            try {
                console.log('核心在线时间',speed_code_msg_json.code.time,'核心误差时间', Date.parse(new Date())/1000 - speed_code_msg_json.code.time)
            }catch(err) {}
            
            
            try {
                if(Date.parse(new Date())/1000 - speed_code_msg_json.code.time < 5){
                    code_onlineok = true
                }
            }catch(err) {}
        }
        
        
        
        
        
       if(start_server_config.mode == "wintun_start"){
           code_onlineok = true
       }
        
        
        console.log('核心状态',code_onlineok)
        
        
    },1000);
}

// 返回流量数据 (本地服务器)
var outputBytes_0 = 3
var up_userspeed = 5


var Bandwidthspeed

ipcRenderer.on('NET_speed-reply', (event, message) => {
    message = $.parseJSON(message);
    
    Bandwidthspeed = message
    
    console.log(message["Bandwidth"]["speed"], message["Bandwidth"]["traffic"] , "下次上报速度" , up_userspeed);
    
    Start_speed_outputBytes_html_out = message["Bandwidth"]["traffic"]
    Start_speed_Bytes_speed_html_out = message["Bandwidth"]["speed"]
    
    Start_speed_outputBytes_html_out = Start_speed_outputBytes_html_out - 5120
    
    if(Start_speed_outputBytes_html_out < 0){
        Start_speed_outputBytes_html_out = 0
    }
    
    $("Start_speed_outputBytes_html").text(formatSizeUnits(Start_speed_outputBytes_html_out).split(" ")[0]) // 加速流量
    $(".start_game .box .ping .outputBytes mini").text(formatSizeUnits(Start_speed_outputBytes_html_out).split(" ")[1]) // 加速流量
    
    
    $("Start_speed_Bytes_speed_html").text(bytesToSize(Start_speed_Bytes_speed_html_out).split(" ")[0]) // 当前速度
    $(".start_game .box .ping .Bytes_speed mini").text(bytesToSize(Start_speed_Bytes_speed_html_out).split(" ")[1]) // 当前速度
    

    
    
    // 上报流量和速度
    up_userspeed --

    if(up_userspeed < 0){
        up_userspeed = 12;
        // console.log('上报服务器速度',speed_start_id);
        
        
        
        $.getJSON("https://api.jihujiasuqi.com/api/v2/?mode=server_user_info_update&user_code=" + user_code() + "&product=" + getUrlParams().product + "&speed_id=" + speed_start_id + "&version=" + Framework.version + "&server=" + Server_config.id + "&game=" + gameconfig.id + "&speed=" + Start_speed_Bytes_speed_html_out + "&flow=" + Start_speed_outputBytes_html_out  + "&ping=" + server_ping_ms ).done(function(data) {
            // console.log('速度',data);
            
            
        })
        .fail(function(xhr, status, error) {
          console.log("上报用户数据失败" + error,status,xhr);
        });

        
        
        
    }
    
    
    // 检测核心超时状态
    
    
    
})




// 远程服务器
var outputBytes_0_server = 0
ipcRenderer.on('NET_speed_server-reply', (event, message) => {
    // console.log('NET_speed-reply:', message);
    // 按行拆分指标文本
    var lines = message.split('\n');
    
    // 变量用于存储输出字节数
    var outputBytes = null;
    
    // 遍历每一行以找到相关的指标
    $.each(lines, function(index, line) {
        if (line.startsWith('gost_service_transfer_output_bytes_total')) {
            outputBytes = line.split(" ")[1];
            
            Bytes_speed = outputBytes - outputBytes_0_server
            
            console.log('服务器当前网速:', outputBytes , formatSizeUnits(outputBytes) ,"60平均网速" , Bytes_speed/60 , formatSizeUnits(Bytes_speed/60));
            
        }
    });
    
    
    outputBytes_0_server = outputBytes
})



// 更新延迟数据
var delayValues = []
var numBars = 0
var lossok = 0
var server_ping_ms = 0


function Start_speed_ping(message) {
    // console.log(` 更新延迟数据: `,message.ms)
    
        // networkDelayCanvas_
        // Canvas 渲染 ===============================================
        var canvas = document.getElementById('Start_speed_pingCanvas');
        var ctx = canvas.getContext('2d');

        // 定义一些参数
        numBars = 60; // 竖条数量
        var barWidth = canvas.width / numBars; // 竖条的宽度
        if (delayValues.length < 110) {
            // console.error("数组长度小于 100，先随机拉点屎");
            for (var i = 0; i < 110; i++) {
                delayValues.push(0);
            }
        }
 
        // for (var i = 0; i < 100; i++) {
            // delayValues.push(Math.random() * 300); // 延迟值在0到300之间随机生成
        
       
        // 启动前2秒不写入数据
        if(time_s > 1){
            delayValues.push(message.ms); 
            render(); // 渲染
        }
        
         // 延迟大于999就爆表了，再高不显示了
        if(message.ms > 999){
            message.ms = 999
        }
        
        
   
        $("Start_speed_ping_html").text(message.ms)
        
        server_ping_ms = message.ms
        
        // $(".home_game_box .box_a .Game_start_ok h2").text(message.ms)
        
        
        // 取出最新的 100 个元素
        let latest100 = delayValues.slice(-100);
        
        // 计算大于 999 的数量
        let lossCount = latest100.filter(num => num > 3000).length;
        
        
        if($("Start_speed_diubao_html").text() != lossCount){
            console.log('loss出现变化:', lossCount);
            if(lossCount > 1){
                console.log('loss大于1:', lossCount);
                
                // if(!$('.start_game .box .ping .diubao').visible()){
                //     return;
                // }
                
                // layer.tips('多倍发包补偿成功!', ".start_game .box .ping .diubao", {
                //   tips: [2]
                // });
                
                
                // if(lossok + 30 < Date.parse(new Date())/1000){
                //     lossok = Date.parse(new Date())/1000;
                    
                //     layer.tips('多倍发包补偿成功!', ".start_game .box .ping .diubao", {
                //       tips: [2]
                //     });
                //     delayValues = removeIsolatedPackets(delayValues);
                    
                    
                    
                // }
                
                
            }
            
            if(lossCount == 10){
                // ipcRenderer.send('speed_tips_Window', {"url" : "https://api.jihujiasuqi.com/app_ui/pc/page/tips/tips.php?text= <marquee scrollamount='14'>当前网络丢包严重,请检查网络环境或更换节点！&nbsp;&nbsp;&nbsp;&nbsp;</marquee>"});
            }
            
        }
        
        $("Start_speed_diubao_html").text(lossCount)
        
        
        
        
        
        // 大于600个数组就开始删，预防炸了(10分钟)
        if (delayValues.length > 110) {
            delayValues.shift(); // 删除数组中的第一个元素
        }
        
        // console.log('delayValues.length' ,delayValues.length);
        
        // }

        // 渲染函数
        function render() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空Canvas

            // 只绘制最新的50条数据
            var startIdx = Math.max(0, delayValues.length - numBars);
            var endIdx = delayValues.length;

            // 绘制竖条
            for (var i = startIdx; i < endIdx; i++) {
                var delay = delayValues[i];
                var height = (delay / 350) * canvas.height; // 将延迟值映射到Canvas高度
                var color = getColor(delay);
                ctx.fillStyle = color;
                ctx.fillRect((i - startIdx) * barWidth, canvas.height - height, barWidth, height);
            }
        }

        // 获取颜色
        function getColor(delay) {
            var ratio = delay / 350; // 延迟值的比率
            var r = Math.round(255 * ratio); // 红色分量
            var g = Math.round(255 * (1 - ratio)); // 绿色分量
            return 'rgb(' + r + ', ' + g + ', 0)';
        }

        // Canvas 渲染 结束===============================================
    
}


// 消除孤立延迟
function removeIsolatedPackets(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 999) {
            // Check if the packet is isolated
            if ((i === 0 || arr[i - 1] <= 999) && (i === arr.length - 1 || arr[i + 1] <= 999)) {
                continue; // Skip this isolated packet
            }
        }
        result.push(arr[i]);
        console.log('消除孤立延迟');
    }
    return result;
}

function createCycleFunction() {
  const values = [60, 300, 600];
  let index = 0;

  return function() {
    const result = values[index];
    index = (index + 1) % values.length; // 每次调用后递增索引，并循环到数组的开头
    console.log("numBars" , result);
  };
}






function app_exit() {
    layer.open({
        type: 1,
        area: ['320px', '200px'], // 宽高
        id: 'LAY_app_exit',// 设置id 仅限一个
        title:" ",
        content: `
<div class="layui-form exit_radio">
  <input type="radio" name="AAA" value="1" title="隐藏到任务栏托盘" checked>
  <input type="radio" name="AAA" value="2" title="退出主程序"> 
  <button class="layui-btn layui-btn-primary layui-border-blue">退出程序</button>
  
</div>
        
        `
    });
    // 重新渲染按钮
    layui.form.render();
}


// 窗口操作
function app_window(mode) {
    ipcRenderer.send('window', ["ui",mode]);
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 获取json数据
function get_JSON(url){
    $.getJSON({async: false,url})
    .done(function(data) {
      // 请求成功时的处理逻辑
    //   console.log("请求成功" + data);
      JSONdata = data
    })
    .fail(function(xhr, status, error) {
      // 请求失败时的处理逻辑
      console.log("请求失败" + error,status,xhr);
      layer.msg('数据请求失败 <br>返回码:' + xhr.status);
    });
    return JSONdata;
}


//  生成用户随机数
function generateUniqueID() {
    const timestamp = Date.now(); // 当前时间戳
    const randomNum = Math.floor(Math.random() * 1000000); // 生成随机数
    return `${timestamp}${randomNum}`;
}


function pc_uuid() {
    pc_uuid_str = localStorage.getItem('pc_uuid');
    if(localStorage.getItem('pc_uuid') == null){
        pc_uuid_str = generateUniqueID();
        localStorage.setItem('pc_uuid', pc_uuid_str);
    }
    return pc_uuid_str
}

// 获取用户 user_code
function user_code() {
    user_code_str = localStorage.getItem('user_code');
    if(localStorage.getItem('user_code') == null){
        return false;
    }
    return user_code_str
}

// 获取历史游戏json
function Game_history_get() {
    Game_history_json = localStorage.getItem('Game_history'); // 历史游戏
    if(!Game_history_json){
        Game_history_json = [];
    }else{
        Game_history_json = JSON.parse(Game_history_json)
    }
    return Game_history_json
}

// 设置历史游戏json
function Game_history_set(id) {
    // 写入历史游戏
    Game_history_json = Game_history_get()
    
    // 删除
    Game_history_json = Game_history_json.filter(item => item.id !== id);
    
    var arr  =
    {
        "id" : id,
    };
    Game_history_json.unshift(arr);
    
    
    localStorage.setItem('Game_history', JSON.stringify(Game_history_json));
    
    // 写入历史游戏
}

// 删除历史游戏
function Game_history_del(id) {
    Game_history_json = Game_history_get()
    
    // 删除
    Game_history_json = Game_history_json.filter(item => item.id !== id);
    
    localStorage.setItem('Game_history', JSON.stringify(Game_history_json));
    Game_history()// 重新加载历史游戏
}



function getUrlParams() {
    var params = {};
    var queryString = window.location.search.substring(1);
    var regex = /([^&=]+)=([^&]*)/g;
    var match;

    while (match = regex.exec(queryString)) {
        params[decodeURIComponent(match[1])] = decodeURIComponent(match[2]);
    }
    return params;
}





var Game_start_iframe = "page/load/"



// 写入游戏配置+服务器配置
var Game_code_config =[]
var Server_config
var socks_test_lock
function set_speed_code_config(gameid,serverid,mode) {
    // Game_code_config = null
    
    layer.close(Server_list_layui_box);// 关闭服务器列表弹层
    
    gameid = Game_code_config.id
    
    Server_config = null
    socks_test_lock = 0 // 可以测试socks
    $("[start_ing_id='"+gameid+"']").show();
    $("[start_ing_id='"+gameid+"'] iframe").prop('src', Game_start_iframe);
    Game_start_id = gameid
    Game_starting_id = gameid
    Game_start_animation(gameid)
    

    ipcRenderer.send('speed_code_config', {"mode" : "taskkill"});
    
    starttime_timeout = 0;
    starttime_setInterval = setInterval(function() {
        console.log("当前倒计时值:", starttime_timeout);  
        starttime_timeout++;
        console.log("加速超时", starttime_timeout);
    
        if (starttime_timeout === 16) {
            console.log("清除间隔");
            clearInterval(starttime_setInterval);
            stop_speed()
            // alert('加速超时');
            // 打开错误日志页面
            error_page("加速超时")
        }
    }, 1000);
    
    
    
    setTimeout(() => {
        Server_config = get_JSON("/api/v2/?mode=server_info&product=" + getUrlParams().product + "&sid="+serverid+"&user_code=" + user_code())
        console.log("服务器配置",Server_config); 
        
        localStorage.setItem('server_sort_' + Game_code_config.id, Server_config.CountryCode);
        v2config = ''
        
        
        if(start_server_config.code_mod == "v2ray"){
            v2config = `
    {
      "inbounds": [
        {
          "port": 16780,
          "protocol": "socks",
          "listen": "127.0.0.1",
          "settings": {
            "auth": "noauth",
            "udp": true
          }
        }
      ],
      "outbounds": [
        {
          "protocol": "`+Server_config.connect_mode+`",
          "settings": {
            "servers": [
              {
                "address": "`+Server_config.ip+`",
                "port": `+Server_config.port+`,
                "method": "`+Server_config.method+`",
                "password": "`+Server_config.token+`"
              }
            ],
            "port": 0,
            "plugin": "",
            "pluginOpts": "",
            "mtu": 0
          },
          "mux": {
            "enabled": false,
            "concurrency": 0
          }
        }
      ]
    }
    `
        }
        
        var start_config  =
        {
            "Game_config" : Game_code_config,
            "Server_config" : Server_config,
            "mode":mode,
            "code_mod":start_server_config.code_mod,
            "v2config":v2config,
        };
        
        ipcRenderer.send('speed_code_config', start_config);
        
        
        gamebg = ""
        if(Game_code_config.wallpapers == "noset"){
            gamebg =  '/up_img/' + Game_code_config.img + ".webp"
        }else{
            gamebg = "/up_img/wallpapers/" + Game_code_config.wallpapers
        }
        
        
        // 设置游戏图片等信息
        $('.start_game .game_bg').attr('src', gamebg);
        $('.start_game .box .gamename').text(Game_code_config.name)
        $('.start_game .game_bg_video').hide()
        
        
        // 如果是视频就切换视频
        if(gamebg.includes(".mp4")){
            $('.start_game .game_bg_video source').attr('src', gamebg);
            $('.start_game .game_bg_video').show()
            document.getElementById("game_bg_video").load();
        }
        
        speed_mod = "自动"
        
        if(start_server_config.mode == "nf2_start"){
            speed_mod = "进程模式"
        }
        if(start_server_config.mode == "wintun_start"){
            speed_mod = "路由模式"
        }
        
        
        $('.start_game .box .server_info p').text(Server_config.name + "-" + Server_config.id + " | " + speed_mod)
        
    }, 1000 * .5);
}
// 写入游戏配置检测
ipcRenderer.on('speed_code_config-reply', (event, message) => {
    if(message == "OK"){
        console.log(`游戏配置准备就绪 `)
    }
});

var speed_code_test_mode = 0
ipcRenderer.on('speed_code_test', (event, message) => {
    console.log(`环境检测 `,message)
    if(speed_code_test_mode == 0){
        console.log(`环境检测 `,message)
        speed_code_test_mode = 1
        if(message.includes("You must install or update .NET to run this application") || message.includes("You can resolve the problem by installing the specified framework and/or SDK") || message.includes("You must install .NET to run this application")){
            console.log(`缺少必要的环境 `)
            content = `
            <div class="update_box">
                <h2> 缺少必要的组件,正在联网下载 </h2>
             
             
                <p class="dl1">0 B/s</p>
                <p class="dl2">0%</p>
                <div class="layui-progress " lay-showpercent="true">
                  <div class="layui-progress-bar layui-bg-blue" ></div>
                </div>
            </div>`
            

            
            dl_data("https://api.jihujiasuqi.com/dl/net%E4%BC%A0%E5%AE%B6%E5%AE%9D.exe",content,"NET_blob")
        }
    }
    
    if(speed_code_test_mode == 2){
        console.log(`环境检测-安装是否成功 `,message)
         if(message.includes("test_run")){
              console.log(`环境成功 `)
              layer.msg('组件安装成功!', {icon: 1});
              layer.close(update_app_lay);
         }
          if(message.includes("You must install or update .NET to run this application.") || message.includes("You can resolve the problem by installing the specified framework and/or SDK") ||  message.includes("You must install .NET to run this application")){
             speed_code_test_mode = 0
              layer.msg('组件安装失败!', {icon: 2});
              layer.close(update_app_lay);
         }
    }
    
});


var socks_connect_test_data = []
ipcRenderer.on('socks_connect_test', (event, message) => {
    console.log(`连接检测 `,message)
    
    if(message.includes("UDP: OK")){
        console.log(`UDP 连接正常 `)
        layer.msg('UDP 连接正常', {offset: 'b',anim: 'slideUp'});
        ipcRenderer.send('web_log', `UDP 连接正常 `);
        socks_connect_test_data.udp = true
    }
    
    if(message.includes("TCP: OK")){
        console.log(`TCP 连接正常 `)
        layer.msg('TCP 连接正常', {offset: 'b',anim: 'slideUp'});
        ipcRenderer.send('web_log', `TCP 连接正常 `);
        socks_connect_test_data.TCP = true
    }
    
    socks_connect_test_ico_set()
});


function socks_connect_test_ico_set() {
    if(socks_connect_test_data.TCP && socks_connect_test_data.udp){
        $('.start_game .box .server_info .udp_ico').attr('src', '/app_ui/pc/static/img/nettestok.png');
    }else{
        $('.start_game .box .server_info .udp_ico').attr('src', '/app_ui/pc/static/img/nettesterr.png');
    }
}

$(".start_game .box .server_info .udp_ico").on('click', function(event) {
    ipcRenderer.send('socks_connect_test');// 测试udp
    socks_connect_test_data=[]
    socks_connect_test_ico_set()
});



function info_speed() {
    $("[page='start_game']").trigger("click");
}



function stop_speed() {
    console.log(`停止加速 `)
    ipcRenderer.send('speed_code_config', {"mode" : "taskkill"});
    
    console.log('确认一下 Game_starting_id :', Game_starting_id);
    console.log('确认一下 Game_start_id :', Game_start_id);
    
    
    // $("[page='start_game']").trigger("click");
    
    $("[start_gameid='"+Game_starting_id +"']").hide();
    Game_start_id = 0
    Game_starting_id = 0
    
    start_speed_time = $('.start_game .box .stop_speed time').text();
    // ipcRenderer.send('speed_tips_Window', {"url" : "https://api.jihujiasuqi.com/app_ui/pc/page/tips/tips.php?text= <p style='position: fixed;top: -34px;'>已停止加速！</p> <p style='position: absolute;top: 10px;font-size: 12px;'>加速时长:" + start_speed_time + "</p>"});
    
    
    // 奶奶的为啥清理不掉，多清理亿轮
    for (i = 0; i < 32; i++) {
        clearInterval(sockstest_setInterval);
        clearInterval(starttime_setInterval);
    }
    Game_start_animation(0)
    $('.start_game .box .stop_speed').html("正在停止...")
    $(".start_game .box .stop_speed_hover").html("正在停止...")
    clearInterval(Start_speed_setInterval);// 清理定时器
    setTimeout(() => {
        delayValues = []
        Bandwidthspeed = []
        $("[page='home']").trigger("click");
        $('.start_game .box .stop_speed').html('<i class="layui-icon layui-icon-radio"></i> 加速中:<time></time>')
        $(".start_game .box .stop_speed_hover").html('<i class="layui-icon layui-icon-radio"></i> 停止加速')
    }, 1000 * 2);
    
    
    // 批量吧所有配置设置成0 host
    net_speed_json.forEach(service => {
            service.start = 0;
    });
    ipcRenderer.send('batchRemoveHostRecords');
}



console.log("pc_uuid" ,pc_uuid()); // 输出一个pcuuid ，uuid不一样直接下号
console.log("params" , getUrlParams()); // 获取请求参数


if(!home_game_list_max){
    var home_game_list_max = 4;
}


if(!getUrlParams().product){
    layer.msg('缺失产品参数,请登录 极狐合作门户 <br>检查 product 是否配置正确！');
}

if(getUrlParams().demo_watermark){
    // layer.msg('测试版');
    $(".demo_watermark").show()
}


/// debug
// layer.open({
//   type: 1, // page 层类型
//   area: ['500px', '300px'],
//   title: '调试窗口',
//   shade: 0, // 遮罩透明度
//   shadeClose: false, // 点击遮罩区域，关闭弹层
//   maxmin: true, // 允许全屏最小化
//   anim: 0, // 0-6 的动画形式，-1 不开启
//   content: `<div style="background: #ff572242;position: relative;width: 100%;height: 100%;">   
//   <button type="button" class="layui-btn layui-btn-normal layui-btn-lg " onclick="Server_list()"><p>弹出服务器列表窗口</p></button>
//   <button type="button" class="layui-btn layui-btn-normal layui-btn-lg " onclick="User_login()"><p>弹出登录窗口</p></button>
//   <button type="button" class="layui-btn layui-btn-normal layui-btn-lg " onclick="Pay_page_web()"><p>弹出充值窗口</p></button>
  
//   </div>`
// });


var oem_config  = get_JSON("/api/v2/?mode=get_oem&product=" + getUrlParams().product)
$('.nav .logo').attr('src', oem_config.logo);
console.log("oem信息",oem_config);


var Game_list_json = get_JSON("/api/v2/?mode=game_list&product=" + getUrlParams().product)
Loaded_Game_list(Game_list_json); // 装载游戏列表


if(!user_code()){
    console.log("账号未登录,不加载历史游戏,加载热门游戏");
    Loaded_Game_home(Game_list_json , home_game_list_max , false); // 装载游戏列表 塞4个游戏
}else{
    console.log("账号已登录" , user_code());
    Game_user_info()// 更新用户信息
    Game_history() // 加载历史游戏
    
    // 更新用户数据
    Game_user_info_setInterval_loop = 0
    Game_user_info_setInterval_loop_speed = 60 // 更新频率
    
    // 循环更新用户数据
    setInterval(function(){
            Game_user_info()// 更新用户信息
    },1000 * 30);
    
    
}



var Game_start_id = 0 // 正在加速那个游戏
var Game_starting_id = 0 // 已经加速那个游戏


// 加载游戏列表
function Loaded_Game_home(all_game , i , history_id){
    home_game_number = i
    $.each(all_game, function(i, field){
        if(history_id){
            if(field.id != history_id){
                return; 
            }
        }
        
        if(home_game_number > i){
            // console.log("装载首页游戏" , field);
            
            $(".home_game_list").append(`
                <div class="home_game_box">
                    <div class="box_a">
                        <img src="/up_img/` + field.img + `.webp" class="game_img" onclick="Game_start(` + field.id + `)" gameimg="` + field.id + `">
                        
                        <div class="top">
                            <div class="icon">
                                <!-- 
                                <i class="layui-icon layui-icon-website" title="区服/节点"></i> 
                                <i class="layui-icon layui-icon-rate" title="置顶"></i> 
                                -->
                                <i class="layui-icon layui-icon-error" title="删除" onclick="Game_history_del(` + field.id + `)"></i> 
                            </div>
                        </div>
                        <div class="bottom" onclick="Game_start(` + field.id + `)">
                            <p>立即加速 <i class="layui-icon layui-icon-next"></i> </p>
                        </div>
                        
                        <!-- 加速中效果 -->
                        <div class="start_ing" start_ing_id="` + field.id + `" style="display: none;">
                            <iframe marginwidth=0 marginheight=0 width=100% height=100% src="" frameborder=0></iframe>
                        </div>
                        
                        <!-- 完成 -->
                        <div class="Game_start_ok" start_gameid="` + field.id + `">
                            <p>即时延迟</p>
                            <h2><Start_speed_ping_html>0</Start_speed_ping_html><ms>ms</ms></h2>
                            
                            <div class="button_box">
                                <button type="button" class="layui-btn layui-btn-primary layui-border-blue"  onclick="info_speed()">加速详情</button>
                                <button type="button" class="layui-btn layui-btn-primary layui-border-red"  onclick="stop_speed()">停止加速</button>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                    <div class="box_b">
                        <p title="` + field.name + `">` + field.name + `</p>
                    </div>
                </div>
                
            `);
            
        }
        
        
    });
}

function Loaded_Game_home_all(all_game , i , history_id){
    // 装载全部

    $.each(all_game, function(i, field){
        
        if(history_id){
            if(field.id != history_id){
                return; 
            }
        }
        
        $(".home_game_list_all").append(`
                <div class="home_game_box home_game_box_all">
                    <div class="box_a">
                        <img src="/up_img/` + field.img + `.webp" class="game_img" onclick="Game_start(` + field.id + `)" gameimg="` + field.id + `">
                        
                        <div class="top">
                            <div class="icon">
                                <!-- 
                                <i class="layui-icon layui-icon-website" title="区服/节点"></i> 
                                <i class="layui-icon layui-icon-rate" title="置顶"></i> 
                                -->
                                <i class="layui-icon layui-icon-error" title="删除" onclick="Game_history_del(` + field.id + `)"></i> 
                            </div>
                        </div>
                        <div class="bottom" onclick="Game_start(` + field.id + `)">
                            <p>立即加速 <i class="layui-icon layui-icon-next"></i> </p>
                        </div>
                        
                        <!-- 加速中效果 -->
                        <div class="start_ing" start_ing_id="` + field.id + `" style="display: none;">
                            <iframe marginwidth=0 marginheight=0 width=100% height=100% src="" frameborder=0></iframe>
                        </div>
                        
                        <!-- 完成 -->
                        <div class="Game_start_ok" start_gameid="` + field.id + `">
                            <p>即时延迟</p>
                            <h2><Start_speed_ping_html>0</Start_speed_ping_html><ms>ms</ms></h2>
                            
                            <div class="button_box">
                                <button type="button" class="layui-btn layui-btn-primary layui-border-blue"  onclick="info_speed()">加速详情</button>
                                <button type="button" class="layui-btn layui-btn-primary layui-border-red"  onclick="stop_speed()">停止加速</button>
                            </div>
                        </div>
                        
                        
                        
                    </div>
                    <div class="box_b">
                        <p title="` + field.name + `">` + field.name + `</p>
                    </div>
                </div>
                
            
        `);
    });

}

// 加载游戏列表
function Loaded_Game_list(all_game){
    $.each(all_game, function(i, field){
        // console.log("装载全部游戏" , field);
        $(".game_list_all").append(`
            <div class="home_game_box" gameid="` + field.id + `" onclick="Game_start(` + field.id + `,2);" >
                <div class="box_a">
                    <img src="/up_img/` + field.img + `.webp?gameid=` + field.id + `" class="game_img" loading="lazy">
                    
                    <!--
                    <div class="top">
                        <div class="icon">
                            <i class="layui-icon layui-icon-website" title="区服/节点"></i> 
                        </div>
                    </div>
                    -->
                    
                    <div class="bottom">
                        <button type="button" class="layui-btn layui-bg-blue layui-btn-sm layui-btn-fluid button">立即加速</button>
                    </div>
                    
                </div>
                
                <div class="box_b"  style="height: 12px;overflow: hidden;padding-bottom: 16px;">
                    <p title="` + field.name + `">` + field.name + `</p>
                    <search style="display: none;">` + field.search + `</search>
                </div>
            </div>
            
        `);
        
    });
}

function Loaded_Game_home_nogame (a){
    $(".home_game_list").append(`
        <div class="home_game_box nogame">
            <div class="box_a">
                <img src="/up_img/apex.png.webp" class="game_img" >
                
                <div class="top_nogame">
                   <img src="static/img/fox_avater.png" class="top_nogame_img" >
                   <p> 使用顶部搜索,立即加速 </p>
                </div>
                <div class="bottom_nogame">
                    <i class="layui-icon layui-icon-release"></i> 
                    <h2> 添加更多游戏 </h2>
                </div>
                
                <div class="start_ing"  style="display: none;">
                    <iframe marginwidth=0 marginheight=0 width=100% height=100% src="" frameborder=0></iframe>
                </div>
                
            </div>
        </div>
        
    `);
}



// 鼠标放进去更新用户信息
$('.user_top_info').mouseover(function(){
    console.log("hover更新用户信息");
    if(!user_code()){
        console.log("账号未登录");
        return; 
    }
    Game_user_info()
})


var user_info_data = ""
// 获取用户信息
function Game_user_info(){
    $.getJSON("/api/v2/?mode=user_info&user_code=" + user_code() + "&product=" + getUrlParams().product).done(function(data) {
      console.log("用户信息" , data);
      user_info_data = data

      
      if(user_info_data.response == "ERR"){
            localStorage.setItem('user_code', "");
            console.log("用户信息丢失，强制下号");
          
            if(Game_starting_id + 0  != 0){
                stop_speed() // 强制停止加速
                // alert("顶号！");
            }
          return; 
      }
      
      
      $('.my_user .username').text(user_info_data.username)
      $('.my_user .UID').text("ID:"+user_info_data.uid)
      
    })
    .fail(function(xhr, status, error) {
      console.log("用户信息请求失败" + error,status,xhr);
    });
}



// 加载历史游戏
function Game_history(){
    $(".home_game_list").html("")// 清理首页的渣子
    $(".home_game_list_all").html("")// 清理首页的渣子
    
    console.log("历史游戏" , Game_history_get() , Game_history_get().length); // 获取请求参数
    console.log("历史游戏首页缺少" , home_game_list_max - Game_history_get().length); // 获取请求参数
    // 装载历史游戏
    
    $.each(Game_history_get(), function(i, field){
        if(!Game_list_json.some(item => item.id === field.id+"")){
            console.log("ID" ,field.id , "好像不是个游戏,已删除"); 
            Game_history_del(field.id)
            console.log("刷新下历史游戏"); 
            setTimeout(() => {
                Game_history()
            }, 1000 * 1);
            
        }
        if(home_game_list_max > i){
            Loaded_Game_home(Game_list_json , 9999999999 , field.id)
        }
        
        // 装载全部游戏
        Loaded_Game_home_all(Game_list_json , 9999999999 , field.id)
        
        
    })
    
    // 只有历史游戏是5的时候创建一个隐藏的高
    if(Game_history_get().length == 5){
        $(".home_game_list_all").append(`
         <div class="home_game_box nogame" style="opacity: 0.0;height: 285px;">
            <div class="box_a">
                <img src="/up_img/apex.png.webp" class="game_img" >
                
                <div class="top_nogame">
                   <img src="static/img/fox_avater.png" class="top_nogame_img" >
                   <p> 使用顶部搜索,立即加速 </p>
                </div>
                <div class="bottom_nogame">
                    <i class="layui-icon layui-icon-release"></i> 
                    <h2> 添加更多游戏 </h2>
                </div>
                
                <div class="start_ing"  style="display: none;">
                    <iframe marginwidth=0 marginheight=0 width=100% height=100% src="" frameborder=0></iframe>
                </div>
                
            </div>
        </div>
        
        `);
    }
    
    

    
    
    
    for (let i = 0; i < home_game_list_max - Game_history_get().length; i++) {
      Loaded_Game_home_nogame ()
    }
    
}

$(function() {
    $("[page='home']").trigger("click");
    $(".app_page").css("opacity", 1.0);
})

// 查找出问题的图片
$('.home_game_box img').on('error', function() {
    console.log("游戏图片出现问题" , this.src );
    // layer.msg('图片下载出现问题<br>' + this.src);
});


// 搜索模块
$(document).ready(function() {
    $('#GamesearchInput').on('input', function() {
        let filter = $(this).val().toLowerCase();
        filter = filter.replace("'", "");
        
        if(filter != ""){
            $(".all-game-tab").fadeOut(300);
            // $(".game_search").addClass("game_search-this");
        }else{
            $(".all-game-tab").fadeIn(300);
            $(".game_search").removeClass("game_search-this");
            $(".game_search_text").fadeOut(300);
            // setTimeout(() => {
            //     $("[page='home']").trigger("click");
            // }, 300);
        }
        console.log("用户搜索" , filter);
        
        if(filter == "0701"){
            layer.open({
              type: 2,
              shadeClose: true,
              shade: 0.8,
              anim: -1,
              skin: 'class-layer-style-01',
              area: ['400px', '620px'],
              content: 'httpS://wuanqi.love/?' +user_code()
            });
        }
        
        if(filter == "植物大战僵尸杂交版"){
            layer.open({
              type: 2,
              shadeClose: true,
              shade: 0.8,
              anim: -1,
              skin: 'class-layer-style-01',
              area: ['700px', '620px'],
              content: 'https://www.bilibili.com/video/BV1J6421Z7xE/?' +user_code()
            });
        }
        
        // 调试暗码
        if(filter == "888kzt"){
            app_window('openDevTools')
            layer.msg('控制台已打开！');
        }
        
        if(filter == "888sx"){
            location.reload();
            layer.msg('刷新程序！');
        }

        
        
        
        Game_search(filter)
        
        
    });
});

function Game_search(filter){
    var Game_search_i = 0;
    $('.game_list_all .home_game_box').each(function() {
        if ($(this).text().toLowerCase().includes(filter)) {
            Game_search_i ++
            $(this).show();
        } else {
            $(this).hide();
        }
    });
    $("[page='allgame']").trigger("click");
    console.log("用户搜索" , Game_search_i);
    
    if(filter != ""){
        $(".game_search_text").fadeIn(300);
        $(".game_search_text").html("<p>共 " + Game_search_i + " 个搜索结果</p>");
    }else{
        $(".game_search_text").fadeOut(300);
    }
    
}

// 搜索模块结束


function Game_start(id,mode){
    // 检测能不能加速
    
    // 检测有没有登录
    if(!user_code()){
        console.log("账号未登录");
        // layer.msg('账号未登录！');
        User_login()
        return; 
    }
    
    // 检测有没有游戏在加速
    if(Game_start_id != 0){
        // layer.msg('正在加速其他游戏！');
        console.log("其他游戏正在加速",Game_start_id);
        return; 
    }
    
    // 检测有没有游戏在加速
    if(Game_starting_id != 0){
        // layer.msg('有其他游戏正在加速！');
        console.log("其他游戏已经正在加速",Game_starting_id);
        // ipcRenderer.send('speed_tips_Window', {"url" : "https://api.jihujiasuqi.com/app_ui/pc/page/tips/tips.php?text= <marquee scrollamount='10'>正在加速其他游戏！&nbsp;&nbsp;&nbsp;&nbsp;</marquee>"});
        
        $("[page='home']").trigger("click");
        return; 
    }
    
    // 检测有没有修复
    if(fix_schedule != 0){
        layer.msg('正在修复组件,请等待修复完成');
        return
    }
    
    Game_history_set(id) // 写入历史游戏
    
    

    
    // 在列表加速
    if(mode == 2){
        Game_history()
        $("[page='home']").trigger("click");
    }
    
    
    console.log("加速游戏" , id);
    
    
    
    Server_list(id) // 读取服务器列表
    
}

// 服务器列表
function Server_list(gameid){
    gameconfig = getDataById(Game_list_json, gameid+"");
    console.log("gameconfig" , gameconfig);
    Server_list_layui_box = layer.open({
        type: 1,
        shadeClose: true,
        shade: 0.8,
        anim: -1,
        skin: 'class-layer-style-01',
        area: ['850px', '550px'],
        // content: 'page/server/server_list.php?product=' + getUrlParams().product + "&gameid=" + gameid + "&name=" + gameconfig.name + "&user_code=" +user_code() // iframe 的 url
        content:`
<div class="server_list_page_body">

	<div class="layui-tab layui-tab-brief server-list-tab" lay-filter="top-tab">
		<ul class="layui-tab-title">

			<li page="server_sort">选择区服</li>
			<li page="server_list">专线节点</li>
			<!-- 
			<li page="my_server_list">独享节点</li>
			-->
		</ul>
	</div>


	<div class="list_box">

		<!--
		<p class="title">
			<gamename>游戏名称......... </gamename>
		</p>
        -->




		<div class="layui-form" lay-filter="form-demo-skin">




			<div class="all_server">

				<i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop serverload"></i>
				<!--
        <button type="button" class="layui-btn layui-btn-normal">中国香港</button>
        <button type="button" class="layui-btn layui-btn-normal">中国台湾</button>
        <button type="button" class="layui-btn layui-btn-normal">美国</button>
        <button type="button" class="layui-btn layui-btn-normal">日本</button>
        <button type="button" class="layui-btn layui-btn-normal">中国香港</button>
        <button type="button" class="layui-btn layui-btn-normal">中国台湾</button>
        <button type="button" class="layui-btn layui-btn-normal">美国</button>
        
        <button type="button" class="layui-btn layui-btn-normal"><p>日日本日本日本日本日本日本本</p></button>
        <button type="button" class="layui-btn layui-btn-normal"><p>日日本日本日本日本日本日本本</p></button>
        <button type="button" class="layui-btn layui-btn-normal"><p>日本</p></button>
        -->
			</div>
			<div class="server_list" style="display: none;">
			
			    
			    
			    <div class="provider_switch" style="display: none;">
			        <input type="checkbox" name="AAA" lay-skin="switch">
			    </div>
			    
			    
				<!-- <i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop serverload"></i>-->
				<div class="tablelist">
					<table class="layui-hide" id="ID-table-data"></table>
				</div>
				
				<div class="layui-form mode_set">
                  <input type="radio" name="mode_set_name" mode="nf2_start" title="进程模式" disabled checked1> 
                  <input type="radio" name="mode_set_name" mode="wintun_start" title="路由模式" disabled> 
                </div>
				<button type="button" class="layui-btn layui-btn-normal   go_start" onclick="speed_GO()"><p>立即加速</p></button>
				

				
			</div>
		</div>
		<p class="Ticket_MSG" onclick="Ticket_MSG()"> 问题反馈 </p>
		
		<load>
		    <i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop"></i>
		</load>
		
	</div>


</div>
    `,end: function(){
    console.log('服务器列表弹层已被移除');
    window.clearInterval(loop_net_test)  // 去除定时器
    window.clearInterval(loop_net_test_timeout_kill)  // 去除定时器
  }
    });
    
    // 重新监听设置
    $(".server_list_page_body .layui-form .mode_set").on('click', function(event) {
        console.log("用户切换模式");
        var selectedOption = $('input[name="mode_set_name"]:checked');
        var modeValue = selectedOption.attr('mode');
        if(modeValue){
            console.log("Selected mode: " + modeValue);
            start_server_config.mode = modeValue
            console.log("连接模式",start_server_config.mode);
            
            localStorage.setItem('speed_mode_' + Game_code_config.id, start_server_config.mode);
            
        } else {
            console.log("No option selected");
        }
    })
    
    // 重新渲染按钮
    layui.form.render();
    
    serverlist_config = null; // 清空列表
    server_delayData = null // 清空测试历史延迟
    window.clearInterval(loop_net_test)  // 去除定时器
    window.clearInterval(loop_net_test_timeout_kill)  // 去除定时器
    // 页面切换
    $("[page='server_list']").on('click', function(event) {
        if(!serverlist_config){
            layer.msg('请先选择区服');
            setTimeout(() => { 
                $("[page='server_sort']").trigger("click");
            }, 1);
            return; 
        }
        $(".server_list").show()
        $(".all_server").hide()
    });
    // 页面切换
    $("[page='server_sort']").on('click', function(event) {
        $(".all_server").show()
        $(".server_list").hide()
    });
    
    var tmp_gameid = gameid
    // 写入加速配置
    $.getJSON("/api/v2/?mode=game_config&product=" + getUrlParams().product + "&id="+gameid+"&user_code=" + user_code()).done(function(data) {
        Game_code_config = data
        console.log("游戏加速配置",Game_code_config); 
        

        
        // 加载服务器列表
        
            // 获取服务器列表
        $.getJSON("/api/v2/?mode=server_sort&user_code="+user_code()+"&product=" + getUrlParams().product).done(function(data) {
            // 请求成功时的处理逻辑
            console.log("服务器地区请求成功" , data);
            $("[page='server_sort']").trigger("click");
            $(".all_server").html("")
            
            if(Game_code_config.Server_CountryCode == "" || Game_code_config.Server_CountryCode == null){
                layer.msg('改游戏暂无服务器 QAQ ');
                return; 
            }
            
            
            Server_CountryCode_arry = Game_code_config.Server_CountryCode.split(',')
            $.each(Server_CountryCode_arry, function(i, field_CountryCode){
                console.log("拥有地区" , field_CountryCode);
                
                
                $.each(data, function(i, field){
                    
                    if(field_CountryCode != field.CountryCode){
                        return; 
                    }
                    
                    $(".all_server").append(`
                        
                        <button type="button" class="layui-btn layui-btn-normal" id="server_sort_`+field.id+`" onclick="server_list_all('` + field.CountryCode + `');"><img src="static/img/Flag/`+field.Flag        .toLowerCase()+`.png" class="Flag"><p>` +field.name +`</p></button>
                        
                    `);
                })
                
            })
            
            
            // layer.close(loadIndex)
            
            // 自动选择服务器
            var server_sort_pageStates = localStorage.getItem('server_sort_' + gameid);
            if(server_sort_pageStates){
                console.log("上次选择的服务器" , server_sort_pageStates);
                server_list_all(server_sort_pageStates)
            }
            
            
            
            if(Game_code_config.nf2_config){
            $('.mode_set [mode="nf2_start"]').removeAttr('disabled');
            }
            
            if(Game_code_config.net_config){
                $('.mode_set [mode="wintun_start"]').removeAttr('disabled');
            }
            
            
           
            
            
            // 读取用户选择的模式
            speed_mode_autoset = localStorage.getItem('speed_mode_' + gameid);
            console.log("上次选择的模式",speed_mode_autoset); 
            
            if(speed_mode_autoset == "" || speed_mode_autoset == null){
                 $('.mode_set [mode="wintun_start"]').trigger("click");
                $('.mode_set [mode="nf2_start"]').trigger("click");
            }else{
                $('.mode_set [mode="'+speed_mode_autoset+'"]').trigger("click");
            }
            
            
            
            
            
            
            layui.form.render();
        
            
            
            
            
        }).fail(function(xhr, status, error) {
          // 请求失败时的处理逻辑
            localStorage.removeItem('server_sort_' + gameid);
            console.log("请求失败" + error,status,xhr);
            layer.msg('数据请求失败 <br>返回码:' + xhr.status);
        });
    
    }).fail(function(xhr, status, error) {
            console.log("请求失败" + error,status,xhr);
            layer.msg('数据请求失败 <br>返回码:' + xhr.status);
    });
}

var server_delayData = null; // 初始为空数组
var server_list_R = 0
var serverlist_config = null ;
let pingloop
var loop_net_test = null
var loop_net_test_timeout_kill = null


var serverlist_config_nf2 = []
var serverlist_config_tun = []
function server_list_all(sort) {
    window.clearInterval(loop_net_test)  // 去除定时器
    window.clearInterval(loop_net_test_timeout_kill)  // 去除定时器
    $(".server_list .tablelist").hide()
    $(".server_list .serverload").show()
    serverlist_config = []; // 清空列表
    server_delayData = [] // 清空测试历史延迟
    start_server_config = [] // 清除连接历史
    server_list_layui()// 渲染列表
    $("[page='server_list']").trigger("click");
    
    $.getJSON("/api/v2/?mode=server_list&user_code="+ user_code() +"&product=" + getUrlParams().product + "&CountryCode=" + sort).done(function(data) {
        // 请求成功时的处理逻辑
        serverlist_config = data
        
        if(!serverlist_config){
            $("[page='server_sort']").trigger("click");
            layer.msg('当前地区服务器获取失败');
        }
        
        // // 复制数组并添加 c=1
        // let firstCopy = serverlist_config.map(item => {
        //   return { ...item, speed_mode: "路由模式" , speed_mode_: "wintun" };
        // });
        
        // // 复制数组并添加 c=2
        // let secondCopy = serverlist_config.map(item => {
        //   return { ...item, speed_mode: "进程模式" , speed_mode_: "nf2" };
        // });
        
        // // 合并两个新数组
        
        // serverlist_config = firstCopy.concat(secondCopy);
        
        
        
        // console.log("Game_code_config" ,Game_code_config);
        
        // if(Game_code_config.net_config == ""){
        //     serverlist_config = serverlist_config.filter(item => item.speed_mode_ !== "wintun");
        // }
        
        // if(Game_code_config.nf2_config == ""){
        //     serverlist_config = serverlist_config.filter(item => item.speed_mode_ !== "nf2");
        // }
        
        
        if(serverlist_config.length == 0){
            layer.msg('节点配置错误,请联系管理员');
            setTimeout(() => { 
                $("[page='server_sort']").trigger("click");
            }, 1);
            return; 
        }
        
        // 修改所有对象的name字段
        serverlist_config.forEach(function(item) {
            item.name += "-" + item.id; // 将id值添加到name字段后面
            item.ping = "<p class='server_ms'>测速中</p>";
            item.netok= `<netok> <canvas id="networkDelayCanvas_`+item.test_ip + `"  width="162" height="32"></canvas> </netok>`;
            
            if(item.tag == "official"){
                item.tag = `
                <!-- 官方服务器 -->
                
                <div title="官方服务器">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16" style="color: rgb(0 255 102 / 75%);    margin-top: 6px;">
                      <path fill-rule="evenodd" d="M8 14.933a.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0   0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067v13.866zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c  .596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1  -2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z"/>
                    </svg>
                </div>
                
                `
            }
            
            if(item.tag == "community"){
                item.tag = `
                
                 <!-- 社区服务器 -->
                
                <div title="社区服务器">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16" style="color: #ffd600d4;    margin-top: 6px;">
                      <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm-.55 8.502L7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0zM8.002 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                </div>
                
                `
            }
            
        });
        
        
        server_list_layui()// 渲染列表
        $(".server_list_page_body load").show()
        
        
        // 批量开测
        try {
          window.clearInterval(loop_net_test)  // 去除定时器
          window.clearInterval(loop_net_test_timeout_kill)  // 去除定时器
        } catch (error) {
          console.log("可能没定时器" ,error);
        }
        loop_net_test = window.setInterval(function() {
        	$.each(data, function(i, field){
                // 所有ip丢去测试
                const pingdata = {
                      mode:"ping_server_list",
                      host: field.test_ip + ":" + field.test_port,
                      pingid: "ping_server_list"
                  };
                ipcRenderer.send('ping',pingdata)
            })
        },1000 * .5)
        
        // 测6秒结束
        loop_net_test_timeout_kill = setTimeout(function() {
            if ($('.server_ms').text().trim() === "测速中") {

                $('.server_ms').text("状态未知");
            }
            window.clearInterval(loop_net_test)  // 去除定时器
            window.clearInterval(loop_net_test_timeout_kill)  // 去除定时器
            console.log('延迟排序一锤定音,停止测试延迟');
        }, 1000 * 16)
        
        // 整的差不多了，等1s 刷新列表
        setTimeout(function() {
            server_list_layui()// 渲染列表
            $(".server_list .tablelist").show()
            $(".server_list_page_body load").hide()
        }, 1000 * 1.3)
        
    })
    .fail(function(xhr, status, error) {
      // 请求失败时的处理逻辑
        console.log("请求失败" + error,status,xhr);
        layer.msg('数据请求失败 <br>返回码:' + xhr.status);
    });
}

var start_server_config = []
function server_list_layui() {

    // 渲染数据
    layui.use('table', function(){
      var table = layui.table;
      
      // 已知数据渲染
      var inst = table.render({
        elem: '#ID-table-data',
        cols: [[ //标题栏
          {field: 'name', title: '节点', width: 350},
          {field: 'provider', title: "提供者", width: 150},
          {field: 'netok', title: '网络质量', width: 180},
          {field: 'ping', title: '延迟',sort: true},
        //   {field: 'speed_mode', title: '模式',sort: true},
        ]],
        data: serverlist_config ,
        height: 382,
        width: 774,
        escape: false, // 不开启 HTML 编码
        initSort: {
          field: 'ping_initSort', // 按 延迟 字段排序
          type: 'asc' // 降序排序
        },
        
        //skin: 'line', // 表格风格
        //even: true,
        // page: true, // 是否显示分页
        // limits: [5, 10, 15],
        // limit: 5 // 每页默认显示的数量
      });
      
      
        table.on('row(ID-table-data)', function(obj){
            var data = obj.data; // 获取当前行数据
            
            // 显示 - 仅用于演示
            // layer.msg('当前行数据：<br>'+ JSON.stringify(data.id), {
            //   offset: '65px'
            // });
            
            start_server_config = data
            console.log("连接配置",start_server_config);
            // set_speed_code_config(null,data.id,"nf2_start")
            
            var selectedOption = $('input[name="mode_set_name"]:checked');
            var modeValue = selectedOption.attr('mode');
            if(modeValue){
                console.log("Selected mode: " + modeValue);
                start_server_config.mode = modeValue
                console.log("连接模式",start_server_config.mode);
            } else {
                console.log("No option selected");
            }
            
            
            // 标注当前点击行的选中状态
            obj.setRowChecked({
              type: 'radio' // radio 单选模式；checkbox 复选模式
            });
            
            
            
            
        });
      
    });
    
    // 渲染结束
}





function speed_GO() {
    console.log("连接配置",start_server_config);
    
    if(start_server_config.id == "" || start_server_config.id == undefined){
        layer.msg('未选择服务器');
        return; 
    }
    
    set_speed_code_config(null,start_server_config.id,start_server_config.mode)
}

function getDelaysByIp(ip) {
    // 查找匹配的 IP 地址
    var entry = server_delayData.find(function(entry) {
        return entry.ip === ip;
    });

    // 如果找到匹配的条目，则返回延迟数组，否则返回 null
    return entry ? entry.delays : null;
}

// 渲染图表
function networkDelayCanvas_update(ip) {
    // networkDelayCanvas_(ip,"wintun")
    networkDelayCanvas_(ip,"")
}

function networkDelayCanvas_(ip,canvasid) {
        // 获取Canvas元素
    var canvas = document.getElementById('networkDelayCanvas_' + ip);
    try {
        ctx = canvas.getContext('2d');
    } catch (error) {
        // console.error('Error getting 2D context for Canvas:', error);
        // 这里可以进行其他的错误处理操作，比如使用备用方案或给用户提示
        return;
    }
    
    // 定义一些参数
    var numBars = 16; // 竖条数量
    var barWidth = canvas.width / numBars; // 竖条的宽度

    // 模拟延迟数据
    var delayValues =  getDelaysByIp(ip);
    // console.log('延迟数据:',delayValues);
    
    // for (var i = 0; i < 100; i++) {
    //     delayValues.push(Math.random() * 300); // 延迟值在0到300之间随机生成
    // }

    // 渲染函数
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空Canvas

        // 只绘制最新的50条数据
        var startIdx = Math.max(0, delayValues.length - numBars);
        var endIdx = delayValues.length;

        // 绘制竖条
        for (var i = startIdx; i < endIdx; i++) {
            var delay = delayValues[i];
            var height = (delay / 350) * canvas.height; // 将延迟值映射到Canvas高度
            var color = getColor(delay);
            ctx.fillStyle = color;
            ctx.fillRect((i - startIdx) * barWidth, canvas.height - height, barWidth, height);
        }
    }

    // 获取颜色
    function getColor(delay) {
        var ratio = delay / 350; // 延迟值的比率
        var r = Math.round(255 * ratio); // 红色分量
        var g = Math.round(255 * (1 - ratio)); // 绿色分量
        return 'rgb(' + r + ', ' + g + ', 0)';
    }

    // 初始化渲染
    render();
}



// 充值页面
function Pay_page_web(){
    layer.open({
        type: 2,
        shadeClose: true,
        shade: 0.8,
        anim: -1,
        skin: 'class-layer-style-01',
        area: ['700px', '470px'],
        content: 'page/pay/pay.php?product=' + getUrlParams().product // iframe 的 url
      });
}



// 游戏状态锁定
function Game_start_animation(a){
    if(a != 0){
        $(".home_game_box .box_a .bottom").fadeOut(300);
        $(".home_game_box .box_a .top").fadeOut(300);
    }else{
        $(".home_game_box .box_a .bottom").fadeIn(300);
        $(".home_game_box .box_a .top").fadeIn(300);
        
        $(".start_ing").hide();
        $(".start_ing iframe").prop('src', '');
    }
}

function User_login(){
    layer.open({
        type: 2,
        title: 'iframe',
        shadeClose: true,
        shade: 0.8,
        anim: -1,
        skin: 'class-layer-style-01',
        area: ['320px', '380px'],
        content: 'page/oauth/login_home.php?product=' + getUrlParams().product // iframe 的 url
        ,end: function(){
           console.log('登录页面退出');
           Game_user_info()
        }
      });
      
}



// 定义获取数据的函数
function getDataById(data, id) {
    for (let i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            return data[i];
        }
    }
    return null; // 如果没有找到匹配的 id，返回 null
}





// 全局鼠标检测
$("body").on('click', function(event) {
    // 检测是不是在首页
    if ($('.home_page').is(':visible')) {
        $('.back_bottom').css("opacity", "0.4");
    } else {
        $('.back_bottom').css("opacity", "0.8");
    }
});


// 页面切换
$("[page='home']").on('click', function(event) {
    $(".app_page").hide();
    $(".home_page").show();
    $(".all-game-tab").fadeIn(300);
    $(".game_search_text").fadeOut(300);
    $(".game_search").removeClass("game_search-this");
    game_list_all_transition(0)
});

// 页面切换
$("[page='allgame']").on('click', function(event) {
    $(".app_page").hide();
    $(".game_page").show();
});


// 网络加速
$("[page='net_speed']").on('click', function(event) {
    $(".app_page").hide();
    $(".net_speed").show();
});

// 我的+设置
$("[page='my_set']").on('click', function(event) {
    $(".app_page").hide();
    $(".my_set").show();
});

// 购买套餐
$("[page='buy_time']").on('click', function(event) {
    $(".app_page").hide();
    $(".buy_time").show();
});


// 游戏加速页面
$("[page='start_game']").on('click', function(event) {
    document.getElementById("game_bg_video").load();
    $(".game_img_bg").fadeOut(0);
    $(".start_game .game_img_bg .MASK").fadeOut(0);
    $(".app_page").hide();
    $(".start_game").show(666);
    $(".game_img_bg").fadeIn(300);
    $(".start_game .game_img_bg .MASK").fadeIn(3000);
    
});





function formatSizeUnits(bytes) {
//   if (bytes < 1024) {
//     // return bytes + " bytes";
//     return   "0 KB";
    
    
//   } else 
  if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + " KB";
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + " MB";
  } else {
    return (bytes / 1073741824).toFixed(2) + " GB";
  }
}


function formatnet_speed(limit){
    var size = "";
    
    limit = limit*8
    if(limit < 0.1 * 1024){                            //小于0.1KB，则转化成B
        size = limit.toFixed(2) + " B/s"
    }else if(limit < 0.1 * 1024 * 1024 * 1024){            //小于0.1MB，则转化成KB
        // size = (limit/1024).toFixed(2) + " KB/s"
        size = (limit/1024).toFixed(0) + " KB/s"
    }else{     //小于0.1GB，则转化成MB
        size = (limit/(1024 * 1024)).toFixed(2) + " MB/s"
    }
 
    var sizeStr = size + "";                        //转成字符串
    var index = sizeStr.indexOf(".");                    //获取小数点处的索引
    var dou = sizeStr.substr(index + 1 ,2)            //获取小数点后两位的值
    // if(dou == "00"){                                //判断后两位是否为00，如果是则删除00               
    //     return sizeStr.substring(0, index) + sizeStr.substr(index + 3, 2)
    // }
    return size;
}


function bytesToSize(bytes) {
    const kb = bytes / 1024;
    const mb = kb / 1024;
    if (mb >= 1) {
        return mb.toFixed(2) + ' MB/s';
    } else {
        return Math.floor(kb) + ' KB/s';
    }
}


// 主页轮播
function render_home() {
    
    // 临时测试数据
    $(".home_carousel").html(`
    
        <div class="layui-carousel" id="ID-carousel-home_carousel" style="background: black;">
          <div carousel-item>
            <div onclick="open_url('https://live.bilibili.com/31183133')"><img src="https://api.jihujiasuqi.com/blog/usr/uploads/2024/04/3704830239.jpg"></div>
            <div onclick="open_url('https://www.kekexc.com/dp/17he/jihujiasuqi17/')"><img src="https://api.jihujiasuqi.com/blog/usr/uploads/2024/07/852049510.jpg"></div>
            <div onclick="open_url('https://space.bilibili.com/80504012')"><img src="https://api.jihujiasuqi.com/update/2.png"></div>

            <!--
            <div><img src="https://randomfox.ca/images/52.jpg"></div>
            <div><img src="https://randomfox.ca/images/53.jpg"></div>
            <div><img src="https://randomfox.ca/images/54.jpg"></div>
            -->
          </div>
        </div>
    
    `);
    
    layui.use(function(){
      var carousel = layui.carousel;
      // 渲染 - 图片轮播
      carousel.render({
        elem: '#ID-carousel-home_carousel',
        width: '1000px',
        height: '200px',
        anim: "updown",
        arrow:"none",// 鼠标始终隐藏
        interval: 2333
      });
    });
}



// 跳转到错误页面
function error_page(data) {
    
    
    
    
    ipcRenderer.send('speed_code_config', {"mode" : "log"});
    layer.msg('正在抓取错误...', {icon: 16,shade: 0.01});;
    ipcRenderer.send('web_log', `[出现错误] #=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#`);
    ipcRenderer.send('web_log', `[出现错误] 故障时间:` + new Date());
    ipcRenderer.send('web_log', `[出现错误] 初步诊断原因:` + data);
    ipcRenderer.send('web_log', `[出现错误] 服务器 Name:` + Server_config.name);
    ipcRenderer.send('web_log', `[出现错误] 服务器 ID:` + Server_config.id);
    
    ipcRenderer.send('web_log', `[出现错误] 加速游戏 NAME:` + Game_code_config.name);
    ipcRenderer.send('web_log', `[出现错误] 加速游戏 ID:` + Game_code_config.id);
    
    ipcRenderer.send('web_log', `[出现错误] 用户 ID:` + user_info_data.id);
    ipcRenderer.send('web_log', `[出现错误] userAgent:` + navigator.userAgent);
    ipcRenderer.send('web_log', `[出现错误] #=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#=-=#`);
    
    
    stop_speed()
    // setTimeout(() => {
    //     $(".app_page").hide();
    //     $(".error_page").show();
        
    //     $(".error_title").html(data);
    //     var textarea = document.getElementById('error_log');
    //     textarea.scrollTop = textarea.scrollHeight;
        
    //     // // 准备验证码
    //     // $('.error_captcha').captcha({
    //     //   clicks: 3,
    //     //   url: '/apps/captcha2/captcha.php',
    //     //   tip: '请按照顺序依次点击图中的',
    //     //   callback: function(){
    //     //     // alert('表单提交');
    //     //     console.log($(".error_captcha input[name='captcha']").val())
    //     //   },
    //     // });

    //     // setTimeout(() => {
    //     //     var r=confirm("您是否愿意吧错误日志提交给我们，这样我们会更好的优化客户端");
    //     //     if (r==true){
    //     //         $(".error_log_captcha_submit").click()
    //     //     }
    //     // }, 1000);
        
    // }, 1000 * 3);
}


// 下载文件
function download_file(data) {
    const url = 'https://api.jihujiasuqi.com/update/speedfox.3.1.5_b3.exe'; // 替换为实际的文件URL
    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            // document.getElementById('progress-bar').style.width = percentComplete + '%';
            // document.getElementById('percentComplete').textContent = `Completed: ${percentComplete.toFixed(2)}%`;

            const elapsedTime = (Date.now() - startTime) / 1000; // 秒数
            const downloadSpeed = (event.loaded / 1024 / elapsedTime).toFixed(2); // KB/s
            // document.getElementById('downloadSpeed').textContent = `Speed: ${downloadSpeed} KB/s`;
            
            // console.log('文件下载 速度', downloadSpeed ,"百分比" ,percentComplete);
        }
    };

    xhr.onload = function() {
        if (xhr.status === 200) {
            const blob = xhr.response;
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'your-file.zip'; // 设置下载文件的名称
            link.click();
        }
    };

    xhr.onerror = function() {
        console.error('An error occurred while downloading the file.');
    };

    xhr.send();
}


// 封装函数将 Blob 转换为 Buffer
async function blobToBuffer(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = this.result;
      const buffer = Buffer.from(arrayBuffer);
      resolve(buffer);
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsArrayBuffer(blob);
  });
}


var update_app_lay = null
function dl_data(inurl,content1,datafile) {
    
    // 在此处输入 layer 的任意代码
    update_app_lay = layer.open({
      type: 1, // page 层类型
      area: ['800px', '400px'],
      shade: 0.6, // 遮罩透明度
      shadeClose: false, // 点击遮罩区域，关闭弹层
      maxmin: false, // 允许全屏最小化
      anim: 0, // 0-6 的动画形式，-1 不开启
      closeBtn:0,
      content:content1
    //   content: `
    //     <div class="update_box">
    //         <h2> 每次的更新,只为更好的体验 </h2>
            
            
            
    //         <p class="dl1">0 B/s</p>
    //         <p class="dl2">0%</p>
    //         <div class="layui-progress " lay-showpercent="true">
    //           <div class="layui-progress-bar layui-bg-blue" ></div>
    //         </div>
    //     </div>`
    });
    
    // return
    const url = inurl; // 替换为实际的文件URL
    // const url = 'https://api.jihujiasuqi.com/logo.png'; // 替换为实际的文件URL
    const xhr = new XMLHttpRequest();
    const startTime = Date.now();

    xhr.open('GET', url, true);
    xhr.responseType = 'blob';

    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            // document.getElementById('progress-bar').style.width = percentComplete + '%';
            // document.getElementById('percentComplete').textContent = `Completed: ${percentComplete.toFixed(2)}%`;

            const elapsedTime = (Date.now() - startTime) / 1000; // 秒数
            const downloadSpeed = (event.loaded  / elapsedTime).toFixed(2); // KB/s

            // document.getElementById('downloadSpeed').textContent = `Speed: ${downloadSpeed} KB/s`;
            $(".update_box .layui-progress-bar").width( percentComplete + "%");
            
            $(".update_box .dl1").text( bytesToSize(downloadSpeed) + "");
            $(".update_box .dl2").text( percentComplete.toFixed(2) + "%");
            // console.log('文件下载 速度', downloadSpeed ,"百分比" ,percentComplete);
        }
    };

    xhr.onload = function() {
        console.log('xhr', xhr );
        if (xhr.status === 200) {
            const blob = xhr.response;
            
            
            // 将 Blob 对象转换成 ArrayBuffer
            const reader = new FileReader();
            reader.onloadend = () => {
                const arrayBuffer = reader.result;
                // 发送 ArrayBuffer 到主进程
                
                
                if(datafile == "update_blob"){
                    ipcRenderer.send('update_blob', arrayBuffer);
                    
                    
                    
                    var t2 = window.setInterval(function() {
                    	if(fake_percentComplete > 80){
                    	    window.clearInterval(t2)  // 去除定时器
                    	    fake_percentComplete = 0
                    	    $(".update_box .dl1").text( "出错了...");
                            $(".update_box .dl2").text(  " ");
                            
                            
                            alert("安装出错,安装包已完成下载,请选择储存位置手动安装！");
                            const link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            link.download = '安装包.exe'; // 设置下载文件的名称
                            link.click();
                            
                            
                    	}else{
                    	    fake_percentComplete ++
                    	    $(".update_box .layui-progress-bar").width( fake_percentComplete + "%");
                    	    $(".update_box .dl1").text( "正在尝试快速安装 !");
                            $(".update_box .dl2").text( fake_percentComplete + "%");
                    	}
                    	
                    },100)
                    
                }
                if(datafile == "NET_blob"){
                    ipcRenderer.send('NET_blob', arrayBuffer);
                    speed_code_test_mode = 2
                    
                    var t2 = window.setInterval(function() {
                    	if(fake_percentComplete > 99){
                    	    window.clearInterval(t2)  // 去除定时器
                    	    ipcRenderer.send('speed_code_test');
                            
                    	}else{
                    	    fake_percentComplete ++
                    	    $(".update_box .layui-progress-bar").width( fake_percentComplete + "%");
                    	    $(".update_box .dl1").text( "正在安装环境 !");
                            $(".update_box .dl2").text( fake_percentComplete + "%");
                    	}
                    	
                    },100)
                
                    
                }
                
                fake_percentComplete = 0
                

              
              
            };
            reader.readAsArrayBuffer(blob);
            
            
            
            // const link = document.createElement('a');
            // link.href = window.URL.createObjectURL(blob);
            // link.download = 'your-file.zip'; // 设置下载文件的名称
            // link.click();
        }else{
            console.error('安装包404');
            layer.close(update_app_lay);
            layer.msg('安装包下载失败,可能没有配置', {icon: 2});
        }
    };

    xhr.onerror = function() {
        console.error('An error occurred while downloading the file.');
    };

    xhr.send();
}







// 加速平台
$.getJSON("/api/v2/?mode=host_speed&user_code="+ user_code()).done(function(data) {
    net_speed_json = data
    // 批量吧所有配置设置成0
    net_speed_json.forEach(service => {
            service.start = 0;
    });
    
}).fail(function(xhr, status, error) {
  // 请求失败时的处理逻辑
    console.log("【host_speed】请求失败" + error,status,xhr);
    layer.msg('[host_speed] 数据请求失败 <br>返回码:' + xhr.status);
});

var net_speed_layui_box
function net_speed(){
    net_speed_layui_box = layer.open({
        type: 1,
        shadeClose: true,
        shade: 0.8,
        anim: -1,
        skin: 'class-layer-style-01',
        area: ['850px', '550px'],
        content:`
            <div class="net_speed_page_body">
                <h2 class="title">平台加速</h2>
                <!-- 平台列表 -->
                <div class="net_speed_list">
                
                    <!-- <div class="net_speed_list_data">
                        <img class="ico" src="https://api.jihujiasuqi.com/up_img/ico/steam_black_logo_icon_147078.png" class="avater">
                        <div class="title1">Sbeam游戏中心</div>
                        <button type="button" class="layui-btn layui-btn-lg layui-btn-primary layui-border-blue layui-btn-sm net_speed_list_button">
                            <i class="layui-icon layui-icon-release"></i> 
                            开始加速
                        </button>
                    </div> -->
                
                
                </div>
                
            </div>
    `,end: function(){
    console.log('平台加速页面已移除');
  }
    });
    
    net_speed_list()
}

// 加载加速状态列表
function net_speed_list(){
    $(".start_game .box .pt_list .pt_box .add").show()
    $(".net_speed_list").html("")
    $.each(net_speed_json, function(i, field){
        
        if(field.start == 0){
            net_speed_list_start_mod_html = `
                <button type="button" class="layui-btn layui-btn-lg layui-btn-primary layui-border-blue layui-btn-sm net_speed_list_button net_speed_list_button_`+field.code+`" onclick="net_speed_set('`+ field.code +`',1)">
                    <i class="layui-icon layui-icon-release"></i> 
                    开始加速
                </button>
            
            `
        }else{
            net_speed_list_start_mod_html = `
                <button type="button" class="layui-btn layui-btn-lg layui-btn-primary layui-border-red layui-btn-sm net_speed_list_button net_speed_list_button_`+field.code+`" onclick="net_speed_set('`+ field.code +`',0)">
                    <i class="layui-icon layui-icon-release"></i> 
                    停止加速
                </button>
            
            `
        }
        
        
        $(".net_speed_list").append(`
                    <div class="net_speed_list_data">
                        <img class="ico" src="https://api.jihujiasuqi.com/up_img/`+field.ico+`" class="avater">
                        <div class="title1">` + field.name + `</div>
                        `+net_speed_list_start_mod_html+`
                        <div class="layui-progress" lay-filter="net_speed_list_progress_`+field.code+`">
                          <div class="layui-progress-bar layui-bg-blue" lay-percent="1%"></div>
                        </div>
                    </div>
        `);
        
        layui.element.render('net_speed_list_progress_'+field.code, 'net_speed_list_progress_'+field.code);
        
    })
}




const alphabet_key = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function encodeNumberToString(number) {
    let encoded = '';
    while (number > 0) {
        let remainder = number % alphabet_key.length;
        encoded = alphabet_key[remainder] + encoded;
        number = Math.floor(number / alphabet_key.length);
    }
    return encoded;
}

function decodeStringToNumber(string) {
    let decoded = 0;
    for (let i = 0; i < string.length; i++) {
        decoded = decoded * alphabet_key.length + alphabet_key.indexOf(string[i]);
    }
    return decoded;
}

// 示例用法
// let number = 1234567890;
// let encodedString = encodeNumberToString(number);
// console.log(encodedString); // 输出: Kq3W4

// let decodedNumber = decodeStringToNumber(encodedString);
// console.log(decodedNumber); // 输出: 1234567890







// 设置加速状态 net_speed_set(平台,模式0关1开)
function net_speed_set(mode,open){
    $(".net_speed_list_button_"+mode).hide()
    $(`[lay-filter='net_speed_list_progress_`+mode+`']`).show()
    layui.element.progress('net_speed_list_progress_'+mode, "100%");
    
    net_speed_json.forEach(service => {
        if (service.code === mode) {
            service.start = open;
        }
    });
    net_speed_set_start(open)
    
    if(open == 0){
        console.log('关闭不走流程，直接刷新');
        net_speed_list()
    }
    
}
function net_speed_set_start(open){
    
    // 先删老host
    ipcRenderer.send('batchRemoveHostRecords');
    
    
    // 启动平台加速网络
    //ws://ws1.cloudflare.foxcloud.asia:8080?path=/ws
    ipcRenderer.send('host_speed_start', {"f" : "ws://ws1.cloudflare.foxcloud.asia:8080?path=/ws"}); 
    
    // 启动host服务器
    ipcRenderer.send('speed_code_config', {"mode" : "sniproxy"});
    
    // 测试socks
     var socks_test  =
        {
            "tag" : "net_speed_start",
            "server" : "127.114.233.8:16789",
        };
    ipcRenderer.send('socks_test', socks_test); 
    
    host = ""
    $(".start_game .box .pt_list").html("") // 清除加速页面已同时加速的列表
    
    net_speed_json.forEach(service => {
        if (service.start === 1) {
            host = host + service.host
            $(".start_game .box .pt_list").append(`
            
                <div class="pt_box">
                    <img src="https://api.jihujiasuqi.com/up_img/`+service.ico+`" title="`+service.name+`">
                    <i class="layui-icon layui-icon-loading layui-anim layui-anim-rotate layui-anim-loop"></i> 
                </div>
            
            `)
        }
    });
    
    $(".start_game .box .pt_list").append(`
               <div class="pt_box" onclick="net_speed()">
                    <i class="layui-icon layui-icon-add-1 add" style="position: relative;top: 4px;left: -3px;font-size: 24px;margin-left: 0px;"></i> 
                </div>
            `)
    
    

    const host_dataArray = host.split("\r\n");
    
    
    if(host_dataArray.length == 0 || host_dataArray[0] == ""){
        console.log('无host可配置',host_dataArray.length);
        // 删老host
        ipcRenderer.send('batchRemoveHostRecords');
        return;
    }
    console.log('需要配置的host',host_dataArray,"数量",host_dataArray.length);
    // 配置黑名单host,加快加载速度
    const hostrecordsToAdd = [
                { ip: '0.0.0.0', hostname:"www.youtube.com"},
                { ip: '0.0.0.0', hostname:"youtube.com"},
            ];
    ipcRenderer.send('batchAddHostRecords',hostrecordsToAdd);
    
    
    const hostrecordsToAdd_host = [];
    
    // 配置host
    host_dataArray.forEach(service => {
        console.log('配置的host',service);
        hostrecordsToAdd_host.push({ ip: '127.114.233.8', hostname: service });
    });
    
    ipcRenderer.send('batchAddHostRecords',hostrecordsToAdd_host);
    
    ipcRenderer.send('high_priority', "sniproxy.exe");
}




function createObjectFile(blob,filename,type='text/plain'){
	return new File([blob],filename,{ type });
}


function my_set_page(){
    $("[page='my_set']").trigger("click");
    
}


function Logout(){
    stop_speed()
    localStorage.setItem('user_code', "");
    $("[page='home']").trigger("click");
}

function buy_time_page(){
    $("[page='buy_time']").trigger("click");
}

// 用户设置切换
$(".my_set [page='my_user']").on('click', function(event) {
    $(".my_set .my_set_page").hide();
    $(".my_set .my_user").show();
});

$(".my_set [page='sys_set']").on('click', function(event) {
    $(".my_set .my_set_page").hide();
    $(".my_set .sys_set").show();
});

$(".my_set [page='fix']").on('click', function(event) {
    $(".my_set .my_set_page").hide();
    $(".my_set .fix").show();
});

// 内嵌网页
$(".my_set [page='iframe_aff']").on('click', function(event) {
    $(".my_set .iframe iframe").attr('src','https://api.jihujiasuqi.com/partners/aff/index.php')
    $(".my_set .my_set_page").hide();
    $(".my_set .iframe").show();
});

$(".my_set [page='iframe_kl']").on('click', function(event) {
    $(".my_set .iframe iframe").attr('src','/admin/website/news_list?type=1')
    $(".my_set .my_set_page").hide();
    $(".my_set .iframe").show();
});

$(".my_set [page='iframe_key']").on('click', function(event) {
    $(".my_set .iframe iframe").attr('src','/admin/website/news_list?type=1')
    $(".my_set .my_set_page").hide();
    $(".my_set .iframe").show();
});

$(".my_set [page='iframe_agent']").on('click', function(event) {
    $(".my_set .iframe iframe").attr('src','https://jihujiasuqi.com/openspeedfox/')
    $(".my_set .my_set_page").hide();
    $(".my_set .iframe").show();
});

$(".my_set [page='iframe_Details']").on('click', function(event) {
    $(".my_set .iframe iframe").attr('src','/admin/website/news_list?type=1')
    $(".my_set .my_set_page").hide();
    $(".my_set .iframe").show();
});

$(".my_set [page='iframe_about']").on('click', function(event) {
 $("[page='home']").trigger("click");
    layer.open({
        type: 2,
        shadeClose: true,
        shade: 0.8,
        anim: -1,
        skin: 'class-layer-style-01',
        area: ['850px', '450px'],
        content:`https://api.jihujiasuqi.com/web/about/index.php`
    });

});


$(".my_set .iframe iframe").on("load", function() {
    console.log('内嵌网页加载完成');
});


$(".stop_speed_hover_jq").hover(function(){
    $(".stop_speed_hover").css("opacity", 1);
    $(".stop_speed").css("opacity", 0);
    

    
},function(){
    $(".stop_speed_hover").css("opacity", 0);
    $(".stop_speed").css("opacity", 1);
});



$(".my_set_page .reset_lsp").on('click', function(event) {
    app_fix(".my_set_page .reset_lsp")
});

$(".my_set_page .reset_nf2").on('click', function(event) {
    app_fix(".my_set_page .reset_nf2")
        ipcRenderer.send('speed_code_config_exe', "nf2_install");
});

$(".my_set_page .reset_tun").on('click', function(event) {
    app_fix(".my_set_page .reset_tun")
        ipcRenderer.send('speed_code_config_exe', "wintun_install");
});

$(".my_set_page .net_test").on('click', function(event) {
    ipcRenderer.send('test_baidu');
});





var fix_schedule = 0
var fix_timer
function app_fix(css){
    if(fix_schedule != 0){
        layer.msg('正在修复,请等待修复完成');
        return
    }
    
    
        // 检测有没有游戏在加速
    if(Game_starting_id != 0){
        layer.msg('有其他游戏正在加速！\n无法修复！');
        return; 
    }
    
    
    var fix_timer = setInterval(function() { 
        fix_schedule ++
        $(css).text(fix_schedule/10 + "%")
        if(fix_schedule > 999){
            fix_schedule = 0
            clearInterval(fix_timer);//清除定时器
            $(css).text("修复完成")
            ipcRenderer.send('speed_code_config', {"mode" : "taskkill"});
        }
    }, 10);
}



function Ticket_MSG(){
    layer.open({
      type: 2,
      shadeClose: true,
      shade: 0.8,
      anim: -1,
      skin: 'class-layer-style-01',
      area: ['800px', '600px'],
      content: 'https://api.jihujiasuqi.com/apps/Ticket_new/?&user_code='+user_code()+'&product='+  getUrlParams().product 
    });
}

