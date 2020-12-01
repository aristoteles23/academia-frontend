import baseApi from './baseApi'
import { ESTUDIANTES_API } from '../core/appConstants'

const getEstudianteUrl = (id) => `${ESTUDIANTES_API}/${id}`

class EstudianteService {
  static fetchEstudiantes = () => baseApi.get(ESTUDIANTES_API)

  static fetchEstudiante = async (id) => baseApi.get(getEstudianteUrl(id))

  static addEstudiante = async (estudiante) => baseApi.post(ESTUDIANTES_API, estudiante)

  static updateEstudiante = async (estudiante) => baseApi.put(getEstudianteUrl(estudiante.id), estudiante)

  static deleteEstudiante = async (id) => baseApi.delete(getEstudianteUrl(id))
}

export default EstudianteService;
