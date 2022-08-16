import style from './InputBase.module.scss'
import eyeOff from '../../../assets/eye-off.svg'
import {ChangeEvent} from "react";

type PropsType = {
    title: string
    placeholder?: string
    type: string
    setValue: (e: ChangeEvent<HTMLInputElement>) => void
    value: string
}

const InputBase = ({title, placeholder, type, setValue, value}: PropsType) => {

    return (
        <div className={style.inputBase}>
            <label>{title}</label>
            <input placeholder={placeholder} type={type} onChange={setValue} value={value}/>
            {type === 'password' && <img src={eyeOff} alt=""/>}
        </div>
    );
}

export default InputBase;