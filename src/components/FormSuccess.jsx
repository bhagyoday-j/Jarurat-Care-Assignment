import React from 'react';
import { CheckCircle } from 'lucide-react';

const FormSuccess = ({ message = "Your request has been submitted successfully. We will get back to you soon." }) => {
  return (
    <div className="bg-bgLight border border-border rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4">
      <CheckCircle className="text-secondary w-16 h-16" />
      <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
      <p className="text-textMuted">{message}</p>
    </div>
  );
};

export default FormSuccess;
