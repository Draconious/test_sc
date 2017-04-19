var taskGetEnergy = require('task.get_energy');
var my_constants = require('my_constants');

var roleTransferer = {

    /** @param {Creep} creep **/
    run: function (creep) {
        
        if (creep.carry.energy === 0) {
            
            if (!creep.memory.target) {
            
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
                    var resource = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                        filter: (s) => {
                            return (s.room.name === creep.room.name)
                        }
                    });
                    if (resource) {
                        creep.memory.target = resource.id;
                    } else {
                    
                        var sources = creep.room.find(FIND_SOURCES);
                        var sourceContainers = sources[creep.memory.source ? creep.memory.source : 0].pos.findInRange(FIND_STRUCTURES, 5, {
                            filter: (s) => (s.structureType === STRUCTURE_CONTAINER) && s.store[RESOURCE_ENERGY] > 0 && s.room.name === creep.room.name
                        });
                        
                        if (sourceContainers && sourceContainers.length > 0) {
                            creep.memory.target = sourceContainers[0].id;
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
                        if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.in_colour}});
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
                if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            } else {
                
                var containers;

                containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (container) => {
                        return (container.structureType === STRUCTURE_CONTAINER || container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] < container.storeCapacity && !SOURCE_CONTAINERS.includes(container.id) && container.room.name === creep.room.name;
                    }
                });
                
                var lowestContainer = _.min(containers, function(o){return o.store[RESOURCE_ENERGY];});
                
                var res = creep.transfer(lowestContainer, RESOURCE_ENERGY);
                if (res === ERR_NOT_IN_RANGE) {
                    creep.moveTo(lowestContainer);
                } else if (res === OK) {
                    RESOURCES_ALL.forEach(resourceType => creep.transfer(lowestContainer, resourceType));
                }
                return;
            }
            creep.memory.target = null;
        }
    }
};

module.exports = roleTransferer;