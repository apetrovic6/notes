import {
  AnyAction,
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '@notes/store';

interface uiState {
  sidebarOpen: boolean;
}

// Define the initial state using that type
const initialState: uiState = {
  sidebarOpen: true,
};

function isAction(action: AnyAction): action is PayloadAction {
  return typeof action === 'undefined';
}

export const toggleSidebar = createAction('ui/toggleSidebar');

export const uiReducer = createReducer(initialState, builder =>
  builder
    .addCase(toggleSidebar, state => {
      state.sidebarOpen = !state.sidebarOpen;
    })
    .addMatcher(isAction, (state, action) => {})
    .addDefaultCase(() => initialState)
);

export const selectUi = (state: RootState) => state.ui;
