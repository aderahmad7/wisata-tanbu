import express from "express";
import { authMiddleware } from "../middlewares/auth.js";
import { upload } from "../middlewares/upload.js";
import {
  addData,
  getData,
  editData,
  deleteData,
  countData,
  topView,
  maps,
  updateView,
} from "../controllers/destination.js";
import {
  validateAddData,
  handleValidationErrors,
} from "../middlewares/destination.js";

const router = express.Router();
router.get("/", authMiddleware, getData);
router.get("/maps", maps);
router.get("/count", authMiddleware, countData);
router.get("/top_visit", authMiddleware, topView);
router.post(
  "/",
  authMiddleware,
  upload.single("photo_url"),
  validateAddData,
  handleValidationErrors,
  addData
);
router.put(
  "/:id",
  authMiddleware,
  upload.single("photo_url"), // Upload jika ada foto baru
  validateAddData,
  handleValidationErrors,
  editData
);
router.put("/count/:id", updateView);
router.delete("/:id", authMiddleware, deleteData);

export default router;
