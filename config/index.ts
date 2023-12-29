export const MESSAGER_LOGIN_SUCCESS = "You have successfully logged in!";
export const MESSAGER_LOGIN_FAILED = "Login failed. Please try again.";
export const MESSAGER_REGISTER_SUCCESS = "You have successfully registered!";
export const MESSAGER_REGISTER_FAILED = "Register failed. Please try again.";
export const MESSAGER_SENDMAIL_SUCCESS = "You have successfully Send mail!";
export const MESSAGER_SENDMAIL_FAILED = "Send mail failed. Please try again.";

export const generateAxiosConfig = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      token: `${localStorage.getItem("token")}`,
    },
  };
};


