import React, { HTMLProps, useEffect, useState } from 'react';
import styles from './CalculatedMortgage.module.css'
import FV from 'utils/scripts/FormatValidation';

interface CalculatedMortgageProps extends HTMLProps<HTMLDivElement> {
	amount: number;
	term: number;
	interest: number;
	type: 'repayment' | 'interest';
}

const CalculatedMortgage: React.FC<CalculatedMortgageProps> = ({
	amount,
	term,
	interest,
	type,
}) => {
	const [monthlySum, setMonthlySum] = useState<string>('');
	const [totalSum, setTotalSum] = useState<string>('');
	useEffect(() => {
		const { monthlyRepayment, totalRepayment } = calculateMortgageRepayment(amount, term, interest);

		if (type === 'repayment') {
			setMonthlySum(FV.validateCurrency(monthlyRepayment.toString()) || '0.00');
			setTotalSum(FV.validateCurrency(totalRepayment.toString()) || '0.00');
		} else if (type === 'interest') {
			const { monthlyInterest, totalInterest } = calculateMortgageInterest(totalRepayment, amount, term);
			setMonthlySum(FV.validateCurrency(monthlyInterest.toString()) || '0.00');
			setTotalSum(FV.validateCurrency(totalInterest.toString()) || '0.00');
		} else {
			console.error("'type' in FormData has unexpected value");
		}
	}, [amount, term, interest, type]);
	
	return (
		<div className={styles['wrapper']}>
			<div className={`${styles['div']} ${styles['topDiv']}`}>
				<p className={styles['desc']}>Your monthly repayments</p>
				<p className={styles['monthly']}>£{ monthlySum }</p>
			</div>
			<div className={styles['div']}>
				<p className={styles['desc']}>Total you'll repay over the term</p>
				<p className={styles['total']}>£{ totalSum }</p>
			</div>

			<div className={styles['srOnly']} aria-live='polite'>
				Your monthly {type} is £{monthlySum} and your total {type} over the term is £{totalSum}
			</div>
		</div>
	);
}

function calculateMortgageRepayment(
	amount: number, 
	term: number, 
	interest: number
): {monthlyRepayment: number, totalRepayment: number} {
	const monthlyInterest: number = interest / 100.0 / 12.0;
	const totalPayments: number = term * 12;

	const factor: number = Math.pow(1 + monthlyInterest, totalPayments);
	const monthly = amount * (monthlyInterest * factor) / (factor - 1)
	const total = monthly * totalPayments;

	return {
		monthlyRepayment: parseFloat(monthly.toFixed(2)),
		totalRepayment: parseFloat(total.toFixed(2))
	};
}

function calculateMortgageInterest(
	totalRepayment: number,
	amount: number,
	term: number
): {monthlyInterest: number, totalInterest: number} {
	const totalPayments = term * 12;

	const total = totalRepayment - amount;

	const monthly = total / totalPayments;

	return {
		monthlyInterest: parseFloat(monthly.toFixed(2)),
		totalInterest: parseFloat(total.toFixed(2))
	}
}

export default CalculatedMortgage;