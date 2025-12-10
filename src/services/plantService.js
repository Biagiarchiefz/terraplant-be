import {prisma} from "../config/prismaConfig.js";

export const getAllPlants = async () => {
  return await prisma.plant.findMany();
};

export const getPlantById = async (id) => {
  return await prisma.plant.findUnique({
    where: { id },
  });
};

export const createPlant = async (data) => {

  const {nama, slug, harga, deskripsi, kategori, stok, gambar} = data;

  return await prisma.plant.create({
    data: {
      nama: nama,
      slug: slug,
      harga: parseInt(harga),
      deskripsi: deskripsi,
      kategori: kategori,
      stok: parseInt(stok),
      // rating: data.rating ? parseFloat(data.rating) : 0,
      gambar: Array.isArray(gambar) ? gambar : [],
    },
  });
};

export const updatePlant = async (id, data) => {
  const {nama, slug, harga, deskripsi, kategori, stok,  rating ,gambar} = data;
  return await prisma.plant.update({
    where: { id },
    data: {
      nama: nama,
      slug: slug,
      harga: parseInt(harga),
      deskripsi: deskripsi,
      kategori: kategori,
      stok: parseInt(stok),
      rating: rating ? parseFloat(rating) : 0,
      gambar: Array.isArray(gambar) ? gambar : [],
    },
  });
};

export const deletePlant = async (id) => {
  return await prisma.plant.delete({
    where: { id },
  });
};
