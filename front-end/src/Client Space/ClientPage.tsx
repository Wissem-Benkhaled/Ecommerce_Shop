import { Dispatch, SetStateAction, useState } from 'react';
import DrawerListe from './DrawerListe/DrawerListe';
import Headerbar from './headerbar/Headerbar'
import MainProduit from './MainProduit/Main';

export default function ClientPage() {
  const [tabPanier,setTabPanier]=useState<any[]>([])
  return (
    <>
 
      {/* <CssBaseline />*/}
      <Headerbar tabPanier={tabPanier} setTabPanier={setTabPanier} />
      <div className='SectionContaint' style={{
        marginTop: '7%',
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        <DrawerListe />
        <MainProduit  tabPanier={tabPanier} setTabPanier={setTabPanier}/>
      </div >
    </>

  );
}
