const express = require("express")
const server = express()

const Olympics = require("./lib/Olympics")
const cache = require("memory-cache")
const scraper = require("cheerio")
const olympics = new Olympics({ cache, scraper })

const port = parseInt(process.env.PORT, 10) || 3000

server.get(["/data", "/data/:year"], async (req, res) => {
    const { year = 2014 } = req.params
    const data = await olympics.getMedalCounts({ year })
    
	console.log(`Data fetched for ${year}`);

    res.json({ data })
})

server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
})