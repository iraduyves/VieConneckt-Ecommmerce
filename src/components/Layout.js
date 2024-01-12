import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
const Layout = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    return (
        <>
            <Header selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout