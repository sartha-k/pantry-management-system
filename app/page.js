'use client';

import { useState, useEffect } from 'react';
import { firestore } from '@/firebase'; // Ensure this is the correct import path
import { Box, Typography, Modal, Stack, TextField, Button, Divider } from '@mui/material';
import { collection, query, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';

export default function Home() {
  const [inventory, setInventory] = useState([]);
  const [open, setOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [itemQuantity, setItemQuantity] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'));
    const docs = await getDocs(snapshot);
    const inventoryList = [];
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data()
      });
    });
    setInventory(inventoryList);
  };

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity } = docSnap.data();
      if (quantity === 1) {
        await deleteDoc(docRef);
      } else {
        await setDoc(docRef, { quantity: quantity - 1 });
      }
    }

    await updateInventory();
  };

  const addItem = async (item, quantity) => {
    const docRef = doc(collection(firestore, 'inventory'), item);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { quantity: currentQuantity } = docSnap.data();
      await setDoc(docRef, { quantity: currentQuantity + Number(quantity) });
    } else {
      await setDoc(docRef, { quantity: Number(quantity) });
    }

    await updateInventory();
  };

  useEffect(() => {
    updateInventory();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setItemName('');
    setItemQuantity('');
    setOpen(false);
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      gap={2}
      bgcolor="#fff5e6" // Light orange background
      p={2}
    >
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{ transform: 'translate(-50%, -50%)', borderRadius: '8px' }}
          width={400}
          bgcolor="#fff"
          border="2px solid #ff5722" // Orange border
          boxShadow={24}
          p={4}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <Typography variant="h6" color="#ff5722">Add Item</Typography>
          <Stack width="100%" direction="column" spacing={2}>
            <TextField
              variant="outlined"
              fullWidth
              label="Item Name"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <TextField
              variant="outlined"
              fullWidth
              label="Quantity"
              type="number"
              value={itemQuantity}
              onChange={(e) => setItemQuantity(e.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                addItem(itemName, itemQuantity);
                handleClose();
              }}
              sx={{ bgcolor: '#ff5722', '&:hover': { bgcolor: '#e64a19' } }} // Orange button
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>

      <Typography variant="h4" color="#ff5722" mb={2}>Pantry Management System</Typography>

      <TextField
        variant="outlined"
        placeholder="Search Items"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, width: '300px', bgcolor: '#fff', borderColor: '#ff5722' }} // Search field
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={{ mb: 2, bgcolor: '#ff5722', '&:hover': { bgcolor: '#e64a19' } }} // Orange button
      >
        Add New Item
      </Button>

      <Box border="1px solid #ff5722" borderRadius="8px" overflow="hidden">
        <Box
          width="100%"
          height="100px"
          bgcolor="#ff5722" // Orange background
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="8px"
          mb={2}
        >
          <Typography variant="h2" color="#fff" textAlign="center">
            Inventory Items
          </Typography>
        </Box>

        <Stack width="100%" height="300px" spacing={2} overflow="auto" p={2}>
          {filteredInventory.map(({ name, quantity }) => (
            <Box
              key={name}
              width="100%"
              minHeight="150px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="#ffe0b2" // Light orange
              padding={2}
              borderRadius="8px"
              boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
              sx={{ transition: 'background-color 0.3s', '&:hover': { bgcolor: '#ffcc80' } }}
            >
              <Typography variant="h6" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h6" color="#333" textAlign="center">
                {quantity}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => addItem(name, 1)}
                  sx={{ bgcolor: '#4caf50', '&:hover': { bgcolor: '#388e3c' } }}
                >
                  Add
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => removeItem(name)}
                  sx={{ bgcolor: '#f44336', '&:hover': { bgcolor: '#c62828' } }}
                >
                  Remove
                </Button>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
