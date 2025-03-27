import * as yup from 'yup';

export const courseSchema = yup.object().shape({
  title: yup.string().trim().min(3, 'Title must be at least 3 characters').max(200, 'Title must be less than 200 characters').required('Title is required'),
  subTitle: yup.string().trim().min(3, 'Subtitle must be at least 3 characters').max(150, 'Subtitle must be less than 150 characters'),
  description: yup.string().trim().min(3, 'Description must be at least 3 characters').max(5000, 'Description must be less than 5000 characters'),
  price: yup.number().min(0, 'Price must be positive').required('Price is required'),
  access_type: yup.string().oneOf(['free', 'paid', 'prime'], 'Invalid access type').required('Access type is required'),
  level: yup.string().oneOf(['beginner', 'intermediate', 'advanced'], 'Invalid level').required('Level is required'),
  categoryId: yup.string().required('Category is required'),
  requirements: yup.array()
    .of(yup.string().trim().min(2, 'Requirement must be at least 2 characters').max(150, 'Requirement must be less than 150 characters'))
    .min(1, 'At least one requirement is needed')
    .max(20, 'Maximum 20 requirements allowed')
    .required('Requirements are required'),
  learningPoints: yup.array()
    .of(yup.string().trim().min(2, 'Learning point must be at least 2 characters').max(150, 'Learning point must be less than 150 characters'))
    .min(1, 'At least one learning point is needed')
    .max(20, 'Maximum 20 learning points allowed')
    .required('Learning points are required'),
});
