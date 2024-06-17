const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const Auth = require('../middlewares/auth.middleware')
const { Profile, CreateLink, CreateCollection, GetCollections, GetCurrentPlan } = require('../controllers/profile.controller')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))

router.use(Auth)

router.get('/', Profile)
router.get('/myplan', GetCurrentPlan)
router.get('/collections/:collection?', GetCollections)
router.post('/collections', CreateCollection)
router.post('/collections/:collection/link', CreateLink)

module.exports = router
