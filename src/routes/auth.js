import express from "express";
import { login, register, authenticateToken } from "../controllers/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/tes", (req, res) => {
  res.send("Route GET /api/auth/tes OK");
});
router.get("/validate-token", authenticateToken, (req, res) => {
  res.status(200).json({ message: "Token valid", user: req.user });
});

export default router;