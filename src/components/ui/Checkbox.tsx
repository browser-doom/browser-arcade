import './Checkbox.scss';

import React from 'react';

type CheckboxProps = {
    id?: string;
    name?: string;
    'data-name'?: string;
    disabled?: boolean;
    checked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Checkbox : React.FC<CheckboxProps> = (props: CheckboxProps) => {
    return (<label className="ba-checkbox">
        <input id={props.id} type="checkbox" data-name={props['data-name']} name={props.name} disabled={props.disabled} checked={props.checked} onChange={props.onChange} />
        <span></span>
    </label>);
};

export default Checkbox;