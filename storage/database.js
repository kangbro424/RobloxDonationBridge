const { v4: uuid } = require("uuid");

module.exports = {

    sessions: new Map(),

    donations: [],

    addDonation(data){

        data.id = Date.now().toString();

        data.uuid = uuid();

        this.donations.push(data);

        return data;

    },

    getLastDonation(){

        if(this.donations.length===0){

            return null;

        }

        return this.donations[this.donations.length-1];

    },

    getAfter(id){

        return this.donations.filter(x=>Number(x.id)>Number(id));

    }

};