// @ts-nocheck
import {
  mysqlTable,
  mysqlSchema,
  AnyMySqlColumn,
  foreignKey,
  unique,
  int,
  char,
  index,
  varchar,
  tinyint,
  datetime,
  timestamp,
  longtext,
  float,
  bigint,
} from "drizzle-orm/mysql-core";
import { sql } from "drizzle-orm";

export const aimeCard = mysqlTable(
  "aime_card",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    accessCode: varchar("access_code", { length: 20 }).default("NULL"),
    createdDate: timestamp("created_date", { mode: "string" }).default(
      "current_timestamp()"
    ),
    lastLoginDate: timestamp("last_login_date", { mode: "string" }).default(
      "NULL"
    ),
    isLocked: tinyint("is_locked").default(0),
    isBanned: tinyint("is_banned").default(0),
  },
  (table) => {
    return {
      aimeCardUk: unique("aime_card_uk").on(table.user, table.accessCode),
    };
  }
);

export const aimeUser = mysqlTable(
  "aime_user",
  {
    id: int("id").autoincrement().notNull(),
    username: varchar("username", { length: 25 }).default("NULL"),
    email: varchar("email", { length: 255 }).default("NULL"),
    password: varchar("password", { length: 255 }).default("NULL"),
    permissions: int("permissions").default("NULL"),
    createdDate: timestamp("created_date", { mode: "string" }).default(
      "current_timestamp()"
    ),
    lastLoginDate: timestamp("last_login_date", { mode: "string" }).default(
      "NULL"
    ),
    suspendExpireTime: timestamp("suspend_expire_time", {
      mode: "string",
    }).default("NULL"),
  },
  (table) => {
    return {
      username: unique("username").on(table.username),
      email: unique("email").on(table.email),
    };
  }
);

export const alembicVersion = mysqlTable("alembic_version", {
  versionNum: varchar("version_num", { length: 32 }).notNull(),
});

export const arcade = mysqlTable("arcade", {
  id: int("id").autoincrement().notNull(),
  name: varchar("name", { length: 255 }).default("NULL"),
  nickname: varchar("nickname", { length: 255 }).default("NULL"),
  country: varchar("country", { length: 3 }).default("NULL"),
  countryId: int("country_id").default("NULL"),
  state: varchar("state", { length: 255 }).default("NULL"),
  city: varchar("city", { length: 255 }).default("NULL"),
  regionId: int("region_id").default("NULL"),
  timezone: varchar("timezone", { length: 255 }).default("NULL"),
  ip: varchar("ip", { length: 39 }).default("NULL"),
});

export const arcadeOwner = mysqlTable(
  "arcade_owner",
  {
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    arcade: int("arcade")
      .notNull()
      .references(() => arcade.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    permissions: int("permissions").notNull(),
  },
  (table) => {
    return {
      arcade: index("arcade").on(table.arcade),
    };
  }
);

export const chuniItemCharacter = mysqlTable(
  "chuni_item_character",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    characterId: int("characterId").default("NULL"),
    level: int("level").default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    isValid: tinyint("isValid").default("NULL"),
    skillId: int("skillId").default("NULL"),
    isNewMark: tinyint("isNewMark").default("NULL"),
    playCount: int("playCount").default("NULL"),
    friendshipExp: int("friendshipExp").default("NULL"),
    assignIllust: int("assignIllust").default("NULL"),
    exMaxLv: int("exMaxLv").default("NULL"),
  },
  (table) => {
    return {
      chuniItemCharacterUk: unique("chuni_item_character_uk").on(
        table.user,
        table.characterId
      ),
    };
  }
);

export const chuniItemCmission = mysqlTable(
  "chuni_item_cmission",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    missionId: int("missionId").notNull(),
    point: int("point").default("NULL"),
  },
  (table) => {
    return {
      chuniItemCmissionUk: unique("chuni_item_cmission_uk").on(
        table.user,
        table.missionId
      ),
    };
  }
);

export const chuniItemCmissionProgress = mysqlTable(
  "chuni_item_cmission_progress",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    missionId: int("missionId").notNull(),
    order: int("order").default("NULL"),
    stage: int("stage").default("NULL"),
    progress: int("progress").default("NULL"),
  },
  (table) => {
    return {
      chuniItemCmissionProgressUk: unique("chuni_item_cmission_progress_uk").on(
        table.user,
        table.missionId,
        table.order
      ),
    };
  }
);

export const chuniItemDuel = mysqlTable(
  "chuni_item_duel",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    duelId: int("duelId").default("NULL"),
    progress: int("progress").default("NULL"),
    point: int("point").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    lastPlayDate: varchar("lastPlayDate", { length: 25 }).default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    param3: int("param3").default("NULL"),
    param4: int("param4").default("NULL"),
  },
  (table) => {
    return {
      chuniItemDuelUk: unique("chuni_item_duel_uk").on(
        table.user,
        table.duelId
      ),
    };
  }
);

export const chuniItemFavorite = mysqlTable(
  "chuni_item_favorite",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    favId: int("favId").notNull(),
    favKind: int("favKind").default(1).notNull(),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
      chuniItemFavoriteUk: unique("chuni_item_favorite_uk").on(
        table.version,
        table.user,
        table.favId
      ),
    };
  }
);

export const chuniItemGacha = mysqlTable(
  "chuni_item_gacha",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    gachaId: int("gachaId").notNull(),
    totalGachaCnt: int("totalGachaCnt").default(0),
    ceilingGachaCnt: int("ceilingGachaCnt").default(0),
    dailyGachaCnt: int("dailyGachaCnt").default(0),
    fiveGachaCnt: int("fiveGachaCnt").default(0),
    elevenGachaCnt: int("elevenGachaCnt").default(0),
    dailyGachaDate: timestamp("dailyGachaDate", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      chuniItemGachaUk: unique("chuni_item_gacha_uk").on(
        table.user,
        table.gachaId
      ),
    };
  }
);

export const chuniItemItem = mysqlTable(
  "chuni_item_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemId: int("itemId").default("NULL"),
    itemKind: int("itemKind").default("NULL"),
    stock: int("stock").default("NULL"),
    isValid: tinyint("isValid").default("NULL"),
  },
  (table) => {
    return {
      chuniItemItemUk: unique("chuni_item_item_uk").on(
        table.user,
        table.itemId,
        table.itemKind
      ),
    };
  }
);

export const chuniItemLoginBonus = mysqlTable(
  "chuni_item_login_bonus",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    presetId: int("presetId").notNull(),
    bonusCount: int("bonusCount").default(0).notNull(),
    lastUpdateDate: timestamp("lastUpdateDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    isWatched: tinyint("isWatched").default(0),
    isFinished: tinyint("isFinished").default(0),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
      chuniItemLoginBonusUk: unique("chuni_item_login_bonus_uk").on(
        table.version,
        table.user,
        table.presetId
      ),
    };
  }
);

export const chuniItemMap = mysqlTable(
  "chuni_item_map",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    mapId: int("mapId").default("NULL"),
    position: int("position").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    areaId: int("areaId").default("NULL"),
    routeNumber: int("routeNumber").default("NULL"),
    eventId: int("eventId").default("NULL"),
    rate: int("rate").default("NULL"),
    statusCount: int("statusCount").default("NULL"),
    isValid: tinyint("isValid").default("NULL"),
  },
  (table) => {
    return {
      chuniItemMapUk: unique("chuni_item_map_uk").on(table.user, table.mapId),
    };
  }
);

export const chuniItemMapArea = mysqlTable(
  "chuni_item_map_area",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    mapAreaId: int("mapAreaId").default("NULL"),
    rate: int("rate").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    isLocked: tinyint("isLocked").default("NULL"),
    position: int("position").default("NULL"),
    statusCount: int("statusCount").default("NULL"),
    remainGridCount: int("remainGridCount").default("NULL"),
  },
  (table) => {
    return {
      chuniItemMapAreaUk: unique("chuni_item_map_area_uk").on(
        table.user,
        table.mapAreaId
      ),
    };
  }
);

export const chuniItemMatching = mysqlTable(
  "chuni_item_matching",
  {
    roomId: int("roomId").notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    restMsec: int("restMSec").default(60).notNull(),
    isFull: tinyint("isFull").default(0).notNull(),
    matchingMemberInfoList: longtext("matchingMemberInfoList").notNull(),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const chuniItemPrintDetail = mysqlTable(
  "chuni_item_print_detail",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    cardId: int("cardId").notNull(),
    printDate: timestamp("printDate", { mode: "string" }).notNull(),
    serialId: varchar("serialId", { length: 20 }).notNull(),
    placeId: int("placeId").notNull(),
    clientId: varchar("clientId", { length: 11 }).notNull(),
    printerSerialId: varchar("printerSerialId", { length: 20 }).notNull(),
    printOption1: tinyint("printOption1").default(0),
    printOption2: tinyint("printOption2").default(0),
    printOption3: tinyint("printOption3").default(0),
    printOption4: tinyint("printOption4").default(0),
    printOption5: tinyint("printOption5").default(0),
    printOption6: tinyint("printOption6").default(0),
    printOption7: tinyint("printOption7").default(0),
    printOption8: tinyint("printOption8").default(0),
    printOption9: tinyint("printOption9").default(0),
    printOption10: tinyint("printOption10").default(0),
    created: varchar("created", { length: 255 }).default(""),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
      chuniItemPrintDetailUk: unique("chuni_item_print_detail_uk").on(
        table.serialId
      ),
    };
  }
);

export const chuniItemPrintState = mysqlTable(
  "chuni_item_print_state",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    hasCompleted: tinyint("hasCompleted").default(0).notNull(),
    limitDate: timestamp("limitDate", { mode: "string" })
      .default("2037-12-31 17:00:00")
      .notNull(),
    placeId: int("placeId").default("NULL"),
    cardId: int("cardId").default("NULL"),
    gachaId: int("gachaId").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
      chuniItemPrintStateUk: unique("chuni_item_print_state_uk").on(
        table.id,
        table.user
      ),
    };
  }
);

export const chuniProfileActivity = mysqlTable(
  "chuni_profile_activity",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    kind: int("kind").default("NULL"),
    activityId: int("activityId").default("NULL"),
    sortNumber: int("sortNumber").default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    param3: int("param3").default("NULL"),
    param4: int("param4").default("NULL"),
  },
  (table) => {
    return {
      chuniProfileActivityUk: unique("chuni_profile_activity_uk").on(
        table.user,
        table.kind,
        table.activityId
      ),
    };
  }
);

export const chuniProfileCharge = mysqlTable(
  "chuni_profile_charge",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chargeId: int("chargeId").default("NULL"),
    stock: int("stock").default("NULL"),
    purchaseDate: varchar("purchaseDate", { length: 25 }).default("NULL"),
    validDate: varchar("validDate", { length: 25 }).default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    paramDate: varchar("paramDate", { length: 25 }).default("NULL"),
  },
  (table) => {
    return {
      chuniProfileChargeUk: unique("chuni_profile_charge_uk").on(
        table.user,
        table.chargeId
      ),
    };
  }
);

export const chuniProfileData = mysqlTable(
  "chuni_profile_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    exp: int("exp").default("NULL"),
    level: int("level").default("NULL"),
    point: int("point").default("NULL"),
    frameId: int("frameId").default("NULL"),
    isMaimai: tinyint("isMaimai").default("NULL"),
    trophyId: int("trophyId").default("NULL"),
    userName: varchar("userName", { length: 25 }).default("NULL"),
    isWebJoin: tinyint("isWebJoin").default("NULL"),
    playCount: int("playCount").default("NULL"),
    lastGameId: varchar("lastGameId", { length: 25 }).default("NULL"),
    totalPoint: bigint("totalPoint", { mode: "number" }).default("NULL"),
    characterId: int("characterId").default("NULL"),
    firstGameId: varchar("firstGameId", { length: 25 }).default("NULL"),
    friendCount: int("friendCount").default("NULL"),
    lastPlaceId: int("lastPlaceId").default("NULL"),
    nameplateId: int("nameplateId").default("NULL"),
    totalMapNum: int("totalMapNum").default("NULL"),
    lastAllNetId: int("lastAllNetId").default("NULL"),
    lastClientId: varchar("lastClientId", { length: 25 }).default("NULL"),
    lastPlayDate: varchar("lastPlayDate", { length: 25 }).default("NULL"),
    lastRegionId: int("lastRegionId").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    totalHiScore: int("totalHiScore").default("NULL"),
    webLimitDate: varchar("webLimitDate", { length: 25 }).default("NULL"),
    firstPlayDate: varchar("firstPlayDate", { length: 25 }).default("NULL"),
    highestRating: int("highestRating").default("NULL"),
    lastPlaceName: varchar("lastPlaceName", { length: 25 }).default("NULL"),
    multiWinCount: int("multiWinCount").default("NULL"),
    acceptResCount: int("acceptResCount").default("NULL"),
    lastRegionName: varchar("lastRegionName", { length: 25 }).default("NULL"),
    lastRomVersion: varchar("lastRomVersion", { length: 25 }).default("NULL"),
    multiPlayCount: int("multiPlayCount").default("NULL"),
    firstRomVersion: varchar("firstRomVersion", { length: 25 }).default("NULL"),
    lastDataVersion: varchar("lastDataVersion", { length: 25 }).default("NULL"),
    requestResCount: int("requestResCount").default("NULL"),
    successResCount: int("successResCount").default("NULL"),
    eventWatchedDate: varchar("eventWatchedDate", { length: 25 }).default(
      "NULL"
    ),
    firstDataVersion: varchar("firstDataVersion", { length: 25 }).default(
      "NULL"
    ),
    reincarnationNum: int("reincarnationNum").default("NULL"),
    playedTutorialBit: int("playedTutorialBit").default("NULL"),
    totalBasicHighScore: int("totalBasicHighScore").default("NULL"),
    totalExpertHighScore: int("totalExpertHighScore").default("NULL"),
    totalMasterHighScore: int("totalMasterHighScore").default("NULL"),
    totalRepertoireCount: int("totalRepertoireCount").default("NULL"),
    firstTutorialCancelNum: int("firstTutorialCancelNum").default("NULL"),
    totalAdvancedHighScore: int("totalAdvancedHighScore").default("NULL"),
    masterTutorialCancelNum: int("masterTutorialCancelNum").default("NULL"),
    ext1: int("ext1").default("NULL"),
    ext2: int("ext2").default("NULL"),
    ext3: int("ext3").default("NULL"),
    ext4: int("ext4").default("NULL"),
    ext5: int("ext5").default("NULL"),
    ext6: int("ext6").default("NULL"),
    ext7: int("ext7").default("NULL"),
    ext8: int("ext8").default("NULL"),
    ext9: int("ext9").default("NULL"),
    ext10: int("ext10").default("NULL"),
    extStr1: varchar("extStr1", { length: 255 }).default("NULL"),
    extStr2: varchar("extStr2", { length: 255 }).default("NULL"),
    extLong1: int("extLong1").default("NULL"),
    extLong2: int("extLong2").default("NULL"),
    mapIconId: int("mapIconId").default("NULL"),
    compatibleCmVersion: varchar("compatibleCmVersion", { length: 25 }).default(
      "NULL"
    ),
    medal: int("medal").default("NULL"),
    voiceId: int("voiceId").default("NULL"),
    teamId: int("teamId")
      .default("NULL")
      .references(() => chuniProfileTeam.id, {
        onDelete: "set null",
        onUpdate: "set null",
      }),
    eliteRankPoint: int("eliteRankPoint").default(0),
    stockedGridCount: int("stockedGridCount").default(0),
    netBattleLoseCount: int("netBattleLoseCount").default(0),
    netBattleHostErrCnt: int("netBattleHostErrCnt").default(0),
    netBattle4ThCount: int("netBattle4thCount").default(0),
    overPowerRate: int("overPowerRate").default(0),
    battleRewardStatus: int("battleRewardStatus").default(0),
    netBattle1StCount: int("netBattle1stCount").default(0),
    charaIllustId: int("charaIllustId").default(0),
    userNameEx: varchar("userNameEx", { length: 8 }).default(""),
    netBattleWinCount: int("netBattleWinCount").default(0),
    netBattleCorrection: int("netBattleCorrection").default(0),
    classEmblemMedal: int("classEmblemMedal").default(0),
    overPowerPoint: int("overPowerPoint").default(0),
    netBattleErrCnt: int("netBattleErrCnt").default(0),
    battleRankId: int("battleRankId").default(0),
    netBattle3RdCount: int("netBattle3rdCount").default(0),
    netBattleConsecutiveWinCount: int("netBattleConsecutiveWinCount").default(
      0
    ),
    overPowerLowerRank: int("overPowerLowerRank").default(0),
    classEmblemBase: int("classEmblemBase").default(0),
    battleRankPoint: int("battleRankPoint").default(0),
    netBattle2NdCount: int("netBattle2ndCount").default(0),
    totalUltimaHighScore: int("totalUltimaHighScore").default(0),
    skillId: int("skillId").default(0),
    lastCountryCode: varchar("lastCountryCode", { length: 5 }).default("JPN"),
    isNetBattleHost: tinyint("isNetBattleHost").default(0),
    battleRewardCount: int("battleRewardCount").default(0),
    battleRewardIndex: int("battleRewardIndex").default(0),
    netBattlePlayCount: int("netBattlePlayCount").default(0),
    exMapLoopCount: int("exMapLoopCount").default(0),
    netBattleEndState: int("netBattleEndState").default(0),
    rankUpChallengeResults: longtext("rankUpChallengeResults").default("NULL"),
    avatarBack: int("avatarBack").default(0),
    avatarFace: int("avatarFace").default(0),
    avatarPoint: int("avatarPoint").default(0),
    avatarItem: int("avatarItem").default(0),
    avatarWear: int("avatarWear").default(0),
    avatarFront: int("avatarFront").default(0),
    avatarSkin: int("avatarSkin").default(0),
    avatarHead: int("avatarHead").default(0),
  },
  (table) => {
    return {
      teamId: index("teamId").on(table.teamId),
      chuniProfileProfileUk: unique("chuni_profile_profile_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const chuniProfileDataEx = mysqlTable(
  "chuni_profile_data_ex",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    ext1: int("ext1").default("NULL"),
    ext2: int("ext2").default("NULL"),
    ext3: int("ext3").default("NULL"),
    ext4: int("ext4").default("NULL"),
    ext5: int("ext5").default("NULL"),
    ext6: int("ext6").default("NULL"),
    ext7: int("ext7").default("NULL"),
    ext8: int("ext8").default("NULL"),
    ext9: int("ext9").default("NULL"),
    ext10: int("ext10").default("NULL"),
    ext11: int("ext11").default("NULL"),
    ext12: int("ext12").default("NULL"),
    ext13: int("ext13").default("NULL"),
    ext14: int("ext14").default("NULL"),
    ext15: int("ext15").default("NULL"),
    ext16: int("ext16").default("NULL"),
    ext17: int("ext17").default("NULL"),
    ext18: int("ext18").default("NULL"),
    ext19: int("ext19").default("NULL"),
    ext20: int("ext20").default("NULL"),
    medal: int("medal").default("NULL"),
    extStr1: varchar("extStr1", { length: 255 }).default("NULL"),
    extStr2: varchar("extStr2", { length: 255 }).default("NULL"),
    extStr3: varchar("extStr3", { length: 255 }).default("NULL"),
    extStr4: varchar("extStr4", { length: 255 }).default("NULL"),
    extStr5: varchar("extStr5", { length: 255 }).default("NULL"),
    voiceId: int("voiceId").default("NULL"),
    extLong1: int("extLong1").default("NULL"),
    extLong2: int("extLong2").default("NULL"),
    extLong3: int("extLong3").default("NULL"),
    extLong4: int("extLong4").default("NULL"),
    extLong5: int("extLong5").default("NULL"),
    mapIconId: int("mapIconId").default("NULL"),
    compatibleCmVersion: varchar("compatibleCmVersion", { length: 25 }).default(
      "NULL"
    ),
  },
  (table) => {
    return {
      chuniProfileDataExUk: unique("chuni_profile_data_ex_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const chuniProfileEmoney = mysqlTable(
  "chuni_profile_emoney",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ext1: int("ext1").default("NULL"),
    ext2: int("ext2").default("NULL"),
    ext3: int("ext3").default("NULL"),
    type: int("type").default("NULL"),
    emoneyBrand: int("emoneyBrand").default("NULL"),
    emoneyCredit: int("emoneyCredit").default("NULL"),
  },
  (table) => {
    return {
      chuniProfileEmoneyUk: unique("chuni_profile_emoney_uk").on(
        table.user,
        table.emoneyBrand
      ),
    };
  }
);

export const chuniProfileNetBattle = mysqlTable(
  "chuni_profile_net_battle",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    isRankUpChallengeFailed: tinyint("isRankUpChallengeFailed").default("NULL"),
    highestBattleRankId: int("highestBattleRankId").default("NULL"),
    battleIconId: int("battleIconId").default("NULL"),
    battleIconNum: int("battleIconNum").default("NULL"),
    avatarEffectPoint: int("avatarEffectPoint").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const chuniProfileOption = mysqlTable(
  "chuni_profile_option",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    speed: int("speed").default("NULL"),
    bgInfo: int("bgInfo").default("NULL"),
    rating: int("rating").default("NULL"),
    privacy: int("privacy").default("NULL"),
    judgePos: int("judgePos").default("NULL"),
    matching: int("matching").default("NULL"),
    guideLine: int("guideLine").default("NULL"),
    headphone: int("headphone").default("NULL"),
    optionSet: int("optionSet").default("NULL"),
    fieldColor: int("fieldColor").default("NULL"),
    guideSound: int("guideSound").default("NULL"),
    successAir: int("successAir").default("NULL"),
    successTap: int("successTap").default("NULL"),
    judgeAttack: int("judgeAttack").default("NULL"),
    playerLevel: int("playerLevel").default("NULL"),
    soundEffect: int("soundEffect").default("NULL"),
    judgeJustice: int("judgeJustice").default("NULL"),
    successExTap: int("successExTap").default("NULL"),
    successFlick: int("successFlick").default("NULL"),
    successSkill: int("successSkill").default("NULL"),
    successSlideHold: int("successSlideHold").default("NULL"),
    successTapTimbre: int("successTapTimbre").default("NULL"),
    ext1: int("ext1").default("NULL"),
    ext2: int("ext2").default("NULL"),
    ext3: int("ext3").default("NULL"),
    ext4: int("ext4").default("NULL"),
    ext5: int("ext5").default("NULL"),
    ext6: int("ext6").default("NULL"),
    ext7: int("ext7").default("NULL"),
    ext8: int("ext8").default("NULL"),
    ext9: int("ext9").default("NULL"),
    ext10: int("ext10").default("NULL"),
    categoryDetail: int("categoryDetail").default(0),
    judgeTimingOffset120: int("judgeTimingOffset_120").default(0),
    resultVoiceShort: int("resultVoiceShort").default(0),
    judgeAppendSe: int("judgeAppendSe").default(0),
    judgeCritical: int("judgeCritical").default(0),
    trackSkip: int("trackSkip").default(0),
    selectMusicFilterLv: int("selectMusicFilterLv").default(0),
    sortMusicFilterLv: int("sortMusicFilterLv").default(0),
    sortMusicGenre: int("sortMusicGenre").default(0),
    speed120: int("speed_120").default(0),
    judgeTimingOffset: int("judgeTimingOffset").default(0),
    mirrorFumen: int("mirrorFumen").default(0),
    playTimingOffset120: int("playTimingOffset_120").default(0),
    hardJudge: int("hardJudge").default(0),
    notesThickness: int("notesThickness").default(0),
    fieldWallPosition: int("fieldWallPosition").default(0),
    playTimingOffset: int("playTimingOffset").default(0),
    fieldWallPosition120: int("fieldWallPosition_120").default(0),
  },
  (table) => {
    return {
      chuniProfileOptionUk: unique("chuni_profile_option_uk").on(table.user),
    };
  }
);

export const chuniProfileOptionEx = mysqlTable(
  "chuni_profile_option_ex",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ext1: int("ext1").default("NULL"),
    ext2: int("ext2").default("NULL"),
    ext3: int("ext3").default("NULL"),
    ext4: int("ext4").default("NULL"),
    ext5: int("ext5").default("NULL"),
    ext6: int("ext6").default("NULL"),
    ext7: int("ext7").default("NULL"),
    ext8: int("ext8").default("NULL"),
    ext9: int("ext9").default("NULL"),
    ext10: int("ext10").default("NULL"),
    ext11: int("ext11").default("NULL"),
    ext12: int("ext12").default("NULL"),
    ext13: int("ext13").default("NULL"),
    ext14: int("ext14").default("NULL"),
    ext15: int("ext15").default("NULL"),
    ext16: int("ext16").default("NULL"),
    ext17: int("ext17").default("NULL"),
    ext18: int("ext18").default("NULL"),
    ext19: int("ext19").default("NULL"),
    ext20: int("ext20").default("NULL"),
  },
  (table) => {
    return {
      chuniProfileOptionExUk: unique("chuni_profile_option_ex_uk").on(
        table.user
      ),
    };
  }
);

export const chuniProfileOverpower = mysqlTable(
  "chuni_profile_overpower",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    genreId: int("genreId").default("NULL"),
    difficulty: int("difficulty").default("NULL"),
    rate: int("rate").default("NULL"),
    point: int("point").default("NULL"),
  },
  (table) => {
    return {
      chuniProfileEmoneyUk: unique("chuni_profile_emoney_uk").on(
        table.user,
        table.genreId,
        table.difficulty
      ),
    };
  }
);

export const chuniProfileRecentRating = mysqlTable(
  "chuni_profile_recent_rating",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    recentRating: longtext("recentRating").default("NULL"),
  },
  (table) => {
    return {
      chuniProfileRecentRatingUk: unique("chuni_profile_recent_rating_uk").on(
        table.user
      ),
    };
  }
);

