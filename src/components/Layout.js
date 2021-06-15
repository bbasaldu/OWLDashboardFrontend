import { Fragment } from "react"
import MainNav from "./MainNav"
import React from 'react'
import classes from './Layout.module.css'
const Layout = (props) => {
    return (
        <Fragment>
            <MainNav/>
            <main className={classes.Layout}>
                {props.children}
            </main>
        </Fragment>
    )
}
export default Layout