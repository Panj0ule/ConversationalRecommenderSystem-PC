var neo4jdriver = require('../drivers/neo4j_drivers');


exports.cpu_checkpoint = function(req,res){
  var finalGPU = req.body.finalGPU
	console.log(finalGPU)
	neo4jdriver.session.executeRead(tx => tx.run(
		`MATCH (g:GPU)<-[r]-(n)
		WHERE id(g) = ${finalGPU}
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
			const forCookie = [gpus,gavg,gid]
			const query = [[gpus,gavg,r,n,gid],forCookie]
      
			return query
		})
	})
	.then(query => {
		// `query` is an array of strings
		res.cookie('finalGPUID', query[0][1])
		res.render('cpu/checkpoint', {
			queries: query[0]
	})
	})
	.catch(e => {
		// There was a problem with the
		// database connection or the query
		console.log(e)
	})
}

exports.cpu_home = function(req,res){
	res.render('cpu/cpu_page')
}

exports.cpu_query_filter = function(req,res){
  var statement1 = req.body.statement1;
  var statement2 = req.body.statement2;
  var statement3 = req.body.statement3;
  var statement4 = req.body.statement4;           //STATEMENT FOLLOW THE NUMBER OF QUESTION
  var statement5 = req.body.statement5;           //STATEMENT FOLLOW THE NUMBER OF QUESTION
  var statement6 = req.body.statement6;           //STATEMENT FOLLOW THE NUMBER OF QUESTION

  var resultStatement1 = ''
  var resultStatement2 = ''
  var resultStatement3 = ''
  var resultStatement4 = ''
  var resultStatement5 = ''
  var resultStatement6 = ''

  // console.log(statement1)
  // console.log(statement1.length)
  // console.log(typeof(statement1))
  // console.log(statement1[0])
  

  //      STATEMENT 1
  if (statement1===undefined || statement1=='no' || statement1[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement1 = `(c:CPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement1) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement1Debug = `MATCH (:subFuncReq {Name: '${statement1}'})-[:HAS_SPEC]->(c:CPU) RETURN c`
      
      resultStatement1 = `(:subFuncReq {Name: '${statement1}'})-[:HAS_SPEC]->(c:CPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement1.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement1[i]}'})-[:HAS_SPEC]->(c:CPU)`)
      }
      resultStatement1Debug = 'MATCH '+String(queryAdd)+' RETURN c'
      
      resultStatement1 = String(queryAdd)
    }
    console.log('resultStatement1Debug: '+ resultStatement1Debug) 
  }
  
  //      STATEMENT 2                           
  if (statement2===undefined) {
    console.log('empty')
    resultStatement2 = `(c:CPU)`
  } else {
    if (typeof(statement2) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement2Debug = `MATCH (:subFuncReq {Name: '${statement2}'})-[:HAS_SPEC]->(c:CPU) RETURN c`

      resultStatement2 = `(:subFuncReq {Name: '${statement2}'})-[:HAS_SPEC]->(c:CPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement2.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement2[i]}'})-[:HAS_SPEC]->(c:CPU)`)
      }
      resultStatement2Debug = 'MATCH '+String(queryAdd)+' RETURN c'
      
      resultStatement2 = String(queryAdd)
    }
    console.log('resultStatement2Debug ' + resultStatement2Debug)
  }

  //      STATEMENT 3
  if (statement3===undefined || statement3=='no' || statement3[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement3 = `(c:CPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement3) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement3Debug = `MATCH (:subFuncReq {Name: '${statement3}'})-[:HAS_SPEC]->(c:CPU) RETURN c`

      resultStatement3 = `(:subFuncReq {Name: '${statement3}'})-[:HAS_SPEC]->(c:CPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement3.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement3[i]}'})-[:HAS_SPEC]->(c:CPU)`)
      }
      resultStatement3Debug = 'MATCH '+String(queryAdd)+' RETURN c'

      resultStatement3 = String(queryAdd)
    }
    console.log('resultStatement3debug= '+ resultStatement3Debug) 
  }
  
  //      STATEMENT 4
  if (statement4===undefined || statement4=='no' || statement4[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement4 = `(c:CPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement4) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement4Debug = `MATCH (:subFuncReq {Name: '${statement4}'})-[:HAS_SPEC]->(c:CPU) RETURN c`

      resultStatement4 = `(:subFuncReq {Name: '${statement4}'})-[:HAS_SPEC]->(c:CPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement4.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement4[i]}'})-[:HAS_SPEC]->(c:CPU)`)
      }
      resultStatement4Debug = 'MATCH '+String(queryAdd)+' RETURN c'

      resultStatement4 = String(queryAdd)
    }
    console.log('resultStatement4debug= '+ resultStatement4Debug) 
  }
  
	
	//      STATEMENT 5
  if (statement5===undefined || statement5=='no' || statement5[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement5 = `(c:CPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement5) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement5Debug = `MATCH (:subFuncReq {Name: '${statement5}'})-[:HAS_SPEC]->(c:CPU) RETURN c`

      resultStatement5 = `(:subFuncReq {Name: '${statement5}'})-[:HAS_SPEC]->(c:CPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement5.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement5[i]}'})-[:HAS_SPEC]->(c:CPU)`)
      }
      resultStatement5Debug = 'MATCH '+String(queryAdd)+' RETURN c'

      resultStatement5 = String(queryAdd)
    }
    console.log('resultStatement5debug= '+ resultStatement5Debug) 
  }
  
	//      STATEMENT 6
  if (statement6===undefined || statement6=='no' || statement6[0]=='no'){           //CONDITION WHERE STATEMENT 1 IS NO
    console.log('empty')
    resultStatement6 = `(c:CPU)`
  } else {                            // CONDITION CHOOSES OPTION EXCEPT NO
    if (typeof(statement6) == "string") {           // CONDITION IF ONLY 1 STATEMENT CHOOSED
      resultStatement6Debug = `MATCH (:subFuncReq {Name: '${statement6}'})-[:HAS_SPEC]->(c:CPU) RETURN c`

      resultStatement6 = `(:subFuncReq {Name: '${statement6}'})-[:HAS_SPEC]->(c:CPU)`
    } else {                                        // CONDITION IF MULTIPLE CHOOSED
      var queryAdd = []
      for (let i = 0; i < statement6.length; i++) {
        queryAdd.push(`(:subFuncReq {Name: '${statement6[i]}'})-[:HAS_SPEC]->(c:CPU)`)
      }
      resultStatement6Debug = 'MATCH '+String(queryAdd)+' RETURN c'

      resultStatement6 = String(queryAdd)
    }
    console.log('resultStatement6debug= '+ resultStatement6Debug) 
  }

  queryGetRel = 
  `MATCH
  (c:CPU)<-[r]-(n),
  ${resultStatement1}, 
  ${resultStatement2},
  ${resultStatement3},
  ${resultStatement4},
  ${resultStatement5},
  ${resultStatement6}
  RETURN c, collect(type(r)),collect(n.Name),c.avg,id(c)
  ORDER BY c.Name
  `
  
  console.log(queryGetRel)
  
  neo4jdriver.session.executeRead(tx => tx.run(
    queryGetRel)
  )
    .then(res => {
      return res.records.map(row => {
        const gpus = row.get('c')
        const n = row.get('collect(n.Name)')
        const r = row.get('collect(type(r))')
        const gavg = row.get('c.avg').toLocaleString("id-ID", {style:"currency", currency:"IDR"})
        const gpu_id = parseInt(row.get('id(c)'))
        const query = [gpus,n,r,gavg,gpu_id]
        return query
      })
    })
    .then(query => {

      /* console.log(query[5][4]) */
      // `names` is an array of strings
      res.render('cpu/cpu_page_result', {
        queries: query
    })
    })
    .catch(e => {
      // There was a problem with the
      // database connection or the query
      console.log(e)
    })

  }

	exports.cpu_compare = function(req,res){
		var raw_cpu_idList = req.body.choosen_cpu
		// convert string to integer
		console.log(raw_cpu_idList)
		if(typeof(raw_cpu_idList) !== "undefined"){
			if(typeof(raw_cpu_idList) == "string"){
				cpu_idList = parseInt(raw_cpu_idList)
			} else {
				var cpu_idList = raw_cpu_idList.map(function (x) { 
					return parseInt(x); 
				});
			}
			console.log(cpu_idList)
			
			neo4jdriver.session.executeRead(tx => tx.run(
				`MATCH (c:CPU)<-[r]-(n)
				WHERE id(c) IN [${cpu_idList}]
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
					//console.log(query[1][2])
					res.render('cpu/cpu_page_compare', {
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