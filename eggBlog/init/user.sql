/*
 Navicat Premium Data Transfer

 Source Server         : admin
 Source Server Type    : MySQL
 Source Server Version : 50644
 Source Host           : lurenhong.top
 Source Database       : blog

 Target Server Type    : MySQL
 Target Server Version : 50644
 File Encoding         : utf-8

 Date: 12/11/2019 16:42:39 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '用户id',
  `password` varchar(40) NOT NULL COMMENT '用户密码',
  `name` varchar(20) NOT NULL COMMENT '用户名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 ROW_FORMAT=COMPACT;

-- ----------------------------
--  Records of `user`
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('wanghong', '1', '7c4a8d09ca3762af61e59520943dc26494f8941b', '前端逐梦人');
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
