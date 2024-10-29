import  { useState, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Fade,
  Zoom,
  IconButton,
  Tooltip,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  Code as CodeIcon,
  AddCircleOutline as AddIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
} from '@mui/icons-material';

import { motion } from 'framer-motion';
import Editor, { loader } from '@monaco-editor/react';

loader.config({ paths: { vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.33.0/min/vs' } });

const problemTypes = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'csharp', label: 'C#' },
  { value: 'cpp', label: 'C++' },
  { value: 'html', label: 'HTML' },
  { value: 'css', label: 'CSS' },
];

const difficultyLevels = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export default function CreateCodePractice() {
    
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [codeTemplate, setCodeTemplate] = useState('// Start coding here...');
  const [difficulty, setDifficulty] = useState('easy');
  const [problemType, setProblemType] = useState('javascript');
  const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setCodeTemplate(getDefaultCodeTemplate(problemType));
  }, [problemType]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: '', output: '' }]);
  };

  const handleRemoveTestCase = (index: number) => {
    const newTestCases = testCases.filter((_, i) => i !== index);
    setTestCases(newTestCases);
  };

  const handleTestCaseChange = (index: number, field: 'input' | 'output', value: string) => {
    const newTestCases = [...testCases];
    newTestCases[index][field] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = () => {
    if (!title || !description || !codeTemplate || testCases.some((tc) => !tc.input || !tc.output)) {
      setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'error' });
      return;
    }

    const problemData = {
      title,
      description,
      codeTemplate,
      difficulty,
      problemType,
      testCases,
    };
    console.log('Problem created:', problemData);
    setSnackbar({ open: true, message: 'Problem created successfully!', severity: 'success' });
  };

  const getDefaultCodeTemplate = (type: string) => {
    switch (type) {
      case 'javascript':
        return 'function solution() {\n  // Your code here\n}';
      case 'python':
        return 'def solution():\n    # Your code here\n    pass';
      case 'java':
        return 'public class Solution {\n    public static void main(String[] args) {\n        // Your code here\n    }\n}';
      case 'csharp':
        return 'public class Solution {\n    public static void Main(string[] args) {\n        // Your code here\n    }\n}';
      case 'cpp':
        return '#include <iostream>\n\nint main() {\n    // Your code here\n    return 0;\n}';
      case 'html':
        return '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Your Title</title>\n</head>\n<body>\n    <!-- Your code here -->\n</body>\n</html>';
      case 'css':
        return '/* Your CSS code here */';
      default:
        return '// Start coding here...';
    }
  };

  return (
    <Box>
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Typography variant="h4" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
          <CodeIcon sx={{ mr: 2, fontSize: 40 }} />
          Create a New Coding Problem
        </Typography>
      </motion.div>

      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Problem Title"
              fullWidth
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Problem Description"
              fullWidth
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Problem Type</InputLabel>
              <Select value={problemType} onChange={(e) => setProblemType(e.target.value)} label="Problem Type">
                {problemTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth variant="outlined">
              <InputLabel>Difficulty</InputLabel>
              <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} label="Difficulty">
                {difficultyLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Code mẫu cho trước
            </Typography>
            <Paper sx={{bgcolor: 'background.default' }}>
              <Editor
                height="300px"
                language={problemType}
                value={codeTemplate}
                onChange={(value) => setCodeTemplate(value || '')}
                theme="vs-dark"
                options={{
                  fontSize: 14,
                  minimap: { enabled: true },
                  suggestOnTriggerCharacters: true,
                  quickSuggestions: true,
                }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Cases
            </Typography>
            {testCases.map((testCase, index) => (
              <Fade in={true} key={index}>
                <Paper elevation={2} sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label={`Input ${index + 1}`}
                        fullWidth
                        multiline
                        rows={1}
                        value={testCase.input}
                        onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <TextField
                        label={`Expected Output ${index + 1}`}
                        fullWidth
                        multiline
                        rows={1}
                        value={testCase.output}
                        onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Tooltip title="Xóa case">
                        <IconButton onClick={() => handleRemoveTestCase(index)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Paper>
              </Fade>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Zoom in={true}>
                <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddTestCase}>
                  Add Test Case
                </Button>
              </Zoom>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Zoom in={true}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<SaveIcon />}
                onClick={handleSubmit}
                sx={{ minWidth: 200 }}
              >
                Create Problem
              </Button>
            </Zoom>
          </Grid>
        </Grid>
      </Paper>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
