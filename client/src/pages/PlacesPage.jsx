import { Link, useParams } from "react-router-dom";

export default function PlacesPage(){
    const {action} = useParams();
return(
        <div>
            {action !== 'new' && (
            <div className="text-center">
            <Link to={'/account/places/new'} className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
            </svg>

            Add new place</Link>
            </div>
            )}
        {action === 'new' && (
        <div>
        <form>
            <h2 className="text-2xl mt-4">Title</h2>
            <p className="text-gray-500 text-sm">Title for you place, should be short and catchy as in advertisement</p>
            <input type='text' placeholder="My lovely apt"/>
            <h2 className="text-2xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to this place.</p>
            <input type='text' placeholder="address"/>
            <h2 className="text-2xl mt-4">Photos</h2>
            <p className="text-gray-500 text-sm">More = better.</p>
        <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <button className="border bg-transparent rounded-2xl p-8 text-xl text-gray-600">+</button>
        </div>
        </form>
        </div>

)}
        myplaces
        </div>);
};
