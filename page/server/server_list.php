<?
$debug = time();// 预防js和css缓存
?>


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>服务器列表 700*470</title>
  <!-- 请勿在项目正式环境中引用该 layui.css 地址 -->
  <link href="../../static/layui/css/layui.css" rel="stylesheet">
  <link href="../../static/css/color_map.css?V1.0" rel="stylesheet"><!-- 颜色大全 -->
  <link href="../../static/css/style.css?<?echo $debug;?>" rel="stylesheet">
</head>

  <style>
  /*
   * 基于复选框和单选框的卡片风格多选组件
   * 需要具备一些基础的 CSS 技能，以下样式均为外部自主实现。
   */
  /* 主体 */
  .layui-form-checkbox>.lay-skin-checkcard,
  .layui-form-radio>.lay-skin-checkcard {
    display: table;
    display: flex;
    padding: 12px;
    white-space: normal;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    /*color: #000;*/
    background-color: #fff;
  }
  .layui-form-checkbox>.lay-skin-checkcard>*,
  .layui-form-radio>.lay-skin-checkcard>* {
    /* display: table-cell; */  /* IE */
    vertical-align: top;
  }
  /* 悬停 */
  .layui-form-checkbox:hover>.lay-skin-checkcard,
  .layui-form-radio:hover>.lay-skin-checkcard {
    border-color: var(--brand_blue);
  }
  /* 选中 */
  .layui-form-checked>.lay-skin-checkcard,
  .layui-form-radioed[lay-skin="none"]>.lay-skin-checkcard {
    color: #fff;
    border-color: var(--brand_blue);
    background-color:#00aeec57 !important;
    /* box-shadow: 0 0 0 3px rgba(22, 183, 119, 0.08); */
  }
  /* 禁用 */
  .layui-checkbox-disabled>.lay-skin-checkcard,
  .layui-radio-disabled>.lay-skin-checkcard {
    box-shadow: none;
    border-color: #e5e5e5 !important;
    background-color: #eeeeee38 !important;
  }
  /* card 布局 */
  .lay-skin-checkcard-avatar {
    padding-right: 8px;
  }
  .lay-skin-checkcard-detail {
    overflow: hidden;
    width: 100%;
  }
  .lay-skin-checkcard-header {
    font-weight: 500;
    font-size: 18px;
    white-space: nowrap;
    margin-bottom: 4px;
  }
  .lay-skin-checkcard-description {
    font-size: 13px;
    color: #5f5f5f;
  }
  .layui-disabled  .lay-skin-checkcard-description{
    color: #c2c2c2! important;
  }
  /* 选中 dot */
  .layui-form-checked>.lay-check-dot:after,
  .layui-form-radioed>.lay-check-dot:after {
    position: absolute;
    content: "";
    top: 2px;
    right: 2px;
    width: 0;
    height: 0;
    display: inline-block;
    vertical-align: middle;
    border-width: 10px;
    border-style: dashed;
    border-color: transparent;
    border-top-left-radius: 0px;
    border-top-right-radius: 6px;
    border-bottom-right-radius: 0px;
    border-bottom-left-radius: 6px;
    border-top-color: var(--brand_blue);
    border-top-style: solid;
    border-right-color: var(--brand_blue);
    border-right-style: solid;
    overflow: hidden;
  }
  .layui-checkbox-disabled>.lay-check-dot:after,
  .layui-radio-disabled>.lay-check-dot:after {
    border-top-color: #d2d2d2;
    border-right-color: #d2d2d2;
  }
  /* 选中 dot-2 */
  .layui-form-checked>.lay-check-dot-2:before,
  .layui-form-radioed>.lay-check-dot-2:before {
    position: absolute;
    font-family: "layui-icon";
    content: "\e605";
    color: #fff;
    bottom: 4px;
    right: 3px;
    font-size: 9px;
    z-index: 12;
  }
  .layui-form-checked>.lay-check-dot-2:after,
  .layui-form-radioed>.lay-check-dot-2:after {
    position: absolute;
    content: "";
    bottom: 2px;
    right: 2px;
    width: 0;
    height: 0;
    display: inline-block;
    vertical-align: middle;
    border-width: 10px;
    border-style: dashed;
    border-color: transparent;
    border-top-left-radius: 6px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 0px;
    border-right-color: var(--brand_blue);
    border-right-style: solid;
    border-bottom-color: var(--brand_blue);
    border-bottom-style: solid;
    overflow: hidden;
  }
  .layui-checkbox-disabled>.lay-check-dot-2:before,
  .layui-radio-disabled>.lay-check-dot-2:before {
    color: #eee !important;
  }
  .layui-checkbox-disabled>.lay-check-dot-2:after,
  .layui-radio-disabled>.lay-check-dot-2:after {
    border-bottom-color: #d2d2d2;
    border-right-color: #d2d2d2;
  }
  .lay-ellipsis-multi-line {
    overflow: hidden;
    word-break: break-all;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .layui-form-radio>.lay-skin-tag,
  .layui-form-checkbox>.lay-skin-tag {
    font-size: 13px;
    border-radius: 100px;
  }
  .layui-form-checked>.lay-skin-tag,
  .layui-form-radioed>.lay-skin-tag {
    color: #fff !important;
    background-color: var(--brand_blue) !important;
  }

  /* 主体 */
  .layui-form-radio>.lay-skin-color-picker {
    border-radius: 50%;
    border-width: 1px;
    border-style: solid;
    width: 20px;
    height: 20px;
  }
  /* 选中 */
  .layui-form-radioed>.lay-skin-color-picker {
    box-shadow: 0 0 0 1px #ffffff, 0 0 0 4px currentColor;
  }
</style>
<body class="server_list_page_body" style="display: none;">

<div class="layui-tab layui-tab-brief server-list-tab" lay-filter="top-tab">
  <ul class="layui-tab-title">

    <li page="server_sort">区服</li>
    <li page="server_list">节点</li>
  </ul>
</div>


<div class="list_box">
    
    <p class="title"><gamename>游戏名称......... </gamename></p>
    
    
    
    
    
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
    <div class="server_list">
        
        <div class="layui-row layui-col-space8" style="width: 430px;position: fixed;top: 69px;transform: scale(0.63);left: 380px;">
          <div class="layui-col-xs3">
            <input type="radio" name="radio1" value="chrome" lay-skin="none" checked>
            <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 52px">
              <!--<div class="lay-skin-checkcard-avatar">-->
              <!--  <span class="layui-icon layui-icon-chrome" style="font-size: 30px"></span>-->
              <!--</div>-->
              <div class="lay-skin-checkcard-detail">
                <div class="lay-skin-checkcard-header">进程模式</div>
              </div>
            </div>
          </div>
          <div class="layui-col-xs3">
            <input type="radio" name="radio1" value="edge" lay-skin="none" disabled>
            <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 52px">
              <!--<div class="lay-skin-checkcard-avatar">-->
              <!--  <i class="layui-icon layui-icon-edge" style="font-size: 30px"></i>-->
              <!--</div>-->
              <div class="lay-skin-checkcard-detail">
                <div class="lay-skin-checkcard-header">网卡模式</div>
              </div>
            </div>
          </div>
          <div class="layui-col-xs3">
            <input type="radio" name="radio11" value="firefox" lay-skin="none" disabled>
            <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 52px">
              <!--<div class="lay-skin-checkcard-avatar">-->
              <!--  <i class="layui-icon layui-icon-firefox" style="font-size: 30px"></i>-->
              <!--</div>-->
              <div class="lay-skin-checkcard-detail">
                <div class="lay-skin-checkcard-header">混合模式</div>
              </div>
            </div>
          </div>
        </div>
        
        
        <i class="layui-icon layui-icon-loading-1 layui-anim layui-anim-rotate layui-anim-loop serverload"></i>
        <div class="tablelist">
            <table class="layui-hide" id="ID-table-data"></table>
        </div>
    </div>
    
    
    
    <!--<button type="button" class="layui-btn layui-btn-normal layui-btn-lg  go_start"><p>立即加速</p></button>-->
</div>
</div>

</body>
  
<!-- 请勿在项目正式环境中引用该 layui.js 地址 -->
<script src="../../static/layui/layui.js"></script> 
<script src="../../static/js/jquery-3.7.1.min.js"></script>

<script src="../../static/js/intlTelInput.min.js"></script><!--国家手机号-->

<script>
    var gameid = getUrlParams().gameid; // 这里可以根据实际情况修改获取页面ID的方式
    $(function() {
        $("body").show();
        $(".server_list .serverload").hide()
    })
    
    if(!getUrlParams().product){
        layer.msg('缺失产品参数,请登录 极狐合作门户 <br>检查 product 是否配置正确！');
    }
    
    
    $("gamename").html(getUrlParams().name);
    
    var server_delayData = []; // 初始为空数组
    var server_list_R = 0

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
    

    
    // 获取服务器列表
    $.getJSON("/api/v2/?mode=server_sort&user_code="+getUrlParams().user_code+"&product=" + getUrlParams().product)
    .done(function(data) {
        // 请求成功时的处理逻辑
        console.log("服务器地区请求成功" , data);
        $("[page='server_sort']").trigger("click");
        $(".all_server").html("")
        $.each(data, function(i, field){
            $(".all_server").append(`
                
                <button type="button" class="layui-btn layui-btn-normal" id="server_sort_`+field.id+`" onclick="server_list('` + field.CountryCode + `');"><img src="../../static/img/Flag/`+field.Flag.toLowerCase()+`.png" class="Flag"><p>` +field.name +`</p></button>
                
            `);
        })
        // layer.close(loadIndex)
        
        // 自动选择服务器
        var server_sort_pageStates = localStorage.getItem('server_sort_' + gameid);
        if(server_sort_pageStates){
            console.log("上次选择的服务器" , server_sort_pageStates);
            server_list(server_sort_pageStates)
        }
        
    })
    .fail(function(xhr, status, error) {
      // 请求失败时的处理逻辑
        localStorage.removeItem('server_sort_' + gameid);
        console.log("请求失败" + error,status,xhr);
        layer.msg('数据请求失败 <br>返回码:' + xhr.status);
    });
    
    var serverlist_config = null ;
    let pingloop
    
    function server_list(sort) {
        $(".server_list .tablelist").hide()
        $(".server_list .serverload").show()
        serverlist_config = []; // 清空列表
        server_delayData = [] // 清空测试历史延迟
        server_list_layui()// 渲染列表
        $("[page='server_list']").trigger("click");
        
        $.getJSON("/api/v2/?mode=server_list&user_code="+getUrlParams().user_code+"&product=" + getUrlParams().product + "&CountryCode=" + sort)
        .done(function(data) {
            // 请求成功时的处理逻辑
            serverlist_config = data
            // console.log("服务器列表请求成功" , serverlist_config);
            if(!serverlist_config){
                $("[page='server_sort']").trigger("click");
                layer.msg('当前地区服务器获取失败');
            }
            
            localStorage.setItem('server_sort_' + gameid, sort);
            
            
            // 修改所有对象的name字段
            serverlist_config.forEach(function(item) {
                item.name += "-" + item.id; // 将id值添加到name字段后面
                item.ping = "<p class='server_ms'>测速中</p>";
                item.netok= `<netok> <canvas id="networkDelayCanvas_`+item.test_ip+`"  width="162" height="32"></canvas> </netok>`;
                
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
            server_list_R = 0
            $.each(data, function(i, field){
                server_list_R--
                // 稀里哗啦先把数据先甩给父页面，父页面甩给后端
                const pingdata = {
                      mode:"ping_server_list",
                      host: field.test_ip + ":" + field.test_port
                  };
                window.parent.postMessage(pingdata);
            })
            server_list_R = server_list_R
            
            server_list_layui()// 渲染列表
            
            try {
              window.clearInterval(loop_net_test)  // 去除定时器
            } catch (error) {
              console.log("可能没定时器" ,error);
            }

            
            
            
            var test_list_speed = 0.5 // 测试速度
            var loop_net_test = window.setInterval(function() {
            	$.each(data, function(i, field){
                    // 稀里哗啦先把数据先甩给父页面，父页面甩给后端
                    const pingdata = {
                          mode:"ping_server_list",
                          host: field.test_ip + ":" + field.test_port
                      };
                    window.parent.postMessage(pingdata);
                })
                console.log('测试延迟列表: 速度' , test_list_speed);
            },1000 * test_list_speed)
            
            // 6秒没出数据，直接算超时 
            setTimeout(function() {
                if ($('.server_ms').text().trim() === "测速中") {

                    $('.server_ms').text("状态未知");
                }
                console.log('延迟排序一锤定音:');
            }, 1000 * 6)
            
            // 降速继续测30秒
            setTimeout(function() {
                window.clearInterval(loop_net_test)  // 去除定时器
                 console.log('停止测试:');
            },1000 * 16)
            // servertestoklist = []
            // setTimeout(function() {
            //     const canvases = document.querySelectorAll('canvas');
    
            //         if (!canvases.length) {
            //             console.error('No canvas elements found');
            //             return;
            //         }
    
            //         const observer = new IntersectionObserver((entries) => {
            //             entries.forEach(entry => {
            //                 if (entry.isIntersecting) {
            //                     ip = entry.target.id.split("_")[1];
            //                     // console.log(`服务器可见` , ip);
            //                     servertestoklist.push(ip)
                                
            //                     // networkDelayCanvas_iptest(ip)
            //                 } else {
            //                     let index = servertestoklist.indexOf(ip); // 找到值为5的索引
            //                     if (index !== -1) { // 确保找到了要删除的值
            //                         servertestoklist.splice(index, 1); // 删除找到的值
            //                     }
            //                     // console.log(`服务器不可见` , ip);
                                
                                
            //                 }
            //             });
            //             let servertestoklist_uniqueArr = servertestoklist.filter((value, index, self) => {
            //                 return self.indexOf(value) === index;
            //             });
                        
                        
            //             console.log(`检测列表` , servertestoklist);
                        
            //         }, {
            //             root: null, // Use the viewport as root
            //             threshold: 0 // Trigger callback as soon as any part of the target is visible
            //         });
    
            //         canvases.forEach(canvas => {
            //             observer.observe(canvas);
            //         });
                
            // }, 500)
            
        })
        .fail(function(xhr, status, error) {
          // 请求失败时的处理逻辑
            console.log("请求失败" + error,status,xhr);
            layer.msg('数据请求失败 <br>返回码:' + xhr.status);
        });
    }
    
    
    window.addEventListener('message', function(event) {
        // console.log('从父页面接收到的消息:', event.data);
        if(event.data.pingid == "ping_server_list"){
            // console.log('返回:', event.data);
            
            // 找到目标对象并插入数据
            serverlist_config.forEach(function(item) {
                if (item.test_ip === event.data.res.host) {
                    if(event.data.res.time == "unknown"){
                        event.data.res.time = 9999
                    }
                    item.ping = event.data.res.time + " ms";
                    item.ping_initSort = event.data.res.time;
                }
            });
            
            
            // console.log('返回:', serverlist_config);
            // 第一次测试也写进去
            updateDelayData(event.data.res.host, event.data.res.time);
            
            
            if(server_list_R < 0){
                // 刷新列表
                server_list_layui()
                server_list_R++
                // console.log('刷新列表次数:',server_list_R);
                $(".server_list .tablelist").hide()
                $(".server_list .serverload").show()
            }else{
                networkDelayCanvas_update(event.data.res.host) // 绘制数据
                setTimeout(() => {
                    $(".server_list .tablelist").show()
                    $(".server_list .serverload").hide()
                }, 1000 * .5);
                
            }
            
            
            
        }
        
    }, false);
    
    
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
    
    
    server_question_html = `
    
    <div title="这是什么意思？">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shield-fill-check" viewBox="0 0 16 16" style="color: #ffffff8a;padding: 0px;">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>

    </div>
    
    `
    
    function server_list_layui() {
            // 渲染数据
            layui.use('table', function(){
              var table = layui.table;
              
              // 已知数据渲染
              var inst = table.render({
                elem: '#ID-table-data',
                cols: [[ //标题栏
                  {field: 'name', title: '节点', width: 300},
                  {field: 'tag', title: server_question_html, width: 100},
                  {field: 'netok', title: '网络质量', width: 200},
                  {field: 'ping', title: '延迟',sort: false},
                  
                ]],
                data: serverlist_config ,
                height: 310,
                width: 630,
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
                    layer.msg('当前行数据：<br>'+ JSON.stringify(data.id), {
                      offset: '65px'
                    });
                    // obj.setRowChecked({
                    //   type: 'radio' // radio 单选模式；checkbox 复选模式
                    // });
                    const serverset = {
                      mode:"server_connect",
                      server_id: data.id,
                      gameid: gameid
                    };
                    window.parent.postMessage(serverset);
                    
                });
              
            });
            
            // 渲染结束
    }
    
    function networkDelayCanvas_iptest(ip) {
        const pingdata1 = {
              mode:"ping_server_list_Canvas",
              host: ip
          };
        window.parent.postMessage(pingdata1);
        
    }
    
    
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
    
    function getDelaysByIp(ip) {
        // 查找匹配的 IP 地址
        var entry = server_delayData.find(function(entry) {
            return entry.ip === ip;
        });
    
        // 如果找到匹配的条目，则返回延迟数组，否则返回 null
        return entry ? entry.delays : null;
    }
    function networkDelayCanvas_update(ip) {
        // networkDelayCanvas_
        // 获取Canvas元素
        var canvas = document.getElementById('networkDelayCanvas_' + ip);
        var ctx = canvas.getContext('2d');

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
    
    
    // 全局鼠标检测
    $("body").on('click', function(event) {
        //点击循环添加服务器
        if(serverlist_config != null){
            serverlist_config.forEach(function(item) {
                // console.log('返回:', item);
                networkDelayCanvas_update(item.test_ip) // 绘制数据
            });
        }
        
    });
    

    
    // 示例用法
    // updateDelayData("192.168.1.1", 50);
    // updateDelayData("192.168.1.2", 70);
    // updateDelayData("192.168.1.1", 60);



    
    
</script>

</body>
</html>