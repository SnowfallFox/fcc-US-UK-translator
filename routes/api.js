'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const text = req.body.text;
      const locale = req.body.locale;
      const validLocales = ['american-to-british', 'british-to-american'];

      // if no text
      if (!text) {
        res.json({ error: 'No text to translate' })
      // if locale is not one of the valid pre-defined options
      } else if (!validLocales.includes(locale)) {
        res.json({ error: 'Invalid value for locale field' })
      } else {
        // something like:
        // Translator.translate(string, locale)
        // (check for words in corresponding dict for translations, make array of words)
        // for each word, replace in string with translation
        // if changes made, return string
        // if no changes made, return false
      }

    });
};
