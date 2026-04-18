/**
 * Mask a phone number for privacy (e.g., 13812345678 -> 138****5678)
 */
export const maskPhone = (phone?: string) => {
  if (!phone) return '-';
  return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
};

/**
 * Mask an email for privacy (e.g., example@gmail.com -> ex***@gmail.com)
 */
export const maskEmail = (email?: string) => {
  if (!email) return '-';
  const [user, domain] = email.split('@');
  if (user.length <= 2) return `${user}***@${domain}`;
  return `${user.substring(0, 2)}***@${domain}`;
};
