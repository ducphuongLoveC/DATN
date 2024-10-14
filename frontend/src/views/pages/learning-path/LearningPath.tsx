import styles from './Course.module.scss';
import imgLanguage from '@/assets/images/course/iimg-langage.png'
import VideoProcose from '@/assets/video/video-propose.mp4';
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
              <span className={styles.course__option}>
                Hãy chọn hướng đi mà bạn mong muốn:
              </span>
              <div className={styles.course__box}>
                {posts.map((item) => (
                  <div className={styles.backend} key={item.id}>
                    <div className={styles.backend__img}>
                      <img src={imgLanguage} alt="" />
                      <span className={styles.backend__name}>{item.title}</span>
                      <div className={styles.backend__details}>
                        <p>
                          {item.description}
                        </p>
                        <button className={styles.view}>
                          <Link to={`/learning-path/${item.path}`}>Xem ngay</Link>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.course__group}>
              <div className={styles.course__heading}>
                <h3 className={styles.title1}>
                  Tham gia cộng đồng học viên Dev trên Facebook
                </h3>
                <span className={styles.subtitle}>
                  Hàng nghìn người khác đang học lộ trình giống như <br />
                  bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau <br />
                  trong quá trình học nhé.
                </span>
              </div>
              <button className={styles.btn}>Tham gia ngay</button>
            </div>
          </div>
          <div className={styles.propose}>
            <h2 className={styles.propose__title}>Đề xuất</h2>
            <div className={styles.propose__video}>
              <video src={VideoProcose} controls></video>
            </div>
            <span className={styles.subtitle}>
              Giới thiệu sơ lượt về khóa học, những điều <br /> cần chú tâm khi
              bắt đầu với con đường học <br /> lập trình.
            </span>
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
