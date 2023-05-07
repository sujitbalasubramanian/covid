const Doseage = require('../model/doseage')
const Centers = require('../model/centers')
const constants = require('../constant')
const User = require('../model/user')

module.exports.bookAppointment = async (req, res) => {
    const {vaccine_name, dosage_name} = req.body;
    try {
        const user = await User.findOne({mobile_number: req.body.patient})
        const seleted_center = await Centers.findOne({center_name: req.body.center})

        const existingappointment = await Doseage.findOne({patient: user._id, appointment_status: "active"})
        if (existingappointment) {
            return res.status(400).json('Appoitment already found..')
        }

        const existingcenter_count = await Doseage.find({center: seleted_center._id, appointment_status: "active"}).count()
        if (existingcenter_count === constants.max_slots) {
            return res.status(400).json('max count reached')
        }

        var lastestappointments = await Doseage.find({center: seleted_center._id}).sort({appointment_time: 'asc'})
        if (lastestappointments.length == 0 || lastestappointments[0].appointment_time > seleted_center.timing.end) {
            var appointment_time = seleted_center.timing.start;
        }
        else {
            var appointment_time = new Date(lastestappointments[0].appointment_time.getTime() + constants.appointment_duration * 60000).getTime();
        }

        const newAppointment = await Doseage({patient: user._id, center: seleted_center._id, appointment_time, vaccine_name, dosage_name});
        await newAppointment.save();
        res.status(200).json(newAppointment)
    } catch (error) {
        res.status(200).json(error);
    }
}

module.exports.cancelAppointment = async (req, res) => {
    try {
        const user = await User.findOne({mobile_number: req.body.patient})
        const dose = await Doseage.findOneAndUpdate({patient: user._id, appointment_status: 'active'}, {appointment_status: 'cancelled'});
        console.log(user, dose)
        res.status(200).json("Cancelled Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports.completeAppointment = async (req, res) => {
    try {
        const user = await User.findOne({mobile_number: req.body.patient})
        const dose = await Doseage.findOneAndUpdate({patient: user._id, appointment_status: 'active'}, {appointment_status: 'completed', vaccination_done: true});
        res.status(200).json("Completed Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}

