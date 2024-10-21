import React from 'react';
import styles from './ErrorMessage.module.css'

interface ErrorMessageProps {
	hidden?: boolean;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
	hidden = false
}) => {
	return (
		<p className={styles['msg']} hidden={hidden}>This field is required</p>
	);
}

export default ErrorMessage;