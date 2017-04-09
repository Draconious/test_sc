var taskGetEnergy = {

    /** @param {Creep} creep **/
    run: function(creep) {

            if (creep.memory.source === 1) {
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                });

                if (container) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(container)
                    }
                } else {
                    var energyStructures = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy > 0
                    });

                    if (creep.withdraw(energyStructures) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(energyStructures)
                    }
                }
            } else {
                var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
                });

                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container)
                }
            }
	}
};

module.exports = taskGetEnergy;