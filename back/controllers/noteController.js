// @desc Get notes
// @route GET /api/notes 
// @accesss Private
const getNotes = (req, res) => {
    res.status(200).json({message: "Get notes"})
}


// @desc Set note
// @route POST /api/notes 
// @accesss Private
const setNote = (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    
    res.status(200).json({message: "Create a note"})
}

// @desc Update notes
// @route PUT /api/notes/:id
// @accesss Private
const updateNote = (req, res) => {
    res.status(200).json({message: `Update note ${req.params.id}`})
}

// @desc Delete notes
// @route DELETE /api/notes/:id
// @accesss Private
const deleteNote = (req, res) => {
    res.status(200).json({message: `Delete note ${req.params.id}`})
}
module.exports = {
    getNotes,
    setNote, 
    updateNote,
    deleteNote
}