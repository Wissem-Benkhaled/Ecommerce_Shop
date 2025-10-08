import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();
//insert table commande =>returnig id
//boucle liste produit => insert table detail_commande
router.get("/:email/:password", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.params;
    const result = await pool.query("SELECT * FROM client where email=$1 and password=$2 order by id asc", [email, password]);
    if (result.rowCount === 0) {
      return res.status(200).json({ message: "La table est vide" });
    }
    return res.json(result.rows[0]);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});
// 📌 Récupérer tous les clients

router.get("", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM client order by id asc");
    if (result.rowCount === 0) {
      return res.status(200).json({ message: "La table est vide" });
    }
    res.json(result.rows);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Insérer un client
router.post("", async (req: Request, res: Response) => {
  try {
    const { nom, email, password ,tel} = req.body;
    const existing = await pool.query("SELECT id FROM client WHERE email = $1", [email]);
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    const insert_data = await pool.query(
      "INSERT INTO client (nom, email, password,tel) VALUES ($1, $2, $3,$4) RETURNING *",
      [nom, email, password,tel]
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

// 📌 Supprimer un client
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM client WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json({ message: "Client deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Mettre à jour un client
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nom, email, password,tel } = req.body;

    const result = await pool.query(
      "UPDATE client SET nom = $1, email = $2, password = $3,tel=$4 WHERE id = $5 RETURNING *",
      [nom, email, password,tel, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Client not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
