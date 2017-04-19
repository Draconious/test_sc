var taskGetEnergy = require('task.get_energy');

var roleTempBuilder = {

    build: function (creep) {
        if (creep.memory.claimRoom !== creep.room.name) {
            creep.moveTo(new RoomPosition(30, 1, "E7S93"));
        } else {
            
            if (creep.carry.energy === 0) {
                creep.memory.working = false;
            }
    
            if (!creep.memory.working && creep.carry.energy < creep.carryCapacity) {
                var sources = creep.room.find(FIND_SOURCES);
                if(creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: "#FFFFFF"}});
                }
            } else {
                var structure = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
    
                if (structure && creep.build(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: "#FF00FF"}});
                }
                creep.memory.working = true;
            }
        }
    }
};

module.exports = roleTempBuilder;