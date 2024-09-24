const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Route to display expenses
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM expenses ORDER BY date DESC');
        res.render('index', { expenses: result.rows });
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Route to add new expense
app.post('/add-expense', async (req, res) => {
    const { description, category, amount, date } = req.body;
    try {
        await pool.query('INSERT INTO expenses (description, category, amount, date) VALUES ($1, $2, $3, $4)', [description, category, amount, date]);
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
