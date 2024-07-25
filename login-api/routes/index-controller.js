const express = require('express');
const router = express.Router();

const {checkToken} = require('./middleware');


router.get('/open', (req, res) => {
    res.status(200).json({
        ok: true,
        data: "TOTHOM POT VEURE AIXÒ"
    });
});

router.get('/secret', checkToken, (req, res) => {
    res.status(200).json({
        ok: true,
        data: "EL NÚMERO SECRET ÉS 42"
    });
});

/* POST CHECK LOGIN */
router.get('/checktoken', checkToken, (req, res) => {
    res.status(200).json({
      ok: true,
      token: req.token});
  });
  

  
module.exports = router;
