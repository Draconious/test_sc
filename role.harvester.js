var roleHarvester = {

    harvest: function(creep) {
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            
            if (!creep.pos.isNearTo(sources[creep.memory.source ? creep.memory.source : 0])) {
                creep.moveTo(sources[creep.memory.source ? creep.memory.source : 0], {visualizePathStyle: {stroke: creep.memory.out_colour}});
                return;
            }
            
            creep.harvest(sources[creep.memory.source ? creep.memory.source : 0]);
        } else {
            var target = null;
            var containers = creep.room.find(FIND_STRUCTURES, {
                filter: (container) => {
                    return (container.structureType === STRUCTURE_CONTAINER || container.structureType === STRUCTURE_STORAGE) && container.store[RESOURCE_ENERGY] < container.storeCapacity;
                }
            });

            if (containers && containers.length > 0) {
                target = creep.pos.findClosestByRange(containers);
            } else {

                var lowSpawns = creep.room.find(FIND_MY_SPAWNS, {
                    filter: (spawn) => {
                        return spawn.energy < spawn.storeCapacity;
                    }
                });

                if (lowSpawns && lowSpawns.length > 0) {
                    target = lowSpawns[0];
                } else {

                    var structures = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return (structure.structureType === STRUCTURE_EXTENSION) && structure.energy < structure.energyCapacity;
                        }
                    });

                    if (structures.length > 0) {
                        target = creep.pos.findClosestByRange(structures);
                    }
                }
            }
            
            if (target) {
                if (!creep.pos.isNearTo(target)){
                    creep.moveTo(target, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                    return;
                }
                creep.transfer(target, RESOURCE_ENERGY);
            }

        }
	},

    remoteHarvest: function(creep) {

        var remoteRoomName = creep.memory.room;

        if (creep.carry.energy === 0) {
            creep.memory.targetId = null;
        }

        if (!creep.memory.targetId && creep.carry.energy < creep.carryCapacity) {
            if (creep.room.name !== remoteRoomName) {
                creep.moveTo(new RoomPosition(25,25, remoteRoomName), {visualizePathStyle: {stroke: creep.memory.out_colour}});
                return;
            }
            var source = creep.pos.findClosestByPath(FIND_SOURCES);

            if (!creep.pos.isNearTo(source)) {
                creep.moveTo(source, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                return;
            }

            creep.harvest(source);
        } else {
            if (Game.rooms[remoteRoomName]) {
                var buildSite;

                if (creep.memory.targetId) {
                    buildSite = Game.getObjectById(creep.memory.targetId)
                }

                if (!buildSite) {
                    var constructions = Game.rooms[remoteRoomName].find(FIND_MY_CONSTRUCTION_SITES);
                    if (constructions) {

                        buildSite = creep.pos.findClosestByPath(constructions);
                        if (buildSite) {
                            creep.memory.targetId = buildSite.id;
                        } else {
                            creep.memory.targetId = null;
                        }

                    }
                }

                if (buildSite) {
                    if (creep.build(buildSite) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(buildSite, {visualizePathStyle: {stroke: creep.memory.out_colour}});
                    }
                    return;
                }
            }

            if (creep.room.name !== creep.memory.spawnRoom) {
                creep.moveTo(new RoomPosition(25,25, creep.memory.spawnRoom), {visualizePathStyle: {stroke: creep.memory.out_colour}});
                return;
            }

            this.harvest(creep);
        }
	}
};

module.exports = roleHarvester;