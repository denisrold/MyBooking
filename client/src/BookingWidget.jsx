export default function BookingWidget({place}){
    return(
        <div className="bg-white shadow p-4 rounded-2xl">
        <div className="text-2xl text-center">
            Price:${place.price} / per night 
        </div>
        <div className="border-2 shadow-lg shadow-gray-200 rounded-2xl my-4">
            <div className="flex ">
                <div className=" border-gray-200 py-2 px-4">
                    <label>Check in: </label>
                    <input type='date'/>
                </div>
                
                <div className="mb-2 border-gray-200 py-2 px-4 border-l-2">
                    <label>Check out: </label>
                    <input type='date' className="w-28"/>
                </div>
            </div>
            <div className="mb-2 border-gray-200 pt-2 px-4 border-t-2">
                    <label>Number of guest: </label>
                    <input type='number' value={1} className="outline-none border-2 shadow-md" />
            </div>
        </div>
        <button className="primary" value={1}>Book this place</button>
    </div>
    )
}