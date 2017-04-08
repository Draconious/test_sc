var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.carry.energy === 0) {
            creep.memory.upgrading = false;
	    }

	    if(!creep.memory.upgrading && creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.source ? creep.memory.source : 0]) === ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.source ? creep.memory.source : 0], {visualizePathStyle: {stroke: '#0000FF'}});
            }
        } else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType === STRUCTURE_SPAWN || structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_CONTAINER) && structure.energy < structure.energyCapacity;
                    }
            });

            if(!creep.memory.upgrading && targets.length > 0) {
                var nearest = creep.pos.findClosestByPath(targets);
                if(creep.transfer(nearest, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearest, {visualizePathStyle: {stroke: '#00FF00'}});
                }
            } else {
                if(creep.upgradeController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.memory.upgrading = true;
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#FF0000'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;