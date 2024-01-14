const express = require('express')
const router = express.Router()
const {getNotes, setNote, updateNote, deleteNote} = require("../controllers/noteController")

router.route('/').get(getNotes).post(setNote)
router.route('/:id').delete(deleteNote).put(updateNote)

module.exports = router