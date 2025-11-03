import { Objeto, Caracteristica, ObjetoCaracteristicas } from "../models/association.js";
import { Op, where } from 'sequelize'

class ObjetoCaracteristicasConnection {
    getObjetoCaracteristicaPorObjeto = async(idObjeto) => {
        const relaciones = await ObjetoCaracteristicas.findAll({
            where: { idObjetos: idObjeto }
        });

        if (!relaciones || relaciones.length === 0) return [];

        return relaciones.map(r => ({
            id: r.id,
            idCaracteristica: r.idCaracteristica,
            idObjetos: r.idObjetos
        }));
    }

    getObjetoCaracteristicaPorCaracteristica = async(idCaracteristica) => {
        const relaciones = await ObjetoCaracteristicas.findAll({
            where: { idCaracteristica }
        });

        if (!relaciones || relaciones.length === 0) return [];

        return relaciones.map(r => ({
            id: r.id,
            idCaracteristica: r.idCaracteristica,
            idObjetos: r.idObjetos
        }));
    }

    getObjetoCaracteristicaPorObjetoYCaracteristica = async(idObjeto, idCaracteristica) => {
        const relacion = await ObjetoCaracteristicas.findOne({
            where: { idObjetos: idObjeto, idCaracteristica }
        });

        if (!relacion) return null;

        return {
            id: relacion.id,
            idCaracteristica: relacion.idCaracteristica,
            idObjetos: relacion.idObjetos
        };
    }

    postObjetoCaracteristica = async(objetoCaracteristica) => {
        const { idObjetos, idCaracteristica } = objetoCaracteristica;

        // evitar duplicados
        const existente = await ObjetoCaracteristicas.findOne({
            where: { idObjetos, idCaracteristica }
        });
        if (existente) throw new Error('La relación ya existe');

        const nueva = await ObjetoCaracteristicas.create({
            idObjetos,
            idCaracteristica
        });

        if (!nueva) throw new Error('No se pudo crear la relación');

        return {
            id: nueva.id,
            idCaracteristica: nueva.idCaracteristica,
            idObjetos: nueva.idObjetos
        };
    }

    deleteObjetoCaracteristica = async(idObjeto, idCaracteristica) => {
        const eliminado = await ObjetoCaracteristicas.destroy({
            where: { idObjetos: idObjeto, idCaracteristica }
        });

        if (!eliminado) throw new Error('No se pudo eliminar la relación');

        return 'Relación eliminada correctamente';
    }
}

export { ObjetoCaracteristicasConnection }