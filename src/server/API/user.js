const db = require('../db/index')

exports.get = (req,res) => {
        var sql = ''
    if (req.query.table){
        sql = 'select * from ' + req.query.table
    } else {
        sql = 'select * from building_message'
    }
    db.query(sql, (err,data) => {
        if (err) {
            return res.send('err:' + err.message)
        }
        res.send(data)
    })
}

