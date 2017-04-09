ROOM_NAME = "E8S92";
ALT_SOURCE_OPEN_SPOTS = 2;

ROLE = {
    HARVEST: "harvester",
    UPGRADE: "upgrader",
    BUILD: "repairer",
    HAUL: "transferer",
};

ALT_CONTAINER_ID = "58e92fc3bce38f9c0919dc56";

UNIT_MAX = {
    HARVEST: 6,
    UPGRADE: 5,
    BUILD: 3,
    HAUL: 3
};

UNIT_BASIC = {
    HARVEST: [WORK, WORK, CARRY, MOVE], //250
    UPGRADE: [WORK, WORK, CARRY, CARRY, MOVE], //350
    BUILD: [WORK, WORK, CARRY, CARRY, MOVE], //350
    HAUL: [CARRY, CARRY, CARRY, MOVE] //350
};

UNIT_MEDIUM = {
    HARVEST: [WORK, WORK, CARRY, CARRY, MOVE] //350
};

MY_FRIENDS = [
    "Zarakk"
];