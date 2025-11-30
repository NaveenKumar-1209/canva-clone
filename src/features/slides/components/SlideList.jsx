import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addSlide, deleteSlide, setCurrentSlide } from '../../../store/presentationSlice';
import { Plus, Trash2 } from 'lucide-react';

const SlideList = () => {
  const dispatch = useDispatch();
  const { slides, currentSlideId } = useSelector((state) => state.presentation);

  return (
    <div className="h-40 bg-gray-900 border-t border-gray-800 flex flex-row items-center overflow-x-auto custom-scrollbar z-20 shrink-0">
      <div className="flex items-center p-4 space-x-4 min-w-max">
        {/* Add Slide Button */}
        <div className="flex flex-col items-center justify-center space-y-2">
            <button 
                onClick={() => dispatch(addSlide())}
                className="w-12 h-12 bg-gray-800 text-gray-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center border border-gray-700 hover:border-indigo-500"
            >
                <Plus size={24} />
            </button>
            <span className="text-xs text-gray-500 font-medium">Add Slide</span>
        </div>

        <div className="w-px h-20 bg-gray-800 mx-2"></div>

        {slides.map((slide, index) => (
          <div 
            key={slide.id}
            className="relative group flex flex-col items-center space-y-2"
          >
            <div 
                className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-200 ease-in-out w-40 aspect-video bg-white
                    ${currentSlideId === slide.id 
                        ? 'ring-2 ring-indigo-500 shadow-lg shadow-indigo-900/40 scale-105' 
                        : 'hover:ring-2 hover:ring-gray-600 opacity-80 hover:opacity-100'}
                `}
                onClick={() => dispatch(setCurrentSlide(slide.id))}
            >
                <div className="w-full h-full flex items-center justify-center relative">
                    <span className="text-gray-200 font-bold text-2xl select-none">{index + 1}</span>
                    <div className={`absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors ${currentSlideId === slide.id ? 'bg-transparent' : ''}`} />
                </div>
            </div>

            <div className="flex justify-between items-center w-full px-1">
                <span className={`text-xs font-medium ${currentSlideId === slide.id ? 'text-indigo-400' : 'text-gray-500'}`}>
                    Page {index + 1}
                </span>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteSlide(slide.id));
                    }}
                    className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Slide"
                >
                    <Trash2 size={12} />
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideList;
