var my_constants = require('my_constants');

var roleClaim = {

    /** @param {Creep} creep **/
    claim: function (creep) {
        if (creep.memory.claimRoom !== creep.room.name) {
            creep.moveTo(new RoomPosition(10, 38, creep.memory.claimRoom));
        } else {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleClaim;