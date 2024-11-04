import styles from './Course.module.scss';
import imgLanguage from '@/assets/images/course/iimg-langage.png';
import img3 from '../../../assets/images/course/image-3.png';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const LearningPath: React.FC = () => {
  interface Course {
    id: string;
    title: string;
    description: string;
    path: string;
  }
  const [posts, setPosts] = useState<Course[]>([]);
  const fetchPosts = async () => {
    try {
      const response = await fetch('http://localhost:3000/routes');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.course}>
            <div className={styles.course__heading}>
              <h2 className={styles.course__title}>Lộ trình học</h2>
              <span className={styles.course__subtitle}>
                Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: <br />
                Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình <br />
                "Front-end".
              </span>
            </div>
            <div className={styles.course__select}>
              <span className={styles.course__option}>Hãy chọn hướng đi mà bạn mong muốn:</span>
              <div className={styles.course__box}>
                {posts.map((item) => (
                  <div className={styles.card} key={item.id}>
                    <div className={styles.card__img}>
                      <img src={imgLanguage} alt="" />
                      <span className={styles.card__name}>{item.title}</span>
                      <div className={styles.card__details}>
                        <p>{item.description}</p>
                        <button className={styles.view}>
                          <Link to={`/${item.path}`}>Xem ngay</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.propose}>
            <h3 className={styles.propose__title}>Tin tức</h3>
            <div className={styles.propose__question}>
              <ul className={styles.propose__nav}>
                <li className={styles.propose__item}>Lập trình là gì?</li>
                <li className={styles.propose__item}>Kiến thức cần có cho người mới</li>
                <li className={styles.propose__item}>Học thế nào cho hiệu quả</li>
                <li className={styles.propose__item}>Ngôn ngữ lập trình là gì?</li>
                <li className={styles.propose__item}>Cách thức vận hành 1 trang web</li>
              </ul>
            </div>
            <div className={styles.propose__img}>
              <img src={img3} alt="Course" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPath;
