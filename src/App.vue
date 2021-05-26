<template>
	<div>
		<h2>Rectangle Creator</h2>
		<p>
			API KEY:
			<input v-model="api_key" value="API_KEY123" />
			API KEY {{api_key}}
		</p>		
		<p>
			Shareable URL:
			<input v-model="url" value="123.google.sheet" />
			URL {{url}}
		</p>
		<button @click="create">Sync</button>
		<button @click="cancel">Cancel</button>
	</div>
</template>

<script>
import { GoogleSpreadsheet } from 'google-spreadsheet'; // TODO FIX
export default {
	name: "App",
	data() {
		return {
			api_key: "",
			url: "",
			count: 2,
		};
	},
	methods: {
		create: async function() {
			console.log("CREATING!!!!");
			console.log(process.env.NODE_ENV);
			const doc = new GoogleSpreadsheet(this.url);
			console.log(process.env.API_KEY);
			console.log(process.env);
			await doc.useApiKey(this.api_key);
			
			await doc.loadInfo();

			const sheet = doc.sheetsByIndex[0];
			await sheet.loadHeaderRow();
			const rows = await sheet.getRows();
			const headerValues = sheet.headerValues
			// convert GoogleSpreadSeetRows into simple objects
			let simpleRows = [];
			for(let i = 0; i < rows.length; i++) {
				let row = {};
				for(let j = 0; j < headerValues.length; j++) {
					row[headerValues[j]] = rows[i][headerValues[j]];
				}
				simpleRows.push(row);
			}
			parent.postMessage(
				{ pluginMessage: { type: "sync-data", rowID: sheet.headerValues, rows: simpleRows } },
				"*"
			);
		},
		cancel: function() {
			parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
		},
	},
	created() {},
};
</script>

<style>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}
body {
	font: 12px sans-serif;
	text-align: center;
	margin: 20px;
}
button {
	border-radius: 5px;
	background: white;
	color: black;
	border: none;
	padding: 8px 15px;
	margin: 0 5px;
	box-shadow: inset 0 0 0 1px black;
	outline: none;
}
#create {
	box-shadow: none;
	background: #18a0fb;
	color: white;
}
input {
	border: none;
	outline: none;
	padding: 8px;
}
input:hover {
	box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.1);
}
button:focus {
	box-shadow: inset 0 0 0 2px #18a0fb;
}
#create:focus {
	box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.3);
}
input:focus {
	box-shadow: inset 0 0 0 2px #18a0fb;
}
</style>
