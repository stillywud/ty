package com.reformer.web.controller;

import com.nettymq.server.MainServer;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 公共视图控制器
 * 
 * @author starzou
 * @since 2014年4月15日 下午4:16:34
 **/
@Controller
public class CommonController {
    public final static String SUCCESS ="result";

    public final static String MSG ="msg";


    public final static String DATA ="data";

    public final static String LOGOUT_FLAG = "logoutFlag";

    /**
     * 首页
     * 
     * @param request
     * @return
     */
    @RequestMapping("index")
    public String index(HttpServletRequest request) {
        return "index";
    }

    @RequestMapping(value = "/visitor", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> visitor(String time,String mac,String flag) {
        Map<String, Object> result = new HashMap<String, Object>();
        result.put(SUCCESS, 1);
        return result;
    }

    /**
     * 开门
     *@param device_mac 设备mac
     *@param io_action 1：开门，0：不开门
     *@param qrCode 二维码内容，可以为空
     *@return 0 ：成功 ，1：设备未连接  2:异常
     */
    @RequestMapping(value = "/opendoor", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> openDoor(String device_mac, @RequestParam(value="qrCode", required=false)  String qrCode, Integer io_action){
        Map<String, Object> result = new HashMap<String, Object>();
        result.put(SUCCESS, MainServer.openDoor(device_mac,qrCode, io_action));
        return result;
    }

    /**
     *检测设备是否在线
     *@param device_mac 设备mac
     *@return result  1：在线，0：不在线
     */
    @RequestMapping(value = "/isonline", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> isOnLine(String device_mac) {

        Map<String, Object> result = new HashMap<String, Object>();
        result.put(SUCCESS, MainServer.isOnLine(device_mac));
        return result;
    }

    /**
     *设置心跳时间
     *@param time 心跳间隔 时间  1 = 10秒,默认值是3，即时间30秒，30秒发一次心跳
     */
    @RequestMapping(value = "/setheartbeattime", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object>  setHeartbeatTime(int time) {
        MainServer.setHeartbeatTime(time);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put(SUCCESS, 1);
        return result;
    }

    /**
     *设置超时断开设备的时间  (在规定时间内没有心跳连接，将当前设备断开连接)
     *@param time 时间  1 = 10秒,默认值是4，即时间40秒 ，超过40秒没有心跳就断开连接
     */
    @RequestMapping(value = "/setremovedevicetime", method = RequestMethod.GET)
    @ResponseBody
    public Map<String, Object> setRemoveDeviceTime(int time) {
        MainServer.setRemoveDeviceTime(time);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put(SUCCESS, 1);
        return result;
    }


}