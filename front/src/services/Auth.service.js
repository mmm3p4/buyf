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
    register(username, email, password, subscribed) {
            return axios.post(API_URL + "signup", {
                username,
                email,
                password,
                subscribed,
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
    
    postSubscribed(email, subscribed) {
        return axios
            .post("http://localhost:8081/subscribing", {
                email,
                subscribed
            })
    }
    isSubscribed(email) {
        return axios.get(`http://localhost:8081/issubscribing/${email}`, { params: { email } })
      }
    getProductById(id) {
        return axios.get(`http://localhost:8081/isproduct/${id}`,  { params: { id } });
    }
    updatePass(username, password, newpassword) {
        return axios.put("http://localhost:8081/newpass", {
            username,
            password,
            newpassword
        })
    }
    postResetingCode(email) {
        return axios
            .post("http://localhost:8081/reseting", {
                email
            })
    }
    resetVerify(email, resetingCode) {
        return axios
            .post("http://localhost:8081/resetingverify", {
                email,
                resetingCode
            })
    }
    
    resetPass(email, newPassword, newPasswordRepeat) {
        return axios
            .put("http://localhost:8081/finishreset", {
                email,
                newPassword,
                newPasswordRepeat
            })
    }
}
export default new AuthService()