export const chuniProfileRegion = mysqlTable(
  "chuni_profile_region",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    regionId: int("regionId").default("NULL"),
    playCount: int("playCount").default("NULL"),
  },
  (table) => {
    return {
      chuniProfileRegionUk: unique("chuni_profile_region_uk").on(
        table.user,
        table.regionId
      ),
    };
  }
);

export const chuniProfileTeam = mysqlTable("chuni_profile_team", {
  id: int("id").autoincrement().notNull(),
  teamName: varchar("teamName", { length: 255 }).default("NULL"),
  teamPoint: int("teamPoint").default("NULL"),
});

export const chuniScoreBest = mysqlTable(
  "chuni_score_best",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    playCount: int("playCount").default("NULL"),
    scoreMax: int("scoreMax").default("NULL"),
    resRequestCount: int("resRequestCount").default("NULL"),
    resAcceptCount: int("resAcceptCount").default("NULL"),
    resSuccessCount: int("resSuccessCount").default("NULL"),
    missCount: int("missCount").default("NULL"),
    maxComboCount: int("maxComboCount").default("NULL"),
    isFullCombo: tinyint("isFullCombo").default("NULL"),
    isAllJustice: tinyint("isAllJustice").default("NULL"),
    isSuccess: int("isSuccess").default("NULL"),
    fullChain: int("fullChain").default("NULL"),
    maxChain: int("maxChain").default("NULL"),
    scoreRank: int("scoreRank").default("NULL"),
    isLock: tinyint("isLock").default("NULL"),
    ext1: int("ext1").default("NULL"),
    theoryCount: int("theoryCount").default("NULL"),
  },
  (table) => {
    return {
      chuniScoreBestUk: unique("chuni_score_best_uk").on(
        table.user,
        table.musicId,
        table.level
      ),
    };
  }
);

export const chuniScoreCourse = mysqlTable(
  "chuni_score_course",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    courseId: int("courseId").default("NULL"),
    classId: int("classId").default("NULL"),
    playCount: int("playCount").default("NULL"),
    scoreMax: int("scoreMax").default("NULL"),
    isFullCombo: tinyint("isFullCombo").default("NULL"),
    isAllJustice: tinyint("isAllJustice").default("NULL"),
    isSuccess: int("isSuccess").default("NULL"),
    scoreRank: int("scoreRank").default("NULL"),
    eventId: int("eventId").default("NULL"),
    lastPlayDate: varchar("lastPlayDate", { length: 25 }).default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    param3: int("param3").default("NULL"),
    param4: int("param4").default("NULL"),
    isClear: int("isClear").default("NULL"),
    theoryCount: int("theoryCount").default("NULL"),
    orderId: int("orderId").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
  },
  (table) => {
    return {
      chuniScoreCourseUk: unique("chuni_score_course_uk").on(
        table.user,
        table.courseId
      ),
    };
  }
);

export const chuniScorePlaylog = mysqlTable(
  "chuni_score_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    orderId: int("orderId").default("NULL"),
    sortNumber: int("sortNumber").default("NULL"),
    placeId: int("placeId").default("NULL"),
    playDate: varchar("playDate", { length: 20 }).default("NULL"),
    userPlayDate: varchar("userPlayDate", { length: 20 }).default("NULL"),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    customId: int("customId").default("NULL"),
    playedUserId1: int("playedUserId1").default("NULL"),
    playedUserId2: int("playedUserId2").default("NULL"),
    playedUserId3: int("playedUserId3").default("NULL"),
    playedUserName1: varchar("playedUserName1", { length: 20 }).default("NULL"),
    playedUserName2: varchar("playedUserName2", { length: 20 }).default("NULL"),
    playedUserName3: varchar("playedUserName3", { length: 20 }).default("NULL"),
    playedMusicLevel1: int("playedMusicLevel1").default("NULL"),
    playedMusicLevel2: int("playedMusicLevel2").default("NULL"),
    playedMusicLevel3: int("playedMusicLevel3").default("NULL"),
    playedCustom1: int("playedCustom1").default("NULL"),
    playedCustom2: int("playedCustom2").default("NULL"),
    playedCustom3: int("playedCustom3").default("NULL"),
    track: int("track").default("NULL"),
    score: int("score").default("NULL"),
    rank: int("rank").default("NULL"),
    maxCombo: int("maxCombo").default("NULL"),
    maxChain: int("maxChain").default("NULL"),
    rateTap: int("rateTap").default("NULL"),
    rateHold: int("rateHold").default("NULL"),
    rateSlide: int("rateSlide").default("NULL"),
    rateAir: int("rateAir").default("NULL"),
    rateFlick: int("rateFlick").default("NULL"),
    judgeGuilty: int("judgeGuilty").default("NULL"),
    judgeAttack: int("judgeAttack").default("NULL"),
    judgeJustice: int("judgeJustice").default("NULL"),
    judgeCritical: int("judgeCritical").default("NULL"),
    eventId: int("eventId").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    isNewRecord: tinyint("isNewRecord").default("NULL"),
    isFullCombo: tinyint("isFullCombo").default("NULL"),
    fullChainKind: int("fullChainKind").default("NULL"),
    isAllJustice: tinyint("isAllJustice").default("NULL"),
    isContinue: tinyint("isContinue").default("NULL"),
    isFreeToPlay: tinyint("isFreeToPlay").default("NULL"),
    characterId: int("characterId").default("NULL"),
    skillId: int("skillId").default("NULL"),
    playKind: int("playKind").default("NULL"),
    isClear: int("isClear").default("NULL"),
    skillLevel: int("skillLevel").default("NULL"),
    skillEffect: int("skillEffect").default("NULL"),
    placeName: varchar("placeName", { length: 255 }).default("NULL"),
    isMaimai: tinyint("isMaimai").default("NULL"),
    commonId: int("commonId").default("NULL"),
    charaIllustId: int("charaIllustId").default("NULL"),
    romVersion: varchar("romVersion", { length: 255 }).default("NULL"),
    judgeHeaven: int("judgeHeaven").default("NULL"),
    regionId: int("regionId").default("NULL"),
    machineType: int("machineType").default("NULL"),
    ticketId: int("ticketId").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const chuniStaticAvatar = mysqlTable(
  "chuni_static_avatar",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    avatarAccessoryId: int("avatarAccessoryId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    category: int("category").default("NULL"),
    iconPath: varchar("iconPath", { length: 255 }).default("NULL"),
    texturePath: varchar("texturePath", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      chuniStaticAvatarUk: unique("chuni_static_avatar_uk").on(
        table.version,
        table.avatarAccessoryId
      ),
    };
  }
);

export const chuniStaticCards = mysqlTable(
  "chuni_static_cards",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    cardId: int("cardId").notNull(),
    charaName: varchar("charaName", { length: 255 }).notNull(),
    charaId: int("charaId").notNull(),
    presentName: varchar("presentName", { length: 255 }).notNull(),
    rarity: int("rarity").default(2),
    labelType: int("labelType").notNull(),
    difType: int("difType").notNull(),
    miss: int("miss").notNull(),
    combo: int("combo").notNull(),
    chain: int("chain").notNull(),
    skillName: varchar("skillName", { length: 255 }).notNull(),
  },
  (table) => {
    return {
      chuniStaticCardsUk: unique("chuni_static_cards_uk").on(
        table.version,
        table.cardId
      ),
    };
  }
);

export const chuniStaticCharge = mysqlTable(
  "chuni_static_charge",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    chargeId: int("chargeId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    expirationDays: int("expirationDays").default("NULL"),
    consumeType: int("consumeType").default("NULL"),
    sellingAppeal: tinyint("sellingAppeal").default("NULL"),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      chuniStaticChargeUk: unique("chuni_static_charge_uk").on(
        table.version,
        table.chargeId
      ),
    };
  }
);

export const chuniStaticEvents = mysqlTable(
  "chuni_static_events",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    eventId: int("eventId").default("NULL"),
    type: int("type").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "current_timestamp()"
    ),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      chuniStaticEventsUk: unique("chuni_static_events_uk").on(
        table.version,
        table.eventId
      ),
    };
  }
);

export const chuniStaticGachas = mysqlTable(
  "chuni_static_gachas",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    gachaId: int("gachaId").notNull(),
    gachaName: varchar("gachaName", { length: 255 }).notNull(),
    type: int("type").default(0).notNull(),
    kind: int("kind").default(0).notNull(),
    isCeiling: tinyint("isCeiling").default(0),
    ceilingCnt: int("ceilingCnt").default(10),
    changeRateCnt1: int("changeRateCnt1").default(0),
    changeRateCnt2: int("changeRateCnt2").default(0),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    endDate: timestamp("endDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
    noticeStartDate: timestamp("noticeStartDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    noticeEndDate: timestamp("noticeEndDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
  },
  (table) => {
    return {
      chuniStaticGachasUk: unique("chuni_static_gachas_uk").on(
        table.version,
        table.gachaId,
        table.gachaName
      ),
    };
  }
);

export const chuniStaticGachaCards = mysqlTable(
  "chuni_static_gacha_cards",
  {
    id: int("id").autoincrement().notNull(),
    gachaId: int("gachaId").notNull(),
    cardId: int("cardId").notNull(),
    rarity: int("rarity").notNull(),
    weight: int("weight").default(1),
    isPickup: tinyint("isPickup").default(0),
  },
  (table) => {
    return {
      chuniStaticGachaCardsUk: unique("chuni_static_gacha_cards_uk").on(
        table.gachaId,
        table.cardId
      ),
    };
  }
);

export const chuniStaticLoginBonus = mysqlTable(
  "chuni_static_login_bonus",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    presetId: int("presetId").notNull(),
    loginBonusId: int("loginBonusId").notNull(),
    loginBonusName: varchar("loginBonusName", { length: 255 }).notNull(),
    presentId: int("presentId").notNull(),
    presentName: varchar("presentName", { length: 255 }).notNull(),
    itemNum: int("itemNum").notNull(),
    needLoginDayCount: int("needLoginDayCount").notNull(),
    loginBonusCategoryType: int("loginBonusCategoryType").notNull(),
  },
  (table) => {
    return {
      chuniStaticLoginBonusIbfk1: foreignKey({
        columns: [table.presetId, table.version],
        foreignColumns: [
          chuniStaticLoginBonusPreset.presetId,
          chuniStaticLoginBonusPreset.version,
        ],
        name: "chuni_static_login_bonus_ibfk_1",
      })
        .onUpdate("cascade")
        .onDelete("cascade"),
      chuniStaticLoginBonusUk: unique("chuni_static_login_bonus_uk").on(
        table.version,
        table.presetId,
        table.loginBonusId
      ),
    };
  }
);

export const chuniStaticLoginBonusPreset = mysqlTable(
  "chuni_static_login_bonus_preset",
  {
    presetId: int("presetId").notNull(),
    version: int("version").notNull(),
    presetName: varchar("presetName", { length: 255 }).notNull(),
    isEnabled: tinyint("isEnabled").default(1),
  }
);

export const chuniStaticMusic = mysqlTable(
  "chuni_static_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    songId: int("songId").default("NULL"),
    chartId: int("chartId").default("NULL"),
    title: varchar("title", { length: 255 }).default("NULL"),
    artist: varchar("artist", { length: 255 }).default("NULL"),
    level: float("level").default("NULL"),
    genre: varchar("genre", { length: 255 }).default("NULL"),
    jacketPath: varchar("jacketPath", { length: 255 }).default("NULL"),
    worldsEndTag: varchar("worldsEndTag", { length: 7 }).default("NULL"),
  },
  (table) => {
    return {
      chuniStaticMusicUk: unique("chuni_static_music_uk").on(
        table.version,
        table.songId,
        table.chartId
      ),
    };
  }
);

export const cxbPlaylog = mysqlTable(
  "cxb_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    songMcode: varchar("song_mcode", { length: 7 }).default("NULL"),
    chartId: int("chart_id").default("NULL"),
    score: int("score").default("NULL"),
    clear: int("clear").default("NULL"),
    flawless: int("flawless").default("NULL"),
    super: int("super").default("NULL"),
    cool: int("cool").default("NULL"),
    fast: int("fast").default("NULL"),
    fast2: int("fast2").default("NULL"),
    slow: int("slow").default("NULL"),
    slow2: int("slow2").default("NULL"),
    fail: int("fail").default("NULL"),
    combo: int("combo").default("NULL"),
    dateScored: timestamp("date_scored", { mode: "string" }).default(
      "current_timestamp()"
    ),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const cxbProfile = mysqlTable(
  "cxb_profile",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    version: int("version").notNull(),
    index: int("index").notNull(),
    data: longtext("data").notNull(),
  },
  (table) => {
    return {
      cxbProfileUk: unique("cxb_profile_uk").on(table.user, table.index),
    };
  }
);

export const cxbRanking = mysqlTable(
  "cxb_ranking",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    revId: int("rev_id").default("NULL"),
    songId: int("song_id").default("NULL"),
    score: int("score").default("NULL"),
    clear: int("clear").default("NULL"),
  },
  (table) => {
    return {
      cxbRankingUk: unique("cxb_ranking_uk").on(table.user, table.revId),
    };
  }
);

export const cxbRevEnergy = mysqlTable(
  "cxb_rev_energy",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    energy: int("energy").default(0).notNull(),
  },
  (table) => {
    return {
      cxbRevEnergyUk: unique("cxb_rev_energy_uk").on(table.user),
    };
  }
);

export const cxbScore = mysqlTable(
  "cxb_score",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    gameVersion: int("game_version").default("NULL"),
    songMcode: varchar("song_mcode", { length: 7 }).default("NULL"),
    songIndex: int("song_index").default("NULL"),
    data: longtext("data").default("NULL"),
  },
  (table) => {
    return {
      cxbScoreUk: unique("cxb_score_uk").on(
        table.user,
        table.songMcode,
        table.songIndex
      ),
    };
  }
);

export const cxbStaticMusic = mysqlTable(
  "cxb_static_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    songId: varchar("songId", { length: 255 }).default("NULL"),
    index: int("index").default("NULL"),
    chartId: int("chartId").default("NULL"),
    title: varchar("title", { length: 255 }).default("NULL"),
    artist: varchar("artist", { length: 255 }).default("NULL"),
    category: varchar("category", { length: 255 }).default("NULL"),
    level: float("level").default("NULL"),
  },
  (table) => {
    return {
      cxbStaticMusicUk: unique("cxb_static_music_uk").on(
        table.version,
        table.songId,
        table.chartId,
        table.index
      ),
    };
  }
);

export const divaPlaylog = mysqlTable(
  "diva_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    version: int("version").default("NULL"),
    pvId: int("pv_id").default("NULL"),
    difficulty: int("difficulty").default("NULL"),
    edition: int("edition").default("NULL"),
    score: int("score").default("NULL"),
    atnPnt: int("atn_pnt").default("NULL"),
    clrKind: int("clr_kind").default("NULL"),
    sortKind: int("sort_kind").default("NULL"),
    cool: int("cool").default("NULL"),
    fine: int("fine").default("NULL"),
    safe: int("safe").default("NULL"),
    sad: int("sad").default("NULL"),
    worst: int("worst").default("NULL"),
    maxCombo: int("max_combo").default("NULL"),
    dateScored: timestamp("date_scored", { mode: "string" }).default(
      "current_timestamp()"
    ),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const divaProfile = mysqlTable(
  "diva_profile",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    playerName: varchar("player_name", { length: 10 }).notNull(),
    lvStr: varchar("lv_str", { length: 24 }).default("Dab on em").notNull(),
    lvNum: int("lv_num").default(0).notNull(),
    lvPnt: int("lv_pnt").default(0).notNull(),
    vcldPts: int("vcld_pts").default(0).notNull(),
    hpVol: int("hp_vol").default(100).notNull(),
    btnSeVol: int("btn_se_vol").default(100).notNull(),
    btnSeVol2: int("btn_se_vol2").default(100).notNull(),
    sldrSeVol2: int("sldr_se_vol2").default(100).notNull(),
    sortKind: int("sort_kind").default(2).notNull(),
    usePvMdlEqp: tinyint("use_pv_mdl_eqp").default(1).notNull(),
    useMdlPri: tinyint("use_mdl_pri").default(0).notNull(),
    usePvSknEqp: tinyint("use_pv_skn_eqp").default(0).notNull(),
    usePvBtnSeEqp: tinyint("use_pv_btn_se_eqp").default(1).notNull(),
    usePvSldSeEqp: tinyint("use_pv_sld_se_eqp").default(0).notNull(),
    usePvChnSldSeEqp: tinyint("use_pv_chn_sld_se_eqp").default(0).notNull(),
    usePvSldrTchSeEqp: tinyint("use_pv_sldr_tch_se_eqp").default(0).notNull(),
    btnSeEqp: int("btn_se_eqp").default(-1).notNull(),
    sldSeEqp: int("sld_se_eqp").default(-1).notNull(),
    chnSldSeEqp: int("chn_sld_se_eqp").default(-1).notNull(),
    sldrTchSeEqp: int("sldr_tch_se_eqp").default(-1).notNull(),
    nxtPvId: int("nxt_pv_id").default(708).notNull(),
    nxtDffclty: int("nxt_dffclty").default(2).notNull(),
    nxtEdtn: int("nxt_edtn").default(0).notNull(),
    cnpCid: int("cnp_cid").default(-1).notNull(),
    cnpVal: int("cnp_val").default(-1).notNull(),
    cnpRr: int("cnp_rr").default(-1).notNull(),
    cnpSp: varchar("cnp_sp", { length: 255 }).default("").notNull(),
    dspClrBrdr: int("dsp_clr_brdr").default(7).notNull(),
    dspIntrmRnk: int("dsp_intrm_rnk").default(1).notNull(),
    dspClrSts: int("dsp_clr_sts").default(1).notNull(),
    rgoSts: int("rgo_sts").default(1).notNull(),
    lvEfctId: int("lv_efct_id").default(0).notNull(),
    lvPltId: int("lv_plt_id").default(1).notNull(),
    sknEqp: int("skn_eqp").default(0).notNull(),
    passwdStat: int("passwd_stat").default(0).notNull(),
    passwd: varchar("passwd", { length: 12 }).default("**********").notNull(),
    myQstId: varchar("my_qst_id", { length: 128 }).default(
      "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1"
    ),
    myQstSts: varchar("my_qst_sts", { length: 128 }).default(
      "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1"
    ),
  },
  (table) => {
    return {
      divaProfileUk: unique("diva_profile_uk").on(table.user, table.version),
    };
  }
);

