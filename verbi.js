// I verbi del gioco. Per aggiungerne uno basta una riga in VERBI.
// presente / remoto: 6 forme (io tu lui noi voi loro)
// imp: parte che precede "vo, vi, va..." nell'imperfetto (o imperfetto: 6 forme se irregolare)
// part: participio (maschile singolare) · aus: 'avere' o 'essere' · rad: radice del futuro (es. "manger" per mangerò)
const PERSONE = ['io', 'tu', 'lui / lei', 'noi', 'voi', 'loro'];
const NOMI_PERSONE = ['1ª singolare', '2ª singolare', '3ª singolare', '1ª plurale', '2ª plurale', '3ª plurale'];

const FINALI_FUTURO = ['ò', 'ai', 'à', 'emo', 'ete', 'anno'];
const FINALI_IMPERFETTO = ['vo', 'vi', 'va', 'vamo', 'vate', 'vano'];

const VERBI = [
  { inf: 'essere',
    presente: ['sono', 'sei', 'è', 'siamo', 'siete', 'sono'],
    imperfetto: ['ero', 'eri', 'era', 'eravamo', 'eravate', 'erano'],
    remoto: ['fui', 'fosti', 'fu', 'fummo', 'foste', 'furono'],
    part: 'stato', aus: 'essere', rad: 'sar' },
  { inf: 'avere',
    presente: ['ho', 'hai', 'ha', 'abbiamo', 'avete', 'hanno'],
    imp: 'ave',
    remoto: ['ebbi', 'avesti', 'ebbe', 'avemmo', 'aveste', 'ebbero'],
    part: 'avuto', aus: 'avere', rad: 'avr' },
  { inf: 'andare',
    presente: ['vado', 'vai', 'va', 'andiamo', 'andate', 'vanno'],
    imp: 'anda',
    remoto: ['andai', 'andasti', 'andò', 'andammo', 'andaste', 'andarono'],
    part: 'andato', aus: 'essere', rad: 'andr' },
  { inf: 'fare',
    presente: ['faccio', 'fai', 'fa', 'facciamo', 'fate', 'fanno'],
    imp: 'face',
    remoto: ['feci', 'facesti', 'fece', 'facemmo', 'faceste', 'fecero'],
    part: 'fatto', aus: 'avere', rad: 'far' },
  { inf: 'mangiare',
    presente: ['mangio', 'mangi', 'mangia', 'mangiamo', 'mangiate', 'mangiano'],
    imp: 'mangia',
    remoto: ['mangiai', 'mangiasti', 'mangiò', 'mangiammo', 'mangiaste', 'mangiarono'],
    part: 'mangiato', aus: 'avere', rad: 'manger' },
  { inf: 'giocare',
    presente: ['gioco', 'giochi', 'gioca', 'giochiamo', 'giocate', 'giocano'],
    imp: 'gioca',
    remoto: ['giocai', 'giocasti', 'giocò', 'giocammo', 'giocaste', 'giocarono'],
    part: 'giocato', aus: 'avere', rad: 'giocher' },
  { inf: 'correre',
    presente: ['corro', 'corri', 'corre', 'corriamo', 'correte', 'corrono'],
    imp: 'corre',
    remoto: ['corsi', 'corresti', 'corse', 'corremmo', 'correste', 'corsero'],
    part: 'corso', aus: 'avere', rad: 'correr' },
  { inf: 'scrivere',
    presente: ['scrivo', 'scrivi', 'scrive', 'scriviamo', 'scrivete', 'scrivono'],
    imp: 'scrive',
    remoto: ['scrissi', 'scrivesti', 'scrisse', 'scrivemmo', 'scriveste', 'scrissero'],
    part: 'scritto', aus: 'avere', rad: 'scriver' },
  { inf: 'dormire',
    presente: ['dormo', 'dormi', 'dorme', 'dormiamo', 'dormite', 'dormono'],
    imp: 'dormi',
    remoto: ['dormii', 'dormisti', 'dormì', 'dormimmo', 'dormiste', 'dormirono'],
    part: 'dormito', aus: 'avere', rad: 'dormir' },
  { inf: 'finire',
    presente: ['finisco', 'finisci', 'finisce', 'finiamo', 'finite', 'finiscono'],
    imp: 'fini',
    remoto: ['finii', 'finisti', 'finì', 'finimmo', 'finiste', 'finirono'],
    part: 'finito', aus: 'avere', rad: 'finir' }
];

const VERBO_ESSERE = VERBI.find(v => v.inf === 'essere');
const VERBO_AVERE = VERBI.find(v => v.inf === 'avere');

// Gli 8 tempi (le "sessioni"). aux = tempo semplice dell'ausiliare nei tempi composti.
const TEMPI = [
  { id: 'presente',     nome: 'Presente',            aux: null,         regola: 'Il presente dice quello che succede adesso.' },
  { id: 'imperfetto',   nome: 'Imperfetto',          aux: null,         regola: 'L\'imperfetto dice qualcosa che durava o si ripeteva nel passato (es. "mangiavo").' },
  { id: 'remoto',       nome: 'Passato remoto',      aux: null,         regola: 'Il passato remoto dice un fatto passato lontano e finito (es. "mangiai").' },
  { id: 'futuro',       nome: 'Futuro semplice',     aux: null,         regola: 'Il futuro semplice dice quello che succederà (es. "mangerò").' },
  { id: 'prossimo',     nome: 'Passato prossimo',    aux: 'presente',   regola: 'Il passato prossimo ha due pezzi: ho/sono... + il participio (es. "ho mangiato").' },
  { id: 'trapprossimo', nome: 'Trapassato prossimo', aux: 'imperfetto', regola: 'Il trapassato prossimo è avevo/ero... + il participio (es. "avevo mangiato"): un fatto avvenuto PRIMA di un altro fatto passato.' },
  { id: 'trapremoto',   nome: 'Trapassato remoto',   aux: 'remoto',     regola: 'Il trapassato remoto è ebbi/fui... + il participio (es. "ebbi mangiato"): si usa dopo "quando", "dopo che" insieme a un passato remoto.' },
  { id: 'anteriore',    nome: 'Futuro anteriore',    aux: 'futuro',     regola: 'Il futuro anteriore è avrò/sarò... + il participio (es. "avrò mangiato"): un fatto futuro che avverrà PRIMA di un altro fatto futuro.' }
];

function semplice(v, id, p) {
  if (id === 'presente') return v.presente[p];
  if (id === 'remoto') return v.remoto[p];
  if (id === 'futuro') return v.rad + FINALI_FUTURO[p];
  if (id === 'imperfetto') return v.imperfetto ? v.imperfetto[p] : v.imp + FINALI_IMPERFETTO[p];
}

// Forma giusta: id = id di un tempo, p = 0..5
function forma(v, id, p) {
  const t = TEMPI.find(x => x.id === id);
  if (!t.aux) return semplice(v, id, p);
  const aus = semplice(v.aus === 'essere' ? VERBO_ESSERE : VERBO_AVERE, t.aux, p);
  // con "essere" il participio si accorda (stato -> stati) al plurale
  let part = v.part;
  if (v.aus === 'essere' && p >= 3) part = part.replace(/o$/, 'i');
  return aus + ' ' + part;
}
