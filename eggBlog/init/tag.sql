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

 Date: 12/11/2019 16:42:31 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `tag`
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag` (
  `tag_name` varchar(10) NOT NULL COMMENT '标签名称',
  `tag_id` varchar(36) NOT NULL COMMENT '标签id',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `del_flag` varchar(1) NOT NULL DEFAULT 'Y' COMMENT '删除标志',
  PRIMARY KEY (`tag_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
