import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import EstudianteService from '../api/estudianteService'

const useFetchEstudiante = (id) => {
  const [estudiante, setEstudiante] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    if (id)
      EstudianteService.fetchEstudiante(id)
        .then((response) => {
          setEstudiante(response)
        })
        .catch((error) => {
          toast.error(error)
        })
    setLoading(false)
  }, [id])

  return [estudiante, loading]
}

export default useFetchEstudiante
