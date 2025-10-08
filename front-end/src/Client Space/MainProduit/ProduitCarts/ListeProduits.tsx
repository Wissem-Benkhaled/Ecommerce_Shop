// ✅ useListeProduits.ts
import { useEffect, useState } from 'react';

export interface ProduitData {
  id: number;
  titre: string;
  description: string;
  categorie: string;
  image_url: string;
  prix_old: number;
  prix_new: number;
  stock: number;
  nombre_avis: number;
}

export function ListeProduits() {
  const [rows, setRows] = useState<ProduitData[]>([]);

  useEffect(() => {
    const fetchProduits = async () => {
      try {
        const response = await fetch('http://localhost:8085/produits');
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((produit: any) => ({
            id: produit.id,
            titre: produit.titre,
            description: produit.description,
            categorie: produit.categorie,
            image_url: produit.image_url,
            prix_old: produit.prix_old,
            prix_new: produit.prix_new,
            stock: produit.stock,
            nombre_avis: produit.nombre_avis,
          }));
          setRows(formatted);
        } else if (data.message === 'La table est vide') {
          setRows([]);
        }
      } catch (error) {
        console.error('Erreur lors du fetch :', error);
      }
    };

    fetchProduits();
  }, []);

  return rows;
}
