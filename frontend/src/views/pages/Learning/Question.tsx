import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Button,
  CardActions,
  LinearProgress,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import style của Toastify

// Định nghĩa kiểu dữ liệu câu hỏi
interface Option {
  A: string;
  B: string;
  C: string;
  D: string;
}

interface Question {
  question: string;
  correctAnswer: string;
  options: Option;
  _id: string;
}

interface QuestionProps {
  questions: Question[];
}

const Question: React.FC<QuestionProps> = ({ questions }) => {
  // State quản lý câu hỏi hiện tại và câu trả lời đã chọn
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});

  // Hàm xử lý khi chọn đáp án
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: event.target.value,
    }));
  };

  // Hàm chuyển sang câu hỏi tiếp theo
  const nextQuestion = () => {
    // Kiểm tra đáp án người dùng chọn có đúng hay không
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      toast.success('Đáp án đúng! 🎉'); // Hiển thị thông báo khi trả lời đúng
    } else {
      toast.error('Đáp án sai! 😞'); // Hiển thị thông báo khi trả lời sai
    }

    // Chuyển sang câu hỏi tiếp theo nếu có
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Tính toán tiến độ
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Box sx={{ padding: 3, margin: 'auto' }}>
      <Typography variant="h2" mb={2}>Câu hỏi {currentQuestionIndex + 1}</Typography>
      {/* Tiến độ quiz */}
      <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 2 }} />

      {/* Câu hỏi */}
      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h6" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
        </CardContent>

        {/* Các lựa chọn trả lời */}
        <FormControl component="fieldset" sx={{ paddingLeft: 2 }}>
          <RadioGroup
            aria-label="question-options"
            name="question-options"
            value={answers[currentQuestionIndex] || ''}
            onChange={(event) => handleAnswerChange(event, currentQuestionIndex)}
          >
            {Object.entries(questions[currentQuestionIndex].options).map(([key, value]) => (
              <FormControlLabel key={key} value={key} control={<Radio />} label={value} sx={{ marginBottom: 1 }} />
            ))}
          </RadioGroup>
        </FormControl>
      </Card>

      {/* Chuyển sang câu tiếp theo */}
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button variant="outlined" onClick={nextQuestion} disabled={!answers[currentQuestionIndex]}>
          Câu tiếp theo
        </Button>
      </CardActions>

      {/* Hiển thị số câu hỏi còn lại */}
      <Typography variant="body2" color="textSecondary" align="center">
        Câu hỏi {currentQuestionIndex + 1} / {questions.length}
      </Typography>

      {/* Thêm ToastContainer để hiển thị thông báo */}
      <ToastContainer />
    </Box>
  );
};

export default Question;
