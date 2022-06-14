import { useContext, useState } from 'react';
import CartContext from '../../Store/cart-context';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';    
import CartItem from './CartItem';
import CheckoutForm from './CheckoutForm';

const Cart = props => {

    const cartCtx = useContext(CartContext);

    const [showForm, setShowForm] = useState(false);

    const [sending, setSending] = useState(null);
    const [sent, setSent] = useState(null);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({...item, quantity:1});
    };

    const order = (user) => {
        setSending(true);
        setTimeout(() => {setSending(false);        setSent(true);
            cartCtx.clearCart();}, 6000);
        // fetch('/*link*/', {
        //     method:'POST',
        //     body:JSON.stringify({
        //         userData: user,
        //         orderedItems: cartCtx.items
        //     })
        // })
    }

    const cartItem = (<ul className={classes['cart-items']}>
        {
            cartCtx.items.map((item) => (
                <CartItem 
                key={item.id}
                name={item.name}
                amount={item.quantity}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))
        }
    </ul>);

    return(
        <Modal onClick={props.onClick}>
            {!sending && !sent && <div>
                {cartItem}
                <div className={classes.total}>
                    <span>Total Amount</span>
                    <span>{`$${cartCtx.totalAmount}`}</span>
                </div>
                { !showForm && <div className={classes.actions}>
                    <button className={classes['button--alt']} onClick={props.onClick}>Close</button>
                    <button className={classes.button} onClick={() => {setShowForm(true)}}>Order</button>
                </div>}
                {showForm && <CheckoutForm order={order} close={props.onClick}/>}
            </div>}
            {sending && <p>Sending Order ..... </p>}
            {sent && <p>Order Sent Successfully !</p>}
        </Modal>
    )
}

export default Cart