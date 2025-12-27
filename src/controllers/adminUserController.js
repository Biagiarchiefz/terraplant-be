import { deleteUserByAdmin, getAllUsersForAdmin, updateUserRoleService } from "../services/adminUserService.js";

export const getAdminUsers = async (req, res) => {
  try {
    const users = await getAllUsersForAdmin();

    res.status(200).json({
      message: "get all user success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const adminId = req.user.id;

    const result = await deleteUserByAdmin(id, adminId);

    return res.status(200).json({
      message: "delete user success",
    });
  } catch (error) {
    res.status(500).json({
      message: "gagal delete user",
    });
  }
};



export const updateUserRoleController = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!role) {
      return res.status(400).json({
        message: "Role is required",
      });
    }

    const updatedUser = await updateUserRoleService(id, role);

    return res.status(200).json({
      success: true,
      message: "role user berhasil diupdate",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message,
    });
  }
};