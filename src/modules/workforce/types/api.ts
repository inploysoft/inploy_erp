import { CompanyMember } from '@/shared/models/companyMember';
import { Trainer } from '../models/trainer';

export type EmployeeTableData = Omit<CompanyMember, 'companyId' | 'createdAt'>;

export type TrainerTableData = Trainer;
