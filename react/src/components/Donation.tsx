import React from 'react'

const Donation = () => {

    const handleNothing = (e) => {
        e.preventDefault();
        // i proudly can handle nothing
    }

    return (
        <div className="donation">
            <div className="donation-top_text">
                <span>
                    Your generous donation helps protect nature around the world, cares for
                    countless animals and plants, and gives hope to the most amazing fauna and flora,
                    that depend on us
                </span>
            </div>
            <form className='donation-form'>

                <div className="donation-form-amount">
                    <div className="donation-form-amount-title">
                        Choose your donation amount below.
                    </div>
                    <div className="donation-form-amount-buttons">
                        <button onClick={e => handleNothing(e)}>25</button>
                        <button onClick={e => handleNothing(e)}>50</button>
                        <button onClick={e => handleNothing(e)}>100</button>
                        <button onClick={e => handleNothing(e)}>250</button>
                        <button onClick={e => handleNothing(e)}>500</button>
                        <button onClick={e => handleNothing(e)}>Other</button>
                        <input type="number" />
                    </div>
                    <hr />
                </div>

                <div className="donation-form-rest">
                    <div className="donation-form-rest-double">
                        <input type="text" placeholder='First name' />
                        <input type="text" placeholder='Last name' />
                    </div>
                    <div className="donation-form-rest-double">
                        <input type="text" placeholder='Email' />
                        <input type="text" placeholder='Phone' />
                    </div>
                    <div className="donation-form-rest-basic">
                        <input type="text" placeholder='Street 1' />
                        <input type="text" placeholder='Street 2' />
                    </div>
                    <div className="donation-form-rest-triple">
                        <input type="text" placeholder='City' />
                        <input type="text" placeholder='State/Province' />
                        <input type="text" placeholder='ZIP' />
                    </div>
                    <div className="donation-form-rest-basic">
                        <input type="text" placeholder='Country' />
                        <input type="text" placeholder='Credit card number' />
                    </div>
                    <div className="donation-form-rest-triple">
                        <input type="text" placeholder='Month' />
                        <input type="text" placeholder='Year' />
                        <input type="text" placeholder='CCV Number' />
                    </div>
                </div>
                <button onClick={(e) => handleNothing(e)} >DONATE</button>
            </form>
        </div>
    )
}

export default Donation
