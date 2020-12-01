import baseApi from './baseApi'
import { MATRICULAS_API } from '../core/appConstants'

const getMatriculaUrl = (id) => `${MATRICULAS_API}/${id}`

class MatriculaService {
  static fetchMatriculas = () => baseApi.get(MATRICULAS_API)

  static fetchMatricula = async (id) => baseApi.get(getMatriculaUrl(id))

  static addMatricula = async (matricula) => baseApi.post(MATRICULAS_API, matricula)

  static updateMatricula = async (matricula) => baseApi.put(getMatriculaUrl(matricula.id), matricula)

  static deleteMatricula = async (id) => baseApi.delete(getMatriculaUrl(id))
}

export default MatriculaService;
