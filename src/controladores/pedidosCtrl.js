import { commysql } from "../bd.js";

// Obtener todos los pedidos
export const getPedidos = async (req, res) => {
    try {
        const [result] = await commysql.query("SELECT * FROM pedidos");
        res.json({ cant: result.length, data: result });
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar pedidos"
        });
    }
};

// Obtener pedido por ID
export const getPedidoById = async (req, res) => {
    try {
        const [result] = await commysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [req.params.id]);
        if (result.length <= 0) {
            return res.status(400).json({
                ped_id: 0,
                message: "Pedido no encontrado"
            });
        }
        res.json(result[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Error al consultar pedido"
        });
    }
};

// Insertar nuevo pedido
export const postPedido = async (req, res) => {
    try {
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;

        const [result] = await commysql.query(
            "INSERT INTO pedidos (cli_id, ped_fecha, usr_id, ped_estado) VALUES (?, ?, ?, ?)",
            [cli_id, ped_fecha, usr_id, ped_estado]
        );

        res.json({ id: result.insertId });
    } catch (error) {
        return res.status(500).json({
            message: "Error al insertar pedido"
        });
    }
};

// Actualización completa (PUT)
export const putPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;

        const [result] = await commysql.query(
            "UPDATE pedidos SET cli_id=?, ped_fecha=?, usr_id=?, ped_estado=? WHERE ped_id=?",
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(400).json({
                message: "Pedido no encontrado para actualizar"
            });
        }

        const [row] = await commysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [id]);
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar pedido"
        });
    }
};

// Actualización parcial (PATCH)
export const patchPedido = async (req, res) => {
    try {
        const { id } = req.params;
        const { cli_id, ped_fecha, usr_id, ped_estado } = req.body;

        const [result] = await conmysql.query(
            `UPDATE pedidos SET 
                cli_id = IFNULL(?, cli_id),
                ped_fecha = IFNULL(?, ped_fecha),
                usr_id = IFNULL(?, usr_id),
                ped_estado = IFNULL(?, ped_estado)
            WHERE ped_id = ?`,
            [cli_id, ped_fecha, usr_id, ped_estado, id]
        );

        if (result.affectedRows <= 0) {
            return res.status(400).json({
                message: "Pedido no encontrado para actualizar"
            });
        }

        const [row] = await commysql.query("SELECT * FROM pedidos WHERE ped_id = ?", [id]);
        res.json(row[0]);
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar parcialmente"
        });
    }
};

// Eliminar pedido
export const deletePedidoById = async (req, res) => {
    try {
        const [result] = await commysql.query("DELETE FROM pedidos WHERE ped_id = ?", [req.params.id]);

        if (result.affectedRows === 0) {
            return res.status(400).json({
                message: "Pedido no encontrado"
            });
        }

        res.json({ message: "Pedido eliminado correctamente" });
    } catch (error) {
        return res.status(500).json({
            message: "Error al eliminar pedido"
        });
    }
};
