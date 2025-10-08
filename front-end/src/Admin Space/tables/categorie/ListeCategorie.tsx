// src/pages/ListeCategorie.ts
import { useEffect, useState } from 'react';

export interface ProduitData {
  id: number;
  name: string;

}

export function createData(
  id: number,
  name: string

): ProduitData {
  return { id, name };
}

// ✅ Hook React pour charger les produits
export function ListeCategorie(isUpdate: boolean) {
  const [rows, setRows] = useState<ProduitData[]>([]);

  useEffect(() => {
    const fetchCategorie = async () => {
      try {
        const response = await fetch("http://localhost:8085/categorys");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((categorie: any) =>
            createData(
              categorie.id,
              categorie.name,
            )
          );
          setRows(formatted);
        } else if (data.message === "La table est vide") {
          setRows([]);
        }
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchCategorie();
  }, [isUpdate]);

  return rows;
}
