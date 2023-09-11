import { createSlice } from '@reduxjs/toolkit';

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState: { 
    isSidebarOpen: false
  },
  reducers: {
    onToggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    }
  }
});

export const { 
  onToggleSidebar 
} = sidebarSlice.actions;
