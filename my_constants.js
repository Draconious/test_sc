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

ALT_CONTAINER_ID = "58e92fc3bce38f9c0919dc56";

UNIT_MAX = {
    HARVEST: 6,
    UPGRADE: 5,
    BUILD: 3,
    HAUL: 4,
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
    HAUL: [CARRY, CARRY, CARRY, CARRY, MOVE] //450
};

MY_FRIENDS = [
    "Zarakk"
];

SCOUT_ROOMS = [
    "E9S92",
    "E9S91",
    "E8S91",
    "E7S91",
    "E6S91",
    "E6S92",
    "E6S93",
    "E7S93",
    "E8S93",
    "E9S93",
];