import React from 'react';
import './nav.css';


function Nav()
{
  return  (
    <div className = "mainnav">
    <header>
        <nav className = "navigation">
            <ul>
              <li> <a href="/">Главная</a></li>
              <li> <a href="/articles">Статьи</a></li>
              <li> <a href="/login">Логин</a></li>
            </ul>
        </nav>
        <div>
            <h1 className = "maintitle" >Личный блог Чузова Дмитрия</h1>
        </div>
    </header>
    </div>


  );

}

export default Nav;
