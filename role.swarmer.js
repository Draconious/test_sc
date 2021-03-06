var my_constants = require('my_constants');

var roleScout = {

    /** @param {Creep} creep **/
    swarm: function (creep) {
        var hostiles = Game.rooms[creep.room.name].find(FIND_HOSTILE_CONSTRUCTION_SITES, {
            filter: (creep) => (MY_FRIENDS.indexOf(creep.owner.username) === -1)
        });
        
        if (hostiles && hostiles.length > 0) {
            var nearestHostile = creep.pos.findClosestByPath(hostiles);
            var res = creep.moveTo(new RoomPosition(nearestHostile.pos.x,nearestHostile.pos.y, creep.room.name));
            if (res === ERR_NOT_IN_RANGE) {
                creep.moveTo(nearestHostile);
                return;
            } else if (res === OK) {
                return;
            }
        }

        if (!creep.memory.scoutRooms || creep.memory.scoutRooms.length === 0) {
                if (creep.memory.scoutRooms.length === 0) {
                    if (creep.memory.scoutDirection === SCOUT_DIRECTION.EAST) {
                        creep.memory.scoutRooms = SCOUT_ROOMS.WEST;
                        creep.memory.scoutDirection = SCOUT_DIRECTION.WEST;
                    } else {
                        creep.memory.scoutRooms = SCOUT_ROOMS.EAST;
                        creep.memory.scoutDirection = SCOUT_DIRECTION.EAST;
                    }
                }
        } else {
            if (creep.memory.scoutRooms[0] === creep.room.name) {
                creep.memory.scoutRooms.shift();
                if (creep.memory.scoutRooms.length === 0) {
                    if (creep.memory.scoutDirection === SCOUT_DIRECTION.EAST) {
                        creep.memory.scoutRooms = SCOUT_ROOMS.WEST;
                        creep.memory.scoutDirection = SCOUT_DIRECTION.WEST;
                    } else {
                        creep.memory.scoutRooms = SCOUT_ROOMS.EAST;
                        creep.memory.scoutDirection = SCOUT_DIRECTION.EAST;
                    }
                }
            }
            creep.moveTo(new RoomPosition(10, 38, creep.memory.scoutRooms[0]));
        }
    }
};

module.exports = roleScout;