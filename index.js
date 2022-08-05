const express = require('express');
const products = require('./Products');

const app = express();

app.get('/', (req, res) => {
    res.send("Ohiyo");
})

//All products
// app.get('/api/products/:id', (req, res) => {
//     res.send(products);
// });

//Individual
app.get('/api/products/:id', (req, res) => {
    res.json(products.inventory.filter(item => item.id === parseInt(req.params.id)));
});


const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {console.log(`Server Started on port ${PORT}`)});