class NGrams {
    findWord
    times

    search(text, searchingWord) {
        let wordsMass = text.split(' ')
        let len = wordsMass.length
        this.findWord = []
        this.times = []

        for (let j = 0; j < 3; j++) {
            let countTrueWord = 0
            const start= new Date().getTime();
            for (let i = 0; i < len; i++) {
                if (this.isCoincidence(this.getNgrams(searchingWord, j+2), this.getNgrams(wordsMass[i], j+2))) countTrueWord++
            }
            const end = new Date().getTime();
            this.findWord.push(countTrueWord)
            this.times.push(end - start)
        }
    }

    isCoincidence(searchingWordNGrams, currentWordNGrams) {
        let count = 0
        let len = Math.max(searchingWordNGrams.length, currentWordNGrams.length)
        for (let i = 0; i < len; i++) {
            if (searchingWordNGrams[i] === currentWordNGrams[i]) count += 1
        }
        return count / len >= 0.5
    }

    getNgrams(str, n) {
        var mass = []
        for (var i = 0; i < str.length - n + 1; i++) {
            var ngram = str.substr(i, n)
            mass.push(ngram)
        }
        return mass
    }
}
