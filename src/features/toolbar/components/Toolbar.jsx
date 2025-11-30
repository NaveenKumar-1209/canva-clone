import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, updateElement } from '../../../store/presentationSlice';
import { Type, Bold, Italic, Underline, Plus } from 'lucide-react';

const Toolbar = () => {
  const dispatch = useDispatch();
  const { currentSlideId, selectedElementId, slides } = useSelector((state) => state.presentation);
  
  // Track active formatting states
  const [activeFormats, setActiveFormats] = useState({
    isBold: false,
    isItalic: false,
    isUnderline: false
  });
  
  const currentSlide = slides.find(s => s.id === currentSlideId);
  const selectedElement = currentSlide?.elements.find(e => e.id === selectedElementId);

  // Listen for selection changes from Lexical
  useEffect(() => {
    const handleSelectionChange = (event) => {
      if (event.detail.elementId === selectedElementId) {
        setActiveFormats({
          isBold: event.detail.isBold,
          isItalic: event.detail.isItalic,
          isUnderline: event.detail.isUnderline
        });
      }
    };

    window.addEventListener('lexical-selection-change', handleSelectionChange);
    return () => {
      window.removeEventListener('lexical-selection-change', handleSelectionChange);
    };
  }, [selectedElementId]);

  // Reset active formats when no element is selected
  useEffect(() => {
    if (!selectedElementId) {
      setActiveFormats({
        isBold: false,
        isItalic: false,
        isUnderline: false
      });
    }
  }, [selectedElementId]);

  const handleAddText = () => {
    const newElement = {
      id: `el-${Date.now()}`,
      type: 'text',
      content: 'Double click to edit',
      x: 100,
      y: 100,
      width: 300,
      height: 50,
      style: {
        fontSize: 24,
        fontFamily: 'Arial',
        fontWeight: 'normal',
        fontStyle: 'normal',
        textDecoration: 'none',
        color: '#000000',
      },
    };
    dispatch(addElement({ slideId: currentSlideId, element: newElement }));
  };

  const handleStyleChange = (key, value) => {
    if (!selectedElementId) return;
    
    // Map style keys to Lexical event names
    const eventMap = {
      fontFamily: 'lexical-format-fontFamily',
      fontSize: 'lexical-format-fontSize',
      color: 'lexical-format-color'
    };

    if (eventMap[key]) {
      // Dispatch custom event for Lexical formatting
      window.dispatchEvent(new CustomEvent(eventMap[key], {
        detail: { elementId: selectedElementId, value }
      }));
    }
  };

  const toggleStyle = (formatType) => {
    if (!selectedElementId) return;
    
    // Map format types to Lexical event names
    const eventMap = {
      bold: 'lexical-format-bold',
      italic: 'lexical-format-italic',
      underline: 'lexical-format-underline'
    };

    if (eventMap[formatType]) {
      // Dispatch custom event for Lexical formatting
      window.dispatchEvent(new CustomEvent(eventMap[formatType], {
        detail: { elementId: selectedElementId }
      }));
    }
  };

  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center px-6 shadow-sm z-30 justify-between">
      <div className="flex items-center space-x-4">
        <div 
            className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mr-4 cursor-pointer"
            onClick={() => window.location.href = '/'}
        >
          SlideCraft
        </div>
        <div className="h-8 w-px bg-gray-200 mx-2"></div>
      </div>

      <div className="flex items-center space-x-3 bg-gray-50 p-1.5 rounded-xl border border-gray-200">
        <select 
            className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer hover:bg-gray-200 rounded px-2 py-1.5 transition-colors"
            value={selectedElement?.style?.fontFamily || 'Arial'}
            onChange={(e) => handleStyleChange('fontFamily', e.target.value)}
            disabled={!selectedElementId}
        >
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Verdana">Verdana</option>
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
        </select>

        <div className="w-px h-5 bg-gray-300"></div>

        <input 
            type="number" 
            className="w-16 bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 text-center hover:bg-gray-200 rounded py-1.5 transition-colors"
            value={selectedElement?.style?.fontSize || 16}
            onChange={(e) => handleStyleChange('fontSize', parseInt(e.target.value))}
            disabled={!selectedElementId}
        />

        <div className="w-px h-5 bg-gray-300"></div>

        <div className="flex items-center space-x-1">
            <button 
                className={`p-2 rounded-lg transition-all ${activeFormats.isBold ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => toggleStyle('bold')}
                disabled={!selectedElementId}
                title="Bold (Ctrl+B)"
            >
                <Bold size={18} />
            </button>
            <button 
                className={`p-2 rounded-lg transition-all ${activeFormats.isItalic ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => toggleStyle('italic')}
                disabled={!selectedElementId}
                title="Italic (Ctrl+I)"
            >
                <Italic size={18} />
            </button>
            <button 
                className={`p-2 rounded-lg transition-all ${activeFormats.isUnderline ? 'bg-indigo-100 text-indigo-600' : 'text-gray-600 hover:bg-gray-200'}`}
                onClick={() => toggleStyle('underline')}
                disabled={!selectedElementId}
                title="Underline (Ctrl+U)"
            >
                <Underline size={18} />
            </button>
        </div>

        <div className="w-px h-5 bg-gray-300"></div>

         <div className="relative group">
            <div 
                className="w-8 h-8 rounded-full border border-gray-300 cursor-pointer shadow-sm" 
                style={{ backgroundColor: selectedElement?.style?.color || '#000000' }}
            />
            <input 
                type="color" 
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                value={selectedElement?.style?.color || '#000000'}
                onChange={(e) => handleStyleChange('color', e.target.value)}
                disabled={!selectedElementId}
            />
         </div>
      </div>
      
      <div className="w-32"></div> {/* Spacer for balance */}
    </div>
  );
};

export default Toolbar;
