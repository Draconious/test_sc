var taskPopulate = {

    /** @param {Creep} creep **/
    run: function () {
        var backupSourceSize = 2;

        var harvesterSource = 0;
        var harvesterCount = 0;
        var maxHarvesterCount = 6;

        var upgraderSource = 0;
        var upgraderCount = 0;
        var maxUpgraderCount = 5;

        var repairerSource = 0;
        var repairerCount = 0;
        var maxRepairerCount = 3;

        var transfererSource = 0;
        var transfererCount = 0;
        var maxTransfererCount = 2;

        for (var i in Game.creeps) {
            if (Game.creeps[i].memory.role === 'harvester') {
                harvesterCount++;
                harvesterSource = harvesterSource + parseInt(Game.creeps[i].memory.source, 10);
            }
            if (Game.creeps[i].memory.role === 'upgrader') {
                upgraderCount++;
                upgraderSource = upgraderSource + parseInt(Game.creeps[i].memory.source, 10);
            }
            if (Game.creeps[i].memory.role === 'repairer') {
                repairerCount++;
                repairerSource = repairerSource + parseInt(Game.creeps[i].memory.source, 10);
            }
            if (Game.creeps[i].memory.role === 'transferer') {
                transfererCount++;
                transfererSource = transfererSource + parseInt(Game.creeps[i].memory.source, 10);
            }
        }

        if (harvesterCount < maxHarvesterCount) {
            console.log("Create harvester " + harvesterCount + ", source " + (harvesterSource < maxHarvesterCount - backupSourceSize ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE], null, {role: 'harvester', source: (harvesterSource < maxHarvesterCount - backupSourceSize ? 1 : 0)});
        } else if (upgraderCount < maxUpgraderCount) {
            console.log("Create upgrader " + upgraderCount + ", source " + 1);
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: 1});
        } else if (repairerCount < maxRepairerCount) {
            console.log("Create repairer " + repairerCount + ", source " + (repairerSource < Math.ceil(maxRepairerCount / 2) ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'repairer', source: (repairerSource < 3 ? 1 : 0)});
        } else if (transfererCount < maxTransfererCount) {
            console.log("Create transferer " + transfererCount + ", source " + 0);
            Game.spawns.Spawn1.createCreep([CARRY, CARRY, MOVE, MOVE], null, {role: 'transferer', source: 0});
        }
    }
};

module.exports = taskPopulate;