import { useContext } from 'react';
import CartContext from '../../Store/cart-context';
import classes from './LiCrypto.module.css'
import LiCryptoForm from './LiCryptoForm';

const LiCrypto = props => {
    const price = `$${props.price}`;

    const cartCtx = useContext(CartContext);

    const addToCartHandler = quantity => {
        //console.log("xd", quantity);
        cartCtx.addItem({
            id: props.id,
            quantity: quantity,
            name: props.name,
            price: props.price
        })
    }

    return(
        <li className={classes.crypto}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.desc}</div>
                <div className={classes.price}>{price}</div>
            </div>
            <div>
                <LiCryptoForm id={props.id} addToCartHandler={addToCartHandler}></LiCryptoForm>
            </div>
        </li>
    )
}

export default LiCrypto