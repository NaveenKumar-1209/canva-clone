import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateElement, selectElement } from '../../../store/presentationSlice';
import LexicalEditorWrapper from './LexicalEditorWrapper';

const TextElement = ({ element, slideId }) => {
  const dispatch = useDispatch();
  const isSelected = useSelector((state) => state.presentation.selectedElementId === element.id);
  const elementRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [initialSize, setInitialSize] = useState({ w: 0, h: 0 });
  const [resizeHandle, setResizeHandle] = useState(null);

  const [isEditing, setIsEditing] = useState(false);

  const handleMouseDown = (e) => {
    e.stopPropagation();
    dispatch(selectElement(element.id));
    if (!isEditing) {
        setIsDragging(true);
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialPos({ x: element.x, y: element.y });
    }
  };

  const handleResizeMouseDown = (e, handle) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeHandle(handle);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialSize({ w: element.width, h: element.height });
    setInitialPos({ x: element.x, y: element.y });
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        dispatch(updateElement({
          slideId,
          elementId: element.id,
          updates: {
            x: initialPos.x + dx,
            y: initialPos.y + dy
          }
        }));
      } else if (isResizing) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        let newWidth = initialSize.w;
        let newHeight = initialSize.h;
        let newX = initialPos.x;
        let newY = initialPos.y;

        if (resizeHandle.includes('e')) newWidth = initialSize.w + dx;
        if (resizeHandle.includes('s')) newHeight = initialSize.h + dy;
        if (resizeHandle.includes('w')) {
            newWidth = initialSize.w - dx;
            newX = initialPos.x + dx;
        }
        if (resizeHandle.includes('n')) {
            newHeight = initialSize.h - dy;
            newY = initialPos.y + dy;
        }

        dispatch(updateElement({
          slideId,
          elementId: element.id,
          updates: {
            width: Math.max(20, newWidth),
            height: Math.max(20, newHeight),
            x: newX,
            y: newY
          }
        }));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
      setResizeHandle(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragStart, initialPos, initialSize, resizeHandle, dispatch, slideId, element.id]);

  const handleEditorChange = (editorState) => {
     // Optional: Real-time updates if needed, but might be expensive for Redux
  };

  const handleEditorBlur = (event, editor) => {
      setIsEditing(false);
      const editorState = editor.getEditorState();
      const jsonString = JSON.stringify(editorState.toJSON());
      dispatch(updateElement({
        slideId,
        elementId: element.id,
        updates: { content: jsonString }
      }));
  };

  const handleDoubleClick = (e) => {
      e.stopPropagation();
      setIsEditing(true);
  };

  return (
    <div
      ref={elementRef}
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        border: isSelected ? '2px solid #3b82f6' : '1px dashed transparent',
        cursor: isDragging ? 'grabbing' : 'grab',
        ...element.style
      }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          cursor: isEditing ? 'text' : 'move',
          pointerEvents: isEditing ? 'auto' : 'none' 
        }}
        onMouseDown={(e) => {
            if (isEditing) {
                e.stopPropagation();
            }
        }} 
      >
        <LexicalEditorWrapper 
            initialContent={element.content} 
            onChange={handleEditorChange}
            onBlur={handleEditorBlur}
            isEditable={isEditing}
            elementId={element.id}
        />
      </div>

      {isSelected && !isEditing && (
        <>
            {/* Resize Handles */}
            {['nw', 'ne', 'sw', 'se'].map((h) => (
                <div
                    key={h}
                    onMouseDown={(e) => handleResizeMouseDown(e, h)}
                    className={`absolute w-3.5 h-3.5 bg-white border-2 border-blue-500 rounded-full z-20 shadow-sm
                        ${h === 'nw' ? '-top-1.5 -left-1.5 cursor-nw-resize' : ''}
                        ${h === 'ne' ? '-top-1.5 -right-1.5 cursor-ne-resize' : ''}
                        ${h === 'sw' ? '-bottom-1.5 -left-1.5 cursor-sw-resize' : ''}
                        ${h === 'se' ? '-bottom-1.5 -right-1.5 cursor-se-resize' : ''}
                    `}
                />
            ))}
        </>
      )}
    </div>
  );
};

export default TextElement;
