import React, { useContext } from 'react'
import foundationLogo from '../assets/foundationLogo.png'
import Donation from '../components/Donation'
import {AiFillMail, AiFillPhone} from 'react-icons/ai'
import Iucan from '../assets/organisations/Iucn.png'
import Ize from '../assets/organisations/Ize.png'
import Species360 from '../assets/organisations/Species360.png'
import Waza from '../assets/organisations/Waza.png'
import Wwf from '../assets/organisations/Wwf.png'
import { AuthContext } from '../context/AuthContext'
import DonationAnonymous from '../components/DonationAnonymous'

const Foundation = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className="foundation">
            <div className="foundation-image">
                <h1>FOUNDATION</h1>
            </div>
            <div className="foundation-content">

                <div className="foundation-content-upper">
                    <div className="foundation-content-title">
                        Foundation "Save Wildlife"
                    </div>
                    <div className="foundation-content-subtitle">
                        Founded by Michael M. Stokes in 1938Founded by Michael M. Stokes in 1938
                    </div>
                </div>

                <div className="foundation-content-middle">

                    <div className="content-middle-top">
                        <div className="middle-top-text">
                            <div className="middle-top-text-title">
                                <span>
                                    The foundation's mission is to protect and care for wild animals.
                                    Their tireless efforts ensure that the animals
                                    and a safe and healthy environment to thrive in.
                                </span>
                            </div>
                            <div className="middle-top-text-subtitle">
                                <span>
                                    The foundation helping wild animals works in a variety
                                    of ways to ensure the safety and well-being of animals.
                                    Here are a few examples of how they operate:
                                </span>
                            </div>
                        </div>
                        <div className="middle-top-logo">
                            <img src={foundationLogo} alt="foundation logo" />
                        </div>
                    </div>

                    <div className="content-middle-info">
                        <div className="conent-middle-info-block">
                            <article>
                                <b>Rescue and Rehabilitation:</b> The foundation has a team of experts who are trained to
                                rescue and care for injured or orphaned animals. When a call comes in, the team will
                                respond quickly and work to provide the animal with the medical care and rehabilitation
                                it needs. Once the animal is healthy and ready, they will be released back into the
                                wild. If the animal is in critical state and won't be able to survive in wild enviroment
                                after treatment he is taken to our zoo and puted under special care.
                            </article>
                        </div>
                        <div className="conent-middle-info-block">
                            <article>
                                <b>Habitat Conservation:</b> The foundation recognizes that habitat loss is one of the biggest
                                threats to wild animals. They work to preserve and protect the natural habitats of animals
                                by partnering with local communities to promote sustainable practices. They also conduct
                                research to better understand the needs of different species and how they can be supported
                                in their natural habitats.
                            </article>
                        </div>
                        <div className="conent-middle-info-block">
                            <article>
                                <b>Education and Outreach:</b> The foundation believes that education is key to promoting animal welfare.
                                They work to educate the public on the importance of protecting wild animals and their habitats,
                                as well as how they can get involved in conservation efforts. They also provide resources and
                                training to local communities, empowering them to take action to protect the animals they share
                                their environment with.
                            </article>
                        </div>
                        <div className="conent-middle-info-block">
                            <article>
                                <b>Advocacy:</b> The foundation uses its platform to advocate for policies and practices that protect wild animals.
                                They work with governments and other organizations to promote laws and regulations that promote animal welfare,
                                as well as holding those who harm animals accountable for their actions.
                            </article>
                        </div>
                        <div className="conent-middle-info-block">
                            <article>
                                Overall, the foundation operates with the goal of protecting and preserving wild animals and
                                their habitats. Through a combination of rescue and rehabilitation, habitat conservation,
                                education and outreach, and advocacy, they are making a difference in the lives of animals
                                and promoting a more sustainable future for all.
                            </article>
                        </div>
                    </div>
                </div>

                <div className="foundation-content-donation">
                    <div className="content-donation-support">
                        <h3>How you can support the foundation?</h3>
                        <span>Buy a ticket to our zoo. 45% of the income from zoo tickets goes to the "Save wildlife" foundation</span>
                        <span>Leave a donation.</span>
                        <div className="content-donation-support-levels">
                            <p>After donating certain amount, you can get a lifetime discount when buyign tickets!</p>
                            <p>$5000 = 5%</p>
                            <p>$10000 = 10%</p>
                            <p>$20000 = 20%</p>
                        </div>
                        {currentUser ? <Donation /> : <DonationAnonymous />}
                        <span>If you are interested in cooperation or volunteering, please contact us at the number or e-mail address below</span>
                        <div className="content-donation-support-contact">
                            <div className="donation-support-contact-block">
                                <div className='support-contact-block-icon'>
                                    <AiFillMail />
                                </div>
                                <div>
                                    savewildlifefund@email.com
                                </div>
                            </div>
                            <div className="donation-support-contact-block">
                                <div className='support-contact-block-icon'>
                                    <AiFillPhone />
                                </div>
                                <div>
                                    +560 674 529 026
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="foundation-footer">
                <div className="foundation-footer-block">
                    <img src={Wwf} alt="wwf"/>
                </div>
                <div className="foundation-footer-block">
                    <img src={Waza} alt="waza"/>
                </div>
                <div className="foundation-footer-block">
                    <img src={Species360} alt="species 360" />
                </div>
                <div className="foundation-footer-block">
                    <img src={Ize} alt="ize"/>
                </div>
                <div className="foundation-footer-block">
                    <img src={Iucan} alt="iucan"/>
                </div>
            </div>
        </div>
    )
}

export default Foundation
