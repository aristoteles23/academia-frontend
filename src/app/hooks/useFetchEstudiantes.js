import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import EstudianteService from '../api/estudianteService'

const useFetchEstudiantes = () => {
  const [estudiantes, setEstudiantes] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    EstudianteService.fetchEstudiantes()
      .then((response) => {
        setEstudiantes(response)
      })
      .catch((error) => {
        toast.error(error)
      })
    setLoading(false)
  }, [])

  return [estudiantes, loading]
}

export default useFetchEstudiantes
