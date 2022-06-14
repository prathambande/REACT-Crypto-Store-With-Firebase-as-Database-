import classes from './LiCryptoForm.module.css'
import Input from '../UI/Input'
import { useRef, useState } from 'react'

const LiCryptoForm = props => {
    const quantityInput = useRef();
    const [quantityIsValid, setquantityIsValid] = useState(true);


    const submitHandler = event => {
        event.preventDefault();

        const enterQuantity = quantityInput.current.value;
        const enterQuantityNum = +enterQuantity;
        
        if (enterQuantity.trim().length === 0 || enterQuantityNum < 1){
            setquantityIsValid(false);
            return;
        }
        setquantityIsValid(true);
        //console.log("Here", enterQuantityNum);
        props.addToCartHandler(enterQuantityNum);
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input
                ref={quantityInput}
                label="Quantity"
                input={{
                    id: 'amount_' + props.id,
                    type: 'number',
                    min: '1',
                    max: '5',
                    step: '1',
                    defaultValue: '1'
                }}
            />
            <button>Add</button>
            {!quantityIsValid && <p>Wr0ng</p>}
        </form>
    )
}

export default LiCryptoForm