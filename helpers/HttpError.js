const messageList = {
  400: "Помилка від Joi або іншої бібліотеки валідації",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Email in use",
};

const HttpError = (status, message = messageList[status]) => {
  const error = new Error(message);
  error.status = status;
  return error;
};
export default HttpError;
