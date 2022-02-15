var express = require('express');
const async = require('hbs/lib/async');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        var novedades = await novedadesModel.getNovedades();

        res.render('admin/novedades',
            {
                layout: 'admin/layout',
                usuario: req.session.nombre,
                novedades
            });

    } catch (error) {
        console.log(error);
    }
});

router.get('/agregar', (req, res, next) => {
    try {
        res.render('admin/agregar',
            {
                layout: 'admin/layout',
            });

    } catch (error) {
        console.log(error);
    }
});

router.get('/eliminar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        await novedadesModel.eliminarNovedadesPorId(id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error);
    }
});

router.get('/modificar/:id', async (req, res, next) => {
    try {
        var id = req.params.id;
        var novedad = await novedadesModel.getNovedadesPorId(id);
        res.render('admin/modificar',
            {
                layout: 'admin/layout',
                novedad
            })
    } catch (error) {
        console.log(error);
    }
});

router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.subtitulo != "" && req.body.cuerpo != "") {
            await novedadesModel.insertNovedades(req.body);
            res.redirect('/admin/novedades');
        } else {
            res.render('admin/agregar',
                {
                    layout: 'admin/layout',
                    error: true,
                    message: 'Debe completar todos los campos'
                })
        }
    } catch (error) {
        console.log(error);
        res.render('admin/agregar',
            {
                layout: 'admin/layout',
                error: true,
                message: 'No se pudo cargar la novedad'
            })
    }
});

router.post('/modificar', async (req, res, next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            subtitulo: req.body.subtitulo,
            cuerpo: req.body.cuerpo
        }

        await novedadesModel.updateNovedadesPorId(obj, req.body.id);
        res.redirect('/admin/novedades');

    } catch (error) {
        console.log(error);
        res.render('admin/modificar',
            {
                layout: 'admin/layout',
                error: true,
                message: 'No se pudo modificar la novedad'
            })
    }
});

module.exports = router;