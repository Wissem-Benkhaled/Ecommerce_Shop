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
import { ListeCategorie } from '../categorie/ListeCategorie';
import { ProduitData } from './ListeProduit';
interface AddProduitProps {
  isOpen: boolean;
  toggle: () => void;
  isModifier: boolean;
  produit: Partial<ProduitData>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
}

const ActionProduit = ({ isOpen, toggle, isModifier, produit, setIsUpdate, isUpdate }: AddProduitProps) => {
  const [id] = useState(isModifier ? produit.id : '');
  const [titre, setTitre] = useState(isModifier ? produit.titre : '');
  const [description, setDescription] = useState(isModifier ? produit.description : '');
  const [categorie, setCategorie] = useState(isModifier ? produit.categorie : '');
  const [image_url, setImageUrl] = useState(isModifier ? produit.image_url : '');
  const [prix_old, setPrixOld] = useState(isModifier ? produit.prix_old : '');
  const [prix_new, setPrixNew] = useState(isModifier ? produit.prix_new : '');
  const [stock, setStock] = useState(isModifier ? produit.stock : false);
  const [nombre_avis, setNombreAvis] = useState(isModifier ? produit.nombre_avis : 0);

  const categories = ListeCategorie(false);

  const addOrModifyProduit = async () => {
    try {
      const body = {
        titre,
        description,
        categorie,
        image_url,
        prix_old,
        prix_new,
        stock,
        nombre_avis,
      };


      const response = await fetch(
        isModifier ? `http://localhost:8085/produits/${id}` : "http://localhost:8085/produits",
        {
          method: isModifier ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();
      console.log("🚀 ~ addOrModifyProduit ~ result:", result)
      if (!response.ok) {
        alert(result.error || "Erreur lors de l'enregistrement du produit");
        return;
      }

      setIsUpdate(!isUpdate);
      toggle();
    } catch (error: any) {
      console.error("Erreur :", error.message);
      alert("❌ Erreur de communication avec le serveur");
    }
  };

  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg" className="custom-modal">
      <ModalHeader toggle={toggle} className="border-0 pb-2">
        <h5 className="mb-0">{isModifier ? "Modifier" : "Ajouter"} un produit</h5>
      </ModalHeader>

      <ModalBody className="pt-0">
        <Form>
          <FormGroup className="mb-3">
            <Label for="titre">Titre</Label>
            <Input id="titre" type="text" value={titre} onChange={(e) => setTitre(e.target.value)} required />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="description">Description</Label>
            <Input id="description" type="textarea" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="categorie">Catégorie</Label>
            <Input
              type="select"
              id="categorie"
              value={categorie}
              onChange={(e) => setCategorie(e.target.value)}
              required
            >
              <option value="">Choisir une catégorie</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Input>
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="image_url">Image (URL)</Label>
            <Input id="image_url" type="text" value={image_url} onChange={(e) => setImageUrl(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="prix_old">Prix Ancien (€)</Label>
            <Input id="prix_old" type="number" value={prix_old} onChange={(e) => setPrixOld(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="prix_new">Prix Actuel (€)</Label>
            <Input id="prix_new" type="number" value={prix_new} onChange={(e) => setPrixNew(e.target.value)} />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="stock">En Stock</Label>
            <Input
              id="stock"
              type="checkbox"
              checked={stock}
              onChange={(e) => setStock(e.target.checked)}
            />
          </FormGroup>

          <FormGroup className="mb-3">
            <Label for="nombre_avis">Nombre d'avis</Label>
            <Input id="nombre_avis" type="number" value={nombre_avis} onChange={(e) => setNombreAvis(Number(e.target.value))} />
          </FormGroup>
        </Form>
      </ModalBody>

      <ModalFooter className="border-0 pt-0">
        <Button color="primary" onClick={addOrModifyProduit}>
          {isModifier ? "Modifier" : "Ajouter"}
        </Button>
        <Button color="secondary" onClick={toggle}>
          Annuler
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ActionProduit;
