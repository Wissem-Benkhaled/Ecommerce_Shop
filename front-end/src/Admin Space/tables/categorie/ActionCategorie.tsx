import { useState } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';

interface AddCategorysProps {
  isOpen: boolean;
  toggle: () => void;
  isModifier: boolean;
  categorys: any;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
}

const ActionCategorys = ({ isOpen, toggle, isModifier, categorys, setIsUpdate, isUpdate }: AddCategorysProps) => {
  const [id, setId] = useState(isModifier ? categorys.id : '');
  const [name, setName] = useState(isModifier ? categorys.name : '');

  const addOrModifyCategorys = async () => {
    try {
        // ➕ Création
      const body = { name };

      if (!isModifier) {
        const response = await fetch("http://localhost:8085/categorys", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        if (!response.ok) {
          alert(result.error || "Erreur lors de la création du Categorys");
          return;
        }        
      } else {
        // ✏️ Modification

        const response = await fetch(`http://localhost:8085/categorys/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const result = await response.json();
        if (!response.ok) {
          alert(result.error || "Erreur lors de la modification du Categorys");
          return;
        }
      }
      setIsUpdate(!isUpdate);
      toggle();
    } catch (error: any) {
      console.error(error.message);
      alert("❌ Erreur de communication avec le serveur");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isModifier ? "Modifier" : "Ajouter"} categorys
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="titre">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={addOrModifyCategorys}>
          {isModifier ? "Modifier" : "Ajouter"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActionCategorys;
