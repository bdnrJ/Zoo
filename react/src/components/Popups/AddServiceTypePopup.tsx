import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosClient from "../../axios-client";
import { TicketContext } from "../../context/TicketContext";
import { LoadingContext } from "../../context/LoadingContext";

type ServiceType = {
    name: string;
    description: string;
    price_per_customer: number;
};

type props = {
    closePopup: () => void;
};

const AddServiceType = ({ closePopup }: props) => {
    const { resetServices } = useContext(TicketContext);
    const [disabled, setDisabled] = useState(false);
    const {setLoading} = useContext(LoadingContext);

    const schema: ZodType<ServiceType> = z.object({
        name: z.string().max(45, "Too long").min(1, "Required"),
        description: z.string().max(100, "Too long").min(1, "Required"),
        price_per_customer: z.number().min(0, "Price must be non-negative"),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ServiceType>({ resolver: zodResolver(schema) });

    const onSubmit = async (data: ServiceType) => {
        try {
            setLoading(true);
            setDisabled(true);
            const response = await axiosClient.post(
                "/service_types",
                {
                    ...data,
                    is_active: 0,
                },
                { withCredentials: true }
            );
            setLoading(false);
            alert("Created new service type succesfully");
            setTimeout(() => resetServices(), 1500);
            closePopup();
        } catch (err) {
            setLoading(false);
            console.error("Error adding service type:", err);
            alert("Error adding service type.");
        }
    };

    return (
        <div className="add_stype">
            <h1>Add Service Type</h1>
            <hr />
            <form className="__form" onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="name">
                    <input
                        type="text"
                        placeholder="name"
                        className={`${errors.name && "--error"}`}
                        {...register("name", { required: true })}
                    />
                    {errors.name && (
                        <span className={`_inputError --big`}>
                            {errors.name.message}
                        </span>
                    )}
                </label>
                <label htmlFor="description">
                    <textarea
                        placeholder="description"
                        className={`${errors.description && "--error"}`}
                        {...register("description", { required: true })}
                    />
                    {errors.description && (
                        <span className={`_inputError --big`}>
                            {errors.description.message}
                        </span>
                    )}
                </label>
                <label htmlFor="price_per_customer">
                    <input
                        type="number"
                        placeholder="price per customer"
                        className={`${errors.price_per_customer && "--error"}`}
                        step="0.01"
                        {...register("price_per_customer", {
                            required: true,
                            valueAsNumber: true,
                        })}
                    />
                    {errors.price_per_customer && (
                        <span className={`_inputError --big`}>
                            {errors.price_per_customer.message}
                        </span>
                    )}
                </label>
                <label htmlFor="submitbtn" className="__orange-button-label">
                    <button disabled={disabled} type="submit">
                        Add Service Type
                    </button>
                </label>
            </form>
        </div>
    );
};

export default AddServiceType;
