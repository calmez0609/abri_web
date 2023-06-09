const express = require('express');
const router = express.Router();
const user = require('./API/user');
const info = require('./API/list');

router.get('/user', user.get);
router.get('/list/all', info.all);
router.get('/list/insert_buildingMessage', info.insert_buildingMessage);
router.get('/list/insert_candidateMessage', info.insert_candidateMessage);
router.get('/list/insert_labelMessage', info.insert_labelMessage);
router.get('/list/search_id', info.search_id);
router.get('/list/getAllData', info.getAllData);

router.get('/list/checkDuplicateCertNumber', async (req, res) => {
  const certNumber = req.query.certNumber;
  try {
    const isDuplicate = await info.checkDuplicateCertNumber(certNumber);
    res.send({ isDuplicate });
  } catch (error) {
    console.error('Failed to check duplicate certNumber:', error);
    res.status(500).send('Failed to check duplicate certNumber');
  }
});

module.exports = router;
