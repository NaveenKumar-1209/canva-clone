import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Toolbar from '../features/toolbar/components/Toolbar';
import SlideList from '../features/slides/components/SlideList';
import Canvas from '../features/editor/components/Canvas';
import PropertiesPanel from '../features/toolbar/components/PropertiesPanel';
import { fetchPresentation, savePresentation } from '../store/presentationSlice';

const Editor = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { title, slides } = useSelector((state) => state.presentation);

  useEffect(() => {
    if (id) {
        dispatch(fetchPresentation(id));
    }
  }, [id, dispatch]);

  // Auto-save
  useEffect(() => {
    if (id) {
      const timer = setTimeout(() => {
        dispatch(savePresentation({ id, title, slides }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [id, title, slides, dispatch]);

  return (
    <div className="h-screen flex flex-col bg-gray-100 text-gray-900 font-sans overflow-hidden">
      <Toolbar />
      <div className="flex-1 flex overflow-hidden">
        <PropertiesPanel />
        <div className="flex-1 flex flex-col overflow-hidden">
            <Canvas />
            <SlideList />
        </div>
      </div>
    </div>
  );
};

export default Editor;
