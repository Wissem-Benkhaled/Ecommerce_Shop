import { Box, IconButton } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";

import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

type ConfirmationOfSupprissionProps = {
  toggle?: () => void;
  modal?: boolean;
  deleteFunction: () => void;
}

export default function ConfirmationOfSupprission({toggle,modal, deleteFunction }: ConfirmationOfSupprissionProps) {
    
  return (
    <Box>
      {/* Bouton pour ouvrir la modal */}
      <IconButton
        color="error"
      >
        <DeleteIcon onClick={toggle} />
      </IconButton>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Confirmation</ModalHeader>
        <ModalBody>
          Est-ce que tu veux vraiment supprimer ce client ?
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteFunction}>
            Supprimer
          </Button>
          <Button color="secondary" onClick={toggle}>
            Annuler
          </Button>
        </ModalFooter>
      </Modal>
    </Box>
  );
}
