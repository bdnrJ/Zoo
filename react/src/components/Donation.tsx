import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketContext } from "../context/TicketContext";
import { AuthContext } from "../context/AuthContext";

type DonationFormValues = {
    name: string;
    email: string;
    amount: number;
};

const Donation = () => {
    const { currentUser } = useContext(AuthContext);
    const { donationAmount, setDonationAmount, setDonorEmail, setDonorName } = useContext(TicketContext);
    const navigate = useNavigate();

    let donationFormSchema: ZodType<DonationFormValues>;

    // Change schema based on current user
    if (currentUser) {
        donationFormSchema = z.object({
            name: z.string(),
            email: z.string(),
            amount: z.number().min(5, "Minimum donation amount is $5"),
        });
    } else {
        donationFormSchema = z.object({
            name: z.string().min(1, "Required"),
            email: z.string().email("Invalid email address"),
            amount: z.number().min(5, "Minimum donation amount is $5"),
        });
    }

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<DonationFormValues>({ resolver: zodResolver(donationFormSchema) });

    // Watch for changes in inputs
    const watchedInputs = watch();

    // Update context values when watched inputs change
    useEffect(() => {
        setDonorName(watchedInputs.name);
        setDonorEmail(watchedInputs.email);
        setDonationAmount(watchedInputs.amount);
    }, [watchedInputs, setDonorName, setDonorEmail, setDonationAmount]);

    const onSubmit = (data: DonationFormValues) => {
        console.log("xxx");
        if (donationAmount >= 5 && ((currentUser && currentUser !== null) || (!currentUser && watchedInputs.name && watchedInputs.email))){
            navigate('/donation_checkout');
        } else {
            alert('Wrong donation amount or missing donor information!');
        }
    };
    return (
        <div className="donation">
            <div className="donation-top_text">
                <span>
                    Your generous donation helps protect nature around the
                    world, cares for countless animals and plants, and gives
                    hope to the most amazing fauna and flora, that depend on us
                </span>
            </div>
            <form className="donation-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="donation-form-amount">
                    <div className="donation-form-amount-title">
                        Choose your donation amount below.
                    </div>
                    <div className="donation-form-amount-buttons">
                        {[5, 50, 100, 250, 500].map(amount => (
                            <button
                                key={amount}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setValue("amount", amount);
                                    setDonationAmount(amount);
                                }}
                            >
                                {amount}
                            </button>
                        ))}
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                setValue("amount", NaN);
                                setDonationAmount(NaN);
                            }}
                        >
                            Other
                        </button>
                        <input
                            type="number"
                            {...register("amount", { required: true, valueAsNumber: true })}
                        />
                    </div>
                    {!currentUser && (
                        <div>
                            <input
                                type="text"
                                placeholder="Donor Name"
                                {...register("name", { required: true })}
                            />
                            {errors.name && <p className="donation-error">{errors.name.message}</p>}
                            <input
                                type="email"
                                placeholder="Donor Email"
                                {...register("email", { required: true })}
                            />
                            {errors.email && <p className="donation-error">{errors.email.message}</p>}
                        </div>
                    )}
                    <hr />
                </div>
                <p>Minimum value: $5</p>
                <label htmlFor="donationbtn" className="donation-button-label">
                    <button name="donationbtn" type="submit">
                        DONATE
                    </button>
                </label>
            </form>
            email
            {errors.email && <p className="donation-error">{errors.email.message}</p>}
            name
            {errors.name && <p className="donation-error">{errors.name.message}</p>}
            value
            {errors.amount && <p className="donation-error">{errors.amount.message}</p>}


            <hr />
        </div>
    );
};

export default Donation;
