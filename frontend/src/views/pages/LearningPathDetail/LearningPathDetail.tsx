import styles from './LearningPathDetail.module.scss';
import nhapmonit from '@/assets/images/course/nhapmonit.png';
import htmlcsspro from '@/assets/images/course/htmlcsspro.png';
import responsive from '@/assets/images/course/responsive.png';
import javascript from '@/assets/images/course/javascript.png';
import jsAdvanced from '@/assets/images/course/js-advanced.png';
import unbutu from '@/assets/images/course/unbutu.png';
import nodejs from '@/assets/images/course/nodejs.png';

const LearningPathDetail = () => {
  return (
    <div className={styles.container}>
      <div className={styles.routeDetail}>
        <h2 className={styles.routeDetailTitle}>Lộ trình học Back-end</h2>
        <p className={styles.routeDetailSubtitle}>
          Hầu hết các websites hoặc ứng dụng di động đều có 2 phần là Front-end
          và Back-end. Front-end là phần giao diện người dùng nhìn thấy và có
          thể tương tác, đó chính là các ứng dụng mobile hay những website bạn
          đã từng sử dụng. Nhiệm vụ của lập trình viên Front-end là xây dựng các
          giao diện đẹp, dễ sử dụng và tối ưu trải nghiệm người dùng.
        </p>
        <p className={styles.routeDetailPrice}>
          Tại Việt Nam,{' '}
          <span className={styles.routeDetailPr}>lương trung bình</span> cho lập
          trình viên front-end vào khoảng 16.000.000đ/tháng.
        </p>
        <p className={styles.routeDetailCourse}>
          Dưới đây là các khóa học DevsHunt đã tạo ra dành cho bất cứ ai theo
          đuổi sự nghiệp trở thành một lập trình viên Front-end.
        </p>
        <div className={styles.routeDetailBuild}>
          <p className={styles.routeDetailDesc}>
            Các khóa học có thể chưa đầy đủ, DevsHunt vẫn đang nỗ lực hoàn thiện
            trong thời gian sớm nhất.
          </p>
        </div>
        <div className={styles.courseMain}>
          <h3 className={styles.routeDetailTitle}>1. Tìm hiểu về ngành IT</h3>
          <p className={styles.routeDetailSubtitle}>
            Để theo ngành IT - Phần mềm cần rèn luyện những kỹ năng nào? Bạn đã
            có sẵn tố chất phù hợp với ngành chưa? Cùng thăm quan các công ty IT
            và tìm hiểu về văn hóa, tác phong làm việc của ngành này nhé các
            bạn.
          </p>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={nhapmonit} alt="Nhập môn IT" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>Kiến Thức Nhập Môn IT</h3>
              <span className={styles.coursePrice}>Miễn phí</span>
              <p className={styles.courseDesc}>
                Để có cái nhìn tổng quan về ngành IT - Lập trình web các bạn nên
                xem các videos tại khóa này trước nhé.
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
        </div>
        <div className={styles.courseMain}>
          <h3 className={styles.routeDetailTitle}>2. HTML và CSS</h3>
          <p className={styles.routeDetailSubtitle}>
            Để học web Front-end chúng ta luôn bắt đầu với ngôn ngữ HTML và CSS.
            Đây là 2 ngôn ngữ có mặt trong mọi website trên internet. Trong khóa
            học này F8 sẽ chia sẻ từ những kiến thức cơ bản nhất. Sau khóa học
            này bạn sẽ tự làm được 2 giao diện websites là The Band và Shopee.
          </p>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={htmlcsspro} alt="HTML CSS Pro" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>HTML CSS PRO</h3>
              <div className={styles.coursePrice}>
                <del className={styles.courseOld}>2.500.000đ</del>
                <span className={styles.courseNew}>1.299.000đ</span>
              </div>
              <p className={styles.courseDesc}>
                Từ cơ bản tới chuyên sâu, thực hành 8 dự án, hàng trăm bài tập,
                trang hỏi đáp riêng, cấp chứng chỉ sau khóa học và mua một lần
                học mãi mãi.
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={responsive} alt="Responsive với Grid System" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>Responsive Với Grid System</h3>
              <span className={styles.coursePrice}>Miễn phí</span>
              <p className={styles.courseDesc}>
                Trong khóa này chúng ta sẽ học về cách xây dựng giao diện web
                responsive với Grid System, tương tự Bootstrap 4.
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
        </div>
        <div className={styles.courseMain}>
          <h3 className={styles.routeDetailTitle}>3. JAVASCRIPT</h3>
          <p className={styles.routeDetailSubtitle}>
            Với HTML, CSS bạn mới chỉ xây dựng được các websites tĩnh, chỉ bao
            gồm phần giao diện và gần như chưa có xử lý tương tác gì. Để thêm
            nhiều chức năng phong phú và tăng tính tương tác cho website bạn cần
            học Javascript.
          </p>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={javascript} alt="Lập trình JavaScript cơ bản" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>
                Lập Trình JavaScript Cơ Bản
              </h3>
              <span className={styles.coursePrice}>Miễn phí</span>
              <p className={styles.courseDesc}>
                Học Javascript cơ bản phù hợp cho người chưa từng học lập trình.
                Với hơn 100 bài học và có bài tập thực hành sau mỗi bài học.
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={jsAdvanced} alt="Lập trình JavaScript nâng cao" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>
                Lập Trình JavaScript Nâng Cao
              </h3>
              <span className={styles.coursePrice}>Miễn phí</span>
              <p className={styles.courseDesc}>
                Hiểu sâu hơn về cách Javascript hoạt động, tìm hiểu về IIFE,
                closure, reference types, this keyword, bind, call, apply,
                prototype, ...
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
        </div>
        <div className={styles.courseMain}>
          <h3 className={styles.routeDetailTitle}>4. Sử dụng Ubuntu/Linux</h3>
          <p className={styles.routeDetailSubtitle}>
            Cách làm việc với hệ điều hành Ubuntu/Linux qua Windows Terminal
            &amp; WSL. Khi đi làm, nhiều trường hợp bạn cần nắm vững các dòng
            lệnh cơ bản của Ubuntu/Linux.
          </p>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={unbutu} alt="Làm việc với Terminal và Ubuntu" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>
                Làm việc với Terminal &amp; Ubuntu
              </h3>
              <span className={styles.coursePrice}>Miễn phí</span>
              <p className={styles.courseDesc}>
                Sở hữu một Terminal hiện đại, mạnh mẽ trong tùy biến và học cách
                làm việc với Ubuntu là một bước quan trọng trên con đường trở
                thành một Web Developer.
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
        </div>
        <div className={styles.courseMain}>
          <h3 className={styles.routeDetailTitle}>
            5. Libraries &amp; Frameworks
          </h3>
          <p className={styles.routeDetailSubtitle}>
            Sau khi đã nắm vững về Javascript và có kiến thức tốt về lập trình
            web, đã đến lúc học về các Framework và Libraries, nơi giúp bạn tối
            ưu và tăng tốc quá trình xây dựng ứng dụng web.
          </p>
          <div className={styles.course}>
            <div className={styles.courseImg}>
              <img src={nodejs} alt="NodeJS" />
            </div>
            <div className={styles.courseInfor}>
              <h3 className={styles.courseTitle}>Node & ExpressJS</h3>
              <span className={styles.coursePrice}>Miễn phí</span>
              <p className={styles.courseDesc}>
                Học Back-end với Node & ExpressJS framework, hiểu các khái niệm
                khi làm Back-end và xây dựng RESTful API cho trang web.
              </p>
              <button className={styles.watch}>XEM KHÓA HỌC</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LearningPathDetail;
