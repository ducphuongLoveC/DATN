import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';

const OTPInput: React.FC<{ length?: number; onComplete: (otp: string) => void }> = ({
  length = 6,
  onComplete,
}) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));

  const handleChange = (value: string, index: number) => {
    // Chỉ cho phép nhập nếu tất cả các ô trước đó đã được điền
    if (index > 0 && !otp[index - 1]) {
      return;
    }

    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Chỉ nhận ký tự cuối
    setOtp(updatedOtp);

    // Tự động gửi OTP khi đã nhập đủ
    if (index === length - 1 && value) {
      onComplete(updatedOtp.join(''));
      return;
    }

    // Tự động chuyển sang ô tiếp theo
    if (value && index < length - 1) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        (nextInput as HTMLInputElement).focus();
      }
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    // Chỉ cho phép quay lại nếu tất cả các ô trước đó đã được điền
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-input-${index - 1}`);
      if (prevInput) {
        (prevInput as HTMLInputElement).focus();
      }
    }
  };

  return (
    <Box display="flex" gap={0.5}>
      {Array.from({ length }).map((_, index) => (
        <TextField
          key={index}
          id={`otp-input-${index}`}
          value={otp[index]}
          onChange={(e) => handleChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          inputProps={{
            maxLength: 1,
            style: {
              fontSize: '1rem', // Giảm kích thước font
              width: '1.5rem', // Kích thước ô
              height: '1.5rem',
              textAlign: 'center',
            },
          }}
          variant="outlined"
        />
      ))}
    </Box>
  );
};

export default OTPInput;
