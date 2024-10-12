import { useTheme } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import { useState } from 'react';

interface TextEditorProps {
  exportContent: (content: string) => void;
  initialValue: string;
  preview?: boolean;
  value?: string;
  initialHeight?: string;
  mode?: 'basic' | 'advanced';
}
const TextEditor: React.FC<TextEditorProps> = ({
  exportContent,
  initialValue,
  preview = false,
  value,
  initialHeight,
  mode = 'basic',
}) => {
  const [content, setContent] = useState<string>('');
  const [savedContent, setSavedContent] = useState<string>('');

  const theme = useTheme(); 
  const handleEditorChange = (content: string) => {
    setContent(content);
  };

  const handleSave = () => {
    setSavedContent(content);
    console.log('Saved content:', content);
    exportContent(content);
  };

  // Configure TinyMCE settings based on mode
 
  const editorConfig = {
    height: initialHeight || '200px',
    branding: false,
    elementpath: false,
    menubar: mode === 'advanced',
    plugins:
      mode === 'basic'
        ? ['link', 'lists', 'autolink', 'codesample']
        : [
            'anchor',
            'autolink',
            'charmap',
            'codesample',
            'emoticons',
            'image',
            'link',
            'lists',
            'media',
            'searchreplace',
            'table',
            'visualblocks',
            'checklist',
            'mediaembed',
            'casechange',
            'export',
            'formatpainter',
            'pageembed',
            'a11ychecker',
            'tinymcespellchecker',
            'permanentpen',
            'powerpaste',
            'advtable',
            'advcode',
            'editimage',
            'advtemplate',
            'ai',
            'mentions',
            'tinycomments',
            'tableofcontents',
            'footnotes',
            'mergetags',
            'autocorrect',
            'typography',
            'inlinecss',
            'markdown',
          ],
    toolbar:
      mode === 'basic'
        ? 'undo redo | bold italic | bullist numlist | link | codesample'
        : 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'ducphuongdepzai',
    content_style: `
    `, // Corrected background color style without quotes
  };
  

  return (
    <div>
      <Editor
        apiKey="ueuhdxl8g56p7r2mgk3rlx89o4yvqsx093m5lui8g7e73h2b"
        init={editorConfig}
        value={value}
        initialValue={initialValue}
        onEditorChange={(content) => {
          handleEditorChange(content);
          exportContent(content);
        }}
      />

      {preview && (
        <>
          <div style={{ marginTop: '20px' }}>
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleSave}
            >
              Lưu nội dung
            </button>
          </div>
          <div>
            <h3>Content Preview:</h3>
            <div dangerouslySetInnerHTML={{ __html: savedContent }} />
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;
