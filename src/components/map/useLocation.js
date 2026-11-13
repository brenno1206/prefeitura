import * as Location from 'expo-location'
import { useEffect, useState } from 'react'

const CENTRO_VV = { lat: -20.3297, lon: -40.2925 };

export function useLocation() {
    const [pos, setPos] = useState(CENTRO_UVV);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;
            const {coords} = await Location.getCurrentPositionAsync({});
            setPos({lat: coords.latitude, lon: coords.longitude});
        })();
    }, []);

    return pos;
}