// src/pages/ListeClients.ts
import { useEffect, useState } from 'react';

export interface ClientData {
  id: number;
  name: string;
  email: string;
  password: string;
  tel: number;
}

export function createData(
  id: number,
  name: string,
  email: string,
  password: string,
  tel: number
): ClientData {
  return { id, name, email, password, tel };
}

// ✅ Hook React pour charger les clients
export function useListeClients(isUpdate:boolean) {
  const [rows, setRows] = useState<ClientData[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch("http://localhost:8085/client");
        const data = await response.json();

        if (Array.isArray(data)) {
          const formatted = data.map((client) =>
            createData(client.id, client.nom, client.email, client.password, client.tel)
        );
          setRows(formatted);
        } else if (data.message === "La table est vide") {
          setRows([]);
        }
      } catch (error) {
        console.error("Erreur lors du fetch :", error);
      }
    };

    fetchClients();
  }, [isUpdate]);

  return rows;
}
