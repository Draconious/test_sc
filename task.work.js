var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleTransferer = require('role.transferer');
var constants = require('constants');

var taskWork = {

    run: function (needHarvesters) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role === ROLE.HARVEST) {
                roleHarvester.run(creep);
            } else if (creep.memory.role === ROLE.UPGRADE) {
                if (!needHarvesters) {
                    roleUpgrader.run(creep);
                }
            } else if (creep.memory.role === ROLE.BUILD) {
                if (!needHarvesters) {
                    roleRepairer.run(creep);
                }
            } else if (creep.memory.role === ROLE.HAUL) {
                if (!needHarvesters) {
                    roleTransferer.run(creep);
                }
            }
        }
    }
};

module.exports = taskWork;