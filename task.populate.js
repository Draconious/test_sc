var my_constants = require('my_constants');

var taskPopulate = {

    run: function (energyAvailable, energyCapacity, spawnName, roomName) {
        var modifiedCapacity = 0;
        
        if (energyAvailable >= 12900) {
            modifiedCapacity = "12900";
        } else if (energyAvailable >= 5600) {
            modifiedCapacity = "5600";
        } else if (energyAvailable >= 2300) {
            modifiedCapacity = "2300";
        } else if (energyAvailable >= 1800) {
            modifiedCapacity = "1800";
        } else if (energyAvailable >= 1300) {
            modifiedCapacity = "1300";
        } else if (energyAvailable >= 800) {
            modifiedCapacity = "800";
        } else if (energyAvailable >= 550) {
            modifiedCapacity = "550";
        } else {
            modifiedCapacity = "300";
        }
        
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
                } else if (Game.creeps[i].memory.role === ROLE.HAUL) {
                    haulerCount++;
                    haulSource = haulSource + parseInt(Game.creeps[i].memory.source, 10);
                } else if (Game.creeps[i].memory.role === ROLE.SCOUT) {
                    scoutCount++;
                    scoutDirection = Game.creeps[i].memory.scoutDirection;
                }
            }
        }

        if (harvesterCount < UNIT_MAX[spawnName].HARVEST) {
            var harvesterBodyParts = UNIT[modifiedCapacity].HARVEST;
            
            if (harvesterCount === 0) {
                if (energyAvailable >= 1300) {
                    harvesterBodyParts = UNIT["1300"].HARVEST;
                } else if (energyAvailable >= 800) {
                    harvesterBodyParts = UNIT["800"].HARVEST;
                } else if (energyAvailable >= 550) {
                    harvesterBodyParts = UNIT["550"].HARVEST;
                } else {
                    harvesterBodyParts = UNIT["300"].HARVEST;
                }
            }

            var res = Game.spawns[spawnName].createCreep((harvesterBodyParts), null, {
                role: ROLE.HARVEST,
                source: (harvesterSource < UNIT_MAX[spawnName].HARVEST - ALT_SOURCE_OPEN_SPOTS ? 1 : 0),
                in_colour: UNIT_COLOUR_IN.HARVEST,
                out_colour: UNIT_COLOUR_OUT.HARVEST
            });

            if (typeof res === 'string') {
                console.log("Create harvester " + spawnName + " " + res);
            }
        } else if (haulerCount < UNIT_MAX[spawnName].HAUL) {
            var haulerBodyParts = UNIT[modifiedCapacity].HAUL;

            var res = Game.spawns[spawnName].createCreep(haulerBodyParts, null, {
                role: ROLE.HAUL,
                source: (spawnName === "Spawn2" ? 0 : (haulSource < 1 ? 1 : 0)),
                in_colour: UNIT_COLOUR_IN.HAUL,
                out_colour: UNIT_COLOUR_OUT.HAUL
            });
            
            console.log(res);

            if (typeof res === 'string') {
                console.log("Create transferer " + spawnName + " " + res);
            }
        } else if (upgraderCount < UNIT_MAX[spawnName].UPGRADE) {
            var upgraderBodyParts = UNIT[modifiedCapacity].UPGRADE;

            var res = Game.spawns[spawnName].createCreep(upgraderBodyParts, null, {
                role: ROLE.UPGRADE,
                source: 1,
                in_colour: UNIT_COLOUR_IN.UPGRADE,
                out_colour: UNIT_COLOUR_OUT.UPGRADE
            });

            if (typeof res === 'string') {
                console.log("Create upgrader " + spawnName + " " + res);
            }
        } else if (builderCount < UNIT_MAX[spawnName].BUILD) {
            var builderBodyParts = UNIT[modifiedCapacity].BUILD;

            var res = Game.spawns[spawnName].createCreep(builderBodyParts, null, {
                role: ROLE.BUILD,
                source: 1,
                in_colour: UNIT_COLOUR_IN.BUILD,
                out_colour: UNIT_COLOUR_OUT.BUILD
            });

            if (typeof res === 'string') {
                console.log("Create repairer " + spawnName + " " + res);
            }
        } else if (scoutCount < UNIT_MAX[spawnName].SCOUT && spawnName !== "Spawn2") {
            var scoutBodyParts = UNIT[modifiedCapacity].SCOUT;

            var res = Game.spawns[spawnName].createCreep(scoutBodyParts, null, {
                role: ROLE.SCOUT,
                scoutDirection: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_DIRECTION.WEST : SCOUT_DIRECTION.EAST),
                scoutRooms: (scoutDirection === SCOUT_DIRECTION.EAST ? SCOUT_ROOMS.WEST : SCOUT_ROOMS.EAST),
                in_colour: UNIT_COLOUR_IN.SCOUT,
                out_colour: UNIT_COLOUR_OUT.SCOUT
            });

            if (typeof res === 'string') {
                console.log("Create scout " + spawnName + " " + res);
            }
        }
    }
};

module.exports = taskPopulate;