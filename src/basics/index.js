const express = require('express');
const bodyParser = require('body-parser');

const router = express();

router.use(bodyParser.urlencoded({ extended: false}));

router.use(bodyParser.json());

const production = [];

router.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin',"*");
    res.setHeader('Access-Control-Allow-Headers',"*");
    res.setHeader('Access-Control-Allow-Methods',"*");
    next();
})

router.get('/',(req,res,next) => {
res.send(JSON.stringify(production));
});

router.post('/data',(req,res,next) => {
const body = req.body;
if (body.mode == 1)
{
    production.push(body);
    //console.log(production);

    res.send('Response received!');
} else if (body.mode == 2)
{
    let i = 0;
    for (i = 0 ; i < production.length; i++)
    {
      if (production[i].id == body.id)
      {
        production.splice(i,1);
        break;
      }
    }
    res.send('Query successful!');

} else if (body.mode == 3)
{
    let j = 0;
    for (j = 0 ; j < production.length; j++)
    {
      if (production[j].id == body.id)
      {
        production[j].heading = body.heading;
        production[j].priority = body.priority;
        production[j].description = body.description;
        production[j].date = body.date;
        break;
      }
    }
          
   res.send("Change processed");
}
});

router.listen(5000);