import { useState } from 'react';
import ConfirmationOfSupprission from '../ConfirmationOfSupprission/ConfirmationOfSupprission';

interface SupprimerClientProps {
    id: number;
    setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
    isUpdate: boolean
}

function SupprimerClient({ id, setIsUpdate, isUpdate }: SupprimerClientProps) {
    const [modal, setModal] = useState(false);

    const toggle = () => setModal(!modal);

    const deleteClient = async () => {
        try {
            const response = await fetch(`http://localhost:8085/client/${id}`, {
                method: "DELETE",
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || "Erreur lors de la suppression du client");
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
        <ConfirmationOfSupprission modal={modal} toggle={toggle} deleteFunction={deleteClient} />
    );
}

export default SupprimerClient;
