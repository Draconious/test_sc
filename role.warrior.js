var my_constants = require('my_constants');

var roleScout = {

    /** @param {Creep} creep **/
    scout: function (creep) {
        var hostiles = Game.rooms[creep.room.name].find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => (MY_FRIENDS.indexOf(creep.owner.username) === -1 && creep.getActiveBodyparts(MOVE) > 0 && creep.getActiveBodyparts(ATTACK) === 0)
        });
        
        if (hostiles && hostiles.length > 0) {
            var nearestHostile = creep.pos.findClosestByPath(hostiles);
            var res = creep.rangedAttack(nearestHostile);
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
            creep.moveTo(new RoomPosition(25, 25, creep.memory.scoutRooms[0]));
        }
    },
    

    /** @param {Creep} creep **/
    poke: function (creep) {
        var hostiles = Game.rooms[creep.room.name].find(FIND_HOSTILE_STRUCTURES, {
            filter: (s) => (s.structureType === STRUCTURE_EXTENSION && MY_FRIENDS.indexOf(creep.owner.username) === -1)
        });
        
        if (hostiles && hostiles.length > 0) {
            var nearestHostile = creep.pos.findClosestByRange(hostiles);
            var res = creep.rangedAttack(nearestHostile);
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
            creep.moveTo(new RoomPosition(25, 25, creep.memory.scoutRooms[0]));
        }
    },

    /** @param {Creep} creep **/
    remoteDefend: function (creep) {
        if (creep.room.name !== creep.memory.room) {
            creep.moveTo(new RoomPosition(25,25, creep.memory.room), {visualizePathStyle: {stroke: creep.memory.in_colour}});
            return;
        }

        var hostiles = Game.rooms[creep.room.name].find(FIND_HOSTILE_CREEPS, {
            filter: (creep) => (MY_FRIENDS.indexOf(creep.owner.username) === -1)
        });

        if (hostiles && hostiles.length > 0) {
            var nearestHostile = creep.pos.findClosestByPath(hostiles);

            creep.moveTo(nearestHostile, {visualizePathStyle: {stroke: creep.memory.out_colour}});

            var rangedBody = creep.getActiveBodyparts(RANGED_ATTACK);
            if (rangedBody && rangedBody.length > 0) {
                creep.rangedAttack(nearestHostile);
            }

            var attackBody = creep.getActiveBodyparts(ATTACK);
            if (attackBody && attackBody.length > 0) {
                creep.attack(nearestHostile);
            }
        }

    }
};

module.exports = roleScout;