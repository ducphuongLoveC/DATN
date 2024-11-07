import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { rust } from '@codemirror/lang-rust';
import { go } from '@codemirror/lang-go';

const PracticeExercise = () => {
  const theme = useTheme();

  // Danh sách các bài tập lập trình với thông tin chi tiết
  const exercises = [
    {
      id: 1,
      title: 'Khai báo biến',
      description: 'Hãy khởi tạo 1 biến có kiểu dữ liệu là số nguyên, gán cho nó giá trị là 100 và in ra màn hình giá trị của biến đó.',
      expectedOutput: '100',
      requiredLanguage: 'cpp',
    },
    {
      id: 2,
      title: 'Điều kiện if-else',
      description: 'Viết một chương trình kiểm tra nếu số nhập vào lớn hơn 10 thì in ra "Lớn hơn 10", nếu không thì in ra "Nhỏ hơn hoặc bằng 10".',
      expectedOutput: 'Lớn hơn 10',
      requiredLanguage: 'javascript',
    },
    {
      id: 3,
      title: 'Vòng lặp for',
      description: 'Viết một vòng lặp for để in ra các số từ 1 đến 5.',
      expectedOutput: '1 2 3 4 5',
      requiredLanguage: 'python',
    },
  ];

  // Các biến trạng thái để lưu mã, đầu ra, bài tập đã chọn, và trạng thái đúng/sai của đáp án
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [showCheckResult, setShowCheckResult] = useState(false);
  const [selectedExercise, setSelectedExercise] = useState(exercises[0]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [startTime, setStartTime] = useState(Date.now());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    // Cập nhật thời gian bắt đầu mỗi khi bài tập thay đổi
    setStartTime(Date.now());
    setElapsedTime(0);
  }, [selectedExercise]);

  // Hàm kiểm tra đáp án
  const checkAnswer = () => {
    const timeTaken = Date.now() - startTime;
    setElapsedTime(timeTaken);
    setShowCheckResult(true);

    // Kiểm tra ngôn ngữ của mã
    if (selectedExercise.requiredLanguage !== getCurrentLanguage()) {
      setOutput(`Đầu ra không đúng! Vui lòng viết bằng ngôn ngữ ${selectedExercise.requiredLanguage.toUpperCase()}`);
      setIsCorrect(false);
      return;
    }

    // So sánh đầu ra dự kiến và đánh giá kết quả
    setOutput(code.includes(selectedExercise.expectedOutput) ? selectedExercise.expectedOutput : 'Đầu ra không đúng');
    setIsCorrect(code.includes(selectedExercise.expectedOutput));
  };

  // Chuyển sang bài tập tiếp theo
  const nextExercise = () => {
    const nextExerciseIndex = exercises.findIndex((ex) => ex.id === selectedExercise.id) + 1;
    if (nextExerciseIndex < exercises.length) {
      setSelectedExercise(exercises[nextExerciseIndex]);
      setCode('');
      setOutput('');
      setShowCheckResult(false);
      setIsCorrect(false);
      setStartTime(Date.now());
    }
  };

  // Xác định ngôn ngữ của bài tập hiện tại
  const getCurrentLanguage = () => {
    switch (selectedExercise.requiredLanguage) {
      case 'python':
        return 'python';
      case 'javascript':
        return 'javascript';
      case 'cpp':
        return 'cpp';
      case 'java':
        return 'java';
      case 'rust':
        return 'rust';
      case 'go':
        return 'go';
      default:
        return 'cpp';
    }
  };

  // Xác định phần mở rộng của ngôn ngữ cho CodeMirror
  const getLanguageExtension = () => {
    switch (selectedExercise.requiredLanguage) {
      case 'python':
        return python();
      case 'javascript':
        return javascript();
      case 'cpp':
        return cpp();
      case 'java':
        return java();
      case 'rust':
        return rust();
      case 'go':
        return go();
      default:
        return cpp();
    }
  };

  return (
    <div
      style={{ background: theme.palette.background.paper }}
      className="tw-flex tw-flex-col tw-h-svh lg:tw-flex-row tw-max-w-7xl tw-mx-auto tw-mt-10 tw-p-6 tw-bg-white tw-shadow tw-rounded-lg"
    >
      {/* Cột trái: Thông tin bài tập */}
      <div className="tw-flex-1 tw-p-4">
        <h1 className="tw-text-2xl tw-font-bold tw-mb-2">Thực hành lập trình</h1>
        <p className="tw-text-gray-600 tw-mb-4">Cập nhật tháng 3 năm 2023</p>
        <div className="tw-mb-4">
          <p className="tw-font-bold tw-mb-2">Bài tập {selectedExercise.id} trong {exercises.length}: {selectedExercise.title}</p>
          <p>{selectedExercise.description}</p>
        </div>
      </div>

      {/* Cột phải: Mã và kiểm tra đáp án */}
      <div className="tw-flex-1 tw-bg-gray-800 tw-rounded-lg tw-p-4 tw-text-white">
        <div className="tw-border-b tw-border-gray-600 tw-pb-2 tw-mb-2 tw-text-sm">
          {selectedExercise.requiredLanguage}.txt
        </div>
        <CodeMirror
          value={code}
          extensions={selectedExercise.requiredLanguage === 'ruby' ? [] : [getLanguageExtension()]}
          theme="dark"
          height='400px'
          onChange={(value) => setCode(value)}
        />
        <button
          onClick={checkAnswer}
          className="tw-bg-blue-500 hover:tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-mt-4"
        >
          KIỂM TRA
        </button>
        <div className="tw-mt-4">
          <p className="tw-text-lg">
            Đầu ra mong muốn:{' '}
            <span className="tw-bg-gray-700 tw-px-2 tw-py-1 tw-rounded">{selectedExercise.expectedOutput}</span>
          </p>
          <p className="tw-text-sm tw-text-gray-400 tw-mt-2">Thời gian làm bài: {elapsedTime / 1000} giây</p>
          {showCheckResult && (
            <div className={`tw-mt-4 ${isCorrect ? 'tw-text-green-500' : 'tw-text-red-500'}`}>Kết quả: {output}</div>
          )}
        </div>
        {isCorrect && (
          <button
            onClick={nextExercise}
            className="tw-bg-green-500 hover:tw-bg-green-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded tw-mt-4"
          >
            TIẾP TỤC
          </button>
        )}
      </div>
    </div>
  );
};

export default PracticeExercise;
