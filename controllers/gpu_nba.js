var neo4jdriver = require('../drivers/neo4j_drivers');

exports.gpu_query = function(req,res){
    neo4jdriver.session.executeRead(tx => tx.run(
      'MATCH (g:GPU) RETURN g.Name AS name LIMIT 10')
    )
      .then(res => {
        return res.records.map(row => {
          return row.get('name')
        })
      })
      .then(names => {
        // `names` is an array of strings
        console.log(names)
        res.render('gpu/gpu_page', {
          gpus: names
      })
      })
      .catch(e => {
        // There was a problem with the
        // database connection or the query
        console.log(e)
      })
    }