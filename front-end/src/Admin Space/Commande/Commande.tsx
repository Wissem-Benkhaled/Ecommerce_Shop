import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CircleIcon from '@mui/icons-material/Circle';
import Tooltip from '@mui/material/Tooltip';
import { Listecommande } from './component/listeCommande';
import updateCommande from './component/updateCommande';
import { useState } from 'react';

const borderStyle = {
  // border: '2px solid #ffffffff',
  textAlign: 'center' as const,
  fontWeight: 'bold' as const,
};

export default function Commande() {
  // Composant principal
const [refresh, setRefresh] = useState(0);
const tabCommande = Listecommande(refresh);

const handleUpdate = async (id: number, newEtat: number) => {
  await updateCommande(id, newEtat);
  setRefresh(prev => prev + 1);
};

  const titleState = (status: any) => {
    switch (status) {
      case 1:
        return { title: 'Accepter', color: '#1cdf22ff' };
      case 2:
        return { title: 'Annuler', color: '#ff1717ff' };
      case 3:
        return { title: 'en cours de traitement', color: '#ff8600' };
      default:
        return { title: 'en cours de traitement', color: '#ff8600' };
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, borderCollapse: 'collapse' }} aria-label="commande table">
        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
          <TableRow>
            <TableCell sx={borderStyle}><strong>Nombre de commande</strong></TableCell>
            <TableCell align="right" sx={borderStyle}><strong>Client</strong></TableCell>
            <TableCell align="right" sx={borderStyle}><strong>Date</strong></TableCell>
            <TableCell align="right" sx={borderStyle}><strong>Montant</strong></TableCell>
            <TableCell align="right" sx={borderStyle}><strong>État</strong></TableCell>
            <TableCell align="right" sx={borderStyle}><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          {tabCommande.map((row) => (
            <TableRow key={row.id} >
              <TableCell component="th" scope="row" sx={borderStyle}>
                {(row.id).toString().padStart(4, '0')}
              </TableCell>
              <TableCell align="right" sx={borderStyle}>{row.idclient}</TableCell>
              <TableCell align="right" sx={borderStyle}>{row.datecommande}</TableCell>
              <TableCell align="right" sx={borderStyle}>{row.prixtotal}</TableCell>
              <TableCell align="right" sx={{ borderStyle, color: `${titleState(row.etat).color}` }}><CircleIcon sx={{ color: `${titleState(row.etat).color}`, fontSize: 16 }} />{titleState(row.etat).title}</TableCell>
              <TableCell align="right" sx={borderStyle}>
                <Tooltip
                  title="Détails de la commande"
                  arrow
                  componentsProps={{
                    tooltip: {
                      sx: {
                        backgroundColor: 'white',
                        color: 'black',
                        fontSize: '0.875rem',
                        border: '1px solid #ccc',
                      },
                    },
                    arrow: {
                      sx: {
                        color: '#ccc',
                      },
                    },
                  }}
                >
                  <IconButton aria-label="more">
                    <MoreVertIcon />
                  </IconButton>
                </Tooltip>
                {row.etat === 3 && (
                  <>
                    <IconButton aria-label="accepter" sx={{ color: "#1cdf22ff",borderBottom:'0' }} onClick={() => { handleUpdate(row.id, 1) }} >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton aria-label="refuser" sx={{ color: "#ff1717ff",borderBottom:'0' }} onClick={() => { handleUpdate(row.id, 2) }} >
                      <CancelIcon />
                    </IconButton>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
