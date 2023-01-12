export const isValidResult = (input: any) => {
  const re = /^\d*[0-9]\d*$/;
  if (!re.test(input) || Number(input) > 10) return false;
  return true;
};

export const validationErrors = {
  inputError: '[0-10]',
};
