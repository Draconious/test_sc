var taskPopulate = {

    /** @param {Creep} creep **/
    run: function() {
        var harvesterSource = 0;
        var harvesterCount = 0;
        var maxHarvesterCount = 5;

        var upgraderSource = 0;
        var upgraderCount = 0;
        var maxUpgraderCount = 3;

        var repairerSource = 0;
        var repairerCount = 0;
        var maxuRepairerCount = 3;

        var transfererSource = 0;
        var transfererCount = 0;
        var maxuTransfererCount = 3;

        for(var i in Game.creeps) {
            if (Game.creeps[i].memory.role === 'harvester') {
                harvesterCount++;
                harvesterSource = harvesterSource + Game.creeps[i].source;
            }
            if (Game.creeps[i].memory.role === 'upgrader') {
                upgraderCount++;
                upgraderSource = upgraderSource + Game.creeps[i].source;
            }
            if (Game.creeps[i].memory.role === 'repairer') {
                repairerCount++;
                repairerSource = repairerSource + Game.creeps[i].source;
            }
            if (Game.creeps[i].memory.role === 'transferer') {
                transfererCount++;
                transfererSource = transfererSource + Game.creeps[i].source;
            }
        }

        if(harvesterCount < maxHarvesterCount) {
            console.log("Create harvester " + harvesterCount + ", source " + (harvesterSource < Math.ceil(maxHarvesterCount / 2) ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, WORK, CARRY, CARRY, MOVE], null, {role: 'harvester', source: (harvesterSource < 3 ? 1 : 0)});
        } else if (upgraderCount < maxUpgraderCount) {
            console.log("Create upgrader " + upgraderCount + ", source " + (upgraderSource < Math.ceil(maxUpgraderCount / 2) ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: (upgraderSource < 3 ? 1 : 0)});
        } else if (repairerCount < maxuRepairerCount) {
            console.log("Create repairer " + repairerCount + ", source " + (repairerSource < Math.ceil(maxRepairerCount / 2) ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'repairer', source: (repairerSource < 3 ? 1 : 0)});
        } else if (transfererCount < maxuTransfererCount) {
            console.log("Create transferer " + transfererCount + ", source " + 0);
            Game.spawns.Spawn1.createCreep([CARRY, CARRY, MOVE, MOVE], null, {role: 'transferer', source: 0});
        }
	}
};

module.exports = taskPopulate;