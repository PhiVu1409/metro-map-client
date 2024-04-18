import axios from 'axios'
const ADMIN_BASE_REST_API_URL = 'http://localhost:8080/auth';
const ADMIN_REST_API_URL = 'http://localhost:8080/api/v1/user';
class UserService{

    getAllUser(){
        return axios.get(ADMIN_REST_API_URL)
    } 
    createUser(newUser){
        return axios.post(ADMIN_BASE_REST_API_URL+"/register", newUser)
    }
    deleteUser(id){
        return axios.delete(ADMIN_REST_API_URL+"/deleteuser?id="+id)
    } 
}

// eslint-disable-next-line
export default new UserService()