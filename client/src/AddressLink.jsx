export default function AddressLink({children}){
    return(

             <a target="_blank" 
                className="block underline font-semibold my-2" 
                href={'https://maps.google.com/?q='+ children}>
                    {children}     
            </a>

    );
}