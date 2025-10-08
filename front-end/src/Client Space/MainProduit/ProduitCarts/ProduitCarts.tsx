import { forwardRef, SyntheticEvent, useState } from "react";
import "./ProductCard.css";
import { ListeProduits } from "./ListeProduits";
import { Snackbar, SnackbarCloseReason } from "@mui/material";
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export type ProductCardsProps = {
  tabPanier: any[]
  setTabPanier: React.Dispatch<React.SetStateAction<any[]>>
}
function ProductCards({ tabPanier, setTabPanier }: ProductCardsProps) {
  const listeProduits = ListeProduits();
  const [open, setOpen] = useState(false);

  const handleClick = (produit: any) => {
    if (!tabPanier.some(item => item.id === produit.id)) {
      setTabPanier([...tabPanier, { ...produit, quantity: 1 }]);
      setOpen(true);
    }
  };

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  return (
    <>
      {listeProduits.map((produit: any) => (
        <div className="card" key={produit.id}>
          <div className="badge">HOT SALE</div>
          <div className="tilt">
            <div className="img">
              <img src={produit.image_url} alt={produit.titre} />
            </div>
          </div>
          <div className="info">
            <div className="cat">{produit.categorie}</div>
            <h2 className="title">{produit.titre}</h2>
            <p className="desc">{produit.description}</p>
            <div className="feats">
              <span className="feat">4K Display</span>
              <span className="feat">16-Hour Battery</span>
              <span className="feat">Thunderbolt 4</span>
            </div>
            <div className="bottom">
              <div className="price">
                <span className="old">${produit.prix_old}</span>
                <span className="new">${produit.prix_new}</span>
              </div>
              <button className="btn" onClick={() => handleClick(produit)} disabled={tabPanier.some(item => item.id === produit.id)}>

                <span>Add to Cart</span>
                <svg
                  className="icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
              </button>
            </div>
            <div className="meta">
              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                    stroke="#FFD700"
                    strokeWidth="0.5"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
                <span className="rcount">{produit.nombre_avis} Reviews</span>
              </div>
              <div className="stock">{produit.stock ? "In Stock" : "Out of Stock"}</div>
            </div>
          </div>
        </div>
      ))}

      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} sx={{ bgcolor: '#07bc0c', width: "100%" }}>
          Panier ajouté !
        </Alert>
      </Snackbar>
    </>
  );
};

export default ProductCards;
