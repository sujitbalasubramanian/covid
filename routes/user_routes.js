const express = require('express');
const router = express.Router();

const {
    login,
    signup
} = require('../controllers/user_controller');

const {
    bookAppointment,
    cancelAppointment,
    completeAppointment
} = require('../controllers/dosage_controller')

router.post('/login', login)
router.post('/signup', signup)

router.post('/add_appointment', bookAppointment)
router.patch('/cancel_appointment', cancelAppointment)
router.patch('/complete_appointment', completeAppointment)


module.exports = router
