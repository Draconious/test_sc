var roleTransferer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.carry.energy === 0) {
        	var extension = creep.pos.findClosest(FIND_STRUCTURE, { filter: function (s) {
                return s.structureType === STRUCTURE_EXTENSION;
            }});

			if(extension && extension.energy > 0 && extension.transferEnergy(creep) === ERR_NOT_IN_RANGE) {
                creep.moveTo(extension);
            }
        } else {
            var target = creep.room.findClosest(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_SPAWN && structure.energy < structure.energyCapacity);
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