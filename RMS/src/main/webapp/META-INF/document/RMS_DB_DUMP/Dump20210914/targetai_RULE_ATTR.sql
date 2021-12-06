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
-- Table structure for table `RULE_ATTR`
--

DROP TABLE IF EXISTS `RULE_ATTR`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `RULE_ATTR` (
  `RULE_ATTR_ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'RULE 속성 아이디',
  `RULE_ID` int(11) NOT NULL COMMENT 'RULE 테이블의 ID',
  `ATTR_WHEN` varchar(500) NOT NULL COMMENT 'DRL 파일에서 사용되는 RULE 속성 WHEN 구문',
  `ATTR_WHEN_CONTENTS` varchar(500) NOT NULL COMMENT '화면에 보여주기 위한 RULE 속성 WHEN 구문',
  `FACTOR_GRP_NM` varchar(100) DEFAULT NULL,
  `FACTOR_ID` int(11) DEFAULT NULL,
  `FACTOR_NM` varchar(100) DEFAULT NULL COMMENT '속성(요소)명',
  `FACTOR_NM_EN` varchar(200) DEFAULT NULL COMMENT '속성(요소) 영문명',
  `FACTOR_VAL` varchar(100) DEFAULT NULL COMMENT '속성(요소)값',
  `LOGICAL` varchar(45) DEFAULT NULL COMMENT '논리연산 속성(==, <, >, <=, >=, in, not in)',
  `RELATION` varchar(45) DEFAULT NULL COMMENT '관계속성 (&&, ||, 빈값)',
  PRIMARY KEY (`RULE_ATTR_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=767 DEFAULT CHARSET=utf8 COMMENT='RULE 속성관련 테이블';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `RULE_ATTR`
--

LOCK TABLES `RULE_ATTR` WRITE;
/*!40000 ALTER TABLE `RULE_ATTR` DISABLE KEYS */;
INSERT INTO `RULE_ATTR` VALUES (569,153,'this[\"INSUR_PROD_SBSC_YN\"]==\"N\" &&\n','[계약 : 보험상품가입여부] ==\"N\" AND','계약',1295,'보험상품가입여부','INSUR_PROD_SBSC_YN','\"N\"','==','&&'),(570,153,'this[\"RSAL_TYPE_NM\"]in(\"ㆍ값없음\", \"순수판매\") &&\n','[계약 : 재판매유형명] in(\"ㆍ값없음\", \"순수판매\") AND','계약',12138,'재판매유형명','RSAL_TYPE_NM','(\"ㆍ값없음\", \"순수판매\")','in','&&'),(571,153,'this[\"USE_PURP_DIV_NM\"]not in(\"선불\", \"업무용\") &&\n','[계약 : 사용용도구분명] not in(\"선불\", \"업무용\") AND','계약',12139,'사용용도구분명','USE_PURP_DIV_NM','(\"선불\", \"업무용\")','not in','&&'),(572,153,'this[\"NOW_HNDSET_USE_DAY_NUM\"]<30 \n','[계약 : 현단말기사용일수] <30 ','계약',1255,'현단말기사용일수','NOW_HNDSET_USE_DAY_NUM','30','<',''),(657,154,'this[\"EC_CUST_YN\"]==\"N\" &&\n','[고객 : EC고객여부] ==\"N\" AND\n','고객',1154,'EC고객여부','EC_CUST_YN','\"N\"','==','&&'),(658,154,'this[\"IPTV_SBSC_YN\"]==\"N\" &&\n','[고객 : IPTV가입여부] ==\"N\" AND\n','고객',1137,'IPTV가입여부','IPTV_SBSC_YN','\"N\"','==','&&'),(659,154,'this[\"INET_SBSC_YN\"]==\"N\"','[고객 : 인터넷가입여부] ==\"N\"','고객',1126,'인터넷가입여부','INET_SBSC_YN','\"N\"','==',''),(759,172,'( eval(main(\"interested\", 30) == true) ||\n','( DaySinceLastEvent(\"interested\", 30) == true OR\n','함수',21,'최대반응일수','DaySinceLastEvent','true','==','||'),(760,172,'eval(main(\"uninterested\", 30) == true)) &&\n','DaySinceLastEvent(\"uninterested\", 30) == true) AND\n','함수',21,'최대반응일수','DaySinceLastEvent','true','==','&&'),(761,172,'this[\"INET_COMB_YN\"]==\"Y\" &&\n','[고객 : 인터넷결합여부] ==\"Y\" AND\n','고객',114,'인터넷결합여부','INET_COMB_YN','\"Y\"','==','&&'),(762,172,'eval(main(\"accepted\", 30) == true)','DaySinceLastEvent(\"accepted\", 30) == true','함수',21,'최대반응일수','DaySinceLastEvent','true','==',''),(763,173,'this[\"MPHON_SBSC_YN\"]==\"Y\"','[고객 : 이동전화가입여부] ==\"Y\"','고객',1114,'이동전화가입여부','MPHON_SBSC_YN','\"Y\"','==',''),(764,174,'this[\"CUST_CLAS_NM\"]==\"Gold\" &&\n','[고객 : 고객등급명] ==\"Gold\" AND\n','고객',1143,'고객등급명','CUST_CLAS_NM','\"Gold\"','==','&&'),(765,174,'this[\"NPAY_YN\"]==\"N\" &&\n','[고객 : 미납여부] ==\"N\" AND\n','고객',1145,'미납여부','NPAY_YN','\"N\"','==','&&'),(766,174,'this[\"SBSC_AFTR_ELAPS_MONS_NUM\"]>30','[계약 : 가입후경과개월수] >30','계약',128,'가입후경과개월수','SBSC_AFTR_ELAPS_MONS_NUM','30','>','');
/*!40000 ALTER TABLE `RULE_ATTR` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 13:11:37