export const divaProfileCustomizeItem = mysqlTable(
  "diva_profile_customize_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    itemId: int("item_id").notNull(),
  },
  (table) => {
    return {
      divaProfileCustomizeItemUk: unique("diva_profile_customize_item_uk").on(
        table.user,
        table.version,
        table.itemId
      ),
    };
  }
);

export const divaProfileModule = mysqlTable(
  "diva_profile_module",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    moduleId: int("module_id").notNull(),
  },
  (table) => {
    return {
      divaProfileModuleUk: unique("diva_profile_module_uk").on(
        table.user,
        table.version,
        table.moduleId
      ),
    };
  }
);

export const divaProfilePvCustomize = mysqlTable(
  "diva_profile_pv_customize",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    pvId: int("pv_id").notNull(),
    mdlEqpAry: varchar("mdl_eqp_ary", { length: 14 }).default("-999,-999,-999"),
    cItmEqpAry: varchar("c_itm_eqp_ary", { length: 59 }).default(
      "-999,-999,-999,-999,-999,-999,-999,-999,-999,-999,-999,-999"
    ),
    msItmFlgAry: varchar("ms_itm_flg_ary", { length: 59 }).default(
      "-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1"
    ),
    skin: int("skin").default(-1),
    btnSe: int("btn_se").default(-1),
    sldSe: int("sld_se").default(-1),
    chsldSe: int("chsld_se").default(-1),
    sldtchSe: int("sldtch_se").default(-1),
  },
  (table) => {
    return {
      divaProfilePvCustomizeUk: unique("diva_profile_pv_customize_uk").on(
        table.user,
        table.version,
        table.pvId
      ),
    };
  }
);

export const divaProfileShop = mysqlTable(
  "diva_profile_shop",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    mdlEqpAry: varchar("mdl_eqp_ary", { length: 32 }).default("NULL"),
    cItmEqpAry: varchar("c_itm_eqp_ary", { length: 59 }).default("NULL"),
    msItmFlgAry: varchar("ms_itm_flg_ary", { length: 59 }).default("NULL"),
  },
  (table) => {
    return {
      divaProfileShopUk: unique("diva_profile_shop_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const divaScore = mysqlTable(
  "diva_score",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "restrict",
      }),
    version: int("version").default("NULL"),
    pvId: int("pv_id").default("NULL"),
    difficulty: int("difficulty").default("NULL"),
    edition: int("edition").default("NULL"),
    score: int("score").default("NULL"),
    atnPnt: int("atn_pnt").default("NULL"),
    clrKind: int("clr_kind").default("NULL"),
    sortKind: int("sort_kind").default("NULL"),
    cool: int("cool").default("NULL"),
    fine: int("fine").default("NULL"),
    safe: int("safe").default("NULL"),
    sad: int("sad").default("NULL"),
    worst: int("worst").default("NULL"),
    maxCombo: int("max_combo").default("NULL"),
  },
  (table) => {
    return {
      divaScoreUk: unique("diva_score_uk").on(
        table.user,
        table.pvId,
        table.difficulty,
        table.edition
      ),
    };
  }
);

export const divaStaticItems = mysqlTable(
  "diva_static_items",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    itemId: int("itemId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    type: int("type").default("NULL"),
    points: int("points").default("NULL"),
    unknown0: int("unknown_0").default("NULL"),
    startDate: varchar("start_date", { length: 255 }).default("NULL"),
    endDate: varchar("end_date", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      divaStaticItemsUk: unique("diva_static_items_uk").on(
        table.version,
        table.itemId
      ),
    };
  }
);

export const divaStaticMusic = mysqlTable(
  "diva_static_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    songId: int("songId").default("NULL"),
    chartId: int("chartId").default("NULL"),
    title: varchar("title", { length: 255 }).default("NULL"),
    vocaloidArranger: varchar("vocaloid_arranger", { length: 255 }).default(
      "NULL"
    ),
    pvIllustrator: varchar("pv_illustrator", { length: 255 }).default("NULL"),
    lyrics: varchar("lyrics", { length: 255 }).default("NULL"),
    bgMusic: varchar("bg_music", { length: 255 }).default("NULL"),
    level: float("level").default("NULL"),
    bpm: int("bpm").default("NULL"),
    date: varchar("date", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      divaStaticMusicUk: unique("diva_static_music_uk").on(
        table.version,
        table.songId,
        table.chartId
      ),
    };
  }
);

export const divaStaticQuests = mysqlTable(
  "diva_static_quests",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    questId: int("questId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    questEnable: tinyint("quest_enable").default(1),
    kind: int("kind").default("NULL"),
    unknown0: int("unknown_0").default("NULL"),
    unknown1: int("unknown_1").default("NULL"),
    unknown2: int("unknown_2").default("NULL"),
    questOrder: int("quest_order").default("NULL"),
    startDatetime: varchar("start_datetime", { length: 255 }).default("NULL"),
    endDatetime: varchar("end_datetime", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      divaStaticQuestsUk: unique("diva_static_quests_uk").on(
        table.version,
        table.questId
      ),
    };
  }
);

export const divaStaticShop = mysqlTable(
  "diva_static_shop",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    shopId: int("shopId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    type: int("type").default("NULL"),
    points: int("points").default("NULL"),
    unknown0: int("unknown_0").default("NULL"),
    startDate: varchar("start_date", { length: 255 }).default("NULL"),
    endDate: varchar("end_date", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      divaStaticShopUk: unique("diva_static_shop_uk").on(
        table.version,
        table.shopId
      ),
    };
  }
);

export const eventLog = mysqlTable("event_log", {
  id: int("id").autoincrement().notNull(),
  system: varchar("system", { length: 255 }).notNull(),
  type: varchar("type", { length: 255 }).notNull(),
  severity: int("severity").notNull(),
  message: varchar("message", { length: 1000 }).notNull(),
  details: longtext("details").notNull(),
  whenLogged: timestamp("when_logged", { mode: "string" })
    .default("current_timestamp()")
    .notNull(),
});

export const idacProfile = mysqlTable(
  "idac_profile",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    username: varchar("username", { length: 8 }).default("NULL"),
    country: int("country").default("NULL"),
    store: int("store").default("NULL"),
    teamId: int("team_id").default(0),
    totalPlay: int("total_play").default(0),
    dailyPlay: int("daily_play").default(0),
    dayPlay: int("day_play").default(0),
    mileage: int("mileage").default(0),
    assetVersion: int("asset_version").default(1),
    lastPlayDate: timestamp("last_play_date", { mode: "string" }).default(
      "current_timestamp()"
    ),
    mytitleId: int("mytitle_id").default(0),
    mytitleEfffectId: int("mytitle_efffect_id").default(0),
    stickerId: int("sticker_id").default(0),
    stickerEffectId: int("sticker_effect_id").default(0),
    papercupId: int("papercup_id").default(0),
    tachometerId: int("tachometer_id").default(0),
    auraId: int("aura_id").default(0),
    auraColorId: int("aura_color_id").default(0),
    auraLineId: int("aura_line_id").default(0),
    bgmId: int("bgm_id").default(0),
    keyholderId: int("keyholder_id").default(0),
    startMenuBgId: int("start_menu_bg_id").default(0),
    useCarId: int("use_car_id").default(1),
    useStyleCarId: int("use_style_car_id").default(1),
    bothwinCount: int("bothwin_count").default(0),
    bothwinScore: int("bothwin_score").default(0),
    subcardCount: int("subcard_count").default(0),
    vsHistory: int("vs_history").default(0),
    stampKeyAssign0: int("stamp_key_assign_0").default("NULL"),
    stampKeyAssign1: int("stamp_key_assign_1").default("NULL"),
    stampKeyAssign2: int("stamp_key_assign_2").default("NULL"),
    stampKeyAssign3: int("stamp_key_assign_3").default("NULL"),
    nameChangeCategory: int("name_change_category").default(0),
    factoryDisp: int("factory_disp").default(0),
    createDate: timestamp("create_date", { mode: "string" }).default(
      "current_timestamp()"
    ),
    cash: int("cash").default(0),
    dressupPoint: int("dressup_point").default(0),
    avatarPoint: int("avatar_point").default(0),
    totalCash: int("total_cash").default(0),
  },
  (table) => {
    return {
      idacProfileUk: unique("idac_profile_uk").on(table.user, table.version),
    };
  }
);

export const idacProfileAvatar = mysqlTable(
  "idac_profile_avatar",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sex: int("sex").default("NULL"),
    face: int("face").default("NULL"),
    eye: int("eye").default("NULL"),
    mouth: int("mouth").default("NULL"),
    hair: int("hair").default("NULL"),
    glasses: int("glasses").default("NULL"),
    faceAccessory: int("face_accessory").default("NULL"),
    body: int("body").default("NULL"),
    bodyAccessory: int("body_accessory").default("NULL"),
    behind: int("behind").default("NULL"),
    bg: int("bg").default("NULL"),
    effect: int("effect").default("NULL"),
    special: int("special").default("NULL"),
  },
  (table) => {
    return {
      idacProfileAvatarUk: unique("idac_profile_avatar_uk").on(table.user),
    };
  }
);

export const idacProfileConfig = mysqlTable(
  "idac_profile_config",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    configId: int("config_id").default("NULL"),
    steeringIntensity: int("steering_intensity").default("NULL"),
    transmissionType: int("transmission_type").default("NULL"),
    defaultViewpoint: int("default_viewpoint").default("NULL"),
    favoriteBgm: int("favorite_bgm").default("NULL"),
    bgmVolume: int("bgm_volume").default("NULL"),
    seVolume: int("se_volume").default("NULL"),
    masterVolume: int("master_volume").default("NULL"),
    storeBattlePolicy: int("store_battle_policy").default("NULL"),
    battleOnomatopeDisplay: int("battle_onomatope_display").default("NULL"),
    corneringGuide: int("cornering_guide").default("NULL"),
    minimap: int("minimap").default("NULL"),
    lineGuide: int("line_guide").default("NULL"),
    ghost: int("ghost").default("NULL"),
    raceExit: int("race_exit").default("NULL"),
    resultSkip: int("result_skip").default("NULL"),
    stampSelectSkip: int("stamp_select_skip").default("NULL"),
  },
  (table) => {
    return {
      idacProfileConfigUk: unique("idac_profile_config_uk").on(table.user),
    };
  }
);

export const idacProfileRank = mysqlTable(
  "idac_profile_rank",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    storyRankExp: int("story_rank_exp").default(0),
    storyRank: int("story_rank").default(1),
    timeTrialRankExp: int("time_trial_rank_exp").default(0),
    timeTrialRank: int("time_trial_rank").default(1),
    onlineBattleRankExp: int("online_battle_rank_exp").default(0),
    onlineBattleRank: int("online_battle_rank").default(1),
    storeBattleRankExp: int("store_battle_rank_exp").default(0),
    storeBattleRank: int("store_battle_rank").default(1),
    theoryExp: int("theory_exp").default(0),
    theoryRank: int("theory_rank").default(1),
    prideGroupId: int("pride_group_id").default(0),
    pridePoint: int("pride_point").default(0),
    gradeExp: int("grade_exp").default(0),
    grade: int("grade").default(1),
    gradeRewardDist: int("grade_reward_dist").default(0),
    storyRankRewardDist: int("story_rank_reward_dist").default(0),
    timeTrialRankRewardDist: int("time_trial_rank_reward_dist").default(0),
    onlineBattleRankRewardDist: int("online_battle_rank_reward_dist").default(
      0
    ),
    storeBattleRankRewardDist: int("store_battle_rank_reward_dist").default(0),
    theoryRankRewardDist: int("theory_rank_reward_dist").default(0),
    maxAttainedOnlineBattleRank: int("max_attained_online_battle_rank").default(
      1
    ),
    maxAttainedPridePoint: int("max_attained_pride_point").default(0),
    isLastMax: int("is_last_max").default(0),
  },
  (table) => {
    return {
      idacProfileRankUk: unique("idac_profile_rank_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const idacProfileStock = mysqlTable(
  "idac_profile_stock",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    mytitleList: varchar("mytitle_list", { length: 1024 }).default(""),
    mytitleNewList: varchar("mytitle_new_list", { length: 1024 }).default(""),
    avatarFaceList: varchar("avatar_face_list", { length: 255 }).default(""),
    avatarFaceNewList: varchar("avatar_face_new_list", { length: 255 }).default(
      ""
    ),
    avatarEyeList: varchar("avatar_eye_list", { length: 255 }).default(""),
    avatarEyeNewList: varchar("avatar_eye_new_list", { length: 255 }).default(
      ""
    ),
    avatarHairList: varchar("avatar_hair_list", { length: 255 }).default(""),
    avatarHairNewList: varchar("avatar_hair_new_list", { length: 255 }).default(
      ""
    ),
    avatarBodyList: varchar("avatar_body_list", { length: 255 }).default(""),
    avatarBodyNewList: varchar("avatar_body_new_list", { length: 255 }).default(
      ""
    ),
    avatarMouthList: varchar("avatar_mouth_list", { length: 255 }).default(""),
    avatarMouthNewList: varchar("avatar_mouth_new_list", {
      length: 255,
    }).default(""),
    avatarGlassesList: varchar("avatar_glasses_list", { length: 255 }).default(
      ""
    ),
    avatarGlassesNewList: varchar("avatar_glasses_new_list", {
      length: 255,
    }).default(""),
    avatarFaceAccessoryList: varchar("avatar_face_accessory_list", {
      length: 255,
    }).default(""),
    avatarFaceAccessoryNewList: varchar("avatar_face_accessory_new_list", {
      length: 255,
    }).default(""),
    avatarBodyAccessoryList: varchar("avatar_body_accessory_list", {
      length: 255,
    }).default(""),
    avatarBodyAccessoryNewList: varchar("avatar_body_accessory_new_list", {
      length: 255,
    }).default(""),
    avatarBehindList: varchar("avatar_behind_list", { length: 255 }).default(
      ""
    ),
    avatarBehindNewList: varchar("avatar_behind_new_list", {
      length: 255,
    }).default(""),
    avatarBgList: varchar("avatar_bg_list", { length: 255 }).default(""),
    avatarBgNewList: varchar("avatar_bg_new_list", { length: 255 }).default(""),
    avatarEffectList: varchar("avatar_effect_list", { length: 255 }).default(
      ""
    ),
    avatarEffectNewList: varchar("avatar_effect_new_list", {
      length: 255,
    }).default(""),
    avatarSpecialList: varchar("avatar_special_list", { length: 255 }).default(
      ""
    ),
    avatarSpecialNewList: varchar("avatar_special_new_list", {
      length: 255,
    }).default(""),
    stampList: varchar("stamp_list", { length: 255 }).default(""),
    stampNewList: varchar("stamp_new_list", { length: 255 }).default(""),
    keyholderList: varchar("keyholder_list", { length: 256 }).default(""),
    keyholderNewList: varchar("keyholder_new_list", { length: 256 }).default(
      ""
    ),
    papercupList: varchar("papercup_list", { length: 255 }).default(""),
    papercupNewList: varchar("papercup_new_list", { length: 255 }).default(""),
    tachometerList: varchar("tachometer_list", { length: 255 }).default(""),
    tachometerNewList: varchar("tachometer_new_list", { length: 255 }).default(
      ""
    ),
    auraList: varchar("aura_list", { length: 255 }).default(""),
    auraNewList: varchar("aura_new_list", { length: 255 }).default(""),
    auraColorList: varchar("aura_color_list", { length: 255 }).default(""),
    auraColorNewList: varchar("aura_color_new_list", { length: 255 }).default(
      ""
    ),
    auraLineList: varchar("aura_line_list", { length: 255 }).default(""),
    auraLineNewList: varchar("aura_line_new_list", { length: 255 }).default(""),
    bgmList: varchar("bgm_list", { length: 255 }).default(""),
    bgmNewList: varchar("bgm_new_list", { length: 255 }).default(""),
    dxColorList: varchar("dx_color_list", { length: 255 }).default(""),
    dxColorNewList: varchar("dx_color_new_list", { length: 255 }).default(""),
    startMenuBgList: varchar("start_menu_bg_list", { length: 255 }).default(""),
    startMenuBgNewList: varchar("start_menu_bg_new_list", {
      length: 255,
    }).default(""),
    underNeonList: varchar("under_neon_list", { length: 255 }).default(""),
  },
  (table) => {
    return {
      idacProfileStockUk: unique("idac_profile_stock_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const idacProfileTheory = mysqlTable(
  "idac_profile_theory",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    playCount: int("play_count").default(0),
    playCountMulti: int("play_count_multi").default(0),
    partnerId: int("partner_id").default("NULL"),
    partnerProgress: int("partner_progress").default("NULL"),
    partnerProgressScore: int("partner_progress_score").default("NULL"),
    practiceStartRank: int("practice_start_rank").default(0),
    generalFlag: int("general_flag").default(0),
    vsHistory: int("vs_history").default(0),
    vsHistoryMulti: int("vs_history_multi").default(0),
    winCount: int("win_count").default(0),
    winCountMulti: int("win_count_multi").default(0),
  },
  (table) => {
    return {
      idacProfileTheoryUk: unique("idac_profile_theory_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const idacUserCar = mysqlTable(
  "idac_user_car",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    carId: int("car_id").default("NULL"),
    styleCarId: int("style_car_id").default("NULL"),
    color: int("color").default("NULL"),
    bureau: int("bureau").default("NULL"),
    kana: int("kana").default("NULL"),
    sNo: int("s_no").default("NULL"),
    lNo: int("l_no").default("NULL"),
    carFlag: int("car_flag").default("NULL"),
    tunePoint: int("tune_point").default("NULL"),
    tuneLevel: int("tune_level").default(1),
    tuneParts: int("tune_parts").default("NULL"),
    infinityTune: int("infinity_tune").default(0),
    onlineVsWin: int("online_vs_win").default(0),
    pickupSeq: int("pickup_seq").default(1),
    purchaseSeq: int("purchase_seq").default(1),
    colorStockList: varchar("color_stock_list", { length: 32 }).default("NULL"),
    colorStockNewList: varchar("color_stock_new_list", { length: 32 }).default(
      "NULL"
    ),
    partsStockList: varchar("parts_stock_list", { length: 48 }).default("NULL"),
    partsStockNewList: varchar("parts_stock_new_list", { length: 48 }).default(
      "NULL"
    ),
    partsSetEquipList: varchar("parts_set_equip_list", { length: 48 }).default(
      "NULL"
    ),
    partsList: longtext("parts_list").default("NULL"),
    equipPartsCount: int("equip_parts_count").default(0),
    totalCarPartsCount: int("total_car_parts_count").default(0),
    useCount: int("use_count").default(0),
    storyUseCount: int("story_use_count").default(0),
    timetrialUseCount: int("timetrial_use_count").default(0),
    vsUseCount: int("vs_use_count").default(0),
    netVsUseCount: int("net_vs_use_count").default(0),
    theoryUseCount: int("theory_use_count").default(0),
    carMileage: int("car_mileage").default(0),
  },
  (table) => {
    return {
      idacUserCarUk: unique("idac_user_car_uk").on(
        table.user,
        table.version,
        table.styleCarId
      ),
    };
  }
);

export const idacUserChallenge = mysqlTable(
  "idac_user_challenge",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    vsType: int("vs_type").default("NULL"),
    playDifficulty: int("play_difficulty").default("NULL"),
    clearedDifficulty: int("cleared_difficulty").default("NULL"),
    storyType: int("story_type").default("NULL"),
    playCount: int("play_count").default(1),
    weakDifficulty: int("weak_difficulty").default(0),
    evalId: int("eval_id").default("NULL"),
    advantage: int("advantage").default("NULL"),
    sec1AdvantageAvg: int("sec1_advantage_avg").default("NULL"),
    sec2AdvantageAvg: int("sec2_advantage_avg").default("NULL"),
    sec3AdvantageAvg: int("sec3_advantage_avg").default("NULL"),
    sec4AdvantageAvg: int("sec4_advantage_avg").default("NULL"),
    nearbyAdvantageRate: int("nearby_advantage_rate").default("NULL"),
    winFlag: int("win_flag").default("NULL"),
    result: int("result").default("NULL"),
    record: int("record").default("NULL"),
    courseId: int("course_id").default("NULL"),
    lastPlayCourseId: int("last_play_course_id").default("NULL"),
    styleCarId: int("style_car_id").default("NULL"),
    courseDay: int("course_day").default("NULL"),
  },
  (table) => {
    return {
      idacUserChallengeUk: unique("idac_user_challenge_uk").on(
        table.user,
        table.vsType,
        table.playDifficulty
      ),
    };
  }
);

export const idacUserCourse = mysqlTable(
  "idac_user_course",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    courseId: int("course_id").default("NULL"),
    runCounts: int("run_counts").default(1),
    skillLevelExp: int("skill_level_exp").default(0),
  },
  (table) => {
    return {
      idacUserCourseUk: unique("idac_user_course_uk").on(
        table.user,
        table.courseId
      ),
    };
  }
);

export const idacUserStamp = mysqlTable(
  "idac_user_stamp",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    mStampEventId: int("m_stamp_event_id").default("NULL"),
    selectFlag: int("select_flag").default("NULL"),
    stampMasu: int("stamp_masu").default("NULL"),
    dailyBonus: int("daily_bonus").default("NULL"),
    weeklyBonus: int("weekly_bonus").default("NULL"),
    weekdayBonus: int("weekday_bonus").default("NULL"),
    weekendBonus: int("weekend_bonus").default("NULL"),
    totalBonus: int("total_bonus").default("NULL"),
    dayTotalBonus: int("day_total_bonus").default("NULL"),
    storeBattleBonus: int("store_battle_bonus").default("NULL"),
    storyBonus: int("story_bonus").default("NULL"),
    onlineBattleBonus: int("online_battle_bonus").default("NULL"),
    timetrialBonus: int("timetrial_bonus").default("NULL"),
    fasteststreetlegaltheoryBonus: int(
      "fasteststreetlegaltheory_bonus"
    ).default("NULL"),
    collaborationBonus: int("collaboration_bonus").default("NULL"),
    addBonusDailyFlag1: int("add_bonus_daily_flag_1").default("NULL"),
    addBonusDailyFlag2: int("add_bonus_daily_flag_2").default("NULL"),
    addBonusDailyFlag3: int("add_bonus_daily_flag_3").default("NULL"),
    createDateDaily: timestamp("create_date_daily", { mode: "string" }).default(
      "current_timestamp()"
    ),
    createDateWeekly: timestamp("create_date_weekly", {
      mode: "string",
    }).default("current_timestamp()"),
  },
  (table) => {
    return {
      idacUserStampUk: unique("idac_user_stamp_uk").on(
        table.user,
        table.mStampEventId
      ),
    };
  }
);

export const idacUserStory = mysqlTable(
  "idac_user_story",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    storyType: int("story_type").default("NULL"),
    chapter: int("chapter").default("NULL"),
    loopCount: int("loop_count").default(1),
  },
  (table) => {
    return {
      idacUserStoryUk: unique("idac_user_story_uk").on(
        table.user,
        table.chapter
      ),
    };
  }
);

export const idacUserStoryEpisode = mysqlTable(
  "idac_user_story_episode",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chapter: int("chapter").default("NULL"),
    episode: int("episode").default("NULL"),
    playStatus: int("play_status").default("NULL"),
  },
  (table) => {
    return {
      idacUserStoryEpisodeUk: unique("idac_user_story_episode_uk").on(
        table.user,
        table.chapter,
        table.episode
      ),
    };
  }
);

