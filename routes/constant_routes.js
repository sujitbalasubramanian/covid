const express = require('express');
const router = express.Router();

const {
    max_slot,
    update_max_slot,
    dosage_names,
    add_dosage_names,
    vaccine_names,
    add_vaccine_names
} = require('../controllers/constant_controller');

const {
    getcenters
} = require('../controllers/center_controller')

router.get('/getcenters', getcenters)

router.get('/maxslot', max_slot)
router.patch('/update_maxslot', update_max_slot)

router.get('/dosage_names', dosage_names)
router.patch('/add_dosage_names', add_dosage_names)

router.get('/vaccine_names', vaccine_names)
router.patch('/add_vaccine_names', add_vaccine_names)


module.exports = router;
