var taskPopulate = {

    /** @param {Creep} creep **/
    run: function() {
        var harvesters = [];
        var builders = [];
        var upgraders = [];
        var repairers = [];
        var transferers = [];

        for(var i in Game.creeps) {
            if (Game.creeps[i].memory.role === 'harvester') {
                harvesters.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'upgrader') {
                upgraders.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'builder') {
                builders.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'repairer') {
                repairers.push(Game.creeps[i]);
            }
            if (Game.creeps[i].memory.role === 'transferer') {
                transferers.push(Game.creeps[i]);
            }
        }

        console.log("H = " + harvesters.length + " U = " + upgraders.length + " B = " + builders.length + " R = " + repairers.length + " T = " + transferers.length);

        if(harvesters.length < 3) {
            console.log("Create harvester, source " + (harvesters.length > 0 && harvesters[harvesters.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'harvester', source: (harvesters.length > 0 && harvesters[harvesters.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (upgraders.length < 2) {
            console.log("Create upgrader, source " + (upgraders.length > 0 && upgraders[upgraders.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: (upgraders.length > 0 && upgraders[upgraders.length - 1].memory.source === 0 ? 1 : 0)});
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: 1});
        } else if (builders.length < 2) {
            console.log("Create builder, source " + (builders.length > 0 && builders[builders.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'builder', source: (builders.length > 0 && builders[builders.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (repairers.length < 1) {
            console.log("Create repairer, source " + (repairers.length > 0 && repairers[repairers.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'repairer', source: (repairers.length > 0 && repairers[repairers.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (transferers.length < 1) {
            console.log("Create transferer, source " + (transferers.length > 0 && transferers[transferers.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'transferer', source: (transferers.length > 0 && transferers[transferers.length - 1].memory.source === 0 ? 1 : 0)});
        }
	}
};

module.exports = taskPopulate;




