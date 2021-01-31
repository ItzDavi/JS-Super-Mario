//Text lines variables
var maxWidth = 700;
var lineHeight = 24;

var words;
var line = "";
var testLine = "";
var metrics = "";
var testwidth = 0;

var x = ((1280 / 5) - maxWidth) / 2;
var y = 60;

//Paragraphs to write
// i testi delle frasi da mostrare nei vari "livelli"
var paragraphs = [
    "La crisi del 29 è iniziata con blah blah blah blah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blahblah blah blah",
    "livello 1",
    "livello 2",
    "I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa Da ba dee da ba daa, da ba dee da ba daa I'm blue, da ba dee da "
];

//Subtitles near the game argument
// i sottotitoli dei paragrafi
var subtitles = [
    "Intro",
    "Livello 1",
    "Livello 2",
    "Livello 3"
]

function splitTexts (ctx, paragraphs, x, y, maxWidth, lineHeight) {
  //Divides the paragraphs in words
    words = paragraphs[currentLevel].split(" ");
    line = "";

    for (let i = 0; i < words.length; i++) {
      testLine = "";
      metrics = "";
      testWidth = "";
      testLine = line + words[i] + " ";
      metrics = ctx.measureText(testLine);
      testWidth = metrics.width;

      if (testWidth > maxWidth && i > 0) {
        ctx.fillText(line, x , y);
        line = words[i] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  
}
