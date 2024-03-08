const { default: axios } = require('axios');
const axio = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const { json } = require('stream/consumers');

const url = 'https://www.imdb.com/';

const moviesData = {};

async function getHTML() {
    const {data: html} = await axios.get(url);
    return html;
};

getHTML().then((res) => {
    const $ = cheerio.load(res);
    $('.lister-list>tr').each((i, movie) => {
        const title = $(movie).find('.titileColumn a').text();
        const rating = $(movie).find('.ratingColumn strong').text();
        moviesData[title] = rating;
    });
    fs.writeFile('moviesData.json', JSON.stringify(moviesData), (err) => {
        if (err) throw err;
        console.log('File success saved!')
    });
});