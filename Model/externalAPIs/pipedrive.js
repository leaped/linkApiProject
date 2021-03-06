const axios = require('axios')
require('dotenv').config()

const filterDealsByStatus = async function (status){
    const url = `https://api.pipedrive.com/v1/deals/search?term=Ne&status=${status}&start=0&api_token=${process.env.pipedrive_APITOKEN}`
    
    //Saving the promise to return it
    const response = await axios.get(url)
    return response
}

module.exports = {
    filterDealsByStatus
}
