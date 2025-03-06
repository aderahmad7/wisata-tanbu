import Destination from "../models/destination.js";
import fs from "fs";
import path from "path";

export const getData = async (req, res) => {
  try {
    const destination = await Destination.findAll({
      order: [["id", "DESC"]], // Mengurutkan berdasarkan ID secara descending
    });
    res.status(200).json({
      message: "Sukses",
      destination: destination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal",
      error: error.message,
    });
  }
};

export const addData = async (req, res) => {
  const {
    subdistrict,
    place_name,
    location,
    latitude,
    longitude,
    description,
  } = req.body;
  const photo_url = req.file ? req.file.filename : null;
  if (!photo_url) {
    return res.status(400).json({ message: "Foto harus diunggah!" });
  }
  try {
    const newData = await Destination.create({
      subdistrict,
      place_name,
      location,
      latitude,
      longitude,
      photo_url,
      description,
    });

    res
      .status(201)
      .json({ message: "Data berhasil ditambahkan!", data: newData });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menambahkan data.",
      error: error.message,
    });
  }
};

export const editData = async (req, res) => {
  const { id } = req.params;
  const { subdistrict, place_name, location, latitude, longitude } = req.body;
  const newPhoto = req.file ? req.file.filename : null;

  try {
    const destination = await Destination.findByPk(id);

    if (!destination) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    // Jika ada foto baru, hapus foto lama
    if (newPhoto && destination.photo_url) {
      const oldPhotoPath = path.join(
        process.cwd(),
        "src/uploads/photos/",
        destination.photo_url
      );
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath); // 🗑️ Hapus file lama
      }
    }

    // Update data
    await destination.update({
      subdistrict: subdistrict || destination.subdistrict,
      place_name: place_name || destination.place_name,
      location: location || destination.location,
      latitude: latitude || destination.latitude,
      longitude: longitude || destination.longitude,
      photo_url: newPhoto || destination.photo_url, // Gunakan foto baru jika ada
    });

    res.status(200).json({
      message: "Data berhasil diperbarui!",
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui data.",
      error: error.message,
    });
  }
};

export const deleteData = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByPk(id);
    if (!destination) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    // Hapus foto jika ada
    if (destination.photo_url) {
      const photoPath = path.join(
        process.cwd(),
        "src/uploads/photos/",
        destination.photo_url
      );
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath); // 🗑️ Hapus foto dari folder
      }
    }

    // Hapus data dari database
    await destination.destroy();
    res.status(200).json({
      message: "Data berhasil dihapus!",
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus data.",
      error: error.message,
    });
  }
};

export const countData = async (req, res) => {
  try {
    const count = await Destination.count();
    res.status(200).json({
      message: "Sukses",
      count: count,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal.",
      error: error.message,
    });
  }
};

export const topView = async (req, res) => {
  try {
    const response = await Destination.findAll({
      order: [["ctr", "DESC"]],
      limit: 5,
    });
    res.status(200).json({
      message: "Sukses",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal.",
      error: error.message,
    });
  }
};

export const maps = async (req,res) => {
  try {
    const response = await Destination.findAll();
    res.status(200).json({
      message: "Sukses",
      response: response,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal",
      error: error.message,
    });
  }
}

export const updateView = async (req, res) => {
  const { id } = req.params;

  try {
    const destination = await Destination.findByPk(id);

    if (!destination) {
      return res.status(404).json({ message: "Data tidak ditemukan!" });
    }

    // Tambahkan 1 ke field ctr
    destination.ctr += 1;
    await destination.save();

    res.status(200).json({
      message: "View count berhasil diperbarui!",
      data: destination,
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan saat memperbarui view count.",
      error: error.message,
    });
  }
};

