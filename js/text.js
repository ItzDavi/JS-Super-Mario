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
// i testi delle frasi da mostrare nei vari "livelli"
var paragraphs = [
    "La via della democrazia per risolvere questa crisi, può sembrare lunga e tortuosa, ma alla lunga evita i rigidi dogmi del fascismo e del comunismo. L’accorgimento principale per risolvere questa difficoltà sta nel regolare le tariffe doganali e il sistema monetario, di controllare gli interessi ferroviari, di svolgere una politica dei prezzi e della produzione che conservi un rapporto costantemente equilibrato tra il reddito dell’agricoltura, quello dei lavoratori e quello dell’industria. Grazie a queste manovre è possibile dirigere e regolare le forze che incidono sul reddito nazionale.",
    "Wallace sostiene che in democrazia, lo stato deve fornire le luci rosse e le luci verdi per dirigere il traffico. Invece, i devoti alla concorrenza illimitata e alla completa esclusione dell’intervento dello stato in economia suggeriscono di togliere i semafori, in modo che nelle strade, gli automobilisti e i pedoni mostrino le legge di sopravvivenza del più forte, cosa che peggiora solo il mercato. Dopo la guerra, molti stati hanno optato per la pianificazione coatta di piani economici, come la Germania, l’Italia e la Russia, impoverendo in tal modo il ceto medio. Gli Stati Uniti non devono assolutamente attuare una economia pianificata e dettagliata, tranne che per le risorse naturali o, comunque, per casi che non siano d’emergenza.",
    "Al Capone (Scarface) è stato un mafioso statunitense di origini italiane, considerato un simbolo del gangsterismo americano. Durante la Grande Depressione, nel 1930 in un negozio in affitto aprì una mensa per i poveri. La cucina serviva gratuitamente colazione, pranzo e cena, sfamando in media 2.200 persone al giorno. All'interno della mensa dei poveri, donne sorridenti con grembiuli bianchi servivano caffè e panini dolci per colazione, zuppa e pane per pranzo, e zuppa, caffè e pane per cena. Nessuna seconda porzione veniva negata. Il giorno del Ringraziamento, si dice che Capone abbia dato ad almeno 5.000 persone affamate un gratuito, caldo pasto festivo. Una scrittrice ha definito Al Capone come un ambidestro gigante che uccide con una mano e dà da mangiare con l'altra",
    "Il nastro Ticker è stato il primo mezzo di comunicazione elettronico digitale, trasmettendo informazioni sui prezzi delle azioni sulle linee telegrafiche, in uso tra il 1870 e il 1970. Si trattava di una striscia di carta che attraversava una macchina chiamata ticker di borsa, che stampò i nomi delle aziende abbreviate come simboli alfabetici Seguito da numerose informazioni sulle transazioni e sulle informazioni sul volume. Il termine 'ticker' proveniva dal suono prodotto dalla macchina come stampato. ",
    "Con il termine Flappers si indica oramai comunemente una generazione di giovani donne occidentali che durante gli anni ’20 iniziarono a distinguersi attraverso scelte estetiche e di comportamento molto originali e coraggiose. Le flapper si caratterizzano per l'eccessivo trucco, per il fatto che bevessero alcolici come gli uomini, ma soprattutto per la loro sessualità disinvolta e libera, oltre che per fumare in pubblico, guidare automobili da sole e violare le norme sociali e della morale sessuale del tempo.",
    "Le flapper furono le prime a mostrare le caviglie in pubblico indossando abiti e gonne più corti e furono anche le prime a tagliare i capelli a 'caschetto'. Ascoltavano musica jazz e danzavano da sole il charleston, il nuovo ballo icona degli anni 20 che, non a caso, fu il primo che si poteva danzare anche non accoppiati. Queste giovani donne generalmente ostentavano comunque il proprio disprezzo per il comportamento 'da brava ragazza beneducata"
];

//Subtitles near the game argument
// i sottotitoli dei paragrafi
var subtitles = [
    "Wallace",
    "Wallace",
    "Al Capone",
    "Il nastro Ticker",
    "Le Flappers",
    "Le Flappers"
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
