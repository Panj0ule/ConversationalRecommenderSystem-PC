var neo4jdriver = require('../drivers/neo4j_drivers');
var cookieParser = require('cookie-parser');

exports.gpu_home = function(req,res){
  res.render('gpu/gpu_page')
}

exports.gpu_query = function(req,res){
  var query = gpu_query_filter
  neo4jdriver.session.executeRead(tx => tx.run(
    query)
  )
    .then(res => {
      return res.records.map(row => {
        return row.get('g.Name')
      })
    })
    .then(names => {
      // `names` is an array of strings
      console.log(names)
      res.render('gpu/gpu_page_result', {
        gpus: names
    })
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
    })
}

exports.gpu_query_filter = function(req,res){
  var statement1 = req.body.statement1;
  var statement2 = req.body.statement2;
  var statement3 = req.body.statement3;
  var statement4 = req.body.statement4;           //STATEMENT FOLLOW THE NUMBER OF QUESTION

  var resultStatement1 = ''
  var resultStatement2 = ''
  var resultStatement3 = ''
  var resultStatement4 = ''

  // console.log(statement1)
  // console.log(statement1.length)
  // console.log(typeof(statement1))
  // console.log(statement1[0])
  

  //      STATEMENT 1
  if (statement1===undefined || statement1=='no' || statement1[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement1 = `(g:GPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement1) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement1Debug = `MATCH (:subFuncReq {Name: '${statement1}'})-[:HAS_SPEC]->(g:GPU) RETURN g`
      
      resultStatement1 = `(:subFuncReq {Name: '${statement1}'})-[:HAS_SPEC]->(g:GPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement1.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement1[i]}'})-[:HAS_SPEC]->(g:GPU)`)
      }
      resultStatement1Debug = 'MATCH '+String(queryAdd)+' RETURN g'
      
      resultStatement1 = String(queryAdd)
    }
    console.log('resultStatement1Debug: '+ resultStatement1Debug) 
  }
  
  //      STATEMENT 2                           
  if (statement2===undefined) {
    console.log('empty')
    resultStatement2 = `(g:GPU)`
  } else {
    if (typeof(statement2) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement2Debug = `MATCH (:subFuncReq {Name: '${statement2}'})-[:HAS_SPEC]->(g:GPU) RETURN g`

      resultStatement2 = `(:subFuncReq {Name: '${statement2}'})-[:HAS_SPEC]->(g:GPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement2.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement2[i]}'})-[:HAS_SPEC]->(g:GPU)`)
      }
      resultStatement2Debug = 'MATCH '+String(queryAdd)+' RETURN g'
      
      resultStatement2 = String(queryAdd)
    }
    console.log('resultStatement2Debug ' + resultStatement2Debug)
  }

  //      STATEMENT 3
  if (statement3===undefined || statement3=='no' || statement3[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement3 = `(g:GPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement3) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement3Debug = `MATCH (:subFuncReq {Name: '${statement3}'})-[:HAS_SPEC]->(g:GPU) RETURN g`

      resultStatement3 = `(:subFuncReq {Name: '${statement3}'})-[:HAS_SPEC]->(g:GPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement3.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement3[i]}'})-[:HAS_SPEC]->(g:GPU)`)
      }
      resultStatement3Debug = 'MATCH '+String(queryAdd)+' RETURN g'

      resultStatement3 = String(queryAdd)
    }
    console.log('resultStatement3debug= '+ resultStatement3Debug) 
  }
  
  //      STATEMENT 4
  if (statement4===undefined){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
  } else {                            
    if (statement4 == 0) {           
      console.log(`empty`)
      resultStatement4 = `(g:GPU)`
    } else if (statement4 == 1) {                                  
      resultStatement4Debug = `MATCH (g:GPU) WHERE g.DisplayPort = 1 RETURN g`
      resultStatement4 = `(g:GPU) WHERE g.DisplayPort = 1`
    } else if (statement4 == 2) {                                        
      resultStatement4Debug = `MATCH (g:GPU) WHERE g.DisplayPort = 2 RETURN g`
      resultStatement4 = `(g:GPU) WHERE g.DisplayPort = 2`
    } else if (statement4 == 3){
      resultStatement4Debug = `MATCH (g:GPU) WHERE g.DisplayPort = 3 RETURN g`
      resultStatement4 = `(g:GPU) WHERE g.DisplayPort = 3`
    } else{
      resultStatement4Debug = `MATCH (g:GPU) WHERE g.DisplayPort > 3 RETURN g`
      resultStatement4= `(g:GPU) WHERE g.DisplayPort > 3`
    }
    console.log(resultStatement4)
  }

  finalQuery = 
  `MATCH  
  ${resultStatement1}, 
  ${resultStatement2},
  ${resultStatement3},
  ${resultStatement4}
  RETURN g,g.Name,g.avg`

  queryGetRel = 
  `MATCH
  (g:GPU)<-[r]-(n),
  ${resultStatement1}, 
  ${resultStatement2},
  ${resultStatement3},
  ${resultStatement4}
  RETURN g, collect(type(r)),collect(n.Name),g.avg,id(g)
  ORDER BY g.Name
  `
  
  console.log(queryGetRel)
  //res.redirect('/crs/gpu/result')
  neo4jdriver.session.executeRead(tx => tx.run(
    queryGetRel)
  )
    .then(res => {
      return res.records.map(row => {
        const gpus = row.get('g')
        const n = row.get('collect(n.Name)')
        const r = row.get('collect(type(r))')
        const gavg = row.get('g.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        const gpu_id = parseInt(row.get('id(g)'))
        const query = [gpus,n,r,gavg,gpu_id]
        return query
      })
    })
    .then(query => {
      console.log(query[1][2])
      console.log(query[1][1])
      /* console.log(query[5][4]) */
      // `names` is an array of strings
      res.render('gpu/gpu_page_result', {
        queries: query
    })
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
    })

  }
  
exports.gpu_compare = function(req,res){
  var raw_gpu_idList = req.body.choosen_gpu
  // convert string to integer
  console.log(raw_gpu_idList)
  if(typeof(raw_gpu_idList) !== "undefined"){
    if(typeof(raw_gpu_idList) == "string"){
      gpu_idList = parseInt(raw_gpu_idList)
    } else {
      var gpu_idList = raw_gpu_idList.map(function (x) { 
        return parseInt(x); 
      });
    }
    console.log(gpu_idList)
    
    neo4jdriver.session.executeRead(tx => tx.run(
      `MATCH (g:GPU)<-[r]-(n)
      WHERE id(g) IN [${gpu_idList}]
      RETURN g, collect(type(r)),collect(n.Name),g.avg,id(g)
      ORDER BY g.Name`)
    )
      .then(res => {
        return res.records.map(row => {
          const gpus = row.get('g')
          const gavg = row.get('g.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
          const r = row.get('collect(type(r))')
          const n = row.get('collect(n.Name)')
          const gid = row.get('id(g)')
          query = [gpus,gavg,r,n,gid]
          return query
        })
      })
      .then(query => {
        // `query` is an array of strings
      
        res.render('gpu/gpu_page_compare', {
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
