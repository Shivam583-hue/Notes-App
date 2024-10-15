import express, { Request, Response } from "express"; 
import zod from "zod";
import cors from "cors";
import NotesModel from "./database";

const app = express();

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());


const NotesSchema = zod.object({
    title: zod.string(),
    description: zod.string(),
    category: zod.string(),
});

//Create
app.post('/api/notes', (async (req: Request,res: Response) => { 
    const parseResult = NotesSchema.safeParse(req.body); 

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs", 
    })}
    try {
        const newNote = await NotesModel.create({
            title: req.body.title, 
            description: req.body.description,
            category: req.body.category,
        });

        res.status(201).json({
            message: "Note created successfully",
            data: newNote,
        });
    } catch (error: any) {
        console.error("Error creating Note:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
})as express.RequestHandler);

//Read
app.get('/api/notes', async (req, res) => {
    try {
        const allNotes = await NotesModel.find(); 
        res.json(allNotes); 
    } catch (error:any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

//Update
app.put('/api/notes', (async (req : Request, res: Response) => {
    if (!req.body._id) {
        return res.status(400).json({ msg: "id is required." });
    }
    try {
        const updatedNotes = await NotesModel.updateOne(
            { _id: req.body._id },
            {
                description: req.body.description,
            }
        );
        res.json({
            msg: "Note Updated!"
        });
    } catch (error) {
        return res.status(500).json({ message: "Server error" });
    }
})as express.RequestHandler);
// Delete
app.delete('/api/notes', (async (req:Request, res:Response) => {
    if (!req.body._id) {
        return res.status(400).json({ msg: "_id is required." });
    }

    try {
        const deletedNotes = await NotesModel.deleteOne({ _id: req.body._id });

        if (deletedNotes.deletedCount === 0) {
            return res.status(404).json({ msg: "Note not found." });
        }

        res.send("Deleted");
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
})as express.RequestHandler);

app.listen(3110, () => {
    console.log("Server is running on port 3110");
});
