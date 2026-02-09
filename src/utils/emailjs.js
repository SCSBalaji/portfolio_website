import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id';
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id';
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key';

export const sendEmail = async (formData) => {
  try {
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
    return { success: true, result };
  } catch (error) {
    return { success: false, error };
  }
};
