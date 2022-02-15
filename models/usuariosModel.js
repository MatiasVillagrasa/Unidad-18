var pool = require('./bd');
var md5 = require('md5');

async function getUsuario(user, password) {
    try {
        var query = `SELECT id, usuario, password 
                     FROM usuarios 
                     WHERE usuario = ? AND password = ? 
                     LIMIT 1`;
        var rows = await pool.query(query, [user, md5(password)]);
        return rows[0];
    } catch (error) {
        console.log(error);
    }
}

module.exports = { getUsuario }