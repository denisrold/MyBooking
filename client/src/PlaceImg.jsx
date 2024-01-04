export default function PlaceImg({place, index =0, className = null}){
    if(!place.photos.length){
        return '';
    }

    if(!className){
        className='object-cover'
    }
    return(
        <img className={className} src={import.meta.env.VITE_AXIOS_DEFAULT_BACKEND_PHOTO_LINK+place.photos[index]}/>
    )
};