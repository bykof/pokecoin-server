export const MONGODB_URL =
  process.env.MONGODB_URL || "mongodb://localhost/pokecoin";
export const PORT = parseInt(process.env.PORT) || 3000;
export const JWT_SECRET = process.env.JWT_SECRET || "secret";
export const MIN_POW_DIFFICULTY = parseInt(process.env.MIN_POW_DIFFICULTY) || 2;
export const POW_DIFFICULTY = parseInt(process.env.POW_DIFFICULTY) || 6;
