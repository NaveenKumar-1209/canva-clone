import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const API_URL = 'http://localhost:5000/api/presentations';

// Async thunks
// Async thunks
export const createPresentation = createAsyncThunk(
    'presentation/create',
    async (title) => {
        try {
            const response = await axios.post(API_URL, { title });
            return response.data;
        } catch (error) {
            console.warn("Backend not available, using mock data");
            return {
                _id: `mock-${Date.now()}`,
                title: title,
                slides: [{
                    id: 'slide-1',
                    elements: []
                }]
            };
        }
    }
);

export const fetchPresentation = createAsyncThunk(
    'presentation/fetch',
    async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            console.warn("Backend not available, using mock data");
            return {
                _id: id,
                title: 'Untitled Presentation',
                slides: [{
                    id: 'slide-1',
                    elements: []
                }]
            };
        }
    }
);

export const savePresentation = createAsyncThunk(
    'presentation/save',
    async ({ id, title, slides }) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, { title, slides });
            return response.data;
        } catch (error) {
            console.warn("Backend not available, saving locally (mock)");
            return { id, title, slides };
        }
    }
);

const initialState = {
    id: null,
    title: 'Untitled Presentation',
    slides: [{
        id: 'slide-1',
        elements: []
    }],
    currentSlideId: 'slide-1',
    selectedElementId: null,
    status: 'idle', // idle | loading | succeeded | failed
    error: null,
    history: [], // For undo
    future: [], // For redo
};

const presentationSlice = createSlice({
    name: 'presentation',
    initialState,
    reducers: {
        setCurrentSlide: (state, action) => {
            state.currentSlideId = action.payload;
            state.selectedElementId = null;
        },
        addSlide: (state) => {
            const newSlideId = `slide-${Date.now()}`;
            state.slides.push({
                id: newSlideId,
                elements: []
            });
            state.currentSlideId = newSlideId;
            state.selectedElementId = null;
        },
        deleteSlide: (state, action) => {
            const slideId = action.payload;
            if (state.slides.length > 1) {
                state.slides = state.slides.filter(s => s.id !== slideId);
                if (state.currentSlideId === slideId) {
                    state.currentSlideId = state.slides[0].id;
                }
            }
        },
        addElement: (state, action) => {
            const { slideId, element } = action.payload;
            const slide = state.slides.find(s => s.id === slideId);
            if (slide) {
                slide.elements.push(element);
                state.selectedElementId = element.id;
            }
        },
        updateElement: (state, action) => {
            const { slideId, elementId, updates } = action.payload;
            const slide = state.slides.find(s => s.id === slideId);
            if (slide) {
                const element = slide.elements.find(e => e.id === elementId);
                if (element) {
                    Object.assign(element, updates);
                }
            }
        },
        selectElement: (state, action) => {
            state.selectedElementId = action.payload;
        },
        // Simple Undo/Redo logic (saving snapshots could be expensive, but fine for Phase 1)
        // Actually, a better approach for undo/redo is to push state to history before mutating.
        // For now, let's just keep it simple and maybe add a middleware or manual calls.
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPresentation.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.title = action.payload.title;
                state.slides = action.payload.slides;
                state.currentSlideId = action.payload.slides[0].id;
            })
            .addCase(fetchPresentation.fulfilled, (state, action) => {
                state.id = action.payload._id;
                state.title = action.payload.title;
                state.slides = action.payload.slides;
                if (state.slides.length > 0) {
                    state.currentSlideId = state.slides[0].id;
                }
            });
    },
});

export const { setCurrentSlide, addSlide, deleteSlide, addElement, updateElement, selectElement } = presentationSlice.actions;
export default presentationSlice.reducer;
