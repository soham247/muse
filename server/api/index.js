import dotenv from "dotenv";
import { app } from "../src/app.js"
import connectDB from '../src/db/index.js';

dotenv.config(
    {
        path: './.env'
    }
);

const PORT = process.env.PORT || 8001;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })
}).catch((error) => {
    console.log("Failed to connect to database", error);
    
});