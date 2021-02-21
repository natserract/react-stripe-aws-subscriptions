import React, { useState } from 'react'
import ToolbarComponent from '../toolbar'
import DrawerComponent from '../drawer'

interface ILayoutProps {
    children: React.ReactNode
}

const Layout = ({ children }: ILayoutProps) => {
    const [state, setState] = useState({
        left: false
    })

    const toggleDrawer = () => {
        setState({ left: false });
    };

    const openDrawer = () => {
        setState({
            left: true
        })
    };

    return (
        <>
            <ToolbarComponent openDrawerHandler={openDrawer} />
            <DrawerComponent
                left={state.left}
                toggleDrawerHandler={toggleDrawer}
            />

            {children}
        </>
    )
}

export default Layout