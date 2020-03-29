const handleProfileGet = (req, res, db) => {
  const { id } = req.params;
  db.select('*').from('users').where({id})
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('Not found')
      }
    })
    .catch(err => res.status(400).json('error getting user'))
}

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  // should also add some checking here for security but do it later
  const { name, age, pet } = req.body.formInput;
  db('users')
    .where({ id })
    .update({ name }) // don't have age and pet in db yet
    .then(resp => {
      if (resp) {
        res.json('success');
      } else {
        res.status(400).json('Unable to update');
      }
    })
    .catch(err => res.status(400).json('error updating user'));
}

module.exports = {
  handleProfileGet,
  handleProfileUpdate
}