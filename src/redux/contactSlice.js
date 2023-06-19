import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    fatchingInProcess(state) {
      state.isLoading = true;
    },
    fatchingSuccess(state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    fatchingError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    addContact(state, action) {
      const contact = {
        id: nanoid(6),
        name: action.payload.name,
        number: action.payload.number,
      };
      state.push(contact);
    },

    removeContact(state, action) {
      return state.filter(contact => contact.id !== action.payload);
    },
  },
});

export const {
  fatchingInProcess,
  fatchingSuccess,
  fatchingError,
  addContact,
  removeContact,
} = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
