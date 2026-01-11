import { Router } from 'express';
import {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
  addContribution,
} from '../controllers/contribution.controller.js';

const router = Router();

router.get('/', getMembers);
router.get('/:id', getMember);
router.post('/', createMember);
router.put('/:id', updateMember);
router.delete('/:id', deleteMember);
router.post('/:memberId/contributions', addContribution);

export default router;
