const request = require("request-promise-native")
const { getStandings } = require("../helpers")

class Olympics {
	constructor({ cache, scraper }) {
		this.scraper = scraper
		this.cache = cache
	}

	async getMedalCounts({ year }) {
		const cachedData = this.cache.get(`data-${year}`)
		
		if (cachedData) {
			console.log('Serving cached data!')
			return cachedData
		}

		const html = await request.get("http://www.nbcolympics.com/medals")
		const $ = this.scraper.load(html)
		const data = getStandings($, year)

		// cache for 15 minutes
		this.cache.put(`data-${year}`, data, 900000);
		return data
	}
}

module.exports = Olympics