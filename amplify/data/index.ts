import { a } from '@aws-amplify/backend';

import { postConfirmation } from '../auth/post-confirmation/resource';
import { fetchPurchasedModules } from '../functions/fetchPurchasedModules/resource';
import { sayHello } from '../functions/say-hello/resource';
import { CompanyModel } from './schema/company';
import { CompanyUserModel } from './schema/companyUser';
import { MemberModel } from './schema/entities';
import { EntityFieldSchemaModel } from './schema/entityFieldSchema';
import { ModuleModel } from './schema/module';
import { ModuleInstanceModel } from './schema/moduleInstance';
import { PurchasedModuleModel } from './schema/purchasedModule';

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

    // Custom functions
    fetchPurchasedModules: a
      .query()
      .arguments({
        sub: a.string(),
      })
      .returns(a.json().array())
      .authorization((allow) => [allow.group('ADMINS')])
      .handler(a.handler.function(fetchPurchasedModules)),

    sayHello: a
      .query()
      .arguments({
        name: a.string(),
      })
      .returns(a.string())
      .authorization((allow) => [allow.authenticated()])
      .handler(a.handler.function(sayHello)),
  })
  .authorization((allow) => allow.resource(postConfirmation));
