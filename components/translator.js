// file where keys = Americanisms, values = Britishisms
const americanOnly = require('./american-only.js');
// file where keys = American spelling, values = Brit spelling of same word
const americanToBritishSpelling = require('./american-to-british-spelling.js');
// file where keys = Americanised titles, values = Brit titles
const americanToBritishTitles = require("./american-to-british-titles.js");
// file where keys = Britishisms, values = Americanisms
const britishOnly = require('./british-only.js');

class Translator {

  translateSpellings(string, locale) {
    let spellings = []
    let replacements = []
    
    for (let i in americanToBritishSpelling) {
      if (locale === 'american-to-british') {
        let re = new RegExp(`\\s?(${i})[\\s?|\\W?]`, "gmi");
        if (string.match(re)) {
          // console.log(i, americanToBritishSpelling[i])
          spellings.push(i)
          replacements.push(`<span class="highlight">${americanToBritishSpelling[i]}</span>`)
        }
      } else {
        let re = new RegExp(`\\s?(${americanToBritishSpelling[i]})[\\s?|\\W?]`, "gmi");
        if (string.match(re)) {
          // console.log(i, americanToBritishSpelling[i])
          spellings.push(americanToBritishSpelling[i])
          replacements.push(`<span class="highlight">${i}</span>`)
        }
      }
    }

    return [spellings,replacements]
  }

  translateWords(string, locale) {
    let words = []
    let replacements = []

    console.log('translating words...')

    if (locale === 'american-to-british') {
      for (let i in americanOnly) {
        let re = new RegExp(`\\s?(${i})[\\s?|\\W?]`, "gmi");
        // console.log(i, re, string.match(re))
        if (string.match(re)) {
          words.push(i)
          replacements.push(`<span class="highlight">${americanOnly[i]}</span>`)
        }
      }
    } else {
      for (let i in britishOnly) {
        let re = new RegExp(`\\s?(${i})[\\s?|\\W?]`, "gmi");
        // console.log(i, re, string.match(re))
        if (string.match(re)) {
          words.push(i)
          replacements.push(`<span class="highlight">${britishOnly[i]}</span>`)
        }
      }
      
    }
    // console.log(words,replacements)
    return [words,replacements]
  }
  
  translateTimes(string, locale) {
    let times = []
    let replacements = []
    let AmericanFormat = /[\d]{1,2}:[\d]{2}/gm
    let BritishFormat = /[\d]{1,2}\.[\d]{2}/gm
    let stringArray = string.split(' ')

    if (locale === 'american-to-british') {
      stringArray.forEach(word => {
        if (word.match(AmericanFormat)) {
          times.push(word)
          replacements.push(`<span class="highlight">${word.replace(':', '.')}</span>`)
        }
      })
    } else {
      stringArray.forEach(word => {
        if (word.match(BritishFormat)) {
          times.push(word)
          replacements.push(`<span class="highlight">${word.replace('.', ':')}</span>`)
        }
      })
    }
    
    return [times,replacements]
  }
  
  translateTitles(string, locale) {
      let titles = []
      let replacements = []
      
      if (locale === 'american-to-british') {
        // turn file into array of arrays, for each
        for (let i = 0; i < Object.entries(americanToBritishTitles).length; i += 1) {
          // if string contains any of the 'keys'
          if (string.includes(Object.entries(americanToBritishTitles)[i][0])) {
              // add 'key' to titles list
              titles.push(Object.entries(americanToBritishTitles)[i][0])
              // add replacement 'value' with inline HTML to replacements list
              replacements.push(`<span class="highlight">${Object.entries(americanToBritishTitles)[i][1]}</span>`)
          }
        }
      } else {
        // turn file into array of arrays, for each
        for (let i = 0; i < Object.entries(americanToBritishTitles).length; i += 1) {
          // if string contains any of the 'keys'
          if (string.includes(Object.entries(americanToBritishTitles)[i][1])) {
              // add 'key' to titles list
              titles.push(Object.entries(americanToBritishTitles)[i][1])
              // add replacement 'value' with inline HTML to replacements list
              replacements.push(`<span class="highlight">${Object.entries(americanToBritishTitles)[i][0]}</span>`)
          }
        }
      }
      return [titles, replacements]
  }

  translate(string, locale) {
    let newString = string.split(' ')
    let [titles, newTitles] = this.translateTitles(string, locale)
    let [times, newTimes] = this.translateTimes(string, locale)
    let [words, newWords] = this.translateWords(string, locale)
    let [spellings, newSpellings] = this.translateSpellings(string, locale)

    // for each word in string array
      newString.forEach(word => {
        // if current word is in titles list
        if (titles.includes(word)) {
          // get position of word in string and list respectively
          let stringIndex = newString.indexOf(word)
          let listIndex = titles.indexOf(word)
          // replace word in string with replacement word and inline HTML
          newString[stringIndex] = newTitles[listIndex]
        } else if (times.includes(word)) {
          let stringIndex = newString.indexOf(word)
          let listIndex = times.indexOf(word)
          newString[stringIndex] = newTimes[listIndex]
        } else if (spellings.includes(word)) {
          let stringIndex = newString.indexOf(word)
          let listIndex = spellings.indexOf(word)
          newString[stringIndex] = newSpellings[listIndex]
        }
      })

      newString = newString.join(' ')

      for (let i = 0; i < words.length; i += 1) {
        let re = new RegExp(String.raw`${words[i]}`, "gi");
        if (newString.toLowerCase().includes(words[i].toLowerCase())) {
          newString = newString.replace(re, newWords[i])
        }
      }
      console.log(newString)

      if (newString === string) {
        return { text:string, translation:'Everything looks good to me!'}
      } else {
        return { text:string, translation:newString}  
      }
  }

}

module.exports = Translator;