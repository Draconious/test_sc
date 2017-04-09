var taskWork = require('task.work');
var taskPopulate = require('task.populate');
var roomName = "E8S92";

module.exports.loop = function () {
    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var towers = Game.rooms[roomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});


    for (var id in towers) {
        var tower = towers[id];

        if (tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
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

    if (!Game.spawns.Spawn1.spawning && Game.rooms[roomName].energyAvailable >= 300) {
        taskPopulate.run();
    }


    var harvesters = 0;
    var upgraders = 0;
    var repairers = 0;
    var transferers = 0;

    for (var i in Game.creeps) {
        if (Game.creeps[i].memory.role === 'harvester') {
            harvesters++;
        }
        if (Game.creeps[i].memory.role === 'upgrader') {
            upgraders++;
        }
        if (Game.creeps[i].memory.role === 'repairer') {
            repairers++;
        }
        if (Game.creeps[i].memory.role === 'transferer') {
            transferers++;
        }
    }

    if (harvesters < 5) {
        console.log("Brain drain!!");
    }

    taskWork.run(harvesters.length < 5 || upgraders < 3 || repairers < 3 || transferers < 3);

};