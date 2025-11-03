import { CaracteristicaConnection } from "../database/CaracteristicaConnection.js";

const conn = new CaracteristicaConnection();

const CaracteristicaController = {
  funGetCaracteristicas: (req, res) => {
    conn.getCaracteristicas()
      .then(caracteristicas => {
        res.status(200).json({
          status: 200,
          message: "Caracteristicas obtenidas correctamente",
          caracteristicas
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funGetCaracteristica: (req, res) => {
    conn.getCaracteristica(req.params.id)
      .then(caracteristica => {
        res.status(200).json({
          status: 200,
          message: "Caracteristica obtenida correctamente",
          caracteristica
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funPostCaracteristica: (req, res) => {
    conn.postCaracteristica(req.body)
      .then(caracteristica => {
        res.status(200).json({
          status: 200,
          message: "Caracteristica creada correctamente",
          caracteristica
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funPutCaracteristica: (req, res) => {
    conn.putCaracteristica(req.params.id, req.body)
      .then(caracteristica => {
        res.status(200).json({
          status: 200,
          message: "Caracteristica actualizada correctamente",
          caracteristica
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funDeleteCaracteristica: (req, res) => {
    conn.deleteCaracteristica(req.params.id)
      .then(result => {
        res.status(200).json({
          status: 200,
          message: "Caracteristica eliminada correctamente",
          result
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  }
}

export default CaracteristicaController;