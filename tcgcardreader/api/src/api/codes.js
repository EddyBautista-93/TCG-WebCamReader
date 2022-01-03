const { getNextKeyDef } = require('@testing-library/user-event/dist/keyboard/getNextKeyDef');
const express = require('express');
// use joi for data validation 
const Joi = require("joi");
// make sure the code property has the pattern of the qr code
// starts with
// - a-z upper and lower
// - number 0-9 or start with a dash 
// - or a dash - 

// example of code YAW-QEDS0-ZQ3-O32
const schema = Joi.object({
  code: Joi.string()
  .pattern(/^[a-z0-9]{13}$/i)

});

const router = express.Router();

router.post('/', async(req, res, next) => {
  // validate qr code hasn't been used yet
  // get back the type of code
  // insert code into db
  try {
    // pass the code from the front end * need to remove dashes before passing 
    const { code } = await schema.validateAsync(req.body); // validates qr code from webcam
    res.json({
      code, 
    });
  } catch (error) {
    console.log(error);    
    next(error)
  }

});

module.exports = router;
