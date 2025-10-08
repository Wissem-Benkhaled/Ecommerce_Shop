import { useState } from 'react';
import ConfirmationOfSupprission from '../ConfirmationOfSupprission/ConfirmationOfSupprission';

interface SupprimerProduitProps {
  id: number;
  onDeleted?: () => void; // callback optionnel si tu veux refresh la liste
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
}

function SupprimerProduit({ id, setIsUpdate, isUpdate }: SupprimerProduitProps) {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const deleteProduit = async () => {
    try {
      const response = await fetch(`http://localhost:8085/produits/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Erreur lors de la suppression du produit");
        return;
      }
      setIsUpdate(!isUpdate);
      toggle();
    } catch (error: any) {
      console.error(error.message);
      alert("❌ Erreur de communication avec le serveur");
    }
  };

  return (
    <ConfirmationOfSupprission modal={modal} toggle={toggle} deleteFunction={deleteProduit} />
  );
}

export default SupprimerProduit;
