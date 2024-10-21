import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './FormSection.module.css'
import { ReactComponent as CalculatorIcon } from './icon-calculator.svg';
import FormInput from './FormInput/FormInput';
import RadioButton from './RadioButton/RadioButton';
import FormData from 'utils/scripts/FormData';
import ErrorMessage from 'components/ErrorMessage/ErrorMessage';
import FV from 'utils/scripts/FormatValidation';

interface FormSectionProps {
	onFormSubmit: (formData: FormData) => void;
	onFormClear: () => void;
}

const FormSection: React.FC<FormSectionProps> = ({
	onFormSubmit,
	onFormClear
}) => {
	const [formData, setFormData] = useState<FormData>({});

	// Used to show errors on a failed submit
	const [triedSubmit, setTriedSubmit] = useState<boolean>(false);

	// Save state of all values entered in the form
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.currentTarget;
		setFormData((prev: FormData) => ({ ...prev, [name]: value }));
	}

	// Handle submitting the form
	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		// Check if the form values are not the default values anymore
		if (!!formData.amount && !!formData.interest && !!formData.term && !!formData.type) {
			onFormSubmit(formData);
		} else {
			setTriedSubmit(true);
		}
	}

	// Handle clearing the form
	const handleClear = () => {
		setTriedSubmit(false);
		onFormClear();
	}
	
	return (
		<form className={styles['form']} onSubmit={handleSubmit} onReset={handleClear}>
			<div className={styles['titleDiv']}>
				<h1>Mortgage Calculator</h1>
				<button className={styles['resetBtn']} type='reset'>Clear All</button>
			</div>

			<FormInput
				labelText='Mortgage Amount' 
				typeIndicator={'£'}
				indicatorSide='left'
				name='amount'
				showError={triedSubmit && !formData.amount}
				onValidate={FV.validateCurrency}
				onChange={handleChange}
			/>
			<div className={styles['inputWrapper']}>
				<FormInput 
					labelText='Mortgage Term' 
					typeIndicator={'years'} 
					indicatorSide='right' 
					name='term'
					showError={triedSubmit && !formData.term}
					onValidate={FV.validateNumber}
					onChange={handleChange}
				/>
				<FormInput 
					labelText='Interest Rate' 
					typeIndicator={'%'} 
					indicatorSide='right' 
					name='interest'
					showError={triedSubmit && !formData.interest}
					onValidate={FV.validatePercentage}
					onChange={handleChange}
				/>
			</div>

			<fieldset className={styles['typeBtnContainer']}>
				<legend>Mortgage Type</legend>
				<RadioButton 
					name='type' 
					value='repayment'
					text='Repayment' 
					onChange={handleChange}
				/>
				<RadioButton 
					name='type' 
					value='interest' 
					text='Interest Only' 
					onChange={handleChange}
				/>
				<ErrorMessage hidden={!(triedSubmit && !formData.type)} />
			</fieldset>

			<button className={styles['submitBtn']} type='submit'>
				<CalculatorIcon />
				Calculate Repayments
			</button>
		</form>
	);
}

export default FormSection;