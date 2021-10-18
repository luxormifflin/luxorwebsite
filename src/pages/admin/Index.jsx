import React from 'react';
import { useDarkMode } from 'context/darkMode';

const Admin = () => {
    const { darkMode } = useDarkMode();
    return <div className={`flex h-full w-full bg-gray-${darkMode ? '900' : '50'}`}>Contenido</div>;   
};

export default Admin;
