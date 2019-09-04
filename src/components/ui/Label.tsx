import './Label.scss';
import React from 'react';

type LabelProps = {
    for?: string;
    children?: React.ReactNode;
};

const Label : React.FC<LabelProps> = (props: LabelProps) => {
    return (<label className="ba-label" htmlFor={props.for}>{props.children}</label>)
};

export default Label;