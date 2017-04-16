var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transferer');
var roleScout = require('role.scout');
var roleSwarm = require('role.swarmer');
var roleClaim = require('role.claimer');
var roleTempBuilder = require('role.tempBuilder');
var my_constants = require('my_constants');

var taskWork = {

    run: function (needHarvesters, roomName, spawnName) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.room.name === roomName) {
                if (creep.memory.role === ROLE.HARVEST) {
                    roleHarvester.harvest(creep, spawnName);
                } else if (creep.memory.role === ROLE.UPGRADE) {
                    if (!needHarvesters) {
                        roleUpgrader.run(creep);
                    }
                } else if (creep.memory.role === ROLE.BUILD) {
                    if (!needHarvesters) {
                        if (!creep.memory.task) {
                            var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                            if (constructionSites && constructionSites.length > 0) {
                                creep.memory.task = "construction";
                            } else {
                                var towers = creep.room.find(FIND_STRUCTURES, {filter: (s) => s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity * 0.9});
                                if (towers && towers.length > 0) {
                                    creep.memory.task = "tower";
                                } else {
                                    var structures = Game.rooms[roomName].find(FIND_STRUCTURES, {filter: (s) => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART && s.hits < s.hitsMax * 0.7});
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

                        if (creep.memory.task === "construction")
                            roleBuilder.build(creep);
                        if (creep.memory.task === "tower")
                            roleBuilder.tower(creep);
                        if (creep.memory.task === "structure")
                            roleBuilder.repair(creep);
                        if (creep.memory.task === "wall")
                            roleBuilder.wall(creep);

                    }
                } else if (creep.memory.role === ROLE.HAUL) {
                    roleTransferer.run(creep);
                } else if (creep.memory.role === ROLE.SCOUT) {
                    roleScout.poke(creep);
                } else if (creep.memory.role === ROLE.SWARM) {
                    roleSwarm.swarm(creep);
                } else if (creep.memory.role === "claim") {
                    roleClaim.claim(creep);
                } else if (creep.memory.role === "tempBuilder") {
                    roleTempBuilder.build(creep);
                }
            }
        }
    }
};

module.exports = taskWork;