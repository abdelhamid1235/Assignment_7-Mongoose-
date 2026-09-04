import mongoose from "mongoose";
import { DB_URI } from "../config.js";
import { userModule } from "./model/user.model.js";


export const bootstrap = async (app , port)=>{
    try {
        await mongoose.connect(DB_URI , {serverSelectionTimeoutMS:5000});
        console.log("DB Conection Successfully ✔️");
        await userModule.syncIndexes()
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
    } catch (error) {
        console.log(error);
        console.log("Failed Conection DB ❌");
    }
}