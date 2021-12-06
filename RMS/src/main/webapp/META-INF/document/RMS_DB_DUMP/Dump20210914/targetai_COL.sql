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
-- Table structure for table `COL`
--

DROP TABLE IF EXISTS `COL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COL` (
  `SEQ` int(11) NOT NULL AUTO_INCREMENT COMMENT '아이디',
  `TBL_SEQ` int(11) NOT NULL COMMENT 'TABLE 아이디',
  `COL_NM` varchar(45) NOT NULL COMMENT 'COLUMN 명',
  `DTYPE` varchar(10) NOT NULL COMMENT 'DATA TYPE',
  `COL_DSC` varchar(500) DEFAULT NULL COMMENT 'COLUMN 설명',
  `COL_SIZE` int(11) NOT NULL COMMENT 'COLUMN 사이즈',
  `NULL_YN` char(1) NOT NULL COMMENT 'NULL 여부',
  PRIMARY KEY (`SEQ`),
  UNIQUE KEY `ID_UNIQUE` (`SEQ`),
  KEY `FK_TBL_ID_idx` (`TBL_SEQ`)
) ENGINE=InnoDB AUTO_INCREMENT=323 DEFAULT CHARSET=utf8 COMMENT='COLUMN 정보';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COL`
--

LOCK TABLES `COL` WRITE;
/*!40000 ALTER TABLE `COL` DISABLE KEYS */;
INSERT INTO `COL` VALUES (1,1,'acc_cust_srow_id','VARCHAR','고객로우아이디',20,'N'),(2,1,'src_cust_sorc_id','VARCHAR','원천고객소스아이디',20,'N'),(3,1,'cust_pty_sbt_id','VARCHAR','고객파티대체아이디',20,'N'),(4,1,'inet_comb_yn','VARCHAR','인터넷결합여부',20,'N'),(5,1,'iptv_comb_yn','VARCHAR','IPTV결합여부',20,'N'),(6,1,'pstn_comb_yn','VARCHAR','PSTN결합여부',20,'N'),(7,1,'mphon_comb_yn','VARCHAR','이동전화결합여부',20,'N'),(8,1,'efct_pstn_sbsc_cascnt','VARCHAR','유효PSTN가입건수',20,'N'),(9,1,'efct_mphon_sbsc_cascnt','VARCHAR','유효이동전화가입건수',20,'N'),(10,1,'efct_soip_sbsc_cascnt','VARCHAR','유효SOIP가입건수',20,'N'),(11,1,'efct_inet_sbsc_cascnt','VARCHAR','유효인터넷가입건수',20,'N'),(12,1,'efct_iptv_sbsc_cascnt','VARCHAR','유효IPTV가입건수',20,'N'),(13,1,'efct_wibro_sbsc_cascnt','VARCHAR','유효와이브로가입건수',20,'N'),(14,1,'mphon_sbsc_yn','VARCHAR','이동전화가입여부',20,'N'),(15,1,'mphon_engt_exp_rperd_itg_cd','VARCHAR','이동전화약정만료잔여기간통합코드',20,'N'),(16,1,'mphon_engt_exp_rmnd_mons_num','VARCHAR','이동전화약정만료잔여개월수',20,'N'),(17,1,'mphon_aftmn_eperd_itg_cd','VARCHAR','이동전화해지후경과기간통합코드',20,'N'),(18,1,'mphon_aftmn_elaps_mons_num','VARCHAR','이동전화해지후경과개월수',20,'N'),(19,1,'smph_use_yn','VARCHAR','스마트폰여부',20,'N'),(20,1,'kids_adtn_svc_sbsc_yn','VARCHAR','아동부가서비스가입여부',20,'N'),(21,1,'age_itg_cd','VARCHAR','연령통합코드',20,'N'),(22,1,'cust_age','VARCHAR','고객연령',20,'N'),(23,1,'olcb_sbsc_yn','VARCHAR','올레클럽가입여부',20,'N'),(24,1,'inet_sbsc_eperd_itg_cd','VARCHAR','인터넷가입경과기간통합코드',20,'N'),(25,1,'inet_sbsc_elaps_mons_num','VARCHAR','인터넷가입경과개월수',20,'N'),(26,1,'inet_sbsc_yn','VARCHAR','인터넷가입여부',20,'N'),(27,1,'inet_engt_exp_rperd_itg_cd','VARCHAR','인터넷약정만료잔여기간통합코드',20,'N'),(28,1,'inet_engt_exp_rmnd_mons_num','VARCHAR','인터넷약정만료잔여개월수',20,'N'),(29,1,'inet_aftmn_eperd_itg_cd','VARCHAR','인터넷해지후경과기간통합코드',20,'N'),(30,1,'inet_aftmn_elaps_mons_num','VARCHAR','인터넷해지후경과개월수',20,'N'),(31,1,'soip_sbsc_yn','VARCHAR','SOIP가입여부',20,'N'),(32,1,'pstn_sbsc_yn','VARCHAR','PSTN가입여부',20,'N'),(33,1,'r6m_inet_pssn_comb_yn','VARCHAR','최근6개월인터넷보유결합여부',20,'N'),(34,1,'pad_use_yn','VARCHAR','패드사용여부',20,'N'),(35,1,'r3m_ppv_avg_use_amt','VARCHAR','최근3개월PPV평균사용금액',20,'N'),(36,1,'tm_medi_tch_posbl_yn','VARCHAR','텔레마케팅거부여부',20,'N'),(37,1,'iptv_sbsc_yn','VARCHAR','IPTV가입여부',20,'N'),(38,1,'iptv_engt_exp_rperd_itg_cd','VARCHAR','IPTV약정만료잔여기간통합코드',20,'N'),(39,1,'iptv_engt_exp_rmnd_mons_num','VARCHAR','IPTV약정만료잔여개월수',20,'N'),(40,1,'sex_type_itg_cd','VARCHAR','성별유형통합코드',20,'N'),(41,1,'sex_type_nm','VARCHAR','성별유형명',20,'N'),(42,1,'conta_srow_id','VARCHAR','컨택로우아이디',20,'N'),(43,1,'cust_clas_nm','VARCHAR','고객등급명',20,'N'),(44,1,'dt_stop_yn','VARCHAR','일시정지여부',20,'N'),(45,1,'npay_yn','VARCHAR','미납여부',20,'N'),(46,1,'cust_acc_no','VARCHAR','GENESIS고객소스아이디',20,'N'),(47,1,'cust_ctg_type_itg_cd','VARCHAR','고객분류유형통합코드',20,'N'),(48,1,'cust_ctg_type_nm','VARCHAR','고객분류유형명',20,'N'),(49,1,'r3m_iptv_avg_arpu_amt','VARCHAR','최근3개월IPTV평균ARPU금액',20,'N'),(50,1,'r3m_mphon_avg_arpu_amt','VARCHAR','최근3개월이동전화평균ARPU금액',20,'N'),(51,1,'r3m_inet_avg_arpu_amt','VARCHAR','최근3개월인터넷평균ARPU금액',20,'N'),(52,1,'r6m_mphon_avg_arpu_amt','VARCHAR','최근6개월이동전화평균ARPU금액',20,'N'),(53,1,'r6m_inet_avg_arpu_amt','VARCHAR','최근6개월인터넷평균ARPU금액',20,'N'),(54,1,'ec_cust_yn','VARCHAR','EC고객여부',20,'N'),(55,1,'indv_info_colec_use_agree_yn','VARCHAR','개인정보수집사용동의여부',20,'N'),(56,1,'indv_info_handl_csgn_agree_yn_cust','VARCHAR','개인정보취급위탁동의여부',20,'N'),(57,1,'vip_adm_tag_itg_cd','VARCHAR','VIP관리태그통합코드',20,'N'),(58,1,'ginet_use_yn','VARCHAR','기가인터넷사용여부',20,'N'),(59,1,'action','VARCHAR','적재유형코드',20,'N'),(60,2,'cust_srow_id','VARCHAR','계정고객로우아이디',20,'N'),(61,2,'asset_srow_id','VARCHAR','계약로우아이디',20,'N'),(62,2,'src_cust_sorc_id','VARCHAR','원천고객소스아이디',20,'N'),(63,2,'cont_sbt_id','VARCHAR','계약대체아이디',20,'N'),(64,2,'svc_cont_id','VARCHAR','서비스계약아이디',20,'N'),(65,2,'r3m_iptv_avg_use_time','VARCHAR','최근3개월IPTV평균사용시간',20,'N'),(66,2,'sbsc_aftr_eperd_itg_cd','VARCHAR','가입후경과기간통합코드',20,'N'),(67,2,'sbsc_aftr_elaps_mons_num','VARCHAR','가입후경과개월수',20,'N'),(68,2,'comb_exp_rperd_itg_cd','VARCHAR','결합만료잔여기간통합코드',20,'N'),(69,2,'comb_engt_exp_rmnd_mons_num','VARCHAR','결합약정만료잔여개월수',20,'N'),(70,2,'rmonth_ppv_use_chage','VARCHAR','최근월PPV사용요금',20,'N'),(71,2,'bas_data_noprovd_chage_syst_yn','VARCHAR','기본데이터미제공요금제여부',20,'N'),(72,2,'data_adtn_svc_sbsc_yn','VARCHAR','데이터부가서비스가입여부',20,'N'),(73,2,'hndset_model_div_itg_cd','VARCHAR','단말기모델구분통합코드',20,'N'),(74,2,'smph_yn','VARCHAR','스마트폰여부',20,'N'),(75,2,'r3m_iptv_use_ch_group_cascnt','VARCHAR','최근3개월IPTV사용채널그룹건수',20,'N'),(76,2,'engt_exp_rperd_itg_cd','VARCHAR','약정만료잔여기간통합코드',20,'N'),(77,2,'engt_yn','VARCHAR','약정여부',20,'N'),(78,2,'engt_rmnd_mons_num','VARCHAR','약정잔여개월수',20,'N'),(79,2,'rmonth_iptv_movie_use_tmscnt','VARCHAR','최근월IPTV영화사용횟수',20,'N'),(80,2,'pmon_ppv_use_chage','VARCHAR','전월PPV사용요금',20,'N'),(81,2,'free_tlk_data_chage_syst_yn','VARCHAR','무료통화데이터요금제여부',20,'N'),(82,2,'r3m_free_qnt_excs_mons_num','VARCHAR','최근3개월무료량초과개월수',20,'N'),(83,2,'r3m_iptv_hifqe_ch_group_itg_cd','VARCHAR','최근3개월IPTV최빈채널그룹통합코드',20,'N'),(84,2,'iptv_ch_group_nm','VARCHAR','IPTV채널그룹명',20,'N'),(85,2,'recnt_rwrd_icg_date','VARCHAR','최근보상기기변경일자',20,'N'),(86,2,'rwrd_icg_yn','VARCHAR','보상기기변경여부',20,'N'),(87,2,'bprod_sbt_id','VARCHAR','기본상품대체아이디',20,'N'),(88,2,'bprod_group_nm','VARCHAR','기본상품그룹명',20,'N'),(89,2,'bprod_nm','VARCHAR','기본상품명',20,'N'),(90,2,'svc_no_sorc_id','VARCHAR','서비스번호소스아이디',20,'N'),(91,2,'r3m_avg_arpu_amt','VARCHAR','최근3개월평균ARPU금액',20,'N'),(92,2,'ots_sbsc_yn','VARCHAR','OTS가입여부',20,'N'),(93,2,'rmonth_iptv_rply_use_tmscnt','VARCHAR','최근월IPTV다시보기사용횟수',20,'N'),(94,2,'scpd_sorc_id','VARCHAR','원천상품소스아이디',20,'N'),(95,2,'now_chage_prod_sbsc_date','VARCHAR','현요금상품가입일자',20,'N'),(96,2,'cont_sttus_itg_cd','VARCHAR','계약상태통합코드',20,'N'),(97,2,'cont_sttus_group_nm','VARCHAR','계약상태그룹명',20,'N'),(98,2,'r3m_wless_data_use_qnt','VARCHAR','최근3개월무선데이터사용량',20,'N'),(99,2,'rmonth_wless_data_use_qnt','VARCHAR','최근월무선데이터사용량',20,'N'),(100,2,'conta_srow_id','VARCHAR','컨택로우아이디',20,'N'),(101,2,'mphon_comb_circuit_num','VARCHAR','이동전화결합회선수',20,'N'),(102,2,'inet_comb_circuit_num','VARCHAR','인터넷결합회선수',20,'N'),(103,2,'pstn_comb_circuit_num','VARCHAR','PSTN결합회선수',20,'N'),(104,2,'hndset_model_div_nm','VARCHAR','단말기모델구분명',20,'N'),(105,2,'svc_use_mons_num','VARCHAR','서비스사용개월수',20,'N'),(106,2,'rmonth_tot_bill_amt','VARCHAR','최근월총청구금액',20,'N'),(107,2,'hndset_model_nm','VARCHAR','단말기모델명',20,'N'),(108,2,'entr_prod_nm','VARCHAR','단말기모델전사상품명',20,'N'),(109,2,'genesis_cust_sorc_id','VARCHAR','GENESIS고객소스아이디',20,'N'),(110,2,'cust_dtl_ctg_itg_cd','VARCHAR','고객상세분류통합코드',20,'N'),(111,2,'cust_dtl_ctg_nm','VARCHAR','고객상세분류명',20,'N'),(112,2,'new_date','VARCHAR','신규일자',20,'N'),(113,2,'r6m_avg_arpu_amt','VARCHAR','최근6개월평균ARPU금액',20,'N'),(114,2,'now_hndset_use_day_num','VARCHAR','현단말기사용일수',20,'N'),(115,2,'spnsr_engt_aply_st_date','VARCHAR','스폰서약정적용시작일자',20,'N'),(116,2,'spnsr_engt_exp_pam_date','VARCHAR','스폰서약정만료예정일자',20,'N'),(117,2,'no_mov_aftr_bizr_itg_cd','VARCHAR','번호이동후사업자통합코드',20,'N'),(118,2,'no_mov_pre_bizr_itg_cd','VARCHAR','번호이동전사업자통합코드',20,'N'),(119,2,'svc_rl_use_day_num','VARCHAR','서비스실사용일수',20,'N'),(120,2,'cust_rne_dc_yn','VARCHAR','고객감면할인여부',20,'N'),(121,2,'wlfr_dc_yn','VARCHAR','복지할인여부',20,'N'),(122,2,'inet_ownt_yn','VARCHAR','인터넷자가망여부',20,'N'),(123,2,'inet_reengt_bfac_rsrv_yn','VARCHAR','인터넷재약정사전예약여부',20,'N'),(124,2,'infm_dscli_yn','VARCHAR','인터넷패밀리자회선여부',20,'N'),(125,2,'infm_motli_yn','VARCHAR','인터넷패밀리모회선여부',20,'N'),(126,2,'lincome_dc_yn','VARCHAR','저소득층할인여부',20,'N'),(127,2,'comb_svc_sbt_id','VARCHAR','결합서비스대체아이디',20,'N'),(128,2,'comb_svc_nm','VARCHAR','결합서비스명',20,'N'),(129,2,'comb_dc_type_itg_cd','VARCHAR','결합할인유형통합코드',20,'N'),(130,2,'anals_5_prod_level_id','VARCHAR','분석5상품수준아이디',20,'N'),(131,2,'online_sbsc_div_itg_cd','VARCHAR','온라인가입구분통합코드',20,'N'),(132,2,'engt_perd_itg_cd','VARCHAR','약정기간통합코드',20,'N'),(133,2,'stpbx_model_nm','VARCHAR','셋톱박스모델명',20,'N'),(134,2,'stpbx_use_mons_num','VARCHAR','셋톱박스사용개월수',20,'N'),(135,2,'stpbx_makr_nm','VARCHAR','셋톱박스제조사명',20,'N'),(136,2,'sale_cpnt_sbt_id','VARCHAR','판매접점대체아이디',20,'N'),(137,2,'cpnt_type_div_itg_cd','VARCHAR','접점유형구분통합코드',20,'N'),(138,2,'mphon_ch_type_itg_cd','VARCHAR','이동전화채널유형통합코드',20,'N'),(139,2,'mphon_sale_path_itg_cd','VARCHAR','이동전화판매경로통합코드',20,'N'),(140,2,'mphon_sale_type_itg_cd','VARCHAR','이동전화판매유형통합코드',20,'N'),(141,2,'bef_hndset_model_nm','VARCHAR','이전단말기모델명',20,'N'),(142,2,'bhs_model_div_itg_cd','VARCHAR','이전단말기모델구분통합코드',20,'N'),(143,2,'bhs_model_div_nm','VARCHAR','이전단말기모델구분명',20,'N'),(144,2,'ginet_fclt_prv_forml_itg_cd','VARCHAR','기가인터넷시설제공방식통합코드',20,'N'),(145,2,'prnt_ebldg_ginet_prv_date','VARCHAR','모설치건물기가인터넷제공일자',20,'N'),(146,2,'ebldg_ginet_prv_date','VARCHAR','설치건물기가인터넷제공일자',20,'N'),(147,2,'ldup_type_cd','VARCHAR','적재유형코드',20,'N'),(148,2,'mship_rmnd_score','VARCHAR','멤버십잔여점수',20,'N'),(149,2,'hndset_rmnd_insl_mons_num','VARCHAR','단말기잔여할부개월수',20,'N'),(150,2,'hndset_rmnd_insl_amt','VARCHAR','단말기잔여할부금액',20,'N'),(151,2,'hsmvn_cont_yn','VARCHAR','이사계약여부',20,'N'),(152,2,'indv_info_handl_csgn_agree_yn','VARCHAR','개인정보취급위탁동의여부',20,'N'),(153,2,'insur_prod_div_itg_cd','VARCHAR','보험상품구분통합코드',20,'N'),(154,2,'insur_prod_sbsc_yn','VARCHAR','보험상품가입여부',20,'N'),(155,2,'inet_reengt_type_itg_cd','VARCHAR','인터넷재약정유형통합코드',20,'N'),(156,2,'tv_apd_terml_yn','VARCHAR','TV추가단말여부',20,'N'),(157,2,'data_tot_prv_qnt','VARCHAR','데이터총제공량',20,'N'),(158,2,'lstday_data_use_qnt','VARCHAR','말일데이터사용량',20,'N'),(159,2,'lstday_data_exhs_rate','VARCHAR','말일데이터소진율',20,'N'),(160,2,'avg_3m_data_exhs_rate','VARCHAR','평균3개월데이터소진율',20,'N'),(161,2,'r3m_data_charg_yn','VARCHAR','최근3개월데이터충전여부',20,'N'),(162,2,'otm_data_use_qnt','VARCHAR','OTM데이터사용량',20,'N'),(163,2,'pooq_data_use_qnt','VARCHAR','POOQ데이터사용량',20,'N'),(164,2,'nvms_data_use_qnt','VARCHAR','네이버뮤직데이터사용량',20,'N'),(165,2,'meln_data_use_qnt','VARCHAR','멜론데이터사용량',20,'N'),(166,2,'bugs_data_use_qnt','VARCHAR','벅스데이터사용량',20,'N'),(167,2,'mnet_data_use_qnt','VARCHAR','엠넷데이터사용량',20,'N'),(168,2,'gni_data_use_qnt','VARCHAR','지니데이터사용량',20,'N'),(169,2,'tvng_data_use_qnt','VARCHAR','티빙데이터사용량',20,'N'),(170,2,'otcom_mbl_use_hndset_num','VARCHAR','타사모바일사용단말기수',20,'N'),(171,2,'otcom_presm_exp_hndset_num','VARCHAR','타사추정만료단말기수',20,'N'),(172,2,'inet_presm_bizr_sorc_id','VARCHAR','인터넷추정사업자소스아이디',20,'N'),(173,2,'tv_presm_bizr_sorc_id','VARCHAR','TV추정사업자소스아이디',20,'N'),(174,2,'olcb_sbsc_sttus_itg_cd','VARCHAR','올레클럽가입상태통합코드',20,'N'),(175,2,'r3m_mship_point_use_tmscnt','VARCHAR','최근3개월멤버십포인트사용횟수',20,'N'),(176,2,'r6m_mship_point_use_tmscnt','VARCHAR','최근6개월멤버십포인트사용횟수',20,'N'),(177,2,'r1y_mship_point_use_tmscnt','VARCHAR','최근1년멤버십포인트사용횟수',20,'N'),(178,2,'r3m_vipchc_use_tmscnt','VARCHAR','최근3개월VIP초이스사용횟수',20,'N'),(179,2,'r6m_vipchc_use_tmscnt','VARCHAR','최근6개월VIP초이스사용횟수',20,'N'),(180,2,'r3m_dbl_dc_use_tmscnt','VARCHAR','최근3개월더블할인사용횟수',20,'N'),(181,2,'r6m_dbl_dc_use_tmscnt','VARCHAR','최근6개월더블할인사용횟수',20,'N'),(182,2,'r1y_bkry_use_tmscnt','VARCHAR','최근1년제과점사용횟수',20,'N'),(183,2,'r1y_movie_use_tmscnt','VARCHAR','최근1년영화사용횟수',20,'N'),(184,2,'r3m_eout_use_tmscnt','VARCHAR','최근3개월외식사용횟수',20,'N'),(185,2,'r1y_eout_use_tmscnt','VARCHAR','최근1년외식사용횟수',20,'N'),(186,2,'r1y_cafe_use_tmscnt','VARCHAR','최근1년카페사용횟수',20,'N'),(187,2,'r3m_cvstr_use_tmscnt','VARCHAR','최근3개월편의점사용횟수',20,'N'),(188,2,'r1y_cvstr_use_tmscnt','VARCHAR','최근1년편의점사용횟수',20,'N'),(189,2,'r1y_gcltr_use_tmscnt','VARCHAR','최근1년그레이트컬쳐사용횟수',20,'N'),(190,2,'r1y_gfstv_use_tmscnt','VARCHAR','최근1년그레이트페스티벌사용횟수',20,'N'),(191,2,'r3m_gnipc_use_tmscnt','VARCHAR','최근3개월지니팩사용횟수',20,'N'),(192,2,'r3m_iptv_vod_use_tmscnt','VARCHAR','최근3개월IPTVVOD사용횟수',20,'N'),(193,2,'r3m_data_charg_use_tmscnt','VARCHAR','최근3개월데이터충전사용횟수',20,'N'),(194,2,'r3m_fambox_use_tmscnt','VARCHAR','최근3개월패밀리박스사용횟수',20,'N'),(195,2,'gis_hshld_id','VARCHAR','GIS가구아이디',20,'N'),(196,2,'spnsr_dc_type_nm','VARCHAR','스폰서할인유형명',20,'N'),(197,2,'rsal_type_nm','VARCHAR','재판매유형명',20,'N'),(198,2,'use_purp_div_nm','VARCHAR','사용용도구분명',20,'N'),(199,2,'pay_way_nm','VARCHAR','납부수단명',20,'N'),(200,2,'itg_hshld_id','VARCHAR','통합가구아이디',20,'N'),(201,2,'opn_cont_rl_use_mons_num','VARCHAR','개통계약실사용개월수',20,'N'),(202,2,'pima_atvy_ch_nm','VARCHAR','핀셋영업활동채널명',20,'N'),(203,2,'pima_seg_nm','VARCHAR','핀셋영업세그먼트명',20,'N'),(204,2,'pima_atvy_ch_itg_cd','VARCHAR','핀셋영업활동채널통합코드',20,'N'),(205,2,'pima_seg_itg_cd','VARCHAR','핀셋영업세그먼트통합코드',20,'N'),(206,2,'pima_apd_sale_seg_itg_cd','VARCHAR','핀셋영업추가판매세그먼트통합코드',20,'N'),(207,2,'pima_apd_sale_seg_nm','VARCHAR','핀셋영업추가판매세그먼트명',20,'N'),(208,2,'pima_ch_div_nm','VARCHAR','핀셋영업채널구분명',20,'N'),(209,2,'comb_svc_cont_id','VARCHAR','결합서비스계약아이디',20,'N'),(210,3,'comb_cont_sbt_id','VARCHAR','결합계약대체아이디',20,'N'),(211,3,'comb_svc_cont_id','VARCHAR','결합서비스계약아이디',20,'N'),(212,3,'unlmt_ppl_circuit_num','VARCHAR','무제한요금제회선수',20,'N'),(213,3,'nn_unlmt_ppl_circuit_num','VARCHAR','비무제한요금제회선수',20,'N'),(214,3,'nn_ginet_circuit_num','VARCHAR','비기가인터넷회선수',20,'N'),(215,3,'tv_bfee_12_blow_circuit_num','VARCHAR','TV기본료12미만회선수',20,'N'),(216,3,'chage_engt_nosubs_circuit_num','VARCHAR','요금약정미가입회선수',20,'N'),(217,3,'long_inet_2_hndr_circuit_num','VARCHAR','장기인터넷2백회선수',20,'N'),(218,3,'long_ginetc_circuit_num','VARCHAR','장기기가인터넷콤팩트회선수',20,'N'),(219,3,'kid_mbl_pssn_circuit_num','VARCHAR','키즈모바일보유회선수',20,'N'),(220,3,'ggni_acq_tgt_circuit_num','VARCHAR','기가지니유치대상회선수',20,'N'),(221,3,'gwh_rntchr_dc_tgt_circuit_num','VARCHAR','기가와이파이홈임대료할인대상회선수',20,'N'),(222,3,'prvt_ap_use_circuit_num','VARCHAR','사설AP사용회선수',20,'N'),(223,3,'ginet_circuit_num','VARCHAR','기가인터넷회선수',20,'N'),(224,3,'tv_bfee_12_mrth_circuit_num','VARCHAR','TV기본료12이상회선수',20,'N'),(225,3,'tv_bfee_15_blow_circuit_num','VARCHAR','TV기본료15미만회선수',20,'N'),(226,3,'mbl_circuit_num','VARCHAR','모바일회선수',20,'N'),(227,3,'comb_prod_type_nm','VARCHAR','결합상품유형명',20,'N'),(228,3,'comb_dc_type_ctg_nm','VARCHAR','결합할인유형분류명',20,'N'),(229,3,'pima_mbl_np_oppty_tgt_yn','VARCHAR','핀셋영업모바일번호이동기회대상여부',20,'N'),(230,3,'pima_inet_tv_new_tgt_yn','VARCHAR','핀셋영업인터넷TV신규대상여부',20,'N'),(231,3,'pima_tv_new_oppty_tgt_yn','VARCHAR','핀셋영업TV신규기회대상여부',20,'N'),(232,3,'wrlin_reengt_advt_tgt_yn','VARCHAR','유선재약정도래대상여부',20,'N'),(233,3,'pima_child_new_oppty_tgt_yn','VARCHAR','핀셋영업자녀신규기회대상여부',20,'N'),(234,3,'pima_icg_oppty_tgt_yn','VARCHAR','핀셋영업기기변경기회대상여부',20,'N'),(235,3,'nn_unlmt_ppl_whole_5g_slim_yn','VARCHAR','비무제한요금제전체5G슬림여부',20,'N'),(236,3,'nn_unlmt_ppl_lte_incl_yn','VARCHAR','비무제한요금제LTE포함여부',20,'N'),(237,3,'hshld_mbl_yet_comb_circuit_num','VARCHAR','가구모바일미결합회선수',20,'N'),(238,3,'hshld_tv_yet_comb_circuit_num','VARCHAR','가구TV미결합회선수',20,'N'),(239,5,'acpt_org_nm','VARCHAR','수용조직명',20,'N'),(240,5,'base_date','VARCHAR','YYYYMMDD',20,'N'),(241,5,'batch_flg','VARCHAR','N',20,'N'),(242,5,'batch_msg','VARCHAR','배치결과 메시지',20,'N'),(243,5,'created','VARCHAR','SYSDATE',20,'N'),(244,5,'cust_pty_sbt_id','VARCHAR','고객파티대체아이디',20,'N'),(245,5,'cust_srow_id','VARCHAR','고객로우아이디',20,'N'),(246,5,'data_chg_sttus_cd','VARCHAR','데이터변경상태코드',20,'N'),(247,5,'hshld_arpu_amt','VARCHAR','가구ARPU금액',20,'N'),(248,5,'hshld_seg_lctg_nm','VARCHAR','가구세그먼트대분류명',20,'N'),(249,5,'hshld_seg_sctg_nm','VARCHAR','가구세그먼트소분류명',20,'N'),(250,5,'hshld_seq','VARCHAR','가구일련번호',20,'N'),(251,5,'inet_circuit_num','VARCHAR','인터넷회선수',20,'N'),(252,5,'inetgg_maint_circuit_num','VARCHAR','인터넷기가유지회선수',20,'N'),(253,5,'inetmg_maint_circuit_num','VARCHAR','인터넷메가유지회선수',20,'N'),(254,5,'iptv_circuit_num','VARCHAR','IPTV회선수',20,'N'),(255,5,'gis_hshld_id','VARCHAR','통합가구아이디',20,'N'),(256,5,'last_upd','VARCHAR','SYSDATE',20,'N'),(257,5,'mbl_circuit_num','VARCHAR','모바일회선수',20,'N'),(258,5,'mkt_prirt_nm','VARCHAR','영업우선순위명',20,'N'),(259,5,'pstn_circuit_num','VARCHAR','PSTN회선수',20,'N'),(260,4,'asset_srow_id','VARCHAR','자산로우아이디',20,'N'),(261,4,'base_date','VARCHAR','기준일자',20,'N'),(262,4,'batch_flg','VARCHAR','N',20,'N'),(263,4,'batch_msg','VARCHAR','배치결과메시지',20,'N'),(264,4,'cont_sbt_id','VARCHAR','계약대체아이디',20,'N'),(265,4,'cprt_card_iss_type_nm','VARCHAR','제휴카드발급유형명',20,'N'),(266,4,'cprt_card_pssn_yn','VARCHAR','제휴카드보유여부',20,'N'),(267,4,'cprt_card_ptnr_nm','VARCHAR','제휴카드파트너명',20,'N'),(268,4,'created','VARCHAR','SYSDATE',20,'N'),(269,4,'cust_clas_itg_cd','VARCHAR','고객등급통합코드',20,'N'),(270,4,'cust_clas_nm','VARCHAR','고객등급명',20,'N'),(271,4,'cust_pty_sbt_id','VARCHAR','고객파티대체아이디',20,'N'),(272,4,'cust_srow_id','VARCHAR','고객로우아이디',20,'N'),(273,4,'data_use_yn','VARCHAR','데이터사용여부',20,'N'),(274,4,'egg_pssn_cascnt','VARCHAR','에그보유건수',20,'N'),(275,4,'etc_hndset_intrst_score','VARCHAR','기타단말기관심점수',20,'N'),(276,4,'etc_hndset_pssn_cascnt','VARCHAR','기타단말기보유건수',20,'N'),(277,4,'etc_hndset_pssn_yn','VARCHAR','기타단말기보유여부',20,'N'),(278,4,'fambox_svc_sbsc_yn','VARCHAR','패밀리박스서비스가입여부',20,'N'),(279,4,'fnnc_intrst_score','VARCHAR','금융관심점수',20,'N'),(280,4,'frgn_travel_intrst_score','VARCHAR','국외여행관심점수',20,'N'),(281,4,'game_intrst_score','VARCHAR','게임관심점수',20,'N'),(282,4,'gen_by_iptv_pssn_yn','VARCHAR','세대별IPTV보유여부',20,'N'),(283,4,'gen_by_mbl_compno_pssn_yn','VARCHAR','세대별모바일복수보유여부',20,'N'),(284,4,'gen_by_otcom_mbl_pssn_itg_cd','VARCHAR','세대별타사모바일보유통합코드',20,'N'),(285,4,'gen_by_otcom_mbl_pssn_nm','VARCHAR','세대별타사모바일보유명',20,'N'),(286,4,'genesis_cust_sorc_id','VARCHAR','GENESIS고객소스아이디',20,'N'),(287,4,'hndset_use_mons_num','VARCHAR','단말기사용개월수',20,'N'),(288,4,'hsins_sbsc_sttus_itg_cd','VARCHAR','단말기보험가입상태통합코드',20,'N'),(289,4,'hsins_sbsc_sttus_nm','VARCHAR','단말기보험가입상태명',20,'N'),(290,4,'intrst_1_prirt_nm','VARCHAR','관심1우선순위명',20,'N'),(291,4,'intrst_2_prirt_nm','VARCHAR','관심2우선순위명',20,'N'),(292,4,'intrst_3_prirt_nm','VARCHAR','관심3우선순위명',20,'N'),(293,4,'intrst_prirt_cascnt','VARCHAR','관심우선순위건수',20,'N'),(294,4,'lamt_mbl_hndset_yn','VARCHAR','고액모바일단말기여부',20,'N'),(295,4,'last_upd','VARCHAR','SYSDATE',20,'N'),(296,4,'ldup_cycl_type_cd','VARCHAR','적재주기유형코드',20,'N'),(297,4,'ldup_type_cd','VARCHAR','적재유형코드',20,'N'),(298,4,'loyal_agegrd_itg_cd','VARCHAR','로열티연령대통합코드',20,'N'),(299,4,'loyal_agegrd_nm','VARCHAR','로열티연령대명',20,'N'),(300,4,'movie_intrst_score','VARCHAR','영화관심점수',20,'N'),(301,4,'mphon_ch_type_itg_cd','VARCHAR','이동전화채널유형통합코드',20,'N'),(302,4,'mphon_ch_type_nm','VARCHAR','이동전화채널유형명',20,'N'),(303,4,'music_imprs_intrst_score','VARCHAR','음악감상관심점수',20,'N'),(304,4,'olcb_sbsc_yn','VARCHAR','올레클럽가입여부',20,'N'),(305,4,'pad_pssn_cascnt','VARCHAR','패드보유건수',20,'N'),(306,4,'phcu_sbsc_yn','VARCHAR','폰체인지업가입여부',20,'N'),(307,4,'popcn_use_yn','VARCHAR','팝콘사용여부',20,'N'),(308,4,'recnt_exlicg_yn','VARCHAR','최근우수기기변경여부',20,'N'),(309,4,'sfty_intrst_score','VARCHAR','안전관심점수',20,'N'),(310,4,'sping_intrst_score','VARCHAR','쇼핑관심점수',20,'N'),(311,4,'svc_cont_id','VARCHAR','서비스계약아이디',20,'N'),(312,4,'svc_no_sorc_id','VARCHAR','서비스번호소스아이디',20,'N'),(313,4,'vdo_intrst_score','VARCHAR','동영상관심점수',20,'N'),(314,4,'webtn_intrst_score','VARCHAR','웹툰관심점수',20,'N'),(315,4,'wless_comb_div_itg_cd','VARCHAR','무선결합구분통합코드',20,'N'),(316,4,'wless_comb_div_nm','VARCHAR','무선결합구분명',20,'N'),(317,4,'wless_loyal_clas_itg_cd','VARCHAR','무선로열티등급통합코드',20,'N'),(318,4,'wless_loyal_clas_nm','VARCHAR','무선로열티등급명',20,'N'),(319,4,'wless_loyal_score','VARCHAR','무선로열티점수',20,'N'),(320,4,'wless_loyal_spnsr_type_itg_cd','VARCHAR','무선로열티스폰서유형통합코드',20,'N'),(321,4,'wless_loyal_spnsr_type_nm','VARCHAR','무선로열티스폰서유형명',20,'N'),(322,4,'wless_pssn_cascnt','VARCHAR','무선보유건수',20,'N');
/*!40000 ALTER TABLE `COL` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-14 13:11:35
