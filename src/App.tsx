import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/index';
import Favorites from './pages/Favorites';
import HeaderNavigation from './components/HeaderNavigation';

function App() {
    return (
        <div className="App">
            <HeaderNavigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/favorites" element={<Favorites />} />
            </Routes>
        </div>
    );
}

export default App;
