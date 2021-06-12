const fs = require('fs')
const path = require('path')
const os = require('os')
let Chart = require('chart.js');

const form1 = document.getElementById('experimentSettings')
const myFile = document.getElementById('file')
const experiment = document.getElementById('experiment')

let ctx1 = document.getElementById('myChart1')
let myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ['1-gram', '2-gram', '3-gram', '4-gram', '5-gram'],
        datasets: [
            {
                label: 'Слова, шт.',
                data: [],
                borderColor: ['rgba(63,166,246,0.5)'],
                backgroundColor: ['rgba(63,166,246,1)'],
                yAxisID: 'y',
            },
            {
                label: 'Время, мс.',
                data: [],
                borderColor: ['rgba(158,239,255,0.5)'],
                backgroundColor: ['rgba(115,244,255, 1)'],
                yAxisID: 'y1',
            }
        ]
    },
    options: {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            y1: {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false,
                },
            },
        }
    },
});

myChart1.draw()

let fields = document.querySelectorAll('.field__file');
Array.prototype.forEach.call(fields, function (input) {
    let label = input.nextElementSibling,
        labelVal = label.querySelector('.field__file-fake').innerText;

    input.addEventListener('change', function (e) {
        let countFiles = '';
        let fileName = myFile.files[0].path.split('\\')
        label.querySelector('.field__file-fake').innerText = 'Файл: ' + fileName[fileName.length - 1];
    });
});

form1.addEventListener('submit', ev => {
    ev.preventDefault()

    const theFile = myFile.files[0].path

    fs.readFile(theFile, 'utf8', function (err, contents) {
        let newPathMass = theFile.split('\\')
        let fileName = newPathMass[newPathMass.length - 1].split('_')
        let theWord = fileName[fileName.length - 1].split('.')

        let ngram = new NGrams()

        ngram.search(contents, theWord[0])

        myChart1.data.datasets[0].data = ngram.findWord
        myChart1.data.datasets[1].data = ngram.times

        myChart1.update()
    });
})