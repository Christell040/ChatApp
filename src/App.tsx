
import './App.css'
import LoginForm from "./Components/LoginForm.tsx";
import ChatLayout from "./Components/ChatLayout.tsx";
import ManageGroup from "./Components/ManageGroup.tsx";
import {Routes,Route} from "react-router-dom";


function App() {

  // @ts-ignore
    return (

            <>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/home" element={<ChatLayout />} />
                <Route path="/ManageGroup" element={<ManageGroup />} />

            </Routes>
            </>



  )
}

export default App
