// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

// Set up body-parser
app.use(bodyParser.json());

// Set up comments.json
const comments = require('./comments.json');

// Set up routes
app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.post('/api/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
        if (err) {
            console.log('Error writing file:', err);
        } else {
            console.log('Successfully wrote file');
        }
    });
    res.json(comments);
});

// Start server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});