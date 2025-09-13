import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "ไม่มีโทเคน" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "โทเคนไม่ถูกต้อง" });
  }
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.role === "ADMIN") {
      next();
    } else {
      return res.status(403).json("ไม่มีสิทธิ์ในการดําเนินการ");
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role === "ADMIN") {
      next();
    } else {
      return res.status(403).json("ไม่มีสิทธิ์ในการดําเนินการ");
    }
  });
};
