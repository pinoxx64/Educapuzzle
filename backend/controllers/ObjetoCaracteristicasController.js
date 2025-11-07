import { ObjetoCaracteristicasConnection } from "../database/ObjetoCaracteristicasConnection.js";

const conn = new ObjetoCaracteristicasConnection();

const ObjetoCaracteristicasController = {
  funGetPorObjeto: (req, res) => {
    conn.getObjetoCaracteristicaPorObjeto(req.params.idObjeto)
      .then(relaciones => {
        res.status(200).json({
          status: 200,
          message: "Relaciones obtenidas correctamente",
          relaciones
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funGetPorCaracteristica: (req, res) => {
    conn.getObjetoCaracteristicaPorCaracteristica(req.params.idCaracteristica)
      .then(relaciones => {
        res.status(200).json({
          status: 200,
          message: "Relaciones obtenidas correctamente",
          relaciones
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funGetRelacion: (req, res) => {
    conn.getObjetoCaracteristicaPorObjetoYCaracteristica(req.params.idObjeto, req.params.idCaracteristica)
      .then(relacion => {
        res.status(200).json({
          status: 200,
          message: "Relación obtenida correctamente",
          relacion
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funPostRelacion: (req, res) => {
    conn.postObjetoCaracteristica(req.body)
      .then(relacion => {
        res.status(200).json({
          status: 200,
          message: "Relación creada correctamente",
          relacion
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funDeleteRelacion: (req, res) => {
    conn.deleteObjetoCaracteristica(req.params.idObjeto, req.params.idCaracteristica)
      .then(result => {
        res.status(200).json({
          status: 200,
          message: "Relación eliminada correctamente",
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

export default ObjetoCaracteristicasController;