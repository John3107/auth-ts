import style from './InputBase.module.scss'
import eyeOff from '../../../assets/eye-off.svg'
import eyeOn from '../../../assets/eye-on.svg'
import {ChangeEvent, useState} from "react"

type PropsType = {
    title: string
    placeholder?: string
    type: string
    setValue: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}

const InputBase = ({title, placeholder, type, setValue, value}: PropsType) => {

    const [showPassword, setShowPassword] = useState(false)
    const [typing, setTyping] = useState(type)

    const onClickHandler = () => {
        setShowPassword(!showPassword)
        setTyping(typing === 'password' ? 'text' : 'password')
    }

    return (
        <div className={style.inputBase}>
            <label>{title}</label>
            <input placeholder={placeholder} type={typing} onChange={setValue} value={value}/>
            {type === 'password' && <img src={showPassword ? eyeOn : eyeOff}
                                         onClick={onClickHandler} alt=""/>}
        </div>
    );
}

export default InputBase;