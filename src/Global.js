import { createContext, useState } from 'react';

export const AuthContext = createContext([false, () => {}])

export const GlobalProvider = ({children}) => {
    const [user, setUser] = useState(false)

    return (
        <AuthContext.Provider value={[user, setUser]}>
            {children}
        </AuthContext.Provider>
    )
}

export const apiURL = "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/"


// const [user, setUser] = useContext(AuthContext)