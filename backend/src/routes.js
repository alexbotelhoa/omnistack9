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
 * GET     /                 ->  index
 * GET     /new              ->  new
 * POST    /                 ->  create
 * GET     /:id              ->  show
 * GET     /:id/edit         ->  edit
 * PUT     /:id              ->  update
 * DELETE  /:id              ->  destroy
 * */
routes.resource('sessions', SessionController)

routes.get('/spots', SpotController.index)
routes.post('/spots', upload.single('thumbnail'), SpotController.store)

routes.get('/dashboard', DashboardController.show)

routes.post('/spots/:spot_id/bookings', BookingController.store)

module.exports = routes