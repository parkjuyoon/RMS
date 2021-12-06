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
-- Table structure for table `GIS_EV_ITEM_TXN`
--

DROP TABLE IF EXISTS `GIS_EV_ITEM_TXN`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `GIS_EV_ITEM_TXN` (
  `ACPT_ORG_NM` varchar(20) DEFAULT NULL COMMENT '수용조직명',
  `BASE_DATE` varchar(20) DEFAULT NULL COMMENT 'YYYYMMDD',
  `BATCH_FLG` varchar(20) DEFAULT NULL COMMENT 'N',
  `BATCH_MSG` varchar(20) DEFAULT NULL COMMENT '배치결과 메시지',
  `CREATED` varchar(20) DEFAULT NULL COMMENT 'SYSDATE',
  `CUST_PTY_SBT_ID` varchar(20) DEFAULT NULL COMMENT '고객파티대체아이디',
  `CUST_SROW_ID` varchar(20) DEFAULT NULL COMMENT '고객로우아이디',
  `DATA_CHG_STTUS_CD` varchar(20) DEFAULT NULL COMMENT '데이터변경상태코드',
  `HSHLD_ARPU_AMT` varchar(20) DEFAULT NULL COMMENT '가구ARPU금액',
  `HSHLD_SEG_LCTG_NM` varchar(20) DEFAULT NULL COMMENT '가구세그먼트대분류명',
  `HSHLD_SEG_SCTG_NM` varchar(20) DEFAULT NULL COMMENT '가구세그먼트소분류명',
  `HSHLD_SEQ` varchar(20) DEFAULT NULL COMMENT '가구일련번호',
  `INET_CIRCUIT_NUM` varchar(20) DEFAULT NULL COMMENT '인터넷회선수',
  `INETGG_MAINT_CIRCUIT_NUM` varchar(20) DEFAULT NULL COMMENT '인터넷기가유지회선수',
  `INETMG_MAINT_CIRCUIT_NUM` varchar(20) DEFAULT NULL COMMENT '인터넷메가유지회선수',
  `IPTV_CIRCUIT_NUM` varchar(20) DEFAULT NULL COMMENT 'IPTV회선수',
  `GIS_HSHLD_ID` varchar(20) DEFAULT NULL COMMENT '통합가구아이디',
  `LAST_UPD` varchar(20) DEFAULT NULL COMMENT 'SYSDATE',
  `MBL_CIRCUIT_NUM` varchar(20) DEFAULT NULL COMMENT '모바일회선수',
  `MKT_PRIRT_NM` varchar(20) DEFAULT NULL COMMENT '영업우선순위명',
  `PSTN_CIRCUIT_NUM` varchar(20) DEFAULT NULL COMMENT 'PSTN회선수'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='가구';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `GIS_EV_ITEM_TXN`
--

LOCK TABLES `GIS_EV_ITEM_TXN` WRITE;
/*!40000 ALTER TABLE `GIS_EV_ITEM_TXN` DISABLE KEYS */;
/*!40000 ALTER TABLE `GIS_EV_ITEM_TXN` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 13:11:36
