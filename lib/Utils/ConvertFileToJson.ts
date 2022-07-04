import * as fs from 'fs'
import * as csv from 'csvtojson'
import * as csvParse from '@fast-csv/parse'
import * as csvParser from 'csv-parser'

export default class ConvertFileToJson {
	public async getExtension(filename, file) {
		var i = filename.lastIndexOf('.');
		let fileType = await (i < 0) ? '' : filename.substr(i);

		if (fileType == 'txt') {

		}

		// return await this.csvParse(file)
		// return await this.convertCSVtoJson(file)
		// return await this.csvToJson(file)
		// return await this.csvJson(file)
	}

	public async csvJson(file) {
		const lines = file.split('\n')
		const result: any[] = [];
		const headers = lines[0].split(',')

		for (let i = 1; i < lines.length; i++) {        
			if (!lines[i])
				continue
			let obj = {}
			const currentline = lines[i].split(',')

			for (let j = 0; j < headers.length; j++) {
					obj[headers[j]] = currentline[j]
			}
			result.push(obj)
			console.log('obj', + obj);
			
		}
		console.log('result ' + result);
			
		return result
	}

	public async csvParse(file) {
		let result: any[] = []
		try {
			await fs.createReadStream(file)
			.pipe(csvParser())
			.on('data', (data) => result.push(data))
			.on('end', () => {
				console.log(result)
			})
			return await result
		} catch (e) {
			throw new Error('error parsing' + e.message)
		}
	}

	public async csvToJson(file) {
		csv()
		.fromStream(file)
		.then((jsonObj) => {
			console.log(jsonObj);
		})

		try {
			const jsonArray = await csv().fromFile(file)
			console.log(jsonArray);
			
			return jsonArray
		} catch (e) {
			throw new Error('error here ' + e.message)
		}
	}

	public async convertCSVtoJson(file) {
		let csv = await fs.readFileSync(file)
		const array = csv.toString().split('\n')
		let csvToJsonResult
		const headers = array[0].split(', ')

		for (let i = 0; i < array.length; i++) {
			const jsonObject = {}
			const currentArrayString = array[i]
			let string = ''
			let quoteFlag = 0
			for (let character of currentArrayString) {
				if (character == '"' && quoteFlag == 0) {
					quoteFlag = 1
				}
				else if (character == '"' && quoteFlag ==1) {
					quoteFlag = 0
				}
				if (character == ', ' && quoteFlag == 0) {
					character = '|'
				}
				if (character != '"') {
					string += character
				}
			}

			let jsonProperties = string.split('|')
			
			for (let i in headers) {
				if (jsonProperties[i].includes(', ')) {
					jsonObject[headers[i]] = jsonProperties[i].split(', ').map(item => item.trim())
				}
				else {
					jsonObject[headers[i]] = jsonProperties[i]
				}
			}
			csvToJsonResult.push(jsonObject)
		}
		try {
			const json = JSON.stringify(csvToJsonResult)
			console.log(json);
			return json
		} catch (e) {
			throw new Error(e.message)
		}
		
	}

	public async csvConvert(file) {
		return Buffer.from(file.Body).toString('utf8')
	}

	public async parseCsvToJson(file) {
		let csvParsePromise = new Promise((resolve, reject) => {
			const parser = csvParse.parseStream(file, { headers: true }).on("data", function (data) {
					parser.pause();  // can pause reading using this at a particular row
					console.log('One line from .csv >> ', data);
					parser.resume(); // to continue reading
			}).on("end", function () {
					resolve('csv parse process finished')
			}).on("error", function () {
					reject('csv parse process failed')
			});
		});

		try { await csvParsePromise }
		catch(err) {
			console.log('an error has occurred')
		}
	}
}