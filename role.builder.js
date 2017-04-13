var taskGetEnergy = require('task.get_energy');

var roleRepairer = {

    build: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.busy = false;
        }

        if (!creep.memory.busy && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            var closestConstruction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            if (closestConstruction) {
                if (creep.build(closestConstruction) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestConstruction, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                }

                creep.memory.busy = true;
                return;
            }
        }
    },

    repair: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.busy = false;
        }

        if (!creep.memory.busy && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {

            var closestDamagedStructure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (s) =>  s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART && s.hits < (s.hitsMax * 0.9)
            });

            if (closestDamagedStructure) {
                if (creep.repair(closestDamagedStructure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestDamagedStructure, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                }

                creep.memory.busy = true;
                return;
            }
        }
    },

    tower: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.busy = false;
        }

        if (!creep.memory.busy && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            var towers = Game.rooms[ROOM_NAME].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            var nearestTower = creep.pos.findClosestByRange(towers);

            if (nearestTower && nearestTower.energy < nearestTower.energyCapacity) {
                if (creep.transfer(nearestTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestTower, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                }

                creep.memory.busy = true;
                return;
            }
        }

    },

    wall: function (creep) {
        if (creep.carry.energy === 0) {
            creep.memory.busy = false;
        }

        if (!creep.memory.busy && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType === STRUCTURE_WALL
                }
            });

            var lowestWall = _.min(walls, function (wall) {
                return wall.hits;
            });
            
            if (lowestWall) {
                if (creep.repair(lowestWall) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(lowestWall, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                }
            }

            creep.memory.busy = true;
            return;
        }

    }
};

module.exports = roleRepairer;