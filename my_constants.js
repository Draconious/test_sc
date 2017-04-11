ROOM_NAME = "E8S92";
MY_SPAWN_NAME = "Spawn1";
ALT_SOURCE_OPEN_SPOTS = 2;

MAIN_CONTAINER_ID = "58ea138bd37c782e1ae1bc91";
ALT_CONTAINER_ID = "58ebb4e20e28fe4439704160";

STORAGE_ID = "58ecee3842a8116c58240440";

SOURCE_ID = "58dbc45c8283ff5308a3eeb9";
ALT_SOURCE_ID = "58dbc45c8283ff5308a3eeb8";

ROLE = {
    HARVEST: "harvester",
    UPGRADE: "upgrader",
    BUILD: "repairer",
    HAUL: "transferer",
    SCOUT: "scout"
};


UNIT_MAX = {
    HARVEST: 5,
    UPGRADE: 5,
    BUILD: 2,
    HAUL: 5,
    SCOUT: 1
};

UNIT_BASIC = {
    HARVEST: [WORK, WORK, CARRY, MOVE], //250
    UPGRADE: [WORK, WORK, CARRY, CARRY, MOVE], //350
    BUILD: [WORK, WORK, CARRY, CARRY, MOVE], //350
    HAUL: [CARRY, CARRY, CARRY, MOVE], //350
    SCOUT: [MOVE, MOVE, MOVE, MOVE, MOVE, RANGED_ATTACK] //400
};

UNIT_MEDIUM = {
    HARVEST: [WORK, WORK, CARRY, CARRY, MOVE], //350
    HAUL: [CARRY, CARRY, CARRY, CARRY, MOVE], //450
    UPGRADE: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE], //450
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
    WEST: "west",
    SOUTH: "south",
    NORTH: "north"
};

SCOUT_DIRECTION = {
    EAST: "east",
    WEST: "west"
};

SCOUT_ROOMS = {
    WEST: [
        "E9S92",
        "E9S93",
        "E9S94",
        "E8S94",
        "E8S93",
        "E7S93",
        "E6S93",
        "E6S92",
        "E7S92",
        "E8S92"
    ],
    EAST: [
        "E7S92",
        "E6S92",
        "E6S91",
        "E7S91",
        "E8S91",
        "E9S91",
        "E9S92",
        "E8S92",
        "E7S92",
        "E8S92"
    ],
    SOUTH: [
        "E9S92",
        "E9S93",
        "E9S94",
        "E9S93",
        "E9S92",
        "E8S92"
    ],
    NORTH: [
        "E6S93"
    ]
};