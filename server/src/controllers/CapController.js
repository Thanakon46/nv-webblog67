const { Cap } = require('../models');

module.exports = {
    // get all cap
    async index(req, res) {
        try {
            const caps = await Cap.findAll()
            res.send(caps)
        } catch (err) {
            res.status(500).send({
                error: 'The caps information was incorrect'
            })
        }
    },
    // create cap
    async create(req, res) {
        // res.send(JSON.stringify(req.body))
        try {
            console.log('Cap create req.body:',req.body)
            const cap = await Cap.create(req.body)
            console.log('Cap create cap:',cap)
            res.send(cap.toJSON())
        } catch (err) {
            console.log('Cap create err:',err)
            res.status(500).send({
                error: 'Create cap incorrect'
            })
        }
    },
    // edit cap, suspend, active
    async put(req, res) {
        try {
            await Cap.update(req.body, {
                where: {
                    id: req.params.capId
                }
            })
            res.send(req.body)
        } catch (err) {
            res.status(500).send({
                error: 'Update cap incorrect'
            })
        }
    },
    // delete cap
    async remove(req, res) {
        try {
            const cap = await Cap.findOne({
                where: {
                    id: req.params.capId
                }
            })
            if (!cap) {
                return res.status(403).send({
                    error: 'The cap information was incorrect'
                })
            }
            await cap.destroy()
            res.send(cap)
        } catch (err) {
            res.status(500).send({
                error: 'The cap information was incorrect'
            })
        }
    },
    // get cap by id
    async show(req, res) {
        try {
            const cap = await Cap.findByPk(req.params.capId)
            res.send(cap)
        } catch (err) {
            req.status(500).send({
                error: 'The cap information was incorrect'
            })
        }
    }
}