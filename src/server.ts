import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("Running!");
});

function keepAlive() {
    app.listen(3000, () => {
        console.log("Server is ready.");
    });
}

export default keepAlive;
