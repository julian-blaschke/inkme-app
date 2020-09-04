import {ValidationRules} from "react-hook-form"

export const emailRules: ValidationRules = {
  required: "Email is required",
  pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "Please enter a valid Email",
  },
}

export const usernameRules: ValidationRules = {
  required: "This field is required",
  minLength: {value: 3, message: "Username mus be at least 3 letters"},
  maxLength: {value: 35, message: "Username is too long"},
}

export const passwordRules: ValidationRules = {
  required: "Password is required",
  minLength: {value: 6, message: "Password is too short"},
  maxLength: {value: 40, message: "Password is too long"},
}
