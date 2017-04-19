var my_constants = require('my_constants');

var taskGetEnergy = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_CONTAINER || s.structureType === STRUCTURE_STORAGE) && s.store[RESOURCE_ENERGY] > 0 && s.room.name === creep.room.name
        });

        if (container) {
            if (!creep.pos.isNearTo(container)) {
                creep.moveTo(container, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                return;
            }
            
            creep.withdraw(container, RESOURCE_ENERGY);
        }
    }
};

module.exports = taskGetEnergy;