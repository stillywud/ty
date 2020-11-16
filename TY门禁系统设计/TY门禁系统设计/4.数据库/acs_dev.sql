/*
 Navicat Premium Data Transfer

 Source Server         : tianyuan30.207
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 192.168.30.207:3306
 Source Schema         : acs_dev

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 20/05/2020 09:28:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for entrance
-- ----------------------------
DROP TABLE IF EXISTS `entrance`;
CREATE TABLE `entrance`  (
  `entrance_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '门禁信息主键',
  `entrance_addrs` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `entrance_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entrance_bluetooth_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `entrance_ip` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bluetooth_password` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '3579EC33BF01BE80D18BEFC400573258',
  `iconurl` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`entrance_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 98 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of entrance
-- ----------------------------
INSERT INTO `entrance` VALUES (97, '科技楼3楼', 'A8088714B3DD', '32556F696B666F706F', '192.168.18.116', '3579EC33BF01BE80D18BEFC400573258', NULL);

-- ----------------------------
-- Table structure for entrance_paramrs
-- ----------------------------
DROP TABLE IF EXISTS `entrance_paramrs`;
CREATE TABLE `entrance_paramrs`  (
  `entrance_params_id` int(11) NOT NULL COMMENT '设备参数id',
  `entrance_params_heartbeattime` int(11) NOT NULL COMMENT '设备参数心跳时间',
  `entrance_params_removedevicetime` int(11) NOT NULL COMMENT '超时断开时间',
  `entrance_params_updateqrcodetime` int(11) NOT NULL COMMENT '更新二维码间隔时间',
  `entrance_params_port` decimal(10, 0) NOT NULL COMMENT '端口号',
  PRIMARY KEY (`entrance_params_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of entrance_paramrs
-- ----------------------------
INSERT INTO `entrance_paramrs` VALUES (1, 60, 40, 60, 8888);

-- ----------------------------
-- Table structure for open_door_info
-- ----------------------------
DROP TABLE IF EXISTS `open_door_info`;
CREATE TABLE `open_door_info`  (
  `open_door_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '开门信息主键',
  `open_door_time` datetime(0) NULL DEFAULT NULL COMMENT '开门时间',
  `open_door_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '设备mac',
  `open_door_bluetooth_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '蓝牙mac',
  `open_door_oprt_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '人员id',
  `open_door_oprt_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '人员name',
  `open_door_type` varchar(30) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开门类型 0 后台 1 app扫码 2 蓝牙 3 访客',
  `open_door_result` varchar(2) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开门返回状态 (00 失败 01 成功)',
  `entrance_addrs` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '设备地址',
  PRIMARY KEY (`open_door_info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for visitor_info
-- ----------------------------
DROP TABLE IF EXISTS `visitor_info`;
CREATE TABLE `visitor_info`  (
  `visitor_info_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '访客信息主键',
  `vis_start_time` datetime(0) NULL DEFAULT NULL COMMENT '访客开始时间',
  `vis_end_time` datetime(0) NULL DEFAULT NULL COMMENT '访客结束时间',
  `vis_url` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '访客生成url',
  `apply_oprt_id` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `vis_app_time` datetime(0) NULL DEFAULT NULL,
  `apply_oprt_name` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `acs_code` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '随机码',
  `visitor_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'mac地址关联设备表',
  PRIMARY KEY (`visitor_info_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for white_list_device
-- ----------------------------
DROP TABLE IF EXISTS `white_list_device`;
CREATE TABLE `white_list_device`  (
  `white_list_device_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '白名单(设备)主键',
  `entrance_id` int(11) NOT NULL DEFAULT 0 COMMENT '门禁设备主键',
  `oprt_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `device_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `bluetooth_mac` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`white_list_device_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for white_list_oprt
-- ----------------------------
DROP TABLE IF EXISTS `white_list_oprt`;
CREATE TABLE `white_list_oprt`  (
  `white_list_staff_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '白名单(人员)主键',
  `oprt_id` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `oprt_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `oprt_imei` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '字串',
  `to_invite` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '0' COMMENT '0:不可邀请/1:可邀请',
  PRIMARY KEY (`white_list_staff_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
