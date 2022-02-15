var pool = require('./bd');

async function getNovedades() {
    try {
        var query = `SELECT id, titulo, subtitulo, cuerpo 
                     FROM novedades`;
        var rows = await pool.query(query);

        return rows;
    }
    catch (error) {
        console.log(error);
    }
}

async function insertNovedades(obj) {
    try {
        var query = `INSERT INTO novedades SET ?`;
        var rows = await pool.query(query, [obj]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function eliminarNovedadesPorId(id) {
    try {
        var query = `DELETE FROM novedades WHERE id = ?`;
        var rows = await pool.query(query, [id]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function getNovedadesPorId(id) {
    try {
        var query = `SELECT * FROM novedades WHERE id = ?`;
        var rows = await pool.query(query, [id]);
        return rows[0];
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateNovedadesPorId(obj, id) {
    try {
        var query = `UPDATE novedades SET ? WHERE id = ?`;
        var rows = await pool.query(query, [obj, id]);
        return rows;
    }
    catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = { getNovedades, insertNovedades, eliminarNovedadesPorId, updateNovedadesPorId, getNovedadesPorId };