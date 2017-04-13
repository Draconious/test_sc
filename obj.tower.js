module.exports = {
    defend: function (myRoomName) {
        var towers = Game.rooms[myRoomName].find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}});

        var hostileHealers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, {
            filter: (s) => s.getActiveBodyparts(HEAL) > 0 && MY_FRIENDS.indexOf(s.owner.username) === -1
        });
        if (hostileHealers.length > 0) {
            towers.forEach(tower => tower.attack(hostileHealers[0]));
            return;
        }

        var hostileAttackers = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, {
            filter: (s) => (s.getActiveBodyparts(ATTACK) > 0 || s.getActiveBodyparts(RANGED_ATTACK) > 0) && MY_FRIENDS.indexOf(s.owner.username) === -1
        });
        if (hostileAttackers.length > 0) {
            towers.forEach(tower => tower.attack(hostileAttackers[0]));
            return;
        }

        var hostiles = Game.rooms[myRoomName].find(FIND_HOSTILE_CREEPS, {
            filter: (s) => MY_FRIENDS.indexOf(s.owner.username) === -1
        });
        if (hostiles.length > 0) {
            towers.forEach(tower => tower.attack(hostiles[0]));
            return;
        }

        for (var name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.hits < creep.hitsMax) {
                towers.forEach(tower => tower.heal(creep));
            }
        }

        for (var index in towers) {
            if (towers[index].energy > (towers[index].energyCapacity * 0.5)) {

                var closestDamagedStructure = towers[index].pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (s) => (s.hits < s.hitsMax) && s.structureType !== STRUCTURE_WALL && s.structureType !== STRUCTURE_RAMPART
                });

                if (closestDamagedStructure) {
                    towers[index].repair(closestDamagedStructure);
                }
            }
        }
    }
};