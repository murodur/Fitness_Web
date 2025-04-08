require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');
const methodOverride = require('method-override');

const app = express();

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://<meliyevabbos>:<IeQtgiWsejtfekJy>@cluster0.frnguuj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

const goalsRouter = require('./routes/goals');
app.use('/goals', goalsRouter);

app.get('/', (req, res) => {
  res.render('index', { 
    title: 'Fitness Goal Tracker',
    message: 'This web application was created to fulfill Web Technology module\'s requirements and does not represent an actual company or service'
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { error: err });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 
