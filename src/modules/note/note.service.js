import { toObjectId } from "../../common/utils/objectId.js"
import { noteModules } from "../../DB/model/index.js"

export const createNote = async (userId, inputs) => {
    const note = await noteModules.create({
        ...inputs,
        userId
    })

    return note
}
export const updateNoteWithOwner = async(userId  , noteId, inputs )=>{
    const findNote = await noteModules.findById(noteId)
    if(!findNote){
        throw new Error("Note Not Found" , {cause:{status:404}});
    }
    if( findNote.userId.toString() !== userId.toString() ){
        throw new Error("We are Not Owner !" , {cause:{status:404}});
    }
    const updateNote = await noteModules.findByIdAndUpdate(  noteId , inputs , {new: true })
    return updateNote
}

export const  replaceWithOwner = async(userId  , noteId, inputs )=>{
    const findNote = await noteModules.findById(noteId)
    if(!findNote){
        throw new Error("Note Not Found" , {cause:{status:404}});
    }
    if( findNote.userId.toString() !== userId.toString() ){
        throw new Error("We are Not Owner !" , {cause:{status:404}});
    }
    const replaceNote = await noteModules.findOneAndReplace( {_id:  noteId , userId  } , inputs , {new: true })
    return replaceNote
}
export const updateTitleAllNotes = async (userId, inputs) => {
    const { title } = inputs
    const updateNote = await noteModules.updateMany(
        { userId: userId },
        { $set: { title: title } }
    )
    if (updateNote.matchedCount === 0) {
        throw new Error("Note Not Found", {cause: { status: 404 }})
    }
    return updateNote
}


export const  deleteNoteWithOwner = async( userId , noteId  )=>{

    const findNote = await noteModules.findById(noteId)
    if(!findNote){
        throw new Error("Note Not Found" , {cause:{status:404}});
    }
    if( findNote.userId.toString() !== userId.toString() ){
        throw new Error("We are Not Owner !" , {cause:{status:404}});
    }
    const deletedNote = await noteModules.findByIdAndDelete(noteId);
    return deletedNote
}

export const  paginateSort  = async( userId , page , limit )=>{

    page = Number(page);
    limit = Number(limit);
  const skip = (page - 1) * limit;
    const Notes = await noteModules.find({userId}).sort({createdAt : -1 }).skip(skip).limit(limit);
    return Notes
}

export const  getNoteWithId = async( userId , noteId )=>{

    const findNoteById = await noteModules.findById(noteId)
    if(!findNoteById){
        throw new Error("Note Not Found", {cause: { status: 404 }})
    }
    if(findNoteById.userId.toString() !== userId.toString() ){
        throw new Error("We are Not the  Owner ", {cause: { status: 404 }})
    }
    return findNoteById
}

export const  noteByContent = async( userId , noteContent )=>{

    const findNoteByQuery = await noteModules.find({userId , content: noteContent
})
    if(!findNoteByQuery )
        throw new Error("Note Not Found", {cause: { status: 404 }})
    return findNoteByQuery
}

export const  getAllNoteWithSelect = async(userId)=>{

    const findNoteByQuery = await noteModules.find({userId }).select('title userId createdAt')
    .populate('userId', 'email -_id')

    if(!findNoteByQuery )
        throw new Error("Note Not Found", {cause: { status: 404 }})

    return findNoteByQuery
}

export const getAllNoteWithTitle = async (userId, title) => {

    const note = await noteModules.aggregate([
        {
            $match: {
                userId: toObjectId(userId),
                title: title
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $project: {
                _id: 0,
                title: 1,
                userId: 1,
                createdAt: 1,
                "user.name": 1,
                "user.email": 1
            }
        }
    ])

    if (!note.length) {
        throw new Error("Note Not Found", {
            cause: { status: 404 }
        })
    }

    return note
}

export const deleteAllNotes = async (userId) => {
    const result = await noteModules.deleteMany({ userId })
    if (result.deletedCount === 0) {
        throw new Error("No Notes Found", {cause: { status: 404 }})
    }
    return result
}
