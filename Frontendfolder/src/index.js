import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
import chakraTheme from '@chakra-ui/theme'
import  Context  from './Context/Context';

const { Button, Alert,TableContainer,Table,TableCaption,Thead,Tr,Th,Tbody,Td,Tfoot,Popover, PopoverTrigger, IconButton, FocusLock, PopoverArrow, PopoverCloseButton } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button, Alert,TableContainer,Table,TableCaption,Thead,Tr,Th,Tbody,Td,Tfoot,
    Popover, PopoverTrigger, IconButton, FocusLock, PopoverArrow, PopoverCloseButton
  },
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <Context>
    <ChakraBaseProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraBaseProvider>
    </Context>
  // </React.StrictMode>
);

reportWebVitals();

