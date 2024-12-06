import express from "express";
import bodyParser from "body-parser";
import connectDB from "./database";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();
const PORT = 3001;

connectDB();

app.use(
    cors({
      origin: 'http://localhost:5174', // Ganti dengan domain frontend kamu
      methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metode HTTP yang diizinkan
      allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
    })
  );

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
      status: 'success',
      message: 'Hello World!',
      date: new Date()
    });
  });

app.use("/", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
