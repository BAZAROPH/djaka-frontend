import { useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

export const useAuthUser = ()=>{

    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)

    const getAuthUser = async ()=>{
        const temp_user = await SecureStore.getItemAsync('authUser');
        if(temp_user){
            const isValidJSON = temp_user.startsWith('{') && temp_user.endsWith('}');
            
            if (isValidJSON) {
                setUser(JSON.parse(temp_user));
                setToken(JSON.parse(temp_user).token);
            } else {
                console.error('Invalid JSON format:', temp_user);
            }
        }
    }

    const logout = async ()=>{
        await SecureStore.deleteItemAsync('authUser');
    }

    useEffect(() => {
        getAuthUser();
    }, [])
    
    
    
    return { user, token, logout }
}
