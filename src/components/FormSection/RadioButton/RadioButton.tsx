import React, { ChangeEvent } from 'react';
import styles from './RadioButton.module.css'

interface RadioButtonProps {
	text: string;
	name: string;
	value: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton: React.FC<RadioButtonProps> = ({
	text,
	name,
	value,
	onChange
}) => {
	return (
		<label className={styles['button']}>
			<span className={styles['checker']}></span>
			<input type='radio' name={name} value={value} onChange={onChange} />
			{text}
		</label>
	);
}

export default RadioButton;