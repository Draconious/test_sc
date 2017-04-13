var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleTransferer = require('role.transferer');
var roleScout = require('role.scout');
var my_constants = require('my_constants');

var taskWork = {

    run: function (needHarvesters) {
        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role === ROLE.HARVEST) {
                roleHarvester.harvest(creep);
            } else if (creep.memory.role === ROLE.UPGRADE) {
                if (!needHarvesters) {
                    roleUpgrader.run(creep);
                }
            } else if (creep.memory.role === ROLE.BUILD) {
                if (!needHarvesters) {
                    var constructionSites = creep.room.find(FIND_CONSTRUCTION_SITES);
                    if (constructionSites && constructionSites.length > 0) {
                        roleBuilder.build(creep);
                        return;
                    }

                    var towers = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_TOWER && s.energy < s.energyCapacity });
                    if (towers && towers.length > 0) {
                        roleBuilder.tower(creep);
                        return;
                    }

                    var structures = Game.rooms[ROOM_NAME].find(FIND_STRUCTURES, { filter: (s) => s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART && s.hits < s.hitsMax });
                    if (structures && structures.length > 0) {
                        roleBuilder.repair(creep);
                        return;
                    }

                    var walls = creep.room.find(FIND_STRUCTURES, { filter: (s) => s.structureType === STRUCTURE_WALL && s.hits < s.hitsMax});
                    if (walls && walls.length > 0) {
                        roleBuilder.wall(creep);
                        return;
                    }
                }
            } else if (creep.memory.role === ROLE.HAUL) {
                roleTransferer.run(creep);
            } else if (creep.memory.role === ROLE.SCOUT) {
                roleScout.run(creep);
            }
        }
    }
};

module.exports = taskWork;