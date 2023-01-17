var neo4jdriver = require('../drivers/neo4j_drivers');

exports.hdd_checkpoint = function(req,res){
    var finalRAM = req.body.finalRAM
      console.log(finalRAM)
      neo4jdriver.session.executeRead(tx => tx.run(
          `MATCH (r:RAM)<-[d]-(n)
          WHERE id(r) = ${finalRAM}
          RETURN r, collect(type(d)),collect(n.Name),r.avg,id(r)
          ORDER BY r.Name`)
      )
    .then(res => {
      return res.records.map(row => {
        const rams = row.get('r')
        const n = row.get('collect(n.Name)')
        const d = row.get('collect(type(d))')
        const ravg = row.get('r.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        const ram_id = parseInt(row.get('id(r)'))
        forCookie = [rams,ravg,ram_id]
        const query = [[rams,ravg,d,n,ram_id], forCookie]
        return query
      })
    })
    .then(query => {
          // `query` is an array of strings
          res.cookie('finalRAMID', query[0][1])
          gpus = req.cookies.finalGPUID
          cpus = req.cookies.finalCPUID
          console.log(req.cookies)
          res.render('hdd/checkpoint', {
              cpus: cpus,
              gpus: gpus,
              rams: query[0]
      })
    })
    .catch(e => {
          // There was a problem with the
          // database connection or the query
          console.log(e)
    })
  }

  exports.hdd_home = function(req,res){
	res.render('hdd/hdd_page')
}

exports.hdd_query_filter = function(req,res){
  var resultHDD = req.body.statement4;

  var resultStatement1 = ''
  // console.log(statement1)
  // console.log(statement1.length)
  // console.log(typeof(statement1))
  // console.log(statement1[0])
  
console.log(resultHDD)
  //      STATEMENT 1
  if (resultHDD==0){           //CONDITION WHERE STATEMENT 1 IS NO
    queryGetRel = "MATCH (h:`Hard Drive`) WHERE h.is_ssd = 'False' AND h.storage_gb < 1000 RETURN h,h.avg,id(h) LIMIT 70"
  } else if (resultHDD==1){
    queryGetRel = "MATCH (h:`Hard Drive`) WHERE h.is_ssd = 'False' AND h.storage_gb >= 5000 RETURN h,h.avg,id(h)"
  } else if (resultHDD==2){
    queryGetRel = "MATCH (h:`Hard Drive`) WHERE h.is_ssd = 'Yes' AND 100 < h.storage_gb < 1000 RETURN h,h.avg,id(h) LIMIT 70"
  } else if (resultHDD==3){
    queryGetRel = "MATCH (h:`Hard Drive`) WHERE h.is_ssd = 'Yes' AND h.storage_gb > 1000 RETURN h,h.avg,id(h)"
  }
  
  console.log(queryGetRel)
  
  neo4jdriver.session.executeRead(tx => tx.run(
    queryGetRel)
  )
    .then(res => {
      return res.records.map(row => {
        const hdds = row.get('h')
        const havg = row.get('h.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        const h_id = row.get('id(h)')
        return [hdds,havg,h_id]
      })
    })
    .then(query => {

      /* console.log(query[5][4]) */
      // `names` is an array of strings
      res.render('hdd/hdd_page_result', {
        queries: query
    })
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
    })

  }

  exports.hdd_compare = function(req,res){
    var raw_hdd_idList = req.body.choosen_hdd
    // convert string to integer
    console.log(raw_hdd_idList)
    if(typeof(raw_hdd_idList) !== "undefined"){
        if(typeof(raw_hdd_idList) == "string"){
            hdd_idList = parseInt(raw_hdd_idList)
        } else {
            var hdd_idList = raw_hdd_idList.map(function (x) { 
                return parseInt(x); 
            });
        }
        console.log(hdd_idList)
        
        neo4jdriver.session.executeRead(tx => tx.run(
            `MATCH (h:\`Hard Drive\`) WHERE id(h) IN [${hdd_idList}] RETURN h, h.avg, id(h) ORDER BY h.Name`)
        )
        .then(res => {
          return res.records.map(row => {
            const hdds = row.get('h')
            const havg = row.get('h.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
            const h_id = row.get('id(h)')
            return [hdds,havg,h_id]
          })
        })
        .then(query => {
            // `query` is an array of strings
            console.log(query)
            res.render('hdd/hdd_page_compare', {
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