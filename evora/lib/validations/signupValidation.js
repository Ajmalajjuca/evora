export const validateSignup = ({ name, email, phone, password }) => {
  if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
    return "All fields are required.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Invalid email format.";

  if (password.length < 6)
    return "Password must be at least 6 characters long.";

  if (!/^[0-9]{10}$/.test(phone))
    return "Phone number must be 10 digits.";

  return null; // ✅ No validation errors
};
