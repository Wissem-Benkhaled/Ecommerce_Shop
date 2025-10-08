// AdminPage.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Dashboard from '../Dashbord/Dashboard';
import Settings from '../Settings';
import TablesClients from '../tables/clients/tableClients';
import TableProduit from '../tables/produit/TableProduit';
import TableCategorie from '../tables/categorie/TableCategorie';
import AdminContent from './AdminContent';
import Profil from '../Profil';
import Commande from '../Commande/Commande';

const AdminPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminContent />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tableClients" element={<TablesClients />} />
        <Route path="tableProduit" element={<TableProduit />} />
        <Route path="tableCategorie" element={<TableCategorie />} />
        <Route path="commande" element={<Commande />} />
        <Route path="profile" element={<Profil />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AdminPage;
