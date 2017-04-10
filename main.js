var taskWork = require('task.work');
var taskPopulate = require('task.populate');
var my_constants = require('my_constants');

module.exports.loop = function () {
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var hostiles = Game.rooms[ROOM_NAME].find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => MY_FRIENDS.indexOf(creep.owner) === -1
    });

    if (hostiles && hostiles.length > 0) {
        Game.rooms[MY_SPAWN_NAME].controller.activateSafeMode()
    }

    var towers = Game.rooms[ROOM_NAME].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

    for (var id in towers) {
        var tower = towers[id];

        if (tower) {
            var closestHostile = tower.pos.findClosestByRange(hostiles);
            if (closestHostile) {
                tower.attack(closestHostile);
            } else {
                var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => structure.hits < (structure.hitsMax / 2)
                });
                if (closestDamagedStructure) {
                    tower.repair(closestDamagedStructure);
                }
            }
        }
    }

    var energyAvailable = Game.rooms[ROOM_NAME].energyAvailable;
    if (!Game.spawns[MY_SPAWN_NAME].spawning && energyAvailable >= 300) {
        taskPopulate.run(energyAvailable);
    }

    var harvesters = 0;
    var upgraders = 0;
    var repairers = 0;
    var transferers = 0;
    var scouts = 0;

    for (var i in Game.creeps) {
        if (Game.creeps[i].memory.role === ROLE.HARVEST) {
            harvesters++;
        } else if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
            upgraders++;
        } else if (Game.creeps[i].memory.role === ROLE.BUILD) {
            repairers++;
        } else if (Game.creeps[i].memory.role === ROLE.HAUL) {
            transferers++;
        } else if (Game.creeps[i].memory.role === ROLE.SCOUT) {
            scouts++;
        }
    }

    if (harvesters < UNIT_MAX.HARVEST) {
        console.log("Brain drain!!");
    }

    taskWork.run(harvesters < UNIT_MAX.HARVEST ||
        upgraders < UNIT_MAX.UPGRADE ||
        repairers < UNIT_MAX.BUILD ||
        transferers < UNIT_MAX.HAUL ||
        scouts < UNIT_MAX.SCOUT);

};