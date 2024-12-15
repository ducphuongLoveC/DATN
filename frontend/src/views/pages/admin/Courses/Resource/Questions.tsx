// import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
// import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
// import { useForm, Controller } from 'react-hook-form';

// import TextEditor from '@/components/TextEditor';

// interface Quiz {
//   _id?: string;
//   resource_id?: string;
//   question: string;
//   options: { A: string; B: string; C: string; D: string };
//   correctAnswer: string;
//   hint: string;
// }

// const QuizCreation: React.FC = forwardRef(({ defaultValue }: any, ref) => {
//   console.log(defaultValue);

//   const [quizzes, setQuizzes] = useState<Quiz[]>(defaultValue?.questions || []);

//   const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

//   const { control, reset, getValues, setValue } = useForm<Quiz>({
//     defaultValues: {},
//   });

//   const handleQuestion = () => {
//     const cloneQuizzes = [...quizzes];
//     const currentQuiz = getValues();

//     // Remove `_id` and `resource_id` for new quizzes if they are not already defined
//     if (!cloneQuizzes[currentQuizIndex]?._id) {
//       delete currentQuiz._id;
//       delete currentQuiz.resource_id;
//     }

//     cloneQuizzes[currentQuizIndex] = currentQuiz;
//     setQuizzes(cloneQuizzes);
//     reset();
//     setCurrentQuizIndex((pre) => pre + 1);
//   };

//   const handleNextQuiz = () => {
//     if (currentQuizIndex < quizzes.length) {
//       setCurrentQuizIndex((pre) => pre + 1);
//     }
//   };

//   const handlePreQuiz = () => {
//     if (currentQuizIndex > 0) {
//       setCurrentQuizIndex((pre) => pre - 1);
//     }
//   };

//   const handleRemoveQuiz = () => {
//     const cloneQuizzes = [...quizzes];
//     // Remove quiz at current index
//     cloneQuizzes.splice(currentQuizIndex, 1);

//     // If we removed the last quiz, go to the previous one, else stay on the current index
//     setQuizzes(cloneQuizzes);
//     setCurrentQuizIndex((prevIndex) => {
//       // Adjust index after deletion
//       if (cloneQuizzes.length === 0) {
//         return 0; // If no quizzes left, set index to 0
//       } else if (prevIndex >= cloneQuizzes.length) {
//         return cloneQuizzes.length - 1;
//       }
//       return prevIndex;
//     });
//   };

//   useEffect(() => {
//     const currentQuiz = quizzes[currentQuizIndex];
//     if (!currentQuiz) {
//       setValue('question', '');
//       setValue('correctAnswer', '');
//       setValue('options.A', '');
//       setValue('options.B', '');
//       setValue('options.C', '');
//       setValue('options.D', '');
//     } else {
//       reset(currentQuiz);
//     }
//   }, [currentQuizIndex]);

//   console.log(defaultValue);
  

//   const getData = () => {
//     return { _id: defaultValue._id, questions: quizzes, duration: 0, resource_type: 'Question' };
//   };

//   useImperativeHandle(ref, () => ({
//     getData,
//   }));

//   return (
//     <Box>
//       <Box mb={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
//         <Typography variant="h4">Thêm câu quiz thứ {currentQuizIndex + 1}</Typography>
//         <Button
//           variant="outlined"
//           color="error" // Red color for delete button
//           onClick={handleRemoveQuiz}
//         >
//           Xóa câu hỏi
//         </Button>
//       </Box>

//       <Controller
//         name="question"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextEditor {...field} initialValue="Câu hỏi?" />}
//       />

//       <Controller
//         name="options.A"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án A" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="options.B"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án B" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="options.C"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án C" variant="outlined" margin="normal" />}
//       />
//       <Controller
//         name="options.D"
//         control={control}
//         defaultValue=""
//         render={({ field }) => <TextField {...field} fullWidth label="Đáp án D" variant="outlined" margin="normal" />}
//       />

//       <Controller
//         name="correctAnswer"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Đáp án đúng</InputLabel>
//             <Select {...field} label="Đáp án đúng">
//               <MenuItem value="A">A</MenuItem>
//               <MenuItem value="B">B</MenuItem>
//               <MenuItem value="C">C</MenuItem>
//               <MenuItem value="D">D</MenuItem>
//             </Select>
//           </FormControl>
//         )}
//       />
//       <Controller
//         name="hint"
//         control={control}
//         defaultValue=""
//         render={({ field }) => (
//           <TextField {...field} fullWidth label="Gợi í khi người dùng trả lời sai" variant="outlined" margin="normal" />
//         )}
//       />
//       <Box>
//         <Button sx={{ my: 2 }} fullWidth variant="outlined" onClick={handleQuestion}>
//           Lưu quiz
//         </Button>
//       </Box>

//       {/* Các nút điều hướng */}
//       <Box display={'flex'} justifyContent={'space-between'}>
//         <Button disabled={currentQuizIndex === 0} variant="outlined" onClick={handlePreQuiz}>
//           Câu trước
//         </Button>
//         <Button disabled={currentQuizIndex === quizzes.length} variant="outlined" onClick={handleNextQuiz}>
//           Câu tiếp theo
//         </Button>
//       </Box>
//     </Box>
//   );
// });

// export default QuizCreation;


import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';

import TextEditor from '@/components/TextEditor';

interface Quiz {
  _id?: string;
  resource_id?: string;
  question: string;
  options: { A: string; B: string; C: string; D: string };
  correctAnswer: string;
  hint: string;
}

