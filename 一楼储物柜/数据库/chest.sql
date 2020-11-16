/*
 Navicat Premium Data Transfer

 Source Server         : tianyuan30.207
 Source Server Type    : MySQL
 Source Server Version : 50727
 Source Host           : 192.168.30.207:3306
 Source Schema         : chest

 Target Server Type    : MySQL
 Target Server Version : 50727
 File Encoding         : 65001

 Date: 19/05/2020 16:31:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for chestinfo
-- ----------------------------
DROP TABLE IF EXISTS `chestinfo`;
CREATE TABLE `chestinfo`  (
  `Chest_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Chest_Site` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL COMMENT '柜子位置',
  `Chest_Type` bit(1) NOT NULL COMMENT '柜子类型（1长期 0 短期）',
  `Chest_State` bit(1) NOT NULL COMMENT '柜子状态0未占用 1占用',
  `Chest_Remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '柜子备注',
  `Chest_GetDate` datetime(0) NULL DEFAULT NULL COMMENT '柜子申请时间',
  `Chest_OutDate` datetime(0) NULL DEFAULT NULL COMMENT '柜子注销时间',
  `User_ID` int(11) NULL DEFAULT NULL COMMENT '用户id',
  `Chest_Random` int(11) NULL DEFAULT NULL COMMENT '开柜随机码',
  `Chest_Longtime` int(11) NULL DEFAULT NULL COMMENT '占用时长',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL COMMENT '用户名称',
  `lockstatu` bit(1) NULL DEFAULT NULL COMMENT '是否锁定',
  PRIMARY KEY (`Chest_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 145 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of chestinfo
-- ----------------------------
INSERT INTO `chestinfo` VALUES (1, '南1', b'0', b'1', NULL, '2019-11-23 14:46:50', NULL, 1000002368, 99360079, 0, '门禁安卓荣耀V10', b'1');
INSERT INTO `chestinfo` VALUES (2, '南2', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (3, '南3', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (4, '南4', b'0', b'1', '长期柜子', '2019-11-25 14:07:06', NULL, 1000002368, 95033556, 0, '门禁安卓荣耀V10', b'1');
INSERT INTO `chestinfo` VALUES (5, '南5', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (6, '南6', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (7, '南7', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (8, '南8', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (9, '南9', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (10, '南10', b'1', b'1', NULL, '2019-11-23 14:49:27', NULL, 1000002368, 20150150, 0, '门禁安卓荣耀V10', b'0');
INSERT INTO `chestinfo` VALUES (11, '南11', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (12, '南12', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (13, '南13', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (14, '南14', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (15, '南15', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (16, '南16', b'0', b'0', '普通用户占用', NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (17, '南17', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (18, '南18', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (19, '南19', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (20, '南20', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (21, '南21', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (22, '南22', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (23, '南23', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (24, '南24', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (25, '南25', b'0', b'1', NULL, '2019-11-23 14:50:30', NULL, 1000002368, 47934653, 0, '门禁安卓荣耀V10', b'1');
INSERT INTO `chestinfo` VALUES (26, '南26', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (27, '南27', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (28, '南28', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (29, '南29', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (30, '南30', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (31, '南31', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (32, '南32', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (33, '南33', b'0', b'1', NULL, '2019-11-23 15:08:40', NULL, 1000064508, 87887071, 0, '冯建强', b'1');
INSERT INTO `chestinfo` VALUES (34, '南34', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (35, '南35', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (36, '南36', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (37, '南37', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (38, '南38', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (39, '南39', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (40, '南40', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (41, '南41', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (42, '南42', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (43, '南43', b'1', b'1', NULL, '2019-11-23 14:48:47', NULL, 1000002368, 28522090, 0, '门禁安卓荣耀V10', b'0');
INSERT INTO `chestinfo` VALUES (44, '南44', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (45, '南45', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (46, '南46', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (47, '南47', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (48, '南48', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (49, '南49', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (50, '南50', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (51, '南51', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (52, '南52', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (53, '南53', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (54, '南54', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (55, '南55', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (56, '南56', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (57, '南57', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (58, '南58', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (59, '南59', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (60, '南60', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (61, '南61', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (62, '南62', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (63, '南63', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (64, '南64', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (65, '南65', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (66, '南66', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (67, '南67', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (68, '南68', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (69, '南69', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (70, '南70', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (71, '南71', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (72, '南72', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (73, '北1', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (74, '北2', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (75, '北3', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (76, '北4', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (77, '北5', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (78, '北6', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (79, '北7', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (80, '北8', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (81, '北9', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (82, '北10', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (83, '北11', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (84, '北12', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (85, '北13', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (86, '北14', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (87, '北15', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (88, '北16', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (89, '北17', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (90, '北18', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (91, '北19', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (92, '北20', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (93, '北21', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (94, '北22', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (95, '北23', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (96, '北24', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (97, '北25', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (98, '北26', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (99, '北27', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (100, '北28', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (101, '北29', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (102, '北30', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (103, '北31', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 1, NULL, b'0');
INSERT INTO `chestinfo` VALUES (104, '北32', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (105, '北33', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (106, '北34', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (107, '北35', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (108, '北36', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (109, '北37', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (110, '北38', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (111, '北39', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (112, '北40', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (113, '北41', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (114, '北42', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (115, '北43', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (116, '北44', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (117, '北45', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (118, '北46', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (119, '北47', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (120, '北48', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (121, '北49', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (122, '北50', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (123, '北51', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (124, '北52', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (125, '北53', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (126, '北54', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (127, '北55', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (128, '北56', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (129, '北57', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (130, '北58', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (131, '北59', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (132, '北60', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (133, '北61', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (134, '北62', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (135, '北63', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (136, '北64', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (137, '北65', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (138, '北66', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (139, '北67', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (140, '北68', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (141, '北69', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (142, '北70', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (143, '北71', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');
INSERT INTO `chestinfo` VALUES (144, '北72', b'0', b'0', NULL, NULL, NULL, NULL, NULL, 0, NULL, b'0');

-- ----------------------------
-- Table structure for openlog
-- ----------------------------
DROP TABLE IF EXISTS `openlog`;
CREATE TABLE `openlog`  (
  `OpenL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Chest_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `OpenL_OpenDate` datetime(0) NOT NULL,
  `OpenL_UserName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `OpenL_UserType` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`OpenL_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of openlog
-- ----------------------------
INSERT INTO `openlog` VALUES (12, 1, 1000064526, '2019-11-06 09:03:30', '李增存', '柜子管理员');
INSERT INTO `openlog` VALUES (13, 1, 1000064526, '2019-11-12 14:09:38', '李增存', '柜子管理员');
INSERT INTO `openlog` VALUES (14, 1, 1000002368, '2019-11-21 08:51:04', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (15, 45, 1000064508, '2019-11-21 09:03:24', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (16, 16, 1000064508, '2019-11-21 09:20:53', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (17, 16, 1000002368, '2019-11-21 09:22:36', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (18, 4, 1000002368, '2019-11-21 09:32:09', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (19, 4, 1000064508, '2019-11-21 09:33:52', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (20, 16, 1000064508, '2019-11-21 09:43:47', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (21, 19, 1000002368, '2019-11-22 14:57:17', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (22, 19, 1000002368, '2019-11-22 14:57:52', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (23, 91, 1000002368, '2019-11-22 14:59:05', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (24, 91, 1000002368, '2019-11-22 15:01:16', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (25, 93, 1000002368, '2019-11-22 15:05:05', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (26, 19, 1000002368, '2019-11-23 14:45:39', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (27, 1, 1000002368, '2019-11-23 14:46:26', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (28, 19, 1000064508, '2019-11-23 14:47:59', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (29, 25, 1000002368, '2019-11-23 14:50:36', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (30, 33, 1000064508, '2019-11-23 14:52:01', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (31, 33, 1000064508, '2019-11-23 14:52:23', '冯建强', '管理员');
INSERT INTO `openlog` VALUES (32, 33, 1000002368, '2019-11-23 15:01:01', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (33, 33, 1000002368, '2019-11-23 15:01:05', '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `openlog` VALUES (34, 10, 1000002368, '2019-11-23 15:01:52', '门禁安卓荣耀V10', '柜子管理员');

-- ----------------------------
-- Table structure for uselog
-- ----------------------------
DROP TABLE IF EXISTS `uselog`;
CREATE TABLE `uselog`  (
  `UseL_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Chest_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL,
  `UseL_GetDate` datetime(0) NULL DEFAULT NULL,
  `UseL_OutDate` datetime(0) NULL DEFAULT NULL,
  `Chest_Random` int(11) NULL DEFAULT NULL,
  `UseL_UserName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  `UseL_UserType` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NULL DEFAULT NULL,
  PRIMARY KEY (`UseL_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 170 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_bin ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of uselog
-- ----------------------------
INSERT INTO `uselog` VALUES (107, 1, 1000064526, '2019-11-06 09:09:31', '2019-11-23 14:46:13', 14371906, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (108, 1, 1000064526, '2019-11-06 09:35:44', '2019-11-23 14:46:13', 10920116, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (109, 1, 1000064526, '2019-11-11 11:28:44', '2019-11-23 14:46:13', 51293625, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (110, 1, 1000064526, '2019-11-12 14:54:02', '2019-11-23 14:46:13', 15646742, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (111, 1, 1000064526, '2019-11-12 14:55:01', '2019-11-23 14:46:13', 68460028, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (112, 1, 1000002368, '2019-11-21 08:50:28', '2019-11-23 14:46:13', 31051180, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (113, 45, 1000064508, '2019-11-21 08:56:18', '2019-11-21 09:19:34', 93996038, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (114, 16, 1000064508, '2019-11-21 09:20:44', '2019-11-22 14:01:58', 93189427, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (115, 4, 1000064508, '2019-11-21 09:33:50', '2019-11-23 15:51:39', 92509305, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (116, 4, 1000002368, '2019-11-21 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (117, 16, 1000064508, '2019-11-21 09:42:56', '2019-11-22 14:01:58', 24017461, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (118, 2, 1000002368, '2019-11-22 10:05:08', '2019-11-23 14:47:33', 49619116, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (119, 19, 1000002368, '2019-11-22 14:57:47', '2019-11-23 14:49:53', 20880687, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (120, 91, 1000002368, '2019-11-22 14:58:59', '2019-11-23 14:45:03', 42873698, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (121, 93, 1000064508, '2019-11-22 15:04:52', '2019-11-22 15:06:18', 73267086, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (122, 93, 1000002368, '2019-11-22 15:04:52', '2019-11-22 15:06:18', 58782347, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (123, 93, 1000002368, '2019-11-22 15:06:02', '2019-11-22 15:06:18', 66712996, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (124, 93, 1000064508, '2019-11-22 15:06:02', '2019-11-22 15:06:18', 51706622, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (125, 25, 1000064508, '2019-11-22 15:26:23', '2019-11-23 14:44:04', 56759839, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (126, 1, 1000064526, '2019-11-23 09:12:25', '2019-11-23 14:46:13', 62982129, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (127, 1, 1000064526, '2019-11-23 09:17:34', '2019-11-23 14:46:13', 33238082, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (128, 2, 1000064526, '2019-11-23 09:17:45', '2019-11-23 14:47:33', 46480992, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (129, 2, 1000064526, '2019-11-23 09:18:42', '2019-11-23 14:47:33', 55948250, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (130, 1, 1000064526, '2019-11-23 10:28:51', '2019-11-23 14:46:13', 36378366, '李增存', '柜子管理员');
INSERT INTO `uselog` VALUES (131, 1, 1000002368, '2019-11-23 14:46:50', NULL, 99360079, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (132, 19, 1000064508, '2019-11-23 14:47:58', '2019-11-23 14:49:53', 21749518, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (133, 43, 1000002368, '2019-11-23 14:48:47', NULL, 28522090, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (134, 10, 1000002368, '2019-11-23 14:49:27', NULL, 20150150, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (135, 25, 1000064508, '2019-11-23 14:50:30', NULL, 78470585, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (136, 25, 1000002368, '2019-11-23 14:50:30', NULL, 47934653, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (137, 33, 1000064508, '2019-11-23 14:51:59', '2019-11-23 15:08:24', 29720201, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (138, 33, 1000064508, '2019-11-23 14:52:21', '2019-11-23 15:08:24', 82747872, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (139, 33, 1000064508, '2019-11-23 14:52:49', '2019-11-23 15:08:24', 86338970, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (140, 33, 1000064508, '2019-11-23 15:08:40', NULL, 87887071, '冯建强', '管理员');
INSERT INTO `uselog` VALUES (141, 4, 1000002368, '2019-11-20 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (142, 4, 1000002368, '2019-11-19 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (143, 4, 1000002368, '2019-11-18 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (144, 4, 1000002368, '2019-11-17 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (145, 4, 1000002368, '2019-11-16 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (146, 4, 1000002368, '2019-11-14 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (147, 4, 1000002368, '2019-11-13 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (148, 4, 1000002368, '2019-11-12 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (149, 4, 1000002368, '2019-11-11 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (150, 4, 1000002368, '2019-11-10 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (151, 4, 1000002368, '2019-11-10 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (152, 4, 1000002368, '2019-11-10 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (153, 4, 1000002368, '2019-11-01 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (154, 4, 1000002368, '2019-11-02 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (155, 4, 1000002368, '2019-10-31 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (156, 4, 1000002368, '2019-10-30 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (157, 4, 1000002368, '2019-10-15 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (158, 4, 1000002368, '2019-10-16 09:35:16', '2019-11-23 15:51:39', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (159, 4, 1000002368, '2019-11-23 15:30:14', '2019-11-23 15:51:39', 33875113, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (160, 4, 1000002368, '2019-10-14 09:35:16', '2019-10-14 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (161, 4, 1000002368, '2019-10-13 09:35:16', '2019-10-13 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (162, 4, 1000002368, '2019-10-12 09:35:16', '2019-10-12 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (163, 4, 1000002368, '2019-10-11 09:35:16', '2019-10-11 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (164, 4, 1000002368, '2019-10-10 09:35:16', '2019-10-10 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (165, 4, 1000002368, '2019-10-09 09:35:16', '2019-10-09 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (166, 4, 1000002368, '2019-10-08 09:35:16', '2019-10-08 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (167, 4, 1000002368, '2019-10-07 09:35:16', '2019-10-07 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (168, 4, 1000002368, '2019-10-06 09:35:16', '2019-10-06 09:58:35', 98532207, '门禁安卓荣耀V10', '柜子管理员');
INSERT INTO `uselog` VALUES (169, 4, 1000002368, '2019-11-25 14:07:06', NULL, 95033556, '门禁安卓荣耀V10', '柜子管理员');

SET FOREIGN_KEY_CHECKS = 1;
