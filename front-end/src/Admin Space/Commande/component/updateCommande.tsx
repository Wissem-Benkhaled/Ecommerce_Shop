const updateCommande = async ( id:number, etat:number) => {

    try {
        // ➕ Création
        const body = { etat };
        // ✏️ Modification
        const response = await fetch(`http://localhost:8085/commande/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        const result = await response.json();
        if (!response.ok) {
            alert(result.error || "Erreur lors de la Action du commande");
            return;
        }
    }
    catch (error: any) {
        console.error(error.message);
        alert("❌ Erreur de communication avec le serveur");
    }
};

export default updateCommande;
