var my_constants = require('my_constants');

var taskPopulate = {

    run: function () {
        var harvesterSource = 0;
        var harvesterCount = 0;

        var upgraderSource = 0;
        var upgraderCount = 0;

        var repairerSource = 0;
        var repairerCount = 0;

        var transfererSource = 0;
        var transfererCount = 0;

        for (var i in Game.creeps) {
            if (Game.creeps[i].memory.role === ROLE.HARVEST) {
                harvesterCount++;
                harvesterSource = harvesterSource + parseInt(Game.creeps[i].memory.source, 10);
            }
            if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
                upgraderCount++;
                upgraderSource = upgraderSource + parseInt(Game.creeps[i].memory.source, 10);
            }
            if (Game.creeps[i].memory.role === ROLE.BUILD) {
                repairerCount++;
                repairerSource = repairerSource + parseInt(Game.creeps[i].memory.source, 10);
            }
            if (Game.creeps[i].memory.role === ROLE.HAUL) {
                transfererCount++;
                transfererSource = transfererSource + parseInt(Game.creeps[i].memory.source, 10);
            }
        }

        if (harvesterCount < UNIT_MAX.HARVEST) {
            console.log("Create harvester " + harvesterCount + ", source " + (harvesterSource < UNIT_MAX.HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0));
            Game.spawns.Spawn1.createCreep((harvesterCount === 0 ? UNIT_BASIC.HARVEST : UNIT_MEDIUM.HARVEST), null, {role: ROLE.HARVEST, source: (harvesterSource < UNIT_MAX.HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0)});
        } else if (upgraderCount < UNIT_MAX.UPGRADE) {
            console.log("Create upgrader " + upgraderCount + ", source " + 1);
            Game.spawns.Spawn1.createCreep(UNIT_BASIC.UPGRADE, null, {role: ROLE.UPGRADE, source: 1});
        } else if (repairerCount < UNIT_MAX.BUILD) {
            console.log("Create repairer " + repairerCount + ", source " + (repairerSource < UNIT_MAX.BUILD - ALT_SOURCE_OPEN_SPOTS ? 1 : 0));
            Game.spawns.Spawn1.createCreep(UNIT_BASIC.BUILD, null, {role: ROLE.BUILD, source: (repairerSource < UNIT_MAX.BUILD - ALT_SOURCE_OPEN_SPOTS ? 1 : 0)});
        } else if (transfererCount < UNIT_MAX.HAUL) {
            console.log("Create transferer " + transfererCount + ", source " + 0);
            Game.spawns.Spawn1.createCreep(UNIT_BASIC.HAUL, null, {role: ROLE.HAUL, source: 0});
        }
    }
};

module.exports = taskPopulate;