export const idacUserStoryEpisodeDifficulty = mysqlTable(
  "idac_user_story_episode_difficulty",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    episode: int("episode").default("NULL"),
    difficulty: int("difficulty").default("NULL"),
    playCount: int("play_count").default("NULL"),
    clearCount: int("clear_count").default("NULL"),
    playStatus: int("play_status").default("NULL"),
    playScore: int("play_score").default("NULL"),
  },
  (table) => {
    return {
      idacUserStoryEpisodeDifficultyUk: unique(
        "idac_user_story_episode_difficulty_uk"
      ).on(table.user, table.episode, table.difficulty),
    };
  }
);

export const idacUserTheoryCourse = mysqlTable(
  "idac_user_theory_course",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    courseId: int("course_id").default("NULL"),
    maxVictoryGrade: int("max_victory_grade").default(0),
    runCount: int("run_count").default(1),
    powerhouseLv: int("powerhouse_lv").default("NULL"),
    powerhouseExp: int("powerhouse_exp").default("NULL"),
    playedPowerhouseLv: int("played_powerhouse_lv").default("NULL"),
    updateDt: timestamp("update_dt", { mode: "string" }).default(
      "current_timestamp()"
    ),
  },
  (table) => {
    return {
      idacUserTheoryCourseUk: unique("idac_user_theory_course_uk").on(
        table.user,
        table.courseId
      ),
    };
  }
);

export const idacUserTheoryPartner = mysqlTable(
  "idac_user_theory_partner",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    partnerId: int("partner_id").default("NULL"),
    fellowshipLv: int("fellowship_lv").default("NULL"),
    fellowshipExp: int("fellowship_exp").default("NULL"),
  },
  (table) => {
    return {
      idacUserTheoryPartnerUk: unique("idac_user_theory_partner_uk").on(
        table.user,
        table.partnerId
      ),
    };
  }
);

export const idacUserTheoryRunning = mysqlTable(
  "idac_user_theory_running",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    courseId: int("course_id").default("NULL"),
    attack: int("attack").default("NULL"),
    defense: int("defense").default("NULL"),
    safety: int("safety").default("NULL"),
    runaway: int("runaway").default("NULL"),
    trickFlag: int("trick_flag").default("NULL"),
  },
  (table) => {
    return {
      idacUserTheoryRunningUk: unique("idac_user_theory_running_uk").on(
        table.user,
        table.courseId
      ),
    };
  }
);

export const idacUserTicket = mysqlTable(
  "idac_user_ticket",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ticketId: int("ticket_id").default("NULL"),
    ticketCnt: int("ticket_cnt").default("NULL"),
  },
  (table) => {
    return {
      idacUserTicketUk: unique("idac_user_ticket_uk").on(
        table.user,
        table.ticketId
      ),
    };
  }
);

export const idacUserTimetrialEvent = mysqlTable(
  "idac_user_timetrial_event",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    timetrialEventId: int("timetrial_event_id").default("NULL"),
    point: int("point").default("NULL"),
  },
  (table) => {
    return {
      idacUserTimetrialEventUk: unique("idac_user_timetrial_event_uk").on(
        table.user,
        table.timetrialEventId
      ),
    };
  }
);

export const idacUserTimeTrial = mysqlTable(
  "idac_user_time_trial",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    styleCarId: int("style_car_id").default("NULL"),
    courseId: int("course_id").default("NULL"),
    evalId: int("eval_id").default(0),
    goalTime: int("goal_time").default("NULL"),
    sectionTime1: int("section_time_1").default("NULL"),
    sectionTime2: int("section_time_2").default("NULL"),
    sectionTime3: int("section_time_3").default("NULL"),
    sectionTime4: int("section_time_4").default("NULL"),
    mission: int("mission").default("NULL"),
    playDt: timestamp("play_dt", { mode: "string" }).default(
      "current_timestamp()"
    ),
  },
  (table) => {
    return {
      idacUserTimeTrialUk: unique("idac_user_time_trial_uk").on(
        table.user,
        table.version,
        table.courseId,
        table.styleCarId
      ),
    };
  }
);

export const idacUserVsInfo = mysqlTable(
  "idac_user_vs_info",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    groupKey: varchar("group_key", { length: 25 }).default("NULL"),
    winFlg: int("win_flg").default("NULL"),
    styleCarId: int("style_car_id").default("NULL"),
    courseId: int("course_id").default("NULL"),
    courseDay: int("course_day").default("NULL"),
    playersNum: int("players_num").default("NULL"),
    winning: int("winning").default("NULL"),
    advantage1: int("advantage_1").default("NULL"),
    advantage2: int("advantage_2").default("NULL"),
    advantage3: int("advantage_3").default("NULL"),
    advantage4: int("advantage_4").default("NULL"),
    selectCourseId: int("select_course_id").default("NULL"),
    selectCourseDay: int("select_course_day").default("NULL"),
    selectCourseRandom: int("select_course_random").default("NULL"),
    matchingSuccessSec: int("matching_success_sec").default("NULL"),
    boostFlag: int("boost_flag").default("NULL"),
    vsHistory: int("vs_history").default("NULL"),
    breakCount: int("break_count").default("NULL"),
    breakPenaltyFlag: int("break_penalty_flag").default("NULL"),
  },
  (table) => {
    return {
      idacUserVsInfoUk: unique("idac_user_vs_info_uk").on(
        table.user,
        table.groupKey
      ),
    };
  }
);

export const machine = mysqlTable(
  "machine",
  {
    id: int("id").autoincrement().notNull(),
    arcade: int("arcade")
      .notNull()
      .references(() => arcade.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    serial: varchar("serial", { length: 15 }).notNull(),
    board: varchar("board", { length: 15 }).default("NULL"),
    game: varchar("game", { length: 4 }).default("NULL"),
    country: varchar("country", { length: 3 }).default("NULL"),
    timezone: varchar("timezone", { length: 255 }).default("NULL"),
    otaEnable: tinyint("ota_enable").default("NULL"),
    memo: varchar("memo", { length: 255 }).default("NULL"),
    isCab: tinyint("is_cab").default("NULL"),
    data: longtext("data").default("NULL"),
  },
  (table) => {
    return {
      arcade: index("arcade").on(table.arcade),
    };
  }
);

export const mai2ItemCard = mysqlTable(
  "mai2_item_card",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    cardId: int("cardId").default("NULL"),
    cardTypeId: int("cardTypeId").default("NULL"),
    charaId: int("charaId").default("NULL"),
    mapId: int("mapId").default("NULL"),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "current_timestamp()"
    ),
    endDate: timestamp("endDate", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      mai2ItemCardUk: unique("mai2_item_card_uk").on(
        table.user,
        table.cardId,
        table.cardTypeId
      ),
    };
  }
);

export const mai2ItemCharacter = mysqlTable(
  "mai2_item_character",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    characterId: int("characterId").default("NULL"),
    level: int("level").default("NULL"),
    awakening: int("awakening").default("NULL"),
    useCount: int("useCount").default("NULL"),
    point: int("point").default("NULL"),
  },
  (table) => {
    return {
      mai2ItemCharacterUk: unique("mai2_item_character_uk").on(
        table.user,
        table.characterId
      ),
    };
  }
);

export const mai2ItemCharge = mysqlTable(
  "mai2_item_charge",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chargeId: int("chargeId").default("NULL"),
    stock: int("stock").default("NULL"),
    purchaseDate: varchar("purchaseDate", { length: 255 }).default("NULL"),
    validDate: varchar("validDate", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      mai2ItemChargeUk: unique("mai2_item_charge_uk").on(
        table.user,
        table.chargeId
      ),
    };
  }
);

export const mai2ItemFavorite = mysqlTable(
  "mai2_item_favorite",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemKind: int("itemKind").default("NULL"),
    itemIdList: longtext("itemIdList").default("NULL"),
  },
  (table) => {
    return {
      mai2ItemFavoriteUk: unique("mai2_item_favorite_uk").on(
        table.user,
        table.itemKind
      ),
    };
  }
);

export const mai2ItemFriendSeasonRanking = mysqlTable(
  "mai2_item_friend_season_ranking",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    seasonId: int("seasonId").default("NULL"),
    point: int("point").default("NULL"),
    rank: int("rank").default("NULL"),
    rewardGet: tinyint("rewardGet").default("NULL"),
    userName: varchar("userName", { length: 8 }).default("NULL"),
    recordDate: timestamp("recordDate", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      mai2ItemFriendSeasonRankingUk: unique(
        "mai2_item_friend_season_ranking_uk"
      ).on(table.user, table.seasonId, table.userName),
    };
  }
);

export const mai2ItemItem = mysqlTable(
  "mai2_item_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemId: int("itemId").default("NULL"),
    itemKind: int("itemKind").default("NULL"),
    stock: int("stock").default("NULL"),
    isValid: tinyint("isValid").default("NULL"),
  },
  (table) => {
    return {
      mai2ItemItemUk: unique("mai2_item_item_uk").on(
        table.user,
        table.itemId,
        table.itemKind
      ),
    };
  }
);

export const mai2ItemLoginBonus = mysqlTable(
  "mai2_item_login_bonus",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    bonusId: int("bonusId").default("NULL"),
    point: int("point").default("NULL"),
    isCurrent: tinyint("isCurrent").default("NULL"),
    isComplete: tinyint("isComplete").default("NULL"),
  },
  (table) => {
    return {
      mai2ItemLoginBonusUk: unique("mai2_item_login_bonus_uk").on(
        table.user,
        table.bonusId
      ),
    };
  }
);

export const mai2ItemMap = mysqlTable(
  "mai2_item_map",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    mapId: int("mapId").default("NULL"),
    distance: int("distance").default("NULL"),
    isLock: tinyint("isLock").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    isComplete: tinyint("isComplete").default("NULL"),
  },
  (table) => {
    return {
      mai2ItemMapUk: unique("mai2_item_map_uk").on(table.user, table.mapId),
    };
  }
);

export const mai2ItemPrintDetail = mysqlTable(
  "mai2_item_print_detail",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    orderId: int("orderId").default("NULL"),
    printNumber: int("printNumber").default("NULL"),
    printDate: timestamp("printDate", { mode: "string" }).default(
      "current_timestamp()"
    ),
    serialId: varchar("serialId", { length: 20 }).default("NULL"),
    placeId: int("placeId").default("NULL"),
    clientId: varchar("clientId", { length: 11 }).default("NULL"),
    printerSerialId: varchar("printerSerialId", { length: 20 }).default("NULL"),
    cardRomVersion: int("cardRomVersion").default("NULL"),
    isHolograph: tinyint("isHolograph").default(1),
    printOption1: tinyint("printOption1").default(0),
    printOption2: tinyint("printOption2").default(0),
    printOption3: tinyint("printOption3").default(0),
    printOption4: tinyint("printOption4").default(0),
    printOption5: tinyint("printOption5").default(0),
    printOption6: tinyint("printOption6").default(0),
    printOption7: tinyint("printOption7").default(0),
    printOption8: tinyint("printOption8").default(0),
    printOption9: tinyint("printOption9").default(0),
    printOption10: tinyint("printOption10").default(0),
    created: varchar("created", { length: 255 }).default(""),
  },
  (table) => {
    return {
      mai2ItemPrintDetailUk: unique("mai2_item_print_detail_uk").on(
        table.user,
        table.serialId
      ),
    };
  }
);

export const mai2Playlog = mysqlTable(
  "mai2_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userId: bigint("userId", { mode: "number" }).default("NULL"),
    orderId: int("orderId").default("NULL"),
    playlogId: bigint("playlogId", { mode: "number" }).default("NULL"),
    version: int("version").default("NULL"),
    placeId: int("placeId").default("NULL"),
    placeName: varchar("placeName", { length: 255 }).default("NULL"),
    loginDate: bigint("loginDate", { mode: "number" }).default("NULL"),
    playDate: varchar("playDate", { length: 255 }).default("NULL"),
    userPlayDate: varchar("userPlayDate", { length: 255 }).default("NULL"),
    type: int("type").default("NULL"),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    trackNo: int("trackNo").default("NULL"),
    vsMode: int("vsMode").default("NULL"),
    vsUserName: varchar("vsUserName", { length: 255 }).default("NULL"),
    vsStatus: int("vsStatus").default("NULL"),
    vsUserRating: int("vsUserRating").default("NULL"),
    vsUserAchievement: int("vsUserAchievement").default("NULL"),
    vsUserGradeRank: int("vsUserGradeRank").default("NULL"),
    vsRank: int("vsRank").default("NULL"),
    playerNum: int("playerNum").default("NULL"),
    playedUserId1: bigint("playedUserId1", { mode: "number" }).default("NULL"),
    playedUserName1: varchar("playedUserName1", { length: 255 }).default(
      "NULL"
    ),
    playedMusicLevel1: int("playedMusicLevel1").default("NULL"),
    playedUserId2: bigint("playedUserId2", { mode: "number" }).default("NULL"),
    playedUserName2: varchar("playedUserName2", { length: 255 }).default(
      "NULL"
    ),
    playedMusicLevel2: int("playedMusicLevel2").default("NULL"),
    playedUserId3: bigint("playedUserId3", { mode: "number" }).default("NULL"),
    playedUserName3: varchar("playedUserName3", { length: 255 }).default(
      "NULL"
    ),
    playedMusicLevel3: int("playedMusicLevel3").default("NULL"),
    characterId1: int("characterId1").default("NULL"),
    characterLevel1: int("characterLevel1").default("NULL"),
    characterAwakening1: int("characterAwakening1").default("NULL"),
    characterId2: int("characterId2").default("NULL"),
    characterLevel2: int("characterLevel2").default("NULL"),
    characterAwakening2: int("characterAwakening2").default("NULL"),
    characterId3: int("characterId3").default("NULL"),
    characterLevel3: int("characterLevel3").default("NULL"),
    characterAwakening3: int("characterAwakening3").default("NULL"),
    characterId4: int("characterId4").default("NULL"),
    characterLevel4: int("characterLevel4").default("NULL"),
    characterAwakening4: int("characterAwakening4").default("NULL"),
    characterId5: int("characterId5").default("NULL"),
    characterLevel5: int("characterLevel5").default("NULL"),
    characterAwakening5: int("characterAwakening5").default("NULL"),
    achievement: int("achievement").default("NULL"),
    deluxscore: int("deluxscore").default("NULL"),
    scoreRank: int("scoreRank").default("NULL"),
    maxCombo: int("maxCombo").default("NULL"),
    totalCombo: int("totalCombo").default("NULL"),
    maxSync: int("maxSync").default("NULL"),
    totalSync: int("totalSync").default("NULL"),
    tapCriticalPerfect: int("tapCriticalPerfect").default("NULL"),
    tapPerfect: int("tapPerfect").default("NULL"),
    tapGreat: int("tapGreat").default("NULL"),
    tapGood: int("tapGood").default("NULL"),
    tapMiss: int("tapMiss").default("NULL"),
    holdCriticalPerfect: int("holdCriticalPerfect").default("NULL"),
    holdPerfect: int("holdPerfect").default("NULL"),
    holdGreat: int("holdGreat").default("NULL"),
    holdGood: int("holdGood").default("NULL"),
    holdMiss: int("holdMiss").default("NULL"),
    slideCriticalPerfect: int("slideCriticalPerfect").default("NULL"),
    slidePerfect: int("slidePerfect").default("NULL"),
    slideGreat: int("slideGreat").default("NULL"),
    slideGood: int("slideGood").default("NULL"),
    slideMiss: int("slideMiss").default("NULL"),
    touchCriticalPerfect: int("touchCriticalPerfect").default("NULL"),
    touchPerfect: int("touchPerfect").default("NULL"),
    touchGreat: int("touchGreat").default("NULL"),
    touchGood: int("touchGood").default("NULL"),
    touchMiss: int("touchMiss").default("NULL"),
    breakCriticalPerfect: int("breakCriticalPerfect").default("NULL"),
    breakPerfect: int("breakPerfect").default("NULL"),
    breakGreat: int("breakGreat").default("NULL"),
    breakGood: int("breakGood").default("NULL"),
    breakMiss: int("breakMiss").default("NULL"),
    isTap: tinyint("isTap").default("NULL"),
    isHold: tinyint("isHold").default("NULL"),
    isSlide: tinyint("isSlide").default("NULL"),
    isTouch: tinyint("isTouch").default("NULL"),
    isBreak: tinyint("isBreak").default("NULL"),
    isCriticalDisp: tinyint("isCriticalDisp").default("NULL"),
    isFastLateDisp: tinyint("isFastLateDisp").default("NULL"),
    fastCount: int("fastCount").default("NULL"),
    lateCount: int("lateCount").default("NULL"),
    isAchieveNewRecord: tinyint("isAchieveNewRecord").default("NULL"),
    isDeluxscoreNewRecord: tinyint("isDeluxscoreNewRecord").default("NULL"),
    comboStatus: int("comboStatus").default("NULL"),
    syncStatus: int("syncStatus").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    beforeRating: int("beforeRating").default("NULL"),
    afterRating: int("afterRating").default("NULL"),
    beforeGrade: int("beforeGrade").default("NULL"),
    afterGrade: int("afterGrade").default("NULL"),
    afterGradeRank: int("afterGradeRank").default("NULL"),
    beforeDeluxRating: int("beforeDeluxRating").default("NULL"),
    afterDeluxRating: int("afterDeluxRating").default("NULL"),
    isPlayTutorial: tinyint("isPlayTutorial").default("NULL"),
    isEventMode: tinyint("isEventMode").default("NULL"),
    isFreedomMode: tinyint("isFreedomMode").default("NULL"),
    playMode: int("playMode").default("NULL"),
    isNewFree: tinyint("isNewFree").default("NULL"),
    extNum1: int("extNum1").default("NULL"),
    extNum2: int("extNum2").default("NULL"),
    extNum4: int("extNum4").default(0),
    trialPlayAchievement: int("trialPlayAchievement").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const mai2ProfileActivity = mysqlTable(
  "mai2_profile_activity",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    kind: int("kind").default("NULL"),
    activityId: int("activityId").default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    param3: int("param3").default("NULL"),
    param4: int("param4").default("NULL"),
    sortNumber: int("sortNumber").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileActivityUk: unique("mai2_profile_activity_uk").on(
        table.user,
        table.kind,
        table.activityId
      ),
    };
  }
);

