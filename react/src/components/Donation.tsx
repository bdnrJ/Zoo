import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z, ZodType } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TicketContext } from "../context/TicketContext";
import { AuthContext } from "../context/AuthContext";

type DonationFormValues = {
    amount: number;
};

const Donation = () => {
    const { currentUser } = useContext(AuthContext);
    const { donationAmount, setDonationAmount } = useContext(TicketContext);
    const navigate = useNavigate();

    const donationFormSchema: ZodType<DonationFormValues> = z.object({
        amount: z.number().min(5, "Minimum donation amount is $5"),
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<DonationFormValues>({ resolver: zodResolver(donationFormSchema) });

    const onSubmit = (data: DonationFormValues) => {
        if (data.amount >= 5) {
            setDonationAmount(data.amount)
            navigate('/donation-checkout');
        } else {
            alert('Wrong donation amount!');
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
                    </div>

                    <div className='__form smallerGap'>
                        <div className="input-wrapper">
                            <p>Amount:</p>
                            <label htmlFor="amount">
                                <input
                                    type="number"
                                    className={`${errors.amount && "--error"}`}
                                    step="any"
                                    {...register('amount', { required: true, valueAsNumber: true })}
                                />
                                {errors.amount && <span className={`_inputError --big`}>{errors.amount.message}</span>}
                            </label>
                        </div>
                        <label htmlFor="donationbtn" className="__orange-button-label">
                            <button type='submit'>Donate</button>
                        </label>
                    </div>
                    <hr />
                </div>
                <p>Minimum value: $5</p>
            </form>
            <hr />
        </div>
    );
};

export default Donation;
