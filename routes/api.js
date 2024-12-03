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
      if (text == '') {
        res.json({ error: 'No text to translate' })
      } else if (!locale || !text) {
        res.json({ error: 'Required field(s) missing' })
      } else if (!validLocales.includes(locale)) {
        res.json({ error: 'Invalid value for locale field' })
      // else return result of translation
      } else {
        res.json (translator.translate(text, locale))
      }

    });
};
