import {
  createPlant,
  deletePlant,
  getAllPlants,
  getPlantById,
  updatePlant,
} from "../services/plantService.js";
import cloudinary from "../utils/cloudinary.js";

export const getAll = async (req, res) => {
  try {
    const data = await getAllPlants();
    res.json({
      message: "Berhasil mengambil semua data tanaman",
      data: data,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const data = await getPlantById(req.params.id);
    if (!data) {
      return res.status(404).json({ message: "Plant not found" });
    }
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const create = async (req, res) => {
  try {
    const { nama, harga, deskripsi, kategori, stok } = req.body;

    if (!nama || !harga || !kategori || !stok) {
      return res.status(400).json({ message: "Field wajib tidak lengkap" });
    }

    let imageUrls = [];

    // upload gambar jika ada
    if (req.file?.buffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "plants" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      imageUrls.push(uploadResult.secure_url);
    }

    const plant = await createPlant({
      nama,
      harga,
      deskripsi,
      kategori,
      stok,
      gambar: imageUrls,
    });

    res.status(201).json({
      message: "Tanaman berhasil ditambahkan",
      data: plant,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const update = async (req, res) => {
  try {
    const { nama, harga, deskripsi, kategori, stok } = req.body;

    let updateData = {
      nama,
      harga,
      deskripsi,
      kategori,
      stok,
    };

    // Upload gambar baru jika ada
    if (req.file?.buffer) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "plants" }, (err, result) => {
            if (err) reject(err);
            else resolve(result);
          })
          .end(req.file.buffer);
      });

      updateData.gambar = [uploadResult.secure_url];
    }

    const data = await updatePlant(req.params.id, updateData);
    res.json({
      message: "Tanaman berhasil diperbarui",
      data: data,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


export const remove = async (req, res) => {
  try {
    await deletePlant(req.params.id);
    res.json({
      message: "Tanaman berhasil dihapus",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
