
export default function AddDishButton() {
    return (
        <>
            <div className="tooltip float-right mt-10 absolute bottom-0 right-0 mb-20 mr-10" data-tip="Add a new dish">
                <div style={{ backgroundColor: "#51afb4" }} className="h-12 w-12 shadow-md text-white flex justify-center items-center rounded-full hover:rotate-180 transition hover:bg-green-900 cursor-pointer"   >
                    +
                </div>
            </div>
        </>
    )
}