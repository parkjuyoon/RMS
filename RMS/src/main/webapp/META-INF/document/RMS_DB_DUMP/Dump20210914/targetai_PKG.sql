-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: ktdscoe.asuscomm.com    Database: targetai
-- ------------------------------------------------------
-- Server version	5.7.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `PKG`
--

DROP TABLE IF EXISTS `PKG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `PKG` (
  `PKG_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'PACKAGE 아이디',
  `PKG_NM` varchar(100) NOT NULL COMMENT 'PACKAGE 명',
  `DRL_NM` varchar(100) DEFAULT NULL COMMENT 'DRL 파일명',
  `DRL_SOURCE` varchar(4000) DEFAULT NULL COMMENT 'DRL 파일 내용',
  `DIALECT` varchar(45) NOT NULL DEFAULT 'mvel',
  `PATH` varchar(100) DEFAULT NULL COMMENT 'PACKAGE 물리적 위치',
  `PKG_DSC` varchar(2000) DEFAULT NULL COMMENT '패키지 설명',
  `REG_USRID` varchar(100) NOT NULL COMMENT '등록자',
  `REG_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '등록일',
  `UDT_USRID` varchar(100) DEFAULT NULL COMMENT '수정자',
  `UDT_DT` timestamp NULL DEFAULT NULL COMMENT '수정일자',
  PRIMARY KEY (`PKG_ID`,`PKG_NM`),
  UNIQUE KEY `PKG_ID_UNIQUE` (`PKG_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=92 DEFAULT CHARSET=utf8 COMMENT='PACKAGE 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PKG`
--

LOCK TABLES `PKG` WRITE;
/*!40000 ALTER TABLE `PKG` DISABLE KEYS */;
INSERT INTO `PKG` VALUES (88,'itgoffer','itgoffer_88.drl','package itgoffer\nimport java.util.Map\n\nrule \"모바일\"\n	no-loop true\n	lock-on-active true\n	salience 1\n	when\n		$map : Map(\n		this[\"INSUR_PROD_SBSC_YN\"]==\"N\" &&\n		this[\"RSAL_TYPE_NM\"]in(\"ㆍ값없음\", \"순수판매\") &&\n		this[\"USE_PURP_DIV_NM\"]not in(\"선불\", \"업무용\") &&\n		this[\"NOW_HNDSET_USE_DAY_NUM\"]<30 \n	)\n	then\n		$map.put(\"ruleId_153\", 153);\n		$map.put(\"campId_153\", null);\n		$map.put(\"salience_153\", 1);\n		$map.put(\"ruleNm_153\", \"모바일\");\n		$map.put(\"targetType_153\", \"CUST\");\n		$map.put(\"functionYn_153\", \"Y\");\nend\n\nrule \"IPTV\"\n	no-loop true\n	lock-on-active true\n	salience 1\n	when\n		$map : Map(\n		this[\"EC_CUST_YN\"]==\"N\" &&\n		this[\"IPTV_SBSC_YN\"]==\"N\" &&\n		this[\"INET_SBSC_YN\"]==\"N\"	)\n	then\n		$map.put(\"ruleId_154\", 154);\n		$map.put(\"campId_154\", null);\n		$map.put(\"salience_154\", 1);\n		$map.put(\"ruleNm_154\", \"IPTV\");\n		$map.put(\"targetType_154\", \"CUST\");\n		$map.put(\"functionYn_154\", \"Y\");\nend\n\n','mvel','/drl_files','통합오퍼링','admin','2021-07-23 05:44:00',NULL,NULL),(90,'test','test_90.drl','package test;\nimport java.util.Map;\nimport static egovframework.ktds.targetai.function.DaySinceLastEvent.*;\n\nrule \"첫번째\"\n	no-loop true\n	lock-on-active true\n	salience 1\n	when\n		$map : Map(\n		( eval(main(\"interested\", 30) == true) ||\n		eval(main(\"uninterested\", 30) == true)) &&\n		this[\"INET_COMB_YN\"]==\"Y\" &&\n		eval(main(\"accepted\", 30) == true)	)\n	then\n		$map.put(\"ruleId_172\", 172);\n		$map.put(\"campId_172\", null);\n		$map.put(\"salience_172\", 1);\n		$map.put(\"ruleNm_172\", \"첫번째\");\n		$map.put(\"targetType_172\", \"CUST\");\nend\n\nrule \"두번째\"\n	no-loop true\n	lock-on-active true\n	salience 1\n	when\n		$map : Map(\n		this[\"MPHON_SBSC_YN\"]==\"Y\"	)\n	then\n		$map.put(\"ruleId_173\", 173);\n		$map.put(\"campId_173\", null);\n		$map.put(\"salience_173\", 1);\n		$map.put(\"ruleNm_173\", \"두번째\");\n		$map.put(\"targetType_173\", \"CUST\");\nend\n\n','mvel','/drl_files','1','admin','2021-08-11 05:56:59',NULL,NULL),(91,'kkk','kkk_91.drl','package kkk\nimport java.util.Map\n\nrule \"kkk_1\"\n	no-loop true\n	lock-on-active true\n	salience 3\n	when\n		$map : Map(\n		this[\"CUST_CLAS_NM\"]==\"Gold\" &&\n		this[\"NPAY_YN\"]==\"N\" &&\n		this[\"SBSC_AFTR_ELAPS_MONS_NUM\"]>30	)\n	then\n		$map.put(\"ruleId_174\", 174);\n		$map.put(\"campId_174\", null);\n		$map.put(\"salience_174\", 3);\n		$map.put(\"ruleNm_174\", \"kkk_1\");\n		$map.put(\"targetType_174\", \"CUST\");\n		$map.put(\"functionYn_174\", \"N\");\nend\n\n','mvel','/drl_files','시험','admin','2021-09-02 08:59:09',NULL,NULL);
/*!40000 ALTER TABLE `PKG` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 13:11:31
