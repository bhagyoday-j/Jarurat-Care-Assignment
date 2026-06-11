import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import FormSuccess from '../components/FormSuccess';
import { useForm } from 'react-hook-form';

const Register = () => {
  const [activeTab, setActiveTab] = useState('patient'); // 'patient' or 'volunteer'
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register: registerPatient, handleSubmit: handleSubmitPatient, formState: { errors: errorsPatient }, reset: resetPatient } = useForm();
  const { register: registerVolunteer, handleSubmit: handleSubmitVolunteer, formState: { errors: errorsVolunteer }, reset: resetVolunteer } = useForm();

  const onSubmitPatient = async (data) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${backendUrl}/api/patients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        resetPatient();
      } else {
        console.error('Failed to submit patient registration:', response.statusText);
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting patient registration:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  const onSubmitVolunteer = async (data) => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const response = await fetch(`${backendUrl}/api/volunteers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        resetVolunteer();
      } else {
        console.error('Failed to submit volunteer registration:', response.statusText);
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting volunteer registration:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="bg-bgSection min-h-screen py-20">
      <SectionWrapper className="max-w-[1100px] mx-auto px-8">
        <div className="space-y-4 mb-16 text-center">
          <div className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mx-auto">Get Involved</div>
          <h1 className="text-4xl md:text-5xl font-bold text-primary leading-tight mb-4">Get Involved or Request Support</h1>
          <p className="text-textMuted text-lg max-w-2xl mx-auto leading-relaxed">
            Whether you need assistance or want to offer your skills to help others, you are in the right place.
          </p>
        </div>

        <div className="bg-white rounded-[40px] shadow-soft overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border">
            <button
              className={`flex-1 py-6 text-lg font-medium transition-colors ${activeTab === 'patient' ? 'text-secondary border-b-2 border-secondary bg-bgSection/50' : 'text-textMuted hover:bg-bgSection/30 hover:text-textPrimary'}`}
              onClick={() => { setActiveTab('patient'); setIsSubmitted(false); }}
            >
              Patient Support
            </button>
            <button
              className={`flex-1 py-6 text-lg font-medium transition-colors ${activeTab === 'volunteer' ? 'text-secondary border-b-2 border-secondary bg-bgSection/50' : 'text-textMuted hover:bg-bgSection/30 hover:text-textPrimary'}`}
              onClick={() => { setActiveTab('volunteer'); setIsSubmitted(false); }}
            >
              Volunteer Registration
            </button>
          </div>

          <div className="p-8 md:p-12">
            {isSubmitted ? (
              <div className="min-h-[400px] flex items-center justify-center">
                <FormSuccess message={activeTab === 'patient' ? "Your request for support has been received. Our team will contact you shortly." : "Thank you for volunteering! We have received your application and will be in touch."} />
              </div>
            ) : (
              <>
                {/* Patient Form */}
                {activeTab === 'patient' && (
                  <form onSubmit={handleSubmitPatient(onSubmitPatient)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">Full Name</label>
                        <input {...registerPatient("name", { required: "Name is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                        {errorsPatient.name && <p className="text-red-500 text-sm mt-1">{errorsPatient.name.message}</p>}
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-textPrimary mb-2">Age</label>
                          <input type="number" {...registerPatient("age", { required: "Age is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                          {errorsPatient.age && <p className="text-red-500 text-sm mt-1">{errorsPatient.age.message}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-textPrimary mb-2">Gender</label>
                          <select {...registerPatient("gender", { required: "Gender is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none appearance-none">
                            <option value="">Select...</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errorsPatient.gender && <p className="text-red-500 text-sm mt-1">{errorsPatient.gender.message}</p>}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">Phone Number</label>
                        <input {...registerPatient("phone", { required: "Phone is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                        {errorsPatient.phone && <p className="text-red-500 text-sm mt-1">{errorsPatient.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">City</label>
                        <input {...registerPatient("city", { required: "City is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                        {errorsPatient.city && <p className="text-red-500 text-sm mt-1">{errorsPatient.city.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-2">Health Concern</label>
                      <textarea {...registerPatient("concern", { required: "Please describe your concern" })} className="w-full bg-bgLight rounded-2xl border border-border p-5 focus:ring-2 focus:ring-secondary/30 outline-none min-h-[120px]"></textarea>
                      {errorsPatient.concern && <p className="text-red-500 text-sm mt-1">{errorsPatient.concern.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-3">Preferred Contact Method</label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value="Phone" {...registerPatient("contactMethod", { required: "Select a contact method" })} className="text-secondary focus:ring-secondary" />
                          <span>Phone</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value="WhatsApp" {...registerPatient("contactMethod")} className="text-secondary focus:ring-secondary" />
                          <span>WhatsApp</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" value="Email" {...registerPatient("contactMethod")} className="text-secondary focus:ring-secondary" />
                          <span>Email</span>
                        </label>
                      </div>
                      {errorsPatient.contactMethod && <p className="text-red-500 text-sm mt-1">{errorsPatient.contactMethod.message}</p>}
                    </div>

                    <button type="submit" className="bg-secondary text-white px-8 py-4 rounded-full shadow-soft hover:scale-[1.02] transition-transform duration-300 font-medium w-full md:w-auto">
                      Submit Request
                    </button>
                  </form>
                )}

                {/* Volunteer Form */}
                {activeTab === 'volunteer' && (
                  <form onSubmit={handleSubmitVolunteer(onSubmitVolunteer)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">Full Name</label>
                        <input {...registerVolunteer("name", { required: "Name is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                        {errorsVolunteer.name && <p className="text-red-500 text-sm mt-1">{errorsVolunteer.name.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">Email Address</label>
                        <input {...registerVolunteer("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                        {errorsVolunteer.email && <p className="text-red-500 text-sm mt-1">{errorsVolunteer.email.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">Phone Number</label>
                        <input {...registerVolunteer("phone", { required: "Phone is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none" />
                        {errorsVolunteer.phone && <p className="text-red-500 text-sm mt-1">{errorsVolunteer.phone.message}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-textPrimary mb-2">Profession</label>
                        <select {...registerVolunteer("profession", { required: "Profession is required" })} className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 focus:ring-2 focus:ring-secondary/30 outline-none appearance-none">
                          <option value="">Select...</option>
                          <option value="Doctor">Doctor</option>
                          <option value="Nurse">Nurse</option>
                          <option value="Pharmacist">Pharmacist</option>
                          <option value="Counselor">Counselor</option>
                          <option value="Admin">Admin</option>
                          <option value="Other">Other</option>
                        </select>
                        {errorsVolunteer.profession && <p className="text-red-500 text-sm mt-1">{errorsVolunteer.profession.message}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-3">Availability</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {['Weekdays', 'Weekends', 'Morning', 'Evening'].map((time) => (
                          <label key={time} className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" value={time} {...registerVolunteer("availability", { required: "Select at least one" })} className="text-secondary focus:ring-secondary rounded" />
                            <span>{time}</span>
                          </label>
                        ))}
                      </div>
                      {errorsVolunteer.availability && <p className="text-red-500 text-sm mt-1">{errorsVolunteer.availability.message}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-textPrimary mb-2">Skills / Experience (Optional)</label>
                      <textarea {...registerVolunteer("skills")} className="w-full bg-bgLight rounded-2xl border border-border p-5 focus:ring-2 focus:ring-secondary/30 outline-none min-h-[100px]"></textarea>
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer mt-4">
                        <input type="checkbox" {...registerVolunteer("agreement", { required: "You must agree to the terms" })} className="mt-1 text-secondary focus:ring-secondary rounded" />
                        <span className="text-sm text-textMuted">I agree to the Jarurat Care Foundation volunteer code of conduct and confirm that the information provided is accurate.</span>
                      </label>
                      {errorsVolunteer.agreement && <p className="text-red-500 text-sm mt-1">{errorsVolunteer.agreement.message}</p>}
                    </div>

                    <button type="submit" className="bg-secondary text-white px-8 py-4 rounded-full shadow-soft hover:scale-[1.02] transition-transform duration-300 font-medium w-full md:w-auto">
                      Register as Volunteer
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Register;
