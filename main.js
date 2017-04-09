var taskWork = require('task.work');
var taskPopulate = require('task.populate');

module.exports.loop = function () {
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var towers = Game.rooms["E8S92"].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});


    for (var id in towers) {
        var tower = towers[id];

        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }

    if (!Game.spawns.Spawn1.spawning && Game.spawns.Spawn1.energy >= 300) {
        taskPopulate.run();
    }


        var harvesters = [];

        for(var i in Game.creeps) {
            if (Game.creeps[i].memory.role === 'harvester') {
                harvesters.push(Game.creeps[i]);
            }
        }

    taskWork.run(harvesters.length < 5);


};