import baseApi from './baseApi'
import { CURSOS_API } from '../core/appConstants'

const getCursoUrl = (id) => `${CURSOS_API}/${id}`

class CursoService {
  static fetchCursos = () => baseApi.get(CURSOS_API)

  static fetchCurso = async (id) => baseApi.get(getCursoUrl(id))

  static addCurso = async (curso) => baseApi.post(CURSOS_API, curso)

  static updateCurso = async (curso) => baseApi.put(getCursoUrl(curso.id), curso)

  static deleteCurso = async (id) => baseApi.delete(getCursoUrl(id))
}

export default CursoService;
