import { Box, Typography, Button, Divider, Grid } from "@mui/material";
import { FC } from "react";

type RecapProps = {
    articlesCount: number;
    subtotal: number;
    deliveryCost: number;
};
const data={
    conmmande:{
        prix_total:0,
        id_client:1,
        etat:3
    },
    detail_commande:[]
}
const RecapCommande: FC<RecapProps> = ({ articlesCount, subtotal, deliveryCost }) => {
    return (
        <Box
            sx={{
                width: 400,
                height: 310,
                position: 'fixed',     
                bottom: 20,             
                border: '1px solid #ccc',
                borderRadius: 5,
                p: 2,
                backgroundColor: '#fff',
                boxShadow: 3,
                fontFamily: 'Arial, sans-serif',
            }}
        >


            {/* Résumé commande */}
            <Typography sx={{ fontWeight: "bold", mb: 1 }}>
                VOTRE COMMANDE : {articlesCount} ARTICLE{articlesCount > 1 ? "S" : ""}
            </Typography>

            {/* Détails */}
            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">Sous-total</Typography>
                <Typography variant="body2" fontWeight="bold">
                    {subtotal.toFixed(2)} DT
                </Typography>
            </Grid>

            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="body2">
                    Livraison <span style={{ cursor: "pointer" }}>❔</span>
                </Typography>
                <Typography variant="body2" color="green" fontWeight="bold">
                    {deliveryCost === 0 ? "Gratuit" : `${deliveryCost.toFixed(2)} DT`}
                </Typography>
            </Grid>

            <Divider sx={{ my: 1 }} />

            <Grid container justifyContent="space-between">
                <Typography variant="body1" fontWeight="bold">
                    Total (TTC)
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                    {(subtotal + deliveryCost).toFixed(2)} DT
                </Typography>
            </Grid>
            <Divider sx={{ my: 1 }} />

            {/* Bouton finaliser */}
            <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{
                    fontWeight: "bold",
                    mt: 2,
                    mb: 1,
                    textTransform: "uppercase",
                    backgroundColor: "#0072c3"
                }}
            >
                Finaliser ma commande
            </Button>

            {/* Séparateur "OU" */}
            <Typography
                align="center"
                sx={{
                    my: 1,
                    color: "#888",
                    fontSize: "0.85rem"
                }}
            >
                OU
            </Typography>

            {/* PayPal */}
            <Button
                fullWidth
                variant="contained"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    bgcolor: '#fff',
                    py: 0,
                    mb: 2
                }}
            >
                <img
                    src="./images/paypal.png"
                    alt="PayPal"
                    style={{ width: '100px' }}
                />
            </Button>

        </Box>
    );
};

export default RecapCommande;
