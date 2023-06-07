import { createSlice } from "@reduxjs/toolkit";

const initialStateValues = {
    vendor: null,
    newBooking: [],
    totalBooking: [],
    reviews: [],
};

const vendorSlice = createSlice({
    name: 'vendor',
    initialState: { value: initialStateValues },
    reducers: {
        setVendor: (state, action) => {
            state.vendor = action.payload
        },
        setNewBooking: (state, action) => {
            state.newBooking = action.payload
        },
        setTotalBooking: (state, action) => {
            state.totalBooking = action.payload
        },
        setReviews: (state, action) => {
            state.reviews = action.payload;
        }
    }
}) 

export const { setVendor, setNewBooking, setTotalBooking, setReviews } = vendorSlice.actions;
export default vendorSlice;