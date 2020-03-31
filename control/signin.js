const handleSignin = (req, res, db, bcrypt)=>{

    const {email,  password} = req.body;
    if(!email  || !password){
        return res.status(400).json('Field is blank');

    }

    db.select('email', 'hash').from('login').where(
        'email' ,'=',req.body.email
    )
    .then((data)=>{
        const isvalid = bcrypt.compareSync(password, data[0].hash);
        if(isvalid){
            return (db.select('*')
                       .from('users')
                       .where('email','=',email))
                       .then(user=>{
                           res.json(user[0])
                       })
                       .catch(err=>res.status(400).json('Unable to login'))
        }else{
            res.status(400).json('Unable to login');
        }
    })
    .catch(err=>res.status(400).json('Wrong credentials'))
}

module.exports={
    handleSignin: handleSignin
}