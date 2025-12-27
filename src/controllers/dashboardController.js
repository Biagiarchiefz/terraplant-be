import { getTopSellingPlantService } from "../services/dashboardService.js";

export const getTopSellingPlant = async (req, res) => {
  try {
    const data = await getTopSellingPlantService();

    if (!data) {
      return res.status(200).json({
        success: true,
        message: "Belum ada data penjualan",
        data: null,
      });
    }

    res.status(200).json({
      success: true,
      message: "Berhasil mengambil tanaman terlaris",
      data,
    });
  } catch (error) {
    console.error("Top selling plant error:", error);

    res.status(500).json({
      success: false,
      message: "Gagal mengambil tanaman terlaris",
    });
  }
};