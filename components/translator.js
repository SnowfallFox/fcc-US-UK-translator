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
    return [[],[]]
  }

  translateWords(string, locale) {
    return [[],[]]
  }
  
  translateTimes(string, locale) {
    return [[],[]]
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
        } else if (words.includes(word)) {
          let wordIndex = newString.indexOf(word)
          let listIndex = words.indexOf(word)
          newString[wordIndex] = newWords[listIndex]
        } else if (spellings.includes(word)) {
          let stringIndex = newString.indexOf(word)
          let listIndex = spellings.indexOf(word)
          newString[stringIndex] = newSpellings[listIndex]
        }
      })
      newString = newString.join(' ')

      if (newString === string) {
        return { text:string, translation:'Everything looks good to me!'}
      } else {
        return { text:string, translation:newString}  
      }
  }

}

module.exports = Translator;