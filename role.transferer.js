var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy === 0) {
        	var spawn = creep.pos.findClosestByRange(FIND_STRUCTURES, { filter: function (s) {
                return s.structureType === STRUCTURE_SPAWN && structure.energy > structure.energyCapacity - 100;
            }});

			if(spawn && spawn.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn);
            }
        } else {
            var target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_EXTENSION && structure.energy < structure.energyCapacity);
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