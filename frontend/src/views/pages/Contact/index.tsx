import React from 'react';
import clsx from 'clsx';
import s from './Contact.module.scss';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Contact: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);
  };

  return (
    <div className={clsx(s.main)}>
      <div className={clsx(s['main-contact-title'])}>
        <h3 className={clsx(s['contact-h3'])}>Liên hệ</h3>
        <span className={clsx(s['contact-span'])}>
          DevsHunt luôn lắng nghe và tiếp nhận mọi ý kiến đóng góp của bạn. Hãy
          liên hệ với chúng mình bằng cách điền thông tin vào form dưới đây.
          Chúng mình sẽ phản hồi bạn trong thời gian sớm nhất.
        </span>
      </div>
      <div className={clsx(s['main-contact-boxs'])}>
        <div className={clsx(s['main-contact-box1'])}>
          <div className={clsx(s['main-contact-box1-icons'])}>
            <div className={clsx(s['icon-wrapper'])}>
              <PhoneIcon />
              <span>Điện thoại: 123-456-7890</span>
            </div>
            <div className={clsx(s['icon-wrapper'])}>
              <LocationOnIcon />
              <span>
                Địa chỉ: Tòa nhà FPT Polytechnic, Xuân Phương, Nam Từ Liêm, Hà
                Nội
              </span>
            </div>
            <div className={clsx(s['icon-wrapper'])}>
              <EmailIcon />
              <span>Email: email.com</span>
            </div>
          </div>
          <div className={clsx(s['main-contact-box1-form'])}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="name">Họ và tên *</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Họ tên đầy đủ..."
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className={clsx(s.error)}>Vui lòng nhập họ tên.</span>
                )}
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  placeholder="Nhập email..."
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className={clsx(s.error)}>
                    Vui lòng nhập email hợp lệ.
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="phone">Điện thoại</label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="Nhập số điện thoại của bạn..."
                  {...register('phone', { required: true })}
                />
                {errors.phone && (
                  <span className={clsx(s.error)}>
                    Vui lòng nhập số điện thoại.
                  </span>
                )}
              </div>
              <div>
                <label htmlFor="message">Nội dung</label>
                <textarea
                  id="message"
                  placeholder="Nhập nội dung..."
                  {...register('message', { required: true })}
                />
                {errors.message && (
                  <span className={clsx(s.error)}>Vui lòng nhập nội dung.</span>
                )}
              </div>
              <Button className={clsx(s['button-send'])} type="submit">
                Gửi thông điệp
              </Button>
            </form>
          </div>
        </div>
        <div className={clsx(s['main-contact-box2'])}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3723.8038408857424!2d105.7442910279369!3d21.040533417394226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x313455e940879933%3A0xcf10b34e9f1a03df!2zVHLGsOG7nW5nIENhbyDEkeG6s25nIEZQVCBQb2x5dGVjaG5pYw!5e0!3m2!1svi!2s!4v1727749204759!5m2!1svi!2s"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
