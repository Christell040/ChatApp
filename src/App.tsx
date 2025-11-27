import './App.css'
import LoginForm from "./Components/LoginForm.tsx";
import ChatLayout from "./Pages/ChatLayout.tsx";
import ManageGroup from "./Components/ManageGroup.tsx";
import {Routes, Route} from "react-router-dom";
import {createContext, useContext, useState} from "react";
import type {User} from "./types/types.ts";
import ManageUsers from "./Pages/ManageUsers.tsx";
import AdminLogin from "./Components/AdminLogin.tsx";
import {Toaster} from "react-hot-toast";

type Context = {
    user: User;
    setUser: (user: User ) => void;
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
    const [admin,setAdmin] = useState<User>({name: "",email: "",password: "", role: 0,status: false,admin: ""});
    const [user, setUser] = useState<User>({name: "",email: "",password: "",role: 0,status: false,admin: ""});


    return (

        <LoginContext.Provider value={{ user, setUser }}>
            <Toaster position="top-center"   toastOptions={{duration: 3000}} />
            <Routes>
                <Route path="/" element={<LoginForm/>}/>
                <Route path="/home" element={<ChatLayout/>}/>
                <Route
                    path="/admin"
                    element={<AdminLogin setCurrentAdmin={(data) => setAdmin(data)} />}
                />
                <Route path="/userManagement" element={<ManageUsers admin={admin}/>}/>
                {/*<Route path="/ManageGroup" element={<ManageGroup/>}/>*/}

            </Routes>
        </LoginContext.Provider>


    )
}

export default App
