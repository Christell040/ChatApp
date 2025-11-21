import {useState} from "react";
import {useNavigate} from "react-router-dom";

function LoginForm() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    return (
        <div className="flex items-center justify-center w-full min-h-screen">


            <div className="flex flex-col items-center justify-center border-2 p-10 w-100">
                <h3 className="text-xl">ChatApp</h3>
                <form className="space-y-4 w-full">
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
                        onClick={() => navigate("/home")}
                    >
                        Login</button>

                </form>
            </div>

        </div>
    );
}
export default LoginForm;