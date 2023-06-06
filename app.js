const cors = require("cors")
const fruits = require("./fruits.json");
const express = require("express") // Require Express.js
const app = express()
// const port = 3000

// const logger = require("./logger")
// app.use(logger)

app.use('/fruits',express.json()) // Example of Middleware.

app.get('/', (req, res) => {
    res.send("Hello Fruit API")
})

app.get('/fruits', (req, res) => {
    res.send(fruits)
})

app.get('/fruits/:name', (req, res) => {
    const name = req.params.name.toLowerCase()
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == name)
    if (fruit == undefined) {
        res.status(404).send()
    } else {
        res.send(fruit)
    }
})

app.post("/fruits", (req, res) => {
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.body.name.toLowerCase())
    if (fruit != undefined) {
        res.status(409).send()
    } else {
        // Add the fruit to the JSON
        fruits.push(req.body)
        res.status(201).send(req.body)
    }
});

app.delete("/fruits/:name", (req, res) => {
    // See if it exists
    const fruit = fruits.find((fruit) => fruit.name.toLowerCase() == req.params.name.toLowerCase())
    if (fruit == undefined){
        res.status(404).send()
    } else {
        const indexToDelete = fruits.indexOf(fruit)
        fruits.splice(indexToDelete, 1)
        res.status(204).send()
    }
})

// app.listen(port, () => {
//     console.log(`Fruit API listening on port ${port}`)
// })


module.exports = app // So index.js can you app
