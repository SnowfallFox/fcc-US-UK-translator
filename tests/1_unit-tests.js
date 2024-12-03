const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');
const translator = new Translator();

suite('Unit Tests', () => {
    suite('Translate to British English', () => {
        suite('Spelling tests', () => {
            test("'favorite' translates to 'favourite'", function() {
                assert.typeOf(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'object')
                assert.property(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'text')
                assert.property(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'translation')
                assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').text, 'Mangoes are my favorite fruit.')
                assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
            })
            test("'yogurt' translates to 'yoghurt'", function() {
                assert.typeOf(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'object')
                assert.property(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'text')
                assert.property(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'translation')
                assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').text, 'I ate yogurt for breakfast.')
                assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
            })
        })
        suite('Word translation tests', () => {
            test("'condo' translates to 'flat'", function() {
                assert.typeOf(translator.translate("We had a party at my friend's condo.", 'american-to-british'), 'object')
                assert.property(translator.translate("We had a party at my friend's condo.", 'american-to-british'), 'text')
                assert.property(translator.translate("We had a party at my friend's condo.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("We had a party at my friend's condo.", 'american-to-british').text, "We had a party at my friend's condo.")
                assert.equal(translator.translate("We had a party at my friend's condo.", 'american-to-british').translation, "We had a party at my friend's <span class=\"highlight\">flat</span>.")
            })
            test("'trashcan' translates to 'bin'", function() {
                assert.typeOf(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british'), 'object')
                assert.property(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british'), 'text')
                assert.property(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british'), 'translation')
                assert.equal(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british').text, "Can you toss this in the trashcan for me?")
                assert.equal(translator.translate("Can you toss this in the trashcan for me?", 'american-to-british').translation, "Can you toss this in the <span class=\"highlight\">bin</span> for me?")
            })
            test("'parking lot' translates to 'car park'", function() {
                assert.typeOf(translator.translate("The parking lot was full.", 'american-to-british'), 'object')
                assert.property(translator.translate("The parking lot was full.", 'american-to-british'), 'text')
                assert.property(translator.translate("The parking lot was full.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("The parking lot was full.", 'american-to-british').text, "The parking lot was full.")
                assert.equal(translator.translate("The parking lot was full.", 'american-to-british').translation, "The <span class=\"highlight\">car park</span> was full.")
            })
            test("'Rube Goldberg machine' translates to 'Heath Robinson device'", function() {
                assert.typeOf(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british'), 'object')
                assert.property(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british'), 'text')
                assert.property(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british').text, "Like a high tech Rube Goldberg machine.")
                assert.equal(translator.translate("Like a high tech Rube Goldberg machine.", 'american-to-british').translation, "Like a high tech <span class=\"highlight\">Heath Robinson device</span>.")
            })
            test("'play hooky' translates to 'bunk off'", function() {
                assert.typeOf(translator.translate("To play hooky means to skip class or work.", 'american-to-british'), 'object')
                assert.property(translator.translate("To play hooky means to skip class or work.", 'american-to-british'), 'text')
                assert.property(translator.translate("To play hooky means to skip class or work.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("To play hooky means to skip class or work.", 'american-to-british').text, "To play hooky means to skip class or work.")
                assert.equal(translator.translate("To play hooky means to skip class or work.", 'american-to-british').translation, "To <span class=\"highlight\">bunk off</span> means to skip class or work.")
            })
        })
        suite("Title translation tests", () => {
            test("'Mr.' translates to 'Mr'", function() {
                assert.typeOf(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british'), 'object')
                assert.property(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british'), 'text')
                assert.property(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british').text, "No Mr. Bond, I expect you to die.")
                assert.equal(translator.translate("No Mr. Bond, I expect you to die.", 'american-to-british').translation, "No <span class=\"highlight\">Mr</span> Bond, I expect you to die.")
            })
            test("'Dr.' translates to 'Dr'", function() {
                assert.typeOf(translator.translate("Dr. Grosh will see you now.", 'american-to-british'), 'object')
                assert.property(translator.translate("Dr. Grosh will see you now.", 'american-to-british'), 'text')
                assert.property(translator.translate("Dr. Grosh will see you now.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("Dr. Grosh will see you now.", 'american-to-british').text, "Dr. Grosh will see you now.")
                assert.equal(translator.translate("Dr. Grosh will see you now.", 'american-to-british').translation, "<span class=\"highlight\">Dr</span> Grosh will see you now.")
            })
        })
        suite("Time translation tests", () => {
            test("'12:15' translates to '12.15'", function() {
                assert.typeOf(translator.translate("Lunch is at 12:15 today.", 'american-to-british'), 'object')
                assert.property(translator.translate("Lunch is at 12:15 today.", 'american-to-british'), 'text')
                assert.property(translator.translate("Lunch is at 12:15 today.", 'american-to-british'), 'translation')
                assert.equal(translator.translate("Lunch is at 12:15 today.", 'american-to-british').text, "Lunch is at 12:15 today.")
                assert.equal(translator.translate("Lunch is at 12:15 today.", 'american-to-british').translation, "Lunch is at <span class=\"highlight\">12.15</span> today.")
            })
        })
        suite("Highlight tests", () => {
            test("'favorite' translates to 'favourite' and 'favourite' is highlighted", function() {
                assert.typeOf(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'object')
                assert.property(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'text')
                assert.property(translator.translate('Mangoes are my favorite fruit.', 'american-to-british'), 'translation')
                assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').text, 'Mangoes are my favorite fruit.')
                assert.equal(translator.translate('Mangoes are my favorite fruit.', 'american-to-british').translation, 'Mangoes are my <span class="highlight">favourite</span> fruit.')
            })
            test("'yogurt' translates to 'yoghurt' and 'yoghurt' is highlighted", function() {
                assert.typeOf(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'object')
                assert.property(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'text')
                assert.property(translator.translate('I ate yogurt for breakfast.', 'american-to-british'), 'translation')
                assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').text, 'I ate yogurt for breakfast.')
                assert.equal(translator.translate('I ate yogurt for breakfast.', 'american-to-british').translation, 'I ate <span class="highlight">yoghurt</span> for breakfast.')
            })
        })
    })
    suite('Translate to American English', () => {
        suite('Spelling tests', () => {
            test("'caramelise' translates to 'caramelize'", function() {
                assert.typeOf(translator.translate("First, caramelise the onions.", 'british-to-american'), 'object')
                assert.property(translator.translate("First, caramelise the onions.", 'british-to-american'), 'text')
                assert.property(translator.translate("First, caramelise the onions.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("First, caramelise the onions.", 'british-to-american').text, "First, caramelise the onions.")
                assert.equal(translator.translate("First, caramelise the onions.", 'british-to-american').translation, "First, <span class=\"highlight\">caramelize</span> the onions.")
            })
        })
        suite("Word translation tests", () => {
            test("'footie' translates to 'soccer'", function() {
                assert.typeOf(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'object')
                assert.property(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'text')
                assert.property(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("We watched the footie match for a while.", 'british-to-american').text, "We watched the footie match for a while.")
                assert.equal(translator.translate("We watched the footie match for a while.", 'british-to-american').translation, "We watched the <span class=\"highlight\">soccer</span> match for a while.")
            })
            test("'Paracetamol' translates to 'Tylenol'", function() {
                assert.typeOf(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'object')
                assert.property(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'text')
                assert.property(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american').text, "Paracetamol takes up to an hour to work.")
                assert.equal(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american').translation, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
            })
            test("'bank holiday' translates to 'public holiday' and 'funfair' to 'carnival'", function() {
                assert.typeOf(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american'), 'object')
                assert.property(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american'), 'text')
                assert.property(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american').text, "I spent the bank holiday at the funfair.")
                assert.equal(translator.translate("I spent the bank holiday at the funfair.", 'british-to-american').translation, "I spent the <span class=\"highlight\">public holiday</span> at the <span class=\"highlight\">carnival</span>.")
            })
            test("'bicky' translates to 'cookie', and 'chippy' to 'fish-and-chip shop'", function() {
                assert.typeOf(translator.translate("I had a bicky then went to the chippy.", 'british-to-american'), 'object')
                assert.property(translator.translate("I had a bicky then went to the chippy.", 'british-to-american'), 'text')
                assert.property(translator.translate("I had a bicky then went to the chippy.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("I had a bicky then went to the chippy.", 'british-to-american').text, "I had a bicky then went to the chippy.")
                assert.equal(translator.translate("I had a bicky then went to the chippy.", 'british-to-american').translation, "I had a <span class=\"highlight\">cookie</span> then went to the <span class=\"highlight\">fish-and-chip shop</span>.")
            })
            test("'bits and bobs' translates to 'odds and ends', and 'bum bag' to 'fanny pack'", function() {
                assert.typeOf(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'), 'object')
                assert.property(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'), 'text')
                assert.property(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american').text, "I've just got bits and bobs in my bum bag.")
                assert.equal(translator.translate("I've just got bits and bobs in my bum bag.", 'british-to-american').translation, "I've just got <span class=\"highlight\">odds and ends</span> in my <span class=\"highlight\">fanny pack</span>.")
            })
            test("'car boot sale' translates to 'swap meet'", function() {
                assert.typeOf(translator.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american'), 'object')
                assert.property(translator.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american'), 'text')
                assert.property(translator.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american').text, "The car boot sale at Boxted Airfield was called off.")
                assert.equal(translator.translate("The car boot sale at Boxted Airfield was called off.", 'british-to-american').translation, "The <span class=\"highlight\">swap meet</span> at Boxted Airfield was called off.")
            })
        })
        suite("Title translation tests", () => {
            test("'Mrs' translates to 'Mrs.'", function() {
                assert.typeOf(translator.translate("Have you met Mrs Kalyani?", 'british-to-american'), 'object')
                assert.property(translator.translate("Have you met Mrs Kalyani?", 'british-to-american'), 'text')
                assert.property(translator.translate("Have you met Mrs Kalyani?", 'british-to-american'), 'translation')
                assert.equal(translator.translate("Have you met Mrs Kalyani?", 'british-to-american').text, "Have you met Mrs Kalyani?")
                assert.equal(translator.translate("Have you met Mrs Kalyani?", 'british-to-american').translation, "Have you met <span class=\"highlight\">Mrs.</span> Kalyani?")
            })
            test("'Prof' translates to 'Prof.'", function() {
                assert.typeOf(translator.translate("Prof Joyner of King's College, London.", 'british-to-american'), 'object')
                assert.property(translator.translate("Prof Joyner of King's College, London.", 'british-to-american'), 'text')
                assert.property(translator.translate("Prof Joyner of King's College, London.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("Prof Joyner of King's College, London.", 'british-to-american').text, "Prof Joyner of King's College, London.")
                assert.equal(translator.translate("Prof Joyner of King's College, London.", 'british-to-american').translation, "<span class=\"highlight\">Prof.</span> Joyner of King's College, London.")
            })
        })
        suite("Time translation tests", () => {
            test("'4.30' translates to '4:30'", function() {
                assert.typeOf(translator.translate("Tea time is usually around 4 or 4.30.", 'british-to-american'), 'object')
                assert.property(translator.translate("Tea time is usually around 4 or 4.30.", 'british-to-american'), 'text')
                assert.property(translator.translate("Tea time is usually around 4 or 4.30.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("Tea time is usually around 4 or 4.30.", 'british-to-american').text, "Tea time is usually around 4 or 4.30.")
                assert.equal(translator.translate("Tea time is usually around 4 or 4.30.", 'british-to-american').translation, "Tea time is usually around 4 or <span class=\"highlight\">4:30</span>.") 
            })
        })
        suite("Highlight tests", () => {
            test("'footie' translates to 'soccer' and 'soccer' is highlighted", function() {
                assert.typeOf(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'object')
                assert.property(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'text')
                assert.property(translator.translate("We watched the footie match for a while.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("We watched the footie match for a while.", 'british-to-american').text, "We watched the footie match for a while.")
                assert.equal(translator.translate("We watched the footie match for a while.", 'british-to-american').translation, "We watched the <span class=\"highlight\">soccer</span> match for a while.")
            })
            test("'Paracetamol' translates to 'Tylenol' and 'Tylenol' is highlighted", function() {
                assert.typeOf(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'object')
                assert.property(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'text')
                assert.property(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american'), 'translation')
                assert.equal(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american').text, "Paracetamol takes up to an hour to work.")
                assert.equal(translator.translate("Paracetamol takes up to an hour to work.", 'british-to-american').translation, "<span class=\"highlight\">Tylenol</span> takes up to an hour to work.")
            })
        })
    })

});
