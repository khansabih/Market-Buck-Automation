// For typecasting the request and response parameters
import { Response, Request } from 'express';
// To query the postgreSQL database created at Neon.
import prisma from '../prisma/client';
// For password hashing.
import { hashPassword } from '../utils/auth';
// To generate random tokens
import crypto from 'crypto';
// Utility function to send verification mail to entered email id.
import { sendEmailVerificationMail } from '../utils/sendVerificationEmail';

// To Register a new student
export const registerStudent = async(req: Request, res: Response) => {
    // Retreive all the details from the request json body
    const { first_name, last_name, email, password } = req.body;

    // If either of the feilds is missing, send back the error feedback.
    if(!first_name || !last_name || !email || !password)
        return res.status(400).json({
            error: 'All fields are required'
        });

    // If all the fields are there, continue with registering the user.
    try{
        // Start by hashing the password, because postgreSQL(on Neon console) stores only hashed password for protection.
        const password_hash = await hashPassword(password);
        
        // Now check whether the email already exists or not.
        const existingEmail = await prisma.student.findUnique({ where:{ email } });
        if(existingEmail){
            res.status(400).json({ error:'Student already exists.' });
            return;
        }

        // Now create the student data in the database.
        const student = await prisma.student.create({
            data:{
                first_name,
                last_name,
                email,
                password_hash,
            }, select:{
                student_id: true,
                first_name: true,
                last_name: true,
                email: true
            }
        });

        // Generate the token for email verification
        const token = crypto.randomBytes(32).toString('hex');

        // Add this in the created student entry so as to verify it on login or verification.
        await prisma.student.update({
            where:{ email },
            data:{
                verify_token: token
            }
        });

        await sendEmailVerificationMail(email, token);
        // Return the response as student is successfully created.
        res.status(200).json(student);
    }catch(err){
        res.status(400).json({
            error: 'Internal Server Error'
        })
        console.error('Registration error => ', err);
    }
}

// To verify the email of the new student.
export const verifyEmail = async(req: Request, res:Response)=>{
    // Retreive the token from the url
    const { token } = req.query;

    // If there is no token, return error.
    if(!token){
        res.status(400).json({
            error: 'No token found'
        })
        return;
    }
    
    try{
        // If there is a token, find the student for which the token was generated.
        const student = await prisma.student.findFirst({
            where:{ verify_token: token as string }
        });

        // When the student is found, update the is_verify and delete the token so that it is no longer called or used.
        await prisma.student.update({
            where:{ student_id: student?.student_id as string },
            data:{
                is_verified: true,
                verify_token: null
            }
        });

        // Finally send the response as success.
        res.send('Email verified successfully');
    }catch(error){
        res.status(400).json({
            error: 'Error validating email'
        });
        console.error('Email verification error => ',error);
    }
    
}

export const listStudents = async(req: Request, res: Response) => {
    try{
        const students = await prisma.student.findMany();
        res.json(students);
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}

// Stub placeholders for now
// export const createStudent = async (req: Request, res: Response): Promise<void> => {
//     try{
//         const { first_name, last_name, email, password_hash } = req.body;
        
//         if(!first_name || !last_name){
//             res.status(400).json({
//                 error: 'First name and Last name required'
//             })
//             return;
//         }
        
//         const student = await prisma.student.create({
//             data:{
//                 first_name,
//                 last_name,
//                 email, 
//                 password_hash
//             }
//         })
        
//         res.status(201).json(student)
//     }catch(err){
//         console.error('Error creating student => ', err);
//         res.status(500).json({
//             error: 'Something went wrong creating the student'
//         })
//     }
// };

export const getStudent = async (req: Request, res: Response): Promise<void> => {
    const { student_id } = req.params;

    try{
        const student = await prisma.student.findUnique({
            where:{
                student_id
            }
        });

        if(!student){
            res.status(500).json({
                error: 'Student not found'
            })
            return;
        }

        res.status(200).json(student)
    }catch(err){
        console.error('Student not fetched error => ',err);
        res.status(500).json({
            error: 'Student not found'
        })
    }
};
export const updateStudent = (req: Request, res: Response) => {};
export const deleteStudent = (req: Request, res: Response) => {};
export const loginStudent = (req: Request, res: Response) => {};
export const logoutStudent = (req: Request, res: Response) => {};
export const refreshToken = (req: Request, res: Response) => {};
export const getDashboard = (req: Request, res: Response) => {};
export const getBalanceHistory = (req: Request, res: Response) => {};
export const createTransaction = (req: Request, res: Response) => {};