import { useEffect, useState } from 'react'
import {CATEGORIAS} from './categorias'

export function useLocals(lat, lon, cats, raio=2000) {
    const [locals, setLocals] = useState([]);
    
}