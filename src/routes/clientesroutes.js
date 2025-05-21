import express from "express";
import { 
deleteClientes, 
getClientes, 
getClientesxid, 
patchClientes, 
postClientes, 
putClientes } from "../controladores/clientesCtrl";

const router = express.Router();

//router.get('/clientes', obtenerClientes)    
router.get('/clientes', getClientes) 
router.get('/clientes/:id', getClientesxid)
router.post('/clientes', postClientes)
router.put('/clientes/:id', putClientes)
router.patch('/clientes/:id', patchClientes)
router.delete('/clientes/:id', deleteClientes)
export default router