const sequelize = require('../DB');

const User = require('./User');
const Note = require('./Note');

User.hasMany(Note);
Note.belongsTo(User);

const init = async () => {
    await sequelize.sync({alter: true});
    await User.sync({alter: true});
    await Note.sync({alter: true});
}

module.exports = { init, User, Note };