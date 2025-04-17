function formatCurrency(amount, currencyCode) {
    const currencyFormats = {
      USD: { symbol: '$', symbolFirst: true, thousandSep: ',', decimalSep: '.', decimals: 2 },
      EUR: { symbol: '€', symbolFirst: true, thousandSep: '.', decimalSep: ',', decimals: 2 },
      INR: { symbol: '₹', symbolFirst: true, thousandSep: ',', decimalSep: '.', decimals: 2 },
      JPY: { symbol: '¥', symbolFirst: true, thousandSep: ',', decimalSep: '', decimals: 0 },
      GBP: { symbol: '£', symbolFirst: true, thousandSep: ',', decimalSep: '.', decimals: 2 },
      AUD: { symbol: 'A$', symbolFirst: true, thousandSep: ',', decimalSep: '.', decimals: 2 }
      // Add more currencies as needed
    };
  
    const format = currencyFormats[currencyCode];
  
    if (!format) {
      console.error('Unsupported currency code');
      return amount.toString();
    }
  
    const fixedAmount = amount.toFixed(format.decimals);
    let [integerPart, decimalPart] = fixedAmount.split('.');
  
    // Format the integer part with thousand separators
    if (currencyCode === 'INR') {
      // Indian Numbering System (e.g., 12,34,567)
      const lastThree = integerPart.slice(-3);
      const otherNumbers = integerPart.slice(0, -3);
      const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      integerPart = otherNumbers ? formatted + ',' + lastThree : lastThree;
    } else {
      // Standard Western Numbering System (e.g., 1,234,567)
      integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, format.thousandSep);
    }
  
    let result = format.symbolFirst
      ? format.symbol + integerPart
      : integerPart + ' ' + format.symbol;
  
    if (format.decimals > 0 && decimalPart !== undefined) {
      result += format.decimalSep + decimalPart;
    }
  
    return result;
  }
  
  // Test cases
  console.log(formatCurrency(1234567.89, 'USD')); // "$1,234,567.89"
  console.log(formatCurrency(1234567.89, 'EUR')); // "€1.234.567,89"
  console.log(formatCurrency(1234567.89, 'INR')); // "₹12,34,567.89"
  console.log(formatCurrency(1234567.89, 'JPY')); // "¥1,234,568"
  console.log(formatCurrency(1234567.89, 'GBP')); // "£1,234,567.89"
  
  
  