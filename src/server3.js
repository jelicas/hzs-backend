import express from "express";
import cors from "cors";
import { database } from "./database/index.js";
import { userRouter } from "./routes/user.router.js";
import { postRouter } from "./routes/post.router.js";
import dotenv from "dotenv";

async function main() {
    dotenv.config();

    const app = express();
    await database.initialize();

    app.use(cors());
    app.use(express.json());
    app.use('/user', userRouter);
    app.use('/post', postRouter);

    app.listen(3001, () => {
        console.log("Up and running");
    });
}

main();
