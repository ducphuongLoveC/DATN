import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import s from './Footer.module.scss';
// ===============================|| FOOTER ||=============================== //

const Footer: React.FC = () => {

    const theme = useTheme(); // Lấy theme từ hook useTheme
    const downMD = useMediaQuery(theme.breakpoints.down('md')); // Sử dụng theme breakpoints
    return (
        <footer style={{
            color: theme.palette.text.primary,
            marginTop: '20px',
            boxShadow: '0 -4px 6px rgba(0, 0, 0, 0.1), 0 -1px 3px rgba(0, 0, 0, 0.08)'
        }}>
            <div className="tw-container tw-mx-auto tw-px-5 tw-py-16">
                <div className="tw-flex tw-flex-col md:tw-flex-row">
                    <div className="tw-basis-2/6">
                        <div className="tw-p-5">
                            <img src="./images/logo-mini.png" alt="" className="tw-w-10" />
                            <div>
                                <h3 className="tw-font-medium tw-mt-4 tw-mb-3" style={{ color: theme.palette.text.secondary }}>Call Us</h3>
                                <div className="tw-text-sm">
                                    <h4 className="tw-mb-2">+88019626352323</h4>
                                    <h4 className="tw-mb-2">hello@gmail.com</h4>
                                    <h4 className="tw-mb-2">9AM- 5PM, Monday - Friday</h4>
                                    <h4 className="tw-mb-2">PO Box 567, Hostain st. 433 Los Angeles, California, US</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tw-basis-1/6">
                        <div className="tw-p-4">
                            <h3 className="tw-font-medium tw-mt-4 tw-mb-3" style={{ color: theme.palette.text.secondary }}>Links</h3>
                            <ul className="tw-list-none tw-mt-4">
                                {['Start here', 'Blogs', 'About us', 'Contact Us', 'Career', 'Courses'].map((link, index) => (
                                    <li key={index}>
                                        <a href="#" className="tw-text-sm" style={{ color: theme.palette.text.primary }}>
                                            <i className="fa-solid fa-chevron-right tw-text-xs tw-mr-3"></i>
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="tw-basis-1/6">
                        <div className="tw-p-4">
                            <h3 className="tw-font-medium tw-mt-4 tw-mb-3" style={{ color: theme.palette.text.secondary }}>Information</h3>
                            <ul className="tw-list-none tw-mt-4">
                                {['Start here', 'Blogs', 'About us', 'Contact Us', 'Career', 'Courses'].map((info, index) => (
                                    <li key={index}>
                                        <a href="#" className="tw-text-sm" style={{ color: theme.palette.text.primary }}>
                                            <i className="fa-solid fa-chevron-right tw-text-xs tw-mr-3"></i>
                                            {info}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="tw-basis-2/6">
                        <div className="tw-p-4">
                            <h3 className="tw-font-medium tw-mt-4 tw-mb-3" style={{ color: theme.palette.text.secondary }}>Sign up for our newsletter</h3>
                            <p className="tw-text-sm">
                                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut odit magnam officia sequi aliquid facere corporis dolorem beatae? Dolore pariatur illo odio nulla atque quibusdam dicta ut tempore, suscipit est.
                            </p>
                            <p className="tw-mt-4 tw-relative">
                                <input
                                    style={{border: `1px solid ${theme.palette.text.primary}` }}
                                    type="email"
                                    placeholder="Your e-mail"
                                    className="tw-w-full tw-p-3 tw-pl-5 tw-rounded-full tw-text-gray-700 tw-placeholder:text-gray-700"
                                />
                                <span className="tw-absolute tw-top-1 tw-right-2 tw-bg-red-600 tw-px-5 tw-p-2 tw-rounded-full tw-uppercase" style={{ backgroundColor: theme.palette.primary.main }}>
                                    Subscribe
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tw-text-center tw-mt-4">
                    &copy; 2022 All rights reserved.
                </div>
                <div>
                    <a
                        id="scroll-to-top"
                        href="#top"
                        className="tw-transition tw-hidden tw-shadow tw-bottom-1 tw-right-1 tw-w-14 tw-h-14 tw-rounded-[50%] tw-bg-red-600 tw-hover:opacity-80 tw-z-50 tw-border tw-group"
                        style={{ backgroundColor: theme.palette.primary.main }}
                    >
                        <i className="fa-solid fa-arrow-up tw-transition tw-pt-5 tw-pl-5 tw-text-white tw-group-hover:-translate-y-2"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
