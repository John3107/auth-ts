import style from './Auth.module.scss'
import Header from "../header/Header"
import InputBase from "./facades/InputBase"
import {MouseEvent, useEffect, useState} from "react"
import {setAuthModelAC, setErrorMessageAC, submittingTC} from "../../bll/app-reducer"
import {Navigate, useNavigate} from "react-router"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";

const Auth = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector()
    const navigate = useNavigate()

    const [name, setName] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    useEffect(() => {
        if (!data.username) navigate('/')
    }, [data.username, navigate])

    useEffect(() => {
        if (!data.errorMessage) return
        setTimeout(() => {
            dispatch(setErrorMessageAC(''))
        }, 3000)
    }, [data.errorMessage, dispatch])

    const onClickHandler = () => {
        data.authModel === 'sing-up'
            ? dispatch(setAuthModelAC('sing-in'))
            : dispatch(setAuthModelAC('sing-up'))
    }


    const onSubmit = (e: MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        dispatch(submittingTC({
            name,
            login,
            password,
            confirmPassword,
            authModel: data.authModel
        }))
    }

    if (data.token) return <Navigate to={`/user/${data.username}`}/>

    return (
        <div className={style.auth}>
            <Header/>
            <span className={style.title}>{data.authModel === 'sing-up' ? 'sing up' : 'sing in'}</span>
            <form>
                {data.authModel === 'sing-up' &&
                    <InputBase title={'Full Name'}
                               placeholder={'Example Name'}
                               type={'text'}
                               setValue={(name) => setName(name.target.value)}
                               value={name}/>}
                <InputBase title={'User Name'}
                           placeholder={'Example123'}
                           type={'text'}
                           setValue={(login) => setLogin(login.target.value)}
                           value={login}/>
                <InputBase title={'Password'}
                           type={'password'}
                           setValue={(password) => setPassword(password.target.value)}
                           value={password}/>
                {data.authModel === 'sing-up' &&
                    <InputBase title={'Confirm Password'}
                               type={'password'}
                               setValue={(confirmPassword) => setConfirmPassword(confirmPassword.target.value)}
                               value={confirmPassword}/>}
                <div className={style.error}>{data.errorMessage}</div>
                <input type={'Submit'} defaultValue={data.authModel === 'sing-up' ? 'Sign Up' : 'Sing In'}
                       className={style.inputSubmit}
                       onClick={onSubmit}/>
            </form>
            {
                data.authModel === 'sing-up'
                    ? <div className={style.switch}>I have an account.
                        <span onClick={onClickHandler}>Go to Sign in</span></div>
                    : <div className={style.switch}>Don’t have account yet?
                        <span onClick={onClickHandler}>New Account</span></div>
            }
        </div>
    );
}

export default Auth;