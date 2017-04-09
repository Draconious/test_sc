var taskWork = require('task.work');
var taskPopulate = require('task.populate');
var my_constants = require('my_constants');

module.exports.loop = function () {
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var towers = Game.rooms[ROOM_NAME].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

    for (var id in towers) {
        var tower = towers[id];

        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < (structure.hitsMax / 2)
            });
            if (closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if (closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }

    var hostiles = Game.rooms[ROOM_NAME].find(FIND_HOSTILE_CREEPS, {
        filter: (creep) => MY_FRIENDS.indexOf(creep.owner) === -1
    });

    if(hostiles.length > 0) {
        Game.rooms.Spawn1.controller.activateSafeMode()
    }

    if (!Game.spawns.Spawn1.spawning && Game.rooms[ROOM_NAME].energyAvailable >= 300) {
        taskPopulate.run();
    }

    var harvesters = 0;
    var upgraders = 0;
    var repairers = 0;
    var transferers = 0;

    for (var i in Game.creeps) {
        if (Game.creeps[i].memory.role === ROLE.HARVEST) {
            harvesters++;
        }
        if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
            upgraders++;
        }
        if (Game.creeps[i].memory.role === ROLE.BUILD) {
            repairers++;
        }
        if (Game.creeps[i].memory.role === ROLE.HAUL) {
            transferers++;
        }
    }

    if (harvesters < UNIT_MAX.HARVEST) {
        console.log("Brain drain!!");
    }

    taskWork.run(harvesters.length < UNIT_MAX.HARVEST ||
        upgraders < UNIT_MAX.UPGRADE ||
        repairers < UNIT_MAX.BUILD ||
        transferers < UNIT_MAX.HAUL);

};