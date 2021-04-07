import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipmant = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loggedinUser, setLoggedInUser] = useContext(UserContext);
    console.log(loggedinUser)
    const onSubmit = data => {
        console.log("Form submitted",data)
    };

    return (
        <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>        
        <input name="name" value={loggedinUser.displayName}{...register("exampleRequired", { required: true })} placeholder="Name" />
        {errors.exampleRequired && <span className="error">Name is required</span>}

        <input name="email" defaultValue={loggedinUser.email} {...register("exampleRequired", { required: true })} placeholder="Email" />
        {errors.exampleRequired && <span className="error">Email is required</span>}

        <input name="address" {...register("exampleRequired", { required: true })} placeholder="Address" />
        {errors.exampleRequired && <span className="error">Address is required</span>}

        <input name="phoneNo" {...register("exampleRequired", { required: true })} placeholder="Phone Number" />
        {errors.exampleRequired && <span className="error">Phone number is required</span>}
        
        <input type="submit" />
        </form>
    );
};

export default Shipmant;