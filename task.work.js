var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transferer');
var roleWarrior = require('role.warrior');
var roleSwarm = require('role.swarmer');
var roleReserver = require('role.reserver');
var roleTempBuilder = require('role.tempBuilder');
var my_constants = require('my_constants');

var taskWork = {
    work: function () {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role === ROLE.HARVEST) {
                roleHarvester.harvest(creep);
            } else if (creep.memory.role === ROLE.UPGRADE) {
                roleUpgrader.run(creep);
            } else if (creep.memory.role === ROLE.BUILD) {
                if (!creep.memory.task) {
                    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (constructionSites && constructionSites.length > 0) {
                        creep.memory.task = "construction";
                    } else {
                        var towers = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.9});
                        if (towers && towers.length > 0) {
                            creep.memory.task = "tower";
                        } else {
                            var structures = Game.rooms[creep.room.name].find(FIND_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART && s.hits < s.hitsMax * 0.7});
                            if (structures && structures.length > 0) {
                                creep.memory.task = "structure";
                            } else {
                                var walls = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_WALL && s.hits < s.hitsMax});
                                if (walls && walls.length > 0) {
                                    creep.memory.task = "wall";
                                }
                            }
                        }
                    }
                }

                if (creep.memory.task === "construction") {
                    roleBuilder.build(creep);
                } else if (creep.memory.task === "tower") {
                    roleBuilder.tower(creep);
                } else if (creep.memory.task === "structure") {
                    roleBuilder.repair(creep);
                } else if (creep.memory.task === "wall") {
                    roleBuilder.wall(creep);
                }
            } else if (creep.memory.role === ROLE.HAUL) {
                roleTransferer.transfer(creep);
            } else if (creep.memory.role === ROLE.SCOUT) {
                if (creep.memory.poke) {

                } else {
                    roleWarrior.scout(creep);
                }
            } else if (creep.memory.role === ROLE.DEFEND) {
                roleSwarm.defend(creep);
            } else if (creep.memory.role === ROLE.SWARM) {
                roleSwarm.swarm(creep);
            } else if (creep.memory.role === "tempBuilder") {
                roleTempBuilder.build(creep);
            } else if (creep.memory.role === ROLE.REMOTE_RESERVE) {
                roleReserver.remoteReserve(creep);
            } else if (creep.memory.role === ROLE.REMOTE_HARVEST) {
                roleHarvester.remoteHarvest(creep);
            }
        }
    }
};

module.exports = taskWork;