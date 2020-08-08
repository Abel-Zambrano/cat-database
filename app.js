const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat_db', {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

//Schema setup: id, url, value.
const catSchema = new mongoose.Schema({
    id: String,
    url: String,
    votes: Number
        
});

//Compile Model
const Cat = mongoose.model('Cat', catSchema);

// Cat.create(
//     { id:1, url:'https://cdn2.thecatapi.com/images/a9j.jpg'},
//     { id:3, url:'https://cdn2.thecatapi.com/images/bir.jpg'},
//     { id:4, url:'https://cdn2.thecatapi.com/images/9jf.jpg'},
//     { id:5, url:'https://cdn2.thecatapi.com/images/bkc.jpg'},
//     { id:6, url:'https://cdn2.thecatapi.com/images/d2o.jpg'},
//     { id:7, url:'https://cdn2.thecatapi.com/images/MTk2NTM4NA.jpg'},
//     { id:8, url:'https://cdn2.thecatapi.com/images/ajA3tUqUR.jpg'},
//     { id:9, url:'https://cdn2.thecatapi.com/images/7l5.jpg'},
//     { id:10, url:'https://cdn2.thecatapi.com/images/e9d.jpg'},
//     { id:2, url:'https://cdn2.thecatapi.com/images/dje.jpg'},
//     (err, cat) => {
//         if(err) {
//             console.log(err);
//         } else {
//             console.log('Success!');
//             console.log(cat);
            
            
//         }
//     }
// )

app.get('/', (req, res) => {
    Cat.find({}, (err, allCats) => {
        if(err) {
            console.log(err);

        } else {
            const randomCat = allCats[Math.floor(Math.random() * allCats.length)];
            res.render('index', {cats: randomCat});
            
        }
        
    })

});

app.post('/', (req, res) => {
    Cat.find({}, (err, allCats) => {
        if(err) {
            console.log(err);

        } else {
            const randomCat = allCats[Math.floor(Math.random() * allCats.length)];
            res.render('index', {cats: randomCat});
            
        }
        
    })
})


app.listen(3000, () => {
    console.log('Server is running on PORT:3000');
    
})