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