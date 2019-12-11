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

 Date: 12/11/2019 16:42:16 PM
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
--  Table structure for `article`
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `title` varchar(100) NOT NULL COMMENT '博客title',
  `content` text NOT NULL COMMENT '博客内容',
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP COMMENT '更新时间',
  `read_count` int(11) DEFAULT '0' COMMENT '阅读数',
  `id` varchar(36) NOT NULL COMMENT '博客id',
  `comment_count` int(11) DEFAULT '0' COMMENT '评论数',
  `status` int(11) DEFAULT '0' COMMENT '博客状态 0-草稿 1-发布',
  `del_flag` varchar(255) DEFAULT 'Y' COMMENT '删除标志',
  `only` int(11) NOT NULL AUTO_INCREMENT COMMENT '唯一值',
  PRIMARY KEY (`only`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
