const db= require('../db/index')

exports.all = (req, res) => {
    var sql = 'select * from building_message'
    db.query(sql,(err,data) => {
        if (err){
            return res.send('err :' +err.message)
        }
        res.send(data)
    })
}

exports.insert_buildingMessage = (req, res) => {
    const sql = `
    INSERT INTO building_message 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
		req.query.certNumber,  
        req.query.buildingName,
        req.query.owner,
        req.query.designer,
        req.query.location,
        req.query.totalFloorArea,
        req.query.constructionCost,
		req.query.unitCount,
		req.query.buildingSummary,
        req.query.projectType,
        req.query.contractor,
        req.query.regulatoryRequirements,
        req.query.bonusName,
        req.query.bonusVolume
      ];
     console.log(values)
     db.query(sql,values,(err,data) => {
        if (err){
            return res.send('err :' +err.message)
        } 
        console.log('successfully insert')
        res.send(data)
    })
}
exports.insert_candidateMessage = (req, res) => {
    const sql = `
    INSERT INTO candidate_message 
    (ID, Assessment_ID, building_name, governmental, class, version, project_num, project_name, LEVEL)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        req.query.certNumber,  // 證書編號
        req.query.assessmentNumber,  // 評定書編號
        req.query.buildingName,  // 建築物名稱
        req.query.publicOrPrivate,  // 公有/民間
        req.query.usageType,  // 用途別
        req.query.applicableStandard,  // 適用基準
        req.query.indicatorCount,  // 指標數
        req.query.passCriteria,  // 通過指標
        req.query.level  // 等級
    ];

    console.log(values);
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.send('err :' + err.message);
        } 
        console.log('successfully insert candidate_message');
        res.send(data);
    });
}

exports.insert_labelMessage = (req, res) => {
    const sql = `
    INSERT INTO label_message 
    (ID, Assessment_ID, building_name, governmental, class, version, project_num, project_name, LEVEL, candidate_ID)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
        req.query.certNumber,  // 證書編號
        req.query.assessmentNumber,  // 評定書編號
        req.query.buildingName,  // 建築物名稱
        req.query.publicOrPrivate,  // 公有/民間
        req.query.usageType,  // 用途別
        req.query.applicableStandard,  // 適用基準
        req.query.indicatorCount,  // 指標數
        req.query.passCriteria,  // 通過指標
        req.query.level,  // 等級
        req.query.candidateCertNumber  // 候選證書編號
    ];
    console.log(values);
    db.query(sql, values, (err, data) => {
        if (err) {
            return res.send('err :' + err.message);
        } 
        console.log('successfully insert label_message');
        res.send(data);
    });
}

exports.search_id = (req, res) => {
    const sql = `
      SELECT * FROM building_message WHERE ID = ?
    `;
    const values = [req.query.certNumber];
  
    console.log(values);
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.send('err :' + err.message);
      }
      console.log('successfully searched ID');
      res.send(data);
    });
  };

  exports.checkDuplicateCertNumber = (certNumber) => {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM building_message WHERE ID = ?';
      const values = [certNumber];
      console.log(sql)
      console.log(certNumber)
      db.query(sql, values, (err, data) => {
        if (data.length === 0) {
          reject(err);
        } else {
          resolve(data.length > 0);
        }
      });
    });
  };

  exports.getAllData = (req, res) => {
    const ID = req.query.ID;
    const isCIB = req.query.isCIB.toString();
    console.log('trigger')
    let sql;
    if (isCIB === 'true') {
      sql = `
      SELECT
          b.*,
          c.Assessment_ID,
          c.LEVEL,
          c.governmental,
          c.class,
          c.version,
          c.project_name,
          c.project_num
      FROM
          building_message AS b
      JOIN
          candidate_message AS c ON b.ID = c.ID
      WHERE 
          b.id = ?
      `;
    } else {
      sql = `
      SELECT 
      b.*,
      l.Assessment_ID,
      l.candidate_ID,
      l.LEVEL,
      l.governmental,
      l.class,
      l.version,
      l.project_name,
      l.project_num
  FROM
      building_message AS b
  JOIN
      label_message AS l ON b.ID = l.ID
  WHERE b.ID = ?
      `;
    }
  
    const values = [ID];
    
    db.query(sql, values, (err, data) => {
      if (err) {
        return res.send('err :' + err.message);
      }
      console.log(sql)
      console.log(values)
      console.log(`successfully searched ${ID}`);
      console.log(data)
      res.send(data);
    });
  };