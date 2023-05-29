const NonceService = require('../services/nonceService');

const nonceService = new NonceService();

const setNonce = async (req, res) => {
  try {
    const {txn} = req.body;
    if (!txn) throw new Error('Transaction not found');
    const address = nonceService.selectAddress();
    if (!txn['to']) {
      txn['to'] = address;
    }
    const nonce = await nonceService.setNonce(txn['to']);
    txn['nonce'] = nonce;
    res.json({message: 'Transaction is completed', transaction: txn});
  } catch (err) {
    res.json({message: err.message});
  }
};

const failedNonce = async (req, res) => {
  try {
    const {id, failedNonces} = req.body;
    nonceService.setFailedNonces(id, failedNonces);
    res.json({message: 'Transaction is completed'});
  } catch (err) {
    res.json({message: err.message});
  }
};

const getAddressess = async (_req, res) => {
  try {
    const allAddresses = nonceService.getAllAddressess();
    res.json({allAddresses: allAddresses});
  } catch (err) {
    res.json({message: err.message});
  }
};

const createAddress = async (req, res) => {
  try {
    const {count} = req.body;
    nonceService.createAddresses(count);
    res.json({message: 'Addresses created'});
  } catch (err) {
    res.send(err);
  }
};

const handleConcurrentRequests = async (req, res) => {
  const numRequests = 5;
  const promises = [];
  const {id} = req.body;

  for (let i = 0; i < numRequests; i++) {
    promises.push(nonceService.setNonce(id));
  }

  try {
    const nonces = await Promise.all(promises);
    res.json({nonces});
  } catch (error) {
    res.status(500).json({error: 'An error occurred'});
  }
};

module.exports = {
  setNonce,
  failedNonce,
  getAddressess,
  createAddress,
  handleConcurrentRequests,
};
