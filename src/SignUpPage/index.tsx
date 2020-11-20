import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyInput from '../components/MyInput'

const SignUpPage: React.FC<unknown> = () => {
  return (
    <Formik
      initialValues={{ username: '', password: '', passwordConfirmation: ''}}
      validationSchema={Yup.object({
        username: Yup.string().email('Invalid email address').required(),
        password: Yup.string().max(15, 'Must be 15 characters or less').required(),
        passwordConfirmation: Yup.string().test('password-match', 'Password must match', function(v) { return this.parent.password === v })
      })}
      onSubmit={(v, { setSubmitting }) => {
        setTimeout(() => {
          console.log(v)
          setSubmitting(false)
        }, 1000)
      }}
    >
      <Form>
        <MyInput type="text" label="Username" name="username" />
        <MyInput type="password" label="Password" name="password" />
        <MyInput type="password" label="Password Confirmation" name="passwordConfirmation" />
        {/* <button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? 'Submitting...' : 'Submit'}</button> */}
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default SignUpPage
