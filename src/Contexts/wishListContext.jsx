import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const WishContext = createContext();


export default function WishContextProvider({ children }) {

    const [wishedProducts, setWishedProducts] = useState();

    async function getWishList() {

        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
             setWishedProducts(data?.data.map(product=> product._id));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getWishList();
    }, [])


    return <WishContext.Provider value={{ wishedProducts, setWishedProducts }}>
        {children}
    </WishContext.Provider>
}

