import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    mobileMenuOpen: false,
  },
  reducers: {
    openMobileMenu: (state) => { state.mobileMenuOpen = true; },
    closeMobileMenu: (state) => { state.mobileMenuOpen = false; },
    toggleMobileMenu: (state) => { state.mobileMenuOpen = !state.mobileMenuOpen; },
  },
});

export const { openMobileMenu, closeMobileMenu, toggleMobileMenu } = uiSlice.actions;
export const uiReducer = uiSlice.reducer;