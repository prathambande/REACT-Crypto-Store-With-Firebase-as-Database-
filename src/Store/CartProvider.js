import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

const cartReducer = (state, action) => {
    //console.log(state.items);
    
    if(action.type === 'ADD'){
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.quantity;
        //const updatedItems = state.items.concat(action.item);
        //console.log(updatedItems);
        //console.log(updatedTotalAmount);
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);

        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItem, updatedItems;

        if(existingCartItem){
            updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + action.item.quantity
            };
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else{
            updatedItems = state.items.concat(action.item);
        }

        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    if(action.type === 'REMOVE'){
        const existingCartItemIndex = state.items.findIndex((item) => item.id === action.id);
        const existingCartItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingCartItem.price;
        let updatedItems;
        if(existingCartItem.quantity === 1){
            updatedItems = state.items.filter((item) => item.id !== action.id)
        }
        else{
            const updatedItem = {...existingCartItem, quantity: existingCartItem.quantity - 1};
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return{
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return defaultCartState;
}


const CartProvider = props => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);


    const addItemToCartHandler = (item) => {
        dispatchCartAction({type: 'ADD', item:item});
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({type: 'REMOVE', id:id});
    };
    
    const clearCart = () => {
        dispatchCartAction({type:'null'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart
    }

    return(
        <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
    )
};


export default CartProvider;