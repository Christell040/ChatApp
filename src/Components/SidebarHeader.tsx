import {Search, Users} from "lucide-react";
import {useLogin} from "../App.tsx";

export default function SidebarHeader({onBrowseGroups}){
    const {user} = useLogin();
    return (
        <>
            <div className="p-3 mt-2 border-b-2">
                <div className="flex w-full justify-between items-center mb-4">
                    <p className="font-semibold ">Welcome {user?.name}</p>
                    {/*<button*/}
                    {/*    type="submit"*/}
                    {/*    className="border-2 border-black p-2 hover:bg-black*/}
                    {/*            hover:text-white transition-all duration-400 "*/}
                    {/*>*/}
                    {/*    <Users className="w-4 h-4" strokeWidth={2}/>*/}
                    {/*</button>*/}
                </div>
                {/*<div>*/}
                {/*    <input*/}
                {/*        type="search"*/}
                {/*        className="border-2 border-black p-2 hover:bg-gray-50 w-full mb-2"*/}
                {/*        placeholder="Search..."/>*/}
                {/*</div>*/}

                <button
                    className="flex gap-1 justify-center items-center w-full p-2 border-2 mt-2 mb-2 hover:bg-black hover:text-white transition-all duration-300 "
                    onClick={onBrowseGroups}>
                    <Search size={"16"}/> Browse All Groups
                </button>
            </div>
        </>
    );
}
