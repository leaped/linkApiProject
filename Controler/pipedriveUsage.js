const pipedrive = require('./externalAPIs/pipedrive')
const array2 = [1,2,3,27,12,7,5,20]



pipedrive.filterDealsByStatus('won')
.then(resp =>{
    const filteredResult = resp.data.data.items.filter(function(value){
        if(array2.indexOf(value.item.id) === -1){
            return true
        }  
        else{
            return false
        }            
    })
    console.log(filteredResult)
})
.catch(e =>{
    console.log(e)
})