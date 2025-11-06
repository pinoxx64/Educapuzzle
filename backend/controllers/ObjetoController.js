import { ObjetoConnection } from "../database/ObjetoConnection.js";

const conn = new ObjetoConnection();

const ObjetoController = {
  funGetObjetos: (req, res) => {
    conn.getObjetos()
      .then(objetos => {
        res.status(200).json({
          status: 200,
          message: "Objetos obtenidos correctamente",
          objetos
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funGetObjeto: (req, res) => {
    conn.getObjeto(req.params.id)
      .then(objeto => {
        res.status(200).json({
          status: 200,
          message: "Objeto obtenido correctamente",
          objeto
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funGetObjetoPorIdCategoria: (req, res) => {
    conn.getObjetosPorCategoria(req.params.idCategoria)
      .then(objeto => {
        res.status(200).json({
          status: 200,
          message: "Objeto obtenido correctamente",
          objeto
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funPostObjeto: (req, res) => {
    conn.postObjeto(req.body)
      .then(objeto => {
        res.status(200).json({
          status: 200,
          message: "Objeto creado correctamente",
          objeto
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funPutObjeto: (req, res) => {
    conn.putObjeto(req.params.id, req.body)
      .then(objeto => {
        res.status(200).json({
          status: 200,
          message: "Objeto actualizado correctamente",
          objeto
        })
      })
      .catch(err => {
        res.status(500).json({
          status: 500,
          message: err.message
        })
      })
  },

  funDeleteObjeto: (req, res) => {
    conn.deleteObjeto(req.params.id)
      .then(result => {
        res.status(200).json({
          status: 200,
          message: "Objeto eliminado correctamente",
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

export default ObjetoController;