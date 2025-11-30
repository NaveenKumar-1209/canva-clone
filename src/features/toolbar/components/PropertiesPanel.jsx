import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addElement, updateElement } from '../../../store/presentationSlice';
import { Type, Layers, Move, Maximize } from 'lucide-react';

const PropertiesPanel = () => {
  const dispatch = useDispatch();
  const { currentSlideId, selectedElementId, slides } = useSelector((state) => state.presentation);
  
  const currentSlide = slides.find(s => s.id === currentSlideId);
  const selectedElement = currentSlide?.elements.find(e => e.id === selectedElementId);

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

  const handleUpdate = (key, value) => {
    if (!selectedElementId) return;
    dispatch(updateElement({
      slideId: currentSlideId,
      elementId: selectedElementId,
      updates: { [key]: parseInt(value) }
    }));
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 flex flex-col h-full z-20 shadow-sm">
      <div className="p-5 border-b border-gray-100">
        <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4">Insert</h2>
        <button 
          onClick={handleAddText}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-indigo-50 text-indigo-700 rounded-xl hover:bg-indigo-100 transition-all border border-indigo-200 font-medium"
        >
          <Type size={18} />
          <span>Add Text Box</span>
        </button>
      </div>

      {selectedElement && (
        <div className="p-5">
            <h2 className="font-bold text-gray-800 text-sm uppercase tracking-wide mb-4 flex items-center gap-2">
                <Move size={14} />
                Properties
            </h2>
            
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">X Position</label>
                        <input 
                            type="number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={Math.round(selectedElement.x)}
                            onChange={(e) => handleUpdate('x', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">Y Position</label>
                        <input 
                            type="number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={Math.round(selectedElement.y)}
                            onChange={(e) => handleUpdate('y', e.target.value)}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">Width</label>
                        <input 
                            type="number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={Math.round(selectedElement.width)}
                            onChange={(e) => handleUpdate('width', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 font-medium mb-1 block">Height</label>
                        <input 
                            type="number" 
                            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-1.5 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                            value={Math.round(selectedElement.height)}
                            onChange={(e) => handleUpdate('height', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default PropertiesPanel;
