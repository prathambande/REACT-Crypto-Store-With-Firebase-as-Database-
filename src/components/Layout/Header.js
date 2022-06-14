import { Fragment } from "react";
import classes from './Header.module.css';
import wallp from "../../Assets/wallp.jpg"
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
    return (
        <Fragment>
            <header className={classes.header}>
                <h1>Crypto Store</h1>
                <HeaderCartButton onClick={props.onClick}/>
            </header>
            <div className={classes['main-image']}>
                <img src={wallp}></img>
            </div>
        </Fragment>
    )
}

export default Header;