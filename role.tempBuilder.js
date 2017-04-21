var taskGetEnergy = require('task.get_energy');

var roleTempBuilder = {

    build: function (creep) {
        creep.moveTo(new RoomPosition(30, 1, "E7S93"));
    }
};

module.exports = roleTempBuilder;