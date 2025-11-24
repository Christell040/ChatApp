import './App.css'
import LoginForm from "./Components/LoginForm.tsx";
import ChatLayout from "./Pages/ChatLayout.tsx";
import ManageGroup from "./Components/ManageGroup.tsx";
import {Routes, Route} from "react-router-dom";
import {createContext, useContext, useState} from "react";
import type {User} from "./types/types.ts";
import ManageUsers from "./Pages/ManageUsers.tsx";

type Context = {
    user: User | null;
    setUser: (user: User | null) => void;
}

const LoginContext = createContext<Context | null>(null);

export const useLogin = () => {
    const context = useContext(LoginContext);

    if (context === null) {
        throw new Error("useLogin must be used within the context!");
    }
    return context;
}

function App() {
    const [user, setUser] = useState<User | null>(null);


    return (

        <LoginContext.Provider value={{ user, setUser }}>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/home" element={<ChatLayout/>}/>
                <Route path="/admin2" element={<ManageUsers/>}/>
                {/*<Route path="/ManageGroup" element={<ManageGroup/>}/>*/}

            </Routes>
        </LoginContext.Provider>


    )
}

export default App
