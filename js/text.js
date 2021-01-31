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
    "La \“Crisi del '29\” anche chiamata \“Grande depressione\” fu la crisi economica che alla fine degli anni Venti colpì l’economia mondiale riducendo su scala globale produzione, occupazione, redditi, salari, consumi e risparmi. L’inizio della grande depressione coincide con il pesante crollo che si abbatté sulla Borsa di Wall Street",
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
