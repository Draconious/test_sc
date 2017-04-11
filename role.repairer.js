var taskGetEnergy = require('task.get_energy');

var roleRepairer = {

    /** @param {Creep} creep **/
    run: function (creep) {

        if (creep.carry.energy === 0) {
            creep.memory.repairing = false;
        }

        if (!creep.memory.repairing && creep.carry.energy < creep.carryCapacity) {
            taskGetEnergy.run(creep);
        } else {
            var closestConstruction = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);

            if (closestConstruction) {
                if (creep.build(closestConstruction) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestConstruction, {visualizePathStyle: {stroke: '#FF00FF'}});
                }

                creep.memory.repairing = true;
                return;
            }

            var towers = Game.rooms[ROOM_NAME].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});
            var nearestTower = creep.pos.findClosestByRange(towers);

            if (nearestTower && nearestTower.energy < nearestTower.energyCapacity) {
                if (creep.transfer(nearestTower, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearestTower, {visualizePathStyle: {stroke: '#FFFFFF'}});
                }
                return;
            }

            var roomStructures = creep.room.find(FIND_STRUCTURES);

            var toRepair = [];
            for (var index in roomStructures) {
                if ((roomStructures[index].hits / roomStructures[index].hitsMax) < 0.5) {
                    toRepair.push(roomStructures[index]);
                }
            }

            if (toRepair.length) {
                var structure = toRepair[0];
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure, {visualizePathStyle: {stroke: '#FFFF00'}});
                }

                creep.memory.repairing = true;
                return;
            }
        }
    }
};

module.exports = roleRepairer;