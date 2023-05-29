const express = require('express');
const router = express.Router();
const controller = require('../controller/sendTxn');

router.get('/', controller.getAddressess);
router.put('/', controller.failedNonce);
router.post('/', controller.createAddress);
router.post('/txn', controller.setNonce);
router.post('/concurrent', controller.handleConcurrentRequests);

module.exports = router;
