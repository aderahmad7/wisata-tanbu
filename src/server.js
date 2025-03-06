import express from "express";
import cors from "cors";
import sequelize from "./configs/database.js";
import authRoute from "./routes/auth.js";
import destinationRoute from "./routes/destination.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Biar __dirname bisa dipakai (karena pakai ES Modules)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Static file serve dengan path yang tepat
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/auth", authRoute);
app.use("/api/destination", destinationRoute);

sequelize.sync().then(() => {
  app.listen(5000, () =>
    console.log("Backend berjalan di http://localhost:5000")
  );
});