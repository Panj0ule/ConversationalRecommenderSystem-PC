var neo4jdriver = require('../drivers/neo4j_drivers');

exports.ram_checkpoint = function(req,res){
    var finalMobo = req.body.finalMobo
      console.log(finalMobo)
      neo4jdriver.session.executeRead(tx => tx.run(
          `MATCH (m:Motherboard)
          WHERE id(m) = ${finalMobo}
          RETURN m,m.avg,id(m)
          ORDER BY m.Name`)
      )
    .then(res => {
          return res.records.map(row => {
              const mobos = row.get('m')
              const mavg = row.get('m.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
              const mid = row.get('id(m)')
              const forCookie = [mobos,mavg,mid]
              const query = [[mobos,mavg,mid], forCookie]
              return query
          })
      })
      .then(query => {
          // `query` is an array of strings
          res.cookie('finalMOBOID', query[0][1])
          gpus = req.cookies.finalGPUID
          cpus = req.cookies.finalCPUID
          res.render('ram/checkpoint', {
              mobos: query[0],
              gpus: gpus,
              cpus, cpus
      })
      })
      .catch(e => {
          // There was a problem with the
          // database connection or the query
          console.log(e)
      })
  }

  exports.ram_home = function(req,res){
	res.render('ram/ram_page')
}

exports.ram_query_filter = function(req,res){
  var statement1 = req.body.statement1;
  var statement2 = req.body.statement2;
  var statement3 = req.body.statement3;          //STATEMENT FOLLOW THE NUMBER OF QUESTION
  var statement5 = req.body.statement5;           //STATEMENT FOLLOW THE NUMBER OF QUESTION
  var statement6 = req.body.statement6;           //STATEMENT FOLLOW THE NUMBER OF QUESTION

  var resultStatement1 = ''
  var resultStatement2 = ''
  var resultStatement3 = ''
  var resultStatement5 = ''
  var resultStatement6 = ''

  // console.log(statement1)
  // console.log(statement1.length)
  // console.log(typeof(statement1))
  // console.log(statement1[0])
  

  //      STATEMENT 1
  if (statement1===undefined || statement1=='no' || statement1[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement1 = `(r:RAM)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement1) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement1Debug = `MATCH (:subFuncReq {Name: '${statement1}'})-[:HAS_SPEC]->(r:RAM) RETURN r`
      
      resultStatement1 = `(:subFuncReq {Name: '${statement1}'})-[:HAS_SPEC]->(r:RAM)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement1.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement1[i]}'})-[:HAS_SPEC]->(r:RAM)`)
      }
      resultStatement1Debug = 'MATCH '+String(queryAdd)+' RETURN r'
      
      resultStatement1 = String(queryAdd)
    }
    console.log('resultStatement1Debug: '+ resultStatement1Debug) 
  }
  
  //      STATEMENT 2                           
  if (statement2===undefined) {
    console.log('empty')
    resultStatement2 = `(r:RAM)`
  } else {
    if (typeof(statement2) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement2Debug = `MATCH (:subFuncReq {Name: '${statement2}'})-[:HAS_SPEC]->(r:RAM) RETURN r`

      resultStatement2 = `(:subFuncReq {Name: '${statement2}'})-[:HAS_SPEC]->(r:RAM)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement2.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement2[i]}'})-[:HAS_SPEC]->(r:RAM)`)
      }
      resultStatement2Debug = 'MATCH '+String(queryAdd)+' RETURN r'
      
      resultStatement2 = String(queryAdd)
    }
    console.log('resultStatement2Debug ' + resultStatement2Debug)
  }

  //      STATEMENT 3
  if (statement3===undefined || statement3=='no' || statement3[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement3 = `(r:RAM)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement3) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement3Debug = `MATCH (:subFuncReq {Name: '${statement3}'})-[:HAS_SPEC]->(r:RAM) RETURN r`

      resultStatement3 = `(:subFuncReq {Name: '${statement3}'})-[:HAS_SPEC]->(r:RAM)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement3.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement3[i]}'})-[:HAS_SPEC]->(r:RAM)`)
      }
      resultStatement3Debug = 'MATCH '+String(queryAdd)+' RETURN r'

      resultStatement3 = String(queryAdd)
    }
    console.log('resultStatement3debug= '+ resultStatement3Debug) 
  }
  
  
	
	//      STATEMENT 5
  if (statement5===undefined || statement5=='no' || statement5[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement5 = `(r:RAM)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement5) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement5Debug = `MATCH (:subFuncReq {Name: '${statement5}'})-[:HAS_SPEC]->(r:RAM) RETURN r`

      resultStatement5 = `(:subFuncReq {Name: '${statement5}'})-[:HAS_SPEC]->(r:RAM)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement5.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement5[i]}'})-[:HAS_SPEC]->(r:RAM)`)
      }
      resultStatement5Debug = 'MATCH '+String(queryAdd)+' RETURN r'

      resultStatement5 = String(queryAdd)
    }
    console.log('resultStatement5debug= '+ resultStatement5Debug) 
  }
  
	//      STATEMENT 6
  if (statement6===undefined || statement6=='no' || statement6[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement6 = `(r:RAM)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement6) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement6Debug = `MATCH (:subFuncReq {Name: '${statement6}'})-[:HAS_SPEC]->(r:RAM) RETURN r`

      resultStatement6 = `(:subFuncReq {Name: '${statement6}'})-[:HAS_SPEC]->(r:RAM)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement6.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement6[i]}'})-[:HAS_SPEC]->(r:RAM)`)
      }
      resultStatement6Debug = 'MATCH '+String(queryAdd)+' RETURN r'

      resultStatement6 = String(queryAdd)
    }
    console.log('resultStatement6debug= '+ resultStatement6Debug) 
  }
  var moboID = req.cookies.finalMOBOID[2].low
  queryGetRel = 
  `MATCH
  (r:RAM),
  ${resultStatement1}, 
  ${resultStatement2},
  ${resultStatement3},
  ${resultStatement5},
  ${resultStatement6},
  (r:RAM)<-[ic:IS_COMPATIBLE]-(m:Motherboard)
  WHERE id(m) = ${moboID}
  RETURN r, r.avg,id(r),m.Name
  ORDER BY r.Name
  `
  
  console.log(queryGetRel)
  
  neo4jdriver.session.executeRead(tx => tx.run(
    queryGetRel)
  )
    .then(res => {
      return res.records.map(row => {
        const rams = row.get('r')
        const m_name = row.get('m.Name')
        const ravg = row.get('r.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        const ram_id = parseInt(row.get('id(r)'))
        const query = [rams,ravg,ram_id,m_name]
        return query
      })
    })
    .then(query => {

      /* console.log(query[5][4]) */
      // `names` is an array of strings
      res.render('ram/ram_page_result', {
        queries: query,
        mobos: query[0][3]
    })
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
    })

  }

  exports.ram_compare = function(req,res){
    var raw_ram_idList = req.body.choosen_ram
    // convert string to integer
    console.log(raw_ram_idList)
    if(typeof(raw_ram_idList) !== "undefined"){
        if(typeof(raw_ram_idList) == "string"){
            ram_idList = parseInt(raw_ram_idList)
        } else {
            var ram_idList = raw_ram_idList.map(function (x) { 
                return parseInt(x); 
            });
        }
        console.log(ram_idList)
        
        neo4jdriver.session.executeRead(tx => tx.run(
            `MATCH (r:RAM)<-[d]-(n)
            WHERE id(r) IN [${ram_idList}]
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
                    const query = [rams,ravg,d,n,ram_id]
                    return query
                })
            })
            .then(query => {
                // `query` is an array of strings
                //console.log(query[1][2])
                res.render('ram/ram_page_compare', {
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