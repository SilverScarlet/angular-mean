const express = require('express');
const app = express();

let Book = require('../model/Book');
const bookRoute = express.Router();
// Add Book


bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (err) => {

        return next(err);
    })

    if (req.body.name && req.body.price && req.body.description !== "") {


        res.json({
            success: true,
            message: 'Add book Successfully!'
        })



    } else {

        res.json({
            success: false,
            message: 'input cannot empty!'
        })


    }


})

// Get Book

bookRoute.route('/').get((req, res, next) => {
    Book.find((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);



        }
    })
})

// Read Book by parameter

bookRoute.route('/read-book/:id').get((req, res, next) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        }


    })

})

// Update Book

bookRoute.route('/update-book/:id').put((req, res, next) => {
    console.log(req.body)
    if (req.body.name && req.body.price && req.body.description !== "") {
        Book.findByIdAndUpdate(req.params.id, {
            $set: req.body

        }, (err, data) => {
            if (err) {
                return next(err)

            } else {
                res.json({success:true, message:"Update Book Successfully !"});
                console.log('Book Update Successfully')
            }
        })
    }else{
        res.json({success:false, message:"Input field cannot empty !"});
    }

})

//Delete Book

bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.status(200).json({
                message: "Delete Book Successful!"
            })

        }

    })

})

module.exports = bookRoute;