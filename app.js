const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');//forms don't support PUT method

mongoose.connect('mongodb+srv://amdin-abel:admin123@cluster0.u7t9t.mongodb.net/cat_db?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.set('useFindAndModify', false);
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(methodOverride('method'));

//Schema setup: id, url, value.
const catSchema = new mongoose.Schema({
    id: String,
    url: String,
    vote: Number,
        
});

//Compile Model
const Cat = mongoose.model('Cat', catSchema);

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

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on PORT:3000');
    
})