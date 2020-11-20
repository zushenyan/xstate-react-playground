import React from 'react'
import { useField, FieldHookConfig } from 'formik'

export type Props = FieldHookConfig<string> & {
  label: string;
}

const MyInput: React.FC<Props> = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input {...field} name={props.name} id={props.id} value={props.value} disabled={props.disabled} placeholder={props.placeholder} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  )
}

export default MyInput
