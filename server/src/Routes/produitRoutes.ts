import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// 📌 Récupérer tous les articles
router.get("", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM produits order by id asc");
    if (result.rowCount === 0) {
      return res.status(200).json({ message: "La table est vide" });
    }
    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Insérer un produit
router.post("", async (req: Request, res: Response) => {
  try {

    const { titre, description, categorie, image_url, prix_old, prix_new, stock, nombre_avis } = req.body;
    const existing = await pool.query("SELECT id FROM produits WHERE titre = $1", [titre]);
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: "cette produit est déjà stocker" });
    }

    const insert_data = await pool.query(
      "INSERT INTO produits (titre, description, categorie, image_url, prix_old, prix_new, stock, nombre_avis) VALUES ($1, $2, $3,$4,$5,$6,$7,$8) RETURNING *",
      [titre, description, categorie, image_url, prix_old, prix_new, stock, nombre_avis]
    );

    if (insert_data.rowCount === 0) {
      return res.status(400).json({ error: "Insertion failed" });
    }

    res.status(201).json(insert_data.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Supprimer un produit
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM produits WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "produit not found" });
    }

    res.status(200).json({ message: "produit deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Mettre à jour un produit
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { titre, description, categorie, image_url, prix_old, prix_new, stock, nombre_avis } = req.body;
    console.log("Body reçu:", req.body);

    const result = await pool.query(
      "UPDATE produits SET titre=$1 ,description=$2, categorie=$3, image_url=$4, prix_old=$5, prix_new=$6, stock=$7, nombre_avis=$8 WHERE id = $9 returning *",
      [titre, description, categorie, image_url, prix_old, prix_new, stock, nombre_avis, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "produit not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
