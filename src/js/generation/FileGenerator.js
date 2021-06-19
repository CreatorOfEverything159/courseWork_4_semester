class FileGenerator {

    createDir(dirPath) {
        fs.mkdir(process.cwd() + dirPath, {recursive: true}, e => {
            if (e) {
                console.error('Error:', e)
            } else {
                console.log(`Dir: ${process.cwd() + dirPath} is made!`)
            }
        })
    }

    createFile(filePath, fileContent) {
        fs.writeFile(filePath, fileContent, e => {
            if (e) {
                console.error('Error:', e)
            } else {
                console.log(`File: ${filePath} is made!`)
            }
        })
    }

    errorWordGen(word, countWords, mistakesCount) {
        let len = word.length
        let arr_ru = ['а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ь', 'ы', 'ъ', 'э', 'ю', 'я'];
        let lettersLen = arr_ru.length

        // кол-во слов с ошибками
        let errorWords = []

        for (let i = 0; i < countWords; i++) {
            let newWord = word.split('')

            // места ошибок в слове
            let placeError = []

            while (placeError.length < mistakesCount) {
                placeError.push(Math.floor(Math.random() * len))
            }

            for (let i = 0; i < mistakesCount; i++) {
                newWord.splice(placeError[i], 1, arr_ru[Math.floor(Math.random() * lettersLen)])
            }

            errorWords.push(newWord.join(''))
        }

        return errorWords
    }

    markovMe(allWords) {
        const markovChain = {}
        console.log(process.cwd())
        const textArr = fs.readFileSync(`${process.cwd()}/src/Voyna-i-mir.txt`, 'UTF-8').split(' ')
        for (let i = 0; i < textArr.length; i++) {
            let word = textArr[i].toLowerCase()
            if (!markovChain[word]) {
                markovChain[word] = []
            }
            if (textArr[i + 1]) {
                markovChain[word].push(textArr[i + 1].toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()"'\[\]]/g, ""));
            }
        }
        const words = Object.keys(markovChain)

        let word = words[Math.floor(Math.random() * words.length)]

        let result = ' '
        let wordLen = 0
        for (let i = 0; i < allWords; i++) {
            result += word + ' ';
            wordLen += word.length

            let newWord = markovChain[word][Math.floor(Math.random() * markovChain[word].length)]

            word = newWord;

            if (!word || !markovChain.hasOwnProperty(word) || word === 'лазутчик' || word === 'доносил') word = words[Math.floor(Math.random() * words.length)]
        }

        // document.getElementById('result').innerText = `Средняя длина слова: ${wordLen / allWords}`
        return result
    }
}