export const mai2ProfileConsecLogins = mysqlTable(
  "mai2_profile_consec_logins",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    logins: int("logins").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileConsecLoginsUk: unique("mai2_profile_consec_logins_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const mai2ProfileDetail = mysqlTable(
  "mai2_profile_detail",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    userName: varchar("userName", { length: 25 }).default("NULL"),
    isNetMember: int("isNetMember").default("NULL"),
    iconId: int("iconId").default("NULL"),
    plateId: int("plateId").default("NULL"),
    titleId: int("titleId").default("NULL"),
    partnerId: int("partnerId").default("NULL"),
    frameId: int("frameId").default("NULL"),
    selectMapId: int("selectMapId").default("NULL"),
    totalAwake: int("totalAwake").default("NULL"),
    gradeRating: int("gradeRating").default("NULL"),
    musicRating: int("musicRating").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    highestRating: int("highestRating").default("NULL"),
    gradeRank: int("gradeRank").default("NULL"),
    classRank: int("classRank").default("NULL"),
    courseRank: int("courseRank").default("NULL"),
    charaSlot: longtext("charaSlot").default("NULL"),
    charaLockSlot: longtext("charaLockSlot").default("NULL"),
    contentBit: bigint("contentBit", { mode: "number" }).default("NULL"),
    playCount: int("playCount").default("NULL"),
    mapStock: int("mapStock").default("NULL"),
    eventWatchedDate: varchar("eventWatchedDate", { length: 25 }).default(
      "NULL"
    ),
    lastGameId: varchar("lastGameId", { length: 25 }).default("NULL"),
    lastRomVersion: varchar("lastRomVersion", { length: 25 }).default("NULL"),
    lastDataVersion: varchar("lastDataVersion", { length: 25 }).default("NULL"),
    lastLoginDate: varchar("lastLoginDate", { length: 25 }).default("NULL"),
    lastPairLoginDate: varchar("lastPairLoginDate", { length: 25 }).default(
      "NULL"
    ),
    lastPlayDate: varchar("lastPlayDate", { length: 25 }).default("NULL"),
    lastTrialPlayDate: varchar("lastTrialPlayDate", { length: 25 }).default(
      "NULL"
    ),
    lastPlayCredit: int("lastPlayCredit").default("NULL"),
    lastPlayMode: int("lastPlayMode").default("NULL"),
    lastPlaceId: int("lastPlaceId").default("NULL"),
    lastPlaceName: varchar("lastPlaceName", { length: 25 }).default("NULL"),
    lastAllNetId: int("lastAllNetId").default("NULL"),
    lastRegionId: int("lastRegionId").default("NULL"),
    lastRegionName: varchar("lastRegionName", { length: 25 }).default("NULL"),
    lastClientId: varchar("lastClientId", { length: 25 }).default("NULL"),
    lastCountryCode: varchar("lastCountryCode", { length: 25 }).default("NULL"),
    lastSelectEmoney: int("lastSelectEMoney").default("NULL"),
    lastSelectTicket: int("lastSelectTicket").default("NULL"),
    lastSelectCourse: int("lastSelectCourse").default("NULL"),
    lastCountCourse: int("lastCountCourse").default("NULL"),
    firstGameId: varchar("firstGameId", { length: 25 }).default("NULL"),
    firstRomVersion: varchar("firstRomVersion", { length: 25 }).default("NULL"),
    firstDataVersion: varchar("firstDataVersion", { length: 25 }).default(
      "NULL"
    ),
    firstPlayDate: varchar("firstPlayDate", { length: 25 }).default("NULL"),
    compatibleCmVersion: varchar("compatibleCmVersion", { length: 25 }).default(
      "NULL"
    ),
    dailyBonusDate: varchar("dailyBonusDate", { length: 25 }).default("NULL"),
    dailyCourseBonusDate: varchar("dailyCourseBonusDate", {
      length: 25,
    }).default("NULL"),
    playVsCount: int("playVsCount").default("NULL"),
    playSyncCount: int("playSyncCount").default("NULL"),
    winCount: int("winCount").default("NULL"),
    helpCount: int("helpCount").default("NULL"),
    comboCount: int("comboCount").default("NULL"),
    totalDeluxscore: bigint("totalDeluxscore", { mode: "number" }).default(
      "NULL"
    ),
    totalBasicDeluxscore: bigint("totalBasicDeluxscore", {
      mode: "number",
    }).default("NULL"),
    totalAdvancedDeluxscore: bigint("totalAdvancedDeluxscore", {
      mode: "number",
    }).default("NULL"),
    totalExpertDeluxscore: bigint("totalExpertDeluxscore", {
      mode: "number",
    }).default("NULL"),
    totalMasterDeluxscore: bigint("totalMasterDeluxscore", {
      mode: "number",
    }).default("NULL"),
    totalReMasterDeluxscore: bigint("totalReMasterDeluxscore", {
      mode: "number",
    }).default("NULL"),
    totalSync: int("totalSync").default("NULL"),
    totalBasicSync: int("totalBasicSync").default("NULL"),
    totalAdvancedSync: int("totalAdvancedSync").default("NULL"),
    totalExpertSync: int("totalExpertSync").default("NULL"),
    totalMasterSync: int("totalMasterSync").default("NULL"),
    totalReMasterSync: int("totalReMasterSync").default("NULL"),
    totalAchievement: bigint("totalAchievement", { mode: "number" }).default(
      "NULL"
    ),
    totalBasicAchievement: bigint("totalBasicAchievement", {
      mode: "number",
    }).default("NULL"),
    totalAdvancedAchievement: bigint("totalAdvancedAchievement", {
      mode: "number",
    }).default("NULL"),
    totalExpertAchievement: bigint("totalExpertAchievement", {
      mode: "number",
    }).default("NULL"),
    totalMasterAchievement: bigint("totalMasterAchievement", {
      mode: "number",
    }).default("NULL"),
    totalReMasterAchievement: bigint("totalReMasterAchievement", {
      mode: "number",
    }).default("NULL"),
    playerOldRating: bigint("playerOldRating", { mode: "number" }).default(
      "NULL"
    ),
    playerNewRating: bigint("playerNewRating", { mode: "number" }).default(
      "NULL"
    ),
    dateTime: bigint("dateTime", { mode: "number" }).default("NULL"),
    banState: int("banState").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileDetailUk: unique("mai2_profile_detail_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const mai2ProfileExtend = mysqlTable(
  "mai2_profile_extend",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    selectMusicId: int("selectMusicId").default("NULL"),
    selectDifficultyId: int("selectDifficultyId").default("NULL"),
    categoryIndex: int("categoryIndex").default("NULL"),
    musicIndex: int("musicIndex").default("NULL"),
    extraFlag: int("extraFlag").default("NULL"),
    selectScoreType: int("selectScoreType").default("NULL"),
    extendContentBit: bigint("extendContentBit", { mode: "number" }).default(
      "NULL"
    ),
    isPhotoAgree: tinyint("isPhotoAgree").default("NULL"),
    isGotoCodeRead: tinyint("isGotoCodeRead").default("NULL"),
    selectResultDetails: tinyint("selectResultDetails").default("NULL"),
    selectResultScoreViewType: int("selectResultScoreViewType").default("NULL"),
    sortCategorySetting: int("sortCategorySetting").default("NULL"),
    sortMusicSetting: int("sortMusicSetting").default("NULL"),
    selectedCardList: longtext("selectedCardList").default("NULL"),
    encountMapNpcList: longtext("encountMapNpcList").default("NULL"),
    playStatusSetting: int("playStatusSetting").default(0),
  },
  (table) => {
    return {
      mai2ProfileExtendUk: unique("mai2_profile_extend_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const mai2ProfileGhost = mysqlTable(
  "mai2_profile_ghost",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    versionInt: int("version_int").notNull(),
    name: varchar("name", { length: 25 }).default("NULL"),
    iconId: int("iconId").default("NULL"),
    plateId: int("plateId").default("NULL"),
    titleId: int("titleId").default("NULL"),
    rate: int("rate").default("NULL"),
    udemaeRate: int("udemaeRate").default("NULL"),
    courseRank: int("courseRank").default("NULL"),
    classRank: int("classRank").default("NULL"),
    classValue: int("classValue").default("NULL"),
    playDatetime: varchar("playDatetime", { length: 25 }).default("NULL"),
    shopId: int("shopId").default("NULL"),
    regionCode: int("regionCode").default("NULL"),
    typeId: int("typeId").default("NULL"),
    musicId: int("musicId").default("NULL"),
    difficulty: int("difficulty").default("NULL"),
    version: int("version").default("NULL"),
    resultBitList: longtext("resultBitList").default("NULL"),
    resultNum: int("resultNum").default("NULL"),
    achievement: int("achievement").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileGhostUk: unique("mai2_profile_ghost_uk").on(
        table.user,
        table.version,
        table.musicId,
        table.difficulty
      ),
    };
  }
);

export const mai2ProfileOption = mysqlTable(
  "mai2_profile_option",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    selectMusicId: int("selectMusicId").default("NULL"),
    optionKind: int("optionKind").default("NULL"),
    noteSpeed: int("noteSpeed").default("NULL"),
    slideSpeed: int("slideSpeed").default("NULL"),
    touchSpeed: int("touchSpeed").default("NULL"),
    tapDesign: int("tapDesign").default("NULL"),
    tapSe: int("tapSe").default(0),
    holdDesign: int("holdDesign").default("NULL"),
    slideDesign: int("slideDesign").default("NULL"),
    starType: int("starType").default("NULL"),
    outlineDesign: int("outlineDesign").default("NULL"),
    noteSize: int("noteSize").default("NULL"),
    slideSize: int("slideSize").default("NULL"),
    touchSize: int("touchSize").default("NULL"),
    starRotate: int("starRotate").default("NULL"),
    dispCenter: int("dispCenter").default("NULL"),
    outFrameType: int("outFrameType").default("NULL"),
    dispChain: int("dispChain").default("NULL"),
    dispRate: int("dispRate").default("NULL"),
    dispBar: int("dispBar").default("NULL"),
    touchEffect: int("touchEffect").default("NULL"),
    submonitorAnimation: int("submonitorAnimation").default("NULL"),
    submonitorAchive: int("submonitorAchive").default("NULL"),
    submonitorAppeal: int("submonitorAppeal").default("NULL"),
    matching: int("matching").default("NULL"),
    trackSkip: int("trackSkip").default("NULL"),
    brightness: int("brightness").default("NULL"),
    mirrorMode: int("mirrorMode").default("NULL"),
    dispJudge: int("dispJudge").default("NULL"),
    dispJudgePos: int("dispJudgePos").default("NULL"),
    dispJudgeTouchPos: int("dispJudgeTouchPos").default("NULL"),
    adjustTiming: int("adjustTiming").default("NULL"),
    judgeTiming: int("judgeTiming").default("NULL"),
    ansVolume: int("ansVolume").default("NULL"),
    tapHoldVolume: int("tapHoldVolume").default("NULL"),
    criticalSe: int("criticalSe").default("NULL"),
    breakSe: int("breakSe").default("NULL"),
    breakVolume: int("breakVolume").default("NULL"),
    exSe: int("exSe").default("NULL"),
    exVolume: int("exVolume").default("NULL"),
    slideSe: int("slideSe").default("NULL"),
    slideVolume: int("slideVolume").default("NULL"),
    breakSlideVolume: int("breakSlideVolume").default("NULL"),
    touchVolume: int("touchVolume").default("NULL"),
    touchHoldVolume: int("touchHoldVolume").default("NULL"),
    damageSeVolume: int("damageSeVolume").default("NULL"),
    headPhoneVolume: int("headPhoneVolume").default("NULL"),
    sortTab: int("sortTab").default("NULL"),
    sortMusic: int("sortMusic").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileOptionUk: unique("mai2_profile_option_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const mai2ProfileRating = mysqlTable(
  "mai2_profile_rating",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    rating: int("rating").default("NULL"),
    ratingList: longtext("ratingList").default("NULL"),
    newRatingList: longtext("newRatingList").default("NULL"),
    nextRatingList: longtext("nextRatingList").default("NULL"),
    nextNewRatingList: longtext("nextNewRatingList").default("NULL"),
    udemae: longtext("udemae").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileRatingUk: unique("mai2_profile_rating_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const mai2ProfileRegion = mysqlTable(
  "mai2_profile_region",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    regionId: int("regionId").default("NULL"),
    playCount: int("playCount").default(1),
    created: varchar("created", { length: 25 }).default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileRegionUk: unique("mai2_profile_region_uk").on(
        table.user,
        table.regionId
      ),
    };
  }
);

export const mai2ScoreBest = mysqlTable(
  "mai2_score_best",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    playCount: int("playCount").default("NULL"),
    achievement: int("achievement").default("NULL"),
    comboStatus: int("comboStatus").default("NULL"),
    syncStatus: int("syncStatus").default("NULL"),
    deluxscoreMax: int("deluxscoreMax").default("NULL"),
    scoreRank: int("scoreRank").default("NULL"),
    extNum1: int("extNum1").default(0),
  },
  (table) => {
    return {
      mai2ScoreBestUk: unique("mai2_score_best_uk").on(
        table.user,
        table.musicId,
        table.level
      ),
    };
  }
);

export const mai2ScoreCourse = mysqlTable(
  "mai2_score_course",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    courseId: int("courseId").default("NULL"),
    isLastClear: tinyint("isLastClear").default("NULL"),
    totalRestlife: int("totalRestlife").default("NULL"),
    totalAchievement: int("totalAchievement").default("NULL"),
    totalDeluxscore: int("totalDeluxscore").default("NULL"),
    playCount: int("playCount").default("NULL"),
    clearDate: varchar("clearDate", { length: 25 }).default("NULL"),
    lastPlayDate: varchar("lastPlayDate", { length: 25 }).default("NULL"),
    bestAchievement: int("bestAchievement").default("NULL"),
    bestAchievementDate: varchar("bestAchievementDate", { length: 25 }).default(
      "NULL"
    ),
    bestDeluxscore: int("bestDeluxscore").default("NULL"),
    bestDeluxscoreDate: varchar("bestDeluxscoreDate", { length: 25 }).default(
      "NULL"
    ),
  },
  (table) => {
    return {
      mai2ScoreBestUk: unique("mai2_score_best_uk").on(
        table.user,
        table.courseId
      ),
    };
  }
);

export const mai2StaticCards = mysqlTable(
  "mai2_static_cards",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    cardId: int("cardId").notNull(),
    cardName: varchar("cardName", { length: 255 }).notNull(),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    endDate: timestamp("endDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
    noticeStartDate: timestamp("noticeStartDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    noticeEndDate: timestamp("noticeEndDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      mai2StaticCardsUk: unique("mai2_static_cards_uk").on(
        table.version,
        table.cardId,
        table.cardName
      ),
    };
  }
);

export const mai2StaticEvent = mysqlTable(
  "mai2_static_event",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    eventId: int("eventId").default("NULL"),
    type: int("type").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "current_timestamp()"
    ),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      mai2StaticEventUk: unique("mai2_static_event_uk").on(
        table.version,
        table.eventId,
        table.type
      ),
    };
  }
);

export const mai2StaticMusic = mysqlTable(
  "mai2_static_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    songId: int("songId").default("NULL"),
    chartId: int("chartId").default("NULL"),
    title: varchar("title", { length: 255 }).default("NULL"),
    artist: varchar("artist", { length: 255 }).default("NULL"),
    genre: varchar("genre", { length: 255 }).default("NULL"),
    bpm: int("bpm").default("NULL"),
    addedVersion: varchar("addedVersion", { length: 255 }).default("NULL"),
    difficulty: float("difficulty").default("NULL"),
    noteDesigner: varchar("noteDesigner", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      mai2StaticMusicUk: unique("mai2_static_music_uk").on(
        table.songId,
        table.chartId,
        table.version
      ),
    };
  }
);

export const mai2StaticTicket = mysqlTable(
  "mai2_static_ticket",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    ticketId: int("ticketId").default("NULL"),
    kind: int("kind").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    price: int("price").default(1),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      mai2StaticTicketUk: unique("mai2_static_ticket_uk").on(
        table.version,
        table.ticketId
      ),
    };
  }
);

export const maimaiPlaylog = mysqlTable(
  "maimai_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").default("NULL"),
    orderId: int("orderId").default("NULL"),
    sortNumber: int("sortNumber").default("NULL"),
    placeId: int("placeId").default("NULL"),
    placeName: varchar("placeName", { length: 255 }).default("NULL"),
    country: varchar("country", { length: 255 }).default("NULL"),
    regionId: int("regionId").default("NULL"),
    playDate: varchar("playDate", { length: 255 }).default("NULL"),
    userPlayDate: varchar("userPlayDate", { length: 255 }).default("NULL"),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    gameMode: int("gameMode").default("NULL"),
    rivalNum: int("rivalNum").default("NULL"),
    track: int("track").default("NULL"),
    eventId: int("eventId").default("NULL"),
    isFreeToPlay: tinyint("isFreeToPlay").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    playedUserId1: int("playedUserId1").default("NULL"),
    playedUserId2: int("playedUserId2").default("NULL"),
    playedUserId3: int("playedUserId3").default("NULL"),
    playedUserName1: varchar("playedUserName1", { length: 255 }).default(
      "NULL"
    ),
    playedUserName2: varchar("playedUserName2", { length: 255 }).default(
      "NULL"
    ),
    playedUserName3: varchar("playedUserName3", { length: 255 }).default(
      "NULL"
    ),
    playedMusicLevel1: int("playedMusicLevel1").default("NULL"),
    playedMusicLevel2: int("playedMusicLevel2").default("NULL"),
    playedMusicLevel3: int("playedMusicLevel3").default("NULL"),
    achievement: int("achievement").default("NULL"),
    score: int("score").default("NULL"),
    tapScore: int("tapScore").default("NULL"),
    holdScore: int("holdScore").default("NULL"),
    slideScore: int("slideScore").default("NULL"),
    breakScore: int("breakScore").default("NULL"),
    syncRate: int("syncRate").default("NULL"),
    vsWin: int("vsWin").default("NULL"),
    isAllPerfect: tinyint("isAllPerfect").default("NULL"),
    fullCombo: int("fullCombo").default("NULL"),
    maxFever: int("maxFever").default("NULL"),
    maxCombo: int("maxCombo").default("NULL"),
    tapPerfect: int("tapPerfect").default("NULL"),
    tapGreat: int("tapGreat").default("NULL"),
    tapGood: int("tapGood").default("NULL"),
    tapBad: int("tapBad").default("NULL"),
    holdPerfect: int("holdPerfect").default("NULL"),
    holdGreat: int("holdGreat").default("NULL"),
    holdGood: int("holdGood").default("NULL"),
    holdBad: int("holdBad").default("NULL"),
    slidePerfect: int("slidePerfect").default("NULL"),
    slideGreat: int("slideGreat").default("NULL"),
    slideGood: int("slideGood").default("NULL"),
    slideBad: int("slideBad").default("NULL"),
    breakPerfect: int("breakPerfect").default("NULL"),
    breakGreat: int("breakGreat").default("NULL"),
    breakGood: int("breakGood").default("NULL"),
    breakBad: int("breakBad").default("NULL"),
    judgeStyle: int("judgeStyle").default("NULL"),
    isTrackSkip: tinyint("isTrackSkip").default("NULL"),
    isHighScore: tinyint("isHighScore").default("NULL"),
    isChallengeTrack: tinyint("isChallengeTrack").default("NULL"),
    challengeLife: int("challengeLife").default("NULL"),
    challengeRemain: int("challengeRemain").default("NULL"),
    isAllPerfectPlus: int("isAllPerfectPlus").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const maimaiProfileBoss = mysqlTable(
  "maimai_profile_boss",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    pandoraFlagList0: int("pandoraFlagList0").default("NULL"),
    pandoraFlagList1: int("pandoraFlagList1").default("NULL"),
    pandoraFlagList2: int("pandoraFlagList2").default("NULL"),
    pandoraFlagList3: int("pandoraFlagList3").default("NULL"),
    pandoraFlagList4: int("pandoraFlagList4").default("NULL"),
    pandoraFlagList5: int("pandoraFlagList5").default("NULL"),
    pandoraFlagList6: int("pandoraFlagList6").default("NULL"),
    emblemFlagList: int("emblemFlagList").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileBossUk: unique("mai2_profile_boss_uk").on(table.user),
    };
  }
);

