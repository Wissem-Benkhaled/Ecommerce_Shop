import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// 📌 Récupérer tous les clients

router.get("", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM categorys order by id asc");
    if (result.rowCount === 0) {
      return res.status(200).json({ message: "La table est vide" });
    }
    res.json(result.rows);
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});


// 📌 Insérer un categorys
router.post("", async (req: Request, res: Response) => {
  try {
    const { name} = req.body;
    const existing = await pool.query("SELECT id FROM categorys WHERE name = $1 ", [name]);
    if (existing.rowCount > 0) {
      return res.status(400).json({ error: "Cette Category est déjà utilisé" });
    }

    const insert_data = await pool.query(
      "INSERT INTO categorys (name) VALUES ($1) RETURNING *",
      [name]
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

// 📌 Supprimer un categorys
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM categorys WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "categorys not found" });
    }

    res.status(200).json({ message: "category deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Mettre à jour un categorys
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const result = await pool.query(
      "UPDATE categorys SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "categorys not found" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;