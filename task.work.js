var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleRepairer = require('role.repairer');
var roleTransferer = require('role.transferer');

var taskWork = {

    run: function(needHarvesters) {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];

            if(creep.memory.role === 'harvester') {
                roleHarvester.run(creep);
            } else if(creep.memory.role === 'upgrader') {
                if (!needHarvesters) {
                    roleUpgrader.run(creep);
                }
            } else if(creep.memory.role === 'repairer') {
                if (!needHarvesters) {
                    roleRepairer.run(creep);
                }
            } else if(creep.memory.role === 'transferer') {
                if (!needHarvesters) {
                    roleTransferer.run(creep);
                }
            }
        }
	}
};

module.exports = taskWork;

