import style from './Home.module.scss'
import Header from "../header/Header"
import congrat from '../../assets/congrat.svg'
import main from '../../assets/main.svg'
import {useEffect} from "react"
import {Navigate, useNavigate} from "react-router"
import {deleteUserTC} from "../../bll/app-reducer"
import {useAppDispatch, useAppSelector} from "../../hooks/hooks"

const Home = () => {
    const dispatch = useAppDispatch()
    const data = useAppSelector()
    const navigate = useNavigate()

    useEffect(() => {
        if (data.username) navigate(`/user/${data.username}`)
    }, [data.username, navigate])

    const onClickHandler = () => {
        dispatch(deleteUserTC())
    }

    if (!data.username) return <Navigate to={`/*`}/>

    return (
        <div className={style.home}>
            <Header/>
            <div className={style.main}>
                <div className={style.congratulations}>
                    <span className={style.title}>Congratulations</span>
                    <img src={congrat} alt=""/>
                </div>
                <div className={style.description}>Now you are on the main page. Soon we will provide<br/> you with
                    detailed feedback on the result of your work
                </div>
                <button onClick={onClickHandler}>See You</button>
                <img className={style.mainIcon} src={main} alt=""/>
            </div>
        </div>
    );
}

export default Home;