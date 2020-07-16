const refreshWonDeals = require('../ViewModel/refreshWonDeals').refreshWonDeals

function routes(server) {
    server.post('/refreshWonDeals', refreshWonDeals);
}

module.exports = { routes }