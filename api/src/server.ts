import express from  "express"
import dotenv from "dotenv"
import cors from "cors"
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import personalRoutes from "./routes/personalRoutes"

dotenv.config();
const server = express();

server.use(cors());
server.use(express.urlencoded({extended: true}));
server.use(express.json());

server.use("/api", userRoutes);
server.use("/api/auth", authRoutes);
server.use("/api/personal", personalRoutes);

server.listen(process.env.PORT, () => {
    console.log(`Escutando a porta ${process.env.PORT}`);
});

export default server