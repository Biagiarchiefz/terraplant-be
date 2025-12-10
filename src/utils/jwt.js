import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }  // token valid selama 1 jam
  );

  return token;
};

export const getUserData = (token) => {
  const user = jwt.verify(token, process.env.JWT_SECRET);
  return user;
}

