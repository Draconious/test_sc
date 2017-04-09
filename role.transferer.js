var taskGetEnergy = require('task.get_energy');

var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy === 0) {
            taskGetEnergy.run(creep);
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) && structure.energy < structure.energyCapacity);
                    }
            });

            if(target) {
                if(creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        }
	}
};

module.exports = roleTransferer;