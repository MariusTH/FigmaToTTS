# Figma To TTS
This plugin is intended to be able to use a tempalte card and create multiple cards which will then be placed and exported as a png that can be imported into TTS as a deck.

# Setup
download git repo, open Figma desktop version and go to plugin->Development->new plugin and use "excisting manifest" and point to the one in this repo.
Then run npm install and npm run watch and it should work.

# how to use :
Currently it is clunky and the template only works if there is a group called "Card", and you have to provide your own API_KEY for google sheets [see](https://developers.google.com/workspace/guides/create-project) and paste in the sharable google link part : from a link like https://docs.google.com/spreadsheets/d/1E8i0h8wZA_b_ASoji97-2DXMAjn8K8lgLDtztCq3Gjg/edit#gid=0 we only need the part after "/d/" which in this case is : 1E8i0h8wZA_b_ASoji97-2DXMAjn8K8lgLDtztCq3Gjg
