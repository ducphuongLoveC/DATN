import clsx from 'clsx';
import s from './Header.module.scss';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import { BiChevronLeft, BiListUl, BiSkipNext, BiSkipPrevious } from "react-icons/bi";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const Header = () => {
    return (
        <header className={clsx(s['header'])}>
            <nav>
                <div className={clsx(s['nav-space'])}>
                    <ul className={clsx(s['left'])}>
                        <li className='nav-item'>
                            <Link className={clsx(s['li'], 'nav-link')} to='#'> <BiChevronLeft fontSize={30} /> </Link>
                        </li>
                        <li className='nav-item'>
                            <Link className={clsx(s['li'], 'nav-link')} to='#'>Lập trình Javascript</Link>
                        </li>
                    </ul>
                    <ul className={clsx(s['right'])}>
                        <li className='nav-item'>
                            <Tippy content="Bài học trước">

                                <div style={{ width: 40, height: 40 }} className={clsx(s['li'])}>
                                    <CircularProgressbar styles={buildStyles({

                                        // Rotation of path and trail, in number of turns (0-1)
                                        rotation: 1,

                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                        strokeLinecap: 'butt',

                                        // Text size
                                        textSize: '25px',

                                        // How long animation takes to go from one percentage to another, in seconds
                                        pathTransitionDuration: 0.5,

                                        // Can specify path transition in more detail, or remove it entirely
                                        // pathTransition: 'none',

                                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                       
                                        // Colors
                                        pathColor: `rgba(62, 152, 199)`,
                                        textColor: '#ffffff',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7',
                                    })} value={50} text='100%' />
                                </div>
                            </Tippy>

                        </li>
                        <li className='nav-item'>
                            <Tippy content="Bài học trước">

                                <span className={clsx(s['li'], 'nav-link active')}><BiSkipNext fontSize={30} /></span>
                            </Tippy>

                        </li>
                        <li className='nav-item'>
                            <Tippy content="Bài học tiếp theo">

                                <span className={clsx(s['li'], 'nav-link active')}><BiSkipPrevious fontSize={30} /></span>
                            </Tippy>

                        </li>

                        <li className='nav-item'>
                            <Tippy content="Đóng mở menu">
                                <span className={clsx(s['li'], 'nav-link active')}>

                                    <BiListUl fontSize={30} />
                                </span>
                            </Tippy>
                        </li>
                    </ul>

                </div>
            </nav>
        </header>
    )
}
export default Header;