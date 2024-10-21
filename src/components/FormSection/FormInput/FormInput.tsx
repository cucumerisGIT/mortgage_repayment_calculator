import React, { ChangeEvent, useEffect, useState } from 'react';
import styles from './FormInput.module.css'
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';

interface FormInputProps {
	labelText: string;
	typeIndicator: string;
	indicatorSide: 'left' | 'right';
	name: string;
	showError?: boolean;
	onValidate: (input: string) => string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = ({
	labelText,
	typeIndicator,
	indicatorSide = 'left',
	name,
	showError = false,
	onValidate,
	onChange
}) => {
	// Forward the input to the validation callback
	const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
		event.currentTarget.value = onValidate(event.currentTarget.value);
	}

	// Handle KeyDown
	const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter' || event.key === 'Escape') {
			event.currentTarget.value = onValidate(event.currentTarget.value);
			event.currentTarget.blur();
		} else if (!/[\d,.\b]/.test(event.key) &&
				!(event.ctrlKey && ['a', 'c', 'v'].includes(event.key.toLowerCase())) &&
				event.key !== 'Tab' && event.key !== 'Backspace') {
			// Accept only digits, comma, dots, copy-paste and select-all, prevent the rest
			event.preventDefault();
		}
	}
	
	return (
		<div className={styles['outerWrapper']}>
			<label id='label'>{labelText}</label>
			<span className={`${styles['inputWrapper']}  ${showError && styles['inputWrapper--error']}`}>
				{indicatorSide === 'left' &&
					<span className={`${styles['typeIndicator']} ${showError && styles['typeIndicator--error']}`} aria-hidden>{typeIndicator}</span>
				}
				<input
					className={styles['input']}
					type={'text'}
					name={name}
					aria-labelledby='label'
					onBlur={handleInput}
					onKeyDown={handleKeyDown}
					onChange={onChange}
					aria-required
				/>
				{indicatorSide === 'right' &&
					<span className={`${styles['typeIndicator']} ${showError && styles['typeIndicator--error']}`} aria-hidden>{typeIndicator}</span>
				}
				</span>
				<ErrorMessage hidden={!showError} />
		</div>
	);
}

export default FormInput;