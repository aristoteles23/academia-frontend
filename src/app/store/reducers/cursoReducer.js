import createReducer from './reducerUtils'
import {
  LOADING_CURSO,
  LOADING_CURSOS,
  FETCH_CURSO,
  FETCH_CURSOS,
  UPDATE_CURSO,
  ADD_CURSO,
  DELETE_CURSO,
} from '../actions/actionTypes'

const initialState = {
  cursos: [],
  curso: null,
  loadingCurso: false,
  loadingCursos: false,
}

const loadingCursos = (state, payload) => {
  return { ...state, loadingCursos: payload.loading }
}

const loadingCurso = (state, payload) => {
  return { ...state, loadingCurso: payload.loading }
}

const fetchCursos = (state, payload) => {
  return { ...state, cursos: payload.cursos }
}

const fetchCurso = (state, payload) => {
  return { ...state, curso: payload.curso }
}

const addCurso = (state, payload) => {
  return { ...state, cursos: payload.cursos }
}

const updateCurso = (state, payload) => {
  return { ...state, cursos: payload.cursos }
}

const deleteCurso = (state, payload) => {
  return { ...state, cursos: payload.cursos }
}

export default createReducer(initialState, {
  [LOADING_CURSO]: loadingCurso,
  [LOADING_CURSOS]: loadingCursos,
  [FETCH_CURSO]: fetchCurso,
  [FETCH_CURSOS]: fetchCursos,
  [UPDATE_CURSO]: updateCurso,
  [ADD_CURSO]: addCurso,
  [DELETE_CURSO]: deleteCurso,
})
