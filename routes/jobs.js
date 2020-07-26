const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const Job = require('./../models/Job');


router.get('/add', ensureAuth, (req, res) => {
    res.render('job/add');
});

router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id;
        await Job.create(req.body);
        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

router.get('/', ensureAuth, async (req, res) => {
    try {
        const jobs = await Jobs.find({status: 'public'})
            .populate('user')
            .sort({createdAt: 'desc'})
            .lean();
        res.render('job/index', {
            stories
        })
    } catch (err) {
        console.error(err);
        res.render('error/500');
    }
});

router.get('/add')

module.exports = router;