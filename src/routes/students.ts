import { Router } from 'express'; // ✅ from 'express' only
import {
  listStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  registerStudent,
  loginStudent,
  logoutStudent,
  refreshToken,
  getDashboard,
  getBalanceHistory,
  createTransaction,
  verifyEmail
} from '../controllers/studentController';

const router = Router();

// Student Management
router.get('/', listStudents);
router.get('/:student_id', getStudent);
router.put('/:student_id', updateStudent);
router.delete('/:student_id', deleteStudent);

// Auth
router.post('/register', registerStudent);
router.get('/verifyEmail', verifyEmail);
router.post('/auth/login', loginStudent);
router.post('/auth/logout', logoutStudent);
router.post('/auth/refresh', refreshToken);

// Dashboard / Balance
router.get('/:student_id/dashboard', getDashboard);
router.get('/:student_id/balance-history', getBalanceHistory);

// Transactions
router.post('/transactions', createTransaction);

export default router;
