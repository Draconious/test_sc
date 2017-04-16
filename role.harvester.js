var roleHarvester = {

    harvest: function(creep, spawnName) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source ? creep.memory.source : 0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source ? creep.memory.source : 0], {visualizePathStyle: {stroke: creep.memory.out_colour}});
            }
        } else {
            var target = null;
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (container) => {
                    return (container.structureType === STRUCTURE_CONTAINER || container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                }
            });

            if (containers && containers.length > 0) {
                target = creep.pos.findClosestByRange(containers);
            } else {
                if (Game.spawns[spawnName].energy < Game.spawns[spawnName].energyCapacity) {
                    target = Game.spawns[spawnName];
                } else {

                    var structures = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                        }
                    });

                    if (structures.length > 0) {
                        target = creep.pos.findClosestByRange(structures);
                    }
                }
            }

            if(target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.out_colour}});
            }

        }
	}
};

module.exports = roleHarvester;