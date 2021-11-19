const express = require('express');
const app = express();

let Book = require('../model/Book');

// Add Book

const bookRoute = express.Router();
bookRoute.route('/add-book').post((req, res, next) => {
    Book.create(req.body, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

// Get Book

bookRoute.route('/').get((req, res) => {
    Book.find((err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

// Read Book by parameter

bookRoute.route('/read-book/:id').get((req, res) => {
    Book.findById(req.params.id, (err, data) => {
        if (err) {
            return next(err);
        } else {
            res.json(data);
        }
    })
})

// Update Book

bookRoute.route('/update-book/:id').put((req, res, next) => {
    Book.findIdAndUpdate(req.params.id, {
        $set: req.body

    }, (err, data) => {
        if (err) {
            return next(err)

        } else {
            res.json(data);
            console.log('Book Update Successfully')
        }
    })
})

//Delete Book

bookRoute.route('/delete-book/:id').delete((req, res, next) => {
    Book.findIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            return next(err)
        } else {
            res.status(200).json({
                message: data
            })
            
        }

    })

})

module.exports = bookRoute;