const fs = require('fs'); 

class invertedIndex {
    constructor(path){
        this.path = path;
    }

    parseJson() { 
        let data = fs.readFileSync(this.path, 'utf8');
        const currentBooks = JSON.parse(data);
        return currentBooks;
    }

    rawIndex() {
        const booksRawData = this.parseJson()
        const booksData = [];
        booksRawData.forEach((book, index) => {
            booksData.push(`${book.title} ${book.text}`)
        })
        return booksData;
    }

    wordFrequency() {
        const wholeDoc = this.rawIndex()
        const invIndex = {};
        wholeDoc.forEach((words, index) => {
            words.toLowerCase().match(/\w+/g).forEach((word) => {
                if (Object.keys(invIndex).indexOf(word) === -1){
                    let loc = new Set();
                    invIndex[word] = loc.add(index);
                } else {
                    invIndex[word].add(index)
                }
            })
        })
        return invIndex;
    }
}

t = new invertedIndex('./books.json');
console.log(t.wordFrequency());



// a fuction that dispalys the added text
