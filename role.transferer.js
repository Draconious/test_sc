var taskGetEnergy = require('task.get_energy');

var roleTransferer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0) {
            taskGetEnergy.run(creep);
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity);
                }
            });

            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {

                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (container) => {
                        return (container.structureType === STRUCTURE_CONTAINER) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                    }
                });

                if (containers && containers.length > 0) {
                    var originContainer = Game.getObjectById("58e92fc3bce38f9c0919dc56");

                    for (var index in containers) {
                        if (containers[index] !== originContainer) {
                            if (creep.transfer(containers[index], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                                creep.moveTo(containers[index]);
                            }
                            return;
                        }
                    }
                }
            }
        }
    }
};

module.exports = roleTransferer;