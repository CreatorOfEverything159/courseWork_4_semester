const form2 = document.getElementById('generationSetting')

form2.addEventListener('submit', ev => {
    ev.preventDefault()

    let fileGen = new FileGenerator()

    const allWords = Number(document.getElementById('all-words').value)
    const searchWordsCount = Number(document.getElementById('search-words').value)
    const theWord = document.getElementById('the-word').value


    const start = new Date().getTime();
    let errorWords = fileGen.errorWordGen(theWord, searchWordsCount)
    let theText = fileGen.markovMe(allWords).split(' ')

    let places = new Set()
    while (places.size <= searchWordsCount) {
        places.add(Math.floor(Math.random() * allWords))
    }

    places = Array.from(places)

    for (let i = 0; i < searchWordsCount; i++) {
        theText.splice(places[i], 1, errorWords[i])
    }

    fileGen.createDir('/generation')
    fileGen.createFile(`${process.cwd()}/generation/${allWords}_${searchWordsCount}_${theWord}.txt`, theText.join(' '))
    const end = new Date().getTime();
    console.log(`${end - start}мс`)
})
