import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import notificationReducer from './notificationSlice';
import themeReducer from './themeSlice';
import uiReducer from './uiSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationReducer,
    theme: themeReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['notifications/addNotification'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.timestamp'],
        // Ignore these paths in the state
        ignoredPaths: ['notifications.notifications']
      }
    })
});

export { store };
export default store;
