import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import s from './Footer.module.scss';
// ===============================|| FOOTER ||=============================== //

const Footer: React.FC = () => {
    const theme = useTheme(); // Lấy theme từ hook useTheme
    const downMD = useMediaQuery(theme.breakpoints.down('md')); // Sử dụng theme breakpoints
    return (
        <footer
            style={{
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                marginTop: '20px',
            }}
        >
            <div className="tw-container tw-mx-auto tw-px-5 tw-py-16">
                <div className="tw-flex tw-flex-col md:tw-flex-row">
                    <div className="tw-basis-2/6">
                        <div className="tw-p-5">
                            <img alt="logo-footer" className="tw-w-10" />
                            <div>
                                <h3
                                    className="tw-font-medium tw-mt-4 tw-mb-3"
                                    style={{
                                        color: theme.palette.text.secondary,
                                    }}
                                >
                                    Liên hệ với chúng tôi
                                </h3>
                                <div className="tw-text-sm">
                                    <h4 className="tw-mb-2">+0123456789</h4>
                                    <h4 className="tw-mb-2">email.com</h4>
                                    <h4 className="tw-mb-2">
                                        9AM- 5PM, Monday - Friday
                                    </h4>
                                    <h4 className="tw-mb-2">
                                        Nhà số 10, 379 Xuân Phương, Nam Từ Liêm,
                                        Hà Nội
                                    </h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="tw-basis-1/6">
                        <div className="tw-p-4">
                            <h3
                                className="tw-font-medium tw-mt-4 tw-mb-3"
                                style={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Các liên kết khác
                            </h3>
                            <ul className="tw-list-none tw-mt-4">
                                {[
                                    'Start here',
                                    'Blogs',
                                    'About us',
                                    'Contact Us',
                                    'Career',
                                    'Courses',
                                ].map((link, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="tw-text-sm"
                                            style={{
                                                color: theme.palette.text
                                                    .primary,
                                            }}
                                        >
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
                            <h3
                                className="tw-font-medium tw-mt-4 tw-mb-3"
                                style={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Sản phẩm
                            </h3>
                            <ul className="tw-list-none tw-mt-4">
                                {[
                                    'Start here',
                                    'Blogs',
                                    'About us',
                                    'Contact Us',
                                    'Career',
                                    'Courses',
                                ].map((info, index) => (
                                    <li key={index}>
                                        <a
                                            href="#"
                                            className="tw-text-sm"
                                            style={{
                                                color: theme.palette.text
                                                    .primary,
                                            }}
                                        >
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
                            <h3
                                className="tw-font-medium tw-mt-4 tw-mb-3"
                                style={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                Mạng xã hội
                            </h3>
                            <p className="tw-text-sm">
                                Lorem ipsum dolor, sit amet consectetur
                                adipisicing elit. Aut odit magnam officia sequi
                                aliquid facere corporis dolorem beatae? Dolore
                                pariatur illo odio nulla atque quibusdam dicta
                                ut tempore, suscipit est.
                            </p>
                            <p className="tw-mt-4 tw-relative">
                                <input
                                    style={{
                                        border: `1px solid ${theme.palette.background.paper2}`,
                                    }}
                                    type="email"
                                    placeholder="Email của bạn"
                                    className="tw-w-full tw-p-3 tw-pl-5 tw-rounded-full  tw-placeholder:text-gray-700"
                                />
                                <span
                                    className="tw-cursor-pointer tw-absolute tw-top-1 tw-right-2 tw-text-white tw-px-5 tw-p-2 tw-rounded-full tw-uppercase"
                                    style={{
                                        background: 'var(--color-primary)'
                                    }}
                                >
                                    Gửi ngay
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="tw-text-center tw-mt-4">
                    &copy; Đồ án tốt nghiệp by Duc Phuong
                </div>
                <div>
                    <a
                        id="scroll-to-top"
                        href="#top"
                        className="tw-transition tw-hidden tw-shadow tw-bottom-1 tw-right-1 tw-w-14 tw-h-14 tw-rounded-[50%] tw-bg-red-600 tw-hover:opacity-80 tw-z-50 tw-border tw-group"
                        style={{
                            backgroundColor: theme.palette.primary.main,
                        }}
                    >
                        <i className="fa-solid fa-arrow-up tw-transition tw-pt-5 tw-pl-5 tw-text-white tw-group-hover:-translate-y-2"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
