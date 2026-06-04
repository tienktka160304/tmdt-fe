import { configureStore, createSlice } from "@reduxjs/toolkit";
import favoriteReducer from "./favoriteSlice";
import loadingReducer from "./loadingSlice";

const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
};

const getCartKey = () => {
  const user = getCurrentUser();
  return user?.id ? `laptop_cart_user_${user.id}` : "laptop_cart_guest";
};

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem(getCartKey())) || [];
  } catch (error) {
    return [];
  }
};

const saveCart = (cart) => {
  localStorage.setItem(getCartKey(), JSON.stringify(cart));
};

const initialCart = loadCart();
const initialAuth = { popUp: false };
const initialPopup = { popUp: false, payload: [] };

const popupSlice = createSlice({
  name: "popup",
  initialState: initialPopup,

  reducers: {
    SHOW_POPUP(state, actions) {
      state.popUp = true;
      state.payload = actions.payload;
    },
    HIDDEN_POPUP(state) {
      state.popUp = false;
      state.payload = [];
    },
  },
});

const cartSlice = createSlice({
  name: "laptop_cart",
  initialState: initialCart,

  reducers: {
    LOAD_CART() {
      return loadCart();
    },

    ADD_CART(state, actions) {
      const { id, sl } = actions.payload;
      const existingItem = state.find((item) => item.id === id);

      let newState;

      if (existingItem) {
        newState = state.map((item) =>
          item.id === id ? { ...item, sl: item.sl + sl } : item,
        );
      } else {
        newState = [...state, { id, sl }];
      }

      saveCart(newState);
      return newState;
    },

    UPDATE_CART(state, actions) {
      const index = state.findIndex((item) => item.id === actions.payload.id);

      if (index !== -1) {
        state[index].sl = actions.payload.sl;
        saveCart(state);
      }
    },

    DELETE_CART(state, actions) {
      const index = state.findIndex((item) => item.id === actions.payload);

      if (index !== -1) {
        state.splice(index, 1);
        saveCart(state);
      }
    },

    CLEAR_CART(state) {
      state.length = 0;
      saveCart([]);
    },

    CLEAR_CART_STATE_ONLY() {
      return [];
    },
  },
});

const popupAuthSlice = createSlice({
  name: "popupAuth",
  initialState: initialAuth,

  reducers: {
    SHOW_POPUP(state) {
      state.popUp = true;
    },
    HIDDEN_POPUP(state) {
      state.popUp = false;
    },
  },
});

const store = configureStore({
  reducer: {
    popupDetail: popupSlice.reducer,
    popupAuth: popupAuthSlice.reducer,
    cart: cartSlice.reducer,
    favorites: favoriteReducer,
    loading: loadingReducer,
  },
});

export const popupDetailAction = popupSlice.actions;
export const popupAuthAction = popupAuthSlice.actions;
export const cartAction = cartSlice.actions;

export default store;