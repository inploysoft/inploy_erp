import { a } from '@aws-amplify/backend';

import { postConfirmation } from './auth/post-confirmation/resource';
import { CompanyModel } from './data/schema/company';
import { CompanyMemberModel } from './data/schema/companyMember';
import { MemberModel, MembershipModel } from './data/schema/entities';
import { EntityFieldSchemaModel } from './data/schema/entityFieldSchema';
import { ModuleModel } from './data/schema/module';
import { ModuleInstanceModel } from './data/schema/moduleInstance';
import { PurchasedModuleModel } from './data/schema/purchasedModule';
import { fetchPurchasedModules } from './functions/fetchPurchasedModules/resource';
import { sayHello } from './functions/say-hello/resource';

export const schema = a
  .schema({
    Company: CompanyModel.authorization((allow) => [
      allow.authenticated().to(['read']),
      allow.group('ADMINS').to(['create', 'update', 'delete']),
    ]),

    CompanyMember: CompanyMemberModel.authorization((allow) => [
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

    Membership: MembershipModel.authorization((allow) => [
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
