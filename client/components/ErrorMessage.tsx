import React from "react";
import { ErrorMessage as FormikErrorMessage } from "formik";

import style from "../styles/ErrorMessage.module.css";

interface Props {
  name: string;
}

export const ErrorMessage: React.FC<Props> = ({ name }) => (
  <FormikErrorMessage name={name}>
    {(errorMessage) => <span className={`red ${style.shake}`}>{errorMessage}</span>}
  </FormikErrorMessage>
);
