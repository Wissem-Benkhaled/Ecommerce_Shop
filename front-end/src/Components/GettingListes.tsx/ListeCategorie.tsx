// src/pages/ListeCategorie.tsx
import { useEffect, useState } from 'react';

// Interfaces
export interface CategorieData {
  id: number;
  name: string;
  icon: string;
}
export function createCategorieData(
  id: number,
  name: string,
  icon: string
): CategorieData {
  return { id, name, icon };
}

export interface ItemData {
  id: number;
  name: string;
  image: string;
  category_id: number;
}

export function createItemData(
  id: number,
  name: string,
  image: string,
  category_id: number
): ItemData {
  return { id, name, image, category_id };
}

export interface Data {
  category: CategorieData;
  items: ItemData[];
}

export function ListeCategorie(isUpdate: boolean) {
  const [categories, setCategories] = useState<CategorieData[]>([]);
  const [items, setItems] = useState<ItemData[]>([]);
  const [rows, setRows] = useState<Data[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:8085/categorys");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((cat: any) =>
            createCategorieData(cat.id, cat.name, cat.icon)
          );
          setCategories(formatted);
        } else if (data.message === "La table est vide") {
          setCategories([]);
        }
      } catch (error) {
        console.error("Erreur lors du fetch des catégories :", error);
      }
    };

    const fetchItems = async () => {
      try {
        const response = await fetch("http://localhost:8085/items");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((item: any) =>
            createItemData(item.id, item.name, item.image, item.category_id)
          );
          setItems(formatted);
        } else if (data.message === "La table est vide") {
          setItems([]);
        }
      } catch (error) {
        console.error("Erreur lors du fetch des items :", error);
      }
    };

    fetchCategories();
    fetchItems();
  }, [isUpdate]);

  // Met à jour rows quand categories ou items changent
  useEffect(() => {
    if (categories.length && items.length) {
      const combined: Data[] = categories.map((cat) => ({
        category: cat,
        items: items.filter((item) => item.category_id === cat.id),
      }));
      setRows(combined);
    } else {
      setRows([]);
    }
  }, [categories, items]);

  return rows;
}

