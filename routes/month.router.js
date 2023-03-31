const express = require('express');
const router = express.Router();
const Month = require('../model/month')
const MeaalCount = require('../model/mealCount')
const {json} = require("express");
const {ObjectId} = require('mongodb');
router.post('/save', async (req, res) => {
    try {
        const month = new Month({
            name: req.body.name,
        })
        const monthRes = await month.save();
        const mealCount = req.body.mealCountList
        mealCount.forEach(e => {
            const mealC = new MeaalCount({
                ...e,
                month: monthRes._id
            })
            mealC.save();
        })
        res.status(200).json("created successfully"
        )
    } catch (error) {
        res.status(400).json({
            error: error.message
        });
    }
})

router.get('/', async (req, res) => {


    try {

        const month = await Month.aggregate([{
            $lookup: {
                from: 'mealcounts',
                localField: '_id',
                foreignField: 'month',
                as: 'mealCountList',
            },
        }]);
        res.status(200).json(month)
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
})
router.get('/:id', async (req, res) => {


    try {

        const month = await Month.aggregate([
            {$match: {_id: ObjectId(req.params.id)}},
            {
                $lookup: {
                    from: 'mealcounts',
                    localField: '_id',
                    foreignField: 'month',
                    as: 'mealCountList',
                },
            }]);
        res.status(200).json(month[0])
    } catch (error) {
        res.status(400).json({
            error: error
        });
    }
})
module.exports = router;