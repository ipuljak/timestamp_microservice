const express = require('express');
const moment = require('moment');
const router = express.Router();

// Do not show warnings to the console for non ISO date formats
moment.suppressDeprecationWarnings = true;

router.get('/:time', (req, res) => {
  let data = {};
  let givenDateUnix = moment.unix(req.params.time);
  let givenDateNatural = moment(req.params.time);

  // If the given date is a unix timestamp
  if (givenDateUnix.isValid()) {
    data = {
      unix: req.params.time,
      natural: givenDateUnix.format("MMMM D, YYYY")
    }
    // Otherwise if the date is valid
  } else if (givenDateNatural.isValid()) {
    data = {
      unix: givenDateNatural.unix(),
      natural: givenDateNatural.format("MMMM D, YYYY")
    };
  } else {
    data = { unix: null, natural: null };
  }

  res.send(data);
});

module.exports = router;
