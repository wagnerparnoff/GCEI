import React from "react";
import './Modal.css'
import { CSSTransition } from 'react-transition-group';

export default function Modal(props) {
    return (
        <CSSTransition in={props.show} unmountOnExit timeout={{ enter: 0, exit: 300}} >
            <div className='modal' onClick={props.onClose}>
                <div className='modal-content' onClick={e => e.stopPropagation()}>
                    <div className='modal-body'>
                        {props.desc}
                    </div>
                    <div className='modal-footer'>
                        <button id='Sim' onClick={props.onSubmit}>Sim</button>
                        <button id='Nao' onClick={props.onClose}>Não</button>
                    </div>
                    
                </div>            
            </div>
        </CSSTransition>
    );
}