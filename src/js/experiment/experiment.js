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
        labels: ['2-граммы', '3-граммы', '4-граммы'],
        datasets: [
            {
                label: '',
                data: [],
                borderColor: ['rgba(0,146,255,0.5)'],
                backgroundColor: ['rgb(0,146,255)'],
                yAxisID: 'y',
            },
            {
                label: '',
                data: [],
                borderColor: ['rgba(102,186,255,0.5)'],
                backgroundColor: ['rgb(102,186,255)'],
                yAxisID: 'y1',
            },
            {
                label: '',
                data: [],
                borderColor: ['rgba(71,0,255,0.5)'],
                backgroundColor: ['rgb(71,0,255)'],
                yAxisID: 'y',
            },
            {
                label: '',
                data: [],
                borderColor: ['rgba(146,104,255,0.5)'],
                backgroundColor: ['rgba(146,104,255,1)'],
                yAxisID: 'y1',
            },
            {
                label: '',
                data: [],
                borderColor: ['rgba(255,0,139,0.5)'],
                backgroundColor: ['rgb(255,0,139)'],
                yAxisID: 'y',
            },
            {
                label: '',
                data: [],
                borderColor: ['rgba(255,119,192,0.5)'],
                backgroundColor: ['rgba(255,119,192,1)'],
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

let searchWordMass = []
myChart1.draw()

let fields = document.querySelectorAll('.field__file');
Array.prototype.forEach.call(fields, function (input) {
    let label = input.nextElementSibling

    input.addEventListener('change', function (e) {
        label.querySelector('.field__file-fake').innerText = 'Выбрано файлов: ' + myFile.files.length
        let newPathMass = myFile.files[0].path.split('\\')
        let fileN = newPathMass[newPathMass.length - 1].split('_')
        experimentWord.value = fileN[0]
        searchWordMass = []

        for (let i = 0; i < myFile.files.length; i++) {
            searchWordMass.push(myFile.files[i].name.split('_')[0])
        }
    });
});

form1.addEventListener('submit', ev => {
    ev.preventDefault()

    let massDataWords = []
    let massDataTimes = []
    let massFilesName = []
    let massTimes = []

    let text = ''
    let ngram = new NGrams()

    for (let i = 0; i < myFile.files.length; i++) {
        let reader = new FileReader()

        reader.readAsText(myFile.files[i])
        let contents = ''
        reader.onload = function (evt) {
            contents = reader.result
            let theWord = searchWordMass[i]
            console.log(searchWordMass[i])

            massFilesName.push('Совпадения в ' + myFile.files[i].name)
            massTimes.push('Время в ' + myFile.files[i].name)


            ngram.search(contents, theWord)
            massDataWords.push(ngram.findWord)
            massDataTimes.push(ngram.times)

            modalText.innerHTML = ''
            modalTitle.textContent = 'График успешно построен!'
            modal.classList.add('active')
            modalOverlay.classList.add('active')
            modalTitle.classList.add('active')
            modalText.classList.add('active')

            myChart1.data.datasets[0].data = massDataWords[0]
            myChart1.data.datasets[1].data = massDataTimes[0]
            myChart1.data.datasets[2].data = massDataWords[1]
            myChart1.data.datasets[3].data = massDataTimes[1]
            myChart1.data.datasets[4].data = massDataWords[2]
            myChart1.data.datasets[5].data = massDataTimes[2]

            myChart1.data.datasets[0].label = massFilesName[0]
            myChart1.data.datasets[1].label = massTimes[0]
            myChart1.data.datasets[2].label = massFilesName[1]
            myChart1.data.datasets[3].label = massTimes[1]
            myChart1.data.datasets[4].label = massFilesName[2]
            myChart1.data.datasets[5].label = massTimes[2]

            myChart1.update()
        }
    }

})