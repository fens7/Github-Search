import React from 'react';
import { Link } from 'react-router-dom';

import styles from './HeaderNavigation.module.css';

function HeaderNavigation() {
    return (
        <nav className={styles.nav}>
            <h3>GitHub Search</h3>

            <span>
                <Link to={'/'}>Home</Link>
                <Link to={'/favorites'}>Favorites</Link>
            </span>
        </nav>
    );
}

export default HeaderNavigation;
