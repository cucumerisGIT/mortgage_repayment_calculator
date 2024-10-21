class FormatValidation {
  static validateCurrency(input: string): string {
    return input
      .replace(/[^0-9.]/g, '')	// Remove all characters that are neither a number nor a dot
      .replace(/^([^.]*\.[^.]*)\./g, '$1')	// Remove every dot expect for the decimal point
      .replace(/^0+(?!\.)/, '') // Remove leading zeros
      .split('.')	// Split at the decimal point
      .map((part, index) =>
        index === 0 ? part.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : // Insert commas
        part.slice(0, 2))	// Limit decimal places
      .join('.');	// Join again
  }

  static validateNumber(input: string): string {
    let string: string = input.replace(/[^0-9]/g, '');
    let num: number = parseInt(string);
    return isNaN(num) ? '' : num.toString();
  }
  
  static validatePercentage(input: string): string {	
    let num: number = parseFloat(input.replace(',', '.')); // Replace commas with dots
    if (isNaN(num)) {
      console.error('Input is NaN');
      return '';
    } else if (num > 100) {
      num = 100;
    } else if (num < 0) {
      num = 0;
    }
    
    return num.toFixed(2).toString();
  }
}

export default FormatValidation;