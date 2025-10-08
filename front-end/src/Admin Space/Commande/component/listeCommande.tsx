// src/pages/ListeCommande.ts
import { useEffect, useState } from 'react';

export type CommandeData ={
    id: number,
    idclient: number,
    datecommande: string,
    prixtotal: number,
    etat: number
}

// ✅ Hook React pour charger les Commandes
export function Listecommande(isUpdate: number) {
    const [rows, setRows] = useState<CommandeData[]>([]);
    useEffect(() => {
        const fetchcommande = async () => {
            try {
                const response = await fetch("http://localhost:8085/commande");
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
        fetchcommande();
    }, [isUpdate]);

    return rows;
}
