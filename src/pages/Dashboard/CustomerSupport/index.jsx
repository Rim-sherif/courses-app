/* eslint-disable no-unused-vars */
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useNotifications } from '../../../hooks/useNotifications';

const validationSchema = Yup.object({
    name: Yup.string().min(3 ,'Name must be at least 3 characters ').required('Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile: Yup.string()
        .matches(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number')
        .required('Mobile number is required'),
    subject: Yup.string().required('Subject is required'),
    message: Yup.string().required('Message is required').min(10, 'Message must be at least 10 characters'),
});

const CustomerSupport = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { addNotification } = useNotifications();

    const handleSubmit = async (values, { resetForm }) => {
        setIsSubmitting(true);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/v1/custoersupport/ticket`, 
                values,
                { withCredentials: true }
            );
            
            toast.success('Support ticket submitted successfully!');
            
         
            const notification = {
                id: Date.now(), 
                title: 'Support Ticket Created',
                message: 'Your ticket has been submitted successfully. Our admin will review it shortly.',
                type: 'success',
                timestamp: new Date().toISOString()
            };
            
            addNotification(notification);
            resetForm();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to submit support ticket');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='mx-auto'>
            <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold mb-8 text-[#45073a] text-left">Contact Support</h3>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        mobile: '',
                        subject: '',
                        message: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ errors, touched }) => (
                        <Form className="space-y-6">
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#410445]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                        </svg>
                                    </div>
                                    <Field
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder="John Doe"
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.name && touched.name ? 'border-red-500' : 'border-[#410445]'} rounded-lg focus:ring-2 focus:ring-[#410445] focus:border-[#410445]`}
                                    />
                                </div>
                                {errors.name && touched.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#410445]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                    </div>
                                    <Field
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder="john@example.com"
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.email && touched.email ? 'border-red-500' : 'border-[#410445]'} rounded-lg focus:ring-2 focus:ring-[#410445] focus:border-[#410445]`}
                                    />
                                </div>
                                {errors.email && touched.email && <div className="text-red-500 text-sm mt-1">{errors.email}</div>}
                            </div>

                            {/* Mobile Input */}
                            <div>
                                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">Mobile</label>
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#410445]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                    </div>
                                    <Field
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        placeholder="+1 234 567 890"
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.mobile && touched.mobile ? 'border-red-500' : 'border-[#410445]'} rounded-lg focus:ring-2 focus:ring-[#410445] focus:border-[#410445]`}
                                    />
                                </div>
                                {errors.mobile && touched.mobile && <div className="text-red-500 text-sm mt-1">{errors.mobile}</div>}
                            </div>

                            {/* Subject Input */}
                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                                <div className="group relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#410445]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                        </svg>
                                    </div>
                                    <Field
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        placeholder="Brief summary of your inquiry"
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.subject && touched.subject ? 'border-red-500' : 'border-[#410445]'} rounded-lg focus:ring-2 focus:ring-[#410445] focus:border-[#410445]`}
                                    />
                                </div>
                                {errors.subject && touched.subject && <div className="text-red-500 text-sm mt-1">{errors.subject}</div>}
                            </div>

                            {/* Message Textarea */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                                <div className="group relative">
                                    <div className="absolute top-4 left-3 pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400 group-focus-within:text-[#410445]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                                        </svg>
                                    </div>
                                    <Field
                                        as="textarea"
                                        id="message"
                                        name="message"
                                        placeholder="Please describe your issue in detail..."
                                        rows="6"
                                        className={`w-full pl-10 pr-4 py-3 border ${errors.message && touched.message ? 'border-red-500' : 'border-[#410445]'} rounded-lg focus:ring-2 focus:ring-[#410445] focus:border-[#410445]`}
                                    />
                                </div>
                                {errors.message && touched.message && <div className="text-red-500 text-sm mt-1">{errors.message}</div>}
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-[#410445] text-white py-3 px-6 rounded-lg hover:bg-[#3d263f] transition-all duration-300 font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    <>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                        </svg>
                                        Send Message
                                    </>
                                )}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default CustomerSupport;