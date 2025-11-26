import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";
import { useLogin} from "../App.tsx";

//Import the user models
import {mockUsers} from "../data/mockUsers.ts";
// import type {User} from "../types/types.ts";


function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')
    //Call to the Use Context
    const {user,setUser} = useLogin()

    const navigate = useNavigate();
    useEffect(() => {
        if(user.name != ""){
            navigate("/home");
        }
    }, [user, navigate]);

    if (user.name !="") return null;


    //Handle Submit - To set the user for the whole context and redirect to home page

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Check the user object and find a user with that email
        const currentUser = mockUsers.find(user => user.email === email);

        if(!currentUser) {
            alert("You are not registered with this email!");
            return;
        }

        if(currentUser.password === password) {
            setUser(currentUser)

            navigate("/home")
            alert(`Welcome ${currentUser.name}, ${currentUser.email}`);
        }else{
            alert("You have entered the wrong password")
            return;
        }

    }



    return (
        <div className="flex items-center justify-center w-full min-h-screen">


            <div className="flex flex-col items-center justify-center border-2 p-10 w-100">
                <h3 className="text-xl">ChatApp</h3>
                <form onSubmit={handleSubmit}
                    className="space-y-4 w-full">
                    {/*Email*/}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                            Email:
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-2 p-2 w-full"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password:
                        </label>

                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="border-2 p-2 mb-4 w-full"
                        />
                    </div>

                    <button
                        type="submit"
                        className="text-sm font-medium text-gray-700 block w-full border-2 p-2
                        hover:bg-black hover:text-white transition-all duration-700  "
                    >
                        Login</button>

                </form>
            </div>

        </div>
    );
}
export default LoginForm;