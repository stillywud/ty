/*
Navicat MySQL Data Transfer

Source Server         : 127
Source Server Version : 50721
Source Host           : localhost:3306
Source Database       : ty_acs

Target Server Type    : MYSQL
Target Server Version : 50721
File Encoding         : 65001

Date: 2018-04-10 15:03:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for entrance_info
-- ----------------------------
DROP TABLE IF EXISTS `entrance_info`;
CREATE TABLE `entrance_info` (
  `entrance_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '门禁信息主键',
  `entrance_addrs` varchar(100) NOT NULL,
  `entrance_mac` varchar(100) DEFAULT NULL,
  `entrance_bluetooth_mac` varchar(100) DEFAULT NULL,
  `entrance_ip` varchar(20) DEFAULT NULL,
  `entrance_port` decimal(10,0) DEFAULT NULL,
  `heartbeattime` int(11) DEFAULT NULL,
  `removedevicetime` int(11) DEFAULT NULL,
  `updateqrcodetime` int(11) DEFAULT NULL,
  PRIMARY KEY (`entrance_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_dept_info
-- ----------------------------
DROP TABLE IF EXISTS `oauth_dept_info`;
CREATE TABLE `oauth_dept_info` (
  `deptinfo_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门主键',
  `Dept_ID` varchar(18) NOT NULL,
  `Dept_Name` varchar(50) NOT NULL,
  `Dept_DictDT_ID` varchar(4) NOT NULL,
  `Dept_Tel` varchar(15) DEFAULT NULL,
  `Dept_Fax` varchar(15) DEFAULT NULL,
  `Dept_Adrs` varchar(100) DEFAULT NULL,
  `Dept_Remark` varchar(500) DEFAULT NULL,
  `Dept_Lng` float DEFAULT NULL,
  `Dept_Lat` float DEFAULT NULL,
  `Dept_Oprt_ID` varchar(50) DEFAULT NULL,
  `Dept_Oprt_Name` varchar(50) DEFAULT NULL,
  `Dept_Eff` datetime NOT NULL,
  `Dept_Exp` datetime NOT NULL,
  PRIMARY KEY (`deptinfo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_dept_info_tree
-- ----------------------------
DROP TABLE IF EXISTS `oauth_dept_info_tree`;
CREATE TABLE `oauth_dept_info_tree` (
  `deptinfo_tree_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '部门关系主键',
  `DeptT_ID` varchar(50) NOT NULL,
  `DeptT_Dept_ID` varchar(50) DEFAULT NULL,
  `DeptT_Tree` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`deptinfo_tree_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for oauth_oprt_info
-- ----------------------------
DROP TABLE IF EXISTS `oauth_oprt_info`;
CREATE TABLE `oauth_oprt_info` (
  `oprtinfo_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '人员信息主键',
  `Oprt_ID` varchar(18) NOT NULL,
  `Oprt_Name` varchar(50) NOT NULL,
  `Oprt_Tel` varchar(15) DEFAULT NULL,
  `Oprt_Mobile` varchar(15) DEFAULT NULL,
  `Oprt_IMEI` varchar(50) DEFAULT NULL,
  `Oprt_Email` varchar(50) DEFAULT NULL,
  `Oprt_DictOT_ID` int(4) NOT NULL,
  `Oprt_Dept_ID` varchar(50) NOT NULL,
  `Oprt_Remark` varchar(500) DEFAULT NULL,
  `Oprt_Eff` datetime NOT NULL,
  `Oprt_Exp` datetime NOT NULL,
  PRIMARY KEY (`oprtinfo_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for open_door_info
-- ----------------------------
DROP TABLE IF EXISTS `open_door_info`;
CREATE TABLE `open_door_info` (
  `open_door_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '开门信息主键',
  `open_door_Time` datetime DEFAULT NULL,
  `open_door_mac` varchar(100) DEFAULT NULL,
  `open_door_type` varchar(30) DEFAULT NULL,
  `open_door_oprt_id` varchar(50) DEFAULT NULL,
  `open_door_result` varchar(10) DEFAULT NULL,
  `open_door_bluetooth_mac` varchar(100) DEFAULT NULL,
  `open_door_oprt_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`open_door_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for visitor_info
-- ----------------------------
DROP TABLE IF EXISTS `visitor_info`;
CREATE TABLE `visitor_info` (
  `visitor_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '访客信息主键',
  `vis_start_time` datetime DEFAULT NULL,
  `vis_end_time` datetime DEFAULT NULL,
  `vis_url` varchar(100) DEFAULT NULL,
  `apply_oprt_id` varchar(100) DEFAULT NULL,
  `vis_app_time` datetime DEFAULT NULL,
  `apply_oprt_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`visitor_info_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for white_list_oprt
-- ----------------------------
DROP TABLE IF EXISTS `white_list_oprt`;
CREATE TABLE `white_list_oprt` (
  `white_list_staff_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '白名单(人员)主键',
  `Oprt_ID` varchar(50) NOT NULL,
  `Oprt_Name` varchar(50) NOT NULL,
  `Oprt_IMEI` varchar(50) NOT NULL,
  `Oprt_Mac` varchar(100) DEFAULT NULL,
  `Oprt_Bluetooth_Mac` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`white_list_staff_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
