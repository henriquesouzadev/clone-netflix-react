import React from 'react'
import './Header.css'

const Header = ({black}) => {
   return (
      <header className={black ? 'black' : ''}>
         <div className="header--logo">
            <a href="/">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/300px-Netflix_2015_logo.svg.png" alt="Nextflix" />
            </a>
         </div>
         <div className="header--user">
            <a href="/">
               <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Usuário" />
            </a>
         </div>
      </header>
   )
}

export default Header