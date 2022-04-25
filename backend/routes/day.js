const express = require("express");
const pool = require("../config");
router = express.Router();

router.get('/mon_day', async (req, res, next) => {
    const mon_day = await pool.query("SELECT * FROM normal_day WHERE day = ?", ['mon'])
    res.json(mon_day)
})

router.get('/mon_night', async (req, res, next) => {
    const mon_night = await pool.query("SELECT * FROM normal_night WHERE day = ?", ['mon'])
    res.json(mon_night)
})

router.get('/tue_day', async (req, res, next) => {
    const tue_day = await pool.query("SELECT * FROM normal_day WHERE day = ?", ['tue'])
    res.json(tue_day)
})

router.get('/tue_night', async (req, res, next) => {
    const tue_night = await pool.query("SELECT * FROM normal_night WHERE day = ?", ['tue'])
    res.json(tue_night)
})

router.get('/wed_day', async (req, res, next) => {
    const wed_day = await pool.query("SELECT * FROM normal_day WHERE day = ?", ['wed'])
    res.json(wed_day)
})

router.get('/wed_night', async (req, res, next) => {
    const wed_night = await pool.query("SELECT * FROM normal_night WHERE day = ?", ['wed'])
    res.json(wed_night)
})

router.get('/thu_day', async (req, res, next) => {
    const thu_day = await pool.query("SELECT * FROM normal_day WHERE day = ?", ['thu'])
    res.json(thu_day)
})

router.get('/thu_night', async (req, res, next) => {
    const thu_night = await pool.query("SELECT * FROM normal_night WHERE day = ?", ['thu'])
    res.json(thu_night)
})

router.get('/fri_day', async (req, res, next) => {
    const fri_day = await pool.query("SELECT * FROM normal_day WHERE day = ?", ['fri'])
    res.json(fri_day)
})

router.get('/fri_night', async (req, res, next) => {
    const fri_night = await pool.query("SELECT * FROM normal_night WHERE day = ?", ['fri'])
    res.json(fri_night)
})

router.get('/sat_day', async (req, res, next) => {
    const sat_day = await pool.query("SELECT * FROM weekend_day WHERE day = ?", ['sat'])
    res.json(sat_day)
})

router.get('/sat_night', async (req, res, next) => {
    const sat_night = await pool.query("SELECT * FROM weekend_night WHERE day = ?", ['sat'])
    res.json(sat_night)
})

router.get('/sun_day', async (req, res, next) => {
    const sun_day = await pool.query("SELECT * FROM weekend_day WHERE day = ?", ['sun'])
    res.json(sun_day)
})

router.get('/sun_night', async (req, res, next) => {
    const sun_night = await pool.query("SELECT * FROM weekend_night WHERE day = ?", ['sun'])
    res.json(sun_night)
})
exports.router = router