import express from "express";
import { database } from "./database/index.js";

async function main() {

    const app = express();
    await database.initialize();

    app.get("/", (req, res) => {
        res.send({ message: "Poruka" });
    });

    app.listen(3001, () => {
        console.log("Up and running");
    });
}

main();
