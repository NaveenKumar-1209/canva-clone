import React, { useEffect } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { $createParagraphNode, $createTextNode, $getRoot, BLUR_COMMAND, COMMAND_PRIORITY_NORMAL } from 'lexical';
import theme from '../theme';
import LexicalFormattingPlugin from './LexicalFormattingPlugin';
import ShadowDOMWrapper from './ShadowDOMWrapper';

const themeConfig = {
  namespace: 'MyEditor',
  theme,
  onError(error) {
    console.error(error);
  },
};

function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

function OnBlurPlugin({ onBlur }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    return editor.registerCommand(
      BLUR_COMMAND,
      (payload) => {
        onBlur(payload, editor);
        return false;
      },
      COMMAND_PRIORITY_NORMAL
    );
  }, [editor, onBlur]);
  return null;
}

function UpdateEditablePlugin({ isEditable }) {
  const [editor] = useLexicalComposerContext();
  useEffect(() => {
    editor.setEditable(isEditable);
  }, [editor, isEditable]);
  return null;
}

export default function LexicalEditorWrapper({ initialContent, onChange, onBlur, isEditable = true, elementId }) {
  const initialConfig = {
    ...themeConfig,
    editable: isEditable,
    editorState: (editor) => {
      if (initialContent) {
        try {
          const parsed = editor.parseEditorState(initialContent);
          editor.setEditorState(parsed);
        } catch (e) {
          // If parsing fails, assume it's plain text
          editor.update(() => {
            const root = $getRoot();
            const paragraph = $createParagraphNode();
            const text = $createTextNode(initialContent);
            paragraph.append(text);
            root.clear();
            root.append(paragraph);
          });
        }
      }
    },
  };

  return (
    <ShadowDOMWrapper className="h-full w-full">
      <LexicalComposer initialConfig={initialConfig}>
        <div className="editor-container relative h-full w-full">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input h-full w-full outline-none p-2" />}
            placeholder={<div className="editor-placeholder absolute top-2 left-2 text-gray-400 pointer-events-none">Enter text...</div>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
          <MyCustomAutoFocusPlugin />
          <UpdateEditablePlugin isEditable={isEditable} />
          <OnChangePlugin onChange={onChange} />
          {onBlur && <OnBlurPlugin onBlur={onBlur} />}
          {elementId && <LexicalFormattingPlugin elementId={elementId} />}
        </div>
      </LexicalComposer>
    </ShadowDOMWrapper>
  );
}
