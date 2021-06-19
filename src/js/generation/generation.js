const form2 = document.getElementById('generationSetting')

let modal = document.querySelector('#modal')
let modalOverlay = document.querySelector('#overlay')
let closeButton = document.querySelector('#close-button')
let modalTitle = document.querySelector('#modal__title')
let modalText = document.querySelector('#modal__text')

closeButton.addEventListener("click", () => {
    modal.classList.remove('active')
    modalOverlay.classList.remove('active')
    modalTitle.classList.remove('active')
    modalText.classList.remove('active')
})

form2.addEventListener('submit', ev => {
    ev.preventDefault()

    let exceptionText = ''
    modalTitle.textContent = 'Ошибка!'

    let fileGen = new FileGenerator()

    const allWords = Number(document.getElementById('all-words').value)
    const searchWordsCount = Number(document.getElementById('search-words').value)
    const theWord = document.getElementById('the-word').value
    const countMistakes = Number(document.getElementById('mistakes-count').value)

    if (allWords < searchWordsCount) {
        exceptionText += `<p class="modal-text">- Количество слов в генерируемом файле должно быть БОЛЬШЕ количества искомых слов!<\p>`
    }
    if (Math.floor(theWord.length / 2) < countMistakes) {
        exceptionText += `<p class="modal-text">- Количество ошибок в слове должно быть НЕ БОЛЬШЕ половины длины искомого слова!</p>`
    }
    if (exceptionText === '') {
        let errorWords = fileGen.errorWordGen(theWord, searchWordsCount, countMistakes)
        let theText = fileGen.markovMe(allWords).split(' ')

        let places = new Set()
        if (allWords === searchWordsCount) {
            for (let i = 0; i <= searchWordsCount; i++) {
                places.add(i)
            }
        } else {
            while (places.size <= searchWordsCount) {
                places.add(Math.floor(Math.random() * allWords))
            }
        }

        places = Array.from(places)

        for (let i = 0; i < searchWordsCount; i++) {
            theText.splice(places[i], 1, errorWords[i])
        }

        fileGen.createDir('/generation')
        fileGen.createFile(`${process.cwd()}/generation/${theWord}_${countMistakes}_${allWords}_${searchWordsCount}.txt`, theText.join(' '))
        modalTitle.textContent = 'Файл сгенерирован!'
    }

    modalText.innerHTML = exceptionText

    modal.classList.add('active')
    modalOverlay.classList.add('active')
    modalTitle.classList.add('active')
    modalText.classList.add('active')

    // console.log(`${end - start}мс`)
})
