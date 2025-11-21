import './App.css'
import LoginForm from "./Components/LoginForm.tsx";
import ChatLayout from "./Components/ChatLayout.tsx";
import ManageGroup from "./Components/ManageGroup.tsx";
import {Routes, Route} from "react-router-dom";
import {createContext, useState} from "react";
import type {User} from "./Components/types.ts";

type Context = {
    user: User | null;
    setUser: (user: User | null) => void;
}

export const LoginContext = createContext<Context>({
    user: null,
    setUser: () => {
    }
});

function App() {
    const [user, setUser] = useState<User | null>(null);



    return (

        <LoginContext.Provider value={{
            user,
            setUser,
        }}>
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/home" element={<ChatLayout/>}/>
                <Route path="/ManageGroup" element={<ManageGroup/>}/>

            </Routes>
        </LoginContext.Provider>


    )
}

export default App
