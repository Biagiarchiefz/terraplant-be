import { prisma } from "../config/prismaConfig.js";
import { generateUniqueSlug } from "../utils/slug.js";

export const getAllPlants = async () => {
  return await prisma.plant.findMany();
};

export const getPlantById = async (id) => {
  return await prisma.plant.findUnique({
    where: { id },
  });
};

export const createPlant = async (data) => {
  const { nama, harga, deskripsi, kategori, stok, gambar } = data;
  const slug = await generateUniqueSlug(nama);

  return await prisma.plant.create({
    data: {
      nama: nama,
      slug: slug,
      harga: parseInt(harga),
      deskripsi: deskripsi,
      kategori: kategori,
      stok: parseInt(stok),
      gambar: Array.isArray(gambar) ? gambar : [],
    },
  });
};

export const updatePlant = async (id, data) => {
  const { nama, harga, deskripsi, kategori, stok, rating, gambar } = data;
  const slug = await generateUniqueSlug(nama);
  return await prisma.plant.update({
    where: { id },
    data: {
      nama: nama,
      slug: slug,
      harga: parseInt(harga),
      deskripsi: deskripsi,
      kategori: kategori,
      stok: parseInt(stok),
      gambar: Array.isArray(gambar) ? gambar : [],
    },
  });
};

export const deletePlant = async (id) => {
  return await prisma.plant.delete({
    where: { id },
  });
};
