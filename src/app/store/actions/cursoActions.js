import { toast } from 'react-toastify'
import * as actionTypes from './actionTypes'
import CursoService from '../../api/cursoService'
import { closeModal } from './modalActions'

const loadingCursos = (loading) => {
  return { type: actionTypes.LOADING_CURSOS, payload: { loading } }
}

const loadingCurso = (loading) => {
  return { type: actionTypes.LOADING_CURSO, payload: { loading } }
}

const fecthCursosAction = (cursos) => {
  return { type: actionTypes.FETCH_CURSOS, payload: { cursos } }
}

const fetchCursoAction = (curso) => {
  return { type: actionTypes.FETCH_CURSO, payload: { curso } }
}

const addCursoAction = (cursos) => {
  return { type: actionTypes.ADD_CURSO, payload: { cursos } }
}

const updateCursoAction = (cursos) => {
  return { type: actionTypes.UPDATE_CURSO, payload: { cursos } }
}

const deleteCursoAction = (cursos) => {
  return { type: actionTypes.DELETE_CURSO, payload: { cursos } }
}

export const fetchCursos = () => async (dispatch) => {
  dispatch(loadingCursos(true))
  try {
    const cursos = await CursoService.fetchCursos()
    dispatch(fecthCursosAction(cursos))
    dispatch(loadingCursos(false))
  } catch (error) {
    dispatch(loadingCursos(false))
    toast.error('Problem loading Cursos')
  }
}

export const fetchCurso = (id) => async (dispatch) => {
  dispatch(loadingCurso(true))
  try {
    const curso = await CursoService.fetchCurso(id)

    dispatch(fetchCursoAction(curso))
    dispatch(loadingCurso(false))
  } catch (error) {
    dispatch(loadingCurso(false))
    toast.error('Problem loading the selected curso')
  }
}

export const addCurso = (curso) => async (dispatch, getState) => {
  dispatch(loadingCurso(true))
  try {
    const newCurso = await CursoService.addCurso(curso)
    const cursos = [...getState().curso.cursos]
    cursos.push(newCurso)

    // Actualizamos el estado global
    dispatch(addCursoAction(cursos))
    dispatch(closeModal())
    dispatch(loadingCurso(false))
    toast.success('¡El curso fue creado satisfactoriamente!')
  } catch (error) {
    dispatch(loadingCurso(false))
    toast.error('¡Hubo un problema al crear el curso!')
  }
}

export const updateCurso = (curso) => async (dispatch, getState) => {
  dispatch(loadingCurso(true))
  try {
    const updatedCurso = await CursoService.updateCurso(curso)

    const cursos = [...getState().curso.cursos]
    const index = cursos.findIndex((a) => a.id === updatedCurso.id)
    cursos[index] = updatedCurso

    dispatch(updateCursoAction(cursos))

    dispatch(loadingCurso(false))
    dispatch(closeModal())
    toast.success('¡El curso fue modificado satisfactoriamente!')
  } catch (error) {
    dispatch(loadingCurso(false))
    toast.error('¡Hubo un problema al actualizar el curso!')
  }
}

export const deleteCurso = (id) => async (dispatch, getState) => {
  dispatch(loadingCurso(true))
  try {
    await CursoService.deleteCurso(id)
    let cursos = [...getState().curso.cursos]

    cursos = cursos.filter((a) => a.id !== id)

    dispatch(deleteCursoAction(cursos))
    dispatch(loadingCurso(false))
    toast.success('¡El curso fue eliminado satisfactoriamente!')
  } catch (error) {
    dispatch(loadingCurso(false))
    toast.error('¡Hubo un problema al eliminar el curso!')
  }
}
