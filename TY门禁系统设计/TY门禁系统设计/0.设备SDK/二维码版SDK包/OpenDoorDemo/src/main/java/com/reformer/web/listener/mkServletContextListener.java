package com.reformer.web.listener;

import com.nettymq.server.MainServer;
import org.apache.log4j.Logger;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

/**
 * 功能描述:
 * <p/>
 * 版权所有：杭州立方控股
 * <p/>
 * 未经本公司许可，不得以任何方式复制或使用本程序任何部分
 *
 * @author zliang 新增日期：2015-11-27
 * @author zliang 修改日期：2015-11-27
 * @version 1.0.0
 * @since 1.0.0
 */
public class mkServletContextListener implements ServletContextListener {
    private final Logger logger = Logger.getLogger(getClass());

    public void contextDestroyed(ServletContextEvent event) {

    }

    public void contextInitialized(ServletContextEvent event) {
        try {
            MainServer.doStart();
        }catch (Exception e){
            logger.error(e.getMessage() ,e);
        }

    }
}
