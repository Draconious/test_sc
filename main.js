var taskWork = require('task.work');
var taskPopulate = require('task.populate');
var tower = require('obj.tower');
var my_constants = require('my_constants');

module.exports.loop = function () {

    for (var i in Memory.creeps) {
        if (!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    for (var index in MY_ROOMS) {
        var roomName = MY_ROOMS[index];
        tower.defend(roomName);

        var spawns = Game.rooms[MY_ROOMS[index]].find(FIND_MY_SPAWNS);

        var energyAvailable = Game.rooms[roomName].energyAvailable;
        var energyCapacity = Game.rooms[roomName].energyCapacityAvailable;

        for (var i in spawns) {
            if (Game.spawns[i]) {

                if (!Game.spawns[i].spawning && energyAvailable >= 300) {
                    taskPopulate.populate(energyAvailable, energyCapacity, Game.spawns[i].name, roomName);

                    if (Game.spawns[i].memory.remoteRooms && Game.spawns[i].memory.remoteRooms.length > 0) {
                        for (var index in Game.spawns[i].memory.remoteRooms) {
                            var ticksToEnd = 9999;

                            if (Game.rooms[Game.spawns[i].memory.remoteRooms[index]]) {
                                if (Game.rooms[Game.spawns[i].memory.remoteRooms[index]].controller.reservation) {
                                    ticksToEnd = Game.rooms[Game.spawns[i].memory.remoteRooms[index]].controller.reservation.ticksToEnd;
                                } else {
                                    ticksToEnd = 0;
                                }
                            }

                            if (energyAvailable >= 300) {
                                taskPopulate.populateRemote(energyAvailable, energyCapacity, Game.spawns[i].name, roomName, Game.spawns[i].memory.remoteRooms[index], ticksToEnd);
                            }
                        }
                    }
                }
            }
        }
    }

    taskWork.work();

};