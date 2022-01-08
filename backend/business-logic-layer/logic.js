const dal = require("../data-access-layer/dal");
const jwt = require("jsonwebtoken");

function getAllDiamonds() {
  return dal.executeQueryAsync("select * from diamonds");
}

function getByCategoryId(categoryId) {
  //limit to prevent more then 4 diamons in pop up :
  return dal.executeQueryAsync(`select * from diamonds where categoryId =? LIMIT 4`,
  // preventing sql injection :
   [categoryId,]); 
}

async function loginAsync(credentials) {
  const user = await dal.executeQueryAsync(
    `
              select * from users 
              where username=?
              and password=?
          `,
    [credentials.username, credentials.password]
  );
  if (!user || user.length < 1) return null;
  delete user[0].password;
  user[0].token = jwt.sign(
    { user: user[0] },
    "welcome to my Itamar`s diamonds site",
    { expiresIn: "50 minutes" }
  );
  return user[0];
}

function getAllUsers() {
  return dal.executeQueryAsync("select * from users");
}

function addSingleUserAsync(user) {
    console.log(user);
    return dal.executeQueryAsync(
      `insert into users values
       (?,?,?,? )`, // preventing sql injection
      [
        user.chosenUserName,user.password,"", ""
      ]
    );
  }

  function addSingleDiamondAsync(diamond, imageName, price, categoryId) {
    return dal.executeQueryAsync(
      `insert into diamonds values
       (?,?,?,?,?,DEFAULT,?,?,?)`,  // default for AI field
      [diamond.carat,diamond.weight,diamond.cut,diamond.color,diamond.clarity,price, categoryId, imageName ]
    );
  }

module.exports = {
  getAllDiamonds,
  getByCategoryId,
  loginAsync,
  getAllUsers,
  addSingleUserAsync,
  addSingleDiamondAsync
};
