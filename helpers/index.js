const setValidCount = count => {
	count = parseInt(count.trim())
	return !isNaN(count) && count >= 0 ? count : 0
}

const getStandings = ($, year) => {
	let data = []

	$(`.standings-${year} tr`).each((i, element) => {
		const rows = $(element).find(".medal-col")
		const place = parseInt(rows.eq(0).text())
		const image = $(element).find("img")
		const country = image.attr("alt")

		if (isNaN(place)) {
			return
		}

		const cData = {
			place,
			country,
			image: image.attr("src"),
			medals: {
				gold: setValidCount(rows.eq(2).text()),
				silver: setValidCount(rows.eq(3).text()),
				bronze: setValidCount(rows.eq(4).text()),
				totals: setValidCount(rows.eq(5).text())
			}
		}

		data.push(cData)
	})

	return data
}

module.exports = { getStandings, setValidCount }
