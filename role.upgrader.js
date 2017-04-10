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
            var towers = Game.rooms[ROOM_NAME].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            var nearestTower = creep.pos.findClosestByRange(towers);

            if (nearestTower && nearestTower.energy < nearestTower.energyCapacity) {
                if (creep.transfer(nearestTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestTower, {visualizePathStyle: {stroke: '#FFFFFF'}});
                }
            } else if (creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#FFFFFF'}});
            }
        }
        else {
            taskGetEnergy.run(creep);
        }
    }
};

module.exports = roleUpgrader;