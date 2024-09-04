import axios from "axios";
import { Bounce, toast } from "react-toastify";



export async function addProductToWishList(productId) {

    try {

        const { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/wishlist', {
            productId: productId
        }, {
            headers: {
                token: localStorage.getItem("token")
            }
        })

        console.log(data);

        toast.success(data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
        });

    } catch (error) {
        console.log(error);
    }


}


export async function removeProductFromWishlist(productId) {

    try {
        const { data } = await axios.delete("https://ecommerce.routemisr.com/api/v1/wishlist/" + productId, {
            headers: {
                token: localStorage.getItem("token")
            }
        }

        )

    } catch (error) {
        console.log(error);
    }
}