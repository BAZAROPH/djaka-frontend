import axios from "axios";
import * as SecureStore from 'expo-secure-store';


axios.defaults.baseURL = 'https://api-sidle.dev-meraky.com/api'
axios.defaults.headers.post["Content-Type"] = "application/json";

const getToken = async () => {
    try {
        const user = await SecureStore.getItemAsync('authUser');
        let token = null;
        if (user) {
            const parsedUser = JSON.parse(user);
            token = parsedUser.token;
        }
        axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } catch (error) {
        console.error('Error while retrieving token:', error);
    }
};
 
getToken();

// axios.interceptors.request.use(
//     async (config) => {
//         await getToken();
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// )

axios.interceptors.response.use(
    function (response) {
      // Si la réponse est une erreur, rejeter avec le message d'erreur
      if (response.data && response.data.error) {
        return Promise.reject(response.data.error);
      }
  
      // Si la réponse est normale, renvoyer les données de la réponse
      return response.data ? response.data : response;
    },
    (error) => {
        if (error.response && error.response.data) {
            
            return Promise.reject(error.response.data.message || error.response.data);

        } else if (error.request) {

            return Promise.reject('Pas de réponse du serveur');

        } else {

            return Promise.reject('Une erreur est survenue lors de la configuration de la requête');
            
        }
    }
  );
  

const setAuthorization = (token) => {
    axios.defaults.headers.common["Authorization"] = "Bearer " + token;
}

class APIClient {
    get = (url, params) => {
        let response;
        let paramKeys = [];
        if (params) {
            Object.keys(params).map((key) => {
                paramKeys.push(key + "=" + params[key]);
                return paramKeys;
            })

            const queryString = paramKeys && paramKeys.length ? paramKeys.join("&") : "";
            response = axios.get(`${url}?${queryString}`, params);
        }else{
            response = axios.get(`${url}`, params);
        }
        console.log(axios.defaults.headers.common["Authorization"], 'toktok');
        return response;
    }

    create = (url, data, header=null) => {
        if(header) axios.defaults.headers.post["Content-Type"] = header;
        return axios.post(url, data);
    }

    update = (url, data) => {
        return axios.patch(url, data);
    }

    put = (url, data) => {
        return axios.put(url, data);
    }

    delete = (url, config) => {
        return axios.delete(url, { ...config});
    }
}

const getLoggedinUser = () => {
    const user = SecureStore.getItemAsync('authUser');
    if(!user) {
        return null;
    }else{
        return JSON.parse(user);
    }
}

export { APIClient, setAuthorization, getLoggedinUser, getToken};
