var my_constants = require('my_constants');

var taskGetEnergy = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.source === 1) {
            var containers = creep.pos.findInRange(FIND_STRUCTURES, 10, {
                filter: (s) => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
            });

            if (containers && containers.length > 0) {
                if (creep.withdraw(containers[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(containers[0], {visualizePathStyle: {stroke: creep.memory.in_colour}});
                }
            } else {
                var energyStructures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) && s.energy >= 50
                });

                if (energyStructures && energyStructures.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyStructures, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                }
            }
        } else {
            var container = Game.getObjectById(ALT_CONTAINER_ID);

            if (container && creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(container, {visualizePathStyle: {stroke: creep.memory.in_colour}});
            }
        }
    }
};

module.exports = taskGetEnergy;