const Clarifai=require('clarifai');

const app = new Clarifai.App({
    apiKey: '14d636d4e89d44a79015bf6ebc8bf1c0'
   });
   
const handleApiCall = (req, res) =>{
    app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data=>{
        res.json(data);
    })
    .catch(err=>res.status('Unable to work with api'));
}

const handleImage = (req, res, db)=>{
    const {id}=req.body;
    db('users').where('user_id','=',id)
    .increment( 'entries',1 )
    .returning('entries')
    .then(entries=>{res.json(entries)})
    .catch(err=>res.status(400).json('unable to get entries'))
}

module.exports={
    handleImage, handleApiCall
}