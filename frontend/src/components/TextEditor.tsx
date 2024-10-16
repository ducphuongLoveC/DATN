
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
  initialHeight,
  mode = 'basic',
}) => {
  const [content, setContent] = useState<string>('');

  const handleSave = (value: string) => {
    const styledContent = value
      .replace(
        /<ul>/g,
        '<ul style="list-style-type: disc !important; margin-left: 20px !important;">'
      )
      .replace(/<\/ul>/g, '</ul>')
      .replace(
        /<ol>/g,
        '<ol style="list-style-type: decimal !important; margin-left: 20px !important;">'
      )
      .replace(/<\/ol>/g, '</ol>')
      .replace(
        /<a /g,
        '<a style="color: blue !important; text-decoration: underline !important;" '
      )
      .replace(/<\/a>/g, '</a>')

    setContent(styledContent);
    exportContent(styledContent);
  };

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

    ai_request: (request: any, respondWith: any) =>
      respondWith.string(() =>
        Promise.reject('See docs to implement AI Assistant')
      ),
  };

  return (
    <div>
      <Editor
        apiKey="ueuhdxl8g56p7r2mgk3rlx89o4yvqsx093m5lui8g7e73h2b"
        init={editorConfig}
        initialValue={initialValue}
        onEditorChange={(content) => {
          handleSave(content);
        }}
      />
      {preview && (
        <>
          <div>
            <h5>Content Preview:</h5>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </>
      )}
    </div>
  );
};

export default TextEditor;





