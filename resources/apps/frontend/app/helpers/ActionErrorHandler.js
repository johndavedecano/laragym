import { ApiError, ReduxError } from './CustomExceptions';

export const handleActionError = (error) => {
  if (error.response && error.response.status) {
    throw new ApiError(error);
  } else {
    throw new ReduxError(error);
  }
};
