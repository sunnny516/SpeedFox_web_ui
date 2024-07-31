<?
$debug = time();// 预防js和css缓存
?>


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>登录</title>
  <!-- 请勿在项目正式环境中引用该 layui.css 地址 -->
  <link href="../../static/layui/css/layui.css" rel="stylesheet">
  <link href="../../static/css/style.css?<?echo $debug;?>" rel="stylesheet">
</head>
<body class="login_page_body" style="display: none;">
<style>
.login-container{width: 260px;    margin: 42px auto 0px;}
.login-other .layui-icon{position: relative; display: inline-block; margin: 0 2px; top: 2px; font-size: 26px;}
</style>
<div class="layui-form">
  <div class="login-container">
      
      <img src="" class="logo" alt="logo">
      <h2>登录</h2>
    <div class="layui-form-item">
      <div class="layui-input-wrap">
         
          
        <div class="layui-input-prefix">
          <i class="layui-icon layui-icon-username"></i>
        </div>
        <input type="text" name="username" value="" placeholder="请输入账号" autocomplete="off" class="layui-input" lay-affix="clear" style="color: #ffffff;">
      </div>
    </div>
    <div class="layui-form-item">
      <div class="layui-input-wrap">
        <div class="layui-input-prefix">
          <i class="layui-icon layui-icon-password"></i>
        </div>
        <input type="password" name="password" value="" placeholder="请输入密码"  autocomplete="off" class="layui-input" lay-affix="eye" style="color: #ffffff;">
      </div>
    </div>
    

    <p style="position: absolute;width: 260px;text-align: center;">老版本账号密码可直接登录</p>

    <!--<div class="layui-form-item">-->
    <!--  <input type="checkbox" name="remember" lay-skin="primary" title="记住密码">-->
    <!--  <a href="#forget" style="float: right; margin-top: 7px;">忘记密码？</a>-->
    <!--</div>-->
    <div class="layui-form-item">
      <button class="layui-btn layui-btn-fluid layui-bg-blue" lay-submit lay-filter="login">登录</button>
    </div>
    
    <p style="text-align: center;">
        <a class="reg_url" href="">注册账号</a>
    </p>
    <!--<div class="layui-form-item demo-login-other">-->
    <!--  <label>社交账号登录</label>-->
    <!--  <span style="padding: 0 21px 0 6px;">-->
    <!--    <a href="javascript:;"><i class="layui-icon layui-icon-login-qq" style="color: #3492ed;"></i></a>-->
    <!--    <a href="javascript:;"><i class="layui-icon layui-icon-login-wechat" style="color: #4daf29;"></i></a>-->
    <!--    <a href="javascript:;"><i class="layui-icon layui-icon-login-weibo" style="color: #cf1900;"></i></a>-->
    <!--  </span>-->
    <!--  或 <a href="#reg">注册帐号</a>-->
    <!--</div>-->
  </div>
</div>
  
<!-- 请勿在项目正式环境中引用该 layui.js 地址 -->
<script src="../../static/layui/layui.js"></script> 
<script src="../../static/js/jquery-3.7.1.min.js"></script>

<script src="../../static/js/intlTelInput.min.js"></script><!--国家手机号-->

<script>
$(function() {
    $("body").show();
    
    
    $('.reg_url').attr('href','https://api.jihujiasuqi.com/ui/oauth/register.php?product=' + getUrlParams().product);
})


var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
function phone(str){
		var reg = /^1[3456789]\d{9}$/;
		// ^1  以1开头
		// [3456789] 第2位，使用原子表里的任意一个原子都可以
		// \d{9}$  第三位  朝后可以是任意数字  并且最后结尾必须是数字
		
		if(reg.test(str)){
			console.log('手机号正确');
			return true;
		}else{
			// console.log('不合法');
			console.log('手机格式不正确');
			return false;
		}
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

$.getJSON('https://api.jihujiasuqi.com/api/v2/?mode=get_oem'+'&product=' + getUrlParams().product ).done(function(data) {
    $('.logo').attr('src', data.logo);
});

layui.use(function(){
  var form = layui.form;
  var layer = layui.layer;
  // 提交事件
  form.on('submit(login)', function(data){
    var field = data.field; // 获取表单字段值
    // 显示填写结果，仅作演示用
    // layer.msg(JSON.stringify(field));
    // 此处可执行 Ajax 等操作
    // …
    if(phone(field.username)){
        field.username = "86-"+ field.username
    }
    
    
    $('.layui-btn').text('请稍等...');
    
    layer.msg('请稍等.正在登录', {
                  offset: 'b',
                  anim: 'slideUp'
                });
    
    
    $.getJSON('https://api.jihujiasuqi.com/api/v2/?mode=get_code&user='+field.username+'&pwd='+field.password+'&product=' + getUrlParams().product ).done(function(data) {
        $('.layui-btn').text('登录');
          // 请求成功时的处理逻辑
           console.log("请求成功" + data);
           
           if (data.response == "OK" ) {
               // 登录成功
                localStorage.setItem('user_code', data.code);
                parent.layer.close(index);
           } else {
               // 登录失败
            //   layer.msg(data.msg);
               
               layer.msg(data.msg, {
                  offset: 'b',
                  anim: 'slideUp'
                });
               
           }
           
        })
        .fail(function(xhr, status, error) {
          // 请求失败时的处理逻辑
          console.log("请求失败" + error,status,xhr);
          layer.msg('数据请求失败 <br>返回码:' + xhr.status);
    });
    
    return false; // 阻止默认 form 跳转
  });
});
</script>

</body>
</html>