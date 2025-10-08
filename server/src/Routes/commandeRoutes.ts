import { Router, Request, Response } from "express";
import { pool } from "../db";

const router = Router();

// 📌 Récupérer toutes les commandes
router.get("", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM commande order by id asc");
    if (result.rowCount === 0) {
      return res.status(200).json({ message: "La table est vide" });
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Insérer une commande
router.post("", async (req: Request, res: Response) => {
  try {
    const { prixTotal, idClient, dateCommande, etat } = req.body;

    const clientExist = await pool.query("SELECT id FROM client WHERE id = $1", [idClient]);
    if (clientExist.rowCount === 0) {
      return res.status(400).json({ error: "Client non trouvé" });
    }

    const commandeExist = await pool.query("SELECT id FROM commande WHERE idClient = $1", [idClient]);
    if (commandeExist.rowCount > 0) {
      return res.status(400).json({ error: "Commande existe déjà pour ce client il faut modifier non inserée" });
    }

    const insert_data = await pool.query(
      "INSERT INTO commande (prixTotal, idClient, dateCommande, etat) VALUES ($1, $2, $3, $4) RETURNING *",
      [prixTotal, idClient, dateCommande || new Date(), etat]
    );

    if (insert_data.rowCount === 0) {
      return res.status(400).json({ error: "Insertion échouée" });
    }

    res.status(201).json(insert_data.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Supprimer une commande
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query("DELETE FROM commande WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    res.status(200).json({ message: "Commande supprimée avec succès" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// 📌 Mettre à jour une commande
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { etat } = req.body;

    const result = await pool.query(
      "UPDATE commande SET etat=$1 WHERE id = $2 RETURNING *",
      [etat, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

export default router;
