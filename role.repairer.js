var taskGetEnergy = require('util.energy');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy === 0) {
            creep.memory.repairing = false;
        }

        if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
			var roomStructures = creep.room.find(FIND_STRUCTURES);

			var toRepair = [];
			for(var index in roomStructures) {
				if((roomStructures[index].hits / roomStructures[index].hitsMax) < 0.5) {
					toRepair.push(roomStructures[index]);
				}
			}

			if(toRepair.length) {
				var structure = toRepair[0];
                if(creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#ffffff'}});
                }

                creep.memory.repairing = true;
				return;
			}

			var closestConstruction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

			if(closestConstruction) {
                if(creep.build(closestConstruction) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestConstruction, {visualizePathStyle: {stroke: '#ffffff'}});
                }

                creep.memory.repairing = true;
				return;
            }
        }
    }
};

module.exports = roleRepairer;