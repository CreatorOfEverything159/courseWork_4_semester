const fs = require('fs')
const path = require('path')
const os = require('os')
let Chart = require('chart.js');

closeButton.addEventListener("click", () => {
    modal.classList.remove('active')
    modalOverlay.classList.remove('active')
    modalTitle.classList.remove('active')
    modalText.classList.remove('active')
})

const form1 = document.getElementById('experimentSettings')
const myFile = document.getElementById('file')
let experimentWord = document.getElementById('experiment-word')

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
        plugins: {
            color: ['#fff'],
        },
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            x: {
                ticks: {
                    color: '#FFF',
                },
                grid: {
                    drawOnChartArea: false,
                },
            },
            y: {
                grid: {
                    color: '#ffffff'
                },
                ticks: {
                    color: '#FFF',
                },
            },
            y1: {
                ticks: {
                    color: '#ffffff',
                },
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
        let newPathMass = fileName
        console.log('theFile', fileName)
        let fileN = newPathMass[newPathMass.length - 1].split('_')
        console.log('fileName', fileName)
        let theWord = fileN[0]
        console.log('theWord', theWord)
        experimentWord.value = theWord
    });
});

form1.addEventListener('submit', ev => {
    ev.preventDefault()
    const percent = Number(document.getElementById('percent').value)

    // console.log(percent)

    const theFile = myFile.files[0].path

    fs.readFile(theFile, 'utf8', function (err, contents) {
        let theWord = experimentWord.value

        let ngram = new NGrams()

        ngram.search(contents, theWord, percent)

        modalText.innerHTML = ''
        modalTitle.textContent = 'График успешно построен!'

        modal.classList.add('active')
        modalOverlay.classList.add('active')
        modalTitle.classList.add('active')
        modalText.classList.add('active')

        myChart1.data.datasets[0].data = ngram.findWord
        myChart1.data.datasets[1].data = ngram.times

        myChart1.update()
    });
})