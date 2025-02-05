import React, { useState, useEffect } from 'react';
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
  Alert,
} from '@mui/material';
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Confetti from 'react-confetti';
import { useWindowSize } from '@react-hook/window-size';

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
  hint: string;
}

interface QuestionProps {
  onCompleted: () => void;
  questions: Question[];
}

const Question: React.FC<QuestionProps> = ({ questions, onCompleted }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [showHint, setShowHint] = useState(false);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [width, height] = useWindowSize(); // Get the window size for confetti

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>, questionIndex: number) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: event.target.value,
    }));
  };

  const submitAnswer = () => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedAnswer = answers[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      toast.success('Đáp án đúng! 🎉');
      setIsAnswerCorrect(true);
    } else {
      toast.error('Đáp án sai! 😞');
      setIsAnswerCorrect(false);
      setShowHint(true);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex === questions.length - 1) {
      setQuizCompleted(true);
      onCompleted();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowHint(false); // Reset hint for the next question
      setIsAnswerCorrect(false); // Reset answer correctness for the next question
    }
  };

  // Set timer for confetti display on quiz completion
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizCompleted) {
      timer = setTimeout(() => setQuizCompleted(false), 3000);
    }
    return () => clearTimeout(timer);
  }, [quizCompleted]);

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <Box sx={{ padding: 3, margin: 'auto' }}>
      <Typography variant="h2" mb={2}>
        Câu hỏi {currentQuestionIndex + 1}
      </Typography>
      <LinearProgress variant="determinate" value={progress} sx={{ marginBottom: 2 }} />

      <Card sx={{ marginBottom: 3 }}>
        <CardContent>
          <Typography variant="h4" dangerouslySetInnerHTML={{ __html: questions[currentQuestionIndex].question }} />
        </CardContent>

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

        {/* Display hint only after answer submission */}
        {showHint && (
          <Alert severity="info" sx={{ marginTop: 2 }}>
            Gợi ý: {questions[currentQuestionIndex].hint}
          </Alert>
        )}
      </Card>

      <CardActions sx={{ justifyContent: 'flex-end', p: 0 }}>
        {isAnswerCorrect ? (
          <Button sx={{ px: 10 }} variant="outlined" onClick={nextQuestion}>
            {currentQuestionIndex === questions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}
          </Button>
        ) : (
          <Button sx={{ px: 10 }} variant="outlined" onClick={submitAnswer} disabled={!answers[currentQuestionIndex]}>
            Trả lời
          </Button>
        )}
      </CardActions>

      <Typography variant="body2" color="textSecondary" align="center">
        Câu hỏi {currentQuestionIndex + 1} / {questions.length}
      </Typography>

      {/* Display confetti for 3 seconds when quiz is completed */}
      {quizCompleted && <Confetti width={width} height={height} />}

    </Box>
  );
};

export default Question;
