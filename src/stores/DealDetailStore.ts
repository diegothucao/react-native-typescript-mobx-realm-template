import { observable, action } from 'mobx'
import { realmMain, DealObjectName } from './../models/RealmFactory'
import { dealService } from '../services/deal/DealService'

export default class DealDetailStore {
    @observable isLoading: boolean = true
    @observable isFailure:boolean = false
    @observable deal: any | null = null

    @action async fetchDetail(dealId: string) {
        try {
            this.deal = realmMain.objectForPrimaryKey(DealObjectName, dealId)
            const data = await dealService.fetchById(dealId)    
            realmMain.write(() => {
                realmMain.create(DealObjectName, data, true)
              }) 
                this.deal = realmMain.objectForPrimaryKey(DealObjectName, dealId)
                this.isLoading = false
        } catch (e) {
                this.isLoading = false
                this.isFailure = true
        }
    }
}