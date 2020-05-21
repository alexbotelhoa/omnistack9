const express = require('express')
    , resource = require('express-resource')
    , routes = express()
const multer = require('multer')
const uploadConfig = require('./config/upload')
const upload = multer(uploadConfig)

const SessionController = require('./controllers/SessionController')
const SpotController = require('./controllers/SpotController')
const DashboardController = require('./controllers/DashboardController')
const BookingController = require('./controllers/BookingController')

routes.get('/', (req, res) => res.send('Ok!'))

/**
 * routes.resource('rota', require('./RotaController'))
 * GET     /rota/                 ->  index
 * GET     /rota/new              ->  new
 * POST    /rota/                 ->  create
 * GET     /rota/:id              ->  show
 * GET     /rota/:id/edit         ->  edit
 * PUT     /rota/:id              ->  update
 * DELETE  /rota/:id              ->  destroy
 * */
routes.resource('sessions', SessionController)

routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/spots/:spot_id/bookings', BookingController.store)

module.exports = routes