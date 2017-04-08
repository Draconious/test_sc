var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if (creep.carry.energy === 0) {
			var closestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);

			if(closestSpawn && closestSpawn.energy === closestSpawn.energyCapacity && closestSpawn.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSpawn);
            } else {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[creep.memory.source ? creep.memory.source : 0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.source ? creep.memory.source : 0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        } else {
			var roomStructures = creep.room.find(FIND_STRUCTURES);

			var toRepair = [ ];
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

				return;
			}

			var closestConstruction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

			if(closestConstruction) {
                if(creep.build(closestConstruction) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestConstruction, {visualizePathStyle: {stroke: '#ffffff'}});
                }
				return;
            }
        }
    }
};

module.exports = roleRepairer;