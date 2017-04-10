var my_constants = require('my_constants');

var taskPopulate = {

    run: function () {
        var harvesterSource = 0;
        var scoutDirection = SCOUT_DIRECTION.WEST;

        var harvesterCount = 0;
        var upgraderCount = 0;
        var repairerCount = 0;
        var transfererCount = 0;
        var scoutCount = 0;

        for (var i in Game.creeps) {
            if (Game.creeps[i].memory.role === ROLE.HARVEST) {
                harvesterCount++;
                harvesterSource = harvesterSource + parseInt(Game.creeps[i].memory.source, 10);
            } else if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
                upgraderCount++;
            } else if (Game.creeps[i].memory.role === ROLE.BUILD) {
                repairerCount++;
            } else if (Game.creeps[i].memory.role === ROLE.HAUL) {
                transfererCount++;
            } else if (Game.creeps[i].memory.role === ROLE.SCOUT) {
                scoutCount++;
                scoutDirection = Game.creeps[i].memory.scoutDirection;
            }
        }

        if (harvesterCount < UNIT_MAX.HARVEST) {
            console.log("Create harvester " + harvesterCount + ", source " + (harvesterSource < UNIT_MAX.HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0));
            Game.spawns[MY_SPAWN_NAME].createCreep((harvesterCount === 0 ? UNIT_BASIC.HARVEST : UNIT_MEDIUM.HARVEST), null, {role: ROLE.HARVEST, source: (harvesterSource < UNIT_MAX.HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0)});
        } else if (upgraderCount < UNIT_MAX.UPGRADE) {
            console.log("Create upgrader " + upgraderCount + ", source " + 1);
            Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_BASIC.UPGRADE, null, {role: ROLE.UPGRADE, source: 1});
        } else if (repairerCount < UNIT_MAX.BUILD) {
            console.log("Create repairer " + repairerCount + ", source " + 1);
            Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_BASIC.BUILD, null, {role: ROLE.BUILD, source: 1});
        } else if (transfererCount < UNIT_MAX.HAUL) {
            console.log("Create transferer " + transfererCount + ", source " + 0);
            Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_MEDIUM.HAUL, null, {role: ROLE.HAUL, source: 0});
        } else if (scoutCount < UNIT_MAX.SCOUT) {
            console.log("Create scout " + scoutCount);
            Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_BASIC.SCOUT, null, {role: ROLE.SCOUT, scoutRooms: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_DIRECTION.WEST : SCOUT_DIRECTION.EAST)});
        }
    }
};

module.exports = taskPopulate;