const users = [
  { id: '1', name: 'Goga' },
  { id: '2', name: 'Davit' },
  { id: '3', name: 'Lazare' },
]

export const getUsers = (req, res, next) => {
  try {
    // access db or whatever
    res.send(users)
  } catch (err) {
    next(err)
  }
}

export const getUser = (req, res, next) => {
  try {
    const user = users.find((user) => user.id === req.params.id)

    if (user) {
      res.json(user)
    } else {
      res.status(400).json({ error: 'Thre is no user with such id' })
    }
  } catch (err) {
    next(err)
  }
}

export const handleRegister = (req,res) => {
    
    const {name} = req.body 
    if (users.find(user => user.name === name )) {
      return res.status(400).json({
        msg:'this user already exists'
      })
    }else{
      let user = {id:Date().toString,name}
      const addUser = users.push(user)
      console.log(addUser);
      console.log(users);
    }
  
}