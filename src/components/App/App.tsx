import React, { useState } from 'react';
import styles from './App.module.css';
import FormResultSection from 'components/FormResultSection/FormResultSection';
import FormSection from 'components/FormSection/FormSection';
import FormData from 'utils/scripts/FormData';
import FV from 'utils/scripts/FormatValidation';

const App = () => {
  const [formData, setFormData] = useState<FormData | null>(null);

  // Pass the form data to the results section
  const handleFormSubmit = (formData: FormData) => {
    setFormData({
      amount: formData.amount ? Number(FV.validateNumber(formData.amount.toString())) : 0,
      term: formData.term ? Number(FV.validateNumber(formData.term.toString())) : 0,
      interest: formData.interest ? Number(FV.validatePercentage(formData.interest.toString())) : 0,
      type: formData.type === 'interest' || 'repayment' ? formData.type : 'repayment'
    });
  }

  // Clear the result section when the form has been cleared
  const handleFormClear = () => {
    setFormData(null);
  } 

  return (
    <div className={styles['app']}>
      <div className={styles['wrapper']}>
        <main  className={styles['main']}>
          <FormSection onFormSubmit={handleFormSubmit} onFormClear={handleFormClear} />
        </main>
        <FormResultSection formData={formData} />
      </div>
    </div>
  );
}

export default App;