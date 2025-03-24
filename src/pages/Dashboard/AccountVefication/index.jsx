import React from 'react';

const AccountVerification = () => {
    return (
        <div className="p-6 mx-auto">
           
            
            <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-6">Account Verification</h3>
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-2">Upload Verification Documents</h2>
                    <p className="text-gray-600 mb-4">Please upload the required documents to verify your account</p>
                    
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Your ID</label>
                            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                                <div className="text-center">
                                    <i className="fas fa-upload text-gray-400 text-3xl mb-2"></i>
                                    <p className="text-gray-500">Drop your ID here or click to upload</p>
                                    <input type="file" className="hidden" />
                                    <button className="mt-2 px-4 py-2 bg-[#410445] text-white rounded hover:bg-purple-700">
                                        Select File
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Professional Certificate</label>
                            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-lg">
                                <div className="text-center">
                                    <i className="fas fa-upload text-gray-400 text-3xl mb-2"></i>
                                    <p className="text-gray-500">Drop your certificate here or click to upload</p>
                                    <input type="file" className="hidden" />
                                    <button className="mt-2 px-4 py-2 bg-[#410445] text-white rounded hover:bg-purple-700">
                                        Select File
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button className="px-6 py-2 bg-[#410445] text-white rounded hover:bg-purple-700">
                        Submit for Verification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AccountVerification;