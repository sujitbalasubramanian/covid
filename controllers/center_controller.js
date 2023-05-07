const Centers = require('../model/centers')

module.exports.getcenters = async (req, res) => {
    const centers = await Centers.find({});
    res.status(200).send(centers);
}

module.exports.addcenter = async (req, res) => {
    try {
        const existingcenter = await Centers.findOne({center_name: req.body.center_name})
        if (existingcenter) {
            return res.status(400).json('User already found..')
        }
        const newCenter = new Centers({...req.body});
        await newCenter.save();
        res.status(200).json(newCenter)
    } catch (error) {
        res.status(200).json(error);
    }
}

module.exports.updatecenter = async (req, res) => {
    try {
        await Centers.findOneAndUpdate({center_name: req.body.center_name}, {...req.body});
        res.status(200).json("Successfully Edited");
    } catch (error) {
        res.status(500).json(error);
    }
}


module.exports.deletecenter = async (req, res) => {
    try {
        await Centers.findOneAndDelete({center_name: req.body.center_name});
        res.status(200).json("Deleted Successfully");
    } catch (error) {
        res.status(500).json(error);
    }
}
