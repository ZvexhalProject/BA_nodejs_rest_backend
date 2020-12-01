const sql = require("./db.js");

const User = function(user){
    //console.log(user);
    this.username = user.username;
    this.userpasswort = user.userpasswort;
    this.thema = user.thema;
    this.kreiert = user.kreiert;
    this.letzterlogin = user.letzterlogin;
    this.sprache = user.sprache;
    this.barrieremodus = user.barrieremodus;
}

User.create = (newUser, result) => {
    sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      //console.log("created User: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    });
  };

  User.findById = (userID, result) => {
    sql.query(`SELECT * FROM User WHERE Id = ${userID}`, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      if (res.length) {
      //  console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }
  
      // not found User with the id
      result({ kind: "not_found" }, null);
    });
  };

  User.getAll = result => { 
    sql.query("SELECT * FROM User", (err, res) => { 
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      //console.log("user: ", res);
      result(null, res);
    });
  };


  User.updateById = (id, user, result) => {
    sql.query(
      "UPDATE User SET Username = ?, Userpasswort = ?, Thema = ?, Kreiert = ?, LetzterLogin = ?, Sprache = ?, BarriereModus = ? WHERE id = ?",
      [user.username, user.userpasswort, user.thema, user.kreiert, user.letzterlogin, user.sprache, user.barrieremodus, id],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated User: ", { id: id, ...user });
        result(null, { id: id, ...user });
      }
    );
  };


  User.remove = (id, result) => {
    sql.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      if (res.affectedRows == 0) {
        // not found Customer with the id
        result({ kind: "not_found" }, null);
        return;
      }
  
      console.log("deleted User with id: ", id);
      result(null, res);
    });
  };

  User.removeAll = result => {
    sql.query("DELETE FROM User", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log(`deleted ${res.affectedRows} Users`);
      result(null, res);
    });
  };
  
  module.exports = User;
  