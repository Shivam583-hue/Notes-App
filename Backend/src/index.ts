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

// Create Note
app.post('/api/notes', (async (req: Request, res: Response) => { 
    const parseResult = NotesSchema.safeParse(req.body); 

    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: parseResult.error.errors,
        });
    }

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

// Read Notes
app.get('/api/notes', async (req: Request, res: Response) => {
    try {
        const allNotes = await NotesModel.find(); 
        res.status(200).json(allNotes); 
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Update Note
app.put('/api/notes/:id', (async (req: Request, res: Response) => {
    const { id } = req.params;
    const { description } = req.body;

    if (!description) {
        return res.status(400).json({ msg: "Description is required." });
    }

    try {
        const updatedNotes = await NotesModel.findByIdAndUpdate(
            id,
            { description },
            { new: true }
        );

        if (!updatedNotes) {
            return res.status(404).json({ msg: "Note not found." });
        }

        res.json({ msg: "Note Updated!", data: updatedNotes });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})as express.RequestHandler);

// Delete Note
app.delete('/api/notes/:id', (async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const deletedNotes = await NotesModel.findByIdAndDelete(id);

        if (!deletedNotes) {
            return res.status(404).json({ msg: "Note not found." });
        }

        res.json({ msg: "Note Deleted Successfully" });
    } catch (error: any) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})as express.RequestHandler);

app.listen(3110, () => {
    console.log("Server is running on port 3110");
});
