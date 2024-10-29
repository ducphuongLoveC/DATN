
import clsx from 'clsx';
import s from './PostOverview.module.scss';

import { Link } from 'react-router-dom';
const PostOverview : React.FC = () => {

  
  const articles = [
    {
      imgSrc: 'images/baiviet-img3.jpg',
      title: 'Mình đã làm thế nào để hoàn thành một website chỉ trong 15 ngày',
      date: '23/02/24',
      comments: '3 bình luận',
      description:
        'Trong quá trình mình code thì mình đã nảy sinh ra những ý tưởng...',
      tags: ['Web Development', 'React'],
    },
    {
      imgSrc: 'images/baiviet-img3.jpg',
      title: 'Làm thế nào để xây dựng ứng dụng React hiệu quả',
      date: '25/03/24',
      comments: '5 bình luận',
      description:
        'Xây dựng một ứng dụng React hiệu quả cần chú ý đến các yếu tố như...',
      tags: ['React', 'JavaScript'],
    },
    {
      imgSrc: 'images/baiviet-img3.jpg',
      title: 'Các mẹo tăng tốc phát triển front-end',
      date: '10/04/24',
      comments: '2 bình luận',
      description:
        'Để tăng tốc phát triển front-end, bạn cần tập trung vào những điều sau...',
      tags: ['Frontend', 'CSS'],
    },
    {
      imgSrc: 'images/baiviet-img3.jpg',
      title: 'Hiểu sâu hơn về quản lý trạng thái trong React',
      date: '15/05/24',
      comments: '7 bình luận',
      description:
        'Quản lý trạng thái là một trong những yếu tố quan trọng trong ứng dụng React...',
      tags: ['React', 'State Management'],
    },
    {
      imgSrc: 'images/baiviet-img3.jpg',
      title: 'Làm việc với APIs trong ứng dụng JavaScript',
      date: '20/06/24',
      comments: '10 bình luận',
      description:
        'Tương tác với APIs là một kỹ năng quan trọng cho bất kỳ nhà phát triển front-end...',
      tags: ['API', 'JavaScript'],
    },
  ];




  return (
    <div className={clsx(s['main-baiviet'])}>
    
      <div className={clsx(s['main-baiviet-banner'])}>
        <img src="images/banner-baiviet.png" alt="" />
      </div>


      <div className={clsx(s['main-baiviet-boxs'])}>
        <div className={clsx(s['main-baiviet-box1'])}>
          <div className={clsx(s['main-baiviet-boxcon1'])}>
            <h3 className={clsx(s['main-baiviet-h3'])}>FTECH</h3>
          </div>
          <div className={clsx(s['main-baiviet-href'])}>
            <a href="">NEWS</a>
            <a href="">KHUYẾN MÃI</a>
            <a href="">ƯU ĐÃI KHI MUA KHÓA HỌC</a>
            <a href="">CHI TIẾT LỘ TRÌNH HỌC</a>
          </div>
        </div>
        <div className={clsx(s['main-baiviet-box2'])}>
          {articles.map((article, index) => (
            <div key={index} className={clsx(s['main-baiviet-item-wrapper'])}>
              <img
                className={clsx(s['main-baiviet-item'])}
                src={article.imgSrc}
                alt=""
              />
              <div className={clsx(s['main-baiviet-content'])}>
                <Link to="/news-detail">
                  {' '}
                  <h4>{article.title}</h4>
                </Link>
                <p>
                  <span>📅 {article.date}</span>
                  <span> 💬 {article.comments}</span>
                </p>
                <a href="">{article.description}</a>
                <div className={clsx(s['tags'])}>
                  {article.tags.map((tag, i) => (
                    <span key={i} className={clsx(s['tag'])}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostOverview;
