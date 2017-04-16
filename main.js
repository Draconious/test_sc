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
        var spawnName;

        for (var i in Game.spawns) {
            if (Game.spawns[i].room.name === roomName) {
                spawnName = Game.spawns[i].name;
            }
        }

        if (spawnName) {
            tower.defend(roomName);

            var energyAvailable = Game.rooms[roomName].energyAvailable;
            var energyCapacity = Game.rooms[roomName].energyCapacityAvailable;
            if (!Game.spawns[spawnName].spawning && energyAvailable >= 300) {
                taskPopulate.run(energyAvailable, energyCapacity, spawnName, roomName);
            }

            var harvesters = 0;
            var upgraders = 0;
            var repairers = 0;
            var transferers = 0;
            var scouts = 0;

            for (var i in Game.creeps) {
                if (Game.creeps[i].room.name === roomName) {
                    if (Game.creeps[i].memory.role === ROLE.HARVEST) {
                        harvesters++;
                    } else if (Game.creeps[i].memory.role === ROLE.UPGRADE) {
                        upgraders++;
                    } else if (Game.creeps[i].memory.role === ROLE.BUILD) {
                        repairers++;
                    } else if (Game.creeps[i].memory.role === ROLE.HAUL) {
                        transferers++;
                    } else if (Game.creeps[i].memory.role === ROLE.SCOUT) {
                        scouts++;
                    }
                }
            }

            if (harvesters < UNIT_MAX.HARVEST) {
                console.log("Brain drain in " + roomName + "!!");
            }

            taskWork.run(harvesters < UNIT_MAX.HARVEST, roomName, spawnName);
        }
    }

};