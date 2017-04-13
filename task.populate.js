var my_constants = require('my_constants');

var taskPopulate = {

    run: function () {
        var harvesterSource = 0;
        var haulSource = 0;
        var scoutDirection = SCOUT_DIRECTION.WEST;

        var harvesterCount = 0;
        var upgraderCount = 0;
        var builderCount = 0;
        var haulerCount = 0;
        var scoutCount = 0;

        for (var i in Game.creeps) {
            if (Game.creeps[i].memory.role === ROLE.HARVEST) {
                harvesterCount++;
                harvesterSource = harvesterSource + parseInt(Game.creeps[i].memory.source, 10);
            } else if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
                upgraderCount++;
            } else if (Game.creeps[i].memory.role === ROLE.BUILD) {
                builderCount++;
            } else if (Game.creeps[i].memory.role === ROLE.HAUL) {
                haulerCount++;
                haulSource = haulSource + parseInt(Game.creeps[i].memory.source, 10);
            } else if (Game.creeps[i].memory.role === ROLE.SCOUT) {
                scoutCount++;
                scoutDirection = Game.creeps[i].memory.scoutDirection;
            }
        }

        if (harvesterCount < UNIT_MAX.HARVEST) {
            var res = Game.spawns[MY_SPAWN_NAME].createCreep((harvesterCount === 0 ? UNIT_BASIC.HARVEST : UNIT_MEDIUM.HARVEST), null, {
                role: ROLE.HARVEST,
                source: (harvesterSource < UNIT_MAX.HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0),
                in_colour: UNIT_COLOUR_IN.HARVEST,
                out_colour: UNIT_COLOUR_OUT.HARVEST
            });

            if (res === OK) {
                console.log("Create harvester");
            }
        } else if (upgraderCount < UNIT_MAX.UPGRADE) {
            var res = Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_MEDIUM.UPGRADE, null, {
                role: ROLE.UPGRADE,
                source: 1,
                in_colour: UNIT_COLOUR_IN.UPGRADE,
                out_colour: UNIT_COLOUR_OUT.UPGRADE
            });

            if (res === OK) {
                console.log("Create upgrader");
            }
        } else if (builderCount < UNIT_MAX.BUILD) {
            var res = Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_MEDIUM.BUILD, null, {
                role: ROLE.BUILD,
                source: 1,
                in_colour: UNIT_COLOUR_IN.BUILD,
                out_colour: UNIT_COLOUR_OUT.BUILD
            });

            if (res === OK) {
                console.log("Create repairer");
            }
        } else if (haulerCount < UNIT_MAX.HAUL) {
            var res = Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_MEDIUM.HAUL, null, {
                role: ROLE.HAUL,
                source: (haulSource < 1 ? 1 : 0),
                in_colour: UNIT_COLOUR_IN.HAUL,
                out_colour: UNIT_COLOUR_OUT.HAUL
            });

            if (res === OK) {
                console.log("Create transferer");
            }
        } else if (scoutCount < UNIT_MAX.SCOUT) {
            var res = Game.spawns[MY_SPAWN_NAME].createCreep(UNIT_MEDIUM.SCOUT, null, {
                role: ROLE.SCOUT,
                scoutDirection: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_DIRECTION.WEST : SCOUT_DIRECTION.EAST),
                scoutRooms: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_ROOMS.WEST : SCOUT_ROOMS.EAST),
                in_colour: UNIT_COLOUR_IN.SCOUT,
                out_colour: UNIT_COLOUR_OUT.SCOUT
            });

            if (res === OK) {
                console.log("Create scout");
            }
        }
    }
};

module.exports = taskPopulate;