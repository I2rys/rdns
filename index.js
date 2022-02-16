//Dependencies
const Axios = require("axios")
const Fs = require("fs")

//Variables
const Self_Args = process.argv.slice(2)

//Main
if(!Self_Args.length){
    return console.log("node index.js <name> <output>")
}

if(!Self_Args[1]){
    return console.log("Invalid output.")
}

void async function Main(){
    var response = await Axios({
        method: "GET",
        url: `https://domainsdb.info/?query=${Self_Args[0]}&tld=bundle_all_zones`
    })

    response = response.data.match(/([a-z0-9A-Z]\.)*[a-z0-9-]+\.([a-z0-9]{2,24})+(\.co\.([a-z0-9]{2,24})|\.([a-z0-9]{2,24}))*/g)

    if(!response.length){
        return console.log("No registered domains with this name found.")
    }

    console.log(`${response.length} registered domains found with this name found.`)
    console.log(`Saving the results to ${Self_Args[1]}`)
    Fs.writeFileSync(Self_Args[1], response.join("\n"), "utf8")
    console.log(`Results has been saved to ${Self_Args[1]}`)
}()