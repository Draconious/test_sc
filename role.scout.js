var my_constants = require('my_constants');

var roleScout = {

    /** @param {Creep} creep **/
    run: function (creep) {
        var hostiles = Game.rooms[creep.room.name].find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => MY_FRIENDS.indexOf(creep.owner) === -1
        });

        if (hostiles && hostiles.length > 0) {
            var nearestHostile = creep.pos.findClosestByPath(hostiles);
            if (creep.attack(nearestHostile) === ERR_NOT_IN_RANGE) {
                creep.moveTove(nearestHostile);
            }
        } else {
            if (!creep.memory.scoutRooms || creep.memory.scoutRooms.length === 0) {
                creep.moveTo(new RoomPosition(25, 25, ROOM_NAME));
            } else {
                if (creep.memory.scoutRooms[0] === creep.room.name) {
                    creep.memory.scoutRooms.shift();
                }
                creep.moveTo(new RoomPosition(25, 25, creep.memory.scoutRooms[0]));
            }
        }
    }
};

module.exports = roleScout;