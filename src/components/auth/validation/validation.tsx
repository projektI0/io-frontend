export const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
 
// co najmniej jedna mała litera, co najmniej jedna duża litera, co najmniej jedna cyfra, co najmniej jeden znak specjalny, co najmniej 8 znaków
export const validatePassword = (password: string): boolean => {
    const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return strongRegex.test(password);
};

export const validateConfirmPassword = (password: string, confirmPassword: string): boolean => {
    return password === confirmPassword
};