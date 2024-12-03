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

    // console.log('translating words...')

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
    let AmericanFormat = /[\d]{1,2}:[\d]{2}/gm
    let BritishFormat = /[\d]{1,2}\.[\d]{2}/gm

    if (locale === 'american-to-british') {
      if (string.match(AmericanFormat)) {
        console.log(string.match(AmericanFormat))
        times.push(string.match(AmericanFormat)[0])
      }
    } else {
      if (string.match(BritishFormat)) {
        console.log(string.match(BritishFormat))
        times.push(string.match(BritishFormat)[0])
      }
    }
    console.log(times)
    return times
  }
  
  translateTitles(string, locale) {
      let titles = []
      let replacements = []

      if (locale === 'american-to-british') {
        for (let i in americanToBritishTitles) {
          let re = new RegExp(`(${i})`, "gmi");
          if (string.match(re)) {
            // console.log(string.match(re))
            titles.push(string.match(re)[0])
            if (String(string.match(re)[0]).charAt(0).toUpperCase() === americanToBritishTitles[i][0].toUpperCase()) {
              replacements.push(`<span class="highlight">${americanToBritishTitles[i][0].toUpperCase() + americanToBritishTitles[i].slice(1)}</span>`)
            } else {
              replacements.push(`<span class="highlight">${americanToBritishTitles[i]}</span>`)
            }
          }
        }
      } else {
        for (let i in americanToBritishTitles) {
          let re = new RegExp(`(${americanToBritishTitles[i]})`, "gmi");
          if (string.match(re)) {
            titles.push(string.match(re)[0])
            if (string.match(re)[0][0] === i[0].toUpperCase()) {
              replacements.push(`<span class="highlight">${i[0].toUpperCase() + i.slice(1)}</span>`)
            } else {
              replacements.push(`<span class="highlight">${i}</span>`)
            }
          }
        }
      }
      
      // console.log(titles, replacements)
      return [titles, replacements]
  }

  translate(string, locale) {
    // console.log(string)
    let newString = string.split(' ')
    let [titles, newTitles] = this.translateTitles(string, locale)
    // let times = this.translateTimes(string, locale)
    let [words, newWords] = this.translateWords(string, locale)
    let [spellings, newSpellings] = this.translateSpellings(string, locale)
    let AmericanFormat = /[\d]{1,2}:[\d]{2}/gm
    let BritishFormat = /[\d]{1,2}\.[\d]{2}/gm

    // for each word in string array
      newString.forEach(word => {
        // if current word is in titles list
        if (titles.includes(word)) {
          // get position of word in string and list respectively
          let stringIndex = newString.indexOf(word)
          let listIndex = titles.indexOf(word)
          // replace word in string with replacement word and inline HTML
          newString[stringIndex] = newTitles[listIndex]
        } else if (word.match(BritishFormat) && locale === 'british-to-american') {
          let strIndex = newString.indexOf(word)
          word = word.replace(word.match(BritishFormat)[0], `<span class="highlight">${word.match(BritishFormat)[0].replace('.',':')}</span>`)
          newString[strIndex] = word
        } else if (word.match(AmericanFormat) && locale === 'american-to-british') {
          let strIndex = newString.indexOf(word)
          word = word.replace(word.match(AmericanFormat)[0], `<span class="highlight">${word.match(AmericanFormat)[0].replace(':','.')}</span>`)
          newString[strIndex] = word
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
      // console.log(newString)
      // console.log(`\n`)

      if (newString === string) {
        return { text:string, translation:'Everything looks good to me!'}
      } else {
        return { text:string, translation:newString}  
      }
  }

}

module.exports = Translator;