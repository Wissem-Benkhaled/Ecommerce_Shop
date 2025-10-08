// src/pages/ListeProduit.ts
import { useEffect, useState } from 'react';

export interface ProduitData {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  image_url: string;
  prix_old: string;
  prix_new: string;
  stock: boolean;
  nombre_avis: number;
}

export function ListeProduit(isUpdate: boolean) {
  const [rows, setRows] = useState<ProduitData[]>([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch("http://localhost:8085/produits");
        const data = await response.json();

        if (Array.isArray(data)) {
          setRows(data); 
        } else if (data.message === "La table est vide") {
          setRows([]);
        }
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchProduits();
  }, [isUpdate]);

  return rows;
}
