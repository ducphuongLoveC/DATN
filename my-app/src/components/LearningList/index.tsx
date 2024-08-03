// LearningList.tsx
import React from 'react';
import clsx from 'clsx';
import s from './LearningList.module.scss';
import { BiListUl } from "react-icons/bi";
import Accordion from './Accordion/index.tsx';

const LearningLists = [
    {
        title: 'Phần 1: Giới thiệu về JavaScript',
        children: [
            { title: 'JavaScript là gì?', path: '1' },
            { title: 'Lịch sử của JavaScript', path: '2' }
        ]
    },
    {
        title: 'Phần 2: Biến và kiểu dữ liệu',
        children: [
            { title: 'Khai báo biến', path: '3' },
            { title: 'Các kiểu dữ liệu cơ bản', path: '4' },
            { title: 'Toán tử trong JavaScript', path: '5' }
        ]
    },
    {
        title: 'Phần 3: Cấu trúc điều khiển',
        children: [
            { title: 'Câu lệnh điều kiện', path: '6' },
            { title: 'Vòng lặp', path: '' }
        ]
    },
    {
        title: 'Phần 4: Hàm trong JavaScript',
        children: [
            { title: 'Khai báo và sử dụng hàm', path: '7' },
            { title: 'Tham số và giá trị trả về', path: '8' },
            { title: 'Hàm mũi tên', path: '' }
        ]
    },
    {
        title: 'Phần 5: Mảng và đối tượng',
        children: [
            { title: 'Làm việc với mảng', path: '9' },
            { title: 'Làm việc với đối tượng', path: '10' }
        ]
    },
    {
        title: 'Phần 6: Lập trình hướng đối tượng',
        children: [
            { title: 'Class và object', path: '' },
            { title: 'Kế thừa', path: '' }
        ]
    },
    {
        title: 'Phần 7: Xử lý bất đồng bộ',
        children: [
            { title: 'Callback', path: '' },
            { title: 'Promises', path: '' },
            { title: 'Async/Await', path: '' }
        ]
    },
    {
        title: 'Phần 8: Làm việc với DOM',
        children: [
            { title: 'Chọn và thao tác với các phần tử DOM', path: '' },
            { title: 'Sự kiện DOM', path: '' }
        ]
    },
    {
        title: 'Phần 9: AJAX và Fetch API',
        children: [
            { title: 'Giới thiệu về AJAX', path: '' },
            { title: 'Sử dụng Fetch API', path: '' }
        ]
    },
    {
        title: 'Phần 10: Công cụ và thư viện',
        children: [
            { title: 'Sử dụng npm', path: '' },
            { title: 'Các thư viện phổ biến', path: '' }
        ]
    }
];

const LearningList: React.FC = () => {

    return (
        <div className={clsx('accordion', s['learning-list'])} id="accordionPanelsStayOpenExample">
            <header className={clsx(s['header-lists'])}>  <BiListUl fontSize={30} /> Nội dung khóa học của bạn</header>
            <div className={clsx(s['content-lists'])}>
                {
                    LearningLists.map((ll, i) => <Accordion onSendData={(path: string) => console.log(path)} key={i} datas={ll} />)
                }
            </div>
        </div>
    );
};

export default LearningList;
