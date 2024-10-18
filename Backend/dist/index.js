"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const zod_1 = __importDefault(require("zod"));
const cors_1 = __importDefault(require("cors"));
const database_1 = __importDefault(require("./database"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use(express_1.default.json());
const NotesSchema = zod_1.default.object({
    title: zod_1.default.string(),
    description: zod_1.default.string(),
    category: zod_1.default.string(),
});
// Create Note
app.post('/api/notes', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parseResult = NotesSchema.safeParse(req.body);
    if (!parseResult.success) {
        return res.status(400).json({
            message: "Incorrect inputs",
            errors: parseResult.error.errors,
        });
    }
    try {
        const newNote = yield database_1.default.create({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
        });
        res.status(201).json({
            message: "Note created successfully",
            data: newNote,
        });
    }
    catch (error) {
        console.error("Error creating Note:", error);
        res.status(500).json({
            message: "Server error",
            error: error.message,
        });
    }
})));
// Read Notes
app.get('/api/notes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNotes = yield database_1.default.find();
        res.status(200).json(allNotes);
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}));
// Update Note
app.put('/api/notes/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { description } = req.body;
    if (!description) {
        return res.status(400).json({ msg: "Description is required." });
    }
    try {
        const updatedNotes = yield database_1.default.findByIdAndUpdate(id, { description }, { new: true });
        if (!updatedNotes) {
            return res.status(404).json({ msg: "Note not found." });
        }
        res.json({ msg: "Note Updated!", data: updatedNotes });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})));
// Delete Note
app.delete('/api/notes/:id', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedNotes = yield database_1.default.findByIdAndDelete(id);
        if (!deletedNotes) {
            return res.status(404).json({ msg: "Note not found." });
        }
        res.json({ msg: "Note Deleted Successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})));
app.listen(3110, () => {
    console.log("Server is running on port 3110");
});
