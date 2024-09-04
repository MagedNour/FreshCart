import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const CartCountContext = createContext();


export default function CartContextProvider({ children }) {
    const [cartCount, setCartCount] = useState(0);

    async function getUserCart() {

        try {
            const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/cart", {
                headers: {
                    token: localStorage.getItem("token")
                }
            });
            setCartCount(data?.data?.products.length);
        } catch (error) {
            console.log('Failed to fetch cart data');

        }
    }


    useEffect(() => {
        getUserCart()
    }, [])



    return <CartCountContext.Provider value={{ cartCount, setCartCount }}>
        {children}
    </CartCountContext.Provider>
}

