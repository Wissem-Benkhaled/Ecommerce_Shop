import {
  Box, Typography, IconButton, ButtonGroup, Button,
  Alert, Snackbar, SnackbarCloseReason
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
export type PanierItemsProps = {
  tabPanier: any[];
  setTabPanier: Dispatch<SetStateAction<any[]>>;

}
export default function PanierItems({ tabPanier, setTabPanier }: PanierItemsProps) {
  const [open, setOpen] = useState(false);
  const handleClick = (id: number) => {
    setTabPanier((prev) =>
      prev.map((item) =>
        item.id === id
          ? item.quantity < 15
            ? { ...item, quantity: item.quantity + 1 }
            : item
          : item
      )
    );
    const updatedItem = tabPanier.find((item) => item.id === id);
    if (updatedItem && updatedItem.quantity >= 15) {
      setOpen(true);
    }

  };

  const handleRemove = (id: number) => {
    setTabPanier((prev) =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0) // Supprimer si quantity < 1
    );

  };

  const handleClose = (
    event?: SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  const deleteItem = (id: number) => {
    setTabPanier((prev) => prev.filter((item) => item.id !== id));
  };


  return tabPanier.length < 1 ? (
    <Typography
      variant="h6"
      align="center"
      color="text.secondary"
      sx={{ mt: 10 }}
    >
      Le panier est vide
    </Typography>
  )
    : (
      <>
        {tabPanier.map((item) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
              borderBottom: "1px solid #e0e0e0",

            }}
          >
            <Box
              sx={{
                position: "relative",
                width: 80,
                height: 80,
                backgroundColor: "#ccc",
                borderRadius: 2,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mr: 2,
              }}
            >
              <img
                src={item.image_url}
                alt={item.titre}
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
              <IconButton
                onClick={() => deleteItem(item.id)}
                size="small"
                sx={{
                  position: "absolute",
                  top: '5%',
                  right: '5%',
                  width: 20,
                  height: 20,
                }}
              >
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Box>

            {/* Détails du produit */}
            <Box sx={{ flexGrow: 1 }}>
              <Typography fontWeight="bold" fontSize="0.9rem">
                {item.titre}
              </Typography>
              <ButtonGroup
                variant="outlined"
                size="small"
                sx={{
                  mt: 1,
                  overflow: "hidden",
                  "& .MuiButton-root": {
                    minWidth: 36,
                    padding: "4px 8px",
                  },
                }}
              >
                <Button onClick={() => handleRemove(item.id)}>
                  <RemoveIcon fontSize="small" />
                </Button>

                <Button disabled sx={{ cursor: "default" }}>
                  {item.quantity}
                </Button>
                <Button onClick={() => handleClick(item.id)}>
                  <AddIcon fontSize="small" />
                </Button>
              </ButtonGroup>
            </Box>

            {/* Prix */}
            <Box >
              <Typography fontWeight="bold" fontSize="1rem" sx={{ mb: '70%', ml: 2 }}>
                {item.prix_new * item.quantity} DT
              </Typography>
            </Box>
          </Box>
        ))}

        {/* Snackbar pour alerte */}
        <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="error"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Maximum quantity reached
          </Alert>
        </Snackbar>
      </>
    );
}
