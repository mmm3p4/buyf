import React from "react";
import katsec1 from '../img/katsec1.png';
import katsec2 from '../img/katsec2.png';
import katsec3 from '../img/katsec3.png';
import katsec4 from '../img/katsec4.png';
import katsec5 from '../img/katsec5.png';
import katsec6 from '../img/katsec6.png';

const Category = () => {
    return (  
    <div className="grid-container">
        <a href="/roses" style={{backgroundImage: `url(${katsec1})`, margin: "10% 0% 0% 30%", textDecorationLine: "none"}} className="cat">
            <p className="cattxt">Букеты из роз</p>
        </a>
        <a href="/hriz" style={{backgroundImage: `url(${katsec2})`, margin: "10% 0% 0% 5%", textDecorationLine: "none"}} className="cat">
            <p className="cattxt">Букеты из хризантем</p>
        </a >
        <a href="lilies" style={{backgroundImage: `url(${katsec3})`, margin: "10% 0% 0% 30%", textDecorationLine: "none"}} className="cat">
            <p className="cattxt">Букеты из лилий</p>
        </a >
        <a href="/tulps" style={{backgroundImage: `url(${katsec4})`, margin: "10% 0% 0% 5%", textDecorationLine: "none"}} className="cat">
            <p className="cattxt">Букеты из тюльпанов</p>
        </a >
        <a href="/comps" style={{backgroundImage: `url(${katsec5})`, margin: "10% 0% 0% 30%", textDecorationLine: "none"}} className="cat">
            <p className="cattxt">Композиции</p>
        </a >
        <a href="/toys" style={{backgroundImage: `url(${katsec6})`, margin: "10% 0% 0% 5%", textDecorationLine: "none"}} className="cat">
            <p className="cattxt">Игрушки</p>
        </a >
    </div >
  );
};

export default Category;
