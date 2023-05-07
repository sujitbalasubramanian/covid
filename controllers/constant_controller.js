const constants = require('../constant')

module.exports.max_slot = (req, res) => {
    res.json(constants.max_slots);
}

module.exports.update_max_slot = (req, res) => {
    constants.max_slots = Number(req.query.max_slot);
    res.json(constants.max_slots);
}

module.exports.dosage_names = (req, res) => {
    res.json(constants.dosage_names);
}

module.exports.add_dosage_names = (req, res) => {
    console.log(req.query)
    res.json(constants.dosage_names.push(req.query.dosage_name));
}

module.exports.vaccine_names = (req, res) => {
    res.json(constants.vaccine_names);
}

module.exports.add_vaccine_names = (req, res) => {
    res.json(constants.vaccine_names.push(req.query.vaccine_name));
}
