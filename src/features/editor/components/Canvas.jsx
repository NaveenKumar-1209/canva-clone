import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextElement from './TextElement';
import { selectElement } from '../../../store/presentationSlice';

const Canvas = () => {
  const dispatch = useDispatch();
  const { slides, currentSlideId } = useSelector((state) => state.presentation);
  const currentSlide = slides.find((s) => s.id === currentSlideId);

  const handleCanvasClick = () => {
    dispatch(selectElement(null));
  };

  if (!currentSlide) return <div className="flex-1 flex items-center justify-center">No Slide Selected</div>;

  return (
    <div 
        className="flex-1 bg-gray-100 overflow-auto flex items-center justify-center p-12 relative custom-scrollbar"
        onClick={handleCanvasClick}
        style={{
            backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
            backgroundSize: '20px 20px'
        }}
    >
      <div
        className="bg-white shadow-2xl relative overflow-hidden transition-shadow duration-300"
        style={{
          width: '960px', // Standard 16:9 aspect ratio base
          height: '540px',
          minWidth: '960px',
          minHeight: '540px',
        }}
      >
        {currentSlide.elements.map((element) => (
          <TextElement key={element.id} element={element} slideId={currentSlide.id} />
        ))}
      </div>
    </div>
  );
};

export default Canvas;
