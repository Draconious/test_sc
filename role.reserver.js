var my_constants = require('my_constants');

var roleReserver = {

    /** @param {Creep} creep **/
    remoteReserve: function (creep) {
        if (creep.memory.room !== creep.room.name) {
            creep.moveTo(new RoomPosition(25, 25, creep.memory.room));
        } else {
            if(creep.room.controller) {
                if(creep.reserveController(creep.room.controller) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
        }
    }
};

module.exports = roleReserver;