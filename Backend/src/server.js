import express from 'express'
import notesRoutes from './routes/notes.Routes.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import ratelimiter from './middleware/rateLimiter.js';
import cors from 'cors'
dotenv.config()

const app = express();
const PORT = process.env.PORT || 2000




app.use(express.json())
app.use(cors({
  origin: 'http://localhost:5173',
}));
app.use(ratelimiter)


app.use("/api/notes", notesRoutes)

connectDB().then(()=>{
    app.listen(PORT, () => {
    console.log(`✅ Server running at http://localhost:${PORT}`);})
})    
