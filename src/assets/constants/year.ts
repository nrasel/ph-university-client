const currentYear = new Date().getFullYear();
export const yearOptions = [0, 1, 2, 3, 4].map((num) => ({
  value: String(currentYear + num),
  label: String(currentYear + num),
}));