export const maimaiProfileDetail = mysqlTable(
  "maimai_profile_detail",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    lastDataVersion: int("lastDataVersion").default("NULL"),
    userName: varchar("userName", { length: 8 }).default("NULL"),
    point: int("point").default("NULL"),
    totalPoint: int("totalPoint").default("NULL"),
    iconId: int("iconId").default("NULL"),
    nameplateId: int("nameplateId").default("NULL"),
    frameId: int("frameId").default("NULL"),
    trophyId: int("trophyId").default("NULL"),
    playCount: int("playCount").default("NULL"),
    playVsCount: int("playVsCount").default("NULL"),
    playSyncCount: int("playSyncCount").default("NULL"),
    winCount: int("winCount").default("NULL"),
    helpCount: int("helpCount").default("NULL"),
    comboCount: int("comboCount").default("NULL"),
    feverCount: int("feverCount").default("NULL"),
    totalHiScore: int("totalHiScore").default("NULL"),
    totalEasyHighScore: int("totalEasyHighScore").default("NULL"),
    totalBasicHighScore: int("totalBasicHighScore").default("NULL"),
    totalAdvancedHighScore: int("totalAdvancedHighScore").default("NULL"),
    totalExpertHighScore: int("totalExpertHighScore").default("NULL"),
    totalMasterHighScore: int("totalMasterHighScore").default("NULL"),
    totalReMasterHighScore: int("totalReMasterHighScore").default("NULL"),
    totalHighSync: int("totalHighSync").default("NULL"),
    totalEasySync: int("totalEasySync").default("NULL"),
    totalBasicSync: int("totalBasicSync").default("NULL"),
    totalAdvancedSync: int("totalAdvancedSync").default("NULL"),
    totalExpertSync: int("totalExpertSync").default("NULL"),
    totalMasterSync: int("totalMasterSync").default("NULL"),
    totalReMasterSync: int("totalReMasterSync").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    highestRating: int("highestRating").default("NULL"),
    rankAuthTailId: int("rankAuthTailId").default("NULL"),
    eventWatchedDate: varchar("eventWatchedDate", { length: 255 }).default(
      "NULL"
    ),
    webLimitDate: varchar("webLimitDate", { length: 255 }).default("NULL"),
    challengeTrackPhase: int("challengeTrackPhase").default("NULL"),
    firstPlayBits: int("firstPlayBits").default("NULL"),
    lastPlayDate: varchar("lastPlayDate", { length: 255 }).default("NULL"),
    lastPlaceId: int("lastPlaceId").default("NULL"),
    lastPlaceName: varchar("lastPlaceName", { length: 255 }).default("NULL"),
    lastRegionId: int("lastRegionId").default("NULL"),
    lastRegionName: varchar("lastRegionName", { length: 255 }).default("NULL"),
    lastClientId: varchar("lastClientId", { length: 255 }).default("NULL"),
    lastCountryCode: varchar("lastCountryCode", { length: 255 }).default(
      "NULL"
    ),
    eventPoint: int("eventPoint").default("NULL"),
    totalLv: int("totalLv").default("NULL"),
    lastLoginBonusDay: int("lastLoginBonusDay").default("NULL"),
    lastSurvivalBonusDay: int("lastSurvivalBonusDay").default("NULL"),
    loginBonusLv: int("loginBonusLv").default("NULL"),
  },
  (table) => {
    return {
      maimaiProfileDetailUk: unique("maimai_profile_detail_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const maimaiProfileGradeStatus = mysqlTable(
  "maimai_profile_grade_status",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    gradeVersion: int("gradeVersion").default("NULL"),
    gradeLevel: int("gradeLevel").default("NULL"),
    gradeSubLevel: int("gradeSubLevel").default("NULL"),
    gradeMaxId: int("gradeMaxId").default("NULL"),
  },
  (table) => {
    return {
      maimaiProfileGradeStatusUk: unique("maimai_profile_grade_status_uk").on(
        table.user,
        table.gradeVersion
      ),
    };
  }
);

export const maimaiProfileOption = mysqlTable(
  "maimai_profile_option",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    soudEffect: int("soudEffect").default("NULL"),
    mirrorMode: int("mirrorMode").default("NULL"),
    guideSpeed: int("guideSpeed").default("NULL"),
    bgInfo: int("bgInfo").default("NULL"),
    brightness: int("brightness").default("NULL"),
    isStarRot: int("isStarRot").default("NULL"),
    breakSe: int("breakSe").default("NULL"),
    slideSe: int("slideSe").default("NULL"),
    hardJudge: int("hardJudge").default("NULL"),
    isTagJump: int("isTagJump").default("NULL"),
    breakSeVol: int("breakSeVol").default("NULL"),
    slideSeVol: int("slideSeVol").default("NULL"),
    isUpperDisp: int("isUpperDisp").default("NULL"),
    trackSkip: int("trackSkip").default("NULL"),
    optionMode: int("optionMode").default("NULL"),
    simpleOptionParam: int("simpleOptionParam").default("NULL"),
    adjustTiming: int("adjustTiming").default("NULL"),
    dispTiming: int("dispTiming").default("NULL"),
    timingPos: int("timingPos").default("NULL"),
    ansVol: int("ansVol").default("NULL"),
    noteVol: int("noteVol").default("NULL"),
    dmgVol: int("dmgVol").default("NULL"),
    appealFlame: int("appealFlame").default("NULL"),
    isFeverDisp: int("isFeverDisp").default("NULL"),
    dispJudge: int("dispJudge").default("NULL"),
    judgePos: int("judgePos").default("NULL"),
    ratingGuard: int("ratingGuard").default("NULL"),
    selectChara: int("selectChara").default("NULL"),
    sortType: int("sortType").default("NULL"),
    filterGenre: int("filterGenre").default("NULL"),
    filterLevel: int("filterLevel").default("NULL"),
    filterRank: int("filterRank").default("NULL"),
    filterVersion: int("filterVersion").default("NULL"),
    filterRec: int("filterRec").default("NULL"),
    filterFullCombo: int("filterFullCombo").default("NULL"),
    filterAllPerfect: int("filterAllPerfect").default("NULL"),
    filterDifficulty: int("filterDifficulty").default("NULL"),
    filterFullSync: int("filterFullSync").default("NULL"),
    filterReMaster: int("filterReMaster").default("NULL"),
    filterMaxFever: int("filterMaxFever").default("NULL"),
    finalSelectId: int("finalSelectId").default("NULL"),
    finalSelectCategory: int("finalSelectCategory").default("NULL"),
  },
  (table) => {
    return {
      maimaiProfileOptionUk: unique("maimai_profile_option_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const maimaiProfileRecentRating = mysqlTable(
  "maimai_profile_recent_rating",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userRecentRatingList: longtext("userRecentRatingList").default("NULL"),
  },
  (table) => {
    return {
      mai2ProfileRecentRatingUk: unique("mai2_profile_recent_rating_uk").on(
        table.user
      ),
    };
  }
);

export const maimaiProfileWebOption = mysqlTable(
  "maimai_profile_web_option",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    isNetMember: tinyint("isNetMember").default("NULL"),
    dispRate: int("dispRate").default("NULL"),
    dispJudgeStyle: int("dispJudgeStyle").default("NULL"),
    dispRank: int("dispRank").default("NULL"),
    dispHomeRanker: int("dispHomeRanker").default("NULL"),
    dispTotalLv: int("dispTotalLv").default("NULL"),
  },
  (table) => {
    return {
      maimaiProfileWebOptionUk: unique("maimai_profile_web_option_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const maimaiScoreBest = mysqlTable(
  "maimai_score_best",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    playCount: int("playCount").default("NULL"),
    achievement: int("achievement").default("NULL"),
    scoreMax: int("scoreMax").default("NULL"),
    syncRateMax: int("syncRateMax").default("NULL"),
    isAllPerfect: tinyint("isAllPerfect").default("NULL"),
    isAllPerfectPlus: int("isAllPerfectPlus").default("NULL"),
    fullCombo: int("fullCombo").default("NULL"),
    maxFever: int("maxFever").default("NULL"),
  },
  (table) => {
    return {
      maimaiScoreBestUk: unique("maimai_score_best_uk").on(
        table.user,
        table.musicId,
        table.level
      ),
    };
  }
);

export const ongekiGpLog = mysqlTable(
  "ongeki_gp_log",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    usedCredit: int("usedCredit").default("NULL"),
    placeName: varchar("placeName", { length: 255 }).default("NULL"),
    trxnDate: varchar("trxnDate", { length: 255 }).default("NULL"),
    placeId: int("placeId").default("NULL"),
    kind: int("kind").default("NULL"),
    pattern: int("pattern").default("NULL"),
    currentGp: int("currentGP").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const ongekiProfileActivity = mysqlTable(
  "ongeki_profile_activity",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    kind: int("kind").default("NULL"),
    activityId: int("activityId").default("NULL"),
    sortNumber: int("sortNumber").default("NULL"),
    param1: int("param1").default("NULL"),
    param2: int("param2").default("NULL"),
    param3: int("param3").default("NULL"),
    param4: int("param4").default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileActivityUk: unique("ongeki_profile_activity_uk").on(
        table.user,
        table.kind,
        table.activityId
      ),
    };
  }
);

export const ongekiProfileData = mysqlTable(
  "ongeki_profile_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    userName: varchar("userName", { length: 8 }).default("NULL"),
    level: int("level").default("NULL"),
    reincarnationNum: int("reincarnationNum").default("NULL"),
    exp: int("exp").default("NULL"),
    point: int("point").default("NULL"),
    totalPoint: int("totalPoint").default("NULL"),
    playCount: int("playCount").default("NULL"),
    jewelCount: int("jewelCount").default("NULL"),
    totalJewelCount: int("totalJewelCount").default("NULL"),
    medalCount: int("medalCount").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    highestRating: int("highestRating").default("NULL"),
    battlePoint: int("battlePoint").default("NULL"),
    nameplateId: int("nameplateId").default("NULL"),
    trophyId: int("trophyId").default("NULL"),
    cardId: int("cardId").default("NULL"),
    characterId: int("characterId").default("NULL"),
    characterVoiceNo: int("characterVoiceNo").default("NULL"),
    tabSetting: int("tabSetting").default("NULL"),
    tabSortSetting: int("tabSortSetting").default("NULL"),
    cardCategorySetting: int("cardCategorySetting").default("NULL"),
    cardSortSetting: int("cardSortSetting").default("NULL"),
    playedTutorialBit: int("playedTutorialBit").default("NULL"),
    firstTutorialCancelNum: int("firstTutorialCancelNum").default("NULL"),
    sumTechHighScore: bigint("sumTechHighScore", { mode: "number" }).default(
      "NULL"
    ),
    sumTechBasicHighScore: bigint("sumTechBasicHighScore", {
      mode: "number",
    }).default("NULL"),
    sumTechAdvancedHighScore: bigint("sumTechAdvancedHighScore", {
      mode: "number",
    }).default("NULL"),
    sumTechExpertHighScore: bigint("sumTechExpertHighScore", {
      mode: "number",
    }).default("NULL"),
    sumTechMasterHighScore: bigint("sumTechMasterHighScore", {
      mode: "number",
    }).default("NULL"),
    sumTechLunaticHighScore: bigint("sumTechLunaticHighScore", {
      mode: "number",
    }).default("NULL"),
    sumBattleHighScore: bigint("sumBattleHighScore", {
      mode: "number",
    }).default("NULL"),
    sumBattleBasicHighScore: bigint("sumBattleBasicHighScore", {
      mode: "number",
    }).default("NULL"),
    sumBattleAdvancedHighScore: bigint("sumBattleAdvancedHighScore", {
      mode: "number",
    }).default("NULL"),
    sumBattleExpertHighScore: bigint("sumBattleExpertHighScore", {
      mode: "number",
    }).default("NULL"),
    sumBattleMasterHighScore: bigint("sumBattleMasterHighScore", {
      mode: "number",
    }).default("NULL"),
    sumBattleLunaticHighScore: bigint("sumBattleLunaticHighScore", {
      mode: "number",
    }).default("NULL"),
    eventWatchedDate: varchar("eventWatchedDate", { length: 255 }).default(
      "NULL"
    ),
    cmEventWatchedDate: varchar("cmEventWatchedDate", { length: 255 }).default(
      "NULL"
    ),
    firstGameId: varchar("firstGameId", { length: 8 }).default("NULL"),
    firstRomVersion: varchar("firstRomVersion", { length: 8 }).default("NULL"),
    firstDataVersion: varchar("firstDataVersion", { length: 8 }).default(
      "NULL"
    ),
    firstPlayDate: varchar("firstPlayDate", { length: 255 }).default("NULL"),
    lastGameId: varchar("lastGameId", { length: 8 }).default("NULL"),
    lastRomVersion: varchar("lastRomVersion", { length: 8 }).default("NULL"),
    lastDataVersion: varchar("lastDataVersion", { length: 8 }).default("NULL"),
    compatibleCmVersion: varchar("compatibleCmVersion", { length: 8 }).default(
      "NULL"
    ),
    lastPlayDate: varchar("lastPlayDate", { length: 255 }).default("NULL"),
    lastPlaceId: int("lastPlaceId").default("NULL"),
    lastPlaceName: varchar("lastPlaceName", { length: 255 }).default("NULL"),
    lastRegionId: int("lastRegionId").default("NULL"),
    lastRegionName: varchar("lastRegionName", { length: 255 }).default("NULL"),
    lastAllNetId: int("lastAllNetId").default("NULL"),
    lastClientId: varchar("lastClientId", { length: 16 }).default("NULL"),
    lastUsedDeckId: int("lastUsedDeckId").default("NULL"),
    lastPlayMusicLevel: int("lastPlayMusicLevel").default("NULL"),
    banStatus: int("banStatus").default(0),
    rivalScoreCategorySetting: int("rivalScoreCategorySetting").default(0),
    overDamageBattlePoint: int("overDamageBattlePoint").default(0),
    bestBattlePoint: int("bestBattlePoint").default(0),
    lastEmoneyBrand: int("lastEmoneyBrand").default(0),
    lastEmoneyCredit: int("lastEmoneyCredit").default(0),
    isDialogWatchedSuggestMemory: tinyint(
      "isDialogWatchedSuggestMemory"
    ).default(0),
  },
  (table) => {
    return {
      ongekiProfileProfileUk: unique("ongeki_profile_profile_uk").on(
        table.user,
        table.version
      ),
    };
  }
);

export const ongekiProfileKop = mysqlTable(
  "ongeki_profile_kop",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    authKey: int("authKey").default("NULL"),
    kopId: int("kopId").default("NULL"),
    areaId: int("areaId").default("NULL"),
    totalTechScore: int("totalTechScore").default("NULL"),
    totalPlatinumScore: int("totalPlatinumScore").default("NULL"),
    techRecordDate: varchar("techRecordDate", { length: 25 }).default("NULL"),
    isTotalTechNewRecord: tinyint("isTotalTechNewRecord").default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileKopUk: unique("ongeki_profile_kop_uk").on(
        table.user,
        table.kopId
      ),
    };
  }
);

export const ongekiProfileOption = mysqlTable(
  "ongeki_profile_option",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    optionSet: int("optionSet").default("NULL"),
    speed: int("speed").default("NULL"),
    mirror: int("mirror").default("NULL"),
    judgeTiming: int("judgeTiming").default("NULL"),
    judgeAdjustment: int("judgeAdjustment").default("NULL"),
    abort: int("abort").default("NULL"),
    tapSound: int("tapSound").default("NULL"),
    volGuide: int("volGuide").default("NULL"),
    volAll: int("volAll").default("NULL"),
    volTap: int("volTap").default("NULL"),
    volCrTap: int("volCrTap").default("NULL"),
    volHold: int("volHold").default("NULL"),
    volSide: int("volSide").default("NULL"),
    volFlick: int("volFlick").default("NULL"),
    volBell: int("volBell").default("NULL"),
    volEnemy: int("volEnemy").default("NULL"),
    volSkill: int("volSkill").default("NULL"),
    volDamage: int("volDamage").default("NULL"),
    colorField: int("colorField").default("NULL"),
    colorLaneBright: int("colorLaneBright").default("NULL"),
    colorLane: int("colorLane").default("NULL"),
    colorSide: int("colorSide").default("NULL"),
    effectDamage: int("effectDamage").default("NULL"),
    effectPos: int("effectPos").default("NULL"),
    judgeDisp: int("judgeDisp").default("NULL"),
    judgePos: int("judgePos").default("NULL"),
    judgeBreak: int("judgeBreak").default("NULL"),
    judgeHit: int("judgeHit").default("NULL"),
    platinumBreakDisp: int("platinumBreakDisp").default("NULL"),
    judgeCriticalBreak: int("judgeCriticalBreak").default("NULL"),
    matching: int("matching").default("NULL"),
    dispPlayerLv: int("dispPlayerLv").default("NULL"),
    dispRating: int("dispRating").default("NULL"),
    dispBp: int("dispBP").default("NULL"),
    headphone: int("headphone").default("NULL"),
    stealthField: int("stealthField").default("NULL"),
    colorWallBright: int("colorWallBright").default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileOptionUk: unique("ongeki_profile_option_uk").on(table.user),
    };
  }
);

export const ongekiProfileRatingLog = mysqlTable(
  "ongeki_profile_rating_log",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    highestRating: int("highestRating").default("NULL"),
    dataVersion: varchar("dataVersion", { length: 10 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileRatingLogUk: unique("ongeki_profile_rating_log_uk").on(
        table.user,
        table.dataVersion
      ),
    };
  }
);

export const ongekiProfileRecentRating = mysqlTable(
  "ongeki_profile_recent_rating",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    recentRating: longtext("recentRating").default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileRecentRatingUk: unique("ongeki_profile_recent_rating_uk").on(
        table.user
      ),
    };
  }
);

export const ongekiProfileRegion = mysqlTable(
  "ongeki_profile_region",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    regionId: int("regionId").default("NULL"),
    playCount: int("playCount").default("NULL"),
    created: varchar("created", { length: 25 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileRegionUk: unique("ongeki_profile_region_uk").on(
        table.user,
        table.regionId
      ),
    };
  }
);

export const ongekiProfileRival = mysqlTable(
  "ongeki_profile_rival",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    rivalUserId: int("rivalUserId")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
  },
  (table) => {
    return {
      rivalUserId: index("rivalUserId").on(table.rivalUserId),
      ongekiProfileRivalUk: unique("ongeki_profile_rival_uk").on(
        table.user,
        table.rivalUserId
      ),
    };
  }
);

export const ongekiProfileTrainingRoom = mysqlTable(
  "ongeki_profile_training_room",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    roomId: int("roomId").default("NULL"),
    authKey: int("authKey").default("NULL"),
    cardId: int("cardId").default("NULL"),
    valueDate: varchar("valueDate", { length: 25 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiProfileTrainingRoomUk: unique("ongeki_profile_training_room_uk").on(
        table.user,
        table.roomId
      ),
    };
  }
);

export const ongekiScoreBest = mysqlTable(
  "ongeki_score_best",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    musicId: int("musicId").notNull(),
    level: int("level").notNull(),
    playCount: int("playCount").notNull(),
    techScoreMax: int("techScoreMax").notNull(),
    techScoreRank: int("techScoreRank").notNull(),
    battleScoreMax: int("battleScoreMax").notNull(),
    battleScoreRank: int("battleScoreRank").notNull(),
    maxComboCount: int("maxComboCount").notNull(),
    maxOverKill: float("maxOverKill").notNull(),
    maxTeamOverKill: float("maxTeamOverKill").notNull(),
    isFullBell: tinyint("isFullBell").notNull(),
    isFullCombo: tinyint("isFullCombo").notNull(),
    isAllBreake: tinyint("isAllBreake").notNull(),
    isLock: tinyint("isLock").notNull(),
    clearStatus: tinyint("clearStatus").notNull(),
    isStoryWatched: tinyint("isStoryWatched").notNull(),
    platinumScoreMax: int("platinumScoreMax").default("NULL"),
  },
  (table) => {
    return {
      ongekiBestScoreUk: unique("ongeki_best_score_uk").on(
        table.user,
        table.musicId,
        table.level
      ),
    };
  }
);

export const ongekiScorePlaylog = mysqlTable(
  "ongeki_score_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sortNumber: int("sortNumber").default("NULL"),
    placeId: int("placeId").default("NULL"),
    placeName: varchar("placeName", { length: 255 }).default("NULL"),
    playDate: timestamp("playDate", { mode: "string" }).default("NULL"),
    userPlayDate: timestamp("userPlayDate", { mode: "string" }).default("NULL"),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    playKind: int("playKind").default("NULL"),
    eventId: int("eventId").default("NULL"),
    eventName: varchar("eventName", { length: 255 }).default("NULL"),
    eventPoint: int("eventPoint").default("NULL"),
    playedUserId1: int("playedUserId1").default("NULL"),
    playedUserId2: int("playedUserId2").default("NULL"),
    playedUserId3: int("playedUserId3").default("NULL"),
    playedUserName1: varchar("playedUserName1", { length: 8 }).default("NULL"),
    playedUserName2: varchar("playedUserName2", { length: 8 }).default("NULL"),
    playedUserName3: varchar("playedUserName3", { length: 8 }).default("NULL"),
    playedMusicLevel1: int("playedMusicLevel1").default("NULL"),
    playedMusicLevel2: int("playedMusicLevel2").default("NULL"),
    playedMusicLevel3: int("playedMusicLevel3").default("NULL"),
    cardId1: int("cardId1").default("NULL"),
    cardId2: int("cardId2").default("NULL"),
    cardId3: int("cardId3").default("NULL"),
    cardLevel1: int("cardLevel1").default("NULL"),
    cardLevel2: int("cardLevel2").default("NULL"),
    cardLevel3: int("cardLevel3").default("NULL"),
    cardAttack1: int("cardAttack1").default("NULL"),
    cardAttack2: int("cardAttack2").default("NULL"),
    cardAttack3: int("cardAttack3").default("NULL"),
    bossCharaId: int("bossCharaId").default("NULL"),
    bossLevel: int("bossLevel").default("NULL"),
    bossAttribute: int("bossAttribute").default("NULL"),
    clearStatus: int("clearStatus").default("NULL"),
    techScore: int("techScore").default("NULL"),
    techScoreRank: int("techScoreRank").default("NULL"),
    battleScore: int("battleScore").default("NULL"),
    battleScoreRank: int("battleScoreRank").default("NULL"),
    maxCombo: int("maxCombo").default("NULL"),
    judgeMiss: int("judgeMiss").default("NULL"),
    judgeHit: int("judgeHit").default("NULL"),
    judgeBreak: int("judgeBreak").default("NULL"),
    judgeCriticalBreak: int("judgeCriticalBreak").default("NULL"),
    rateTap: int("rateTap").default("NULL"),
    rateHold: int("rateHold").default("NULL"),
    rateFlick: int("rateFlick").default("NULL"),
    rateSideTap: int("rateSideTap").default("NULL"),
    rateSideHold: int("rateSideHold").default("NULL"),
    bellCount: int("bellCount").default("NULL"),
    totalBellCount: int("totalBellCount").default("NULL"),
    damageCount: int("damageCount").default("NULL"),
    overDamage: int("overDamage").default("NULL"),
    isTechNewRecord: tinyint("isTechNewRecord").default("NULL"),
    isBattleNewRecord: tinyint("isBattleNewRecord").default("NULL"),
    isOverDamageNewRecord: tinyint("isOverDamageNewRecord").default("NULL"),
    isFullCombo: tinyint("isFullCombo").default("NULL"),
    isFullBell: tinyint("isFullBell").default("NULL"),
    isAllBreak: tinyint("isAllBreak").default("NULL"),
    playerRating: int("playerRating").default("NULL"),
    battlePoint: int("battlePoint").default("NULL"),
    platinumScore: int("platinumScore").default("NULL"),
    platinumScoreMax: int("platinumScoreMax").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const ongekiScoreTechCount = mysqlTable(
  "ongeki_score_tech_count",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    levelId: int("levelId").notNull(),
    allBreakCount: int("allBreakCount").default("NULL"),
    allBreakPlusCount: int("allBreakPlusCount").default("NULL"),
  },
  (table) => {
    return {
      ongekiTechCountUk: unique("ongeki_tech_count_uk").on(
        table.user,
        table.levelId
      ),
    };
  }
);

export const ongekiSessionLog = mysqlTable(
  "ongeki_session_log",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    sortNumber: int("sortNumber").default("NULL"),
    placeId: int("placeId").default("NULL"),
    playDate: varchar("playDate", { length: 10 }).default("NULL"),
    userPlayDate: varchar("userPlayDate", { length: 25 }).default("NULL"),
    isPaid: tinyint("isPaid").default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const ongekiStaticCards = mysqlTable(
  "ongeki_static_cards",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    cardId: int("cardId").notNull(),
    name: varchar("name", { length: 255 }).notNull(),
    charaId: int("charaId").notNull(),
    nickName: varchar("nickName", { length: 255 }).default("NULL"),
    school: varchar("school", { length: 255 }).notNull(),
    attribute: varchar("attribute", { length: 5 }).notNull(),
    gakunen: varchar("gakunen", { length: 255 }).notNull(),
    rarity: int("rarity").notNull(),
    levelParam: varchar("levelParam", { length: 255 }).notNull(),
    skillId: int("skillId").notNull(),
    choKaikaSkillId: int("choKaikaSkillId").notNull(),
    cardNumber: varchar("cardNumber", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiStaticCardsUk: unique("ongeki_static_cards_uk").on(
        table.version,
        table.cardId
      ),
    };
  }
);

