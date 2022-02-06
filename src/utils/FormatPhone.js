export const validatePhoneNumber = (phoneNumber) => {
  var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
  return regexp.test(phoneNumber);
};
