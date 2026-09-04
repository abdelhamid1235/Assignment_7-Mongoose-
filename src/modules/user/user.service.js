import { userModule } from "../../DB/model/index.js"

export const signup =async (inputs) => {
    const emailExits = await userModule.findOne({ email: inputs.email })
    if(emailExits){
        throw new Error("Email Already Exist", { cause: { status: 409 } })
    }
    const user = await userModule.create(inputs);
    return user;
}

export const login = async (inputs) => {
    const account = await userModule.findOne({ email: inputs.email , password: inputs.password })
    if(!account){
        throw new Error("Invalid Email Or Password", { cause: { status: 401 } })
    }
    return account;
}

export const UpdateUserData = async (userId , inputs )=>{
    const userExist = await userModule.findOne({email:inputs.email , _id:{$ne:userId}})
    if(userExist){
        throw new Error("Email Already Exist", { cause: { status: 409 } })
    }
    const updateData = await userModule.findByIdAndUpdate(userId ,
        {
            $set:inputs ,
            $inc: {__v : 1}
        },
        {
            returnDocument: "after" , 
            runValidators:true , 
            select: '-password'
        })
    if(!updateData){
        throw new Error("User Not Found", { cause: { status: 404 } })
    }
    return updateData
}

export const deleteUser = async (userId  )=>{

    const deleteUser = await userModule.findByIdAndDelete(userId )
    if(!deleteUser){
        throw new Error("User Not Found !",  { cause: { status: 404 } });
    }
    return deleteUser
}

export const profile = async (userId  )=>{
    const user = await userModule.findById(userId )  
    if(!user){
        throw new Error("User Not Found !",  { cause: { status: 404 } });
    }
    return user
}