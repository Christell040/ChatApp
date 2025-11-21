import {Users} from "lucide-react";

export default function SidebarHeader(){
    return (
        <>
            <div className="p-3 mt-2">
                <div className="flex w-full justify-between items-center mb-4">
                    <p className="font-semibold ">Chats</p>
                    <button
                        type="submit"
                        className="border-2 border-black p-2 hover:bg-black
                                hover:text-white transition-all duration-400 "
                    >
                        <Users className="w-4 h-4" strokeWidth={2}/>
                    </button>
                </div>
                <div>
                    <input
                        type="search"
                        className="border-2 border-black p-2 hover:bg-gray-50 w-full mb-2"
                        placeholder="Search..."/>
                </div>
            </div>
        </>
    );
}
