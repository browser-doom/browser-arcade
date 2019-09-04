import './Button.scss';

import React from 'react';

type ButtonProps = {
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: (event: React.BaseSyntheticEvent<MouseEvent, HTMLButtonElement>) => void;
};

const Button : React.FC<ButtonProps> = (props: ButtonProps) => {
    return (<button onClick={props.onClick} className="ba-button" disabled={props.disabled}>{props.children}</button>);
};

export default Button;