

<style>
body {
    margin: 0px;
    
}

 *{
    transition: width 0.5s;
    transition-timing-function: linear(0 0%, 0 1.8%, 0.01 3.6%, 0.03 6.35%, 0.07 9.1%, 0.13 11.4%, 0.19 13.4%, 0.27 15%, 0.34 16.1%, 0.54 18.35%, 0.66 20.6%, 0.72 22.4%, 0.77 24.6%, 0.81 27.3%, 0.85 30.4%, 0.88 35.1%, 0.92 40.6%, 0.94 47.2%, 0.96 55%, 0.98 64%, 0.99 74.4%, 1 86.4%, 1 100%);
    will-change: transform;
}

.bg {
    width: 0px;
    /*width: 340px;*/
    height: 95px;
    background: #00AEEC;
    float: left;
}
.box {
    width: 0px;
    /*width: 335px;*/
    height: 95px;
    background: #040404;
    float: left;
}

.logo{
    width: 72px;
    margin: 10px 0px 0px 19px;
    filter: invert(100%);
    display: none;
}

h2 {
    color: white;
    position: absolute;
    right: 0px;
    top: 11px;
    display: none;
    width: 240px;
    /* background: red; */
    font-size: 24;
}
marquee{
    width: 240PX;
}
</style>


<!--<meta http-equiv="refresh" content="5" >-->

<div class="bg">
    <div class="box">
        <img src="https://api.jihujiasuqi.com/logo.png" class="logo" alt="logo">
        <h2></h2>
    <!--<h2>注意,时长不足60分钟</h2>-->
    </div>
</div>

  <script src="../../static/layui/layui.js"></script>
  
  <script src="../../static/js/jquery-3.7.1.min.js"></script>
<script>

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


$.getJSON('https://api.jihujiasuqi.com/api/v2/?mode=get_oem&product=' + getUrlParams().product ).done(function(data) {
    $('.logo').attr('src', data.logo);
});

// const {  ipcRenderer  } = require('electron');
// var window_data = []
// window_data[0] = "tips"
// window_data[1] = "show"
// ipcRenderer.send('window', window_data);


setTimeout(function () { 
    $(".bg").width(340);
}, 1000);

setTimeout(function () { 
    $(".box").width(335);
}, 1000 + 150);


setTimeout(function () { 
    $("img").fadeIn(300);
    $("h2").fadeIn(300);
    $("h2").html(getUrlParams().text);
}, 1000 + 150 + 300);



setTimeout(function () { 
    $("img").fadeOut(300);
    $("h2").fadeOut(300);
}, 5000 - 150 - 300);


setTimeout(function () { 
    $(".bg").width(0);
}, 5000);

setTimeout(function () { 
    $(".box").width(0);
},  5000 - 150);

</script>
<script src="../../static/js/jquery-3.7.1.min.js"></script>