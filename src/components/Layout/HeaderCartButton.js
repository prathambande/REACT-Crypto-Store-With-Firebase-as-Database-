import React, { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/cart-context";
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = props => {

    const [highlighted, sethighlighted] = useState(false);


    const cartCtx = useContext(CartContext);


    useEffect(() => {
        sethighlighted(true);
        const timeid = setTimeout(() => {
            sethighlighted(false);
        },300);
        return () => {
            clearTimeout(timeid);
        } 
    }, [cartCtx.items])

    const numberofitems = cartCtx.items.reduce((cur, item) => {
        return cur+item.quantity;
    }, 0)

    const btnClasses = `${classes.button} ${ highlighted ? classes.bump : ''}`

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.cart}><img src="https://img.icons8.com/external-flatart-icons-lineal-color-flatarticons/64/000000/external-cart-grocery-flatart-icons-lineal-color-flatarticons.png" width="40" height="40" /></span>
            <span>Your Cart</span>
            <span className={classes.badge}> {numberofitems} </span>
        </button>
    )
}

export default HeaderCartButton;