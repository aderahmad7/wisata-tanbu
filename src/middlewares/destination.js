import { body, validationResult } from "express-validator";

export const validateAddData = [
  body("subdistrict").notEmpty().withMessage("Kecamatan harus diisi!"),
  body("place_name").notEmpty().withMessage("Nama tempat harus diisi!"),
  body("location").notEmpty().withMessage("Lokasi harus diisi!"),
  body("description").notEmpty().withMessage("Deskripsi harus diisi!"),
  body("latitude")
    .notEmpty()
    .withMessage("Latitude harus diisi!")
    .isNumeric()
    .withMessage("Latitude harus berupa angka!"),
  body("longitude")
    .notEmpty()
    .withMessage("Longitude harus diisi!")
    .isNumeric()
    .withMessage("Longitude harus berupa angka!"),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
