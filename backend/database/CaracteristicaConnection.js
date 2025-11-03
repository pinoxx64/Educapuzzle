import { Caracteristica, Categoria } from '../models/association.js';

class CaracteristicaConnection {
  getCaracteristicas = async () => {
    const caracteristicas = await Caracteristica.findAll({
      include: [{
        model: Categoria,
        as: 'categoria'
      }]
    });

    if (!caracteristicas) throw new Error('No hay caracteristicas');

    return caracteristicas.map(c => ({
      id: c.id,
      nombre: c.nombre,
      idCategoria: c.idCategoria
    }));
  }

  getCaracteristica = async (id) => {
    const caracteristica = await Caracteristica.findOne({
      where: { id },
      include: [{
        model: Categoria,
        as: 'categoria'
      }]
    });

    if (!caracteristica) throw new Error('No existe la caracteristica');

    return {
      id: caracteristica.id,
      nombre: caracteristica.nombre,
      idCategoria: caracteristica.idCategoria
    };
  }

  postCaracteristica = async (caracteristica) => {
    const { nombre, idCategoria } = caracteristica;

    const nueva = await Caracteristica.create({
      nombre,
      idCategoria
    });

    if (!nueva) throw new Error('No se pudo crear la caracteristica');

    return {
      id: nueva.id,
      nombre: nueva.nombre,
      idCategoria: nueva.idCategoria
    };
  }

  putCaracteristica = async (id, caracteristica) => {
    await Caracteristica.update({
      nombre: caracteristica.nombre,
      idCategoria: caracteristica.idCategoria
    }, {
      where: { id }
    });

    const actualizada = await Caracteristica.findOne({ where: { id } });
    if (!actualizada) throw new Error('No se pudo actualizar la caracteristica');

    return {
      id: actualizada.id,
      nombre: actualizada.nombre,
      idCategoria: actualizada.idCategoria
    };
  }

  deleteCaracteristica = async (id) => {
    const eliminada = await Caracteristica.destroy({ where: { id } });
    if (!eliminada) throw new Error('No se pudo eliminar la caracteristica');

    return 'Caracteristica eliminada correctamente';
  }
}

export { CaracteristicaConnection }