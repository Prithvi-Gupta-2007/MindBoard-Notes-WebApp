require("dotenv").config();
const cors = require("cors");
const express = require("express");

const notesRoutes = require("./routes/notesRoutes");
const connectDB = require("./config/db");

const app = express()
const PORT = process.env.PORT || 5001


app.use(cors({
    origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api/notes", notesRoutes);
    
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log("Server started on PORT :", PORT);
    })
})

