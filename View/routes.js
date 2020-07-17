const refreshWonDeals = require('../ViewModel/refreshWonDeals').refreshWonDeals
const dbReports = require('../ViewModel/databaseReports')
function routes(server) {
    server.post('/refreshWonDeals', refreshWonDeals);
    server.post('/db/findall', dbReports.findAllDocuments)
}

module.exports = { routes }