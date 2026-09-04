import { Router } from "express";
import { successResponse } from "../../common/utils/index.js";
import { createNote, updateNoteWithOwner,replaceWithOwner,updateTitleAllNotes,deleteNoteWithOwner,paginateSort,getNoteWithId,noteByContent,getAllNoteWithSelect,getAllNoteWithTitle,deleteAllNotes } from "./note.service.js";
const router = Router()
// 1- • URL: POST /notes
router.post("/", async (req, res, next) => {
    const result = await createNote(req.query.userId, req.body)

    return successResponse({res,message: "Note Created",status: 201,result})
})
//   4- • URL: PATCH /notes/all
router.patch('/all', async (req, res, next) => {
    const result = await updateTitleAllNotes(req.query.userId,req.body)
    return successResponse({ res, message: "Notes Titles Updated", status: 200, data: result})
})

// 2- • URL: PATCH /notes/:noteId => /notes/

router.patch('/:noteId' , async(req , res , next )=>{
    const result = await updateNoteWithOwner(req.query.userId , req.params.noteId , req.body)
    return successResponse({ res , status:200 , message:"Note Updated" ,data: result })
})

// 3- PUT /notes/replace/:noteId=> /notes/replace/

router.put('/replace/:noteId', async(req , res , next )=>{
    const result = await replaceWithOwner(req.query.userId , req.params.noteId , req.body)
    return successResponse({ res , status:200, message:"Notes Replaced" , data: result })
})

// 6- • URL: DELETE /notes/:noteId => /notes/64d91c42d8979e1f30a12346

router.delete('/:noteId' , async(req , res , next )=>{
    const result = await deleteNoteWithOwner(req.query.userId , req.params.noteId )
    return successResponse({ res , status:200, message:"Notes Deleted" ,data: result })

})


// 7 • URL: GET /notes/paginate-sort => for example /notes/paginate-sort?page=2&limit=3

router.get('/paginate-sort', async(req , res , next )=>{
    const result = await paginateSort(req.query.userId , req.query.page , req.query.limit )
    return successResponse({ res , status:200, message:" Notes Retrieved" ,data: result })

})


// 9- • URL: GET /notes/note-by-content => / notes/note-by-content?content=Workout Plan
router.get('/note-by-content', async(req , res , next )=>{
    const {content} =req.query
    const result = await noteByContent(req.query.userId , content)
    return successResponse({ res , status:200, message:" Note Retrieved" , data: result })

})


//  10- • URL: GET /notes/note-with-user
router.get('/note-with-user',async(req , res , next )=>{
    const result = await getAllNoteWithSelect(req.query.userId)
    return successResponse({ res , status:200, message:" Note Retrieved" , data: result })

})


// 11 - • URL: GET /notes/aggregate => /notes/aggregate?title=Code Review Notes
router.get('/aggregate', async (req, res, next) => {
    const { title, userId } = req.query
    const result = await getAllNoteWithTitle(userId, title)
    return successResponse({res, message: "Note Retrieved",status: 200, data: result})
})
// 8- • URL: GET /notes/:id => /posts/
router.get('/:noteId', async(req , res , next )=>{
    const result = await getNoteWithId(req.query.userId , req.params.noteId )
    return successResponse({ res , status:200, message:" Note Retrieved" , data:result })

})
//12- • URL: DELETE /notes
router.delete("/", async (req, res, next) => {
    const result = await deleteAllNotes(req.query.userId)
    return successResponse({res,message: "All Notes Deleted Successfully",status: 200,data: result})
})

export default router