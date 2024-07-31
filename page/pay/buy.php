<?
require_once('../../../../api/System.php');
$debug = time();// 预防js和css缓存
$time = sys_time();

$product = $_GET['product'];
$uid = $_GET['uid'];

if($product== "" or $uid==""){
    echo "缺少必要参数";
    exit;
}


$money = 0.01;

$order = md5($uid . $product .$time);
// 创建账单
$note = "支付宝支付";
mysqli_query($conn,"INSERT INTO `bill` (`uid`, `order`, `product`, `money`, `mode`, `note`, `time`) VALUES ('$uid', '$order', '$product', '$money', '充值', '$note', '$time');");




$payurl = "https://api.jihujiasuqi.com/apps/pay/alipay/pay_m.php?pay_order=" .$order ."&pay_money=". $money;
?>


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>购买</title>
  <!-- 请勿在项目正式环境中引用该 layui.css 地址 -->
  <link href="../../static/layui/css/layui.css" rel="stylesheet">
  <link href="../../static/css/color_map.css?V1.0" rel="stylesheet"><!-- 颜色大全 -->
  <link href="../../static/css/style.css?<?echo $debug;?>" rel="stylesheet">
</head>
<body class="pay_page_body">


<div class="layui-form" lay-filter="form-demo-skin">
<style>
.title1{
    margin: 22px 32px 0px;
}

.qrcode{
    background: white;
    position: absolute;
    top: 70px;
    left: 50px;
    padding: 6px;
}

.paylogo {
    width: 18px;
    position: absolute;
    left: 56px;
    top: 320px;
}
.paytext {
    position: absolute;
    left: 82px;
    top: 318px;
}

#countdown {
    position: absolute;
    width: 100%;
    top: 274px;
    text-align: center;
    color: red;
}
</style>
 
<h3 class="title1">商品</h3>
 
<div class="qrcode"></div>

<div id="countdown">剩余支付时间</div>

<p class="paytext">请使用支付宝扫码完成支付</p>
<img src="../../static/img/alipay.png" class="paylogo">
  
<!-- 请勿在项目正式环境中引用该 layui.js 地址 -->
<script src="../../static/layui/layui.js"></script> 
<script src="../../static/js/jquery-3.7.1.min.js"></script>

<script src="../../static/js/jquery.qrcode.min.js"></script><!-- 二维码 -->

<script>
    $(function() {
        //生成100*100(宽度100，高度100)的二维码
        $('.qrcode').qrcode({
            render: "canvas", //也可以替换为table
            width: 188,
            height: 188,
            text: "<?echo $payurl?>"
        });
    })
</script>

<script>
    $(document).ready(function() {
        var minutes = 10;
        var seconds = 0;

        function updateCountdown() {
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                    $('#countdown').text('支付超时,请重新获取订单!');
                    $('.qrcode canvas').hide()
                    return;
                }
                minutes--;
                seconds = 59;
            } else {
                seconds--;
            }
            var displayMinutes = minutes < 10 ? '0' + minutes : minutes;
            var displaySeconds = seconds < 10 ? '0' + seconds : seconds;
            $('#countdown').text("剩余支付时间 : " + displayMinutes + ':' + displaySeconds);
        }
        updateCountdown()
        var interval = setInterval(updateCountdown, 1000);
    });
</script>

</body>
</html>