const QuizCreation: React.FC = forwardRef(({ defaultValue }: any, ref) => {
  console.log(defaultValue);

  const [quizzes, setQuizzes] = useState<Quiz[]>(defaultValue?.questions || []);

  console.log(quizzes);

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);

  const {
    control,
    reset,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<Quiz>({
    defaultValues: {},
  });

  const handleQuestion = () => {
    const cloneQuizzes = [...quizzes];
    const currentQuiz = getValues();

    // Remove `_id` and `resource_id` for new quizzes if they are not already defined
    if (!cloneQuizzes[currentQuizIndex]?._id) {
      delete currentQuiz._id;
      delete currentQuiz.resource_id;
    }

    cloneQuizzes[currentQuizIndex] = currentQuiz;
    setQuizzes(cloneQuizzes);
    reset();
    setCurrentQuizIndex((pre) => pre + 1);
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length) {
      setCurrentQuizIndex((pre) => pre + 1);
    }
  };

  const handlePreQuiz = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex((pre) => pre - 1);
    }
  };

  const handleRemoveQuiz = () => {
    const cloneQuizzes = [...quizzes];
    // Remove quiz at current index
    cloneQuizzes.splice(currentQuizIndex, 1);

    // If we removed the last quiz, go to the previous one, else stay on the current index
    setQuizzes(cloneQuizzes);
    setCurrentQuizIndex((prevIndex) => {
      // Adjust index after deletion
      if (cloneQuizzes.length === 0) {
        return 0; // If no quizzes left, set index to 0
      } else if (prevIndex >= cloneQuizzes.length) {
        return cloneQuizzes.length - 1;
      }
      return prevIndex;
    });
  };

  useEffect(() => {
    const currentQuiz = quizzes[currentQuizIndex];
    if (!currentQuiz) {
      setValue('question', '');
      setValue('correctAnswer', '');
      setValue('options.A', '');
      setValue('options.B', '');
      setValue('options.C', '');
      setValue('options.D', '');
      setValue('hint', '');
    } else {
      reset(currentQuiz);
    }
  }, [currentQuizIndex]);

  const getData = () => {
    return { _id: defaultValue._id, questions: quizzes, duration: 0, resource_type: 'Question' };
  };

  useImperativeHandle(ref, () => ({
    getData,
  }));

  return (
    <Box>
      <Box mb={2} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
        <Typography variant="h4">Thêm câu quiz thứ {currentQuizIndex + 1}</Typography>
        <Button
          variant="outlined"
          color="error" // Red color for delete button
          onClick={handleRemoveQuiz}
        >
          Xóa câu hỏi
        </Button>
      </Box>

      <form onSubmit={handleSubmit(handleQuestion)}>
        <Controller
          name="question"
          control={control}
          rules={{ required: 'Câu hỏi không được để trống' }}
          render={({ field }) => <TextEditor {...field} initialValue="Câu hỏi?" />}
        />
        {errors.question && <Typography color="error">{errors.question.message}</Typography>}

        <Controller
          name="options.A"
          control={control}
          rules={{ required: 'Đáp án A không được để trống' }}
          render={({ field }) => <TextField {...field} fullWidth label="Đáp án A" variant="outlined" margin="normal" />}
        />
        {errors.options?.A && <Typography color="error">{errors.options.A.message}</Typography>}

        <Controller
          name="options.B"
          control={control}
          rules={{ required: 'Đáp án B không được để trống' }}
          render={({ field }) => <TextField {...field} fullWidth label="Đáp án B" variant="outlined" margin="normal" />}
        />
        {errors.options?.B && <Typography color="error">{errors.options.B.message}</Typography>}

        <Controller
          name="options.C"
          control={control}
          rules={{ required: 'Đáp án C không được để trống' }}
          render={({ field }) => <TextField {...field} fullWidth label="Đáp án C" variant="outlined" margin="normal" />}
        />
        {errors.options?.C && <Typography color="error">{errors.options.C.message}</Typography>}

        <Controller
          name="options.D"
          control={control}
          rules={{ required: 'Đáp án D không được để trống' }}
          render={({ field }) => <TextField {...field} fullWidth label="Đáp án D" variant="outlined" margin="normal" />}
        />
        {errors.options?.D && <Typography color="error">{errors.options.D.message}</Typography>}

        <Controller
          name="correctAnswer"
          control={control}
          rules={{ required: 'Vui lòng chọn đáp án đúng' }}
          defaultValue=''
          render={({ field }) => (
            <FormControl fullWidth margin="normal">
              <InputLabel>Đáp án đúng</InputLabel>
              <Select {...field} label="Đáp án đúng">
                <MenuItem value="A">A</MenuItem>
                <MenuItem value="B">B</MenuItem>
                <MenuItem value="C">C</MenuItem>
                <MenuItem value="D">D</MenuItem>
              </Select>
            </FormControl>
          )}
        />
        {errors.correctAnswer && <Typography color="error">{errors.correctAnswer.message}</Typography>}

        <Controller
          name="hint"
          control={control}
          rules={{ required: 'Gợi ý không được để trống' }}
          render={({ field }) => <TextField {...field} fullWidth label="Gợi ý" variant="outlined" margin="normal" />}
        />
        {errors.hint && <Typography color="error">{errors.hint.message}</Typography>}

        <Box>
          <Button sx={{ my: 2 }} fullWidth variant="outlined" type="submit">
            Lưu quiz
          </Button>
        </Box>
      </form>

      {/* Các nút điều hướng */}
      <Box display={'flex'} justifyContent={'space-between'}>
        <Button disabled={currentQuizIndex === 0} variant="outlined" onClick={handlePreQuiz}>
          Câu trước
        </Button>
        <Button disabled={currentQuizIndex === quizzes.length} variant="outlined" onClick={handleNextQuiz}>
          Câu tiếp theo
        </Button>
      </Box>
    </Box>
  );
});

export default QuizCreation;
