const express = require('express');
const router = express.Router();
const itemController=require('../controllers/item.controller.js');





router.get('/', itemController.getAvailbleItems);
router.get('/rentedbyme', itemController.getRentedItemsByMe);
router.get('/rentedbyothers', itemController.getRentedItemsByOthers);


router.post('/', itemController.createItem);
router.delete('/:remove', itemController.removeItem);
router.put('/:rent', itemController.rent);
router.put('/liberer/:free', itemController.free);





module.exports = router;
