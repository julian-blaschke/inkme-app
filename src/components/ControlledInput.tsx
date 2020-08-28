import * as React from "react"
import {Controller, Control, ValidationRules} from "react-hook-form"
import {TextInput} from "react-native-gesture-handler"
import tailwind from "tailwind-rn"

export interface ControlledInputProps {
  name: string
  control: Control
  rules?: ValidationRules
  placeholder?: string
}

/**
 * input controlled by {@link react-hook-form}
 *
 * @param control to register and control textinput
 * @param rules validation rules for the input
 * @param placeholder placeholder of the textinput inside the controller
 * @returns controller with textinput inside
 */
export const ControlledInput: React.FC<ControlledInputProps> = ({
  name,
  control,
  rules,
  placeholder,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({onChange, onBlur, value}) => (
        <TextInput
          style={tailwind(
            "py-2 px-4 w-full text-base text-gray-700 border rounded border-gray-500"
          )}
          autoCapitalize="none"
          placeholder={placeholder}
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}></TextInput>
      )}></Controller>
  )
}