export const ongekiStaticClientTestmode = mysqlTable(
  "ongeki_static_client_testmode",
  {
    id: int("id").autoincrement().notNull(),
    regionId: int("regionId").notNull(),
    placeId: int("placeId").notNull(),
    clientId: varchar("clientId", { length: 11 }).notNull(),
    updateDate: timestamp("updateDate", { mode: "string" }).notNull(),
    isDelivery: tinyint("isDelivery").notNull(),
    groupId: int("groupId").notNull(),
    groupRole: int("groupRole").notNull(),
    continueMode: int("continueMode").notNull(),
    selectMusicTime: int("selectMusicTime").notNull(),
    advertiseVolume: int("advertiseVolume").notNull(),
    eventMode: int("eventMode").notNull(),
    eventMusicNum: int("eventMusicNum").notNull(),
    patternGp: int("patternGp").notNull(),
    limitGp: int("limitGp").notNull(),
    maxLeverMovable: int("maxLeverMovable").notNull(),
    minLeverMovable: int("minLeverMovable").notNull(),
  },
  (table) => {
    return {
      ongekiStaticClientTestmodeUk: unique(
        "ongeki_static_client_testmode_uk"
      ).on(table.clientId),
    };
  }
);

export const ongekiStaticEvents = mysqlTable(
  "ongeki_static_events",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    eventId: int("eventId").default("NULL"),
    type: int("type").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "current_timestamp()"
    ),
    endDate: timestamp("endDate", { mode: "string" }).default(
      "current_timestamp()"
    ),
    enabled: tinyint("enabled").default(1),
  },
  (table) => {
    return {
      ongekiStaticEventsUk: unique("ongeki_static_events_uk").on(
        table.version,
        table.eventId,
        table.type
      ),
    };
  }
);

export const ongekiStaticGachas = mysqlTable(
  "ongeki_static_gachas",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    gachaId: int("gachaId").notNull(),
    gachaName: varchar("gachaName", { length: 255 }).notNull(),
    type: int("type").default(0).notNull(),
    kind: int("kind").default(0).notNull(),
    isCeiling: tinyint("isCeiling").default(0),
    maxSelectPoint: int("maxSelectPoint").default(0),
    ceilingCnt: int("ceilingCnt").default(10),
    changeRateCnt1: int("changeRateCnt1").default(0),
    changeRateCnt2: int("changeRateCnt2").default(0),
    startDate: timestamp("startDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    endDate: timestamp("endDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
    noticeStartDate: timestamp("noticeStartDate", { mode: "string" }).default(
      "2017-12-31 17:00:00"
    ),
    noticeEndDate: timestamp("noticeEndDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
    convertEndDate: timestamp("convertEndDate", { mode: "string" }).default(
      "2037-12-31 17:00:00"
    ),
  },
  (table) => {
    return {
      ongekiStaticGachasUk: unique("ongeki_static_gachas_uk").on(
        table.version,
        table.gachaId,
        table.gachaName
      ),
    };
  }
);

export const ongekiStaticGachaCards = mysqlTable(
  "ongeki_static_gacha_cards",
  {
    id: int("id").autoincrement().notNull(),
    gachaId: int("gachaId").notNull(),
    cardId: int("cardId").notNull(),
    rarity: int("rarity").notNull(),
    weight: int("weight").default(1),
    isPickup: tinyint("isPickup").default(0),
    isSelect: tinyint("isSelect").default(0),
  },
  (table) => {
    return {
      ongekiStaticGachaCardsUk: unique("ongeki_static_gacha_cards_uk").on(
        table.gachaId,
        table.cardId
      ),
    };
  }
);

export const ongekiStaticGamePoint = mysqlTable(
  "ongeki_static_game_point",
  {
    id: int("id").autoincrement().notNull(),
    type: int("type").notNull(),
    cost: int("cost").notNull(),
    startDate: varchar("startDate", { length: 25 })
      .default("2000-01-01 05:00:00.0")
      .notNull(),
    endDate: varchar("endDate", { length: 25 })
      .default("2099-01-01 05:00:00.0")
      .notNull(),
  },
  (table) => {
    return {
      ongekiStaticGamePointUk: unique("ongeki_static_game_point_uk").on(
        table.type
      ),
    };
  }
);

export const ongekiStaticMusic = mysqlTable(
  "ongeki_static_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    songId: int("songId").default("NULL"),
    chartId: int("chartId").default("NULL"),
    title: varchar("title", { length: 255 }).default("NULL"),
    artist: varchar("artist", { length: 255 }).default("NULL"),
    genre: varchar("genre", { length: 255 }).default("NULL"),
    level: float("level").default("NULL"),
  },
  (table) => {
    return {
      ongekiStaticMusicUk: unique("ongeki_static_music_uk").on(
        table.version,
        table.songId,
        table.chartId
      ),
    };
  }
);

export const ongekiStaticMusicRankingList = mysqlTable(
  "ongeki_static_music_ranking_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    musicId: int("musicId").notNull(),
    point: int("point").notNull(),
    userName: varchar("userName", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiStaticMusicRankingUk: unique("ongeki_static_music_ranking_uk").on(
        table.version,
        table.musicId
      ),
    };
  }
);

export const ongekiStaticPresentList = mysqlTable(
  "ongeki_static_present_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    presentId: int("presentId").notNull(),
    presentName: varchar("presentName", { length: 255 }).notNull(),
    rewardId: int("rewardId").notNull(),
    stock: int("stock").notNull(),
    message: varchar("message", { length: 255 }).default("NULL"),
    startDate: varchar("startDate", { length: 25 }).notNull(),
    endDate: varchar("endDate", { length: 25 }).notNull(),
  },
  (table) => {
    return {
      ongekiStaticPresentListUk: unique("ongeki_static_present_list_uk").on(
        table.version,
        table.presentId
      ),
    };
  }
);

export const ongekiStaticRewards = mysqlTable(
  "ongeki_static_rewards",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    rewardId: int("rewardId").notNull(),
    rewardname: varchar("rewardname", { length: 255 }).notNull(),
    itemKind: int("itemKind").notNull(),
    itemId: int("itemId").notNull(),
  },
  (table) => {
    return {
      ongekiStaticRewardsUk: unique("ongeki_static_rewards_uk").on(
        table.version,
        table.rewardId
      ),
    };
  }
);

export const ongekiStaticTechMusic = mysqlTable(
  "ongeki_static_tech_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    eventId: int("eventId").notNull(),
    musicId: int("musicId").notNull(),
    level: int("level").notNull(),
  },
  (table) => {
    return {
      ongekiStaticTechMusicUk: unique("ongeki_static_tech_music_uk").on(
        table.version,
        table.musicId
      ),
    };
  }
);

export const ongekiTechEventRanking = mysqlTable(
  "ongeki_tech_event_ranking",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    date: varchar("date", { length: 25 }).default("NULL"),
    eventId: int("eventId").notNull(),
    rank: int("rank").default("NULL"),
    totalPlatinumScore: int("totalPlatinumScore").notNull(),
    totalTechScore: int("totalTechScore").notNull(),
  },
  (table) => {
    return {
      ongekiTechEventRankingUk: unique("ongeki_tech_event_ranking_uk").on(
        table.user,
        table.eventId
      ),
    };
  }
);

export const ongekiUserBoss = mysqlTable(
  "ongeki_user_boss",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    musicId: int("musicId").default("NULL"),
    damage: int("damage").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    eventId: int("eventId").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserBossUk: unique("ongeki_user_boss_uk").on(
        table.user,
        table.musicId,
        table.eventId
      ),
    };
  }
);

export const ongekiUserCard = mysqlTable(
  "ongeki_user_card",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    cardId: int("cardId").default("NULL"),
    digitalStock: int("digitalStock").default("NULL"),
    analogStock: int("analogStock").default("NULL"),
    level: int("level").default("NULL"),
    maxLevel: int("maxLevel").default("NULL"),
    exp: int("exp").default("NULL"),
    printCount: int("printCount").default("NULL"),
    useCount: int("useCount").default("NULL"),
    isNew: tinyint("isNew").default("NULL"),
    kaikaDate: varchar("kaikaDate", { length: 25 }).default("NULL"),
    choKaikaDate: varchar("choKaikaDate", { length: 25 }).default("NULL"),
    skillId: int("skillId").default("NULL"),
    isAcquired: tinyint("isAcquired").default("NULL"),
    created: varchar("created", { length: 25 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiUserCardUk: unique("ongeki_user_card_uk").on(
        table.user,
        table.cardId
      ),
    };
  }
);

export const ongekiUserChapter = mysqlTable(
  "ongeki_user_chapter",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chapterId: int("chapterId").default("NULL"),
    jewelCount: int("jewelCount").default("NULL"),
    isStoryWatched: tinyint("isStoryWatched").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    lastPlayMusicId: int("lastPlayMusicId").default("NULL"),
    lastPlayMusicCategory: int("lastPlayMusicCategory").default("NULL"),
    lastPlayMusicLevel: int("lastPlayMusicLevel").default("NULL"),
    skipTiming1: int("skipTiming1").default("NULL"),
    skipTiming2: int("skipTiming2").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserChapterUk: unique("ongeki_user_chapter_uk").on(
        table.user,
        table.chapterId
      ),
    };
  }
);

export const ongekiUserCharacter = mysqlTable(
  "ongeki_user_character",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    characterId: int("characterId").default("NULL"),
    costumeId: int("costumeId").default("NULL"),
    attachmentId: int("attachmentId").default("NULL"),
    playCount: int("playCount").default("NULL"),
    intimateLevel: int("intimateLevel").default("NULL"),
    intimateCount: int("intimateCount").default("NULL"),
    intimateCountRewarded: int("intimateCountRewarded").default("NULL"),
    intimateCountDate: varchar("intimateCountDate", { length: 25 }).default(
      "NULL"
    ),
    isNew: tinyint("isNew").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserCharacterUk: unique("ongeki_user_character_uk").on(
        table.user,
        table.characterId
      ),
    };
  }
);

export const ongekiUserDeck = mysqlTable(
  "ongeki_user_deck",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    deckId: int("deckId").default("NULL"),
    cardId1: int("cardId1").default("NULL"),
    cardId2: int("cardId2").default("NULL"),
    cardId3: int("cardId3").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserDeckUk: unique("ongeki_user_deck_uk").on(
        table.user,
        table.deckId
      ),
    };
  }
);

export const ongekiUserEventMusic = mysqlTable(
  "ongeki_user_event_music",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    eventId: int("eventId").default("NULL"),
    type: int("type").default("NULL"),
    musicId: int("musicId").default("NULL"),
    level: int("level").default("NULL"),
    techScoreMax: int("techScoreMax").default("NULL"),
    platinumScoreMax: int("platinumScoreMax").default("NULL"),
    techRecordDate: varchar("techRecordDate", { length: 25 }).default("NULL"),
    isTechNewRecord: tinyint("isTechNewRecord").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserEventMusic: unique("ongeki_user_event_music").on(
        table.user,
        table.eventId,
        table.type,
        table.musicId,
        table.level
      ),
    };
  }
);

export const ongekiUserEventPoint = mysqlTable(
  "ongeki_user_event_point",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    eventId: int("eventId").notNull(),
    point: int("point").notNull(),
    rank: int("rank").default("NULL"),
    type: int("type").notNull(),
    date: varchar("date", { length: 25 }).default("NULL"),
    isRankingRewarded: tinyint("isRankingRewarded").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserEventPointUk: unique("ongeki_user_event_point_uk").on(
        table.user,
        table.eventId
      ),
    };
  }
);

export const ongekiUserGacha = mysqlTable(
  "ongeki_user_gacha",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    gachaId: int("gachaId").notNull(),
    totalGachaCnt: int("totalGachaCnt").default(0),
    ceilingGachaCnt: int("ceilingGachaCnt").default(0),
    selectPoint: int("selectPoint").default(0),
    useSelectPoint: int("useSelectPoint").default(0),
    dailyGachaCnt: int("dailyGachaCnt").default(0),
    fiveGachaCnt: int("fiveGachaCnt").default(0),
    elevenGachaCnt: int("elevenGachaCnt").default(0),
    dailyGachaDate: timestamp("dailyGachaDate", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      ongekiUserGachaUk: unique("ongeki_user_gacha_uk").on(
        table.user,
        table.gachaId
      ),
    };
  }
);

export const ongekiUserGachaSupply = mysqlTable(
  "ongeki_user_gacha_supply",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    cardId: int("cardId").notNull(),
  },
  (table) => {
    return {
      ongekiUserGachaSupplyUk: unique("ongeki_user_gacha_supply_uk").on(
        table.user,
        table.cardId
      ),
    };
  }
);

export const ongekiUserItem = mysqlTable(
  "ongeki_user_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemKind: int("itemKind").default("NULL"),
    itemId: int("itemId").default("NULL"),
    stock: int("stock").default("NULL"),
    isValid: tinyint("isValid").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserItemUk: unique("ongeki_user_item_uk").on(
        table.user,
        table.itemKind,
        table.itemId
      ),
    };
  }
);

export const ongekiUserLoginBonus = mysqlTable(
  "ongeki_user_login_bonus",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    bonusId: int("bonusId").default("NULL"),
    bonusCount: int("bonusCount").default("NULL"),
    lastUpdateDate: varchar("lastUpdateDate", { length: 25 }).default("NULL"),
  },
  (table) => {
    return {
      ongekiUserLoginBonusUk: unique("ongeki_user_login_bonus_uk").on(
        table.user,
        table.bonusId
      ),
    };
  }
);

export const ongekiUserMemorychapter = mysqlTable(
  "ongeki_user_memorychapter",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chapterId: int("chapterId").default("NULL"),
    gaugeId: int("gaugeId").default("NULL"),
    gaugeNum: int("gaugeNum").default("NULL"),
    jewelCount: int("jewelCount").default("NULL"),
    isStoryWatched: tinyint("isStoryWatched").default("NULL"),
    isBossWatched: tinyint("isBossWatched").default("NULL"),
    isDialogWatched: tinyint("isDialogWatched").default("NULL"),
    isEndingWatched: tinyint("isEndingWatched").default("NULL"),
    isClear: tinyint("isClear").default("NULL"),
    lastPlayMusicId: int("lastPlayMusicId").default("NULL"),
    lastPlayMusicLevel: int("lastPlayMusicLevel").default("NULL"),
    lastPlayMusicCategory: int("lastPlayMusicCategory").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserMemorychapterUk: unique("ongeki_user_memorychapter_uk").on(
        table.user,
        table.chapterId
      ),
    };
  }
);

export const ongekiUserMissionPoint = mysqlTable(
  "ongeki_user_mission_point",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").default("NULL"),
    eventId: int("eventId").default("NULL"),
    point: int("point").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserMissionPointUk: unique("ongeki_user_mission_point_uk").on(
        table.user,
        table.eventId
      ),
    };
  }
);

export const ongekiUserMusicItem = mysqlTable(
  "ongeki_user_music_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    musicId: int("musicId").default("NULL"),
    status: int("status").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserMusicItemUk: unique("ongeki_user_music_item_uk").on(
        table.user,
        table.musicId
      ),
    };
  }
);

export const ongekiUserPrintDetail = mysqlTable(
  "ongeki_user_print_detail",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    cardId: int("cardId").notNull(),
    cardType: int("cardType").default(0),
    printDate: timestamp("printDate", { mode: "string" }).notNull(),
    serialId: varchar("serialId", { length: 20 }).notNull(),
    placeId: int("placeId").notNull(),
    clientId: varchar("clientId", { length: 11 }).notNull(),
    printerSerialId: varchar("printerSerialId", { length: 20 }).notNull(),
    isHolograph: tinyint("isHolograph").default(0),
    isAutographed: tinyint("isAutographed").default(0),
    printOption1: tinyint("printOption1").default(1),
    printOption2: tinyint("printOption2").default(1),
    printOption3: tinyint("printOption3").default(1),
    printOption4: tinyint("printOption4").default(1),
    printOption5: tinyint("printOption5").default(1),
    printOption6: tinyint("printOption6").default(1),
    printOption7: tinyint("printOption7").default(1),
    printOption8: tinyint("printOption8").default(1),
    printOption9: tinyint("printOption9").default(1),
    printOption10: tinyint("printOption10").default(0),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
      ongekiUserPrintDetailUk: unique("ongeki_user_print_detail_uk").on(
        table.serialId
      ),
    };
  }
);

export const ongekiUserScenerio = mysqlTable(
  "ongeki_user_scenerio",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    scenarioId: int("scenarioId").default("NULL"),
    playCount: int("playCount").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserScenerioUk: unique("ongeki_user_scenerio_uk").on(
        table.user,
        table.scenarioId
      ),
    };
  }
);

export const ongekiUserStory = mysqlTable(
  "ongeki_user_story",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    storyId: int("storyId").default("NULL"),
    jewelCount: int("jewelCount").default("NULL"),
    lastChapterId: int("lastChapterId").default("NULL"),
    lastPlayMusicId: int("lastPlayMusicId").default("NULL"),
    lastPlayMusicCategory: int("lastPlayMusicCategory").default("NULL"),
    lastPlayMusicLevel: int("lastPlayMusicLevel").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserStoryUk: unique("ongeki_user_story_uk").on(
        table.user,
        table.storyId
      ),
    };
  }
);

export const ongekiUserTechEvent = mysqlTable(
  "ongeki_user_tech_event",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").notNull(),
    eventId: int("eventId").notNull(),
    totalTechScore: int("totalTechScore").notNull(),
    totalPlatinumScore: int("totalPlatinumScore").notNull(),
    techRecordDate: varchar("techRecordDate", { length: 25 }).default("NULL"),
    isRankingRewarded: tinyint("isRankingRewarded").default("NULL"),
    isTotalTechNewRecord: tinyint("isTotalTechNewRecord").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserTechEventUk: unique("ongeki_user_tech_event_uk").on(
        table.user,
        table.eventId
      ),
    };
  }
);

export const ongekiUserTradeItem = mysqlTable(
  "ongeki_user_trade_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .default("NULL")
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    chapterId: int("chapterId").default("NULL"),
    tradeItemId: int("tradeItemId").default("NULL"),
    tradeCount: int("tradeCount").default("NULL"),
  },
  (table) => {
    return {
      ongekiUserTradeItemUk: unique("ongeki_user_trade_item_uk").on(
        table.user,
        table.chapterId,
        table.tradeItemId
      ),
    };
  }
);

export const pokkenItem = mysqlTable(
  "pokken_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    category: int("category").default("NULL"),
    content: int("content").default("NULL"),
    type: int("type").default("NULL"),
  },
  (table) => {
    return {
      user: unique("user").on(table.user),
      pokkenItemUk: unique("pokken_item_uk").on(
        table.user,
        table.category,
        table.content,
        table.type
      ),
    };
  }
);

