const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const db = require("./storage/database");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const sessions = {};

app.get("/", (req,res)=>{

    res.json({
        ok:true,
        message:"Roblox Donation Bridge V2"
    });

});

const {v4:uuid}=require("uuid");

app.post("/api/session",(req,res)=>{

    const token=uuid();

    sessions[token]={

        universeId:req.body.universeId,
        created:Date.now()

    };

    res.json({

        ok:true,
        token

    });

});

app.get("/api/tail",(req,res)=>{

    const last=db.getLastDonation();

    if(!last){

        return res.json({

            id:"0"

        });

    }

    res.json({

        id:last.id

    });

});

app.get("/api/donations",(req,res)=>{

    const after=req.query.after||"0";

    res.json({

        items:db.getAfter(after)

    });

});

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{

    console.log("================================");
    console.log(" Roblox Donation Bridge V2");
    console.log(" Port :",PORT);
    console.log("================================");

});