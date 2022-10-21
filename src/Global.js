import { createContext, useState } from 'react';

export const AuthContext = createContext([false, () => {}])

export const GlobalProvider = ({children}) => {
    const [state, setState] = useState(false)

    return (
        <AuthContext.Provider value={[state, setState]}>
            {children}
        </AuthContext.Provider>
    )
}

// const [user, setUser] = useContext(AuthContext)