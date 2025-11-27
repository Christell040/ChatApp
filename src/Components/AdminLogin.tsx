import {useState,useEffect} from "react";
import {useNavigate} from "react-router-dom";


import {getUserByEmail, login} from "../Services/userService.ts";
import type {LoginRequest} from "../types/types.ts";
import toast from "react-hot-toast";
// import type {User} from "../types/types.ts";


function AdminLogin({setCurrentAdmin}) {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('')


    const navigate = useNavigate();

    //Handle Submit - To set the user for the whole context and redirect to home page

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // construct the user request post the user then construct the user and set them

        const loginRequest : LoginRequest = {
            email: email,
            password: password,
        }

        const status  = await login(loginRequest);

        if (status === 200) {
            //construct the user and set
            const currentUser = await getUserByEmail(email)
            setCurrentAdmin(currentUser)

            navigate("/userManagement");
            toast.success(`Welcome Admin ${currentUser.name}`);

        } else if (status === 401) {
            toast.error(`Wrong Credentials`);
            return;
        }

    }



    return (
        <div className="flex items-center justify-center w-full min-h-screen">


            <div className="flex flex-col items-center justify-center border-2 p-10 w-100">
                <h3 className="text-xl">Turntabl-Chat Admin Login</h3>
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
export default AdminLogin;