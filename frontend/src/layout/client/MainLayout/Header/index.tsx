import React from 'react';
import clsx from 'clsx';
import s from './Header.module.scss';
import { useTheme } from '@mui/material';

const Header: React.FC = () => {
    const theme = useTheme();
    return (
        <header
            className={`tw-bg-[${theme.palette.background.paper}] tw-mt-0 md:tw-mt-2 tw-rounded-md md:tw-text-left`}
        >
            <div
                className={clsx(
                    s['header'],
                    'container tw-mx-auto tw-py-10 md:tw-py-40 md:tw-bg-hero tw-bg-contain tw-bg-no-repeat tw-bg-[right_0px_top_10px]'
                )}
            >
                <h2 className="tw-text-4xl tw-mb-1 tw-pb-3 md:tw-pb-0">
                    Find a perfect
                </h2>
                <h2 className="tw-font-semibold tw-text-4xl tw-pb-3 md:tw-pb-0">
                    Online Course
                </h2>
                <p className="tw-text-gray-500 tw-my-3">
                    For only course, you need to learn Web Development
                </p>

                <form action="" method="get" className="tw-mt-4">
                    <div className="tw-flex tw-bg-white tw-items-center tw-p-4">
                        <div className="tw-basis-1/3 md:tw-basis-3/6 tw-relative">
                            <span className="tw-absolute tw-top-0.5 tw-left-4"></span>
                            <input
                                type="search"
                                className="tw-pl-12 md:tw-pl-16 tw-pr-2 tw-w-full tw-outline-none focus:tw-outline-none tw-font-thin"
                                placeholder="Search online courses"
                            />
                        </div>
                        <div className="tw-basis-1/3 md:tw-basis-2/6 tw-flex">
                            <div></div>
                            <div className="tw-flex-1">
                                <select
                                    name="category"
                                    id="category_id"
                                    className="tw-bg-white tw-text-gray-400 tw-font-thin tw-w-full"
                                >
                                    <option value="">Category</option>
                                    <option value="">Bootstrap</option>
                                </select>
                            </div>
                        </div>
                        <div className="tw-basis-1/3 md:tw-basis-1/6">
                            <button className="tw-transition tw-bg-red-500 tw-text-white tw-px-8 hover:tw-opacity-75 tw-rounded-full tw-p-3 tw-w-full tw-ml-3">
                                Search
                            </button>
                        </div>
                    </div>
                </form>

                <p className="tw-mt-6 tw-text-gray-600">
                    <strong>Popular Search: </strong>
                    <span className="tw-text-gray-400">
                        Designer, Developer, PHP
                    </span>
                </p>
            </div>
        </header>
    );
};

export default Header;
