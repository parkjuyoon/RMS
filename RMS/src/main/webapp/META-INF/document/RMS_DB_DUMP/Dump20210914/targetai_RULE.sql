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
-- Table structure for table `RULE`
--

DROP TABLE IF EXISTS `RULE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RULE` (
  `RULE_ID` int(11) NOT NULL AUTO_INCREMENT,
  `RULE_NM` varchar(100) NOT NULL,
  `NO_LOOP` varchar(10) NOT NULL DEFAULT 'true' COMMENT '무한루프를 막아주는 옵션',
  `LOCK_ON_ACTIVE` varchar(10) NOT NULL DEFAULT 'true',
  `AGENDA_GRP` varchar(10) DEFAULT NULL,
  `SALIENCE` int(11) DEFAULT '1' COMMENT 'RULE 실행 순서',
  `EFFECTIVE_DT` timestamp NULL DEFAULT NULL COMMENT '설정한 날짜에만 룰이 동작하는 옵션',
  `EXPIRES_DT` timestamp NULL DEFAULT NULL COMMENT '설정한 날짜까지만 룰이 동작하는 옵션',
  `ENABLED` varchar(10) DEFAULT NULL,
  `DURATION` varchar(10) DEFAULT NULL,
  `ATTR_THEN` varchar(500) DEFAULT NULL,
  `NUM_OF_TGT` int(11) DEFAULT NULL,
  `PKG_ID` int(11) NOT NULL COMMENT 'PACKAGE 아이디',
  `CAMP_ID` varchar(20) DEFAULT NULL COMMENT 'CAMPAIGN 아이디',
  `TARGET_TYPE` varchar(45) NOT NULL COMMENT '고객레벨 / 계약레벨',
  `REG_DT` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'RULE 등록일',
  `REG_USRID` varchar(100) NOT NULL COMMENT '등록자',
  `UDT_DT` timestamp NULL DEFAULT NULL COMMENT '수정일',
  `UDT_USRID` varchar(100) DEFAULT NULL COMMENT '수정자',
  PRIMARY KEY (`RULE_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=175 DEFAULT CHARSET=utf8 COMMENT='RULE 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RULE`
--

LOCK TABLES `RULE` WRITE;
/*!40000 ALTER TABLE `RULE` DISABLE KEYS */;
INSERT INTO `RULE` VALUES (153,'모바일','true','true',NULL,1,NULL,NULL,NULL,NULL,'$map.put(\"ruleId_153\", 153);\n		$map.put(\"campId_153\", null);\n		$map.put(\"salience_153\", 1);\n		$map.put(\"ruleNm_153\", \"모바일\");\n		$map.put(\"targetType_153\", \"CUST\");\n		$map.put(\"functionYn_153\", \"Y\");',NULL,88,NULL,'CUST','2021-07-23 05:57:02','admin','2021-07-23 07:53:57',NULL),(154,'IPTV','true','true',NULL,1,NULL,NULL,NULL,NULL,'$map.put(\"ruleId_154\", 154);\n		$map.put(\"campId_154\", null);\n		$map.put(\"salience_154\", 1);\n		$map.put(\"ruleNm_154\", \"IPTV\");\n		$map.put(\"targetType_154\", \"CUST\");\n		$map.put(\"functionYn_154\", \"Y\");',NULL,88,NULL,'CUST','2021-07-23 06:13:10','admin','2021-08-11 05:36:14',NULL),(172,'첫번째','true','true',NULL,1,NULL,NULL,NULL,NULL,'$map.put(\"ruleId_172\", 172);\n		$map.put(\"campId_172\", null);\n		$map.put(\"salience_172\", 1);\n		$map.put(\"ruleNm_172\", \"첫번째\");\n		$map.put(\"targetType_172\", \"CUST\");',NULL,90,NULL,'CUST','2021-08-11 06:19:13','admin','2021-08-19 09:04:45',NULL),(173,'두번째','true','true',NULL,1,NULL,NULL,NULL,NULL,'$map.put(\"ruleId_173\", 173);\n		$map.put(\"campId_173\", null);\n		$map.put(\"salience_173\", 1);\n		$map.put(\"ruleNm_173\", \"두번째\");\n		$map.put(\"targetType_173\", \"CUST\");',NULL,90,NULL,'CUST','2021-09-02 01:57:29','admin',NULL,NULL),(174,'kkk_1','true','true',NULL,3,NULL,NULL,NULL,NULL,'$map.put(\"ruleId_174\", 174);\n		$map.put(\"campId_174\", null);\n		$map.put(\"salience_174\", 3);\n		$map.put(\"ruleNm_174\", \"kkk_1\");\n		$map.put(\"targetType_174\", \"CUST\");\n		$map.put(\"functionYn_174\", \"N\");',NULL,91,NULL,'CUST','2021-09-02 09:02:48','admin',NULL,NULL);
/*!40000 ALTER TABLE `RULE` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 13:11:34
