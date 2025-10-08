import express, {
  Application
  // , Request, Response 
} from "express";
import { pool } from "./db";
import clientRoutes from "./Routes/clientRoutes";
import produitRoutes from "./Routes/produitRoutes";
import categorysRoutes from "./Routes/categorysRoutes";
import itemsRoutes from "./Routes/itemsRoutes";
import commandeRoutes from "./Routes/commandeRoutes";

const cors = require("cors");
const path = require("path");
// const multer = require("multer");

// Test connexion DB
pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL"))
  .catch((err: any) => console.error("❌ PostgreSQL connection error:", err));

const app: Application = express();
app.use("/", express.static(path.join("images")));
app.use(express.json());
app.use(cors());

// Routes
// Route pour le client
app.use("/client", clientRoutes);
app.use("/produits", produitRoutes);
app.use("/categorys", categorysRoutes);
app.use("/items", itemsRoutes);
app.use("/commande", commandeRoutes);


// Route pour Upload les images

// const imageUpload = multer({
//   storage: multer.diskStorage({
//     destination: function (req:any, file:any, cb:any) {
//       cb(null, "images/");
//     },
//     filename: function (req:any, file:any, cb:any) {
//       cb(null, file.originalname);
//     },
//   }),
// });
// app.post(
//   `/uploadImage`,
//   imageUpload.array("imgCollection"),
//   function (req:any, res:any) {
//     const { originalname } = req.files[0];
//     console.log(originalname);
//     return res.status(200).json("http://localhost:8085/" + originalname);
//   }
// );

// ✅ Lancer serveur
const PORT = 8085;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
