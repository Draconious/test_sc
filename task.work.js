var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransferer = require('role.transferer');

var taskWork = {

    /** @param {Creep} creep **/
    run: function() {
        for(var name in Game.creeps) {
            var creep = Game.creeps[name];
            if(creep.memory.role === 'harvester') {
                roleHarvester.run(creep);
            }
            if(creep.memory.role === 'upgrader') {
                roleUpgrader.run(creep);
            }
            if(creep.memory.role === 'builder') {
                roleBuilder.run(creep);
            }
            if(creep.memory.role === 'repairer') {
                roleRepairer.run(creep);
            }
            if(creep.memory.role === 'transferer') {
                roleTransferer.run(creep);
            }
        }
	}
};

module.exports = taskWork;

