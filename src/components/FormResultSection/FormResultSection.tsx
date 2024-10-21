import React, { useEffect, useRef } from 'react';
import styles from './FormResultSection.module.css'
import { ReactComponent as IllustrationEmpty } from './illustration-empty.svg';
import CalculatedMortgage from './CalculatedMortgage/CalculatedMortgage';
import FormData from 'utils/scripts/FormData';

interface FormResultSectionProps {
	formData: FormData | null;
}

const FormResultSection: React.FC<FormResultSectionProps> = ({
	formData
}) => {
	const resultsRef = useRef<HTMLDivElement | null>(null);
	
	useEffect(() => {
		if (formData) {
			window.scrollTo(0, window.innerHeight);
		}
	}, [formData]);
	
	return (
		<section className={`${styles['section']} ${!formData && styles['section--centered']}`}>
			{ !formData && <IllustrationEmpty /> }
			<h2 className={styles['title']}>
				{formData ? 
					'Your Results'
					:
					'Results shown here'
				}
			</h2>
			<p className={styles['text']}>
				{formData ? 
					`Your results are shown below based on the information you provided. 
					To adjust the results, edit the form and click "calculate repayments" again.`
					:
					'Complete the form and click "calculate repayments" to see what your monthly repayments would be.'
				}
			</p>
			{formData &&
				<CalculatedMortgage
					ref={resultsRef}
					amount={formData.amount!}
					term={formData.term!}
					interest={formData.interest!}
					type={formData.type!}
				/>
			}
		</section>
	);
}

export default FormResultSection;