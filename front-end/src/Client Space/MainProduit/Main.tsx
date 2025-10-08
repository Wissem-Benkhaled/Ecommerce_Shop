import Box from '@mui/material/Box';
import ProductCards from './ProduitCarts/ProduitCarts';
import '../../styles/main.css'

export type MainProduitProps={
    tabPanier: any[]
    setTabPanier: React.Dispatch<React.SetStateAction<any[]>>
}
export default function MainProduit({tabPanier,setTabPanier}:MainProduitProps) {
  return (
    <Box className='main' component="main" sx={{
      background: 'linear-gradient(to bottom right, #f0f4f8, #e0f2f1)',
      flexGrow: 1,
      mt: "-100px",
      maxWidth: '80%',
      minHeight: '50%',
      ml: '2%',
      height: '600px',
      overflowY: 'auto',
      borderRadius: '10px', // optionnel pour un effet plus doux
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' // optionnel, léger relief
    }}
    >
      <h2 style={{
        width: '12%',
        margin: '30px 0 -40px 30px',
        fontSize: '24px',
        fontWeight: '600',
        color: '#555555ff',
        letterSpacing: '0.5px',
        fontFamily: 'Arial, sans-serif',
        borderBottom: '5px solid #1976d2',
      }}>All Produits</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gridTemplateRows: ' repeat(5, 1fr)',
          gap: '5px',
        }}
      >
        <div
          style={{
            marginTop: '50px',
            gridColumn: 'span 8',
            gridRow: 'span 60',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '8px',
          }}
        >
          <ProductCards tabPanier={tabPanier} setTabPanier={setTabPanier}/>

        </div>
      </div>
    </Box>
  );
}
