import { Response, Request } from 'express';
import prisma from '../prisma/client';

export const listStudents = async(req: Request, res: Response) => {
    try{
        const students = await prisma.student.findMany();
        res.json(students);
    }catch(err){
        res.status(500).json({ error: 'Failed to fetch students' });
    }
}

// Stub placeholders for now
export const createStudent = async (req: Request, res: Response): Promise<void> => {
    try{
        const { first_name, last_name } = req.body;
        
        if(!first_name || !last_name){
            res.status(400).json({
                error: 'First name and Last name required'
            })
            return;
        }
        
        const student = await prisma.student.create({
            data:{
                first_name,
                last_name
            }
        })
        
        res.status(201).json(student)
    }catch(err){
        console.error('Error creating student => ', err);
        res.status(500).json({
            error: 'Something went wrong creating the student'
        })
    }
};
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