const router = require('express').Router()

const Form = require('../models/Form')


router.route('/1').get((req, res) => {
    res.render('form1')
})

router.route('/1').post((req, res) => {
    // res.redirect('/form/2')
    const vinnumbers = req.body

    var number = []

    for(var i = 0; i < req.body.length; i++){
        if(req.body[i] !== null && req.body[i] !== ''){
        number.push(req.body[i])
        }
    }

    var minValue = 0
    if(number.length === 1){
        minValue = 79
    }else{
        minValue = 79 + (number.length * 0.35 * 79)
    }

    var fullValue = 0
    if(number.length === 1){
        fullValue = 105
    }else{
        fullValue = 105 + (number.length * 0.35 * 105)
    }

    const newForm = new Form({
        aboutVehicle:[],
        vehicleNumber: number.length,
        minValue,
        fullValue
    })

    newForm.save().then(data => {

        for(var i = 0; i < vinnumbers.length; i++){
            var number = {
                vinNumber: vinnumbers[i]
            }
            data.aboutVehicle.push(number)
        } 

        data.save()
        console.log(data)
        res.json(data)
    }).catch(err => console.log(err))
})



router.route('/:id/2').get((req, res) => {
    // res.render('form2')
    // const {firstName, lastName, phoneNumber} = req.body
    Form.findById(req.params.id).then(data => {
        if(!data)
            return console.log('No data')
        res.render('form2', {data})

    }).catch(err => console.log(err))
})


router.route('/:id/2').post((req, res) => {
    // res.render('form2')
    const {firstName, lastName, phoneNumber, status} = req.body
    Form.findById(req.params.id).then(data => {
        if(!data)
            return console.log('No data')
        
        data.firstName = firstName
        data.lastName = lastName
        data.phoneNmber = phoneNumber
        data.maritalStatus = status
        if(status === 'married'){
            data.minValue = data.minValue - (0.1 * data.minValue)
            data.fullValue = data.fullValue - (0.1 * data.fullValue)
        }

        data.save().then(newdata =>{ 
            if(status === 'married'){
                res.redirect(`/form/${newdata.id}/3`)
                console.log(newdata)
            }else{
                res.redirect(`/form/${newdata.id}/4`)
                console.log(newdata)
            }
            
        }).catch(err => console.log(err))

    }).catch(err => console.log(err))
})



router.route('/:id/3').get((req, res) => {
    // res.render('form3')
    Form.findById(req.params.id).then(data => {
        if(!data){
            console.log('Invalid url')
        }else{
            res.render('form3', {data})
        }
    }).catch(err => console.log(err))
})

router.route('/:id/3').post((req, res) => {
    Form.findById(req.params.id).then(data => {
        if(!data){
            console.log('Invalid url')
        }else{
            var number = []

            for(var i = 0; i < req.body.length; i++){
                if(req.body[i] !== null && req.body[i] !== ''){
                number.push(req.body[i])
                }
            }

            console.log(number.length)

            if(number.length === 1){
                data.minValue = data.minValue
                data.fullValue = data.fullValue
            }else{
                data.minValue = data.minValue + (number.length * 0.25 * data.minValue)
                data.fullValue = data.fullValue + (number.length * 0.25 * data.fullValue)
                data.minValue = data.minValue.toFixed(2)
                data.fullValue = data.fullValue.toFixed(2)
            }
            data.save()
            console.log(data)
            res.json(data)
        }
    }).catch(err => console.log(err))
})



router.route('/:id/4').get((req, res) => {
    // res.render('form3')
    Form.findById(req.params.id).then(data => {
        if(!data){
            console.log('Invalid url')
        }else{
            res.render('form4', {data})
        }
    }).catch(err => console.log(err))
})


router.route('/:id/4').post((req, res) => {
    // res.render('form3')
    Form.findById(req.params.id).then(data => {
        if(!data){
            console.log('Invalid url')
        }else{
            res.redirect(`/form/${data.id}/result`)
        }
    }).catch(err => console.log(err))
})


router.route('/:id/result').get((req, res) => {
    // res.render('form3')
    Form.findById(req.params.id).then(data => {
        if(!data){
            console.log('Invalid url')
        }else{
            res.render('result', {data})
        }
    }).catch(err => console.log(err))
})


module.exports = router