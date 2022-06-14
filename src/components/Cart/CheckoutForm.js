import { useRef, useState } from 'react';
import classes from './CheckoutForm.module.css'

const v1 = (value, x) => value.trim().length === x;
const v2 = (value) => value.trim() !== '';

const CheckoutForm = props => {

    const [iV, sIV] = useState({n:true, m:true, p:true, s:true});

    const namei = useRef();
    const mobilei = useRef();
    const postali = useRef();
    const statei = useRef();

    const sub = event => {
        event.preventDefault();

        const nv = v2(namei.current.value);
        const mv = v1(mobilei.current.value,10);
        const pv = v1(postali.current.value, 6);
        const sv = v2(statei.current.value);

        sIV({n:nv, m:mv, p:pv, s:sv})
        if(!(nv && mv && pv && sv))return;

        props.order({n:namei.current.value, m:mobilei.current.value, p:postali.current.value, s:statei.current.value});
        namei.current.value = '';
        mobilei.current.value = ''; 
        postali.current.value = '';
        statei.current.value = '';
    }

    return(
        <form className={classes.form} onSubmit={sub}>
            <div className={`${classes.formcontrol} ${iV.n ? ' ' : classes.invalid}`}>
                <label>Name</label>
                <input ref={namei}/>
                {!iV.n && <p> Da plzz </p>}
            </div>
            <div className={`${classes.formcontrol} ${iV.m ? ' ' : classes.invalid}`}>
                <label>Mobile Number</label>
                <input ref={mobilei}/>
                {!iV.m && <p> Da plzz </p>}
            </div>
            <div className={`${classes.formcontrol} ${iV.p ? ' ' : classes.invalid}`}>
                <label>Postal Code</label>
                <input ref={postali}/>
                {!iV.p && <p> Da plzz </p>}
            </div>
            <div className={`${classes.formcontrol} ${iV.s ? ' ' : classes.invalid}`}>
                <label>State</label>
                <input ref={statei}/>
                {!iV.s && <p> Da plzz </p>}
            </div>
            <button onClick={props.close}>Cancel</button>
            <button type='submit'>Confirm</button>
        </form>
    )
}

export default CheckoutForm;