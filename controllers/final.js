var neo4jdriver = require('../drivers/neo4j_drivers');

exports.final_checkpoint = function(req,res){
  var finalHDD = req.body.finalHDD
      console.log(finalHDD)
      neo4jdriver.session.executeRead(tx => tx.run(
        `MATCH (h:\`Hard Drive\`) WHERE id(h) = ${finalHDD} RETURN h, h.avg, id(h) ORDER BY h.Name`)
      )
      .then(res => {
          return res.records.map(row => {
              const hdds = row.get('h')
              const havg = row.get('h.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
              const h_id = row.get('id(h)')
              const forCookie = [hdds,havg,h_id]
              return [[hdds,havg,h_id], forCookie]
            })
          })
      .then(query => {
          // `query` is an array of strings
          res.cookie('finalHDDID', query[0][0])
          gpus = req.cookies.finalGPUID
          cpus = req.cookies.finalCPUID
          rams = req.cookies.finalRAMID
          mobos = req.cookies.finalMOBOID
          totalPrice = gpus[0].properties['avg'] + cpus[0].properties['avg'] + rams[0].properties['avg'] + mobos[0].properties['avg'] + query[0][0][0].properties['avg']
          console.log(totalPrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"}))
          res.render('final', {
              cpus: cpus,
              gpus: gpus,
              rams: rams,
              mobos: mobos,
              hdds: query[0],
              totalPrice: totalPrice.toLocaleString("id-ID", {style:"currency", currency:"IDR"})
      })
      })
      .catch(e => {
          // There was a problem with the
          // database connection or the query
          console.log(e)
      })
  }

  exports.finish_page = function(req,res){
	res.render('finish')
}