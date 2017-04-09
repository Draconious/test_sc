var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source ? creep.memory.source : 0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source ? creep.memory.source : 0], {visualizePathStyle: {stroke: '#0000FF'}});
            }
        } else {
            var target = null;

            if (creep.memory.source === 1) {

                if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) {
                    target = Game.spawns.Spawn1;
                } else {

                    var structures = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                        }
                    });

                    if (structures.length > 0) {
                        target = creep.pos.findClosestByRange(structures);
                    } else {
                        var containers = creep.room.find(FIND_STRUCTURES, {
                            filter: (container) => {
                                return (container.structureType === STRUCTURE_CONTAINER) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                            }
                        });

                        target = creep.pos.findClosestByRange(containers);
                    }
                }
            } else {
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (container) => {
                        return (container.structureType === STRUCTURE_CONTAINER) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                    }
                });

                if (containers && containers.length > 0) {
                    target = creep.pos.findClosestByRange(containers);
                } else {
                    if (Game.spawns.Spawn1.energy < Game.spawns.Spawn1.energyCapacity) {
                        target = Game.spawns.Spawn1;
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
            }

            if(target && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#00FF00'}});
            }

        }
	}
};

module.exports = roleHarvester;