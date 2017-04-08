var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy === 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }

	    if(!creep.memory.upgrading && creep.carry.energy === creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
			var closestSpawn = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
			if(closestSpawn && closestSpawn.energy === closestSpawn.energyCapacity - 100 && closestSpawn.transferEnergy(creep) === ERR_NOT_IN_RANGE) {

            } else {

                var sources = creep.room.find(FIND_SOURCES);
                if (creep.harvest(sources[creep.memory.source ? creep.memory.source : 0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[creep.memory.source ? creep.memory.source : 0], {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
        }
	}
};

module.exports = roleUpgrader;