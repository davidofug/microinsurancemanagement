import { createContext, useContext } from 'react'

export const AuthContext = createContext()
export default function useAuth() {
    return useContext( AuthContext )
}