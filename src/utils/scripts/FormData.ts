export default interface FormData {
  amount?: number;
  term?: number;
  interest?: number;
  type?: 'repayment' | 'interest';
}