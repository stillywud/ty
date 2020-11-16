<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<%
String path = request.getContextPath();
String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>

<!DOCTYPE html>
<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="en" class="">
    <!--<![endif]-->
    <!-- BEGIN HEAD -->
    <head>
        <base href="<%=basePath%>">
        <meta charset="utf-8" />
        <title>OpenDoor</title>
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="width=device-width, initial-scale=1.0" name="viewport" />
        <meta content="" name="description" />
        <meta content="" name="author" />
        <meta name="MobileOptimized" content="320">

       <%-- <!-- BEGIN GLOBAL MANDATORY STYLES -->
        <link href="assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
        <link href="assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css" />
        <!-- END GLOBAL MANDATORY STYLES -->

        <!-- BEGIN THEME STYLES -->
        <link href="assets/css/style-metronic.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/style.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/style-responsive.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/plugins.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/pages/tasks.css" rel="stylesheet" type="text/css" />
        <link href="assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color" />
        <link href="assets/css/custom.css" rel="stylesheet" type="text/css" />--%>
        <script type="text/javascript" src="<%=basePath%>app/js/jquery.min.js"></script>
        <!-- END THEME STYLES -->


    </head>
    <!-- END HEAD -->

    <!-- BEGIN BODY -->
    <body class="">
    device_mac：<input type="text" id="opendoor_device" value="" />
    io_action：<input type="text" id="opendoor_io_action" value="" />
    <input type="button" value="开门" onclick="openDoor();" />  </body>
    <br>
    device_mac：<input type="text" id="isOnLine_device" value="" />
    <input type="button" value="检测在线" onclick="isOnLine();" />  </body>
    </body>
</html>

<script type="text/javascript">
    function get(){
        $.get(
                "<%=basePath%>rest/visitor.do?time=1&mac=2&flag=3",
                function (data) {
                    alert(data.result);
                },
                "json"
        )
    }
    function openDoor(){
        if($('#opendoor_device').val().length < 1){
            alert("请输入device_mac");
            return;
        }
        $.get(
                "<%=basePath%>rest/opendoor.do?device_mac="+$('#opendoor_device').val()+"&io_action="+$('#opendoor_io_action').val(),
                function (data) {
                    if(data.result == 1){
                        alert("设备未连接");
                    } else if(data.result == 0){
                        alert("成功");
                    } else if(data.result == 2){
                        alert("异常");
                    }
                },
                "json"
        )
    }

    function isOnLine(){
        if($('#isOnLine_device').val().length < 1){
            alert("请输入device_mac");
            return;
        }
        $.get(
                "<%=basePath%>rest/isonline.do?device_mac="+$('#isOnLine_device').val(),
                function (data) {
                    if(data.result == 1){
                        alert("在线");
                    } else if(data.result == 0){
                        alert("不在线");
                    }
                },
                "json"
        )
    }
</script>