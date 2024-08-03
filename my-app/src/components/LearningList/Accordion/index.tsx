// Accordion.tsx
import React, { useState } from 'react';
import clsx from 'clsx';
import s from './Accordion.module.scss';

import { BiChevronDown, BiChevronUp, BiMoviePlay } from "react-icons/bi";

import { Link } from 'react-router-dom';

interface Child {
    title: string;
    path: string;
}

interface AccordionProps {
    onSendData: Function
    datas: {
        title: string;
        children: Child[];

    };
}

const Accordion: React.FC<AccordionProps> = ({ datas, onSendData = () => { } }) => {
    const [isShow, setIsShow] = useState<boolean>(false);

    const handleTogglerShow = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
        setIsShow((prev) => !prev);
    }

    const handleChildrenClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    }

    const handleSendPath = (path: string) => {
        onSendData(path);
    }

    return (
        <div onClick={handleTogglerShow} className={clsx(s['accordion-item'])}>
            <button className={clsx(s['button-header'])} type='button'>
                <div className={s['content-header']}>
                    {datas.title}
                    <div className={s['des']}>3/3 | 12:12:34</div>
                </div>
                <div className={clsx(s['icon'])}>
                    {isShow ? <BiChevronUp fontSize={30} /> : <BiChevronDown fontSize={30} />}
                </div>
            </button>
            <div onClick={handleChildrenClick} className={clsx(s['collapse-body'], isShow && s['show'])}>
                {datas.children.map((v, index) => (
                    <div onClick={() => handleSendPath(v.path)} key={index} className={clsx('accordion-body', s['content-list'])}>
                        <input type='checkbox' />
                        <span>{v.title}</span>
                        <div onClick={handleChildrenClick} >
                            <BiMoviePlay/>
                            <span className={s['des']}> 15:03</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Accordion;
