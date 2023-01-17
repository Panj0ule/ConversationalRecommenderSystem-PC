var neo4jdriver = require('../drivers/neo4j_drivers');

exports.mobo_checkpoint = function(req,res){
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
          const forCookie = [cpus,cavg,cid]
          const query = [[cpus,cavg,r,n,cid], forCookie]
          return query
      })
  })
  .then(query => {
      // `query` is an array of strings
      res.cookie('finalCPUID', query[0][1])
      gpus = req.cookies.finalGPUID
      res.render('mobo/checkpoint', {
          cpus: query[0],
          gpus: gpus
  })
  })
  .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
  })
  }

  exports.mobo_home = function(req,res){
	res.render('mobo/mobo_page')
}

exports.mobo_query_filter = function(req,res){

  const cpu = req.cookies.finalCPUID
  const gpu = req.cookies.finalGPUID

  console.log(cpu[2])
  console.log(gpu[2])
  queryGetRel = 
  `MATCH
  (m:Motherboard)-[:IS_COMPATIBLE]->(c:CPU)
  WHERE id(c) = ${cpu[2].low}
  RETURN m, m.avg,id(m), c
ORDER BY m.Name`
  
  console.log(queryGetRel)
  
  neo4jdriver.session.executeRead(tx => tx.run(
    queryGetRel)
  )
    .then(res => {
      return res.records.map(row => {
        const mobos = row.get('m')
        const cpu = row.get('c')
        const mavg = row.get('m.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        const mobo_id = parseInt(row.get('id(m)'))
        const query = [mobos, mavg, mobo_id, cpu]
        return query
      })
    })
    .then(query => {
      /* console.log(query[5][4]) */
      // `names` is an array of strings
      res.render('mobo/mobo_page_result', {
        queries: query,
        cpu: query[0][3],
    })
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      res.redirect('/crs/mobo/nocompatible')
      console.log(e)
    })

  }
  exports.mobo_nocompatible = function(req,res){
    res.render('mobo/nocompatible')
  }
  exports.mobo_compare = function(req,res){
    var raw_mobo_idList = req.body.choosen_mobo
    // convert string to integer
    console.log(raw_mobo_idList)
    if(typeof(raw_mobo_idList) !== "undefined"){
        if(typeof(raw_mobo_idList) == "string"){
            mobo_idList = parseInt(raw_mobo_idList)
        } else {
            var mobo_idList = raw_mobo_idList.map(function (x) { 
                return parseInt(x); 
            });
        }
        console.log(mobo_idList)
        
        neo4jdriver.session.executeRead(tx => tx.run(
            `MATCH
            (m:Motherboard)
            WHERE id(m) IN [${mobo_idList}]
            RETURN m, m.avg,id(m)
            ORDER BY m.Name`)
        )
            .then(res => {
              return res.records.map(row => {
                const mobos = row.get('m')
                const mavg = row.get('m.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
                const mobo_id = parseInt(row.get('id(m)'))
                const query = [mobos, mavg, mobo_id]
                return query
                })
            })
            .then(query => {
                // `query` is an array of strings
                //console.log(query[1][2])
                res.render('mobo/mobo_page_compare', {
                    queries: query
            })
            })
            .catch(e => {
                // There was a problem with the
                // database connection or the query
                console.log(e)
            })
    } else {
        console.log("Error not checked any choices!")
    }
    

}