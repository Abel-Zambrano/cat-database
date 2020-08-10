const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');//forms don't support PUT method

mongoose.connect('mongodb://localhost/cat_db', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('method'));

//Schema setup: id, url, value.
const catSchema = new mongoose.Schema({
    id: String,
    url: String,
    vote: Number
        
});

//Compile Model
const Cat = mongoose.model('Cat', catSchema);

//add cats to database
// Cat.create(
//     { id:1, url:'https://cdn2.thecatapi.com/images/a9j.jpg', vote:0},
//     { id:3, url:'https://cdn2.thecatapi.com/images/bir.jpg', vote:0},
//     { id:4, url:'https://cdn2.thecatapi.com/images/9jf.jpg', vote:0},
//     { id:5, url:'https://cdn2.thecatapi.com/images/bkc.jpg', vote:0},
//     { id:6, url:'https://cdn2.thecatapi.com/images/d2o.jpg', vote:0},
//     { id:7, url:'https://cdn2.thecatapi.com/images/MTk2NTM4NA.jpg', vote:0},
//     { id:8, url:'https://cdn2.thecatapi.com/images/ajA3tUqUR.jpg', vote:0},
//     { id:9, url:'https://cdn2.thecatapi.com/images/7l5.jpg', vote:0},
//     { id:10, url:'https://cdn2.thecatapi.com/images/e9d.jpg', vote:0},
//     { id:2, url:'https://cdn2.thecatapi.com/images/dje.jpg', vote:0},
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
            const upVoted = allCats.filter(cats => cats.vote === 1);
            const downVoted = allCats.filter(cats => cats.vote === 0);
            const randomCat = allCats[Math.floor(Math.random() * allCats.length)];
            res.render('index', {randomCat, upVoted});
            
        }
        
    })

});

app.put('/upvote/:id', (req, res) => {
    Cat.findByIdAndUpdate(req.params.id, {vote:1}, (err, updated) => {
        if(err) {
            console.log(err);
            
        } else {
            res.redirect('/');
        }
    })
})

app.put('/downvote/:id', (req, res) => {
    Cat.findByIdAndUpdate(req.params.id, {vote:0}, (err, updated) => {
        if(err) {
            console.log(err);
            
        } else {
            res.redirect('/');
        }
    })
})

app.listen(3000, () => {
    console.log('Server is running on PORT:3000');
    
})