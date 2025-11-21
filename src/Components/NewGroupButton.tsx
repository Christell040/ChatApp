export default  function NewGroupButton({OnCreateGroup}) {

    return (

        <>
            <div className="border-2 h-[10%] p-5 flex flex-col w-full justify-center border-b-0 border-t-2 border-r-0">
                <button
                    className= "w-full text-start border-2 p-2 hover:bg-black hover:text-white transition-all duration-400  "
                    onClick={OnCreateGroup}
                >
                    + New Group
                </button>
            </div>

        </>
    );
}
