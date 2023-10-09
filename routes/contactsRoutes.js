const express = require('express')
const {
  getContacts,
  postContacts,
  getContactById,
  putContactById,
  deleteContactById
} = require('../controllers/contactsController')

const router = express.Router()

router.route('/').get(getContacts).post(postContacts)
router
  .route('/:id')
  .get(getContactById)
  .put(putContactById)
  .delete(deleteContactById)
module.exports = router
