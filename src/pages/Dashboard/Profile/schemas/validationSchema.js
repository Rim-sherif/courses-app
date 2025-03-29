import * as Yup from 'yup';

export const validationSchema = Yup.object({
  firstName: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Must be less than 30 characters')
    .required('Required'),
  lastName: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(30, 'Must be less than 30 characters')
    .required('Required'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be at least 10 digits')
    .max(15, 'Must be less than 15 digits'),
  jobTitle: Yup.string()
    .min(3, 'Must be at least 3 characters')
    .max(50, 'Must be less than 50 characters'),
  socialLinks: Yup.object({
    linkedin: Yup.string()
      .url('Must be a valid URL')
      .nullable(),
    github: Yup.string()
      .url('Must be a valid URL')
      .nullable(),
    twitter: Yup.string()
      .url('Must be a valid URL')
      .nullable(),
    facebook: Yup.string()
      .url('Must be a valid URL')
      .nullable(),
    portfolio: Yup.string()
      .url('Must be a valid URL')
      .nullable(),
  }),
});
