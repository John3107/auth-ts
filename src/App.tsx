import React from 'react'
import style from './App.module.scss'
import Auth from "./components/auth/Auth"
import Home from "./components/home/Home"
import {Route, Routes} from "react-router-dom"
import {useEffect} from "react";
import {initialTC} from "./bll/app-reducer"
import {useAppDispatch} from "./hooks/hooks"

const App = () => {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(initialTC())
    }, [dispatch])

    return (
        <div className={style.app}>
            <Routes>
                <Route path="/*" element={<Auth/>}/>
                <Route path="/user/:login" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
