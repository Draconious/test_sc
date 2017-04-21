var taskGetEnergy = require('task.get_energy');

var roleRepairer = {

    build: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.task = null;
            creep.memory.targetId = null;
        }

        if (!creep.memory.task && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            if (!creep.memory.targetId) {
                var structure = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES);

                if (structure) {
                    creep.memory.targetId = structure.id;
                }
            }

            var target = Game.getObjectById(creep.memory.targetId);
            if (target && creep.build(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.out_colour}});
            } else {
                creep.memory.task = null;
                creep.memory.targetId = null;
            }
        }
    },

    repair: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.task = null;
            creep.memory.targetId = null;
        }

        if (!creep.memory.task && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            if (!creep.memory.targetId) {
                var structure = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) =>  s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART && s.hits < (s.hitsMax * 0.7)
                });

                if (structure) {
                    creep.memory.targetId = structure.id;
                }
            }

            var target = Game.getObjectById(creep.memory.targetId);
            if (target && target.hits < (target.hitsMax * 0.9) && creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.out_colour}});
            } else {
                creep.memory.task = null;
                creep.memory.targetId = null;
            }
        }
    },

    tower: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.task = null;
            creep.memory.targetId = null;
        }

        if (!creep.memory.task && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            if (!creep.memory.targetId) {
                var towers = Game.rooms[creep.room.name].find(FIND_MY_STRUCTURES, {
                    filter: (s) =>  s.structureType === STRUCTURE_TOWER && s.energy < (s.energyCapacity * 0.9)
                });

                var tower = creep.pos.findClosestByRange(towers);
                if (tower) {
                    creep.memory.targetId = tower.id;
                }
            }

            var target = Game.getObjectById(creep.memory.targetId);
            if (target && target.energy < (target.energyCapacity * 0.9) && creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.out_colour}});
            } else {
                creep.memory.task = null;
                creep.memory.targetId = null;
            }
        }

    },

    wall: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.task = null;
            creep.memory.targetId = null;
        }

        if (!creep.memory.task && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            if (!creep.memory.targetId) {
                var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return structure.structureType === STRUCTURE_WALL
                    }
                });

                var lowestWall = _.min(walls, function (wall) {
                    return wall.hits;
                });

                if (lowestWall) {
                    creep.memory.targetId = lowestWall.id;
                }
            }

            var target = Game.getObjectById(creep.memory.targetId);
            if (target && target.hits < (target.hitsMax * 0.9) && creep.repair(target) === ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.out_colour}});
            } else {
                creep.memory.task = null;
                creep.memory.targetId = null;
            }
        }

    }
};

module.exports = roleRepairer;