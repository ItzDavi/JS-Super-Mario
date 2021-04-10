//Text lines variables
var maxWidth = 700;
var lineHeight = 35;

var words;
var line = "";
var testLine = "";
var metrics = "";
var testWidth = 0;

var x = ((1280 / 2) - maxWidth);
var y = 10;

//Paragraphs to write
var paragraphs = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];

//Subtitles near the game argument
var subtitles = [
    "La crisi del '29",
    "Wallace",
    "Wallace",
    "Al Capone",
    "Proibizionismo",
    "Speakeasy",
    "Il nastro Ticker",
    "Wall Street",
    "Il martedì nero",
    "Le Flappers",
    "Le Flappers",
    "Femminismo"
]

function splitTexts (ctx, paragraphs, x, y, maxWidth, lineHeight) {
  //Divides the paragraphs in words
    words = paragraphs[currentLevel].split(" ");
    line = "";

    for (let i = 0; i < words.length; i++) {
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
