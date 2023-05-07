const express = require('express');
const router = express.Router();

const {
    addcenter,
    updatecenter,
    deletecenter
} = require('../controllers/center_controller')


router.post('/add_center', addcenter)
router.patch('/update_center', updatecenter)
router.delete('/delete_center', deletecenter)


module.exports = router
