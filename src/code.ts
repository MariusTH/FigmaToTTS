// This plugin will open a modal to prompt the user to enter a number, and
// it will then create that many rectangles on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser enviroment (see documentation).

// This plugin counts the number of layers, ignoring instance sublayers,
// in the document
// import { readFile } from 'fs';
// readFile('/../.env', (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });
// console.log(process.cwd());
// const dotenvt = require('dotenv');
// console.log(dotenvt);
// const result = dotenvt.config();

// if (result.error) {
//   console.log(result.error);
// }

// console.log(result.parsed)

let textNodes : any = [];

const card = figma.currentPage.findOne(node => node.type === "GROUP" && node.name === "Card");

// function traverse(node:any) : any {
//   if ("children" in node) {
//     if (node.type !== "INSTANCE") {
//       let noods : any = []
//       for (const child of node.children) {
//         noods = [...traverse(child)]
//       }
//       return noods;
//     }
//   } else {
//     if(node.type === "TEXT") {
//       return node;
//     }
//   }
// }

// // // Trenger navnet og IDen ifra disse.
// function getTextElements() {
// 	// Get the card based on something.
// 	console.log("FIGMA TEST!!");
// 	console.log(figma);
	
// 	traverse(card);
// 	console.log(textNodes);

// }

// This shows the HTML page in "ui.html".
figma.showUI(__html__);

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = async msg => {
  //getTextElements();
  console.log(textNodes);
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (msg.type === 'sync-data') {
    console.log("Syncing");
    console.log(msg.rowID);
    console.log(msg.rows);
    let rowIDs = msg.rowID;
    let rows = msg.rows;
    if(!card) return;
    let x = card.x
    let y = card.y
    let clones = [];
    for(let i = 0; i < rows.length; i++) {
      x += card.width + 10;
      let copy = card.clone() as any;
      copy.x = x;
      for(let j = 0; j < rowIDs.length; j++) {
        if(!rowIDs[j]) continue;
        let textNode = copy.findOne((node:any) => node.type === "TEXT" && node.name === rowIDs[j]);
        if(textNode) {
          let len = textNode.characters.length
          for (let k = 0; k < len; k++) {
            await figma.loadFontAsync(textNode.getRangeFontName(k, k+1))
          }
          console.log(textNode);
          console.log(rows[i]);
          console.log(rows[i][rowIDs[j]]);
          textNode.deleteCharacters(0, len);
          textNode.insertCharacters(0, rows[i][rowIDs[j]]);
          //textNode.characters = rows[i][rowIDs[j]];
          console.log("HEllo");
        }
      }
    }
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};
