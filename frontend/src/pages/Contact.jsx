import React, { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import FormSuccess from '../components/FormSuccess';
import { useForm } from 'react-hook-form';
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('http://localhost:3000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
      } else {
        console.error('Failed to submit contact form:', response.statusText);
        alert('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact:', error);
      alert('Error submitting form. Please try again.');
    }
  };

  return (
    <div className="bg-bgLight min-h-screen py-20">
      <SectionWrapper className="max-w-[1280px] mx-auto px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-textMuted text-lg max-w-2xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you. Reach out to the Jarurat Care Foundation team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="bg-primary text-white rounded-[30px] p-10 shadow-medium h-fit">
            <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
            <p className="text-accent mb-8">
              We are here to help and answer any question you might have. We look forward to hearing from you.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Our Location</h4>
                  <p className="text-accent text-sm leading-relaxed">123 Health Avenue, New Delhi, India 110001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Phone Number</h4>
                  <p className="text-accent text-sm leading-relaxed">+91 98765 43210</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-white/10 p-3 rounded-full">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold mb-1">Email Address</h4>
                  <p className="text-accent text-sm leading-relaxed">support@jarurat.care</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white rounded-[40px] shadow-soft p-10 md:p-12">
            {isSubmitted ? (
              <div className="h-full flex items-center justify-center min-h-[400px]">
                <FormSuccess message="Thank you for reaching out! Your message has been received." />
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <h3 className="text-2xl font-bold text-primary mb-6">Send us a Message</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-2">Full Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 text-textPrimary focus:ring-2 focus:ring-secondary/30 outline-none transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-textPrimary mb-2">Email Address</label>
                    <input
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
                      })}
                      className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 text-textPrimary focus:ring-2 focus:ring-secondary/30 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-2">Subject</label>
                  <select
                    {...register("subject", { required: "Please select a subject" })}
                    className="w-full bg-bgLight rounded-2xl border border-border h-14 px-5 text-textPrimary focus:ring-2 focus:ring-secondary/30 outline-none transition-all appearance-none"
                  >
                    <option value="">Select a subject...</option>
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Partnership">Partnership Opportunities</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-textPrimary mb-2">Message</label>
                  <textarea
                    {...register("message", { required: "Message is required" })}
                    className="w-full bg-bgLight rounded-2xl border border-border p-5 text-textPrimary focus:ring-2 focus:ring-secondary/30 outline-none transition-all resize-none min-h-[150px]"
                    placeholder="How can we help you?"
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                </div>

                <button
                  type="submit"
                  className="bg-secondary text-white px-8 py-4 rounded-full shadow-soft hover:scale-[1.02] transition-transform duration-300 font-medium w-full md:w-auto"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default Contact;
