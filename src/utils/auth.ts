import bcrypt from 'bcrypt';
// Utility function for hashing the password
export const hashPassword = async(password: string): Promise<string> =>{
    return await bcrypt.hash(password, 10);
}