const express = require('express');
const router = express.Router();
const getAllBranchesCtrl = require('../controllers/getAllBranchesCtrl');
const getOneBranchCtrl = require('../controllers/getOneBranchCtrl');
const addOneBranchCtrl = require('../controllers/addOneBranchCtrl');
const updateBranchCtrl = require('../controllers/updateBranchCtrl');
const deleteOneBranchCtrl = require('../controllers/deleteOneBranchCtrl');

// const getDeviceStatus = require('../controllers/getDeviceStatus');


router.get('/', getAllBranchesCtrl);
router.get('/:id', getOneBranchCtrl);
router.post('/', addOneBranchCtrl);
router.put('/:id', updateBranchCtrl);
router.delete('/:id', deleteOneBranchCtrl);

// router.get('/status/:id', getDeviceStatus);


module.exports = router