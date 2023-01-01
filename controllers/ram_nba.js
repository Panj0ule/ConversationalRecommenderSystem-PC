var neo4jdriver = require('../drivers/neo4j_drivers');

exports.ram_checkpoint = function(req,res){
    var finalCPU = req.body.finalCPU
      console.log(finalCPU)
      neo4jdriver.session.executeRead(tx => tx.run(
          `MATCH (c:CPU)<-[r]-(n)
          WHERE id(c) = ${finalCPU}
          RETURN c, collect(type(r)),collect(n.Name),c.avg,id(c)
          ORDER BY c.Name`)
      )
    .then(res => {
          return res.records.map(row => {
              const cpus = row.get('c')
              const cavg = row.get('c.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
              const r = row.get('collect(type(r))')
              const n = row.get('collect(n.Name)')
              const cid = row.get('id(c)')
              query = [cpus,cavg,r,n,cid]
              return query
          })
      })
      .then(query => {
          // `query` is an array of strings
          res.cookie('finalCPUID', finalCPU)
          gpus = req.cookies.finalGPUID
          res.render('ram/checkpoint', {
              cpus: query,
              gpus: gpus
      })
      })
      .catch(e => {
          // There was a problem with the
          // database connection or the query
          console.log(e)
      })
  }