-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `aime_card` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`access_code` varchar(20) DEFAULT 'NULL',
	`created_date` timestamp DEFAULT 'current_timestamp()',
	`last_login_date` timestamp DEFAULT 'NULL',
	`is_locked` tinyint DEFAULT 0,
	`is_banned` tinyint DEFAULT 0,
	CONSTRAINT `aime_card_uk` UNIQUE(`user`,`access_code`)
);
--> statement-breakpoint
CREATE TABLE `aime_user` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`username` varchar(25) DEFAULT 'NULL',
	`email` varchar(255) DEFAULT 'NULL',
	`password` varchar(255) DEFAULT 'NULL',
	`permissions` int(11) DEFAULT 'NULL',
	`created_date` timestamp DEFAULT 'current_timestamp()',
	`last_login_date` timestamp DEFAULT 'NULL',
	`suspend_expire_time` timestamp DEFAULT 'NULL',
	CONSTRAINT `username` UNIQUE(`username`),
	CONSTRAINT `email` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `alembic_version` (
	`version_num` varchar(32) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `arcade` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(255) DEFAULT 'NULL',
	`nickname` varchar(255) DEFAULT 'NULL',
	`country` varchar(3) DEFAULT 'NULL',
	`country_id` int(11) DEFAULT 'NULL',
	`state` varchar(255) DEFAULT 'NULL',
	`city` varchar(255) DEFAULT 'NULL',
	`region_id` int(11) DEFAULT 'NULL',
	`timezone` varchar(255) DEFAULT 'NULL',
	`ip` varchar(39) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `arcade_owner` (
	`user` int(11) NOT NULL,
	`arcade` int(11) NOT NULL,
	`permissions` int(11) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chuni_item_character` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`characterId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`isValid` tinyint DEFAULT 'NULL',
	`skillId` int(11) DEFAULT 'NULL',
	`isNewMark` tinyint DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`friendshipExp` int(11) DEFAULT 'NULL',
	`assignIllust` int(11) DEFAULT 'NULL',
	`exMaxLv` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_item_character_uk` UNIQUE(`user`,`characterId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_cmission` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`missionId` int(11) NOT NULL,
	`point` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_item_cmission_uk` UNIQUE(`user`,`missionId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_cmission_progress` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`missionId` int(11) NOT NULL,
	`order` int(11) DEFAULT 'NULL',
	`stage` int(11) DEFAULT 'NULL',
	`progress` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_item_cmission_progress_uk` UNIQUE(`user`,`missionId`,`order`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_duel` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`duelId` int(11) DEFAULT 'NULL',
	`progress` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`lastPlayDate` varchar(25) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`param3` int(11) DEFAULT 'NULL',
	`param4` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_item_duel_uk` UNIQUE(`user`,`duelId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_favorite` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`favId` int(11) NOT NULL,
	`favKind` int(11) NOT NULL DEFAULT 1,
	CONSTRAINT `chuni_item_favorite_uk` UNIQUE(`version`,`user`,`favId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_gacha` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`gachaId` int(11) NOT NULL,
	`totalGachaCnt` int(11) DEFAULT 0,
	`ceilingGachaCnt` int(11) DEFAULT 0,
	`dailyGachaCnt` int(11) DEFAULT 0,
	`fiveGachaCnt` int(11) DEFAULT 0,
	`elevenGachaCnt` int(11) DEFAULT 0,
	`dailyGachaDate` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `chuni_item_gacha_uk` UNIQUE(`user`,`gachaId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`itemId` int(11) DEFAULT 'NULL',
	`itemKind` int(11) DEFAULT 'NULL',
	`stock` int(11) DEFAULT 'NULL',
	`isValid` tinyint DEFAULT 'NULL',
	CONSTRAINT `chuni_item_item_uk` UNIQUE(`user`,`itemId`,`itemKind`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_login_bonus` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`presetId` int(11) NOT NULL,
	`bonusCount` int(11) NOT NULL DEFAULT 0,
	`lastUpdateDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`isWatched` tinyint DEFAULT 0,
	`isFinished` tinyint DEFAULT 0,
	CONSTRAINT `chuni_item_login_bonus_uk` UNIQUE(`version`,`user`,`presetId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_map` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`mapId` int(11) DEFAULT 'NULL',
	`position` int(11) DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`areaId` int(11) DEFAULT 'NULL',
	`routeNumber` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`rate` int(11) DEFAULT 'NULL',
	`statusCount` int(11) DEFAULT 'NULL',
	`isValid` tinyint DEFAULT 'NULL',
	CONSTRAINT `chuni_item_map_uk` UNIQUE(`user`,`mapId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_map_area` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`mapAreaId` int(11) DEFAULT 'NULL',
	`rate` int(11) DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`isLocked` tinyint DEFAULT 'NULL',
	`position` int(11) DEFAULT 'NULL',
	`statusCount` int(11) DEFAULT 'NULL',
	`remainGridCount` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_item_map_area_uk` UNIQUE(`user`,`mapAreaId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_matching` (
	`roomId` int(11) NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`restMSec` int(11) NOT NULL DEFAULT 60,
	`isFull` tinyint NOT NULL DEFAULT 0,
	`matchingMemberInfoList` longtext NOT NULL
);
--> statement-breakpoint
CREATE TABLE `chuni_item_print_detail` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`printDate` timestamp NOT NULL,
	`serialId` varchar(20) NOT NULL,
	`placeId` int(11) NOT NULL,
	`clientId` varchar(11) NOT NULL,
	`printerSerialId` varchar(20) NOT NULL,
	`printOption1` tinyint DEFAULT 0,
	`printOption2` tinyint DEFAULT 0,
	`printOption3` tinyint DEFAULT 0,
	`printOption4` tinyint DEFAULT 0,
	`printOption5` tinyint DEFAULT 0,
	`printOption6` tinyint DEFAULT 0,
	`printOption7` tinyint DEFAULT 0,
	`printOption8` tinyint DEFAULT 0,
	`printOption9` tinyint DEFAULT 0,
	`printOption10` tinyint DEFAULT 0,
	`created` varchar(255) DEFAULT '''',
	CONSTRAINT `chuni_item_print_detail_uk` UNIQUE(`serialId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_item_print_state` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`hasCompleted` tinyint NOT NULL DEFAULT 0,
	`limitDate` timestamp NOT NULL DEFAULT ''2037-12-31 17:00:00'',
	`placeId` int(11) DEFAULT 'NULL',
	`cardId` int(11) DEFAULT 'NULL',
	`gachaId` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_item_print_state_uk` UNIQUE(`id`,`user`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_activity` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`kind` int(11) DEFAULT 'NULL',
	`activityId` int(11) DEFAULT 'NULL',
	`sortNumber` int(11) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`param3` int(11) DEFAULT 'NULL',
	`param4` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_activity_uk` UNIQUE(`user`,`kind`,`activityId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_charge` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`chargeId` int(11) DEFAULT 'NULL',
	`stock` int(11) DEFAULT 'NULL',
	`purchaseDate` varchar(25) DEFAULT 'NULL',
	`validDate` varchar(25) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`paramDate` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_charge_uk` UNIQUE(`user`,`chargeId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`exp` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	`frameId` int(11) DEFAULT 'NULL',
	`isMaimai` tinyint DEFAULT 'NULL',
	`trophyId` int(11) DEFAULT 'NULL',
	`userName` varchar(25) DEFAULT 'NULL',
	`isWebJoin` tinyint DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`lastGameId` varchar(25) DEFAULT 'NULL',
	`totalPoint` bigint(20) DEFAULT 'NULL',
	`characterId` int(11) DEFAULT 'NULL',
	`firstGameId` varchar(25) DEFAULT 'NULL',
	`friendCount` int(11) DEFAULT 'NULL',
	`lastPlaceId` int(11) DEFAULT 'NULL',
	`nameplateId` int(11) DEFAULT 'NULL',
	`totalMapNum` int(11) DEFAULT 'NULL',
	`lastAllNetId` int(11) DEFAULT 'NULL',
	`lastClientId` varchar(25) DEFAULT 'NULL',
	`lastPlayDate` varchar(25) DEFAULT 'NULL',
	`lastRegionId` int(11) DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`totalHiScore` int(11) DEFAULT 'NULL',
	`webLimitDate` varchar(25) DEFAULT 'NULL',
	`firstPlayDate` varchar(25) DEFAULT 'NULL',
	`highestRating` int(11) DEFAULT 'NULL',
	`lastPlaceName` varchar(25) DEFAULT 'NULL',
	`multiWinCount` int(11) DEFAULT 'NULL',
	`acceptResCount` int(11) DEFAULT 'NULL',
	`lastRegionName` varchar(25) DEFAULT 'NULL',
	`lastRomVersion` varchar(25) DEFAULT 'NULL',
	`multiPlayCount` int(11) DEFAULT 'NULL',
	`firstRomVersion` varchar(25) DEFAULT 'NULL',
	`lastDataVersion` varchar(25) DEFAULT 'NULL',
	`requestResCount` int(11) DEFAULT 'NULL',
	`successResCount` int(11) DEFAULT 'NULL',
	`eventWatchedDate` varchar(25) DEFAULT 'NULL',
	`firstDataVersion` varchar(25) DEFAULT 'NULL',
	`reincarnationNum` int(11) DEFAULT 'NULL',
	`playedTutorialBit` int(11) DEFAULT 'NULL',
	`totalBasicHighScore` int(11) DEFAULT 'NULL',
	`totalExpertHighScore` int(11) DEFAULT 'NULL',
	`totalMasterHighScore` int(11) DEFAULT 'NULL',
	`totalRepertoireCount` int(11) DEFAULT 'NULL',
	`firstTutorialCancelNum` int(11) DEFAULT 'NULL',
	`totalAdvancedHighScore` int(11) DEFAULT 'NULL',
	`masterTutorialCancelNum` int(11) DEFAULT 'NULL',
	`ext1` int(11) DEFAULT 'NULL',
	`ext2` int(11) DEFAULT 'NULL',
	`ext3` int(11) DEFAULT 'NULL',
	`ext4` int(11) DEFAULT 'NULL',
	`ext5` int(11) DEFAULT 'NULL',
	`ext6` int(11) DEFAULT 'NULL',
	`ext7` int(11) DEFAULT 'NULL',
	`ext8` int(11) DEFAULT 'NULL',
	`ext9` int(11) DEFAULT 'NULL',
	`ext10` int(11) DEFAULT 'NULL',
	`extStr1` varchar(255) DEFAULT 'NULL',
	`extStr2` varchar(255) DEFAULT 'NULL',
	`extLong1` int(11) DEFAULT 'NULL',
	`extLong2` int(11) DEFAULT 'NULL',
	`mapIconId` int(11) DEFAULT 'NULL',
	`compatibleCmVersion` varchar(25) DEFAULT 'NULL',
	`medal` int(11) DEFAULT 'NULL',
	`voiceId` int(11) DEFAULT 'NULL',
	`teamId` int(11) DEFAULT 'NULL',
	`eliteRankPoint` int(11) DEFAULT 0,
	`stockedGridCount` int(11) DEFAULT 0,
	`netBattleLoseCount` int(11) DEFAULT 0,
	`netBattleHostErrCnt` int(11) DEFAULT 0,
	`netBattle4thCount` int(11) DEFAULT 0,
	`overPowerRate` int(11) DEFAULT 0,
	`battleRewardStatus` int(11) DEFAULT 0,
	`netBattle1stCount` int(11) DEFAULT 0,
	`charaIllustId` int(11) DEFAULT 0,
	`userNameEx` varchar(8) DEFAULT '''',
	`netBattleWinCount` int(11) DEFAULT 0,
	`netBattleCorrection` int(11) DEFAULT 0,
	`classEmblemMedal` int(11) DEFAULT 0,
	`overPowerPoint` int(11) DEFAULT 0,
	`netBattleErrCnt` int(11) DEFAULT 0,
	`battleRankId` int(11) DEFAULT 0,
	`netBattle3rdCount` int(11) DEFAULT 0,
	`netBattleConsecutiveWinCount` int(11) DEFAULT 0,
	`overPowerLowerRank` int(11) DEFAULT 0,
	`classEmblemBase` int(11) DEFAULT 0,
	`battleRankPoint` int(11) DEFAULT 0,
	`netBattle2ndCount` int(11) DEFAULT 0,
	`totalUltimaHighScore` int(11) DEFAULT 0,
	`skillId` int(11) DEFAULT 0,
	`lastCountryCode` varchar(5) DEFAULT ''JPN'',
	`isNetBattleHost` tinyint DEFAULT 0,
	`battleRewardCount` int(11) DEFAULT 0,
	`battleRewardIndex` int(11) DEFAULT 0,
	`netBattlePlayCount` int(11) DEFAULT 0,
	`exMapLoopCount` int(11) DEFAULT 0,
	`netBattleEndState` int(11) DEFAULT 0,
	`rankUpChallengeResults` longtext DEFAULT 'NULL',
	`avatarBack` int(11) DEFAULT 0,
	`avatarFace` int(11) DEFAULT 0,
	`avatarPoint` int(11) DEFAULT 0,
	`avatarItem` int(11) DEFAULT 0,
	`avatarWear` int(11) DEFAULT 0,
	`avatarFront` int(11) DEFAULT 0,
	`avatarSkin` int(11) DEFAULT 0,
	`avatarHead` int(11) DEFAULT 0,
	CONSTRAINT `chuni_profile_profile_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_data_ex` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`ext1` int(11) DEFAULT 'NULL',
	`ext2` int(11) DEFAULT 'NULL',
	`ext3` int(11) DEFAULT 'NULL',
	`ext4` int(11) DEFAULT 'NULL',
	`ext5` int(11) DEFAULT 'NULL',
	`ext6` int(11) DEFAULT 'NULL',
	`ext7` int(11) DEFAULT 'NULL',
	`ext8` int(11) DEFAULT 'NULL',
	`ext9` int(11) DEFAULT 'NULL',
	`ext10` int(11) DEFAULT 'NULL',
	`ext11` int(11) DEFAULT 'NULL',
	`ext12` int(11) DEFAULT 'NULL',
	`ext13` int(11) DEFAULT 'NULL',
	`ext14` int(11) DEFAULT 'NULL',
	`ext15` int(11) DEFAULT 'NULL',
	`ext16` int(11) DEFAULT 'NULL',
	`ext17` int(11) DEFAULT 'NULL',
	`ext18` int(11) DEFAULT 'NULL',
	`ext19` int(11) DEFAULT 'NULL',
	`ext20` int(11) DEFAULT 'NULL',
	`medal` int(11) DEFAULT 'NULL',
	`extStr1` varchar(255) DEFAULT 'NULL',
	`extStr2` varchar(255) DEFAULT 'NULL',
	`extStr3` varchar(255) DEFAULT 'NULL',
	`extStr4` varchar(255) DEFAULT 'NULL',
	`extStr5` varchar(255) DEFAULT 'NULL',
	`voiceId` int(11) DEFAULT 'NULL',
	`extLong1` int(11) DEFAULT 'NULL',
	`extLong2` int(11) DEFAULT 'NULL',
	`extLong3` int(11) DEFAULT 'NULL',
	`extLong4` int(11) DEFAULT 'NULL',
	`extLong5` int(11) DEFAULT 'NULL',
	`mapIconId` int(11) DEFAULT 'NULL',
	`compatibleCmVersion` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_data_ex_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_emoney` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`ext1` int(11) DEFAULT 'NULL',
	`ext2` int(11) DEFAULT 'NULL',
	`ext3` int(11) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`emoneyBrand` int(11) DEFAULT 'NULL',
	`emoneyCredit` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_emoney_uk` UNIQUE(`user`,`emoneyBrand`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_net_battle` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`isRankUpChallengeFailed` tinyint DEFAULT 'NULL',
	`highestBattleRankId` int(11) DEFAULT 'NULL',
	`battleIconId` int(11) DEFAULT 'NULL',
	`battleIconNum` int(11) DEFAULT 'NULL',
	`avatarEffectPoint` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_option` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`speed` int(11) DEFAULT 'NULL',
	`bgInfo` int(11) DEFAULT 'NULL',
	`rating` int(11) DEFAULT 'NULL',
	`privacy` int(11) DEFAULT 'NULL',
	`judgePos` int(11) DEFAULT 'NULL',
	`matching` int(11) DEFAULT 'NULL',
	`guideLine` int(11) DEFAULT 'NULL',
	`headphone` int(11) DEFAULT 'NULL',
	`optionSet` int(11) DEFAULT 'NULL',
	`fieldColor` int(11) DEFAULT 'NULL',
	`guideSound` int(11) DEFAULT 'NULL',
	`successAir` int(11) DEFAULT 'NULL',
	`successTap` int(11) DEFAULT 'NULL',
	`judgeAttack` int(11) DEFAULT 'NULL',
	`playerLevel` int(11) DEFAULT 'NULL',
	`soundEffect` int(11) DEFAULT 'NULL',
	`judgeJustice` int(11) DEFAULT 'NULL',
	`successExTap` int(11) DEFAULT 'NULL',
	`successFlick` int(11) DEFAULT 'NULL',
	`successSkill` int(11) DEFAULT 'NULL',
	`successSlideHold` int(11) DEFAULT 'NULL',
	`successTapTimbre` int(11) DEFAULT 'NULL',
	`ext1` int(11) DEFAULT 'NULL',
	`ext2` int(11) DEFAULT 'NULL',
	`ext3` int(11) DEFAULT 'NULL',
	`ext4` int(11) DEFAULT 'NULL',
	`ext5` int(11) DEFAULT 'NULL',
	`ext6` int(11) DEFAULT 'NULL',
	`ext7` int(11) DEFAULT 'NULL',
	`ext8` int(11) DEFAULT 'NULL',
	`ext9` int(11) DEFAULT 'NULL',
	`ext10` int(11) DEFAULT 'NULL',
	`categoryDetail` int(11) DEFAULT 0,
	`judgeTimingOffset_120` int(11) DEFAULT 0,
	`resultVoiceShort` int(11) DEFAULT 0,
	`judgeAppendSe` int(11) DEFAULT 0,
	`judgeCritical` int(11) DEFAULT 0,
	`trackSkip` int(11) DEFAULT 0,
	`selectMusicFilterLv` int(11) DEFAULT 0,
	`sortMusicFilterLv` int(11) DEFAULT 0,
	`sortMusicGenre` int(11) DEFAULT 0,
	`speed_120` int(11) DEFAULT 0,
	`judgeTimingOffset` int(11) DEFAULT 0,
	`mirrorFumen` int(11) DEFAULT 0,
	`playTimingOffset_120` int(11) DEFAULT 0,
	`hardJudge` int(11) DEFAULT 0,
	`notesThickness` int(11) DEFAULT 0,
	`fieldWallPosition` int(11) DEFAULT 0,
	`playTimingOffset` int(11) DEFAULT 0,
	`fieldWallPosition_120` int(11) DEFAULT 0,
	CONSTRAINT `chuni_profile_option_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_option_ex` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`ext1` int(11) DEFAULT 'NULL',
	`ext2` int(11) DEFAULT 'NULL',
	`ext3` int(11) DEFAULT 'NULL',
	`ext4` int(11) DEFAULT 'NULL',
	`ext5` int(11) DEFAULT 'NULL',
	`ext6` int(11) DEFAULT 'NULL',
	`ext7` int(11) DEFAULT 'NULL',
	`ext8` int(11) DEFAULT 'NULL',
	`ext9` int(11) DEFAULT 'NULL',
	`ext10` int(11) DEFAULT 'NULL',
	`ext11` int(11) DEFAULT 'NULL',
	`ext12` int(11) DEFAULT 'NULL',
	`ext13` int(11) DEFAULT 'NULL',
	`ext14` int(11) DEFAULT 'NULL',
	`ext15` int(11) DEFAULT 'NULL',
	`ext16` int(11) DEFAULT 'NULL',
	`ext17` int(11) DEFAULT 'NULL',
	`ext18` int(11) DEFAULT 'NULL',
	`ext19` int(11) DEFAULT 'NULL',
	`ext20` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_option_ex_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_overpower` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`genreId` int(11) DEFAULT 'NULL',
	`difficulty` int(11) DEFAULT 'NULL',
	`rate` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_emoney_uk` UNIQUE(`user`,`genreId`,`difficulty`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_recent_rating` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`recentRating` longtext DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_recent_rating_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_region` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`regionId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_profile_region_uk` UNIQUE(`user`,`regionId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_profile_team` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`teamName` varchar(255) DEFAULT 'NULL',
	`teamPoint` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `chuni_score_best` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`scoreMax` int(11) DEFAULT 'NULL',
	`resRequestCount` int(11) DEFAULT 'NULL',
	`resAcceptCount` int(11) DEFAULT 'NULL',
	`resSuccessCount` int(11) DEFAULT 'NULL',
	`missCount` int(11) DEFAULT 'NULL',
	`maxComboCount` int(11) DEFAULT 'NULL',
	`isFullCombo` tinyint DEFAULT 'NULL',
	`isAllJustice` tinyint DEFAULT 'NULL',
	`isSuccess` int(11) DEFAULT 'NULL',
	`fullChain` int(11) DEFAULT 'NULL',
	`maxChain` int(11) DEFAULT 'NULL',
	`scoreRank` int(11) DEFAULT 'NULL',
	`isLock` tinyint DEFAULT 'NULL',
	`ext1` int(11) DEFAULT 'NULL',
	`theoryCount` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_score_best_uk` UNIQUE(`user`,`musicId`,`level`)
);
--> statement-breakpoint
CREATE TABLE `chuni_score_course` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`courseId` int(11) DEFAULT 'NULL',
	`classId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`scoreMax` int(11) DEFAULT 'NULL',
	`isFullCombo` tinyint DEFAULT 'NULL',
	`isAllJustice` tinyint DEFAULT 'NULL',
	`isSuccess` int(11) DEFAULT 'NULL',
	`scoreRank` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`lastPlayDate` varchar(25) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`param3` int(11) DEFAULT 'NULL',
	`param4` int(11) DEFAULT 'NULL',
	`isClear` int(11) DEFAULT 'NULL',
	`theoryCount` int(11) DEFAULT 'NULL',
	`orderId` int(11) DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	CONSTRAINT `chuni_score_course_uk` UNIQUE(`user`,`courseId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_score_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`orderId` int(11) DEFAULT 'NULL',
	`sortNumber` int(11) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`playDate` varchar(20) DEFAULT 'NULL',
	`userPlayDate` varchar(20) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`customId` int(11) DEFAULT 'NULL',
	`playedUserId1` int(11) DEFAULT 'NULL',
	`playedUserId2` int(11) DEFAULT 'NULL',
	`playedUserId3` int(11) DEFAULT 'NULL',
	`playedUserName1` varchar(20) DEFAULT 'NULL',
	`playedUserName2` varchar(20) DEFAULT 'NULL',
	`playedUserName3` varchar(20) DEFAULT 'NULL',
	`playedMusicLevel1` int(11) DEFAULT 'NULL',
	`playedMusicLevel2` int(11) DEFAULT 'NULL',
	`playedMusicLevel3` int(11) DEFAULT 'NULL',
	`playedCustom1` int(11) DEFAULT 'NULL',
	`playedCustom2` int(11) DEFAULT 'NULL',
	`playedCustom3` int(11) DEFAULT 'NULL',
	`track` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`rank` int(11) DEFAULT 'NULL',
	`maxCombo` int(11) DEFAULT 'NULL',
	`maxChain` int(11) DEFAULT 'NULL',
	`rateTap` int(11) DEFAULT 'NULL',
	`rateHold` int(11) DEFAULT 'NULL',
	`rateSlide` int(11) DEFAULT 'NULL',
	`rateAir` int(11) DEFAULT 'NULL',
	`rateFlick` int(11) DEFAULT 'NULL',
	`judgeGuilty` int(11) DEFAULT 'NULL',
	`judgeAttack` int(11) DEFAULT 'NULL',
	`judgeJustice` int(11) DEFAULT 'NULL',
	`judgeCritical` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`isNewRecord` tinyint DEFAULT 'NULL',
	`isFullCombo` tinyint DEFAULT 'NULL',
	`fullChainKind` int(11) DEFAULT 'NULL',
	`isAllJustice` tinyint DEFAULT 'NULL',
	`isContinue` tinyint DEFAULT 'NULL',
	`isFreeToPlay` tinyint DEFAULT 'NULL',
	`characterId` int(11) DEFAULT 'NULL',
	`skillId` int(11) DEFAULT 'NULL',
	`playKind` int(11) DEFAULT 'NULL',
	`isClear` int(11) DEFAULT 'NULL',
	`skillLevel` int(11) DEFAULT 'NULL',
	`skillEffect` int(11) DEFAULT 'NULL',
	`placeName` varchar(255) DEFAULT 'NULL',
	`isMaimai` tinyint DEFAULT 'NULL',
	`commonId` int(11) DEFAULT 'NULL',
	`charaIllustId` int(11) DEFAULT 'NULL',
	`romVersion` varchar(255) DEFAULT 'NULL',
	`judgeHeaven` int(11) DEFAULT 'NULL',
	`regionId` int(11) DEFAULT 'NULL',
	`machineType` int(11) DEFAULT 'NULL',
	`ticketId` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `chuni_static_avatar` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`avatarAccessoryId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`category` int(11) DEFAULT 'NULL',
	`iconPath` varchar(255) DEFAULT 'NULL',
	`texturePath` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `chuni_static_avatar_uk` UNIQUE(`version`,`avatarAccessoryId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_cards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`charaName` varchar(255) NOT NULL,
	`charaId` int(11) NOT NULL,
	`presentName` varchar(255) NOT NULL,
	`rarity` int(11) DEFAULT 2,
	`labelType` int(11) NOT NULL,
	`difType` int(11) NOT NULL,
	`miss` int(11) NOT NULL,
	`combo` int(11) NOT NULL,
	`chain` int(11) NOT NULL,
	`skillName` varchar(255) NOT NULL,
	CONSTRAINT `chuni_static_cards_uk` UNIQUE(`version`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_charge` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`chargeId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`expirationDays` int(11) DEFAULT 'NULL',
	`consumeType` int(11) DEFAULT 'NULL',
	`sellingAppeal` tinyint DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `chuni_static_charge_uk` UNIQUE(`version`,`chargeId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_events` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`eventId` int(11) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`startDate` timestamp DEFAULT 'current_timestamp()',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `chuni_static_events_uk` UNIQUE(`version`,`eventId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_gachas` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`gachaId` int(11) NOT NULL,
	`gachaName` varchar(255) NOT NULL,
	`type` int(11) NOT NULL DEFAULT 0,
	`kind` int(11) NOT NULL DEFAULT 0,
	`isCeiling` tinyint DEFAULT 0,
	`ceilingCnt` int(11) DEFAULT 10,
	`changeRateCnt1` int(11) DEFAULT 0,
	`changeRateCnt2` int(11) DEFAULT 0,
	`startDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`endDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	`noticeStartDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`noticeEndDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	CONSTRAINT `chuni_static_gachas_uk` UNIQUE(`version`,`gachaId`,`gachaName`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_gacha_cards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`gachaId` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`rarity` int(11) NOT NULL,
	`weight` int(11) DEFAULT 1,
	`isPickup` tinyint DEFAULT 0,
	CONSTRAINT `chuni_static_gacha_cards_uk` UNIQUE(`gachaId`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_login_bonus` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`presetId` int(11) NOT NULL,
	`loginBonusId` int(11) NOT NULL,
	`loginBonusName` varchar(255) NOT NULL,
	`presentId` int(11) NOT NULL,
	`presentName` varchar(255) NOT NULL,
	`itemNum` int(11) NOT NULL,
	`needLoginDayCount` int(11) NOT NULL,
	`loginBonusCategoryType` int(11) NOT NULL,
	CONSTRAINT `chuni_static_login_bonus_uk` UNIQUE(`version`,`presetId`,`loginBonusId`)
);
--> statement-breakpoint
CREATE TABLE `chuni_static_login_bonus_preset` (
	`presetId` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`presetName` varchar(255) NOT NULL,
	`isEnabled` tinyint DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE `chuni_static_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`songId` int(11) DEFAULT 'NULL',
	`chartId` int(11) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`artist` varchar(255) DEFAULT 'NULL',
	`level` float DEFAULT 'NULL',
	`genre` varchar(255) DEFAULT 'NULL',
	`jacketPath` varchar(255) DEFAULT 'NULL',
	`worldsEndTag` varchar(7) DEFAULT 'NULL',
	CONSTRAINT `chuni_static_music_uk` UNIQUE(`version`,`songId`,`chartId`)
);
--> statement-breakpoint
CREATE TABLE `cxb_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`song_mcode` varchar(7) DEFAULT 'NULL',
	`chart_id` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`clear` int(11) DEFAULT 'NULL',
	`flawless` int(11) DEFAULT 'NULL',
	`super` int(11) DEFAULT 'NULL',
	`cool` int(11) DEFAULT 'NULL',
	`fast` int(11) DEFAULT 'NULL',
	`fast2` int(11) DEFAULT 'NULL',
	`slow` int(11) DEFAULT 'NULL',
	`slow2` int(11) DEFAULT 'NULL',
	`fail` int(11) DEFAULT 'NULL',
	`combo` int(11) DEFAULT 'NULL',
	`date_scored` timestamp DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `cxb_profile` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`index` int(11) NOT NULL,
	`data` longtext NOT NULL,
	CONSTRAINT `cxb_profile_uk` UNIQUE(`user`,`index`)
);
--> statement-breakpoint
CREATE TABLE `cxb_ranking` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`rev_id` int(11) DEFAULT 'NULL',
	`song_id` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`clear` int(11) DEFAULT 'NULL',
	CONSTRAINT `cxb_ranking_uk` UNIQUE(`user`,`rev_id`)
);
--> statement-breakpoint
CREATE TABLE `cxb_rev_energy` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`energy` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `cxb_rev_energy_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `cxb_score` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`game_version` int(11) DEFAULT 'NULL',
	`song_mcode` varchar(7) DEFAULT 'NULL',
	`song_index` int(11) DEFAULT 'NULL',
	`data` longtext DEFAULT 'NULL',
	CONSTRAINT `cxb_score_uk` UNIQUE(`user`,`song_mcode`,`song_index`)
);
--> statement-breakpoint
CREATE TABLE `cxb_static_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`songId` varchar(255) DEFAULT 'NULL',
	`index` int(11) DEFAULT 'NULL',
	`chartId` int(11) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`artist` varchar(255) DEFAULT 'NULL',
	`category` varchar(255) DEFAULT 'NULL',
	`level` float DEFAULT 'NULL',
	CONSTRAINT `cxb_static_music_uk` UNIQUE(`version`,`songId`,`chartId`,`index`)
);
--> statement-breakpoint
CREATE TABLE `diva_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`pv_id` int(11) DEFAULT 'NULL',
	`difficulty` int(11) DEFAULT 'NULL',
	`edition` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`atn_pnt` int(11) DEFAULT 'NULL',
	`clr_kind` int(11) DEFAULT 'NULL',
	`sort_kind` int(11) DEFAULT 'NULL',
	`cool` int(11) DEFAULT 'NULL',
	`fine` int(11) DEFAULT 'NULL',
	`safe` int(11) DEFAULT 'NULL',
	`sad` int(11) DEFAULT 'NULL',
	`worst` int(11) DEFAULT 'NULL',
	`max_combo` int(11) DEFAULT 'NULL',
	`date_scored` timestamp DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `diva_profile` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`player_name` varchar(10) NOT NULL,
	`lv_str` varchar(24) NOT NULL DEFAULT ''Dab on ''em'',
	`lv_num` int(11) NOT NULL DEFAULT 0,
	`lv_pnt` int(11) NOT NULL DEFAULT 0,
	`vcld_pts` int(11) NOT NULL DEFAULT 0,
	`hp_vol` int(11) NOT NULL DEFAULT 100,
	`btn_se_vol` int(11) NOT NULL DEFAULT 100,
	`btn_se_vol2` int(11) NOT NULL DEFAULT 100,
	`sldr_se_vol2` int(11) NOT NULL DEFAULT 100,
	`sort_kind` int(11) NOT NULL DEFAULT 2,
	`use_pv_mdl_eqp` tinyint NOT NULL DEFAULT 1,
	`use_mdl_pri` tinyint NOT NULL DEFAULT 0,
	`use_pv_skn_eqp` tinyint NOT NULL DEFAULT 0,
	`use_pv_btn_se_eqp` tinyint NOT NULL DEFAULT 1,
	`use_pv_sld_se_eqp` tinyint NOT NULL DEFAULT 0,
	`use_pv_chn_sld_se_eqp` tinyint NOT NULL DEFAULT 0,
	`use_pv_sldr_tch_se_eqp` tinyint NOT NULL DEFAULT 0,
	`btn_se_eqp` int(11) NOT NULL DEFAULT -1,
	`sld_se_eqp` int(11) NOT NULL DEFAULT -1,
	`chn_sld_se_eqp` int(11) NOT NULL DEFAULT -1,
	`sldr_tch_se_eqp` int(11) NOT NULL DEFAULT -1,
	`nxt_pv_id` int(11) NOT NULL DEFAULT 708,
	`nxt_dffclty` int(11) NOT NULL DEFAULT 2,
	`nxt_edtn` int(11) NOT NULL DEFAULT 0,
	`cnp_cid` int(11) NOT NULL DEFAULT -1,
	`cnp_val` int(11) NOT NULL DEFAULT -1,
	`cnp_rr` int(11) NOT NULL DEFAULT -1,
	`cnp_sp` varchar(255) NOT NULL DEFAULT '''',
	`dsp_clr_brdr` int(11) NOT NULL DEFAULT 7,
	`dsp_intrm_rnk` int(11) NOT NULL DEFAULT 1,
	`dsp_clr_sts` int(11) NOT NULL DEFAULT 1,
	`rgo_sts` int(11) NOT NULL DEFAULT 1,
	`lv_efct_id` int(11) NOT NULL DEFAULT 0,
	`lv_plt_id` int(11) NOT NULL DEFAULT 1,
	`skn_eqp` int(11) NOT NULL DEFAULT 0,
	`passwd_stat` int(11) NOT NULL DEFAULT 0,
	`passwd` varchar(12) NOT NULL DEFAULT ''**********'',
	`my_qst_id` varchar(128) DEFAULT ''-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1'',
	`my_qst_sts` varchar(128) DEFAULT ''-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1'',
	CONSTRAINT `diva_profile_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `diva_profile_customize_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`item_id` int(11) NOT NULL,
	CONSTRAINT `diva_profile_customize_item_uk` UNIQUE(`user`,`version`,`item_id`)
);
--> statement-breakpoint
CREATE TABLE `diva_profile_module` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`module_id` int(11) NOT NULL,
	CONSTRAINT `diva_profile_module_uk` UNIQUE(`user`,`version`,`module_id`)
);
--> statement-breakpoint
CREATE TABLE `diva_profile_pv_customize` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`pv_id` int(11) NOT NULL,
	`mdl_eqp_ary` varchar(14) DEFAULT ''-999,-999,-999'',
	`c_itm_eqp_ary` varchar(59) DEFAULT ''-999,-999,-999,-999,-999,-999,-999,-999,-999,-999,-999,-999'',
	`ms_itm_flg_ary` varchar(59) DEFAULT ''-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1'',
	`skin` int(11) DEFAULT -1,
	`btn_se` int(11) DEFAULT -1,
	`sld_se` int(11) DEFAULT -1,
	`chsld_se` int(11) DEFAULT -1,
	`sldtch_se` int(11) DEFAULT -1,
	CONSTRAINT `diva_profile_pv_customize_uk` UNIQUE(`user`,`version`,`pv_id`)
);
--> statement-breakpoint
CREATE TABLE `diva_profile_shop` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`mdl_eqp_ary` varchar(32) DEFAULT 'NULL',
	`c_itm_eqp_ary` varchar(59) DEFAULT 'NULL',
	`ms_itm_flg_ary` varchar(59) DEFAULT 'NULL',
	CONSTRAINT `diva_profile_shop_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `diva_score` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`pv_id` int(11) DEFAULT 'NULL',
	`difficulty` int(11) DEFAULT 'NULL',
	`edition` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`atn_pnt` int(11) DEFAULT 'NULL',
	`clr_kind` int(11) DEFAULT 'NULL',
	`sort_kind` int(11) DEFAULT 'NULL',
	`cool` int(11) DEFAULT 'NULL',
	`fine` int(11) DEFAULT 'NULL',
	`safe` int(11) DEFAULT 'NULL',
	`sad` int(11) DEFAULT 'NULL',
	`worst` int(11) DEFAULT 'NULL',
	`max_combo` int(11) DEFAULT 'NULL',
	CONSTRAINT `diva_score_uk` UNIQUE(`user`,`pv_id`,`difficulty`,`edition`)
);
--> statement-breakpoint
CREATE TABLE `diva_static_items` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`itemId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`points` int(11) DEFAULT 'NULL',
	`unknown_0` int(11) DEFAULT 'NULL',
	`start_date` varchar(255) DEFAULT 'NULL',
	`end_date` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `diva_static_items_uk` UNIQUE(`version`,`itemId`)
);
--> statement-breakpoint
CREATE TABLE `diva_static_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`songId` int(11) DEFAULT 'NULL',
	`chartId` int(11) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`vocaloid_arranger` varchar(255) DEFAULT 'NULL',
	`pv_illustrator` varchar(255) DEFAULT 'NULL',
	`lyrics` varchar(255) DEFAULT 'NULL',
	`bg_music` varchar(255) DEFAULT 'NULL',
	`level` float DEFAULT 'NULL',
	`bpm` int(11) DEFAULT 'NULL',
	`date` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `diva_static_music_uk` UNIQUE(`version`,`songId`,`chartId`)
);
--> statement-breakpoint
CREATE TABLE `diva_static_quests` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`questId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`quest_enable` tinyint DEFAULT 1,
	`kind` int(11) DEFAULT 'NULL',
	`unknown_0` int(11) DEFAULT 'NULL',
	`unknown_1` int(11) DEFAULT 'NULL',
	`unknown_2` int(11) DEFAULT 'NULL',
	`quest_order` int(11) DEFAULT 'NULL',
	`start_datetime` varchar(255) DEFAULT 'NULL',
	`end_datetime` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `diva_static_quests_uk` UNIQUE(`version`,`questId`)
);
--> statement-breakpoint
CREATE TABLE `diva_static_shop` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`shopId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`points` int(11) DEFAULT 'NULL',
	`unknown_0` int(11) DEFAULT 'NULL',
	`start_date` varchar(255) DEFAULT 'NULL',
	`end_date` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `diva_static_shop_uk` UNIQUE(`version`,`shopId`)
);
--> statement-breakpoint
CREATE TABLE `event_log` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`system` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`severity` int(11) NOT NULL,
	`message` varchar(1000) NOT NULL,
	`details` longtext NOT NULL,
	`when_logged` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `idac_profile` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`username` varchar(8) DEFAULT 'NULL',
	`country` int(11) DEFAULT 'NULL',
	`store` int(11) DEFAULT 'NULL',
	`team_id` int(11) DEFAULT 0,
	`total_play` int(11) DEFAULT 0,
	`daily_play` int(11) DEFAULT 0,
	`day_play` int(11) DEFAULT 0,
	`mileage` int(11) DEFAULT 0,
	`asset_version` int(11) DEFAULT 1,
	`last_play_date` timestamp DEFAULT 'current_timestamp()',
	`mytitle_id` int(11) DEFAULT 0,
	`mytitle_efffect_id` int(11) DEFAULT 0,
	`sticker_id` int(11) DEFAULT 0,
	`sticker_effect_id` int(11) DEFAULT 0,
	`papercup_id` int(11) DEFAULT 0,
	`tachometer_id` int(11) DEFAULT 0,
	`aura_id` int(11) DEFAULT 0,
	`aura_color_id` int(11) DEFAULT 0,
	`aura_line_id` int(11) DEFAULT 0,
	`bgm_id` int(11) DEFAULT 0,
	`keyholder_id` int(11) DEFAULT 0,
	`start_menu_bg_id` int(11) DEFAULT 0,
	`use_car_id` int(11) DEFAULT 1,
	`use_style_car_id` int(11) DEFAULT 1,
	`bothwin_count` int(11) DEFAULT 0,
	`bothwin_score` int(11) DEFAULT 0,
	`subcard_count` int(11) DEFAULT 0,
	`vs_history` int(11) DEFAULT 0,
	`stamp_key_assign_0` int(11) DEFAULT 'NULL',
	`stamp_key_assign_1` int(11) DEFAULT 'NULL',
	`stamp_key_assign_2` int(11) DEFAULT 'NULL',
	`stamp_key_assign_3` int(11) DEFAULT 'NULL',
	`name_change_category` int(11) DEFAULT 0,
	`factory_disp` int(11) DEFAULT 0,
	`create_date` timestamp DEFAULT 'current_timestamp()',
	`cash` int(11) DEFAULT 0,
	`dressup_point` int(11) DEFAULT 0,
	`avatar_point` int(11) DEFAULT 0,
	`total_cash` int(11) DEFAULT 0,
	CONSTRAINT `idac_profile_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `idac_profile_avatar` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`sex` int(11) DEFAULT 'NULL',
	`face` int(11) DEFAULT 'NULL',
	`eye` int(11) DEFAULT 'NULL',
	`mouth` int(11) DEFAULT 'NULL',
	`hair` int(11) DEFAULT 'NULL',
	`glasses` int(11) DEFAULT 'NULL',
	`face_accessory` int(11) DEFAULT 'NULL',
	`body` int(11) DEFAULT 'NULL',
	`body_accessory` int(11) DEFAULT 'NULL',
	`behind` int(11) DEFAULT 'NULL',
	`bg` int(11) DEFAULT 'NULL',
	`effect` int(11) DEFAULT 'NULL',
	`special` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_profile_avatar_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `idac_profile_config` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`config_id` int(11) DEFAULT 'NULL',
	`steering_intensity` int(11) DEFAULT 'NULL',
	`transmission_type` int(11) DEFAULT 'NULL',
	`default_viewpoint` int(11) DEFAULT 'NULL',
	`favorite_bgm` int(11) DEFAULT 'NULL',
	`bgm_volume` int(11) DEFAULT 'NULL',
	`se_volume` int(11) DEFAULT 'NULL',
	`master_volume` int(11) DEFAULT 'NULL',
	`store_battle_policy` int(11) DEFAULT 'NULL',
	`battle_onomatope_display` int(11) DEFAULT 'NULL',
	`cornering_guide` int(11) DEFAULT 'NULL',
	`minimap` int(11) DEFAULT 'NULL',
	`line_guide` int(11) DEFAULT 'NULL',
	`ghost` int(11) DEFAULT 'NULL',
	`race_exit` int(11) DEFAULT 'NULL',
	`result_skip` int(11) DEFAULT 'NULL',
	`stamp_select_skip` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_profile_config_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `idac_profile_rank` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`story_rank_exp` int(11) DEFAULT 0,
	`story_rank` int(11) DEFAULT 1,
	`time_trial_rank_exp` int(11) DEFAULT 0,
	`time_trial_rank` int(11) DEFAULT 1,
	`online_battle_rank_exp` int(11) DEFAULT 0,
	`online_battle_rank` int(11) DEFAULT 1,
	`store_battle_rank_exp` int(11) DEFAULT 0,
	`store_battle_rank` int(11) DEFAULT 1,
	`theory_exp` int(11) DEFAULT 0,
	`theory_rank` int(11) DEFAULT 1,
	`pride_group_id` int(11) DEFAULT 0,
	`pride_point` int(11) DEFAULT 0,
	`grade_exp` int(11) DEFAULT 0,
	`grade` int(11) DEFAULT 1,
	`grade_reward_dist` int(11) DEFAULT 0,
	`story_rank_reward_dist` int(11) DEFAULT 0,
	`time_trial_rank_reward_dist` int(11) DEFAULT 0,
	`online_battle_rank_reward_dist` int(11) DEFAULT 0,
	`store_battle_rank_reward_dist` int(11) DEFAULT 0,
	`theory_rank_reward_dist` int(11) DEFAULT 0,
	`max_attained_online_battle_rank` int(11) DEFAULT 1,
	`max_attained_pride_point` int(11) DEFAULT 0,
	`is_last_max` int(11) DEFAULT 0,
	CONSTRAINT `idac_profile_rank_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `idac_profile_stock` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`mytitle_list` varchar(1024) DEFAULT '''',
	`mytitle_new_list` varchar(1024) DEFAULT '''',
	`avatar_face_list` varchar(255) DEFAULT '''',
	`avatar_face_new_list` varchar(255) DEFAULT '''',
	`avatar_eye_list` varchar(255) DEFAULT '''',
	`avatar_eye_new_list` varchar(255) DEFAULT '''',
	`avatar_hair_list` varchar(255) DEFAULT '''',
	`avatar_hair_new_list` varchar(255) DEFAULT '''',
	`avatar_body_list` varchar(255) DEFAULT '''',
	`avatar_body_new_list` varchar(255) DEFAULT '''',
	`avatar_mouth_list` varchar(255) DEFAULT '''',
	`avatar_mouth_new_list` varchar(255) DEFAULT '''',
	`avatar_glasses_list` varchar(255) DEFAULT '''',
	`avatar_glasses_new_list` varchar(255) DEFAULT '''',
	`avatar_face_accessory_list` varchar(255) DEFAULT '''',
	`avatar_face_accessory_new_list` varchar(255) DEFAULT '''',
	`avatar_body_accessory_list` varchar(255) DEFAULT '''',
	`avatar_body_accessory_new_list` varchar(255) DEFAULT '''',
	`avatar_behind_list` varchar(255) DEFAULT '''',
	`avatar_behind_new_list` varchar(255) DEFAULT '''',
	`avatar_bg_list` varchar(255) DEFAULT '''',
	`avatar_bg_new_list` varchar(255) DEFAULT '''',
	`avatar_effect_list` varchar(255) DEFAULT '''',
	`avatar_effect_new_list` varchar(255) DEFAULT '''',
	`avatar_special_list` varchar(255) DEFAULT '''',
	`avatar_special_new_list` varchar(255) DEFAULT '''',
	`stamp_list` varchar(255) DEFAULT '''',
	`stamp_new_list` varchar(255) DEFAULT '''',
	`keyholder_list` varchar(256) DEFAULT '''',
	`keyholder_new_list` varchar(256) DEFAULT '''',
	`papercup_list` varchar(255) DEFAULT '''',
	`papercup_new_list` varchar(255) DEFAULT '''',
	`tachometer_list` varchar(255) DEFAULT '''',
	`tachometer_new_list` varchar(255) DEFAULT '''',
	`aura_list` varchar(255) DEFAULT '''',
	`aura_new_list` varchar(255) DEFAULT '''',
	`aura_color_list` varchar(255) DEFAULT '''',
	`aura_color_new_list` varchar(255) DEFAULT '''',
	`aura_line_list` varchar(255) DEFAULT '''',
	`aura_line_new_list` varchar(255) DEFAULT '''',
	`bgm_list` varchar(255) DEFAULT '''',
	`bgm_new_list` varchar(255) DEFAULT '''',
	`dx_color_list` varchar(255) DEFAULT '''',
	`dx_color_new_list` varchar(255) DEFAULT '''',
	`start_menu_bg_list` varchar(255) DEFAULT '''',
	`start_menu_bg_new_list` varchar(255) DEFAULT '''',
	`under_neon_list` varchar(255) DEFAULT '''',
	CONSTRAINT `idac_profile_stock_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `idac_profile_theory` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`play_count` int(11) DEFAULT 0,
	`play_count_multi` int(11) DEFAULT 0,
	`partner_id` int(11) DEFAULT 'NULL',
	`partner_progress` int(11) DEFAULT 'NULL',
	`partner_progress_score` int(11) DEFAULT 'NULL',
	`practice_start_rank` int(11) DEFAULT 0,
	`general_flag` int(11) DEFAULT 0,
	`vs_history` int(11) DEFAULT 0,
	`vs_history_multi` int(11) DEFAULT 0,
	`win_count` int(11) DEFAULT 0,
	`win_count_multi` int(11) DEFAULT 0,
	CONSTRAINT `idac_profile_theory_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_car` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`version` int(11) NOT NULL,
	`car_id` int(11) DEFAULT 'NULL',
	`style_car_id` int(11) DEFAULT 'NULL',
	`color` int(11) DEFAULT 'NULL',
	`bureau` int(11) DEFAULT 'NULL',
	`kana` int(11) DEFAULT 'NULL',
	`s_no` int(11) DEFAULT 'NULL',
	`l_no` int(11) DEFAULT 'NULL',
	`car_flag` int(11) DEFAULT 'NULL',
	`tune_point` int(11) DEFAULT 'NULL',
	`tune_level` int(11) DEFAULT 1,
	`tune_parts` int(11) DEFAULT 'NULL',
	`infinity_tune` int(11) DEFAULT 0,
	`online_vs_win` int(11) DEFAULT 0,
	`pickup_seq` int(11) DEFAULT 1,
	`purchase_seq` int(11) DEFAULT 1,
	`color_stock_list` varchar(32) DEFAULT 'NULL',
	`color_stock_new_list` varchar(32) DEFAULT 'NULL',
	`parts_stock_list` varchar(48) DEFAULT 'NULL',
	`parts_stock_new_list` varchar(48) DEFAULT 'NULL',
	`parts_set_equip_list` varchar(48) DEFAULT 'NULL',
	`parts_list` longtext DEFAULT 'NULL',
	`equip_parts_count` int(11) DEFAULT 0,
	`total_car_parts_count` int(11) DEFAULT 0,
	`use_count` int(11) DEFAULT 0,
	`story_use_count` int(11) DEFAULT 0,
	`timetrial_use_count` int(11) DEFAULT 0,
	`vs_use_count` int(11) DEFAULT 0,
	`net_vs_use_count` int(11) DEFAULT 0,
	`theory_use_count` int(11) DEFAULT 0,
	`car_mileage` int(11) DEFAULT 0,
	CONSTRAINT `idac_user_car_uk` UNIQUE(`user`,`version`,`style_car_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_challenge` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`vs_type` int(11) DEFAULT 'NULL',
	`play_difficulty` int(11) DEFAULT 'NULL',
	`cleared_difficulty` int(11) DEFAULT 'NULL',
	`story_type` int(11) DEFAULT 'NULL',
	`play_count` int(11) DEFAULT 1,
	`weak_difficulty` int(11) DEFAULT 0,
	`eval_id` int(11) DEFAULT 'NULL',
	`advantage` int(11) DEFAULT 'NULL',
	`sec1_advantage_avg` int(11) DEFAULT 'NULL',
	`sec2_advantage_avg` int(11) DEFAULT 'NULL',
	`sec3_advantage_avg` int(11) DEFAULT 'NULL',
	`sec4_advantage_avg` int(11) DEFAULT 'NULL',
	`nearby_advantage_rate` int(11) DEFAULT 'NULL',
	`win_flag` int(11) DEFAULT 'NULL',
	`result` int(11) DEFAULT 'NULL',
	`record` int(11) DEFAULT 'NULL',
	`course_id` int(11) DEFAULT 'NULL',
	`last_play_course_id` int(11) DEFAULT 'NULL',
	`style_car_id` int(11) DEFAULT 'NULL',
	`course_day` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_challenge_uk` UNIQUE(`user`,`vs_type`,`play_difficulty`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_course` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`course_id` int(11) DEFAULT 'NULL',
	`run_counts` int(11) DEFAULT 1,
	`skill_level_exp` int(11) DEFAULT 0,
	CONSTRAINT `idac_user_course_uk` UNIQUE(`user`,`course_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_stamp` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`m_stamp_event_id` int(11) DEFAULT 'NULL',
	`select_flag` int(11) DEFAULT 'NULL',
	`stamp_masu` int(11) DEFAULT 'NULL',
	`daily_bonus` int(11) DEFAULT 'NULL',
	`weekly_bonus` int(11) DEFAULT 'NULL',
	`weekday_bonus` int(11) DEFAULT 'NULL',
	`weekend_bonus` int(11) DEFAULT 'NULL',
	`total_bonus` int(11) DEFAULT 'NULL',
	`day_total_bonus` int(11) DEFAULT 'NULL',
	`store_battle_bonus` int(11) DEFAULT 'NULL',
	`story_bonus` int(11) DEFAULT 'NULL',
	`online_battle_bonus` int(11) DEFAULT 'NULL',
	`timetrial_bonus` int(11) DEFAULT 'NULL',
	`fasteststreetlegaltheory_bonus` int(11) DEFAULT 'NULL',
	`collaboration_bonus` int(11) DEFAULT 'NULL',
	`add_bonus_daily_flag_1` int(11) DEFAULT 'NULL',
	`add_bonus_daily_flag_2` int(11) DEFAULT 'NULL',
	`add_bonus_daily_flag_3` int(11) DEFAULT 'NULL',
	`create_date_daily` timestamp DEFAULT 'current_timestamp()',
	`create_date_weekly` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `idac_user_stamp_uk` UNIQUE(`user`,`m_stamp_event_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_story` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`story_type` int(11) DEFAULT 'NULL',
	`chapter` int(11) DEFAULT 'NULL',
	`loop_count` int(11) DEFAULT 1,
	CONSTRAINT `idac_user_story_uk` UNIQUE(`user`,`chapter`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_story_episode` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`chapter` int(11) DEFAULT 'NULL',
	`episode` int(11) DEFAULT 'NULL',
	`play_status` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_story_episode_uk` UNIQUE(`user`,`chapter`,`episode`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_story_episode_difficulty` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`episode` int(11) DEFAULT 'NULL',
	`difficulty` int(11) DEFAULT 'NULL',
	`play_count` int(11) DEFAULT 'NULL',
	`clear_count` int(11) DEFAULT 'NULL',
	`play_status` int(11) DEFAULT 'NULL',
	`play_score` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_story_episode_difficulty_uk` UNIQUE(`user`,`episode`,`difficulty`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_theory_course` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`course_id` int(11) DEFAULT 'NULL',
	`max_victory_grade` int(11) DEFAULT 0,
	`run_count` int(11) DEFAULT 1,
	`powerhouse_lv` int(11) DEFAULT 'NULL',
	`powerhouse_exp` int(11) DEFAULT 'NULL',
	`played_powerhouse_lv` int(11) DEFAULT 'NULL',
	`update_dt` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `idac_user_theory_course_uk` UNIQUE(`user`,`course_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_theory_partner` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`partner_id` int(11) DEFAULT 'NULL',
	`fellowship_lv` int(11) DEFAULT 'NULL',
	`fellowship_exp` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_theory_partner_uk` UNIQUE(`user`,`partner_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_theory_running` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`course_id` int(11) DEFAULT 'NULL',
	`attack` int(11) DEFAULT 'NULL',
	`defense` int(11) DEFAULT 'NULL',
	`safety` int(11) DEFAULT 'NULL',
	`runaway` int(11) DEFAULT 'NULL',
	`trick_flag` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_theory_running_uk` UNIQUE(`user`,`course_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_ticket` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`ticket_id` int(11) DEFAULT 'NULL',
	`ticket_cnt` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_ticket_uk` UNIQUE(`user`,`ticket_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_timetrial_event` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`timetrial_event_id` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_timetrial_event_uk` UNIQUE(`user`,`timetrial_event_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_time_trial` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`version` int(11) NOT NULL,
	`style_car_id` int(11) DEFAULT 'NULL',
	`course_id` int(11) DEFAULT 'NULL',
	`eval_id` int(11) DEFAULT 0,
	`goal_time` int(11) DEFAULT 'NULL',
	`section_time_1` int(11) DEFAULT 'NULL',
	`section_time_2` int(11) DEFAULT 'NULL',
	`section_time_3` int(11) DEFAULT 'NULL',
	`section_time_4` int(11) DEFAULT 'NULL',
	`mission` int(11) DEFAULT 'NULL',
	`play_dt` timestamp DEFAULT 'current_timestamp()',
	CONSTRAINT `idac_user_time_trial_uk` UNIQUE(`user`,`version`,`course_id`,`style_car_id`)
);
--> statement-breakpoint
CREATE TABLE `idac_user_vs_info` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`group_key` varchar(25) DEFAULT 'NULL',
	`win_flg` int(11) DEFAULT 'NULL',
	`style_car_id` int(11) DEFAULT 'NULL',
	`course_id` int(11) DEFAULT 'NULL',
	`course_day` int(11) DEFAULT 'NULL',
	`players_num` int(11) DEFAULT 'NULL',
	`winning` int(11) DEFAULT 'NULL',
	`advantage_1` int(11) DEFAULT 'NULL',
	`advantage_2` int(11) DEFAULT 'NULL',
	`advantage_3` int(11) DEFAULT 'NULL',
	`advantage_4` int(11) DEFAULT 'NULL',
	`select_course_id` int(11) DEFAULT 'NULL',
	`select_course_day` int(11) DEFAULT 'NULL',
	`select_course_random` int(11) DEFAULT 'NULL',
	`matching_success_sec` int(11) DEFAULT 'NULL',
	`boost_flag` int(11) DEFAULT 'NULL',
	`vs_history` int(11) DEFAULT 'NULL',
	`break_count` int(11) DEFAULT 'NULL',
	`break_penalty_flag` int(11) DEFAULT 'NULL',
	CONSTRAINT `idac_user_vs_info_uk` UNIQUE(`user`,`group_key`)
);
--> statement-breakpoint
CREATE TABLE `machine` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`arcade` int(11) NOT NULL,
	`serial` varchar(15) NOT NULL,
	`board` varchar(15) DEFAULT 'NULL',
	`game` varchar(4) DEFAULT 'NULL',
	`country` varchar(3) DEFAULT 'NULL',
	`timezone` varchar(255) DEFAULT 'NULL',
	`ota_enable` tinyint DEFAULT 'NULL',
	`memo` varchar(255) DEFAULT 'NULL',
	`is_cab` tinyint DEFAULT 'NULL',
	`data` longtext DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `mai2_item_card` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`cardId` int(11) DEFAULT 'NULL',
	`cardTypeId` int(11) DEFAULT 'NULL',
	`charaId` int(11) DEFAULT 'NULL',
	`mapId` int(11) DEFAULT 'NULL',
	`startDate` timestamp DEFAULT 'current_timestamp()',
	`endDate` timestamp DEFAULT 'NULL',
	CONSTRAINT `mai2_item_card_uk` UNIQUE(`user`,`cardId`,`cardTypeId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_character` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`characterId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`awakening` int(11) DEFAULT 'NULL',
	`useCount` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_item_character_uk` UNIQUE(`user`,`characterId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_charge` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`chargeId` int(11) DEFAULT 'NULL',
	`stock` int(11) DEFAULT 'NULL',
	`purchaseDate` varchar(255) DEFAULT 'NULL',
	`validDate` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `mai2_item_charge_uk` UNIQUE(`user`,`chargeId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_favorite` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`itemKind` int(11) DEFAULT 'NULL',
	`itemIdList` longtext DEFAULT 'NULL',
	CONSTRAINT `mai2_item_favorite_uk` UNIQUE(`user`,`itemKind`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_friend_season_ranking` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`seasonId` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	`rank` int(11) DEFAULT 'NULL',
	`rewardGet` tinyint DEFAULT 'NULL',
	`userName` varchar(8) DEFAULT 'NULL',
	`recordDate` timestamp DEFAULT 'NULL',
	CONSTRAINT `mai2_item_friend_season_ranking_uk` UNIQUE(`user`,`seasonId`,`userName`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`itemId` int(11) DEFAULT 'NULL',
	`itemKind` int(11) DEFAULT 'NULL',
	`stock` int(11) DEFAULT 'NULL',
	`isValid` tinyint DEFAULT 'NULL',
	CONSTRAINT `mai2_item_item_uk` UNIQUE(`user`,`itemId`,`itemKind`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_login_bonus` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`bonusId` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	`isCurrent` tinyint DEFAULT 'NULL',
	`isComplete` tinyint DEFAULT 'NULL',
	CONSTRAINT `mai2_item_login_bonus_uk` UNIQUE(`user`,`bonusId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_map` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`mapId` int(11) DEFAULT 'NULL',
	`distance` int(11) DEFAULT 'NULL',
	`isLock` tinyint DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`isComplete` tinyint DEFAULT 'NULL',
	CONSTRAINT `mai2_item_map_uk` UNIQUE(`user`,`mapId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_item_print_detail` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`orderId` int(11) DEFAULT 'NULL',
	`printNumber` int(11) DEFAULT 'NULL',
	`printDate` timestamp DEFAULT 'current_timestamp()',
	`serialId` varchar(20) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`clientId` varchar(11) DEFAULT 'NULL',
	`printerSerialId` varchar(20) DEFAULT 'NULL',
	`cardRomVersion` int(11) DEFAULT 'NULL',
	`isHolograph` tinyint DEFAULT 1,
	`printOption1` tinyint DEFAULT 0,
	`printOption2` tinyint DEFAULT 0,
	`printOption3` tinyint DEFAULT 0,
	`printOption4` tinyint DEFAULT 0,
	`printOption5` tinyint DEFAULT 0,
	`printOption6` tinyint DEFAULT 0,
	`printOption7` tinyint DEFAULT 0,
	`printOption8` tinyint DEFAULT 0,
	`printOption9` tinyint DEFAULT 0,
	`printOption10` tinyint DEFAULT 0,
	`created` varchar(255) DEFAULT '''',
	CONSTRAINT `mai2_item_print_detail_uk` UNIQUE(`user`,`serialId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`userId` bigint(20) DEFAULT 'NULL',
	`orderId` int(11) DEFAULT 'NULL',
	`playlogId` bigint(20) DEFAULT 'NULL',
	`version` int(11) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`placeName` varchar(255) DEFAULT 'NULL',
	`loginDate` bigint(20) DEFAULT 'NULL',
	`playDate` varchar(255) DEFAULT 'NULL',
	`userPlayDate` varchar(255) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`trackNo` int(11) DEFAULT 'NULL',
	`vsMode` int(11) DEFAULT 'NULL',
	`vsUserName` varchar(255) DEFAULT 'NULL',
	`vsStatus` int(11) DEFAULT 'NULL',
	`vsUserRating` int(11) DEFAULT 'NULL',
	`vsUserAchievement` int(11) DEFAULT 'NULL',
	`vsUserGradeRank` int(11) DEFAULT 'NULL',
	`vsRank` int(11) DEFAULT 'NULL',
	`playerNum` int(11) DEFAULT 'NULL',
	`playedUserId1` bigint(20) DEFAULT 'NULL',
	`playedUserName1` varchar(255) DEFAULT 'NULL',
	`playedMusicLevel1` int(11) DEFAULT 'NULL',
	`playedUserId2` bigint(20) DEFAULT 'NULL',
	`playedUserName2` varchar(255) DEFAULT 'NULL',
	`playedMusicLevel2` int(11) DEFAULT 'NULL',
	`playedUserId3` bigint(20) DEFAULT 'NULL',
	`playedUserName3` varchar(255) DEFAULT 'NULL',
	`playedMusicLevel3` int(11) DEFAULT 'NULL',
	`characterId1` int(11) DEFAULT 'NULL',
	`characterLevel1` int(11) DEFAULT 'NULL',
	`characterAwakening1` int(11) DEFAULT 'NULL',
	`characterId2` int(11) DEFAULT 'NULL',
	`characterLevel2` int(11) DEFAULT 'NULL',
	`characterAwakening2` int(11) DEFAULT 'NULL',
	`characterId3` int(11) DEFAULT 'NULL',
	`characterLevel3` int(11) DEFAULT 'NULL',
	`characterAwakening3` int(11) DEFAULT 'NULL',
	`characterId4` int(11) DEFAULT 'NULL',
	`characterLevel4` int(11) DEFAULT 'NULL',
	`characterAwakening4` int(11) DEFAULT 'NULL',
	`characterId5` int(11) DEFAULT 'NULL',
	`characterLevel5` int(11) DEFAULT 'NULL',
	`characterAwakening5` int(11) DEFAULT 'NULL',
	`achievement` int(11) DEFAULT 'NULL',
	`deluxscore` int(11) DEFAULT 'NULL',
	`scoreRank` int(11) DEFAULT 'NULL',
	`maxCombo` int(11) DEFAULT 'NULL',
	`totalCombo` int(11) DEFAULT 'NULL',
	`maxSync` int(11) DEFAULT 'NULL',
	`totalSync` int(11) DEFAULT 'NULL',
	`tapCriticalPerfect` int(11) DEFAULT 'NULL',
	`tapPerfect` int(11) DEFAULT 'NULL',
	`tapGreat` int(11) DEFAULT 'NULL',
	`tapGood` int(11) DEFAULT 'NULL',
	`tapMiss` int(11) DEFAULT 'NULL',
	`holdCriticalPerfect` int(11) DEFAULT 'NULL',
	`holdPerfect` int(11) DEFAULT 'NULL',
	`holdGreat` int(11) DEFAULT 'NULL',
	`holdGood` int(11) DEFAULT 'NULL',
	`holdMiss` int(11) DEFAULT 'NULL',
	`slideCriticalPerfect` int(11) DEFAULT 'NULL',
	`slidePerfect` int(11) DEFAULT 'NULL',
	`slideGreat` int(11) DEFAULT 'NULL',
	`slideGood` int(11) DEFAULT 'NULL',
	`slideMiss` int(11) DEFAULT 'NULL',
	`touchCriticalPerfect` int(11) DEFAULT 'NULL',
	`touchPerfect` int(11) DEFAULT 'NULL',
	`touchGreat` int(11) DEFAULT 'NULL',
	`touchGood` int(11) DEFAULT 'NULL',
	`touchMiss` int(11) DEFAULT 'NULL',
	`breakCriticalPerfect` int(11) DEFAULT 'NULL',
	`breakPerfect` int(11) DEFAULT 'NULL',
	`breakGreat` int(11) DEFAULT 'NULL',
	`breakGood` int(11) DEFAULT 'NULL',
	`breakMiss` int(11) DEFAULT 'NULL',
	`isTap` tinyint DEFAULT 'NULL',
	`isHold` tinyint DEFAULT 'NULL',
	`isSlide` tinyint DEFAULT 'NULL',
	`isTouch` tinyint DEFAULT 'NULL',
	`isBreak` tinyint DEFAULT 'NULL',
	`isCriticalDisp` tinyint DEFAULT 'NULL',
	`isFastLateDisp` tinyint DEFAULT 'NULL',
	`fastCount` int(11) DEFAULT 'NULL',
	`lateCount` int(11) DEFAULT 'NULL',
	`isAchieveNewRecord` tinyint DEFAULT 'NULL',
	`isDeluxscoreNewRecord` tinyint DEFAULT 'NULL',
	`comboStatus` int(11) DEFAULT 'NULL',
	`syncStatus` int(11) DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`beforeRating` int(11) DEFAULT 'NULL',
	`afterRating` int(11) DEFAULT 'NULL',
	`beforeGrade` int(11) DEFAULT 'NULL',
	`afterGrade` int(11) DEFAULT 'NULL',
	`afterGradeRank` int(11) DEFAULT 'NULL',
	`beforeDeluxRating` int(11) DEFAULT 'NULL',
	`afterDeluxRating` int(11) DEFAULT 'NULL',
	`isPlayTutorial` tinyint DEFAULT 'NULL',
	`isEventMode` tinyint DEFAULT 'NULL',
	`isFreedomMode` tinyint DEFAULT 'NULL',
	`playMode` int(11) DEFAULT 'NULL',
	`isNewFree` tinyint DEFAULT 'NULL',
	`extNum1` int(11) DEFAULT 'NULL',
	`extNum2` int(11) DEFAULT 'NULL',
	`extNum4` int(11) DEFAULT 0,
	`trialPlayAchievement` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_activity` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`kind` int(11) DEFAULT 'NULL',
	`activityId` int(11) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`param3` int(11) DEFAULT 'NULL',
	`param4` int(11) DEFAULT 'NULL',
	`sortNumber` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_activity_uk` UNIQUE(`user`,`kind`,`activityId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_consec_logins` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`logins` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_consec_logins_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_detail` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`userName` varchar(25) DEFAULT 'NULL',
	`isNetMember` int(11) DEFAULT 'NULL',
	`iconId` int(11) DEFAULT 'NULL',
	`plateId` int(11) DEFAULT 'NULL',
	`titleId` int(11) DEFAULT 'NULL',
	`partnerId` int(11) DEFAULT 'NULL',
	`frameId` int(11) DEFAULT 'NULL',
	`selectMapId` int(11) DEFAULT 'NULL',
	`totalAwake` int(11) DEFAULT 'NULL',
	`gradeRating` int(11) DEFAULT 'NULL',
	`musicRating` int(11) DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`highestRating` int(11) DEFAULT 'NULL',
	`gradeRank` int(11) DEFAULT 'NULL',
	`classRank` int(11) DEFAULT 'NULL',
	`courseRank` int(11) DEFAULT 'NULL',
	`charaSlot` longtext DEFAULT 'NULL',
	`charaLockSlot` longtext DEFAULT 'NULL',
	`contentBit` bigint(20) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`mapStock` int(11) DEFAULT 'NULL',
	`eventWatchedDate` varchar(25) DEFAULT 'NULL',
	`lastGameId` varchar(25) DEFAULT 'NULL',
	`lastRomVersion` varchar(25) DEFAULT 'NULL',
	`lastDataVersion` varchar(25) DEFAULT 'NULL',
	`lastLoginDate` varchar(25) DEFAULT 'NULL',
	`lastPairLoginDate` varchar(25) DEFAULT 'NULL',
	`lastPlayDate` varchar(25) DEFAULT 'NULL',
	`lastTrialPlayDate` varchar(25) DEFAULT 'NULL',
	`lastPlayCredit` int(11) DEFAULT 'NULL',
	`lastPlayMode` int(11) DEFAULT 'NULL',
	`lastPlaceId` int(11) DEFAULT 'NULL',
	`lastPlaceName` varchar(25) DEFAULT 'NULL',
	`lastAllNetId` int(11) DEFAULT 'NULL',
	`lastRegionId` int(11) DEFAULT 'NULL',
	`lastRegionName` varchar(25) DEFAULT 'NULL',
	`lastClientId` varchar(25) DEFAULT 'NULL',
	`lastCountryCode` varchar(25) DEFAULT 'NULL',
	`lastSelectEMoney` int(11) DEFAULT 'NULL',
	`lastSelectTicket` int(11) DEFAULT 'NULL',
	`lastSelectCourse` int(11) DEFAULT 'NULL',
	`lastCountCourse` int(11) DEFAULT 'NULL',
	`firstGameId` varchar(25) DEFAULT 'NULL',
	`firstRomVersion` varchar(25) DEFAULT 'NULL',
	`firstDataVersion` varchar(25) DEFAULT 'NULL',
	`firstPlayDate` varchar(25) DEFAULT 'NULL',
	`compatibleCmVersion` varchar(25) DEFAULT 'NULL',
	`dailyBonusDate` varchar(25) DEFAULT 'NULL',
	`dailyCourseBonusDate` varchar(25) DEFAULT 'NULL',
	`playVsCount` int(11) DEFAULT 'NULL',
	`playSyncCount` int(11) DEFAULT 'NULL',
	`winCount` int(11) DEFAULT 'NULL',
	`helpCount` int(11) DEFAULT 'NULL',
	`comboCount` int(11) DEFAULT 'NULL',
	`totalDeluxscore` bigint(20) DEFAULT 'NULL',
	`totalBasicDeluxscore` bigint(20) DEFAULT 'NULL',
	`totalAdvancedDeluxscore` bigint(20) DEFAULT 'NULL',
	`totalExpertDeluxscore` bigint(20) DEFAULT 'NULL',
	`totalMasterDeluxscore` bigint(20) DEFAULT 'NULL',
	`totalReMasterDeluxscore` bigint(20) DEFAULT 'NULL',
	`totalSync` int(11) DEFAULT 'NULL',
	`totalBasicSync` int(11) DEFAULT 'NULL',
	`totalAdvancedSync` int(11) DEFAULT 'NULL',
	`totalExpertSync` int(11) DEFAULT 'NULL',
	`totalMasterSync` int(11) DEFAULT 'NULL',
	`totalReMasterSync` int(11) DEFAULT 'NULL',
	`totalAchievement` bigint(20) DEFAULT 'NULL',
	`totalBasicAchievement` bigint(20) DEFAULT 'NULL',
	`totalAdvancedAchievement` bigint(20) DEFAULT 'NULL',
	`totalExpertAchievement` bigint(20) DEFAULT 'NULL',
	`totalMasterAchievement` bigint(20) DEFAULT 'NULL',
	`totalReMasterAchievement` bigint(20) DEFAULT 'NULL',
	`playerOldRating` bigint(20) DEFAULT 'NULL',
	`playerNewRating` bigint(20) DEFAULT 'NULL',
	`dateTime` bigint(20) DEFAULT 'NULL',
	`banState` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_detail_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_extend` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`selectMusicId` int(11) DEFAULT 'NULL',
	`selectDifficultyId` int(11) DEFAULT 'NULL',
	`categoryIndex` int(11) DEFAULT 'NULL',
	`musicIndex` int(11) DEFAULT 'NULL',
	`extraFlag` int(11) DEFAULT 'NULL',
	`selectScoreType` int(11) DEFAULT 'NULL',
	`extendContentBit` bigint(20) DEFAULT 'NULL',
	`isPhotoAgree` tinyint DEFAULT 'NULL',
	`isGotoCodeRead` tinyint DEFAULT 'NULL',
	`selectResultDetails` tinyint DEFAULT 'NULL',
	`selectResultScoreViewType` int(11) DEFAULT 'NULL',
	`sortCategorySetting` int(11) DEFAULT 'NULL',
	`sortMusicSetting` int(11) DEFAULT 'NULL',
	`selectedCardList` longtext DEFAULT 'NULL',
	`encountMapNpcList` longtext DEFAULT 'NULL',
	`playStatusSetting` int(11) DEFAULT 0,
	CONSTRAINT `mai2_profile_extend_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_ghost` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version_int` int(11) NOT NULL,
	`name` varchar(25) DEFAULT 'NULL',
	`iconId` int(11) DEFAULT 'NULL',
	`plateId` int(11) DEFAULT 'NULL',
	`titleId` int(11) DEFAULT 'NULL',
	`rate` int(11) DEFAULT 'NULL',
	`udemaeRate` int(11) DEFAULT 'NULL',
	`courseRank` int(11) DEFAULT 'NULL',
	`classRank` int(11) DEFAULT 'NULL',
	`classValue` int(11) DEFAULT 'NULL',
	`playDatetime` varchar(25) DEFAULT 'NULL',
	`shopId` int(11) DEFAULT 'NULL',
	`regionCode` int(11) DEFAULT 'NULL',
	`typeId` int(11) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`difficulty` int(11) DEFAULT 'NULL',
	`version` int(11) DEFAULT 'NULL',
	`resultBitList` longtext DEFAULT 'NULL',
	`resultNum` int(11) DEFAULT 'NULL',
	`achievement` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_ghost_uk` UNIQUE(`user`,`version`,`musicId`,`difficulty`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_option` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`selectMusicId` int(11) DEFAULT 'NULL',
	`optionKind` int(11) DEFAULT 'NULL',
	`noteSpeed` int(11) DEFAULT 'NULL',
	`slideSpeed` int(11) DEFAULT 'NULL',
	`touchSpeed` int(11) DEFAULT 'NULL',
	`tapDesign` int(11) DEFAULT 'NULL',
	`tapSe` int(11) DEFAULT 0,
	`holdDesign` int(11) DEFAULT 'NULL',
	`slideDesign` int(11) DEFAULT 'NULL',
	`starType` int(11) DEFAULT 'NULL',
	`outlineDesign` int(11) DEFAULT 'NULL',
	`noteSize` int(11) DEFAULT 'NULL',
	`slideSize` int(11) DEFAULT 'NULL',
	`touchSize` int(11) DEFAULT 'NULL',
	`starRotate` int(11) DEFAULT 'NULL',
	`dispCenter` int(11) DEFAULT 'NULL',
	`outFrameType` int(11) DEFAULT 'NULL',
	`dispChain` int(11) DEFAULT 'NULL',
	`dispRate` int(11) DEFAULT 'NULL',
	`dispBar` int(11) DEFAULT 'NULL',
	`touchEffect` int(11) DEFAULT 'NULL',
	`submonitorAnimation` int(11) DEFAULT 'NULL',
	`submonitorAchive` int(11) DEFAULT 'NULL',
	`submonitorAppeal` int(11) DEFAULT 'NULL',
	`matching` int(11) DEFAULT 'NULL',
	`trackSkip` int(11) DEFAULT 'NULL',
	`brightness` int(11) DEFAULT 'NULL',
	`mirrorMode` int(11) DEFAULT 'NULL',
	`dispJudge` int(11) DEFAULT 'NULL',
	`dispJudgePos` int(11) DEFAULT 'NULL',
	`dispJudgeTouchPos` int(11) DEFAULT 'NULL',
	`adjustTiming` int(11) DEFAULT 'NULL',
	`judgeTiming` int(11) DEFAULT 'NULL',
	`ansVolume` int(11) DEFAULT 'NULL',
	`tapHoldVolume` int(11) DEFAULT 'NULL',
	`criticalSe` int(11) DEFAULT 'NULL',
	`breakSe` int(11) DEFAULT 'NULL',
	`breakVolume` int(11) DEFAULT 'NULL',
	`exSe` int(11) DEFAULT 'NULL',
	`exVolume` int(11) DEFAULT 'NULL',
	`slideSe` int(11) DEFAULT 'NULL',
	`slideVolume` int(11) DEFAULT 'NULL',
	`breakSlideVolume` int(11) DEFAULT 'NULL',
	`touchVolume` int(11) DEFAULT 'NULL',
	`touchHoldVolume` int(11) DEFAULT 'NULL',
	`damageSeVolume` int(11) DEFAULT 'NULL',
	`headPhoneVolume` int(11) DEFAULT 'NULL',
	`sortTab` int(11) DEFAULT 'NULL',
	`sortMusic` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_option_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_rating` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`rating` int(11) DEFAULT 'NULL',
	`ratingList` longtext DEFAULT 'NULL',
	`newRatingList` longtext DEFAULT 'NULL',
	`nextRatingList` longtext DEFAULT 'NULL',
	`nextNewRatingList` longtext DEFAULT 'NULL',
	`udemae` longtext DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_rating_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `mai2_profile_region` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`regionId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 1,
	`created` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_region_uk` UNIQUE(`user`,`regionId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_score_best` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`achievement` int(11) DEFAULT 'NULL',
	`comboStatus` int(11) DEFAULT 'NULL',
	`syncStatus` int(11) DEFAULT 'NULL',
	`deluxscoreMax` int(11) DEFAULT 'NULL',
	`scoreRank` int(11) DEFAULT 'NULL',
	`extNum1` int(11) DEFAULT 0,
	CONSTRAINT `mai2_score_best_uk` UNIQUE(`user`,`musicId`,`level`)
);
--> statement-breakpoint
CREATE TABLE `mai2_score_course` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`courseId` int(11) DEFAULT 'NULL',
	`isLastClear` tinyint DEFAULT 'NULL',
	`totalRestlife` int(11) DEFAULT 'NULL',
	`totalAchievement` int(11) DEFAULT 'NULL',
	`totalDeluxscore` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`clearDate` varchar(25) DEFAULT 'NULL',
	`lastPlayDate` varchar(25) DEFAULT 'NULL',
	`bestAchievement` int(11) DEFAULT 'NULL',
	`bestAchievementDate` varchar(25) DEFAULT 'NULL',
	`bestDeluxscore` int(11) DEFAULT 'NULL',
	`bestDeluxscoreDate` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `mai2_score_best_uk` UNIQUE(`user`,`courseId`)
);
--> statement-breakpoint
CREATE TABLE `mai2_static_cards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`cardName` varchar(255) NOT NULL,
	`startDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`endDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	`noticeStartDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`noticeEndDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `mai2_static_cards_uk` UNIQUE(`version`,`cardId`,`cardName`)
);
--> statement-breakpoint
CREATE TABLE `mai2_static_event` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`eventId` int(11) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`startDate` timestamp DEFAULT 'current_timestamp()',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `mai2_static_event_uk` UNIQUE(`version`,`eventId`,`type`)
);
--> statement-breakpoint
CREATE TABLE `mai2_static_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`songId` int(11) DEFAULT 'NULL',
	`chartId` int(11) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`artist` varchar(255) DEFAULT 'NULL',
	`genre` varchar(255) DEFAULT 'NULL',
	`bpm` int(11) DEFAULT 'NULL',
	`addedVersion` varchar(255) DEFAULT 'NULL',
	`difficulty` float DEFAULT 'NULL',
	`noteDesigner` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `mai2_static_music_uk` UNIQUE(`songId`,`chartId`,`version`)
);
--> statement-breakpoint
CREATE TABLE `mai2_static_ticket` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`ticketId` int(11) DEFAULT 'NULL',
	`kind` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`price` int(11) DEFAULT 1,
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `mai2_static_ticket_uk` UNIQUE(`version`,`ticketId`)
);
--> statement-breakpoint
CREATE TABLE `maimai_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`orderId` int(11) DEFAULT 'NULL',
	`sortNumber` int(11) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`placeName` varchar(255) DEFAULT 'NULL',
	`country` varchar(255) DEFAULT 'NULL',
	`regionId` int(11) DEFAULT 'NULL',
	`playDate` varchar(255) DEFAULT 'NULL',
	`userPlayDate` varchar(255) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`gameMode` int(11) DEFAULT 'NULL',
	`rivalNum` int(11) DEFAULT 'NULL',
	`track` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`isFreeToPlay` tinyint DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`playedUserId1` int(11) DEFAULT 'NULL',
	`playedUserId2` int(11) DEFAULT 'NULL',
	`playedUserId3` int(11) DEFAULT 'NULL',
	`playedUserName1` varchar(255) DEFAULT 'NULL',
	`playedUserName2` varchar(255) DEFAULT 'NULL',
	`playedUserName3` varchar(255) DEFAULT 'NULL',
	`playedMusicLevel1` int(11) DEFAULT 'NULL',
	`playedMusicLevel2` int(11) DEFAULT 'NULL',
	`playedMusicLevel3` int(11) DEFAULT 'NULL',
	`achievement` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`tapScore` int(11) DEFAULT 'NULL',
	`holdScore` int(11) DEFAULT 'NULL',
	`slideScore` int(11) DEFAULT 'NULL',
	`breakScore` int(11) DEFAULT 'NULL',
	`syncRate` int(11) DEFAULT 'NULL',
	`vsWin` int(11) DEFAULT 'NULL',
	`isAllPerfect` tinyint DEFAULT 'NULL',
	`fullCombo` int(11) DEFAULT 'NULL',
	`maxFever` int(11) DEFAULT 'NULL',
	`maxCombo` int(11) DEFAULT 'NULL',
	`tapPerfect` int(11) DEFAULT 'NULL',
	`tapGreat` int(11) DEFAULT 'NULL',
	`tapGood` int(11) DEFAULT 'NULL',
	`tapBad` int(11) DEFAULT 'NULL',
	`holdPerfect` int(11) DEFAULT 'NULL',
	`holdGreat` int(11) DEFAULT 'NULL',
	`holdGood` int(11) DEFAULT 'NULL',
	`holdBad` int(11) DEFAULT 'NULL',
	`slidePerfect` int(11) DEFAULT 'NULL',
	`slideGreat` int(11) DEFAULT 'NULL',
	`slideGood` int(11) DEFAULT 'NULL',
	`slideBad` int(11) DEFAULT 'NULL',
	`breakPerfect` int(11) DEFAULT 'NULL',
	`breakGreat` int(11) DEFAULT 'NULL',
	`breakGood` int(11) DEFAULT 'NULL',
	`breakBad` int(11) DEFAULT 'NULL',
	`judgeStyle` int(11) DEFAULT 'NULL',
	`isTrackSkip` tinyint DEFAULT 'NULL',
	`isHighScore` tinyint DEFAULT 'NULL',
	`isChallengeTrack` tinyint DEFAULT 'NULL',
	`challengeLife` int(11) DEFAULT 'NULL',
	`challengeRemain` int(11) DEFAULT 'NULL',
	`isAllPerfectPlus` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `maimai_profile_boss` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`pandoraFlagList0` int(11) DEFAULT 'NULL',
	`pandoraFlagList1` int(11) DEFAULT 'NULL',
	`pandoraFlagList2` int(11) DEFAULT 'NULL',
	`pandoraFlagList3` int(11) DEFAULT 'NULL',
	`pandoraFlagList4` int(11) DEFAULT 'NULL',
	`pandoraFlagList5` int(11) DEFAULT 'NULL',
	`pandoraFlagList6` int(11) DEFAULT 'NULL',
	`emblemFlagList` int(11) DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_boss_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `maimai_profile_detail` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`lastDataVersion` int(11) DEFAULT 'NULL',
	`userName` varchar(8) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	`totalPoint` int(11) DEFAULT 'NULL',
	`iconId` int(11) DEFAULT 'NULL',
	`nameplateId` int(11) DEFAULT 'NULL',
	`frameId` int(11) DEFAULT 'NULL',
	`trophyId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`playVsCount` int(11) DEFAULT 'NULL',
	`playSyncCount` int(11) DEFAULT 'NULL',
	`winCount` int(11) DEFAULT 'NULL',
	`helpCount` int(11) DEFAULT 'NULL',
	`comboCount` int(11) DEFAULT 'NULL',
	`feverCount` int(11) DEFAULT 'NULL',
	`totalHiScore` int(11) DEFAULT 'NULL',
	`totalEasyHighScore` int(11) DEFAULT 'NULL',
	`totalBasicHighScore` int(11) DEFAULT 'NULL',
	`totalAdvancedHighScore` int(11) DEFAULT 'NULL',
	`totalExpertHighScore` int(11) DEFAULT 'NULL',
	`totalMasterHighScore` int(11) DEFAULT 'NULL',
	`totalReMasterHighScore` int(11) DEFAULT 'NULL',
	`totalHighSync` int(11) DEFAULT 'NULL',
	`totalEasySync` int(11) DEFAULT 'NULL',
	`totalBasicSync` int(11) DEFAULT 'NULL',
	`totalAdvancedSync` int(11) DEFAULT 'NULL',
	`totalExpertSync` int(11) DEFAULT 'NULL',
	`totalMasterSync` int(11) DEFAULT 'NULL',
	`totalReMasterSync` int(11) DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`highestRating` int(11) DEFAULT 'NULL',
	`rankAuthTailId` int(11) DEFAULT 'NULL',
	`eventWatchedDate` varchar(255) DEFAULT 'NULL',
	`webLimitDate` varchar(255) DEFAULT 'NULL',
	`challengeTrackPhase` int(11) DEFAULT 'NULL',
	`firstPlayBits` int(11) DEFAULT 'NULL',
	`lastPlayDate` varchar(255) DEFAULT 'NULL',
	`lastPlaceId` int(11) DEFAULT 'NULL',
	`lastPlaceName` varchar(255) DEFAULT 'NULL',
	`lastRegionId` int(11) DEFAULT 'NULL',
	`lastRegionName` varchar(255) DEFAULT 'NULL',
	`lastClientId` varchar(255) DEFAULT 'NULL',
	`lastCountryCode` varchar(255) DEFAULT 'NULL',
	`eventPoint` int(11) DEFAULT 'NULL',
	`totalLv` int(11) DEFAULT 'NULL',
	`lastLoginBonusDay` int(11) DEFAULT 'NULL',
	`lastSurvivalBonusDay` int(11) DEFAULT 'NULL',
	`loginBonusLv` int(11) DEFAULT 'NULL',
	CONSTRAINT `maimai_profile_detail_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `maimai_profile_grade_status` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`gradeVersion` int(11) DEFAULT 'NULL',
	`gradeLevel` int(11) DEFAULT 'NULL',
	`gradeSubLevel` int(11) DEFAULT 'NULL',
	`gradeMaxId` int(11) DEFAULT 'NULL',
	CONSTRAINT `maimai_profile_grade_status_uk` UNIQUE(`user`,`gradeVersion`)
);
--> statement-breakpoint
CREATE TABLE `maimai_profile_option` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`soudEffect` int(11) DEFAULT 'NULL',
	`mirrorMode` int(11) DEFAULT 'NULL',
	`guideSpeed` int(11) DEFAULT 'NULL',
	`bgInfo` int(11) DEFAULT 'NULL',
	`brightness` int(11) DEFAULT 'NULL',
	`isStarRot` int(11) DEFAULT 'NULL',
	`breakSe` int(11) DEFAULT 'NULL',
	`slideSe` int(11) DEFAULT 'NULL',
	`hardJudge` int(11) DEFAULT 'NULL',
	`isTagJump` int(11) DEFAULT 'NULL',
	`breakSeVol` int(11) DEFAULT 'NULL',
	`slideSeVol` int(11) DEFAULT 'NULL',
	`isUpperDisp` int(11) DEFAULT 'NULL',
	`trackSkip` int(11) DEFAULT 'NULL',
	`optionMode` int(11) DEFAULT 'NULL',
	`simpleOptionParam` int(11) DEFAULT 'NULL',
	`adjustTiming` int(11) DEFAULT 'NULL',
	`dispTiming` int(11) DEFAULT 'NULL',
	`timingPos` int(11) DEFAULT 'NULL',
	`ansVol` int(11) DEFAULT 'NULL',
	`noteVol` int(11) DEFAULT 'NULL',
	`dmgVol` int(11) DEFAULT 'NULL',
	`appealFlame` int(11) DEFAULT 'NULL',
	`isFeverDisp` int(11) DEFAULT 'NULL',
	`dispJudge` int(11) DEFAULT 'NULL',
	`judgePos` int(11) DEFAULT 'NULL',
	`ratingGuard` int(11) DEFAULT 'NULL',
	`selectChara` int(11) DEFAULT 'NULL',
	`sortType` int(11) DEFAULT 'NULL',
	`filterGenre` int(11) DEFAULT 'NULL',
	`filterLevel` int(11) DEFAULT 'NULL',
	`filterRank` int(11) DEFAULT 'NULL',
	`filterVersion` int(11) DEFAULT 'NULL',
	`filterRec` int(11) DEFAULT 'NULL',
	`filterFullCombo` int(11) DEFAULT 'NULL',
	`filterAllPerfect` int(11) DEFAULT 'NULL',
	`filterDifficulty` int(11) DEFAULT 'NULL',
	`filterFullSync` int(11) DEFAULT 'NULL',
	`filterReMaster` int(11) DEFAULT 'NULL',
	`filterMaxFever` int(11) DEFAULT 'NULL',
	`finalSelectId` int(11) DEFAULT 'NULL',
	`finalSelectCategory` int(11) DEFAULT 'NULL',
	CONSTRAINT `maimai_profile_option_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `maimai_profile_recent_rating` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`userRecentRatingList` longtext DEFAULT 'NULL',
	CONSTRAINT `mai2_profile_recent_rating_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `maimai_profile_web_option` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`isNetMember` tinyint DEFAULT 'NULL',
	`dispRate` int(11) DEFAULT 'NULL',
	`dispJudgeStyle` int(11) DEFAULT 'NULL',
	`dispRank` int(11) DEFAULT 'NULL',
	`dispHomeRanker` int(11) DEFAULT 'NULL',
	`dispTotalLv` int(11) DEFAULT 'NULL',
	CONSTRAINT `maimai_profile_web_option_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `maimai_score_best` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`achievement` int(11) DEFAULT 'NULL',
	`scoreMax` int(11) DEFAULT 'NULL',
	`syncRateMax` int(11) DEFAULT 'NULL',
	`isAllPerfect` tinyint DEFAULT 'NULL',
	`isAllPerfectPlus` int(11) DEFAULT 'NULL',
	`fullCombo` int(11) DEFAULT 'NULL',
	`maxFever` int(11) DEFAULT 'NULL',
	CONSTRAINT `maimai_score_best_uk` UNIQUE(`user`,`musicId`,`level`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_gp_log` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`usedCredit` int(11) DEFAULT 'NULL',
	`placeName` varchar(255) DEFAULT 'NULL',
	`trxnDate` varchar(255) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`kind` int(11) DEFAULT 'NULL',
	`pattern` int(11) DEFAULT 'NULL',
	`currentGP` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_activity` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`kind` int(11) DEFAULT 'NULL',
	`activityId` int(11) DEFAULT 'NULL',
	`sortNumber` int(11) DEFAULT 'NULL',
	`param1` int(11) DEFAULT 'NULL',
	`param2` int(11) DEFAULT 'NULL',
	`param3` int(11) DEFAULT 'NULL',
	`param4` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_activity_uk` UNIQUE(`user`,`kind`,`activityId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`userName` varchar(8) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`reincarnationNum` int(11) DEFAULT 'NULL',
	`exp` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	`totalPoint` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`jewelCount` int(11) DEFAULT 'NULL',
	`totalJewelCount` int(11) DEFAULT 'NULL',
	`medalCount` int(11) DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`highestRating` int(11) DEFAULT 'NULL',
	`battlePoint` int(11) DEFAULT 'NULL',
	`nameplateId` int(11) DEFAULT 'NULL',
	`trophyId` int(11) DEFAULT 'NULL',
	`cardId` int(11) DEFAULT 'NULL',
	`characterId` int(11) DEFAULT 'NULL',
	`characterVoiceNo` int(11) DEFAULT 'NULL',
	`tabSetting` int(11) DEFAULT 'NULL',
	`tabSortSetting` int(11) DEFAULT 'NULL',
	`cardCategorySetting` int(11) DEFAULT 'NULL',
	`cardSortSetting` int(11) DEFAULT 'NULL',
	`playedTutorialBit` int(11) DEFAULT 'NULL',
	`firstTutorialCancelNum` int(11) DEFAULT 'NULL',
	`sumTechHighScore` bigint(20) DEFAULT 'NULL',
	`sumTechBasicHighScore` bigint(20) DEFAULT 'NULL',
	`sumTechAdvancedHighScore` bigint(20) DEFAULT 'NULL',
	`sumTechExpertHighScore` bigint(20) DEFAULT 'NULL',
	`sumTechMasterHighScore` bigint(20) DEFAULT 'NULL',
	`sumTechLunaticHighScore` bigint(20) DEFAULT 'NULL',
	`sumBattleHighScore` bigint(20) DEFAULT 'NULL',
	`sumBattleBasicHighScore` bigint(20) DEFAULT 'NULL',
	`sumBattleAdvancedHighScore` bigint(20) DEFAULT 'NULL',
	`sumBattleExpertHighScore` bigint(20) DEFAULT 'NULL',
	`sumBattleMasterHighScore` bigint(20) DEFAULT 'NULL',
	`sumBattleLunaticHighScore` bigint(20) DEFAULT 'NULL',
	`eventWatchedDate` varchar(255) DEFAULT 'NULL',
	`cmEventWatchedDate` varchar(255) DEFAULT 'NULL',
	`firstGameId` varchar(8) DEFAULT 'NULL',
	`firstRomVersion` varchar(8) DEFAULT 'NULL',
	`firstDataVersion` varchar(8) DEFAULT 'NULL',
	`firstPlayDate` varchar(255) DEFAULT 'NULL',
	`lastGameId` varchar(8) DEFAULT 'NULL',
	`lastRomVersion` varchar(8) DEFAULT 'NULL',
	`lastDataVersion` varchar(8) DEFAULT 'NULL',
	`compatibleCmVersion` varchar(8) DEFAULT 'NULL',
	`lastPlayDate` varchar(255) DEFAULT 'NULL',
	`lastPlaceId` int(11) DEFAULT 'NULL',
	`lastPlaceName` varchar(255) DEFAULT 'NULL',
	`lastRegionId` int(11) DEFAULT 'NULL',
	`lastRegionName` varchar(255) DEFAULT 'NULL',
	`lastAllNetId` int(11) DEFAULT 'NULL',
	`lastClientId` varchar(16) DEFAULT 'NULL',
	`lastUsedDeckId` int(11) DEFAULT 'NULL',
	`lastPlayMusicLevel` int(11) DEFAULT 'NULL',
	`banStatus` int(11) DEFAULT 0,
	`rivalScoreCategorySetting` int(11) DEFAULT 0,
	`overDamageBattlePoint` int(11) DEFAULT 0,
	`bestBattlePoint` int(11) DEFAULT 0,
	`lastEmoneyBrand` int(11) DEFAULT 0,
	`lastEmoneyCredit` int(11) DEFAULT 0,
	`isDialogWatchedSuggestMemory` tinyint DEFAULT 0,
	CONSTRAINT `ongeki_profile_profile_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_kop` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`authKey` int(11) DEFAULT 'NULL',
	`kopId` int(11) DEFAULT 'NULL',
	`areaId` int(11) DEFAULT 'NULL',
	`totalTechScore` int(11) DEFAULT 'NULL',
	`totalPlatinumScore` int(11) DEFAULT 'NULL',
	`techRecordDate` varchar(25) DEFAULT 'NULL',
	`isTotalTechNewRecord` tinyint DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_kop_uk` UNIQUE(`user`,`kopId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_option` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`optionSet` int(11) DEFAULT 'NULL',
	`speed` int(11) DEFAULT 'NULL',
	`mirror` int(11) DEFAULT 'NULL',
	`judgeTiming` int(11) DEFAULT 'NULL',
	`judgeAdjustment` int(11) DEFAULT 'NULL',
	`abort` int(11) DEFAULT 'NULL',
	`tapSound` int(11) DEFAULT 'NULL',
	`volGuide` int(11) DEFAULT 'NULL',
	`volAll` int(11) DEFAULT 'NULL',
	`volTap` int(11) DEFAULT 'NULL',
	`volCrTap` int(11) DEFAULT 'NULL',
	`volHold` int(11) DEFAULT 'NULL',
	`volSide` int(11) DEFAULT 'NULL',
	`volFlick` int(11) DEFAULT 'NULL',
	`volBell` int(11) DEFAULT 'NULL',
	`volEnemy` int(11) DEFAULT 'NULL',
	`volSkill` int(11) DEFAULT 'NULL',
	`volDamage` int(11) DEFAULT 'NULL',
	`colorField` int(11) DEFAULT 'NULL',
	`colorLaneBright` int(11) DEFAULT 'NULL',
	`colorLane` int(11) DEFAULT 'NULL',
	`colorSide` int(11) DEFAULT 'NULL',
	`effectDamage` int(11) DEFAULT 'NULL',
	`effectPos` int(11) DEFAULT 'NULL',
	`judgeDisp` int(11) DEFAULT 'NULL',
	`judgePos` int(11) DEFAULT 'NULL',
	`judgeBreak` int(11) DEFAULT 'NULL',
	`judgeHit` int(11) DEFAULT 'NULL',
	`platinumBreakDisp` int(11) DEFAULT 'NULL',
	`judgeCriticalBreak` int(11) DEFAULT 'NULL',
	`matching` int(11) DEFAULT 'NULL',
	`dispPlayerLv` int(11) DEFAULT 'NULL',
	`dispRating` int(11) DEFAULT 'NULL',
	`dispBP` int(11) DEFAULT 'NULL',
	`headphone` int(11) DEFAULT 'NULL',
	`stealthField` int(11) DEFAULT 'NULL',
	`colorWallBright` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_option_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_rating_log` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`highestRating` int(11) DEFAULT 'NULL',
	`dataVersion` varchar(10) DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_rating_log_uk` UNIQUE(`user`,`dataVersion`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_recent_rating` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`recentRating` longtext DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_recent_rating_uk` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_region` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`regionId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`created` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_region_uk` UNIQUE(`user`,`regionId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_rival` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`rivalUserId` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_rival_uk` UNIQUE(`user`,`rivalUserId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_profile_training_room` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`roomId` int(11) DEFAULT 'NULL',
	`authKey` int(11) DEFAULT 'NULL',
	`cardId` int(11) DEFAULT 'NULL',
	`valueDate` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `ongeki_profile_training_room_uk` UNIQUE(`user`,`roomId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_score_best` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`musicId` int(11) NOT NULL,
	`level` int(11) NOT NULL,
	`playCount` int(11) NOT NULL,
	`techScoreMax` int(11) NOT NULL,
	`techScoreRank` int(11) NOT NULL,
	`battleScoreMax` int(11) NOT NULL,
	`battleScoreRank` int(11) NOT NULL,
	`maxComboCount` int(11) NOT NULL,
	`maxOverKill` float NOT NULL,
	`maxTeamOverKill` float NOT NULL,
	`isFullBell` tinyint NOT NULL,
	`isFullCombo` tinyint NOT NULL,
	`isAllBreake` tinyint NOT NULL,
	`isLock` tinyint NOT NULL,
	`clearStatus` tinyint NOT NULL,
	`isStoryWatched` tinyint NOT NULL,
	`platinumScoreMax` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_best_score_uk` UNIQUE(`user`,`musicId`,`level`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_score_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`sortNumber` int(11) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`placeName` varchar(255) DEFAULT 'NULL',
	`playDate` timestamp DEFAULT 'NULL',
	`userPlayDate` timestamp DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`playKind` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`eventName` varchar(255) DEFAULT 'NULL',
	`eventPoint` int(11) DEFAULT 'NULL',
	`playedUserId1` int(11) DEFAULT 'NULL',
	`playedUserId2` int(11) DEFAULT 'NULL',
	`playedUserId3` int(11) DEFAULT 'NULL',
	`playedUserName1` varchar(8) DEFAULT 'NULL',
	`playedUserName2` varchar(8) DEFAULT 'NULL',
	`playedUserName3` varchar(8) DEFAULT 'NULL',
	`playedMusicLevel1` int(11) DEFAULT 'NULL',
	`playedMusicLevel2` int(11) DEFAULT 'NULL',
	`playedMusicLevel3` int(11) DEFAULT 'NULL',
	`cardId1` int(11) DEFAULT 'NULL',
	`cardId2` int(11) DEFAULT 'NULL',
	`cardId3` int(11) DEFAULT 'NULL',
	`cardLevel1` int(11) DEFAULT 'NULL',
	`cardLevel2` int(11) DEFAULT 'NULL',
	`cardLevel3` int(11) DEFAULT 'NULL',
	`cardAttack1` int(11) DEFAULT 'NULL',
	`cardAttack2` int(11) DEFAULT 'NULL',
	`cardAttack3` int(11) DEFAULT 'NULL',
	`bossCharaId` int(11) DEFAULT 'NULL',
	`bossLevel` int(11) DEFAULT 'NULL',
	`bossAttribute` int(11) DEFAULT 'NULL',
	`clearStatus` int(11) DEFAULT 'NULL',
	`techScore` int(11) DEFAULT 'NULL',
	`techScoreRank` int(11) DEFAULT 'NULL',
	`battleScore` int(11) DEFAULT 'NULL',
	`battleScoreRank` int(11) DEFAULT 'NULL',
	`maxCombo` int(11) DEFAULT 'NULL',
	`judgeMiss` int(11) DEFAULT 'NULL',
	`judgeHit` int(11) DEFAULT 'NULL',
	`judgeBreak` int(11) DEFAULT 'NULL',
	`judgeCriticalBreak` int(11) DEFAULT 'NULL',
	`rateTap` int(11) DEFAULT 'NULL',
	`rateHold` int(11) DEFAULT 'NULL',
	`rateFlick` int(11) DEFAULT 'NULL',
	`rateSideTap` int(11) DEFAULT 'NULL',
	`rateSideHold` int(11) DEFAULT 'NULL',
	`bellCount` int(11) DEFAULT 'NULL',
	`totalBellCount` int(11) DEFAULT 'NULL',
	`damageCount` int(11) DEFAULT 'NULL',
	`overDamage` int(11) DEFAULT 'NULL',
	`isTechNewRecord` tinyint DEFAULT 'NULL',
	`isBattleNewRecord` tinyint DEFAULT 'NULL',
	`isOverDamageNewRecord` tinyint DEFAULT 'NULL',
	`isFullCombo` tinyint DEFAULT 'NULL',
	`isFullBell` tinyint DEFAULT 'NULL',
	`isAllBreak` tinyint DEFAULT 'NULL',
	`playerRating` int(11) DEFAULT 'NULL',
	`battlePoint` int(11) DEFAULT 'NULL',
	`platinumScore` int(11) DEFAULT 'NULL',
	`platinumScoreMax` int(11) DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `ongeki_score_tech_count` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`levelId` int(11) NOT NULL,
	`allBreakCount` int(11) DEFAULT 'NULL',
	`allBreakPlusCount` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_tech_count_uk` UNIQUE(`user`,`levelId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_session_log` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`sortNumber` int(11) DEFAULT 'NULL',
	`placeId` int(11) DEFAULT 'NULL',
	`playDate` varchar(10) DEFAULT 'NULL',
	`userPlayDate` varchar(25) DEFAULT 'NULL',
	`isPaid` tinyint DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_cards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`charaId` int(11) NOT NULL,
	`nickName` varchar(255) DEFAULT 'NULL',
	`school` varchar(255) NOT NULL,
	`attribute` varchar(5) NOT NULL,
	`gakunen` varchar(255) NOT NULL,
	`rarity` int(11) NOT NULL,
	`levelParam` varchar(255) NOT NULL,
	`skillId` int(11) NOT NULL,
	`choKaikaSkillId` int(11) NOT NULL,
	`cardNumber` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `ongeki_static_cards_uk` UNIQUE(`version`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_client_testmode` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`regionId` int(11) NOT NULL,
	`placeId` int(11) NOT NULL,
	`clientId` varchar(11) NOT NULL,
	`updateDate` timestamp NOT NULL,
	`isDelivery` tinyint NOT NULL,
	`groupId` int(11) NOT NULL,
	`groupRole` int(11) NOT NULL,
	`continueMode` int(11) NOT NULL,
	`selectMusicTime` int(11) NOT NULL,
	`advertiseVolume` int(11) NOT NULL,
	`eventMode` int(11) NOT NULL,
	`eventMusicNum` int(11) NOT NULL,
	`patternGp` int(11) NOT NULL,
	`limitGp` int(11) NOT NULL,
	`maxLeverMovable` int(11) NOT NULL,
	`minLeverMovable` int(11) NOT NULL,
	CONSTRAINT `ongeki_static_client_testmode_uk` UNIQUE(`clientId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_events` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`startDate` timestamp DEFAULT 'current_timestamp()',
	`endDate` timestamp DEFAULT 'current_timestamp()',
	`enabled` tinyint DEFAULT 1,
	CONSTRAINT `ongeki_static_events_uk` UNIQUE(`version`,`eventId`,`type`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_gachas` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`gachaId` int(11) NOT NULL,
	`gachaName` varchar(255) NOT NULL,
	`type` int(11) NOT NULL DEFAULT 0,
	`kind` int(11) NOT NULL DEFAULT 0,
	`isCeiling` tinyint DEFAULT 0,
	`maxSelectPoint` int(11) DEFAULT 0,
	`ceilingCnt` int(11) DEFAULT 10,
	`changeRateCnt1` int(11) DEFAULT 0,
	`changeRateCnt2` int(11) DEFAULT 0,
	`startDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`endDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	`noticeStartDate` timestamp DEFAULT ''2017-12-31 17:00:00'',
	`noticeEndDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	`convertEndDate` timestamp DEFAULT ''2037-12-31 17:00:00'',
	CONSTRAINT `ongeki_static_gachas_uk` UNIQUE(`version`,`gachaId`,`gachaName`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_gacha_cards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`gachaId` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`rarity` int(11) NOT NULL,
	`weight` int(11) DEFAULT 1,
	`isPickup` tinyint DEFAULT 0,
	`isSelect` tinyint DEFAULT 0,
	CONSTRAINT `ongeki_static_gacha_cards_uk` UNIQUE(`gachaId`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_game_point` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`type` int(11) NOT NULL,
	`cost` int(11) NOT NULL,
	`startDate` varchar(25) NOT NULL DEFAULT ''2000-01-01 05:00:00.0'',
	`endDate` varchar(25) NOT NULL DEFAULT ''2099-01-01 05:00:00.0'',
	CONSTRAINT `ongeki_static_game_point_uk` UNIQUE(`type`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`songId` int(11) DEFAULT 'NULL',
	`chartId` int(11) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`artist` varchar(255) DEFAULT 'NULL',
	`genre` varchar(255) DEFAULT 'NULL',
	`level` float DEFAULT 'NULL',
	CONSTRAINT `ongeki_static_music_uk` UNIQUE(`version`,`songId`,`chartId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_music_ranking_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`musicId` int(11) NOT NULL,
	`point` int(11) NOT NULL,
	`userName` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `ongeki_static_music_ranking_uk` UNIQUE(`version`,`musicId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_present_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`presentId` int(11) NOT NULL,
	`presentName` varchar(255) NOT NULL,
	`rewardId` int(11) NOT NULL,
	`stock` int(11) NOT NULL,
	`message` varchar(255) DEFAULT 'NULL',
	`startDate` varchar(25) NOT NULL,
	`endDate` varchar(25) NOT NULL,
	CONSTRAINT `ongeki_static_present_list_uk` UNIQUE(`version`,`presentId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_rewards` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`rewardId` int(11) NOT NULL,
	`rewardname` varchar(255) NOT NULL,
	`itemKind` int(11) NOT NULL,
	`itemId` int(11) NOT NULL,
	CONSTRAINT `ongeki_static_rewards_uk` UNIQUE(`version`,`rewardId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_static_tech_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`eventId` int(11) NOT NULL,
	`musicId` int(11) NOT NULL,
	`level` int(11) NOT NULL,
	CONSTRAINT `ongeki_static_tech_music_uk` UNIQUE(`version`,`musicId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_tech_event_ranking` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) NOT NULL,
	`date` varchar(25) DEFAULT 'NULL',
	`eventId` int(11) NOT NULL,
	`rank` int(11) DEFAULT 'NULL',
	`totalPlatinumScore` int(11) NOT NULL,
	`totalTechScore` int(11) NOT NULL,
	CONSTRAINT `ongeki_tech_event_ranking_uk` UNIQUE(`user`,`eventId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_boss` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`damage` int(11) DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_boss_uk` UNIQUE(`user`,`musicId`,`eventId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_card` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`cardId` int(11) DEFAULT 'NULL',
	`digitalStock` int(11) DEFAULT 'NULL',
	`analogStock` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`maxLevel` int(11) DEFAULT 'NULL',
	`exp` int(11) DEFAULT 'NULL',
	`printCount` int(11) DEFAULT 'NULL',
	`useCount` int(11) DEFAULT 'NULL',
	`isNew` tinyint DEFAULT 'NULL',
	`kaikaDate` varchar(25) DEFAULT 'NULL',
	`choKaikaDate` varchar(25) DEFAULT 'NULL',
	`skillId` int(11) DEFAULT 'NULL',
	`isAcquired` tinyint DEFAULT 'NULL',
	`created` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_card_uk` UNIQUE(`user`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_chapter` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`chapterId` int(11) DEFAULT 'NULL',
	`jewelCount` int(11) DEFAULT 'NULL',
	`isStoryWatched` tinyint DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`lastPlayMusicId` int(11) DEFAULT 'NULL',
	`lastPlayMusicCategory` int(11) DEFAULT 'NULL',
	`lastPlayMusicLevel` int(11) DEFAULT 'NULL',
	`skipTiming1` int(11) DEFAULT 'NULL',
	`skipTiming2` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_chapter_uk` UNIQUE(`user`,`chapterId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_character` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`characterId` int(11) DEFAULT 'NULL',
	`costumeId` int(11) DEFAULT 'NULL',
	`attachmentId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	`intimateLevel` int(11) DEFAULT 'NULL',
	`intimateCount` int(11) DEFAULT 'NULL',
	`intimateCountRewarded` int(11) DEFAULT 'NULL',
	`intimateCountDate` varchar(25) DEFAULT 'NULL',
	`isNew` tinyint DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_character_uk` UNIQUE(`user`,`characterId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_deck` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`deckId` int(11) DEFAULT 'NULL',
	`cardId1` int(11) DEFAULT 'NULL',
	`cardId2` int(11) DEFAULT 'NULL',
	`cardId3` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_deck_uk` UNIQUE(`user`,`deckId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_event_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`level` int(11) DEFAULT 'NULL',
	`techScoreMax` int(11) DEFAULT 'NULL',
	`platinumScoreMax` int(11) DEFAULT 'NULL',
	`techRecordDate` varchar(25) DEFAULT 'NULL',
	`isTechNewRecord` tinyint DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_event_music` UNIQUE(`user`,`eventId`,`type`,`musicId`,`level`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_event_point` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`version` int(11) NOT NULL,
	`eventId` int(11) NOT NULL,
	`point` int(11) NOT NULL,
	`rank` int(11) DEFAULT 'NULL',
	`type` int(11) NOT NULL,
	`date` varchar(25) DEFAULT 'NULL',
	`isRankingRewarded` tinyint DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_event_point_uk` UNIQUE(`user`,`eventId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_gacha` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`gachaId` int(11) NOT NULL,
	`totalGachaCnt` int(11) DEFAULT 0,
	`ceilingGachaCnt` int(11) DEFAULT 0,
	`selectPoint` int(11) DEFAULT 0,
	`useSelectPoint` int(11) DEFAULT 0,
	`dailyGachaCnt` int(11) DEFAULT 0,
	`fiveGachaCnt` int(11) DEFAULT 0,
	`elevenGachaCnt` int(11) DEFAULT 0,
	`dailyGachaDate` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `ongeki_user_gacha_uk` UNIQUE(`user`,`gachaId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_gacha_supply` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	CONSTRAINT `ongeki_user_gacha_supply_uk` UNIQUE(`user`,`cardId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`itemKind` int(11) DEFAULT 'NULL',
	`itemId` int(11) DEFAULT 'NULL',
	`stock` int(11) DEFAULT 'NULL',
	`isValid` tinyint DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_item_uk` UNIQUE(`user`,`itemKind`,`itemId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_login_bonus` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`bonusId` int(11) DEFAULT 'NULL',
	`bonusCount` int(11) DEFAULT 'NULL',
	`lastUpdateDate` varchar(25) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_login_bonus_uk` UNIQUE(`user`,`bonusId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_memorychapter` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`chapterId` int(11) DEFAULT 'NULL',
	`gaugeId` int(11) DEFAULT 'NULL',
	`gaugeNum` int(11) DEFAULT 'NULL',
	`jewelCount` int(11) DEFAULT 'NULL',
	`isStoryWatched` tinyint DEFAULT 'NULL',
	`isBossWatched` tinyint DEFAULT 'NULL',
	`isDialogWatched` tinyint DEFAULT 'NULL',
	`isEndingWatched` tinyint DEFAULT 'NULL',
	`isClear` tinyint DEFAULT 'NULL',
	`lastPlayMusicId` int(11) DEFAULT 'NULL',
	`lastPlayMusicLevel` int(11) DEFAULT 'NULL',
	`lastPlayMusicCategory` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_memorychapter_uk` UNIQUE(`user`,`chapterId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_mission_point` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`version` int(11) DEFAULT 'NULL',
	`eventId` int(11) DEFAULT 'NULL',
	`point` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_mission_point_uk` UNIQUE(`user`,`eventId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_music_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`musicId` int(11) DEFAULT 'NULL',
	`status` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_music_item_uk` UNIQUE(`user`,`musicId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_print_detail` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`cardId` int(11) NOT NULL,
	`cardType` int(11) DEFAULT 0,
	`printDate` timestamp NOT NULL,
	`serialId` varchar(20) NOT NULL,
	`placeId` int(11) NOT NULL,
	`clientId` varchar(11) NOT NULL,
	`printerSerialId` varchar(20) NOT NULL,
	`isHolograph` tinyint DEFAULT 0,
	`isAutographed` tinyint DEFAULT 0,
	`printOption1` tinyint DEFAULT 1,
	`printOption2` tinyint DEFAULT 1,
	`printOption3` tinyint DEFAULT 1,
	`printOption4` tinyint DEFAULT 1,
	`printOption5` tinyint DEFAULT 1,
	`printOption6` tinyint DEFAULT 1,
	`printOption7` tinyint DEFAULT 1,
	`printOption8` tinyint DEFAULT 1,
	`printOption9` tinyint DEFAULT 1,
	`printOption10` tinyint DEFAULT 0,
	CONSTRAINT `ongeki_user_print_detail_uk` UNIQUE(`serialId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_scenerio` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`scenarioId` int(11) DEFAULT 'NULL',
	`playCount` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_scenerio_uk` UNIQUE(`user`,`scenarioId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_story` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`storyId` int(11) DEFAULT 'NULL',
	`jewelCount` int(11) DEFAULT 'NULL',
	`lastChapterId` int(11) DEFAULT 'NULL',
	`lastPlayMusicId` int(11) DEFAULT 'NULL',
	`lastPlayMusicCategory` int(11) DEFAULT 'NULL',
	`lastPlayMusicLevel` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_story_uk` UNIQUE(`user`,`storyId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_tech_event` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`version` int(11) NOT NULL,
	`eventId` int(11) NOT NULL,
	`totalTechScore` int(11) NOT NULL,
	`totalPlatinumScore` int(11) NOT NULL,
	`techRecordDate` varchar(25) DEFAULT 'NULL',
	`isRankingRewarded` tinyint DEFAULT 'NULL',
	`isTotalTechNewRecord` tinyint DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_tech_event_uk` UNIQUE(`user`,`eventId`)
);
--> statement-breakpoint
CREATE TABLE `ongeki_user_trade_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) DEFAULT 'NULL',
	`chapterId` int(11) DEFAULT 'NULL',
	`tradeItemId` int(11) DEFAULT 'NULL',
	`tradeCount` int(11) DEFAULT 'NULL',
	CONSTRAINT `ongeki_user_trade_item_uk` UNIQUE(`user`,`chapterId`,`tradeItemId`)
);
--> statement-breakpoint
CREATE TABLE `pokken_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`category` int(11) DEFAULT 'NULL',
	`content` int(11) DEFAULT 'NULL',
	`type` int(11) DEFAULT 'NULL',
	CONSTRAINT `user` UNIQUE(`user`),
	CONSTRAINT `pokken_item_uk` UNIQUE(`user`,`category`,`content`,`type`)
);
--> statement-breakpoint
CREATE TABLE `pokken_match_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`num_games` int(11) DEFAULT 'NULL',
	`play_modes` longtext DEFAULT 'NULL',
	`results` longtext DEFAULT 'NULL',
	`ex_ko_num` int(11) DEFAULT 'NULL',
	`wko_num` int(11) DEFAULT 'NULL',
	`timeup_win_num` int(11) DEFAULT 'NULL',
	`cool_ko_num` int(11) DEFAULT 'NULL',
	`perfect_ko_num` int(11) DEFAULT 'NULL',
	`use_navi` int(11) DEFAULT 'NULL',
	`use_navi_cloth` int(11) DEFAULT 'NULL',
	`use_aid_skill` int(11) DEFAULT 'NULL',
	`play_date` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `pokken_pokemon_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`char_id` int(11) NOT NULL,
	`illustration_book_no` int(11) DEFAULT 'NULL',
	`pokemon_exp` int(11) DEFAULT 'NULL',
	`battle_num_vs_wan` int(11) DEFAULT 'NULL',
	`win_vs_wan` int(11) DEFAULT 'NULL',
	`battle_num_vs_lan` int(11) DEFAULT 'NULL',
	`win_vs_lan` int(11) DEFAULT 'NULL',
	`battle_num_vs_cpu` int(11) DEFAULT 'NULL',
	`win_cpu` int(11) DEFAULT 'NULL',
	`battle_all_num_tutorial` int(11) DEFAULT 'NULL',
	`battle_num_tutorial` int(11) DEFAULT 'NULL',
	`bp_point_atk` int(11) DEFAULT 'NULL',
	`bp_point_res` int(11) DEFAULT 'NULL',
	`bp_point_def` int(11) DEFAULT 'NULL',
	`bp_point_sp` int(11) DEFAULT 'NULL',
	CONSTRAINT `pokken_pokemon_data_uk` UNIQUE(`user`,`char_id`)
);
--> statement-breakpoint
CREATE TABLE `pokken_profile` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`trainer_name` varchar(16) DEFAULT 'NULL',
	`home_region_code` int(11) DEFAULT 'NULL',
	`home_loc_name` varchar(255) DEFAULT 'NULL',
	`pref_code` int(11) DEFAULT 'NULL',
	`navi_newbie_flag` tinyint DEFAULT 'NULL',
	`navi_enable_flag` tinyint DEFAULT 'NULL',
	`pad_vibrate_flag` tinyint DEFAULT 'NULL',
	`trainer_rank_point` int(11) DEFAULT 'NULL',
	`wallet` int(11) DEFAULT 'NULL',
	`fight_money` int(11) DEFAULT 'NULL',
	`score_point` int(11) DEFAULT 'NULL',
	`grade_max_num` int(11) DEFAULT 'NULL',
	`extra_counter` int(11) DEFAULT 'NULL',
	`tutorial_progress_flag` longtext DEFAULT 'NULL',
	`total_play_days` int(11) DEFAULT 'NULL',
	`play_date_time` int(11) DEFAULT 'NULL',
	`achievement_flag` longtext DEFAULT 'NULL',
	`lucky_box_fail_num` int(11) DEFAULT 'NULL',
	`event_reward_get_flag` int(11) DEFAULT 'NULL',
	`rank_pvp_all` int(11) DEFAULT 'NULL',
	`rank_pvp_loc` int(11) DEFAULT 'NULL',
	`rank_cpu_all` int(11) DEFAULT 'NULL',
	`rank_cpu_loc` int(11) DEFAULT 'NULL',
	`rank_event` int(11) DEFAULT 'NULL',
	`awake_num` int(11) DEFAULT 'NULL',
	`use_support_num` int(11) DEFAULT 'NULL',
	`rankmatch_flag` int(11) DEFAULT 'NULL',
	`rankmatch_max` int(11) DEFAULT 'NULL',
	`rankmatch_progress` longtext DEFAULT 'NULL',
	`rankmatch_success` int(11) DEFAULT 'NULL',
	`beat_num` int(11) DEFAULT 'NULL',
	`title_text_id` int(11) DEFAULT 'NULL',
	`title_plate_id` int(11) DEFAULT 'NULL',
	`title_decoration_id` int(11) DEFAULT 'NULL',
	`support_pokemon_list` longtext DEFAULT 'NULL',
	`support_set_1_1` int(11) DEFAULT 'NULL',
	`support_set_1_2` int(11) DEFAULT 'NULL',
	`support_set_2_1` int(11) DEFAULT 'NULL',
	`support_set_2_2` int(11) DEFAULT 'NULL',
	`support_set_3_1` int(11) DEFAULT 'NULL',
	`support_set_3_2` int(11) DEFAULT 'NULL',
	`navi_trainer` int(11) DEFAULT 'NULL',
	`navi_version_id` int(11) DEFAULT 'NULL',
	`aid_skill_list` longtext DEFAULT 'NULL',
	`aid_skill` int(11) DEFAULT 'NULL',
	`comment_text_id` int(11) DEFAULT 'NULL',
	`comment_word_id` int(11) DEFAULT 'NULL',
	`latest_use_pokemon` int(11) DEFAULT 'NULL',
	`ex_ko_num` int(11) DEFAULT 'NULL',
	`wko_num` int(11) DEFAULT 'NULL',
	`timeup_win_num` int(11) DEFAULT 'NULL',
	`cool_ko_num` int(11) DEFAULT 'NULL',
	`perfect_ko_num` int(11) DEFAULT 'NULL',
	`record_flag` int(11) DEFAULT 'NULL',
	`continue_num` int(11) DEFAULT 'NULL',
	`avatar_body` int(11) DEFAULT 'NULL',
	`avatar_gender` int(11) DEFAULT 'NULL',
	`avatar_background` int(11) DEFAULT 'NULL',
	`avatar_head` int(11) DEFAULT 'NULL',
	`avatar_battleglass` int(11) DEFAULT 'NULL',
	`avatar_face0` int(11) DEFAULT 'NULL',
	`avatar_face1` int(11) DEFAULT 'NULL',
	`avatar_face2` int(11) DEFAULT 'NULL',
	`avatar_bodyall` int(11) DEFAULT 'NULL',
	`avatar_wear` int(11) DEFAULT 'NULL',
	`avatar_accessory` int(11) DEFAULT 'NULL',
	`avatar_stamp` int(11) DEFAULT 'NULL',
	`event_state` int(11) DEFAULT 'NULL',
	`event_id` int(11) DEFAULT 'NULL',
	`sp_bonus_category_id_1` int(11) DEFAULT 'NULL',
	`sp_bonus_key_value_1` int(11) DEFAULT 'NULL',
	`sp_bonus_category_id_2` int(11) DEFAULT 'NULL',
	`sp_bonus_key_value_2` int(11) DEFAULT 'NULL',
	`last_play_event_id` int(11) DEFAULT 'NULL',
	`event_achievement_flag` longtext DEFAULT 'NULL',
	`event_achievement_param` longtext DEFAULT 'NULL',
	`battle_num_vs_wan` int(11) DEFAULT 'NULL',
	`win_vs_wan` int(11) DEFAULT 'NULL',
	`battle_num_vs_lan` int(11) DEFAULT 'NULL',
	`win_vs_lan` int(11) DEFAULT 'NULL',
	`battle_num_vs_cpu` int(11) DEFAULT 'NULL',
	`win_cpu` int(11) DEFAULT 'NULL',
	`battle_num_tutorial` int(11) DEFAULT 'NULL',
	CONSTRAINT `user` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `sao_end_sessions` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`quest_id` int(11) NOT NULL,
	`play_result_flag` tinyint NOT NULL,
	`reward_data` longtext DEFAULT 'NULL',
	`play_date` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `sao_equipment_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`equipment_id` int(11) NOT NULL,
	`enhancement_value` int(11) NOT NULL,
	`enhancement_exp` int(11) NOT NULL,
	`awakening_exp` int(11) NOT NULL,
	`awakening_stage` int(11) NOT NULL,
	`possible_awakening_flag` int(11) NOT NULL,
	`get_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `sao_equipment_data_uk` UNIQUE(`user`,`equipment_id`)
);
--> statement-breakpoint
CREATE TABLE `sao_hero_log_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`user_hero_log_id` int(11) NOT NULL,
	`log_level` int(11) NOT NULL,
	`log_exp` int(11) NOT NULL,
	`main_weapon` int(11) NOT NULL,
	`sub_equipment` int(11) NOT NULL,
	`skill_slot1_skill_id` int(11) NOT NULL,
	`skill_slot2_skill_id` int(11) NOT NULL,
	`skill_slot3_skill_id` int(11) NOT NULL,
	`skill_slot4_skill_id` int(11) NOT NULL,
	`skill_slot5_skill_id` int(11) NOT NULL,
	`get_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `sao_hero_log_data_uk` UNIQUE(`user`,`user_hero_log_id`)
);
--> statement-breakpoint
CREATE TABLE `sao_hero_party` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`user_party_team_id` int(11) NOT NULL,
	`user_hero_log_id_1` int(11) NOT NULL,
	`user_hero_log_id_2` int(11) NOT NULL,
	`user_hero_log_id_3` int(11) NOT NULL,
	CONSTRAINT `sao_hero_party_uk` UNIQUE(`user`,`user_party_team_id`)
);
--> statement-breakpoint
CREATE TABLE `sao_item_data` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`item_id` int(11) NOT NULL,
	`get_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `sao_item_data_uk` UNIQUE(`user`,`item_id`)
);
--> statement-breakpoint
CREATE TABLE `sao_player_quest` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`episode_id` int(11) NOT NULL,
	`quest_clear_flag` tinyint NOT NULL,
	`clear_time` int(11) NOT NULL,
	`combo_num` int(11) NOT NULL,
	`total_damage` int(11) NOT NULL,
	`concurrent_destroying_num` int(11) NOT NULL,
	`play_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `sao_player_quest_uk` UNIQUE(`user`,`episode_id`)
);
--> statement-breakpoint
CREATE TABLE `sao_play_sessions` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`user_party_team_id` int(11) NOT NULL,
	`episode_id` int(11) NOT NULL,
	`play_mode` int(11) NOT NULL,
	`quest_drop_boost_apply_flag` int(11) NOT NULL,
	`play_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `sao_play_sessions_uk` UNIQUE(`user`,`user_party_team_id`,`play_date`)
);
--> statement-breakpoint
CREATE TABLE `sao_profile` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`user_type` int(11) DEFAULT 1,
	`nick_name` varchar(16) DEFAULT ''PLAYER'',
	`rank_num` int(11) DEFAULT 1,
	`rank_exp` int(11) DEFAULT 0,
	`own_col` int(11) DEFAULT 0,
	`own_vp` int(11) DEFAULT 300,
	`own_yui_medal` int(11) DEFAULT 0,
	`setting_title_id` int(11) DEFAULT 20005,
	CONSTRAINT `user` UNIQUE(`user`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_equipment_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`equipmentId` int(11) DEFAULT 'NULL',
	`equipmentType` int(11) DEFAULT 'NULL',
	`weaponTypeId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`rarity` int(11) DEFAULT 'NULL',
	`flavorText` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_equipment_list_uk` UNIQUE(`version`,`equipmentId`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_hero_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`heroLogId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`nickname` varchar(255) DEFAULT 'NULL',
	`rarity` int(11) DEFAULT 'NULL',
	`skillTableSubId` int(11) DEFAULT 'NULL',
	`awakeningExp` int(11) DEFAULT 'NULL',
	`flavorText` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_hero_list_uk` UNIQUE(`version`,`heroLogId`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_item_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`itemId` int(11) DEFAULT 'NULL',
	`itemTypeId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`rarity` int(11) DEFAULT 'NULL',
	`flavorText` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_item_list_uk` UNIQUE(`version`,`itemId`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_quest` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`questSceneId` int(11) DEFAULT 'NULL',
	`sortNo` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_quest_uk` UNIQUE(`version`,`questSceneId`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_rare_drop_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`questRareDropId` int(11) DEFAULT 'NULL',
	`commonRewardId` int(11) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_rare_drop_list_uk` UNIQUE(`version`,`questRareDropId`,`commonRewardId`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_support_log_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`supportLogId` int(11) DEFAULT 'NULL',
	`charaId` int(11) DEFAULT 'NULL',
	`name` varchar(255) DEFAULT 'NULL',
	`rarity` int(11) DEFAULT 'NULL',
	`salePrice` int(11) DEFAULT 'NULL',
	`skillName` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_support_log_list_uk` UNIQUE(`version`,`supportLogId`)
);
--> statement-breakpoint
CREATE TABLE `sao_static_title_list` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`titleId` int(11) DEFAULT 'NULL',
	`displayName` varchar(255) DEFAULT 'NULL',
	`requirement` int(11) DEFAULT 'NULL',
	`rank` int(11) DEFAULT 'NULL',
	`imageFilePath` varchar(255) DEFAULT 'NULL',
	`enabled` tinyint DEFAULT 'NULL',
	CONSTRAINT `sao_static_title_list_uk` UNIQUE(`version`,`titleId`)
);
--> statement-breakpoint
CREATE TABLE `wacca_bingo` (
	`user` int(11) NOT NULL,
	`page_number` int(11) NOT NULL,
	`page_progress` longtext NOT NULL,
	CONSTRAINT `wacca_bingo_uk` UNIQUE(`user`,`page_number`)
);
--> statement-breakpoint
CREATE TABLE `wacca_favorite_song` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`song_id` int(11) NOT NULL,
	CONSTRAINT `wacca_favorite_song_uk` UNIQUE(`user`,`song_id`)
);
--> statement-breakpoint
CREATE TABLE `wacca_friend` (
	`profile_sender` int(11) NOT NULL,
	`profile_reciever` int(11) NOT NULL,
	`is_accepted` tinyint DEFAULT 0
);
--> statement-breakpoint
CREATE TABLE `wacca_gate` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`gate_id` int(11) NOT NULL,
	`page` int(11) NOT NULL DEFAULT 0,
	`progress` int(11) NOT NULL DEFAULT 0,
	`loops` int(11) NOT NULL DEFAULT 0,
	`last_used` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`mission_flag` int(11) NOT NULL DEFAULT 0,
	`total_points` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `wacca_gate_uk` UNIQUE(`user`,`gate_id`)
);
--> statement-breakpoint
CREATE TABLE `wacca_item` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`item_id` int(11) NOT NULL,
	`type` int(11) NOT NULL,
	`acquire_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`use_count` int(11) DEFAULT 0,
	CONSTRAINT `wacca_item_uk` UNIQUE(`user`,`item_id`,`type`)
);
--> statement-breakpoint
CREATE TABLE `wacca_option` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`opt_id` int(11) NOT NULL,
	`value` int(11) NOT NULL,
	CONSTRAINT `wacca_option_uk` UNIQUE(`user`,`opt_id`)
);
--> statement-breakpoint
CREATE TABLE `wacca_profile` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`username` varchar(8) NOT NULL,
	`xp` int(11) DEFAULT 0,
	`wp` int(11) DEFAULT 0,
	`wp_total` int(11) DEFAULT 0,
	`wp_spent` int(11) DEFAULT 0,
	`dan_type` int(11) DEFAULT 0,
	`dan_level` int(11) DEFAULT 0,
	`title_0` int(11) DEFAULT 0,
	`title_1` int(11) DEFAULT 0,
	`title_2` int(11) DEFAULT 0,
	`rating` int(11) DEFAULT 0,
	`vip_expire_time` timestamp DEFAULT 'NULL',
	`always_vip` tinyint DEFAULT 0,
	`login_count` int(11) DEFAULT 0,
	`login_count_consec` int(11) DEFAULT 0,
	`login_count_days` int(11) DEFAULT 0,
	`login_count_days_consec` int(11) DEFAULT 0,
	`login_count_today` int(11) DEFAULT 0,
	`playcount_single` int(11) DEFAULT 0,
	`playcount_multi_vs` int(11) DEFAULT 0,
	`playcount_multi_coop` int(11) DEFAULT 0,
	`playcount_stageup` int(11) DEFAULT 0,
	`playcount_time_free` int(11) DEFAULT 0,
	`friend_view_1` int(11) DEFAULT 'NULL',
	`friend_view_2` int(11) DEFAULT 'NULL',
	`friend_view_3` int(11) DEFAULT 'NULL',
	`last_game_ver` varchar(50) DEFAULT 'NULL',
	`last_song_id` int(11) DEFAULT 0,
	`last_song_difficulty` int(11) DEFAULT 0,
	`last_folder_order` int(11) DEFAULT 0,
	`last_folder_id` int(11) DEFAULT 0,
	`last_song_order` int(11) DEFAULT 0,
	`last_login_date` timestamp DEFAULT 'current_timestamp()',
	`gate_tutorial_flags` longtext DEFAULT 'NULL',
	CONSTRAINT `wacca_profile_uk` UNIQUE(`user`,`version`)
);
--> statement-breakpoint
CREATE TABLE `wacca_score_best` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`song_id` int(11) DEFAULT 'NULL',
	`chart_id` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`play_ct` int(11) DEFAULT 'NULL',
	`clear_ct` int(11) DEFAULT 'NULL',
	`missless_ct` int(11) DEFAULT 'NULL',
	`fullcombo_ct` int(11) DEFAULT 'NULL',
	`allmarv_ct` int(11) DEFAULT 'NULL',
	`grade_d_ct` int(11) DEFAULT 'NULL',
	`grade_c_ct` int(11) DEFAULT 'NULL',
	`grade_b_ct` int(11) DEFAULT 'NULL',
	`grade_a_ct` int(11) DEFAULT 'NULL',
	`grade_aa_ct` int(11) DEFAULT 'NULL',
	`grade_aaa_ct` int(11) DEFAULT 'NULL',
	`grade_s_ct` int(11) DEFAULT 'NULL',
	`grade_ss_ct` int(11) DEFAULT 'NULL',
	`grade_sss_ct` int(11) DEFAULT 'NULL',
	`grade_master_ct` int(11) DEFAULT 'NULL',
	`grade_sp_ct` int(11) DEFAULT 'NULL',
	`grade_ssp_ct` int(11) DEFAULT 'NULL',
	`grade_sssp_ct` int(11) DEFAULT 'NULL',
	`best_combo` int(11) DEFAULT 'NULL',
	`lowest_miss_ct` int(11) DEFAULT 'NULL',
	`rating` int(11) DEFAULT 'NULL',
	CONSTRAINT `wacca_score_uk` UNIQUE(`user`,`song_id`,`chart_id`)
);
--> statement-breakpoint
CREATE TABLE `wacca_score_playlog` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`song_id` int(11) DEFAULT 'NULL',
	`chart_id` int(11) DEFAULT 'NULL',
	`score` int(11) DEFAULT 'NULL',
	`clear` int(11) DEFAULT 'NULL',
	`grade` int(11) DEFAULT 'NULL',
	`max_combo` int(11) DEFAULT 'NULL',
	`marv_ct` int(11) DEFAULT 'NULL',
	`great_ct` int(11) DEFAULT 'NULL',
	`good_ct` int(11) DEFAULT 'NULL',
	`miss_ct` int(11) DEFAULT 'NULL',
	`fast_ct` int(11) DEFAULT 'NULL',
	`late_ct` int(11) DEFAULT 'NULL',
	`season` int(11) DEFAULT 'NULL',
	`date_scored` timestamp DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `wacca_score_stageup` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`version` int(11) DEFAULT 'NULL',
	`stage_id` int(11) DEFAULT 'NULL',
	`clear_status` int(11) DEFAULT 'NULL',
	`clear_song_ct` int(11) DEFAULT 'NULL',
	`song1_score` int(11) DEFAULT 'NULL',
	`song2_score` int(11) DEFAULT 'NULL',
	`song3_score` int(11) DEFAULT 'NULL',
	`play_ct` int(11) DEFAULT 1,
	CONSTRAINT `wacca_score_stageup_uk` UNIQUE(`user`,`stage_id`)
);
--> statement-breakpoint
CREATE TABLE `wacca_song_unlock` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`song_id` int(11) NOT NULL,
	`highest_difficulty` int(11) NOT NULL,
	`acquire_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	CONSTRAINT `wacca_song_unlock_uk` UNIQUE(`user`,`song_id`)
);
--> statement-breakpoint
CREATE TABLE `wacca_static_music` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`version` int(11) NOT NULL,
	`songId` int(11) DEFAULT 'NULL',
	`chartId` int(11) DEFAULT 'NULL',
	`title` varchar(255) DEFAULT 'NULL',
	`artist` varchar(255) DEFAULT 'NULL',
	`bpm` varchar(255) DEFAULT 'NULL',
	`difficulty` float DEFAULT 'NULL',
	`chartDesigner` varchar(255) DEFAULT 'NULL',
	`jacketFile` varchar(255) DEFAULT 'NULL',
	CONSTRAINT `wacca_static_music_uk` UNIQUE(`version`,`songId`,`chartId`)
);
--> statement-breakpoint
CREATE TABLE `wacca_ticket` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`ticket_id` int(11) NOT NULL,
	`acquire_date` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`expire_date` timestamp DEFAULT 'NULL'
);
--> statement-breakpoint
CREATE TABLE `wacca_trophy` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user` int(11) NOT NULL,
	`trophy_id` int(11) NOT NULL,
	`season` int(11) NOT NULL,
	`progress` int(11) NOT NULL DEFAULT 0,
	`badge_type` int(11) NOT NULL DEFAULT 0,
	CONSTRAINT `wacca_trophy_uk` UNIQUE(`user`,`trophy_id`,`season`)
);
--> statement-breakpoint
CREATE INDEX `arcadeId` ON `actaeon_arcade_join_keys` (`arcadeId`);--> statement-breakpoint
CREATE INDEX `chuniTeam` ON `actaeon_teams` (`chuniTeam`);--> statement-breakpoint
CREATE INDEX `owner` ON `actaeon_teams` (`owner`);--> statement-breakpoint
CREATE INDEX `teamId` ON `actaeon_team_join_keys` (`teamId`);--> statement-breakpoint
CREATE INDEX `user2` ON `actaeon_user_friends` (`user2`);--> statement-breakpoint
CREATE INDEX `arcade` ON `arcade_owner` (`arcade`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_item_favorite` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_item_login_bonus` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_item_matching` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_item_print_detail` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_item_print_state` (`user`);--> statement-breakpoint
CREATE INDEX `teamId` ON `chuni_profile_data` (`teamId`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_profile_net_battle` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `chuni_score_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `cxb_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `diva_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `arcade` ON `machine` (`arcade`);--> statement-breakpoint
CREATE INDEX `user` ON `mai2_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `maimai_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `ongeki_gp_log` (`user`);--> statement-breakpoint
CREATE INDEX `rivalUserId` ON `ongeki_profile_rival` (`rivalUserId`);--> statement-breakpoint
CREATE INDEX `user` ON `ongeki_score_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `ongeki_session_log` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `ongeki_user_print_detail` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `pokken_match_data` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `sao_end_sessions` (`user`);--> statement-breakpoint
CREATE INDEX `profile_reciever` ON `wacca_friend` (`profile_reciever`);--> statement-breakpoint
CREATE INDEX `user` ON `wacca_score_playlog` (`user`);--> statement-breakpoint
CREATE INDEX `user` ON `wacca_ticket` (`user`);--> statement-breakpoint
ALTER TABLE `actaeon_arcade_ext` ADD CONSTRAINT `actaeon_arcade_ext_ibfk_1` FOREIGN KEY (`arcadeId`) REFERENCES `arcade`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_arcade_join_keys` ADD CONSTRAINT `actaeon_arcade_join_keys_ibfk_1` FOREIGN KEY (`arcadeId`) REFERENCES `arcade`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_teams` ADD CONSTRAINT `actaeon_teams_ibfk_1` FOREIGN KEY (`chuniTeam`) REFERENCES `chuni_profile_team`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_teams` ADD CONSTRAINT `actaeon_teams_ibfk_2` FOREIGN KEY (`owner`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_team_join_keys` ADD CONSTRAINT `actaeon_team_join_keys_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `actaeon_teams`(`uuid`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_user_ext` ADD CONSTRAINT `actaeon_user_ext_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_user_ext` ADD CONSTRAINT `fk_team` FOREIGN KEY (`team`) REFERENCES `actaeon_teams`(`uuid`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_user_friends` ADD CONSTRAINT `actaeon_user_friends_ibfk_1` FOREIGN KEY (`user1`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actaeon_user_friends` ADD CONSTRAINT `actaeon_user_friends_ibfk_2` FOREIGN KEY (`user2`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `aime_card` ADD CONSTRAINT `aime_card_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `arcade_owner` ADD CONSTRAINT `arcade_owner_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `arcade_owner` ADD CONSTRAINT `arcade_owner_ibfk_2` FOREIGN KEY (`arcade`) REFERENCES `arcade`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_character` ADD CONSTRAINT `chuni_item_character_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_cmission` ADD CONSTRAINT `chuni_item_cmission_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_cmission_progress` ADD CONSTRAINT `chuni_item_cmission_progress_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_duel` ADD CONSTRAINT `chuni_item_duel_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_favorite` ADD CONSTRAINT `chuni_item_favorite_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_gacha` ADD CONSTRAINT `chuni_item_gacha_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_item` ADD CONSTRAINT `chuni_item_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_login_bonus` ADD CONSTRAINT `chuni_item_login_bonus_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_map` ADD CONSTRAINT `chuni_item_map_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_map_area` ADD CONSTRAINT `chuni_item_map_area_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_matching` ADD CONSTRAINT `chuni_item_matching_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_print_detail` ADD CONSTRAINT `chuni_item_print_detail_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_item_print_state` ADD CONSTRAINT `chuni_item_print_state_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_activity` ADD CONSTRAINT `chuni_profile_activity_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_charge` ADD CONSTRAINT `chuni_profile_charge_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_data` ADD CONSTRAINT `chuni_profile_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_data` ADD CONSTRAINT `chuni_profile_data_ibfk_2` FOREIGN KEY (`teamId`) REFERENCES `chuni_profile_team`(`id`) ON DELETE set null ON UPDATE set null;--> statement-breakpoint
ALTER TABLE `chuni_profile_data_ex` ADD CONSTRAINT `chuni_profile_data_ex_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_emoney` ADD CONSTRAINT `chuni_profile_emoney_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_net_battle` ADD CONSTRAINT `chuni_profile_net_battle_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_option` ADD CONSTRAINT `chuni_profile_option_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_option_ex` ADD CONSTRAINT `chuni_profile_option_ex_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_overpower` ADD CONSTRAINT `chuni_profile_overpower_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_recent_rating` ADD CONSTRAINT `chuni_profile_recent_rating_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_profile_region` ADD CONSTRAINT `chuni_profile_region_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_score_best` ADD CONSTRAINT `chuni_score_best_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_score_course` ADD CONSTRAINT `chuni_score_course_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_score_playlog` ADD CONSTRAINT `chuni_score_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `chuni_static_login_bonus` ADD CONSTRAINT `chuni_static_login_bonus_ibfk_1` FOREIGN KEY (`presetId`,`version`) REFERENCES `chuni_static_login_bonus_preset`(`presetId`,`version`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `cxb_playlog` ADD CONSTRAINT `cxb_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cxb_profile` ADD CONSTRAINT `cxb_profile_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cxb_ranking` ADD CONSTRAINT `cxb_ranking_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cxb_rev_energy` ADD CONSTRAINT `cxb_rev_energy_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `cxb_score` ADD CONSTRAINT `cxb_score_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `diva_playlog` ADD CONSTRAINT `diva_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `diva_profile` ADD CONSTRAINT `diva_profile_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `diva_profile_customize_item` ADD CONSTRAINT `diva_profile_customize_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `diva_profile_module` ADD CONSTRAINT `diva_profile_module_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `diva_profile_pv_customize` ADD CONSTRAINT `diva_profile_pv_customize_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `diva_profile_shop` ADD CONSTRAINT `diva_profile_shop_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `diva_score` ADD CONSTRAINT `diva_score_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `idac_profile` ADD CONSTRAINT `idac_profile_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_profile_avatar` ADD CONSTRAINT `idac_profile_avatar_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_profile_config` ADD CONSTRAINT `idac_profile_config_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_profile_rank` ADD CONSTRAINT `idac_profile_rank_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_profile_stock` ADD CONSTRAINT `idac_profile_stock_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_profile_theory` ADD CONSTRAINT `idac_profile_theory_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_car` ADD CONSTRAINT `idac_user_car_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_challenge` ADD CONSTRAINT `idac_user_challenge_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_course` ADD CONSTRAINT `idac_user_course_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_stamp` ADD CONSTRAINT `idac_user_stamp_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_story` ADD CONSTRAINT `idac_user_story_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_story_episode` ADD CONSTRAINT `idac_user_story_episode_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_story_episode_difficulty` ADD CONSTRAINT `idac_user_story_episode_difficulty_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_theory_course` ADD CONSTRAINT `idac_user_theory_course_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_theory_partner` ADD CONSTRAINT `idac_user_theory_partner_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_theory_running` ADD CONSTRAINT `idac_user_theory_running_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_ticket` ADD CONSTRAINT `idac_user_ticket_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_timetrial_event` ADD CONSTRAINT `idac_user_timetrial_event_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_time_trial` ADD CONSTRAINT `idac_user_time_trial_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `idac_user_vs_info` ADD CONSTRAINT `idac_user_vs_info_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `machine` ADD CONSTRAINT `machine_ibfk_1` FOREIGN KEY (`arcade`) REFERENCES `arcade`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_card` ADD CONSTRAINT `mai2_item_card_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_character` ADD CONSTRAINT `mai2_item_character_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_charge` ADD CONSTRAINT `mai2_item_charge_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_favorite` ADD CONSTRAINT `mai2_item_favorite_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_friend_season_ranking` ADD CONSTRAINT `mai2_item_friend_season_ranking_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_item` ADD CONSTRAINT `mai2_item_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_login_bonus` ADD CONSTRAINT `mai2_item_login_bonus_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_map` ADD CONSTRAINT `mai2_item_map_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_item_print_detail` ADD CONSTRAINT `mai2_item_print_detail_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_playlog` ADD CONSTRAINT `mai2_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_activity` ADD CONSTRAINT `mai2_profile_activity_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_consec_logins` ADD CONSTRAINT `mai2_profile_consec_logins_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_detail` ADD CONSTRAINT `mai2_profile_detail_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_extend` ADD CONSTRAINT `mai2_profile_extend_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_ghost` ADD CONSTRAINT `mai2_profile_ghost_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_option` ADD CONSTRAINT `mai2_profile_option_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_rating` ADD CONSTRAINT `mai2_profile_rating_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_profile_region` ADD CONSTRAINT `mai2_profile_region_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_score_best` ADD CONSTRAINT `mai2_score_best_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `mai2_score_course` ADD CONSTRAINT `mai2_score_course_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_playlog` ADD CONSTRAINT `maimai_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_profile_boss` ADD CONSTRAINT `maimai_profile_boss_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_profile_detail` ADD CONSTRAINT `maimai_profile_detail_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_profile_grade_status` ADD CONSTRAINT `maimai_profile_grade_status_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_profile_option` ADD CONSTRAINT `maimai_profile_option_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_profile_recent_rating` ADD CONSTRAINT `maimai_profile_recent_rating_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_profile_web_option` ADD CONSTRAINT `maimai_profile_web_option_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `maimai_score_best` ADD CONSTRAINT `maimai_score_best_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_gp_log` ADD CONSTRAINT `ongeki_gp_log_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_activity` ADD CONSTRAINT `ongeki_profile_activity_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_data` ADD CONSTRAINT `ongeki_profile_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_kop` ADD CONSTRAINT `ongeki_profile_kop_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_option` ADD CONSTRAINT `ongeki_profile_option_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_rating_log` ADD CONSTRAINT `ongeki_profile_rating_log_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_recent_rating` ADD CONSTRAINT `ongeki_profile_recent_rating_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_region` ADD CONSTRAINT `ongeki_profile_region_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_rival` ADD CONSTRAINT `ongeki_profile_rival_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_rival` ADD CONSTRAINT `ongeki_profile_rival_ibfk_2` FOREIGN KEY (`rivalUserId`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_profile_training_room` ADD CONSTRAINT `ongeki_profile_training_room_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_score_best` ADD CONSTRAINT `ongeki_score_best_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_score_playlog` ADD CONSTRAINT `ongeki_score_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_score_tech_count` ADD CONSTRAINT `ongeki_score_tech_count_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_session_log` ADD CONSTRAINT `ongeki_session_log_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_tech_event_ranking` ADD CONSTRAINT `ongeki_tech_event_ranking_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_boss` ADD CONSTRAINT `ongeki_user_boss_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_card` ADD CONSTRAINT `ongeki_user_card_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_chapter` ADD CONSTRAINT `ongeki_user_chapter_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_character` ADD CONSTRAINT `ongeki_user_character_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_deck` ADD CONSTRAINT `ongeki_user_deck_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_event_music` ADD CONSTRAINT `ongeki_user_event_music_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_event_point` ADD CONSTRAINT `ongeki_user_event_point_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_gacha` ADD CONSTRAINT `ongeki_user_gacha_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_gacha_supply` ADD CONSTRAINT `ongeki_user_gacha_supply_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_item` ADD CONSTRAINT `ongeki_user_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_login_bonus` ADD CONSTRAINT `ongeki_user_login_bonus_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_memorychapter` ADD CONSTRAINT `ongeki_user_memorychapter_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_mission_point` ADD CONSTRAINT `ongeki_user_mission_point_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_music_item` ADD CONSTRAINT `ongeki_user_music_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_print_detail` ADD CONSTRAINT `ongeki_user_print_detail_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_scenerio` ADD CONSTRAINT `ongeki_user_scenerio_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_story` ADD CONSTRAINT `ongeki_user_story_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_tech_event` ADD CONSTRAINT `ongeki_user_tech_event_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `ongeki_user_trade_item` ADD CONSTRAINT `ongeki_user_trade_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pokken_item` ADD CONSTRAINT `pokken_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pokken_match_data` ADD CONSTRAINT `pokken_match_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pokken_pokemon_data` ADD CONSTRAINT `pokken_pokemon_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `pokken_profile` ADD CONSTRAINT `pokken_profile_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_end_sessions` ADD CONSTRAINT `sao_end_sessions_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_equipment_data` ADD CONSTRAINT `sao_equipment_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_hero_log_data` ADD CONSTRAINT `sao_hero_log_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_hero_party` ADD CONSTRAINT `sao_hero_party_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_item_data` ADD CONSTRAINT `sao_item_data_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_player_quest` ADD CONSTRAINT `sao_player_quest_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_play_sessions` ADD CONSTRAINT `sao_play_sessions_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `sao_profile` ADD CONSTRAINT `sao_profile_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_bingo` ADD CONSTRAINT `wacca_bingo_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_favorite_song` ADD CONSTRAINT `wacca_favorite_song_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_friend` ADD CONSTRAINT `wacca_friend_ibfk_1` FOREIGN KEY (`profile_sender`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_friend` ADD CONSTRAINT `wacca_friend_ibfk_2` FOREIGN KEY (`profile_reciever`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_gate` ADD CONSTRAINT `wacca_gate_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_item` ADD CONSTRAINT `wacca_item_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_option` ADD CONSTRAINT `wacca_option_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_profile` ADD CONSTRAINT `wacca_profile_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_score_best` ADD CONSTRAINT `wacca_score_best_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_score_playlog` ADD CONSTRAINT `wacca_score_playlog_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_score_stageup` ADD CONSTRAINT `wacca_score_stageup_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_song_unlock` ADD CONSTRAINT `wacca_song_unlock_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_ticket` ADD CONSTRAINT `wacca_ticket_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `wacca_trophy` ADD CONSTRAINT `wacca_trophy_ibfk_1` FOREIGN KEY (`user`) REFERENCES `aime_user`(`id`) ON DELETE cascade ON UPDATE cascade;
*/