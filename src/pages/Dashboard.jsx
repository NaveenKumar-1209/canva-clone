import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createPresentation } from '../store/presentationSlice';
import { Plus, Presentation } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [presentations, setPresentations] = useState([]);

  useEffect(() => {
    // Fetch presentations (Mocking for now as we might not have many)
    // In real app: axios.get('http://localhost:5000/api/presentations').then(...)
    const fetchPresentations = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/presentations/all'); // Need to implement this endpoint or just list recently created
            // Since we didn't implement 'list all' in backend yet, let's just show a "Create New" mostly
            // Or we can mock it from local storage if we had it.
            // Let's just stick to "Create New" for Phase 1 as per plan, but I'll add a dummy list.
            setPresentations([
                { _id: '1', title: 'Demo Presentation', updatedAt: new Date().toISOString() }
            ]);
        } catch (e) {
            console.log("Error fetching", e);
        }
    };
    fetchPresentations();
  }, []);

  const handleCreateNew = async () => {
    const result = await dispatch(createPresentation('Untitled Presentation'));
    if (createPresentation.fulfilled.match(result)) {
      navigate(`/editor/${result.payload._id}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Presentation className="text-indigo-600" />
            My Presentations
          </h1>
          <button
            onClick={handleCreateNew}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition-all shadow-lg hover:shadow-indigo-500/30 font-medium"
          >
            <Plus size={20} />
            Create New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Create New Card */}
          <div 
            onClick={handleCreateNew}
            className="aspect-video bg-white rounded-2xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all group"
          >
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform">
                <Plus size={24} />
            </div>
            <span className="mt-3 font-medium text-gray-600 group-hover:text-indigo-600">New Presentation</span>
          </div>

          {/* Presentation Cards */}
          {presentations.map((p) => (
            <div 
                key={p._id}
                onClick={() => navigate(`/editor/${p._id}`)} // This might fail if ID 1 doesn't exist in DB, but good for UI demo
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer group"
            >
                <div className="aspect-video bg-gray-100 flex items-center justify-center relative overflow-hidden">
                    <Presentation size={48} className="text-gray-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-gray-800 truncate">{p.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">Edited {new Date(p.updatedAt).toLocaleDateString()}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
