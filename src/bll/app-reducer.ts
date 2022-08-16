import {expenseAPI} from "../api/api"
import {AppThunk} from "./store";
import {UserType} from "../types/types";

const initialState = {
    username: '',
    errorMessage: '',
    authModel: 'sing-up',
    token: ''
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType) => {
    switch (action.type) {
        case 'USER-DATA':
            return {...state, username: action.user}
        case 'ERROR-MESSAGE':
            return {...state, errorMessage: action.error}
        case 'AUTH-MODEL':
            return {...state, authModel: action.auth}
        case 'TOKEN':
            return {...state, token: action.newToken}
        default:
            return state
    }
}

export const initialTC = (): AppThunk => (dispatch) => {
    const token = localStorage.getItem('access-token')
    const username = localStorage.getItem('username')
    token && dispatch(setTokenAC(token))
    username && dispatch(setUserDataAC(username))
}

export const submittingTC = (submitData: UserType): AppThunk => (dispatch) => {
    if (!submitData.login || !submitData.password) {
        return dispatch(setErrorMessageAC('You did not enter your username or password!'))
    }
    if (submitData.authModel === 'sing-up') {
        if (submitData.password === submitData.confirmPassword) {
            expenseAPI.singUp(submitData.password, submitData.login, submitData.name)
                .then((res) => {
                    dispatch(setUserDataAC(res.data.username))
                    dispatch(setAuthModelAC('sing-in'))
                })
                .catch((err) => {
                    dispatch(setErrorMessageAC(err.response.data.message))
                })
        } else {
            dispatch(setErrorMessageAC('Password and Confirm Password not equals!'))
        }
    } else {
        expenseAPI.singIn(submitData.login, submitData.password)
            .then((res) => {
                console.log(res.data)
                localStorage.setItem('access-token', res.data.accessToken)
                localStorage.setItem('username', submitData.login)
                dispatch(setTokenAC(res.data.accessToken))
                dispatch(setUserDataAC(submitData.login))
            })
            .catch((err) => {
                dispatch(setErrorMessageAC(err.response.data.message))
            })

    }
}

export const deleteUserTC = (): AppThunk => (dispatch) => {
    expenseAPI.logout()
        .then(() => {
            //if request will be work uncomment instead of finally
            // dispatch(setTokenAC(''))
            // dispatch(setUserDataAC(''))
            // localStorage.removeItem('access-token')
            // localStorage.removeItem('username')
            // dispatch(setAuthModelAC('sing-in'))
        })
        .catch((err) => {
            console.log(err.message)
        })
        .finally(() => {
            dispatch(setTokenAC(''))
            dispatch(setUserDataAC(''))
            localStorage.removeItem('access-token')
            localStorage.removeItem('username')
            dispatch(setAuthModelAC('sing-in'))
        })
}

export const setUserDataAC = (user: string) => ({type: 'USER-DATA', user} as const)
export const setErrorMessageAC = (error: string) => ({type: 'ERROR-MESSAGE', error} as const)
export const setAuthModelAC = (auth: string) => ({type: 'AUTH-MODEL', auth} as const)
export const setTokenAC = (newToken: string) => ({type: 'TOKEN', newToken} as const)

export type UserDataActionType = ReturnType<typeof setUserDataAC>
export type ErrorMessageActionType = ReturnType<typeof setErrorMessageAC>
export type AuthModelActionType = ReturnType<typeof setAuthModelAC>
export type TokenActionType = ReturnType<typeof setTokenAC>

export type InitialStateType = {
    username: string,
    errorMessage: string,
    authModel: string,
    token: string
}

type ActionsType = UserDataActionType
    | ErrorMessageActionType
    | AuthModelActionType
    | TokenActionType