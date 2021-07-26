import React from 'react'
import { Link } from "react-router-dom";
import './Sidebar.css';

export default function Sidebar() {
    const toggleActive = (event) => {
        const element = event.target;
        element.classList.add('active');
        const otherElements = document.querySelectorAll(`*:not(#${element.id})`);
        console.log(otherElements);
        otherElements.forEach((element) => {
            if (element.id === 'home' || element.id === 'clientes' || element.id === 'produtos') {
                if (element.className.includes('active')) element.classList.remove('active');
            }            
        });
    }

    return (
        <div className="sidebar">
            <Link id="home" on to="/" className="link active" onClick={toggleActive}>Home</Link>
            <Link id="clientes" on to="/clientes" className="link" onClick={toggleActive}>Clientes</Link>
            <Link id="produtos" on to="/produtos" className="link" onClick={toggleActive}>Produtos</Link>
        </div>
    )
}