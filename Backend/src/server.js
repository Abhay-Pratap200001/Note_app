import express from 'express'
import notesRoutes from './routes/notes.Routes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
dotenv.config()
let PORT = process.env.PORT || 2000


const app = express();

connectDB()

app.use(express.json())

app.use("/api/notes", notesRoutes)

app.listen(PORT, () => {
console.log(`✅ Server running at http://localhost:${PORT}`);})

