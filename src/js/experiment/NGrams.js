class NGrams {
    findWord
    times

    search(text, searchingWord) {
        let wordsMass = text.split(' ')
        let len = wordsMass.length
        this.findWord = []
        this.times = []

        for (let j = 0; j < 5; j++) {
            let countTrueWord = 0
            const start= new Date().getTime();
            for (let i = 0; i < len; i++) {
                if (this.isCoincidence(this.getNgrams(searchingWord, j+1), this.getNgrams(wordsMass[i], j+1))) countTrueWord++
            }
            const end = new Date().getTime();
            console.log(`${j+1}-граммы, найдено: ${countTrueWord}, Время: ${end - start}мс`)
            this.findWord.push(countTrueWord)
            this.times.push(end - start)
        }
    }

    isCoincidence(searchingWordNGrams, currentWordNGrams) {
        let count = 0
        let len = Math.max(searchingWordNGrams.length, currentWordNGrams.length)
        for (let i = 0; i < len; i++) {
            if (searchingWordNGrams[i] === currentWordNGrams[i]) count++
        }
        return count / len >= 0.4
    }

    getNgrams(str, n) {
        var mass = []
        for (var i = 0; i < str.length - n + 1; i++) {
            var ngram = str.substr(i, n)
            mass.push(ngram)
        }
        return mass
    }

    print(str) {
        return (function (el, text) {
            return el.html(el.html() + (text || ''));
        }($('#console'), [].join.call(str, ' ')));
    }
}