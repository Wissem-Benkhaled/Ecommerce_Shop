import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Box,
  Divider,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import RecapCommande from "./PanierPayement";
import { useEffect, useState } from "react";
import PanierItems from "./PanierItem";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';


type PanierProps = {
  open: boolean;
  onClose: () => void;
  tabPanier: any[];
  setTabPanier: React.Dispatch<React.SetStateAction<any[]>>;
}

export function Panier({ open, onClose, tabPanier, setTabPanier }: PanierProps) {
  console.log("tabPanier",tabPanier)
  const [subtotal, setSubtotal] = useState(0);
  const [articlesCount, setArticlesCount] = useState(0);
  const [deliveryCost, setDeliveryCost] = useState(0);


  useEffect(() => {
    const total = tabPanier.reduce(
      (acc, item) => acc + item.prix_new * item.quantity,
      0
    );
    setSubtotal(total);
    setArticlesCount(tabPanier.length);
    if (articlesCount > 0) {
      setDeliveryCost(subtotal > 200 || articlesCount > 5 ? 0 : 10);
    } else {
      setDeliveryCost(0);
    }
  }, [tabPanier]);

  const handelClick = () => {
    setTabPanier([])
  }
  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 450, p: 4 }} role="presentation">
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box display={"flex"}>
            <ShoppingCartOutlinedIcon sx={{ fontSize: 40, color: 'text.disabled' }} />

            <Typography variant="h6" sx={{color: 'text.disabled'}}>Panier</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {tabPanier.length > 0 && <Button
              sx={{
                display: "flex",
                alignItems: "flex-end",
                marginRight: "5px",
                color: "gray !important",
                fontSize: "0.8rem",
                textTransform: "none",
                "& svg": {
                  marginRight: "4px",
                },
              }}
              onClick={handelClick}
            >
              <DeleteOutlinedIcon />
              <Typography
                sx={{
                  fontSize: "0.9rem",
                  color: "inherit",
                }}
              >
                Effacer Tous
              </Typography>
            </Button>}

            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
        <Divider />
        <Box sx={{
          overflowY: 'auto',
          overflowX: 'hidden',
          height: '225px',
        }}>
          <PanierItems tabPanier={tabPanier} setTabPanier={setTabPanier} />
        </Box>
        <Divider />

        <Box sx={{ height: '100%', display: "flex", justifyContent: "center", alignItems: "center" }}>
          <RecapCommande articlesCount={articlesCount} subtotal={subtotal} deliveryCost={deliveryCost} />

        </Box>

      </Box>
    </Drawer>
  );
}
