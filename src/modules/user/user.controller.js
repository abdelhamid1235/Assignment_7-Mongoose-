import { Router } from "express";
import { deleteUser, login, profile, signup, UpdateUserData } from "./user.service.js";
import { successResponse } from "../../common/utils/index.js";
const router = Router();

//1: URL: POST /users/signup
router.post("/signup", async (req, res, next) => {
    const data = await signup(req.body)
    return successResponse({ res,message:"User Added Successfully", status: 201, data })
})

//2:URL: POST /users/login
router.post("/login", async (req, res, next) => {
    const data = await login(req.body)
    return successResponse({ res,message:"User Logged In Successfully",status:200, data })
})

// 3:URL: PATCH/users/:id
router.patch("/:id", async (req, res, next) => {
    const data = await UpdateUserData(req.params.id, req.body)
    return successResponse({ res, message: "User Data Updated Successfully", status: 201, data })
})

//4 :URL: DELETE /users
router.delete("/:id", async (req, res, next) => {
    const data = await deleteUser(req.params.id)
    return successResponse({ res, message: "User Deleted", status: 200, data })
})

// 5: URL: GET /users
router.get("/:id", async (req, res, next) => {
    const data = await profile(req.params.id)
    return successResponse({ res, message: "Done Fined", status: 200, data })
})
export default router