const express = require('express');
const router = express.Router();
const getAllBranchesCtrl = require('../controllers/getAllBranchesCtrl');
const getOneBranchCtrl = require('../controllers/getOneBranchCtrl');
const addOneBranchCtrl = require('../controllers/addOneBranchCtrl');
const updateBranchCtrl = require('../controllers/updateBranchCtrl');
const deleteOneBranchCtrl = require('../controllers/deleteOneBranchCtrl');
const getOneBranchQuickCtrl = require('../controllers/getOneBranchQuickCtrl');


router.get('/', getAllBranchesCtrl);
router.get('/:id', getOneBranchCtrl);
router.get('/:id/update/', getOneBranchQuickCtrl);
router.post('/', addOneBranchCtrl);
router.put('/:id', updateBranchCtrl);
router.delete('/:id', deleteOneBranchCtrl);



module.exports = router