# react-native-typescript-mobx-realm-example
This is an essential example to build react-native app using Typescript, Mobx and Realm

1. Clone the [repo](https://github.com/diegothucao/react-native-typescript-mobx-realm-template)
2. `yarn install` OR `npm install`
3. `react-native eject`
4. `react-native link realm`
5. `react-native run-ios` OR `react-native run-android`

Define store 
```typescript 
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

export const realmMain = new Realm({schema: [DealSchema]})
```

Define a store 
```typescript 
import { observable, action, runInAction, computed, IObservableValue } from 'mobx'
import { realmMain, DealObjectName } from './../models/RealmFactory'
import { dealService } from '../services/deal/DealService'
import Deal from '../models/Deal'

export default class AppStore {
    @observable isLoading: boolean = true
    @observable isFailure: boolean = false
    @observable searchTerm: IObservableValue<string> = observable.box("")
    @observable deals?: Realm.Results<Deal>
    @observable currentDealId: string | null = null

    constructor() {
        this.searchTerm.observe(() => {
            this.fetchDeals()
        }, true)
    }

    async fetchDeals() {
        dealService.searchData(this.searchTerm.get()).then(data => {
            runInAction(() => {
                this.isLoading = false
                data.forEach(item => {
                    realmMain.write(() => {
                        realmMain.create(DealObjectName, item, true)
                      })
                  })

                  if (this.searchTerm.get().length > 0) {
                    this.deals = realmMain.objects<Deal>(DealObjectName).filtered('title CONTAINS[c] "' + this.searchTerm.get() + '"')
                }else {
                    this.deals = realmMain.objects<Deal>(DealObjectName)
                }
            })
        })
    }

    @action setSearchTerm(searchStr: string) {
        this.searchTerm.set(searchStr)
    }

    @action
    setCurrentDeal(dealId: string) {
        this.currentDealId = dealId
    }

    @action
    unsetCurrentDeal() {
        this.currentDealId = null
    }
}
```

if you see any issue, please do not hesitate to create an issue here or can contact me via email: cao.trung.thu@gmail.com or https://www.linkedin.com/in/diegothucao/

Give me A STAR if you see it is helpful for you.

Thanks

references
1. https://facebook.github.io/react-native/docs/tutorial
2. https://github.com/jscomplete/react-native-essential-training
3. https://mobx.js.org
4. https://www.tutorialspoint.com/typescript/
5. https://www.tutorialspoint.com/es6
6. https://realm.io/docs/javascript/latest/#filtering
