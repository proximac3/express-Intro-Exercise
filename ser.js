// This looks for a module in package.json
const express = require('express');
// const res = require('express/lib/response');
const ExpressError = require('./expressError');
 
// Initialize express as a function
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Home page
app.get('/', function (req, res) {
    res.send('homepage')
})


// mean routes
app.get('/mean', function (req, res, next) {
    const result = req.query['nums'].split(',')
    let output = 0

    // Error Handling
    for (let num of result) {
        try {
            if (!(Number(num) >= 0)) throw new ExpressError(`${num} is not a number`, 400)
            output += Number(num)
        } catch (e) {
            return next(e)
        }
    }

    return res.json({
        response: {
            operation: "mean",
            value: output / result.length
    }})
})

// median routes
app.get('/median', function (req, res, next) {
    // get query string data
    const result = req.query['nums'].split(',')
    // sort data
    let sortedData = result.sort((a, b) => { return a - b })
    let output;

    // Error Handling
    for (let num of result) {
        try {
            if (result.length < 2 && result[0] == '') throw new ExpressError('Numbers are required', 400)
            
            if (!(Number(num) >= 0)) throw new ExpressError(`${num} is not a number`, 400)
            output += Number(num)
        } catch (e) {
            return next(e)
        }
    }

    // calculate median
    if (sortedData.length % 2 == 0) {
        output = sortedData.slice(Math.floor((sortedData.length / 2) - 1), Math.floor((sortedData.length / 2) + 1))

        output = (Number(output[0]) + Number(output[1])) /2 
    } else {
        output = sortedData[Math.floor(sortedData.length / 2)]
    }


    return res.json({
        response: {
            operation: "median",
            value: output
    }})
})

//mode route
app.get('/mode', function (req, res) {
    const result = req.query['nums'].split(',')

    // error handling
    for (let num of result) {
        try {
            if (result.length < 2 && result[0] == '') throw new ExpressError('Numbers are required', 400)
            
            if (!(Number(num) >= 0)) throw new ExpressError(`${num} is not a number`, 400)
            output += Number(num)
        } catch (e) {
            return next(e)
        }
    }

    let output = result.reduce(function(acc, next) {
    acc[next] = (acc[next] || 0) + 1;
    return acc;
    }, {});
    
    let count = 0;
    let mostFrequent;

    for (let key in output) {
        if (output[key] > count) {
            mostFrequent = key;
            count = output[key];
        }
    }

    return res.json({
        response: {
            operation: "mode",
            value: mostFrequent
    }})

})
















// errer handler
app.use((error, req, res, next) => {
    res.status(error.status).json({response: error.message})
});

app.listen(5000, function () {
    console.log('Server Running')
});


