import { useState } from 'react';
import clsx from 'clsx';
import s from './PostDetail.module.scss';
import { CiBookmark } from 'react-icons/ci';
import { IoIosMore } from 'react-icons/io';
import { CiHeart } from 'react-icons/ci';
import HeadlessTippy from '@tippyjs/react/headless';
import Wrapper from '@/components/Wrapper';
import { useTheme } from '@mui/material';
import {
  FaEnvelope,
  FaFacebookF,
  FaFlag,
  FaLink,
  FaTwitter,
} from 'react-icons/fa6';
const PostDetail = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const theme = useTheme();

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  return (
    <div className={clsx(s['main-post-detail'])}>
      <div className={clsx(s['main-post-detail-box'])}>
        <h1 className={clsx(s['main-post-detail-h1'])}>
          Hoàng Bảo Trung - Học viên tiêu biểu của F8 tỏa sáng với dự án "AI
          Powered Learning"
        </h1>
        <div className={clsx(s['div-header-post'])}>
          <div className={clsx(s['center'])}>
            <div className={clsx(s['div-user-post'])}>
              <img src="images/avatar-baiviet.jpg" alt="" />
            </div>
            <div className={clsx(s['div-info-user'])}>
              <span className={clsx(s['span-name'])}>Admin</span>
              <p className={clsx(s['p-time'])}>12 ngày trước</p>
            </div>
          </div>

          <div className={clsx(s['div-icons'])}>
            <CiBookmark
              className={clsx(s['icon-bookmark'], {
                [s['bookmarked']]: isBookmarked,
              })}
              onClick={toggleBookmark}
              style={{ fill: isBookmarked ? 'orangered' : 'black' }}
            />
            <HeadlessTippy
              trigger="click"
              placement="bottom-end"
              interactive
              allowHTML
              render={(attrs) => (
                <Wrapper
                  style={{
                    background: theme.palette.background.paper,
                    width: '230px',
                    maxHeight: '70vh',
                    overflow: 'auto',
                    padding: '10px',
                  }}
                  {...attrs}
                >
                  <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <FaFacebookF
                        style={{ marginRight: '8px', width: '14px' }}
                      />
                      <span className={clsx(s['span-more'])}>
                        Chia sẻ lên Facebook
                      </span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <FaTwitter
                        style={{ marginRight: '8px', width: '14px' }}
                      />
                      <span className={clsx(s['span-more'])}>
                        Chia sẻ lên Twitter
                      </span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <FaEnvelope
                        style={{ marginRight: '8px', width: '14px' }}
                      />
                      <span className={clsx(s['span-more'])}>
                        Chia sẻ tới Email
                      </span>
                    </li>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '10px',
                      }}
                    >
                      <FaLink style={{ marginRight: '8px', width: '14px' }} />
                      <span className={clsx(s['span-more'])}>
                        Sao chép liên kết
                      </span>
                    </li>
                    <li style={{ display: 'flex', alignItems: 'center' }}>
                      <FaFlag style={{ marginRight: '8px', width: '14px' }} />
                      <span className={clsx(s['span-more'])}>
                        Báo cáo bài viết
                      </span>
                    </li>
                  </ul>
                </Wrapper>
              )}
            >
              <span>
                <IoIosMore className={clsx(s['icon-more'])} />
              </span>
            </HeadlessTippy>
          </div>
        </div>
        <p>
          Trong thời đại công nghệ số 4.0, việc học không còn bó buộc trong
          những cuốn sách truyền thống. Giờ đây, trí tuệ nhân tạo (AI) đang dần
          trở thành một trợ thủ đắc lực, giúp việc học trở nên hiệu quả và thú
          vị hơn. Một minh chứng rõ ràng cho sự chuyển mình này chính là câu
          chuyện của Hoàng Bảo Trung – một học viên ưu tú của F8, người đã đạt
          giải Nhì tại cuộc thi "Grand Final Of Best Web Design 2024" với dự án
          sáng tạo "AI Powered Learning".
        </p>
        <img className={clsx(s['img-post'])} src="images/code.jpg" alt="" />
        <em>
          Bạn Hoàng Bảo Trung – Học viên của F8 đã đoạt giải Nhì cuộc thi "Grand
          Final Of Best Web Design 2024" với dự án sáng tạo "AI Powered
          Learning".
        </em>
        <p className={clsx(s['p-content'])}>
          Cuộc thi "Grand Final Of Best Web Design 2024" không chỉ đánh giá cao
          khả năng về công nghệ thiết kế mà còn yêu cầu kỹ năng lập trình web
          chuyên sâu. Trung và các thành viên trong nhóm đã gây ấn tượng mạnh mẽ
          với dự án mang tính đột phá: AI Powered Learning - một nền tảng học
          tập tích hợp chat và làm bài tập cùng AI. Dự án được hình thành từ
          chính sự thấu hiểu về nhu cầu học tập hiện đại – nơi mà học sinh, sinh
          viên không chỉ cần công cụ hỗ trợ học tập mà còn cần sự tương tác liên
          tục, không giới hạn thời gian.
        </p>
        <img className={clsx(s['img-post'])} src="images/code2.jpg" alt="" />
        <em>
          Đội thi đã xuất sắc giành giải Nhì trong cuộc thi Grand Final of Best
          Web Design 2024.
        </em>
        <p className={clsx(s['p-content'])}>
          Khi được hỏi về ý tưởng thực hiện làm dự án Trung có chia sẻ: "Dự án
          của nhóm mình tên là AI Powered Learning, đây là phần mềm tích hợp
          chat và làm bài tập cùng AI. Trang web này được tạo ra nhằm mục đích
          giúp các bạn học sinh và sinh viên có thể làm bài tập cùng AI, được AI
          chỉ dẫn như một người giáo viên thực thụ và luôn sẵn sàng giúp đỡ các
          bạn làm bài 24/7. Không chỉ dừng lại ở việc giúp các học sinh và sinh
          viên, AI Powered Learning còn giúp giáo viên ôn lại kiến thức cũ, tạo
          nên một môi trường học tập toàn diện và hiệu quả."
        </p>
        <p className={clsx(s['p-content'])}>
          Trong quá trình thực hiện dự án "AI Powered Learning" Trung và nhóm đã
          gặp phải không ít khó khăn, đặc biệt ở phần Frontend. Đây là một thách
          thức lớn khi thế mạnh của Trung ban đầu là lập trình C#, một ngôn ngữ
          chủ yếu dùng cho Backend. Tuy nhiên, nhờ những kiến thức và kỹ năng
          tích lũy từ các khóa học của F8, bạn đã nhanh chóng làm chủ được phần
          Frontend. Trung chia sẻ: "Mình xuất thân là học C# nhưng nhờ học các
          khóa F8 mà giờ mình có thể làm tốt được Frontend và được mọi người
          đánh giá rất cao, minh chứng là các danh hiệu ở các cuộc thi mà mình
          đã đạt được."
        </p>
        <p className={clsx(s['p-content'])}>
          Khi được hỏi về lý do chọn F8 để phát triển kỹ năng của mình, Trung
          nhấn mạnh: "Mình lựa chọn F8 vì F8 dạy cực kỳ chuyên nghiệp, có lộ
          trình rõ ràng. Cách truyền đạt lý thuyết và thực hành rất hay, và anh
          Sơn giảng bài làm mình thấy cuốn hút." Chính phương pháp học hiện đại
          và cách giảng dạy truyền cảm hứng từ đội ngũ F8 đã giúp Trung và nhóm
          rất nhiều trong quá trình tham gia cuộc thi.
        </p>
        ư
        <p className={clsx(s['p-content'])}>
          Dù chỉ có 7 ngày để hoàn thiện dự án, nhóm đã phải làm việc không
          ngừng nghỉ. Từ việc xây dựng sitemap, thiết kế giao diện đến thay đổi
          theme tới ba lần, tất cả đã diễn ra dưới áp lực thời gian gấp gáp. Dù
          phải thức đêm liên tục và khung thời gian khá hạn hẹp vì nhóm vẫn phải
          đi thực tập, nhưng những khó khăn ấy không thể làm mất đi tinh thần
          quyết tâm của cả nhóm. Trung hồi tưởng: "Chúng mình đã mất 2 ngày đầu
          để lên sitemap và thiết kế giao diện, sau đó thay đổi tới 3 lần theme
          trước khi chọn được giao diện phù hợp. Dù phải thức đêm liên tục và
          thời gian khá gấp rút vì nhóm vẫn phải đi thực tập, nhưng nhờ đó,
          chúng mình đã có những kỷ niệm rất đẹp khi cùng ăn, cùng ngủ và cùng
          code với nhau."
        </p>
        <img className={clsx(s['img-post'])} src="images/code3.jpg" alt="" />
        <em>
          Bảng vinh danh giải thưởng giải Nhì trong cuộc thi Grand Final of Best
          Web Design 2024.
        </em>
        <p className={clsx(s['p-content'])}>
          Chính từ những thử thách ấy, nhóm đã học được cách làm việc nhóm hiệu
          quả, vượt qua khó khăn và tiến bộ hơn từng ngày. Không chỉ dừng lại ở
          đây, những kinh nghiệm từ việc phải giải quyết các vấn đề về giao diện
          và hiệu suất trong thời gian ngắn sẽ là hành trang quý giá cho các
          thành viên của nhóm trong tương lai.
        </p>
        <p className={clsx(s['p-content'])}>
          Khi nói về những dự định sắp tới, Trung mong muốn tiếp tục phát triển
          bản thân trong lĩnh vực lập trình, bởi bạn hiểu rằng: "Trong ngành lập
          trình, nếu mình không liên tục học hỏi, mình sẽ nhanh chóng bị tụt
          hậu." Điều này thôi thúc Trung không ngừng cố gắng và nỗ lực. Ước mơ
          lớn nhất của bạn là được ra Hà Nội và gia nhập đội ngũ F8 – nơi đã
          truyền cho bạn niềm cảm hứng mạnh mẽ trong suốt quá trình học tập và
          làm việc.
        </p>
        <div className={clsx(s['div-bodyBottom'])}>
          <div className={clsx(s['div-wrapper'])}>
            <div className={clsx(s['div-btnReact'])}>
              <CiHeart />
              <span className={clsx(s['span-comment'])}>6</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
