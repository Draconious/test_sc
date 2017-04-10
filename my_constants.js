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
    BUILD: 2,
    HAUL: 4,
    SCOUT: 2
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
    UPGRADE: [WORK, WORK, WORK, WORK, CARRY, CARRY, MOVE] //450
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
    ]
};