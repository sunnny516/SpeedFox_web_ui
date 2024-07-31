<?
$debug = time();// 预防js和css缓存
?>


<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>充值</title>
  <!-- 请勿在项目正式环境中引用该 layui.css 地址 -->
  <link href="../../static/layui/css/layui.css" rel="stylesheet">
  <link href="../../static/css/color_map.css?V1.0" rel="stylesheet"><!-- 颜色大全 -->
  <link href="../../static/css/style.css?<?echo $debug;?>" rel="stylesheet">
</head>
<body class="pay_page_body" style="display: none;">


<div class="layui-form" lay-filter="form-demo-skin">
  <style>
  /*
   * 基于复选框和单选框的卡片风格多选组件
   * 需要具备一些基础的 CSS 技能，以下样式均为外部自主实现。
   */
   
   .pay_page_body{
           overflow: hidden;
   }
   
  /* 主体 */
  .layui-form-checkbox>.lay-skin-checkcard,
  .layui-form-radio>.lay-skin-checkcard {
    display: table;
    display: flex;
    padding: 12px;
    white-space: normal;
    border-radius: 10px;
    border: 1px solid #e5e5e5;
    color: #000;
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
    border-color: #1e9fff;
  }
  /* 选中 */
  .layui-form-checked>.lay-skin-checkcard,
  .layui-form-radioed[lay-skin="none"]>.lay-skin-checkcard {
    color: #fff;
    border-color: #1e9fff;
    background-color: #1e9fff40 !important;
    /* box-shadow: 0 0 0 3px rgba(22, 183, 119, 0.08); */
  }
  /* 禁用 */
  .layui-checkbox-disabled>.lay-skin-checkcard,
  .layui-radio-disabled>.lay-skin-checkcard {
    box-shadow: none;
    border-color: #e5e5e5 !important;
    background-color: #eee !important;
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
    font-size: 16px;
    white-space: nowrap;
    margin-bottom: 4px;
  }
  .lay-skin-checkcard-description {
    font-size: 13px;
    color: #fff;
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
    border-top-color: #1e9fff;
    border-top-style: solid;
    border-right-color: #1e9fff;
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
    border-right-color: #1e9fff;
    border-right-style: solid;
    border-bottom-color: #1e9fff;
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
</style>
<!-- 标签风格 -->
<style>
  .layui-form-radio>.lay-skin-tag,
  .layui-form-checkbox>.lay-skin-tag {
    font-size: 13px;
    border-radius: 100px;
  }
  .layui-form-checked>.lay-skin-tag,
  .layui-form-radioed>.lay-skin-tag {
    color: #fff !important;
    background-color: #16b777 !important;
  }
</style>
<!-- 单选框 Color Picker -->
<style>
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
  .title1{
    margin: 22px 32px 0px;
  }
  .layui-form-checkbox[lay-skin=none], .layui-form-radio[lay-skin=none] {
    position: relative;
    min-height: 20px;
    margin: 4px;
    padding: 0;
    height: auto;
    line-height: normal;
}
h1{
    font-size: 24px;
}

.layui-elem-quote {
    margin-bottom: 10px;
    padding: 15px;
    line-height: 1.8;
    border-left: 5px solid #1e9fff;
    border-radius: 0 2px 2px 0;
    background-color: #4343436b;
    position: absolute;
    width: 610px;
    left: 26px;
    bottom: 18px;
}

tip{
        background: red;
    position: absolute;
    padding: 2px 8px;
    border-radius: 37px;
    font-size: 10px;
    top: -8px;
    right: 12px;
    
}

paybox .radio {
    position: absolute;
    bottom: 215px;
    right: 170px;
}

paybox money{
    font-size: 26px;
    color: #38cbff;
}

paybox .money{
    position: absolute;
    bottom: 156px;
    right: 192px;
}

paybox time{
    font-size: 26px;
    color: #38cbff;
}

paybox .time{
    position: absolute;
    bottom: 194px;
    right: 192px;
}

paybox .qrcode{
    width: 128px;
    height: 128px;
    background: white;
    position: absolute;
    top: 178px;
    right: 28px;
    padding: 6px;
}

paybox .paylogo{
    width: 21px;
}


.layui-input, .layui-select, .layui-textarea {
    height: 38px;
    line-height: 1.3;
    line-height: 38px \9;
    border-width: 1px;
    border-style: solid;
    background-color: #434343;
    color: rgba(0, 0, 0, .85);
    border-radius: 2px;
    color: white;
}



</style>
 
  <h3 class="title1">购买时长</h3>
  <div class="layui-row layui-col-space8">
    
    <div class="layui-row" style="margin: 12px 24px 0px;">
        
        
        <div class="layui-col-xs3">
          <input type="radio" name="radio1" value="chrome" lay-skin="none" checked>
          <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 100px">
            <div class="lay-skin-checkcard-detail">
              <div class="lay-skin-checkcard-header">极狐年卡</div>
              <div class="lay-skin-checkcard-description lay-ellipsis-multi-line">
                <h1>3元/月</h1>
                <p>36元</p>
                
                <tip>限购一次</tip>
                
                <p><br>Speedfox-------占位字符串</p>
              </div>
            </div>
          </div>
        </div>
        
        
        
        
        
        
        
        <div class="layui-col-xs3">
          <input type="radio" name="radio1" value="chrome" lay-skin="none">
          <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 100px">
            <div class="lay-skin-checkcard-detail">
              <div class="lay-skin-checkcard-header">极狐半年卡</div>
              <div class="lay-skin-checkcard-description lay-ellipsis-multi-line">
                <h1>4.98元/月</h1>
                <p>29.9元</p>
                
                <tip>几乎成本</tip>
                
                <p><br>Speedfox-------占位字符串</p>
              </div>
            </div>
          </div>
        </div>
        
        
        <div class="layui-col-xs3">
          <input type="radio" name="radio1" value="chrome" lay-skin="none">
          <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 100px">
            <div class="lay-skin-checkcard-detail">
              <div class="lay-skin-checkcard-header">极狐季卡</div>
              <div class="lay-skin-checkcard-description lay-ellipsis-multi-line">
                <h1>6.63元/月</h1>
                <p>19.9元</p>
                
                
                <tip>抛去成本还行</tip>
                <p><br>Speedfox-------占位字符串</p>
              </div>
            </div>
          </div>
        </div>
        
        
        <div class="layui-col-xs3">
          <input type="radio" name="radio1" value="chrome" lay-skin="none">
          <div lay-radio class="lay-skin-checkcard lay-check-dot-2" style="height: 100px">
            <div class="lay-skin-checkcard-detail">
              <div class="lay-skin-checkcard-header">极狐月卡</div>
              <div class="lay-skin-checkcard-description lay-ellipsis-multi-line">
                <!-- 介绍开始 -->
                
                <h1>9.9元/月</h1>
                <p>9.9元</p>
                
                <tip>小赚</tip>
                <!-- 介绍结束 -->
                <p><br>Speedfox-------占位字符串</p>
              </div>
            </div>
          </div>
        </div>
        
        
        
        
        
        <paybox>
            <!--<div class="radio">-->
            <!--  <input type="radio" name="AAA" value="1" title="使用优惠价支付" checked>-->
            <!--  <input type="radio" name="AAA" value="2" title="支持极狐原价支付"> -->
            <!--</div>-->
            <div class="layui-col-xs3" style="
    position: absolute;
    right: 199px;
    top: 188px;
">
                <div class="layui-form-item" style="margin-bottom: 0;">
                  <!--<label class="layui-form-label">优惠券 :</label>-->
                     <select>
                      <!--<option value="">请选择</option>-->
                      <!--<option value="AAA">选项 A</option>-->
                      <!--<option value="BBB">选项 B</option>-->
                      <option value="CCC" selected>保本卷死同行优惠券</option>
                    </select>
                </div>
            </div>
            
            <h2 class="time">
                套餐有效期 <time>366</time> 天
            </h2>
            
            
            <h2 class="money">
                <img src="../../static/img/alipay.png" class="paylogo">
                <img src="../../static/img/wechatpay.png" class="paylogo">
                扫码支付 <money>36</money> 元
            </h2>
            
            
            <div class="qrcode"></div>
            
        <paybox>
        
        
    </div>
    <blockquote class="layui-elem-quote">如果您可以观看广告，您可以依旧通过广告看广告方式获取时长，我们也推荐您观看广告获取时长，如果您真的不能观看广告，朋友也无法帮助您的同时，您可以考虑支持一下我们，这个价格基本上是成本价，算上电费啥的最便宜的一档长期用没准还亏了</blockquote>



  </div>


</div>
  



  
<!-- 请勿在项目正式环境中引用该 layui.js 地址 -->
<script src="../../static/layui/layui.js"></script> 
<script src="../../static/js/jquery-3.7.1.min.js"></script>

<script src="../../static/js/jquery.qrcode.min.js"></script><!-- 二维码 -->

<script>
    $(function() {
        $("body").show();
        //生成100*100(宽度100，高度100)的二维码
        $('.qrcode').qrcode({
            render: "canvas", //也可以替换为table
            width: 128,
            height: 128,
            text: "https://www.bilibili.com/video/BV1GJ411x7h7/?"
        });
    })
</script>

</body>
</html>