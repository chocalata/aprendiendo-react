import { useState, useEffect } from 'react'
import { getRandomFact } from '../services/facts'

export const useCatFact = () => {
  const [fact, setFact] = useState('lorem ipsum...')

  const refreshFact = () => {
    getRandomFact().then((newFact) => setFact(newFact))
  }

  //recuperar la cita al cargar la página
  useEffect(() => {
    refreshFact
  }, [])

  return { fact, refreshFact }
}
