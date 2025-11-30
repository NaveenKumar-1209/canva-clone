import { useEffect } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { 
  $getSelection, 
  $isRangeSelection,
  FORMAT_TEXT_COMMAND,
  SELECTION_CHANGE_COMMAND,
  COMMAND_PRIORITY_CRITICAL
} from 'lexical';
import { $patchStyleText } from '@lexical/selection';

/**
 * Custom Lexical Plugin for handling formatting commands from external toolbar
 * This plugin listens for custom events dispatched by the Toolbar component
 */
export default function LexicalFormattingPlugin({ elementId }) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Handler for bold formatting
    const handleBold = (event) => {
      if (event.detail.elementId === elementId) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
      }
    };

    // Handler for italic formatting
    const handleItalic = (event) => {
      if (event.detail.elementId === elementId) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
      }
    };

    // Handler for underline formatting
    const handleUnderline = (event) => {
      if (event.detail.elementId === elementId) {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
      }
    };

    // Handler for font family changes
    const handleFontFamily = (event) => {
      if (event.detail.elementId === elementId) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, {
              'font-family': event.detail.value
            });
          }
        });
      }
    };

    // Handler for font size changes
    const handleFontSize = (event) => {
      if (event.detail.elementId === elementId) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, {
              'font-size': `${event.detail.value}px`
            });
          }
        });
      }
    };

    // Handler for text color changes
    const handleColor = (event) => {
      if (event.detail.elementId === elementId) {
        editor.update(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            $patchStyleText(selection, {
              'color': event.detail.value
            });
          }
        });
      }
    };

    // Register event listeners
    window.addEventListener('lexical-format-bold', handleBold);
    window.addEventListener('lexical-format-italic', handleItalic);
    window.addEventListener('lexical-format-underline', handleUnderline);
    window.addEventListener('lexical-format-fontFamily', handleFontFamily);
    window.addEventListener('lexical-format-fontSize', handleFontSize);
    window.addEventListener('lexical-format-color', handleColor);

    // Cleanup
    return () => {
      window.removeEventListener('lexical-format-bold', handleBold);
      window.removeEventListener('lexical-format-italic', handleItalic);
      window.removeEventListener('lexical-format-underline', handleUnderline);
      window.removeEventListener('lexical-format-fontFamily', handleFontFamily);
      window.removeEventListener('lexical-format-fontSize', handleFontSize);
      window.removeEventListener('lexical-format-color', handleColor);
    };
  }, [editor, elementId]);

  // Track selection state and broadcast it
  useEffect(() => {
    return editor.registerCommand(
      SELECTION_CHANGE_COMMAND,
      () => {
        editor.getEditorState().read(() => {
          const selection = $getSelection();
          if ($isRangeSelection(selection)) {
            // Get current formatting state
            const isBold = selection.hasFormat('bold');
            const isItalic = selection.hasFormat('italic');
            const isUnderline = selection.hasFormat('underline');

            // Broadcast current formatting state
            window.dispatchEvent(new CustomEvent('lexical-selection-change', {
              detail: {
                elementId,
                isBold,
                isItalic,
                isUnderline
              }
            }));
          }
        });
        return false;
      },
      COMMAND_PRIORITY_CRITICAL
    );
  }, [editor, elementId]);

  return null;
}
