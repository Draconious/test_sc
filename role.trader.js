var taskGetEnergy = require('task.get_energy');
var my_constants = require('my_constants');

var roleTrader = {

    run: function (creep, targetRoom, homeRoom, targetId) {
        if (creep.carry.energy === 0) {
            if (creep.room.name !== homeRoom) {
                creep.moveTo(new RoomPosition(25, 25, homeRoom), {visualizePathStyle: {stroke: creep.memory.in_colour}});

            } else {
                var container = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => s.structureType === STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 0
                });

                if (creep.withdraw(container, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(container, {visualizePathStyle: {stroke: creep.memory.in_colour}});
                }
            }
        } else {
            var friendStorage = Game.getObjectById(targetId);

            if (creep.transfer(friendStorage, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(friendStorage, {visualizePathStyle: {stroke: creep.memory.out_colour}});
            } else {
                creep.moveTo(new friendStorage(25, 25, targetRoom), {visualizePathStyle: {stroke: creep.memory.out_colour}});
            }
        }
    }
};

module.exports = roleTrader;