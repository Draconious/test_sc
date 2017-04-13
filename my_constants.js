ROOM_NAME = "E8S92";
MY_SPAWN_NAME = "Spawn1";
ALT_SOURCE_OPEN_SPOTS = 2;

ROLE = {
    HARVEST: "harvester",
    UPGRADE: "upgrader",
    BUILD: "repairer",
    HAUL: "transferer",
    SCOUT: "scout"
};

ALT_CONTAINER_ID = "58eeba354601c18b200325a4";

COLOUR = {
    BLACK:"#000000",
    GREY:"#808080",
    SILVER:"#C0C0C0",
    WHITE:"#FFFFFF",
    MAROON:"#800000",
    RED:"#FF0000",
    OLIVE:"#808000",
    YELLOW:"#FFFF00",
    GREEN:"#008000",
    LIME:"#00FF00",
    TEAL:"#008080",
    AQUA:"#00FFFF",
    NAVY:"#000080",
    BLUE:"#0000FF",
    PURPLE:"#800080",
    FUCHSIA:"#FF00FF"
};

UNIT_MAX = {
    HARVEST: 4,
    UPGRADE: 5,
    BUILD: 3,
    HAUL: 5,
    SCOUT: 1
};

UNIT_COLOUR_IN = {
    HARVEST: COLOUR.BLACK,
    UPGRADE: COLOUR.SILVER,
    BUILD: COLOUR.MAROON,
    HAUL: COLOUR.OLIVE,
    SCOUT: COLOUR.GREEN
};

UNIT_COLOUR_OUT = {
    HARVEST: COLOUR.GREY,
    UPGRADE: COLOUR.WHITE,
    BUILD: COLOUR.RED,
    HAUL: COLOUR.YELLOW,
    SCOUT: COLOUR.LIME
};

UNIT_BASIC = {
    HARVEST: [WORK, CARRY, MOVE],
    UPGRADE: [WORK, CARRY, MOVE],
    BUILD: [WORK, CARRY, MOVE],
    HAUL: [CARRY, CARRY, MOVE],
    SCOUT: [MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK]
};

UNIT_MEDIUM = {
    HARVEST: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE],
    UPGRADE: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE, MOVE, MOVE],
    BUILD: [WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE],
    HAUL: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE],
    SCOUT: [MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK] //1200
};

UNIT_LARGE = {
    SCOUT: [TOUGH,TOUGH,TOUGH,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK] //1230
};

MY_FRIENDS = [
    "Zarakk"
];

SCOUT_DIRECTION = {
    EAST: "east",
    WEST: "west"
};

SCOUT_ROOMS = {
    WEST: [
        "E6S92",
        "E6S91",
        "E7S91",
        "E8S91",
        "E9S91"
    ],
    EAST: [
        "E9S92",
        "E9S93",
        "E8S93",
        "E7S93",
        "E6S93"
    ]
};