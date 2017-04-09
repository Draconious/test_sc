var ROOM_NAME = "E8S92";
var ALT_SOURCE_OPEN_SPOTS = 2;

var ROLE = {
    HARVEST: "harvester",
    UPGRADE: "upgrader",
    BUILD: "repairer",
    HAUL: "transferer",
};

var ALT_CONTAINER_ID = "58e92fc3bce38f9c0919dc56";

var UNIT_MAX = {
    HARVEST: 6,
    UPGRADE: 5,
    BUILD: 3,
    HAUL: 3
};

var UNIT_BASIC = {
    HARVEST: [WORK, WORK, CARRY, MOVE], //250
    UPGRADE: [WORK, WORK, CARRY, CARRY, MOVE], //350
    BUILD: [WORK, WORK, CARRY, CARRY, MOVE], //350
    HAUL: [CARRY, CARRY, CARRY, MOVE] //350
};

var UNIT_MEDIUM = {
    HARVEST: [WORK, WORK, CARRY, CARRY, MOVE] //350
};