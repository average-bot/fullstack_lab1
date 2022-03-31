const router = require('express').Router();
const User = require('../User');

// http://localhost:3000/api/users
// Show all the users
router.get('/users', async (req, res) => {
  try{
    const users = await User.find();
    if(!users) {
      throw new Error("No users exist");
    }
    res.send(users);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});


// http://localhost:3000/api/users/:id
// Create new User
router.post('/users/:id', async (req, res) => {    
  const user = new User({
    id: req.body.id,
    name: req.body.name,
    age: req.body.age
  });

  try {
    const foundUser = await User.findOne({ id: req.params.id });
    if(foundUser != null) {
      throw new Error("User already exists");
    }
    const newUser = await user.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// http://localhost:3000/api/users/:id
// Show individual user
router.get("/users/:id", async (req, res) => {
  try{
    const user = await User.findOne({ id: req.params.id });
    if(!user) {
      throw new Error("User does not exist");
    }
    res.send(user);
  }catch (err) {
    res.status(404).json({ message: err.message });
  }
});

// http://localhost:3000/api/users/:id
// Update user
router.put("/users/:id", async (req, res) => {
	try {
		const user = await User.findOne({ id: req.params.id });
    if(!user){
      throw new Error("User does not exist");
    }
		if (req.body.name) {
			user.name = req.body.name;
		}
		if (req.body.age) {
			user.age = req.body.age;
		}
		await user.save();
		res.send(user);
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

// http://localhost:3000/api/users/:id
// Delete an user
router.delete("/users/:id", async (req, res) => {
	try {
    const user = await User.findOne({ id: req.params.id });
    if(!user){
      throw new Error("User does not exist");
    }
		await User.deleteOne({ id: req.params.id });
		res.status(204).send();
	} catch (err) {
		res.status(404).json({ message: err.message });
	}
});

module.exports = router;