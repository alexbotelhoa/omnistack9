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
const ApprovalController = require('./controllers/ApprovalController')
const RejectionController = require('./controllers/RejectionController')

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
routes.get('/spots/:spot_id/edit', SpotController.edit)
routes.put('/spots/:spot_id', upload.single('thumbnail'), SpotController.update);
routes.delete('/spots/:spot_id', SpotController.delete);

routes.get('/dashboard', DashboardController.show)

routes.post('/spots/:spot_id/bookings', BookingController.store)

routes.post('/bookings/:booking_id/approvals', ApprovalController.store)
routes.post('/bookings/:booking_id/rejections', RejectionController.store)

module.exports = routes