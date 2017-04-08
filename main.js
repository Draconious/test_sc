var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleTransferer = require('role.transferer');

module.exports.loop = function () {
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }

    var towers = Game.rooms["E8S92"].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});


    for (var id in towers) {
        var tower = towers[id];

        if(tower) {
            var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => structure.hits < structure.hitsMax
            });
            if(closestDamagedStructure) {
                tower.repair(closestDamagedStructure);
            }

            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(closestHostile) {
                tower.attack(closestHostile);
            }
        }
    }

    var harvesters = [];
    var builders = [];
    var upgraders = [];
    var repairers = [];
    var transferers = [];

    if (!Game.spawns.Spawn1.spawning && Game.spawns.Spawn1.energy === 300) {

        for(var i in Game.creeps) {
            if (Game.creeps[i].memory.role === 'harvester') {
                harvesters.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'upgrader') {
                upgraders.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'builder') {
                builders.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'repairer') {
                repairers.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'transferer') {
                transferers.push(Game.creeps[i]);
            }
        }

        if(harvesters.length < 3) {
            console.log("Create harvester, source " + (harvesters.length > 0 && harvesters[harvesters.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'harvester', source: (harvesters.length > 0 && harvesters[harvesters.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (upgraders.length < 2) {
            console.log("Create upgrader, source " + (upgraders.length > 0 && upgraders[upgraders.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: (upgraders.length > 0 && upgraders[upgraders.length - 1].memory.source === 0 ? 1 : 0)});
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: 1});
        } else if (builders.length < 2) {
            console.log("Create builder, source " + (builders.length > 0 && builders[builders.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'builder', source: (builders.length > 0 && builders[builders.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (repairers.length < 1) {
            console.log("Create repairer, source " + (repairers.length > 0 && repairers[repairers.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'repairer', source: (repairers.length > 0 && repairers[repairers.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (transferers.length < 1) {
            console.log("Create transferer, source " + (transferers.length > 0 && transferers[transferers.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'transferer', source: (transferers.length > 0 && transferers[transferers.length - 1].memory.source === 0 ? 1 : 0)});
        }
    }

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
};