var taskGetEnergy = require('task.get_energy');

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
        }

        if (!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
            creep.memory.upgrading = true;
        }

        if (creep.memory.upgrading) {
            
            if (!creep.pos.inRangeTo(creep.room.controller, 3)) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                return;
            }
            
            creep.upgradeController(creep.room.controller);
        }
        else {
            taskGetEnergy.run(creep);
        }
    }
};

module.exports = roleUpgrader;