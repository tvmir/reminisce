import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../store';

// TODO: Add types
type LocationsState = {
  origin: any;
  destination: any;
  travelTime: any;
};

const initialState: LocationsState = {
  origin: null,
  destination: null,
  travelTime: null,
};

export const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTravelTime: (state, action) => {
      state.travelTime = action.payload;
    },
  },
});

export const { setOrigin, setDestination, setTravelTime } =
  locationsSlice.actions;

export const selectOrigin = (state: RootState) => state.locations.origin;
export const selectDestination = (state: RootState) =>
  state.locations.destination;
export const selectTravelTime = (state: RootState) =>
  state.locations.travelTime;

export default locationsSlice.reducer;
