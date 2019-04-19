import CommonService from './../CommonService'
import { apiHost } from '../../util/util'

class DealService extends CommonService<any> {
    constructor() {
        super()
        this.rootURL = apiHost + "/api/deals"
    }

    async searchData(search: String): Promise<any[]> {
        try {
            const response = await fetch(this.rootURL + '?searchTerm=' + search)
            if (!response.ok) {
                throw new Error("cannot get data")
            }
            return response.json()
        }
        catch (error) {
            throw error
        }
    }
    
}

export const dealService = new DealService() 
