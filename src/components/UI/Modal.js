import { Fragment } from "react"
import ReactDOM from "react-dom"
import classes from './Modal.module.css'

const Backdrop = props => {
    return <div className={classes.backdrop} onClick={props.onClick}/>
}

const Content = (props) => {
    return (
      <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
      </div>
    );
  };

const portalid = document.getElementById('overlay');

const Modal = props => {
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClick={props.onClick}/>, portalid)}
            {ReactDOM.createPortal(<Content>{props.children}</Content>, portalid)}
        </Fragment>
    )
}

export default Modal