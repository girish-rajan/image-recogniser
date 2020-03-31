const handleProfile = (req, res, db)=>{
    const {id}=req.params;
    db.select('*').from('users').where({
        user_id: id
    })
    .then((user)=>{
        if (user.length){
            res.json(user[0]);
        }
        else{
            res.status(400).json('error getting user');
        }
        
    })
    // if (found===false){
    //     return res.json('User not found');
    // }
        
}

module.exports={
    handleProfile: handleProfile
}