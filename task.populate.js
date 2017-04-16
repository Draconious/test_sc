var my_constants = require('my_constants');

var taskPopulate = {

    run: function (energyAvailable, energyCapacity, spawnName, roomName) {
        var harvesterSource = 0;
        var haulSource = 0;
        var scoutDirection = SCOUT_DIRECTION.WEST;

        var harvesterCount = 0;
        var upgraderCount = 0;
        var builderCount = 0;
        var haulerCount = 0;
        var scoutCount = 0;

        for (var i in Game.creeps) {
            if (Game.creeps[i].room.name === roomName) {
                if (Game.creeps[i].memory.role === ROLE.HARVEST) {
                    harvesterCount++;
                    harvesterSource = harvesterSource + parseInt(Game.creeps[i].memory.source, 10);
                } else if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
                    upgraderCount++;
                } else if (Game.creeps[i].memory.role === ROLE.BUILD) {
                    builderCount++;
                } else if (Game.creeps[i].memory.role === ROLE.HAUL && Game.creeps[i].memory.source !== 3) {
                    haulerCount++;
                    haulSource = haulSource + parseInt(Game.creeps[i].memory.source, 10);
                } else if (Game.creeps[i].memory.role === ROLE.SCOUT) {
                    scoutCount++;
                    scoutDirection = Game.creeps[i].memory.scoutDirection;
                }
            }
        }

        if (harvesterCount < UNIT_MAX.HARVEST) {
            console.log("harvest spawn " + spawnName);
            var harvesterBodyParts = (energyCapacity <= 550 ? UNIT_BASIC.HARVEST : UNIT_MEDIUM.HARVEST);

            var res = Game.spawns[spawnName].createCreep((harvesterCount === 0 ? UNIT_BASIC.HARVEST : harvesterBodyParts), null, {
                role: ROLE.HARVEST,
                source: (harvesterSource < UNIT_MAX.HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0),
                in_colour: UNIT_COLOUR_IN.HARVEST,
                out_colour: UNIT_COLOUR_OUT.HARVEST
            });
            
            console.log(res);

            if (typeof res === 'string') {
                console.log("Create harvester " + res);
            }
        } else if (upgraderCount < UNIT_MAX.UPGRADE) {
            var upgraderBodyParts = (energyCapacity <= 550 ? UNIT_BASIC.UPGRADE : UNIT_MEDIUM.UPGRADE);

            var res = Game.spawns[spawnName].createCreep(upgraderBodyParts, null, {
                role: ROLE.UPGRADE,
                source: 1,
                in_colour: UNIT_COLOUR_IN.UPGRADE,
                out_colour: UNIT_COLOUR_OUT.UPGRADE
            });

            if (typeof res === 'string') {
                console.log("Create upgrader " + res);
            }
        } else if (builderCount < UNIT_MAX.BUILD) {
            var builderBodyParts = (energyCapacity <= 550 ? UNIT_BASIC.BUILD : UNIT_MEDIUM.BUILD);

            var res = Game.spawns[spawnName].createCreep(builderBodyParts, null, {
                role: ROLE.BUILD,
                source: 1,
                in_colour: UNIT_COLOUR_IN.BUILD,
                out_colour: UNIT_COLOUR_OUT.BUILD
            });

            if (typeof res === 'string') {
                console.log("Create repairer " + res);
            }
        } else if (haulerCount < UNIT_MAX.HAUL && spawnName !== "Spawn2") {
            var haulerBodyParts = (energyCapacity <= 550 ? UNIT_BASIC.HAUL : UNIT_LARGE.HAUL);

            var res = Game.spawns[spawnName].createCreep(haulerBodyParts, null, {
                role: ROLE.HAUL,
                source: (haulSource < 1 ? 1 : 0),
                in_colour: UNIT_COLOUR_IN.HAUL,
                out_colour: UNIT_COLOUR_OUT.HAUL
            });

            if (typeof res === 'string') {
                console.log("Create transferer " + res);
            }
        } else if (scoutCount < UNIT_MAX.SCOUT && spawnName !== "Spawn2") {
            var scoutBodyParts = (energyCapacity <= 550 ? UNIT_BASIC.SCOUT : UNIT_MEDIUM.SCOUT);

            var res = Game.spawns[spawnName].createCreep(scoutBodyParts, null, {
                role: ROLE.SCOUT,
                scoutDirection: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_DIRECTION.WEST : SCOUT_DIRECTION.EAST),
                scoutRooms: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_ROOMS.WEST : SCOUT_ROOMS.EAST),
                in_colour: UNIT_COLOUR_IN.SCOUT,
                out_colour: UNIT_COLOUR_OUT.SCOUT
            });

            if (typeof res === 'string') {
                console.log("Create scout " + res);
            }
        }
    }
};

module.exports = taskPopulate;