var taskGetEnergy = require('task.get_energy');
var my_constants = require('my_constants');

var roleTransferer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        if (creep.carry.energy === 0) {
            if (creep.memory.source === 0) {

                var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (resource) {
                    if (creep.pickup(resource) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(resource, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                    }
                } else {
                    taskGetEnergy.run(creep);
                }
            } else {

                var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES);
                if (resource) {
                    if (creep.pickup(resource) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(resource, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                    }
                    return;
                }

                var storageContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0
                });

                if (storageContainer) {
                    if (creep.withdraw(storageContainer, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(storageContainer, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                    }
                } else {
                    var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType === STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0
                    });

                    if (container) {
                        if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(container, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                        }
                    }
                }
            }
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
                
                var containers;
                
                if (creep.memory.source === 0) {

                    containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (container) => {
                            return (container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                        }
                    });
                } else {

                    containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (container) => {
                            return (container.structureType === STRUCTURE_CONTAINER || container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                        }
                    });
                }

                if (containers && containers.length > 0) {
                    var originContainer = Game.getObjectById(ALT_CONTAINER_ID);

                    for (var index in containers) {
                        if (containers[index] !== originContainer) {
                            var res = creep.transfer(containers[index], RESOURCE_ENERGY);
                            if (res === ERR_NOT_IN_RANGE) {
                                creep.moveTo(containers[index]);
                            } else if (res === OK) {
                                RESOURCES_ALL.forEach(resourceType => creep.transfer(containers[index], resourceType));
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