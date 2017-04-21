var taskGetEnergy = require('task.get_energy');
var my_constants = require('my_constants');

var roleTransferer = {

    /** @param {Creep} creep **/
    transfer: function (creep) {
        if (_.sum(creep.carry) === 0 && creep.carry.energy === 0 && !creep.memory.target) {

            var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                filter: (s) => {
                    return (s.room.name === creep.room.name)
                }
            });
            if (resource) {
                creep.memory.target = resource.id;
            } else {

                var energyAvailable = Game.rooms[creep.room.name].energyAvailable;
                var energyCapacity = Game.rooms[creep.room.name].energyCapacityAvailable;
                if (energyAvailable < energyCapacity) {
                    var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (container) => {
                            return (container.structureType === STRUCTURE_CONTAINER || container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] > 0 && container.room.name === creep.room.name;
                        }
                    });

                    if (container) {
                        creep.memory.target = container.id;
                    }

                } else {

                    var sourceContainers = creep.room.find(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType === STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0 && s.room.name === creep.room.name && SOURCE_CONTAINERS.includes(s.id)
                    });

                    if (sourceContainers && sourceContainers.length > 0) {
                        var highestContainer = _.max(sourceContainers, function(o){return o.store[RESOURCE_ENERGY];});
                        creep.memory.target = highestContainer.id;
                    } else {
                        var storageContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (s) => (s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0 && s.room.name === creep.room.name
                        });

                        if (storageContainer) {
                            creep.memory.target = storageContainer.id;
                        }
                    }
                }
            }
        }

        if (_.sum(creep.carry) === 0 && creep.carry.energy === 0) {
            var target = Game.getObjectById(creep.memory.target);

            if (!target) {
                creep.memory.target = null;
            } else {
                if (target instanceof Resource) {
                    if (creep.pickup(target) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                    }
                } else {
                    if (target.store[RESOURCE_ENERGY] > 0) {
                        var res = creep.withdraw(target, RESOURCE_ENERGY);
                        if (res === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                        } else if (res === OK && target instanceof StructureContainer) {
                            RESOURCES_ALL.forEach(resourceType => creep.withdraw(lowestContainer, resourceType));
                        }
                    } else {
                        creep.memory.target = null;
                    }
                }
            }
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity && structure.room.name === creep.room.name);
                }
            });

            if (target) {
                var res = creep.transfer(target, RESOURCE_ENERGY);
                if (res === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                } else if (res === OK) {
                    creep.memory.target = null;
                    return;
                }
            } else {
                var lowestContainer;

                if (_.sum(creep.carry) !== creep.carry.energy) {
                    lowestContainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (container) => {
                            return (container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] < container.storeCapacity && container.room.name === creep.room.name;
                        }
                    });
                }

                if (!lowestContainer) {

                    var containers = creep.room.find(FIND_STRUCTURES, {
                        filter: (container) => {
                            return (container.structureType === STRUCTURE_CONTAINER || container.structureType === STRUCTURE_STORAGE) && _.sum(container.store) < container.storeCapacity && !SOURCE_CONTAINERS.includes(container.id) && container.room.name === creep.room.name;
                        }
                    });

                    lowestContainer = _.min(containers, function(o){return o.store[RESOURCE_ENERGY];});
                }

                var res = creep.transfer(lowestContainer, RESOURCE_ENERGY);
                if (res === ERR_NOT_IN_RANGE) {
                    creep.moveTo(lowestContainer);
                } else if ((res === OK || res === ERR_NOT_ENOUGH_ENERGY) && lowestContainer instanceof StructureStorage) {
                    RESOURCES_ALL.forEach(resourceType => creep.transfer(lowestContainer, resourceType));
                    creep.memory.target = null;
                    return;
                }
            }
        }
    }
};

module.exports = roleTransferer;