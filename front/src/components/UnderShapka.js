import {useState, useEffect} from "react";
import '../index.css';
import AuthService from '../services/Auth.service';
function UnderShapka() {
    const isLoggedIn = AuthService.isLoggedIn();
    const [currentUser, setcurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setcurrentUser(user);
        }
    }, [])
    return (
        <>
        {isLoggedIn && currentUser ?(
            <div className="undershapka4">
            <p style={{paddingTop: "22%", color: "#9A1656", fontFamily: "Khmer UI.ttf", fontSize: "40px"}}> Добро пожаловать, {currentUser.username}!</p>
            </div>
        ) : (
            <div className="undershapka">
                <p className="txt">Зарегистрируйтесь, и получите скидку<br />20% на первый заказ!</p>
                <a className="regbut" href="/register">РЕГИСТРАЦИЯ</a>
            </div>
            )}
        <p className="vigoda">Выгодные предложения для Вас</p>
        </>
        
    );
  }
export default UnderShapka;