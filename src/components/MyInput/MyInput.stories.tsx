import React from 'react'
import { Story, Meta } from '@storybook/react';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import MyInput, {Props} from './MyInput'

export default {
  title: 'MyInput',
  component: MyInput,
} as Meta;

const Template: Story<Props> = args => (
  <Formik
    initialValues={{ foo: '' }}
    validationSchema={Yup.object({
      foo: Yup.string().required()
    })}
    onSubmit={() => undefined}
  >
    <Form>
      <MyInput {...args} />
    </Form>
  </Formik>
)

export const Primary = Template.bind({})
Primary.args = {
  label: 'Username',
  type: 'text',
  name: 'foo'
}
