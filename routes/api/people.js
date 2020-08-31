const express = require('express')
const router = express.Router()
const People = require('../../models/People')
const User = require('../../models/User')
const auth = require('../../middleware/auth')
const {check, validationResult} = require('express-validator')

// @route   GET api/profile/me
// @desc    get current users profile
// @access  Private
router.get('/me', auth, async (req,res)=> {
    try {
        const people = await People.findOne({user:req.user.id}).populate('user', ['name', 'avatar'])

        if(!people){
            return res.status(400).json({msg: 'There is no profile for this user'})
        }
        res.json(people)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error!!!')
    }
})

// @route   POST api/profile
// @desc    create or update user profile
// @access  Private

router.post('/', auth, async (req,res)=>{

    const {bio} = req.body

    const peopleFields = {}
    peopleFields.user = req.user.id
    if(bio) peopleFields.bio= bio;

    try {
        let people = await People.findOne({user: req.user.id})
        if(people){
            people = await People.findOneAndUpdate({user: req.user.id}, {$set: peopleFields}, {new: true})
            return res.json(people)
        }

        people = new People(peopleFields)
        await people.save();
        res.json(people)
    } catch (err) {
        console.error(err.message)
        res.status(500).send('Server error!!!')
    }

})

// @route   Get api/profile
// @desc    get all profile
// @access  public
router.get('/', async(req,res)=> {
    try {
        const peoples = await People.find().populate('user', ['name','avatar'])
        res.json(peoples)
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error!!!")
    }
})

// @route   Get api/profile/user/:user_id
// @desc    get profile by id
// @access  public
router.get('/user/:user_id', async(req,res)=> {
    try {
        const people = await People.findOne({user:req.params.user_id}).populate('user', ['name','avatar'])
        if(!people) return res.status(400).json({msg: 'There is no such person'})
        res.json(people)
    } catch (err) {
        console.error(err.message)
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'Profile not found'})
        }
        res.status(500).send("Server Error!!!")
    }
})

module.exports = router;