export const pokkenMatchData = mysqlTable(
  "pokken_match_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    numGames: int("num_games").default("NULL"),
    playModes: longtext("play_modes").default("NULL"),
    results: longtext("results").default("NULL"),
    exKoNum: int("ex_ko_num").default("NULL"),
    wkoNum: int("wko_num").default("NULL"),
    timeupWinNum: int("timeup_win_num").default("NULL"),
    coolKoNum: int("cool_ko_num").default("NULL"),
    perfectKoNum: int("perfect_ko_num").default("NULL"),
    useNavi: int("use_navi").default("NULL"),
    useNaviCloth: int("use_navi_cloth").default("NULL"),
    useAidSkill: int("use_aid_skill").default("NULL"),
    playDate: timestamp("play_date", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const pokkenPokemonData = mysqlTable(
  "pokken_pokemon_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    charId: int("char_id").notNull(),
    illustrationBookNo: int("illustration_book_no").default("NULL"),
    pokemonExp: int("pokemon_exp").default("NULL"),
    battleNumVsWan: int("battle_num_vs_wan").default("NULL"),
    winVsWan: int("win_vs_wan").default("NULL"),
    battleNumVsLan: int("battle_num_vs_lan").default("NULL"),
    winVsLan: int("win_vs_lan").default("NULL"),
    battleNumVsCpu: int("battle_num_vs_cpu").default("NULL"),
    winCpu: int("win_cpu").default("NULL"),
    battleAllNumTutorial: int("battle_all_num_tutorial").default("NULL"),
    battleNumTutorial: int("battle_num_tutorial").default("NULL"),
    bpPointAtk: int("bp_point_atk").default("NULL"),
    bpPointRes: int("bp_point_res").default("NULL"),
    bpPointDef: int("bp_point_def").default("NULL"),
    bpPointSp: int("bp_point_sp").default("NULL"),
  },
  (table) => {
    return {
      pokkenPokemonDataUk: unique("pokken_pokemon_data_uk").on(
        table.user,
        table.charId
      ),
    };
  }
);

export const pokkenProfile = mysqlTable(
  "pokken_profile",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    trainerName: varchar("trainer_name", { length: 16 }).default("NULL"),
    homeRegionCode: int("home_region_code").default("NULL"),
    homeLocName: varchar("home_loc_name", { length: 255 }).default("NULL"),
    prefCode: int("pref_code").default("NULL"),
    naviNewbieFlag: tinyint("navi_newbie_flag").default("NULL"),
    naviEnableFlag: tinyint("navi_enable_flag").default("NULL"),
    padVibrateFlag: tinyint("pad_vibrate_flag").default("NULL"),
    trainerRankPoint: int("trainer_rank_point").default("NULL"),
    wallet: int("wallet").default("NULL"),
    fightMoney: int("fight_money").default("NULL"),
    scorePoint: int("score_point").default("NULL"),
    gradeMaxNum: int("grade_max_num").default("NULL"),
    extraCounter: int("extra_counter").default("NULL"),
    tutorialProgressFlag: longtext("tutorial_progress_flag").default("NULL"),
    totalPlayDays: int("total_play_days").default("NULL"),
    playDateTime: int("play_date_time").default("NULL"),
    achievementFlag: longtext("achievement_flag").default("NULL"),
    luckyBoxFailNum: int("lucky_box_fail_num").default("NULL"),
    eventRewardGetFlag: int("event_reward_get_flag").default("NULL"),
    rankPvpAll: int("rank_pvp_all").default("NULL"),
    rankPvpLoc: int("rank_pvp_loc").default("NULL"),
    rankCpuAll: int("rank_cpu_all").default("NULL"),
    rankCpuLoc: int("rank_cpu_loc").default("NULL"),
    rankEvent: int("rank_event").default("NULL"),
    awakeNum: int("awake_num").default("NULL"),
    useSupportNum: int("use_support_num").default("NULL"),
    rankmatchFlag: int("rankmatch_flag").default("NULL"),
    rankmatchMax: int("rankmatch_max").default("NULL"),
    rankmatchProgress: longtext("rankmatch_progress").default("NULL"),
    rankmatchSuccess: int("rankmatch_success").default("NULL"),
    beatNum: int("beat_num").default("NULL"),
    titleTextId: int("title_text_id").default("NULL"),
    titlePlateId: int("title_plate_id").default("NULL"),
    titleDecorationId: int("title_decoration_id").default("NULL"),
    supportPokemonList: longtext("support_pokemon_list").default("NULL"),
    supportSet11: int("support_set_1_1").default("NULL"),
    supportSet12: int("support_set_1_2").default("NULL"),
    supportSet21: int("support_set_2_1").default("NULL"),
    supportSet22: int("support_set_2_2").default("NULL"),
    supportSet31: int("support_set_3_1").default("NULL"),
    supportSet32: int("support_set_3_2").default("NULL"),
    naviTrainer: int("navi_trainer").default("NULL"),
    naviVersionId: int("navi_version_id").default("NULL"),
    aidSkillList: longtext("aid_skill_list").default("NULL"),
    aidSkill: int("aid_skill").default("NULL"),
    commentTextId: int("comment_text_id").default("NULL"),
    commentWordId: int("comment_word_id").default("NULL"),
    latestUsePokemon: int("latest_use_pokemon").default("NULL"),
    exKoNum: int("ex_ko_num").default("NULL"),
    wkoNum: int("wko_num").default("NULL"),
    timeupWinNum: int("timeup_win_num").default("NULL"),
    coolKoNum: int("cool_ko_num").default("NULL"),
    perfectKoNum: int("perfect_ko_num").default("NULL"),
    recordFlag: int("record_flag").default("NULL"),
    continueNum: int("continue_num").default("NULL"),
    avatarBody: int("avatar_body").default("NULL"),
    avatarGender: int("avatar_gender").default("NULL"),
    avatarBackground: int("avatar_background").default("NULL"),
    avatarHead: int("avatar_head").default("NULL"),
    avatarBattleglass: int("avatar_battleglass").default("NULL"),
    avatarFace0: int("avatar_face0").default("NULL"),
    avatarFace1: int("avatar_face1").default("NULL"),
    avatarFace2: int("avatar_face2").default("NULL"),
    avatarBodyall: int("avatar_bodyall").default("NULL"),
    avatarWear: int("avatar_wear").default("NULL"),
    avatarAccessory: int("avatar_accessory").default("NULL"),
    avatarStamp: int("avatar_stamp").default("NULL"),
    eventState: int("event_state").default("NULL"),
    eventId: int("event_id").default("NULL"),
    spBonusCategoryId1: int("sp_bonus_category_id_1").default("NULL"),
    spBonusKeyValue1: int("sp_bonus_key_value_1").default("NULL"),
    spBonusCategoryId2: int("sp_bonus_category_id_2").default("NULL"),
    spBonusKeyValue2: int("sp_bonus_key_value_2").default("NULL"),
    lastPlayEventId: int("last_play_event_id").default("NULL"),
    eventAchievementFlag: longtext("event_achievement_flag").default("NULL"),
    eventAchievementParam: longtext("event_achievement_param").default("NULL"),
    battleNumVsWan: int("battle_num_vs_wan").default("NULL"),
    winVsWan: int("win_vs_wan").default("NULL"),
    battleNumVsLan: int("battle_num_vs_lan").default("NULL"),
    winVsLan: int("win_vs_lan").default("NULL"),
    battleNumVsCpu: int("battle_num_vs_cpu").default("NULL"),
    winCpu: int("win_cpu").default("NULL"),
    battleNumTutorial: int("battle_num_tutorial").default("NULL"),
  },
  (table) => {
    return {
      user: unique("user").on(table.user),
    };
  }
);

export const saoEndSessions = mysqlTable(
  "sao_end_sessions",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    questId: int("quest_id").notNull(),
    playResultFlag: tinyint("play_result_flag").notNull(),
    rewardData: longtext("reward_data").default("NULL"),
    playDate: timestamp("play_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const saoEquipmentData = mysqlTable(
  "sao_equipment_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    equipmentId: int("equipment_id").notNull(),
    enhancementValue: int("enhancement_value").notNull(),
    enhancementExp: int("enhancement_exp").notNull(),
    awakeningExp: int("awakening_exp").notNull(),
    awakeningStage: int("awakening_stage").notNull(),
    possibleAwakeningFlag: int("possible_awakening_flag").notNull(),
    getDate: timestamp("get_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      saoEquipmentDataUk: unique("sao_equipment_data_uk").on(
        table.user,
        table.equipmentId
      ),
    };
  }
);

export const saoHeroLogData = mysqlTable(
  "sao_hero_log_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userHeroLogId: int("user_hero_log_id").notNull(),
    logLevel: int("log_level").notNull(),
    logExp: int("log_exp").notNull(),
    mainWeapon: int("main_weapon").notNull(),
    subEquipment: int("sub_equipment").notNull(),
    skillSlot1SkillId: int("skill_slot1_skill_id").notNull(),
    skillSlot2SkillId: int("skill_slot2_skill_id").notNull(),
    skillSlot3SkillId: int("skill_slot3_skill_id").notNull(),
    skillSlot4SkillId: int("skill_slot4_skill_id").notNull(),
    skillSlot5SkillId: int("skill_slot5_skill_id").notNull(),
    getDate: timestamp("get_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      saoHeroLogDataUk: unique("sao_hero_log_data_uk").on(
        table.user,
        table.userHeroLogId
      ),
    };
  }
);

export const saoHeroParty = mysqlTable(
  "sao_hero_party",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userPartyTeamId: int("user_party_team_id").notNull(),
    userHeroLogId1: int("user_hero_log_id_1").notNull(),
    userHeroLogId2: int("user_hero_log_id_2").notNull(),
    userHeroLogId3: int("user_hero_log_id_3").notNull(),
  },
  (table) => {
    return {
      saoHeroPartyUk: unique("sao_hero_party_uk").on(
        table.user,
        table.userPartyTeamId
      ),
    };
  }
);

export const saoItemData = mysqlTable(
  "sao_item_data",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemId: int("item_id").notNull(),
    getDate: timestamp("get_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      saoItemDataUk: unique("sao_item_data_uk").on(table.user, table.itemId),
    };
  }
);

export const saoPlayerQuest = mysqlTable(
  "sao_player_quest",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    episodeId: int("episode_id").notNull(),
    questClearFlag: tinyint("quest_clear_flag").notNull(),
    clearTime: int("clear_time").notNull(),
    comboNum: int("combo_num").notNull(),
    totalDamage: int("total_damage").notNull(),
    concurrentDestroyingNum: int("concurrent_destroying_num").notNull(),
    playDate: timestamp("play_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      saoPlayerQuestUk: unique("sao_player_quest_uk").on(
        table.user,
        table.episodeId
      ),
    };
  }
);

export const saoPlaySessions = mysqlTable(
  "sao_play_sessions",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userPartyTeamId: int("user_party_team_id").notNull(),
    episodeId: int("episode_id").notNull(),
    playMode: int("play_mode").notNull(),
    questDropBoostApplyFlag: int("quest_drop_boost_apply_flag").notNull(),
    playDate: timestamp("play_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      saoPlaySessionsUk: unique("sao_play_sessions_uk").on(
        table.user,
        table.userPartyTeamId,
        table.playDate
      ),
    };
  }
);

export const saoProfile = mysqlTable(
  "sao_profile",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    userType: int("user_type").default(1),
    nickName: varchar("nick_name", { length: 16 }).default("PLAYER"),
    rankNum: int("rank_num").default(1),
    rankExp: int("rank_exp").default(0),
    ownCol: int("own_col").default(0),
    ownVp: int("own_vp").default(300),
    ownYuiMedal: int("own_yui_medal").default(0),
    settingTitleId: int("setting_title_id").default(20005),
  },
  (table) => {
    return {
      user: unique("user").on(table.user),
    };
  }
);

export const saoStaticEquipmentList = mysqlTable(
  "sao_static_equipment_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    equipmentId: int("equipmentId").default("NULL"),
    equipmentType: int("equipmentType").default("NULL"),
    weaponTypeId: int("weaponTypeId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    rarity: int("rarity").default("NULL"),
    flavorText: varchar("flavorText", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticEquipmentListUk: unique("sao_static_equipment_list_uk").on(
        table.version,
        table.equipmentId
      ),
    };
  }
);

export const saoStaticHeroList = mysqlTable(
  "sao_static_hero_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    heroLogId: int("heroLogId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    nickname: varchar("nickname", { length: 255 }).default("NULL"),
    rarity: int("rarity").default("NULL"),
    skillTableSubId: int("skillTableSubId").default("NULL"),
    awakeningExp: int("awakeningExp").default("NULL"),
    flavorText: varchar("flavorText", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticHeroListUk: unique("sao_static_hero_list_uk").on(
        table.version,
        table.heroLogId
      ),
    };
  }
);

export const saoStaticItemList = mysqlTable(
  "sao_static_item_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    itemId: int("itemId").default("NULL"),
    itemTypeId: int("itemTypeId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    rarity: int("rarity").default("NULL"),
    flavorText: varchar("flavorText", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticItemListUk: unique("sao_static_item_list_uk").on(
        table.version,
        table.itemId
      ),
    };
  }
);

export const saoStaticQuest = mysqlTable(
  "sao_static_quest",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    questSceneId: int("questSceneId").default("NULL"),
    sortNo: int("sortNo").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticQuestUk: unique("sao_static_quest_uk").on(
        table.version,
        table.questSceneId
      ),
    };
  }
);

export const saoStaticRareDropList = mysqlTable(
  "sao_static_rare_drop_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    questRareDropId: int("questRareDropId").default("NULL"),
    commonRewardId: int("commonRewardId").default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticRareDropListUk: unique("sao_static_rare_drop_list_uk").on(
        table.version,
        table.questRareDropId,
        table.commonRewardId
      ),
    };
  }
);

export const saoStaticSupportLogList = mysqlTable(
  "sao_static_support_log_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    supportLogId: int("supportLogId").default("NULL"),
    charaId: int("charaId").default("NULL"),
    name: varchar("name", { length: 255 }).default("NULL"),
    rarity: int("rarity").default("NULL"),
    salePrice: int("salePrice").default("NULL"),
    skillName: varchar("skillName", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticSupportLogListUk: unique("sao_static_support_log_list_uk").on(
        table.version,
        table.supportLogId
      ),
    };
  }
);

export const saoStaticTitleList = mysqlTable(
  "sao_static_title_list",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").default("NULL"),
    titleId: int("titleId").default("NULL"),
    displayName: varchar("displayName", { length: 255 }).default("NULL"),
    requirement: int("requirement").default("NULL"),
    rank: int("rank").default("NULL"),
    imageFilePath: varchar("imageFilePath", { length: 255 }).default("NULL"),
    enabled: tinyint("enabled").default("NULL"),
  },
  (table) => {
    return {
      saoStaticTitleListUk: unique("sao_static_title_list_uk").on(
        table.version,
        table.titleId
      ),
    };
  }
);

export const waccaBingo = mysqlTable(
  "wacca_bingo",
  {
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    pageNumber: int("page_number").notNull(),
    pageProgress: longtext("page_progress").notNull(),
  },
  (table) => {
    return {
      waccaBingoUk: unique("wacca_bingo_uk").on(table.user, table.pageNumber),
    };
  }
);

export const waccaFavoriteSong = mysqlTable(
  "wacca_favorite_song",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    songId: int("song_id").notNull(),
  },
  (table) => {
    return {
      waccaFavoriteSongUk: unique("wacca_favorite_song_uk").on(
        table.user,
        table.songId
      ),
    };
  }
);

export const waccaFriend = mysqlTable(
  "wacca_friend",
  {
    profileSender: int("profile_sender")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    profileReciever: int("profile_reciever")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    isAccepted: tinyint("is_accepted").default(0),
  },
  (table) => {
    return {
      profileReciever: index("profile_reciever").on(table.profileReciever),
    };
  }
);

export const waccaGate = mysqlTable(
  "wacca_gate",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    gateId: int("gate_id").notNull(),
    page: int("page").default(0).notNull(),
    progress: int("progress").default(0).notNull(),
    loops: int("loops").default(0).notNull(),
    lastUsed: timestamp("last_used", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    missionFlag: int("mission_flag").default(0).notNull(),
    totalPoints: int("total_points").default(0).notNull(),
  },
  (table) => {
    return {
      waccaGateUk: unique("wacca_gate_uk").on(table.user, table.gateId),
    };
  }
);

export const waccaItem = mysqlTable(
  "wacca_item",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    itemId: int("item_id").notNull(),
    type: int("type").notNull(),
    acquireDate: timestamp("acquire_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    useCount: int("use_count").default(0),
  },
  (table) => {
    return {
      waccaItemUk: unique("wacca_item_uk").on(
        table.user,
        table.itemId,
        table.type
      ),
    };
  }
);

export const waccaOption = mysqlTable(
  "wacca_option",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    optId: int("opt_id").notNull(),
    value: int("value").notNull(),
  },
  (table) => {
    return {
      waccaOptionUk: unique("wacca_option_uk").on(table.user, table.optId),
    };
  }
);

export const waccaProfile = mysqlTable(
  "wacca_profile",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").default("NULL"),
    username: varchar("username", { length: 8 }).notNull(),
    xp: int("xp").default(0),
    wp: int("wp").default(0),
    wpTotal: int("wp_total").default(0),
    wpSpent: int("wp_spent").default(0),
    danType: int("dan_type").default(0),
    danLevel: int("dan_level").default(0),
    title0: int("title_0").default(0),
    title1: int("title_1").default(0),
    title2: int("title_2").default(0),
    rating: int("rating").default(0),
    vipExpireTime: timestamp("vip_expire_time", { mode: "string" }).default(
      "NULL"
    ),
    alwaysVip: tinyint("always_vip").default(0),
    loginCount: int("login_count").default(0),
    loginCountConsec: int("login_count_consec").default(0),
    loginCountDays: int("login_count_days").default(0),
    loginCountDaysConsec: int("login_count_days_consec").default(0),
    loginCountToday: int("login_count_today").default(0),
    playcountSingle: int("playcount_single").default(0),
    playcountMultiVs: int("playcount_multi_vs").default(0),
    playcountMultiCoop: int("playcount_multi_coop").default(0),
    playcountStageup: int("playcount_stageup").default(0),
    playcountTimeFree: int("playcount_time_free").default(0),
    friendView1: int("friend_view_1").default("NULL"),
    friendView2: int("friend_view_2").default("NULL"),
    friendView3: int("friend_view_3").default("NULL"),
    lastGameVer: varchar("last_game_ver", { length: 50 }).default("NULL"),
    lastSongId: int("last_song_id").default(0),
    lastSongDifficulty: int("last_song_difficulty").default(0),
    lastFolderOrder: int("last_folder_order").default(0),
    lastFolderId: int("last_folder_id").default(0),
    lastSongOrder: int("last_song_order").default(0),
    lastLoginDate: timestamp("last_login_date", { mode: "string" }).default(
      "current_timestamp()"
    ),
    gateTutorialFlags: longtext("gate_tutorial_flags").default("NULL"),
  },
  (table) => {
    return {
      waccaProfileUk: unique("wacca_profile_uk").on(table.user, table.version),
    };
  }
);

export const waccaScoreBest = mysqlTable(
  "wacca_score_best",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    songId: int("song_id").default("NULL"),
    chartId: int("chart_id").default("NULL"),
    score: int("score").default("NULL"),
    playCt: int("play_ct").default("NULL"),
    clearCt: int("clear_ct").default("NULL"),
    misslessCt: int("missless_ct").default("NULL"),
    fullcomboCt: int("fullcombo_ct").default("NULL"),
    allmarvCt: int("allmarv_ct").default("NULL"),
    gradeDCt: int("grade_d_ct").default("NULL"),
    gradeCCt: int("grade_c_ct").default("NULL"),
    gradeBCt: int("grade_b_ct").default("NULL"),
    gradeACt: int("grade_a_ct").default("NULL"),
    gradeAaCt: int("grade_aa_ct").default("NULL"),
    gradeAaaCt: int("grade_aaa_ct").default("NULL"),
    gradeSCt: int("grade_s_ct").default("NULL"),
    gradeSsCt: int("grade_ss_ct").default("NULL"),
    gradeSssCt: int("grade_sss_ct").default("NULL"),
    gradeMasterCt: int("grade_master_ct").default("NULL"),
    gradeSpCt: int("grade_sp_ct").default("NULL"),
    gradeSspCt: int("grade_ssp_ct").default("NULL"),
    gradeSsspCt: int("grade_sssp_ct").default("NULL"),
    bestCombo: int("best_combo").default("NULL"),
    lowestMissCt: int("lowest_miss_ct").default("NULL"),
    rating: int("rating").default("NULL"),
  },
  (table) => {
    return {
      waccaScoreUk: unique("wacca_score_uk").on(
        table.user,
        table.songId,
        table.chartId
      ),
    };
  }
);

export const waccaScorePlaylog = mysqlTable(
  "wacca_score_playlog",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    songId: int("song_id").default("NULL"),
    chartId: int("chart_id").default("NULL"),
    score: int("score").default("NULL"),
    clear: int("clear").default("NULL"),
    grade: int("grade").default("NULL"),
    maxCombo: int("max_combo").default("NULL"),
    marvCt: int("marv_ct").default("NULL"),
    greatCt: int("great_ct").default("NULL"),
    goodCt: int("good_ct").default("NULL"),
    missCt: int("miss_ct").default("NULL"),
    fastCt: int("fast_ct").default("NULL"),
    lateCt: int("late_ct").default("NULL"),
    season: int("season").default("NULL"),
    dateScored: timestamp("date_scored", { mode: "string" }).default(
      "current_timestamp()"
    ),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const waccaScoreStageup = mysqlTable(
  "wacca_score_stageup",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    version: int("version").default("NULL"),
    stageId: int("stage_id").default("NULL"),
    clearStatus: int("clear_status").default("NULL"),
    clearSongCt: int("clear_song_ct").default("NULL"),
    song1Score: int("song1_score").default("NULL"),
    song2Score: int("song2_score").default("NULL"),
    song3Score: int("song3_score").default("NULL"),
    playCt: int("play_ct").default(1),
  },
  (table) => {
    return {
      waccaScoreStageupUk: unique("wacca_score_stageup_uk").on(
        table.user,
        table.stageId
      ),
    };
  }
);

export const waccaSongUnlock = mysqlTable(
  "wacca_song_unlock",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    songId: int("song_id").notNull(),
    highestDifficulty: int("highest_difficulty").notNull(),
    acquireDate: timestamp("acquire_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
  },
  (table) => {
    return {
      waccaSongUnlockUk: unique("wacca_song_unlock_uk").on(
        table.user,
        table.songId
      ),
    };
  }
);

export const waccaStaticMusic = mysqlTable(
  "wacca_static_music",
  {
    id: int("id").autoincrement().notNull(),
    version: int("version").notNull(),
    songId: int("songId").default("NULL"),
    chartId: int("chartId").default("NULL"),
    title: varchar("title", { length: 255 }).default("NULL"),
    artist: varchar("artist", { length: 255 }).default("NULL"),
    bpm: varchar("bpm", { length: 255 }).default("NULL"),
    difficulty: float("difficulty").default("NULL"),
    chartDesigner: varchar("chartDesigner", { length: 255 }).default("NULL"),
    jacketFile: varchar("jacketFile", { length: 255 }).default("NULL"),
  },
  (table) => {
    return {
      waccaStaticMusicUk: unique("wacca_static_music_uk").on(
        table.version,
        table.songId,
        table.chartId
      ),
    };
  }
);

export const waccaTicket = mysqlTable(
  "wacca_ticket",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    ticketId: int("ticket_id").notNull(),
    acquireDate: timestamp("acquire_date", { mode: "string" })
      .default("current_timestamp()")
      .notNull(),
    expireDate: timestamp("expire_date", { mode: "string" }).default("NULL"),
  },
  (table) => {
    return {
      user: index("user").on(table.user),
    };
  }
);

export const waccaTrophy = mysqlTable(
  "wacca_trophy",
  {
    id: int("id").autoincrement().notNull(),
    user: int("user")
      .notNull()
      .references(() => aimeUser.id, {
        onDelete: "cascade",
        onUpdate: "cascade",
      }),
    trophyId: int("trophy_id").notNull(),
    season: int("season").notNull(),
    progress: int("progress").default(0).notNull(),
    badgeType: int("badge_type").default(0).notNull(),
  },
  (table) => {
    return {
      waccaTrophyUk: unique("wacca_trophy_uk").on(
        table.user,
        table.trophyId,
        table.season
      ),
    };
  }
);
