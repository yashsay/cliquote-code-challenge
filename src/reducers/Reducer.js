import {
  ADD_TO_CART,
  REMOVE_ITEM,
  SUB_QUANTITY,
  ADD_QUANTITY,
  TOGGLE_DISCOUNT,
} from "../actions/action-types/ActionTypes";

const initState = {
  items: [
    {
      id: 1,
      productName: "Managed Security Services",
      productId: "mss",
      cost: 2500,
      image:
        "https://images.unsplash.com/photo-1603532541654-1a0c6df444a6?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      displayName: "Managed Security Services",
      isActive: true,
      productDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
    },
    {
      id: 2,
      productName: "Engineering & integration",
      productId: "e&i",
      cost: 1800,
      image:
        "https://images.unsplash.com/photo-1581093806997-124204d9fa9d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      displayName: "Engineering & integration",
      isActive: true,
      productDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
    },
    {
      id: 3,
      productName: "Training",
      productId: "training",
      cost: 1500,
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
      displayName: "Training",
      isActive: true,
      productDescription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ex.",
    },
  ],
  addedItems: [],
  actualTotal: 0,
  discountedTotal: 0,
  appliedDiscount: null,
  totalQuantity: 0,
};
const Reducer = (state = initState, action) => {
  if (action.type === ADD_TO_CART) {
    let addedItem = state.items.find((item) => item.id === action.id);
    let existed_item = state.addedItems.find((item) => action.id === item.id);
    let totalQuantity = state.totalQuantity;
    // }
    if (existed_item) {
      addedItem.quantity += 1;
      return {
        ...state,
        actualTotal: state.actualTotal + addedItem.cost,
        discountedTotal:
          state.appliedDiscount !== null
            ? state.actualTotal +
              addedItem.cost -
              (state.actualTotal + addedItem.cost) *
                (state.appliedDiscount.value / 100)
            : state.actualTotal + addedItem.cost,
        totalQuantity: totalQuantity + 1,
      };
    } else {
      addedItem.quantity = 1;
      return {
        ...state,
        addedItems: [...state.addedItems, addedItem],
        actualTotal: state.actualTotal + addedItem.cost,
        discountedTotal:
          state.appliedDiscount !== null
            ? state.actualTotal +
              addedItem.cost -
              (state.actualTotal + addedItem.cost) *
                (state.appliedDiscount.value / 100)
            : state.actualTotal + addedItem.cost,
        totalQuantity: totalQuantity + 1,
      };
    }
  }
  if (action.type === REMOVE_ITEM) {
    let itemToRemove = state.addedItems.find((item) => action.id === item.id);
    let newItems = state.addedItems.filter((item) => action.id !== item.id);
    let newTotal =
      state.actualTotal - itemToRemove.cost * itemToRemove.quantity;
    console.log(itemToRemove);
    let appliedDiscount = state.appliedDiscount;
    if (newItems.length < 1) {
      appliedDiscount = null;
    }
    if (appliedDiscount && appliedDiscount.baseCriteriaValue < state.actualTotal) {
      appliedDiscount = null
    }
    return {
      ...state,
      addedItems: newItems,
      actualTotal: newTotal,
      discountedTotal:
        state.appliedDiscount !== null
          ? newTotal - newTotal * (state.appliedDiscount.value / 100)
          : newTotal,
      totalQuantity: state.totalQuantity - itemToRemove.quantity,
      appliedDiscount: appliedDiscount,
    };
  }
  if (action.type === ADD_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    addedItem.quantity += 1;
    let newTotal = state.actualTotal + addedItem.cost;
    return {
      ...state,
      actualTotal: newTotal,
      discountedTotal:
        state.appliedDiscount !== null
          ? newTotal - newTotal * (state.appliedDiscount.value / 100)
          : newTotal,
      totalQuantity: state.totalQuantity + 1,
    };
  }
  if (action.type === SUB_QUANTITY) {
    let addedItem = state.items.find((item) => item.id === action.id);
    if (addedItem.quantity === 1) {
      let new_items = state.addedItems.filter((item) => item.id !== action.id);
      let newTotal = state.actualTotal - addedItem.cost;
      let appliedDiscount = state.appliedDiscount;
      if (!new_items && new_items.length < 1) {
        appliedDiscount = null;
      }
      if (appliedDiscount && appliedDiscount.baseCriteriaValue < state.actualTotal) {
        appliedDiscount = null
      }
      return {
        ...state,
        addedItems: new_items,
        actualTotal: newTotal,
        discountedTotal:
          state.appliedDiscount !== null
            ? newTotal - newTotal * (state.appliedDiscount.value / 100)
            : newTotal,
        totalQuantity: state.totalQuantity - 1,
        appliedDiscount: appliedDiscount,
      };
    } else {
      addedItem.quantity -= 1;
      let newTotal = state.actualTotal - addedItem.cost;
      return {
        ...state,
        actualTotal: newTotal,
        discountedTotal:
          state.appliedDiscount !== null
            ? newTotal - newTotal * (state.appliedDiscount.value / 100)
            : newTotal,
        totalQuantity: state.totalQuantity - 1,
      };
    }
  }

  if (action.type === TOGGLE_DISCOUNT) {
    let appliedDiscount = null;
    if (state.appliedDiscount === null) {
      appliedDiscount = action.item;
      let discountValue = state.actualTotal * (appliedDiscount.value / 100);
      appliedDiscount.discountValue = discountValue;
      return {
        ...state,
        discountedTotal: state.actualTotal - discountValue,
        appliedDiscount: appliedDiscount,
      };
    } else {
      let totalAmount = 0;
      state.addedItems.forEach((item) => {
        totalAmount = totalAmount + item.cost * item.quantity;
      });
      if (state.appliedDiscount.id === action.item.id) {
        return {
          ...state,
          discountedTotal: totalAmount,
          appliedDiscount: appliedDiscount,
        };
      } else {
        appliedDiscount = action.item;
        let discountValue = totalAmount * (appliedDiscount.value / 100);
        appliedDiscount.discountValue = discountValue;
        return {
          ...state,
          discountedTotal: totalAmount - discountValue,
          appliedDiscount: appliedDiscount,
        };
      }
    }
  } else {
    return state;
  }
};

export default Reducer;
