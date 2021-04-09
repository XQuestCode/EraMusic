const { Database } = require('quickmongo');

const db = new Database("mongodb+srv://DynamoYT:hacker8920298@cluster0.j4tod.gcp.mongodb.net/Piro?authSource=admin&replicaSet=atlas-q46or4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true")

db.on('ready', () => {
    console.log(`Connected to the database!`);
})

module.exports = db;



// old data - dynamo = mongodb+srv://DynamoYT:hacker8920298@cluster0.j4tod.gcp.mongodb.net/Piro?authSource=admin&replicaSet=atlas-q46or4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true







// my data -   mongodb+srv://PreoMusic1:askp100mipreo@cluster0.ehlw2.mongodb.net/PreoMusic1?retryWrites=true&w=majority

// dynamo - mongodb+srv://DynamoYT:hacker8920298@cluster0.j4tod.gcp.mongodb.net/Piro?authSource=admin&replicaSet=atlas-q46or4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass%20Community&retryWrites=true&ssl=true