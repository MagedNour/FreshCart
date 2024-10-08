import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';


export default function ForgotMyPassword(props) {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMsg, setErrMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const navigate = useNavigate()



    const validationSchema = Yup.object({
        email: Yup.string().required("Email is required").email("Please Enter a valid Email"),
    })
    const initialValues = {
        "email": "m124323@gmail.com",
    }
    async function onSubmit() {
        setIsLoading(true)
        setErrMsg("")
        setSuccessMsg("")
        await axios.post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", values).then(({ data }) => {
            setSuccessMsg(data.message)
            setIsLoading(false)
            localStorage.setItem("email", values.email)
            setTimeout(() => {
                navigate("/verify")
            }, 2000);

        }).catch((err) => {
            setErrMsg(err.response.data.message)
            setIsLoading(false)
            localStorage.setItem("email", values.email)  //testing only
            setTimeout(() => {
                navigate("/verify")
            }, 2000);
        })
    }

    let { handleSubmit, values, handleChange, errors, touched, handleBlur } = useFormik({
        initialValues,
        onSubmit,
        validationSchema
    })




    return (
        <>

            <div className='py-12 flex justify-center items-center'>
                <div className="w-full md:w-1/2 mx-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
                    <h1 className="text-xl font-bold text-center text-gray-700 dark:text-gray-200 mb-8">Forgot My Password</h1>

                    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">

                        <div className="flex items-start flex-col justify-start">
                            <label htmlFor="email" className="text-sm text-gray-700 dark:text-gray-200 mr-2">Email:</label>
                            <input onBlur={handleBlur} onChange={handleChange} value={values.email} type="email" id="email-login" name="email" className="w-full px-3 dark:text-gray-200 dark:bg-gray-900 py-2 rounded-md border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500" />
                            {touched.email && errors.email && <p className='text-red-500'>{errors.email}</p>}
                        </div>


                        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm disabled:bg-gray-400" disabled={isLoading}>Send email {isLoading && <i className='fas fa-spinner fa-spin'></i>}</button>
                        {errorMsg && <p className='text-red-500 text-center'>{errorMsg}</p>}
                        {successMsg && <p className='text-green-500 text-center'>{successMsg}</p>}
                    </form>



                </div >
            </div>

        </>
    );
}
