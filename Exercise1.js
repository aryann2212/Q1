const express = require('express');
const path = require('path');

const app = express();

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Function: findSummation
function findSummation(n = 1) {
    if (typeof n !== 'number' || n <= 0) return false;
    return (n * (n + 1)) / 2;
}

app.get('/findSummation', (req, res) => {
    let n = parseInt(req.query.number, 10);
    let result = findSummation(n);
    res.send(`Summation: ${result}`);
});

// Function: uppercaseFirstandLast
function uppercaseFirstandLast(str) {
    return str.split(' ').map(word => {
        if (word.length > 1) {
            return word[0].toUpperCase() + word.slice(1, -1) + word[word.length - 1].toUpperCase();
        }
        return word.toUpperCase();
    }).join(' ');
}

app.get('/uppercaseFirstandLast', (req, res) => {
    let str = req.query.string;
    let result = uppercaseFirstandLast(str);
    res.send(`Modified String: ${result}`);
});

// Function: findAverageAndMedian
function findAverageAndMedian(arr) {
    if (!Array.isArray(arr) || arr.some(isNaN)) return false;

    let sum = arr.reduce((a, b) => a + b, 0);
    let avg = sum / arr.length;

    arr.sort((a, b) => a - b);
    let median = (arr.length % 2 === 0) ?
        (arr[arr.length / 2 - 1] + arr[arr.length / 2]) / 2 :
        arr[Math.floor(arr.length / 2)];

    return { average: avg, median: median };
}

app.get('/findAverageAndMedian', (req, res) => {
    let arr = JSON.parse(req.query.array);
    let result = findAverageAndMedian(arr);
    res.send(`Average: ${result.average}, Median: ${result.median}`);
});

// Function: find4Digits
function find4Digits(str) {

    let match = str.match(/\b\d{4}\b/);
   
    return match ? match[0] : false;
}


app.get('/find4Digits', (req, res) => {

    let str = req.query.string;
  
    let result = find4Digits(str);
   
    res.send(`First 4-digit number: ${result}`);
});

app.listen(3000, () => {
    console.log('Exercise 1 server is running on port 3000');
});