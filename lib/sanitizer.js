// sanitize request body
module.exports = function sanitize(req){
    var order = req.body;
    for(var prop in order){
        order[prop] = req.sanitize(order[prop]);
    }
    return order;
};