const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

const Contact = require('../../models/Contact');
// @route   GET api/contact
// @desc    GET all contact
//@access   Public
router.get('/', async (req, res) => {
  try {
    console.log('get req');
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});

// @route   GET api/contact/:id
// @desc    GET contact by id
//@access   Public
router.get('/:id', async (req, res) => {
  try {
    console.log('get by id req');
  } catch (err) {
    console.error(err.message);
    res.send(500).send('Server error');
  }
});

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('message', 'Please leave a message').not().isEmpty(),
  ],
  async (req, res) => {
    const { name, email, message } = req.body;
    let contact = await Contact({
      name,
      message,
      email,
    });
    contact = new Contact({
      name,
      email,
      message,
    });

    await contact.save();
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errorrs: errors.array(),
      });
    }
    console.log(req.body);
    res.send('contact route');
  }
);

module.exports = router;
