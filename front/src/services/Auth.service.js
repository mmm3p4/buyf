import axios from "axios";
const API_URL = "http://localhost:8081/auth/";
class AuthService {
    login(username, password) {
        return axios
            .post(API_URL + "signin", {
                username,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user",
                        JSON.stringify(response.data));
                }
                return response.data;
            });
    }
    logout() {
        localStorage.removeItem("user");
    }
    register(username, email, password) {
            return axios.post(API_URL + "signup", {
                username,
                email,
                password,
                roles: ['user']
            });
    }
    
    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));;
    }
    isLoggedIn() {
        const user = this.getCurrentUser();
        return !!user && !!user.accessToken;
    }
    getAllUsers() {
        const user = this.getCurrentUser();
        const config = {
            headers: { Authorization: `Bearer ${user.accessToken}` }
        };
        return axios.get("http://localhost:8081/admin/users", config);
    }
    postActivationCode(email, activation_code) {
        return axios
            .post("http://localhost:8081/activation", {
                email,
                activation_code
            })
    }
}
export default new AuthService()