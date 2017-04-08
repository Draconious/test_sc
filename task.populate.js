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

        if(harvesters.length < 3) {
            console.log("Create harvester " + harvesters.length + ", source " + (harvesters.length === 0 || harvesters[harvesters.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'harvester', source: (harvesters.length === 0 || harvesters[harvesters.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (upgraders.length < 2) {
            console.log("Create upgrader " + upgraders.length + ", source " + (upgraders.length === 0 || upgraders[upgraders.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'upgrader', source: 1});
        } else if (builders.length < 2) {
            console.log("Create builder " + builders.length + ", source " + (builders.length === 0 || builders[builders.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'builder', source: (builders.length === 0 || builders[builders.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (repairers.length < 1) {
            console.log("Create repairer " + repairers.length + ", source " + (repairers.length === 0 || repairers[repairers.length - 1].memory.source === 0 ? 1 : 0));
            Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'repairer', source: (repairers.length === 0 || repairers[repairers.length - 1].memory.source === 0 ? 1 : 0)});
        } else if (transferers.length < 0) {
            console.log("Create transferer " + transferers.length + ", source " + (transferers.length === 0 || transferers[transferers.length - 1].memory.source === 0 ? 1 : 0));
            //Game.spawns.Spawn1.createCreep([WORK, CARRY, CARRY, MOVE, MOVE], null, {role: 'transferer', source: (transferers.length === 0 || transferers[transferers.length - 1].memory.source === 0 ? 1 : 0)});
        }
	}
};

module.exports = taskPopulate;




