// src/components/ActionClient.tsx
import { useState } from 'react';
import "../../../styles/ActionClient.css"
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

interface AddClientProps {
  isOpen: boolean;
  toggle: () => void;
  isModifier: boolean;
  data: any;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>
  isUpdate: boolean

}

const ActionClient = ({ isOpen, toggle, isModifier, data, setIsUpdate, isUpdate }: AddClientProps) => {
  const [id, setId] = useState(isModifier ? data.id : '');
  const [name, setName] = useState(isModifier ? data.name : '');
  const [email, setEmail] = useState(isModifier ? data.email : '');
  const [tel, setTel] = useState(isModifier ? data.tel : '');
  const [password, setPassword] = useState(isModifier ? data.password : '');
  const [confirme_password, setConfirmePassword] = useState(isModifier ? data.password : '');
  const Add_Modify_client = async () => {
    if (password !== confirme_password) {
      alert("❌ Les mots de passe ne correspondent pas");
      return;
    }

    try {
      if (!isModifier) {
        // ➕ Création
        const body = { nom: name, email, password, tel };
        const response = await fetch("http://localhost:8085/client", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
          if (result.error?.includes("duplicate")) {
            alert("⚠️ Un client avec cet email existe déjà !");
          } else {
            alert(result.error || "Erreur lors de la création du client");
          }
          return;
        }
        setIsUpdate(!isUpdate)
      } else {
        
        // ✏️ Modification
        const body = { nom: name, email, password, tel };
        const response = await fetch(`http://localhost:8085/client/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const result = await response.json();

        if (!response.ok) {
          alert(result.error || "Erreur lors de la modification du client");
          return;
        }
      }
      setIsUpdate(!isUpdate)
      toggle(); 
    } catch (error: any) {
      console.error(error.message);
      alert("❌ Erreur de communication avec le serveur");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>
        {isModifier ? "Modifier" : "Ajouter"} client
      </ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="name">Nom</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="tel">Téléphone</Label>
            <Input
              id="tel"
              type="tel"
              value={tel}
              onChange={(e) => setTel(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirme_password">Confirmation du mot de passe</Label>
            <Input
              id="confirme_password"
              type="password"
              value={confirme_password}
              onChange={(e) => setConfirmePassword(e.target.value)}
              required
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={Add_Modify_client}>
          {isModifier ? "Modifier" : "Ajouter"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActionClient;