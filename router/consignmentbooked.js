const express = require("express");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const consignment = require('../model/consignment')
const User = require('../model/user')
const jwtaccess = require("../middleware/authaccess");
const router = express.Router();

router.post('/bookconsignment',jwtaccess, async (req, res) => {
    try {
        var user = await User.findById(req.userid);
        if (!user) {
            return res.json({ status: -1 });
        }
        let Consignment = await consignment.create({
            email: user.email,
            userID: user._id,
            addressFrom: req.body.addressFrom,
            addressTo: req.body.addressTo,
            pincodeFrom: req.body.pincodeFrom,
            pincodeTo: req.body.pincodeTo,
            weight: req.body.weight,
            phone: req.body.phone
        })
            .then((user) => {
                res.json({ status: 0, id : user._id })
            })
            .catch((error) => res.json({ status: -1 }));
    } catch (error) {
        res.json({ status: -1 })
    }
})

router.post('/trackconsignment',async(req,res)=>{
    try {
        var Consignment = await consignment.findById(req.body.id);
        if (!Consignment) {
            return res.json({ status: -1 });
        }
        let data = {
            id : Consignment._id,
            addressFrom: Consignment.addressFrom,
            addressTo: Consignment.addressTo,
            pincodeFrom: Consignment.pincodeFrom,
            pincodeTo: Consignment.pincodeTo,
            weight: Consignment.weight,
            phone: Consignment.phone
        }

        return res.json({status:0,data})
    } catch (error) {
        res.json({ status: -1 })
    }
})

module.exports = router