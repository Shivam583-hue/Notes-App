import mongoose from "mongoose"
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch(err => console.error("Failed to connect to MongoDB", err));

const NotesSchema = new mongoose.Schema({
    title : String,
    description : String,
    category : String,
})

const NotesModel = mongoose.model("NotesModel",NotesSchema)
export default NotesModel; 