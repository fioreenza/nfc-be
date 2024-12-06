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
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'PUT', 'DELETE'], 
      allowedHeaders: ['Content-Type', 'Authorization'], 
    })
  );

app.use(bodyParser.json());

app.get('/events', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.flushHeaders();
  
    const sendData = (data: string) => {
      res.write(`data: ${data}\n\n`);
    };
  
    setInterval(() => {
      sendData('Data pengguna baru');
    }, 5000); // Kirim data setiap 5 detik
  
    req.on('close', () => {
      console.log('Connection closed');
    });
  });

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
