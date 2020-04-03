const jwt = require('jsonwebtoken');

// const handleSignin = (db, bcrypt) => (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password) {
//     return res.status(400).json('incorrect form submission');
//   }
//   db.select('email', 'hash').from('login')
//     .where('email', '=', email)
//     .then(data => {
//       const isValid = bcrypt.compareSync(password, data[0].hash);
//       if (isValid) {
//         return db.select('*').from('users')
//           .where('email', '=', email)
//           .then(user => {
//             res.json(user[0])
//           })
//           .catch(err => res.status(400).json('unable to get user'))
//       } else {
//         res.status(400).json('wrong credentials')
//       }
//     })
//     .catch(err => res.status(400).json('wrong credentials'))
// }

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Proimise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const getAuthTokenId = () => {
  console.log('auth ok');
}

const signToken = email => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, 'JWT_SECRET');
}

const createSessions = user => {
  const { email, id } = user;
  const token = signToken(email);
}

const signinAuthentication = (db, bcrypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization ? getAuthTokenId() : handleSignin(db, bcrypt, req, res)
    .then(data => {
      data.id && data.email ? createSessions(data) : Promise.reject(data);
    })
    .catch(err => res.status(400).json(err));
}

// module.exports = {
//   handleSignin: handleSignin
// }

module.exports = {
  signinAuthentication: signinAuthentication
}