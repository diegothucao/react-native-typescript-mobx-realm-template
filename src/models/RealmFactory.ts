import Realm, {ObjectSchema} from 'realm'
export const CauseName = "Cause"
export const UserName = "User"
export const DealObjectName = "Deal"

export const CauseSchema: ObjectSchema = {
    name: CauseName,
    properties: {
      name: {type: 'string'}
    }
  }

  export const UserSchema: ObjectSchema = {
    name: UserName,
    properties: {
      avatar:  {type: 'string'},
      name: {type: 'string'}
    }
  } 

  export const DealSchema: ObjectSchema = {
    name: DealObjectName,
    primaryKey: 'key',
    properties: {
        key: {type: 'string', default: ""},
        dealType: {type: 'string', default: ""},
        title: {type: 'string', default: ""},
        price: {type: 'double', default: 0.00},
        makerPercentage: {type: 'double', default: 0.00},
        description: {type: 'string', default: ""},
        tags: {type: 'string', default: ""},
        url: {type: 'string', default: ""},
        media: {type: 'string[]', default: []},
        user: {type: UserName, default: undefined},
        cause: {type: CauseName, default: undefined}
    }
  }

export const realmMain = new Realm({schema: [DealSchema, CauseSchema, UserSchema]})