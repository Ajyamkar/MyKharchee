import React from "react";
/**
 * Custom hook to keep track of user's email address.
 */
const useEmail = () => {
  const [email, setEmail] = React.useState("");

  const addEmail = (value: string) => {
    setEmail(value);
  };

  return {
    email,
    addEmail,
  };
};

export default useEmail;
