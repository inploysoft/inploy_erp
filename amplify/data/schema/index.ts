import { a } from '@aws-amplify/backend';

import { postConfirmation } from '../../auth/post-confirmation/resource';
import { CompanyModel } from './company';
import { CompanyUserModel } from './companyUser';
import { MemberModel } from './entities';
import { EntityFieldSchemaModel } from './entityFieldSchema';
import { ModuleModel } from './module';
import { ModuleInstanceModel } from './moduleInstance';
import { PurchasedModuleModel } from './purchasedModule';

export const schema = a
  .schema({
    Company: CompanyModel.authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('ADMINS').to(['create', 'update', 'delete']),
    ]),

    CompanyUser: CompanyUserModel.authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('ADMINS').to(['create', 'update', 'delete']),
    ]),

    Module: ModuleModel.authorization((allow) => [allow.group('ADMINS')]),

    PurchasedModule: PurchasedModuleModel.authorization((allow) => [
      allow.group('ADMINS'),
    ]),

    ModuleInstance: ModuleInstanceModel.authorization((allow) => [
      allow.group('ADMINS'),
    ]),

    EntityFieldSchema: EntityFieldSchemaModel.authorization((allow) => [
      allow.group('ADMINS'),
    ]),

    // Entity tables
    Member: MemberModel.authorization((allow) => [
      allow.authenticated().to(['read', 'create', 'update']),
      allow.group('ADMINS').to(['delete']),
    ]),
  })
  .authorization((allow) => allow.resource(postConfirmation));
