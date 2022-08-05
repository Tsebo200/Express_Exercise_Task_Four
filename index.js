const express = require('express');
const products = require('./Products');

const app = express();

app.get('/', (req, res) => {
    res.send("Ohiyo Onisan");
})

// const refine = (req,res,next) => {
//     let value = products.inventory[0].productName;
//     res.send(value)
//     next();
// };

// app.use(refine); //This function is reserved for middleware


//Very Important MiddleWare
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//All products
app.get('/api/products/:id', (req, res) => {
    res.send(products);
});

//Individual Products
app.get('/api/products/:id', (req, res) => {

    const found = products.inventory.some(item => item.id == parseInt(req.params.id));

    if(found === true){
        res.json(products.inventory.filter(item => item.id === parseInt(req.params.id)));
    } else {
        res.status(400).json({msg: "404Err :/ Sorry Mate This product was not found"});
    }

    res.json(products.inventory.filter(item => item.id === parseInt(req.params.id)));
});

app.post('/api/addProduct/:id', (req,res) => {
    const newProduct = {
        id: req.params.id,
        productName: req.body.productName,
        inStock: req.body.inStock,
        availStock: req.body.availStock
    }

    res.send(newProduct);


});

//creating 
app.post('/api/addproduct/:id', (req, res) => {
    const newProduct = {
        id: +req.params.id,
        productName: req.body.productName,
        inStock: req.body.inStock,
        availStock: req.body.availStock
    }

    res.send(newProduct);
    if(!newProduct.id || !newProduct.productName || !newProduct.inStock){
        return res.status(400).json({msg: "You are missing some information dummy!"})
    } else {
        products.inventory.push(newProduct);
        res.json(products);
    }

});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {console.log(`Server Started on port ${PORT}`)});