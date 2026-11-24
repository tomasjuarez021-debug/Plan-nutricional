/* El plan semanal, tal cual el documento, con los ingredientes de cada comida
   cargados en cantidades para poder armar la lista de compras.
   Legumbres, arroz y quinoa van EN COCIDO (como dice el plan); la lista de
   compras los pasa a secos/crudos. Las verduras "libres" llevan una cantidad
   estimada razonable por persona. */

export type Person = 'el' | 'ella';
export type Shop = 'verduleria' | 'super' | 'dietetica';

export const SHOPS: { id: Shop; name: string }[] = [
  { id: 'verduleria', name: 'Verdulería' },
  { id: 'super', name: 'Supermercado' },
  { id: 'dietetica', name: 'Dietética' },
];

type Item = {
  name: string;
  shop: Shop;
  /* Unidad en la que se cargan las cantidades: gramos, mililitros o unidades. */
  unit: 'g' | 'ml' | 'u';
  /* Cocido → seco/crudo (lo que se compra). */
  raw?: number;
  /* Para unidades: cómo se llaman. */
  word?: [string, string];
};

export const ITEMS = {
  // Verdulería
  espinaca: { name: 'Espinaca', shop: 'verduleria', unit: 'g' },
  acelga: { name: 'Acelga', shop: 'verduleria', unit: 'g' },
  rucula: { name: 'Rúcula', shop: 'verduleria', unit: 'g' },
  lechuga: { name: 'Lechuga', shop: 'verduleria', unit: 'g' },
  tomate: { name: 'Tomate', shop: 'verduleria', unit: 'g' },
  pepino: { name: 'Pepino', shop: 'verduleria', unit: 'g' },
  zanahoria: { name: 'Zanahoria', shop: 'verduleria', unit: 'g' },
  apio: { name: 'Apio', shop: 'verduleria', unit: 'g' },
  zapallito: { name: 'Zapallito', shop: 'verduleria', unit: 'g' },
  berenjena: { name: 'Berenjena', shop: 'verduleria', unit: 'g' },
  cebolla: { name: 'Cebolla', shop: 'verduleria', unit: 'g' },
  brocoli: { name: 'Brócoli', shop: 'verduleria', unit: 'g' },
  morron: { name: 'Morrón', shop: 'verduleria', unit: 'g' },
  champignon: { name: 'Champiñones', shop: 'verduleria', unit: 'g' },
  batata: { name: 'Batata', shop: 'verduleria', unit: 'g' },
  calabaza: { name: 'Calabaza', shop: 'verduleria', unit: 'g' },
  papa: { name: 'Papa', shop: 'verduleria', unit: 'g' },
  palta: { name: 'Palta', shop: 'verduleria', unit: 'u', word: ['palta', 'paltas'] },
  limon: { name: 'Limón', shop: 'verduleria', unit: 'u', word: ['limón', 'limones'] },
  banana: { name: 'Banana', shop: 'verduleria', unit: 'u', word: ['banana', 'bananas'] },
  manzana: { name: 'Manzana', shop: 'verduleria', unit: 'u', word: ['manzana', 'manzanas'] },
  pera: { name: 'Pera', shop: 'verduleria', unit: 'u', word: ['pera', 'peras'] },
  naranja: { name: 'Naranja', shop: 'verduleria', unit: 'u', word: ['naranja', 'naranjas'] },
  mandarina: { name: 'Mandarina', shop: 'verduleria', unit: 'u', word: ['mandarina', 'mandarinas'] },
  kiwi: { name: 'Kiwi', shop: 'verduleria', unit: 'u', word: ['kiwi', 'kiwis'] },
  fruta: { name: 'Fruta de estación', shop: 'verduleria', unit: 'u', word: ['fruta', 'frutas'] },

  // Supermercado
  huevo: { name: 'Huevos', shop: 'super', unit: 'u', word: ['huevo', 'huevos'] },
  pan: { name: 'Pan integral', shop: 'super', unit: 'u', word: ['rebanada', 'rebanadas'] },
  leche: { name: 'Leche', shop: 'super', unit: 'ml' },
  yogurGriego: { name: 'Yogur griego natural', shop: 'super', unit: 'g' },
  yogur: { name: 'Yogur natural', shop: 'super', unit: 'g' },
  ricota: { name: 'Ricota', shop: 'super', unit: 'g' },
  quesoFresco: { name: 'Queso fresco', shop: 'super', unit: 'g' },
  muzzarella: { name: 'Muzzarella', shop: 'super', unit: 'g' },
  quesoRallado: { name: 'Queso rallado', shop: 'super', unit: 'g' },
  frutosRojos: { name: 'Frutos rojos (congelados)', shop: 'super', unit: 'g' },
  fideos: { name: 'Fideos integrales', shop: 'super', unit: 'g' },
  pureTomate: { name: 'Puré de tomate', shop: 'super', unit: 'g' },
  tapaTarta: { name: 'Tapas de tarta integral', shop: 'super', unit: 'u', word: ['tapa', 'tapas'] },
  soja: { name: 'Salsa de soja', shop: 'super', unit: 'ml' },
  levadura: { name: 'Levadura seca', shop: 'super', unit: 'g' },
  aceite: { name: 'Aceite de oliva', shop: 'super', unit: 'ml' },

  // Dietética
  tofu: { name: 'Tofu', shop: 'dietetica', unit: 'g' },
  tempeh: { name: 'Tofu o tempeh', shop: 'dietetica', unit: 'g' },
  lentejas: { name: 'Lentejas', shop: 'dietetica', unit: 'g', raw: 0.42 },
  garbanzos: { name: 'Garbanzos', shop: 'dietetica', unit: 'g', raw: 0.45 },
  porotos: { name: 'Porotos negros', shop: 'dietetica', unit: 'g', raw: 0.43 },
  arroz: { name: 'Arroz integral', shop: 'dietetica', unit: 'g', raw: 0.36 },
  yamani: { name: 'Arroz yamaní', shop: 'dietetica', unit: 'g', raw: 0.36 },
  quinoa: { name: 'Quinoa', shop: 'dietetica', unit: 'g', raw: 0.37 },
  avena: { name: 'Avena', shop: 'dietetica', unit: 'g' },
  harina: { name: 'Harina integral', shop: 'dietetica', unit: 'g' },
  chia: { name: 'Chía', shop: 'dietetica', unit: 'g' },
  lino: { name: 'Lino molido', shop: 'dietetica', unit: 'g' },
  semillas: { name: 'Mix de semillas', shop: 'dietetica', unit: 'g' },
  nueces: { name: 'Nueces', shop: 'dietetica', unit: 'g' },
  almendras: { name: 'Almendras', shop: 'dietetica', unit: 'g' },
  mixFrutos: { name: 'Mix de frutos secos', shop: 'dietetica', unit: 'g' },
  mani: { name: 'Mantequilla de maní', shop: 'dietetica', unit: 'g' },
  tahini: { name: 'Tahini', shop: 'dietetica', unit: 'g' },
  cacao: { name: 'Cacao amargo', shop: 'dietetica', unit: 'g' },
} satisfies Record<string, Item>;

export type ItemId = keyof typeof ITEMS;
export const item = (id: ItemId): Item => ITEMS[id];

/* [ingrediente, cantidad él, cantidad ella] */
type Ing = [ItemId, number, number];

/* Preparaciones que se hacen enteras (tarta, pizza): cada uno come una parte. */
export const RECIPES = {
  tarta: {
    name: 'Tarta de acelga (entera)',
    ing: [
      ['acelga', 800],
      ['ricota', 250],
      ['huevo', 3],
      ['cebolla', 150],
      ['tapaTarta', 2],
    ] as [ItemId, number][],
  },
  pizza: {
    name: 'Pizza integral (8 porciones)',
    ing: [
      ['harina', 300],
      ['levadura', 10],
      ['pureTomate', 200],
      ['muzzarella', 250],
      ['morron', 80],
      ['cebolla', 80],
      ['champignon', 100],
    ] as [ItemId, number][],
  },
};
export type RecipeId = keyof typeof RECIPES;

export type Meal = {
  kind: string;
  menu: string;
  el: string;
  ella: string;
  ing: Ing[];
  recipe?: [RecipeId, number, number];
  free?: boolean;
};

export type Day = { name: string; short: string; meals: Meal[] };

const OIL: Ing = ['aceite', 15, 10];

/* Lunes a domingo (índice 0 = lunes). */
export const WEEK: Day[] = [
  {
    name: 'Lunes',
    short: 'L',
    meals: [
      { kind: 'Desayuno', menu: 'Omelette de espinaca y tomate + pan integral + naranja', el: '4 huevos · 2 rebanadas', ella: '2 huevos · 1 rebanada', ing: [['huevo', 4, 2], ['pan', 2, 1], ['espinaca', 40, 30], ['tomate', 80, 60], ['naranja', 1, 1]] },
      { kind: 'Almuerzo', menu: 'Lentejas con arroz integral y verduras salteadas', el: '250 g lentejas · 120 g arroz', ella: '170 g lentejas · 80 g arroz', ing: [['lentejas', 250, 170], ['arroz', 120, 80], ['zanahoria', 80, 60], ['zapallito', 100, 80], ['cebolla', 50, 40], OIL] },
      { kind: 'Merienda', menu: 'Yogur griego natural + banana + nueces', el: '250 g yogur · 1 banana · 20 g nueces', ella: '170 g yogur · ½ banana · 10 g nueces', ing: [['yogurGriego', 250, 170], ['banana', 1, 0.5], ['nueces', 20, 10]] },
      { kind: 'Colación', menu: 'Licuado de leche, avena y cacao amargo', el: '300 ml leche · 30 g avena', ella: '200 ml leche · 20 g avena', ing: [['leche', 300, 200], ['avena', 30, 20], ['cacao', 10, 5]] },
      { kind: 'Cena', menu: 'Tofu salteado con brócoli y morrón + batata al horno', el: '200 g tofu · 200 g batata', ella: '130 g tofu · 130 g batata', ing: [['tofu', 200, 130], ['brocoli', 150, 120], ['morron', 80, 60], ['batata', 200, 130], OIL] },
    ],
  },
  {
    name: 'Martes',
    short: 'M',
    meals: [
      { kind: 'Desayuno', menu: 'Avena cocida con leche, chía y frutos rojos + huevos duros', el: '70 g avena · 250 ml leche · 2 huevos', ella: '45 g avena · 180 ml leche · 1 huevo', ing: [['avena', 70, 45], ['leche', 250, 180], ['chia', 10, 5], ['frutosRojos', 80, 60], ['huevo', 2, 1]] },
      { kind: 'Almuerzo', menu: 'Ensalada de garbanzos, quinoa, tomate, pepino, rúcula y queso fresco', el: '220 g garbanzos · 120 g quinoa · 50 g queso', ella: '150 g garbanzos · 80 g quinoa · 30 g queso', ing: [['garbanzos', 220, 150], ['quinoa', 120, 80], ['tomate', 100, 80], ['pepino', 80, 60], ['rucula', 40, 30], ['quesoFresco', 50, 30], OIL] },
      { kind: 'Merienda', menu: 'Tostadas integrales con ricota y tomate', el: '2 tostadas · 120 g ricota', ella: '1 tostada · 80 g ricota', ing: [['pan', 2, 1], ['ricota', 120, 80], ['tomate', 60, 40]] },
      { kind: 'Colación', menu: 'Manzana + almendras', el: '1 manzana · 20 g almendras', ella: '1 manzana · 10 g almendras', ing: [['manzana', 1, 1], ['almendras', 20, 10]] },
      { kind: 'Cena', menu: 'Hamburguesas caseras de porotos negros y avena + calabaza asada + ensalada', el: '2 medallones (~200 g porotos) · 200 g calabaza', ella: '1 medallón grande (~130 g porotos) · 150 g calabaza', ing: [['porotos', 200, 130], ['avena', 30, 20], ['cebolla', 40, 30], ['calabaza', 200, 150], ['lechuga', 60, 50], ['tomate', 60, 50], OIL] },
    ],
  },
  {
    name: 'Miércoles',
    short: 'M',
    meals: [
      { kind: 'Desayuno', menu: 'Yogur griego + avena tostada + kiwi + semillas', el: '250 g yogur · 50 g avena · 1 cda semillas', ella: '170 g yogur · 30 g avena · 1 cdta semillas', ing: [['yogurGriego', 250, 170], ['avena', 50, 30], ['kiwi', 1, 1], ['semillas', 10, 5]] },
      { kind: 'Almuerzo', menu: 'Tarta integral de acelga, ricota y huevo + ensalada', el: '¼ de tarta', ella: '⅙ de tarta', ing: [['lechuga', 60, 50], ['tomate', 80, 60], ['zanahoria', 50, 40], OIL], recipe: ['tarta', 1 / 4, 1 / 6] },
      { kind: 'Merienda', menu: 'Huevos duros + pera', el: '2 huevos · 1 pera', ella: '1 huevo · 1 pera', ing: [['huevo', 2, 1], ['pera', 1, 1]] },
      { kind: 'Colación', menu: 'Licuado de leche, banana y mantequilla de maní', el: '300 ml leche · 1 banana · 1 cda maní', ella: '200 ml leche · ½ banana · 1 cdta maní', ing: [['leche', 300, 200], ['banana', 1, 0.5], ['mani', 16, 5]] },
      { kind: 'Cena', menu: 'Curry de garbanzos y espinaca (base de yogur) + arroz integral', el: '220 g garbanzos · 120 g arroz', ella: '150 g garbanzos · 80 g arroz', ing: [['garbanzos', 220, 150], ['espinaca', 100, 80], ['yogur', 80, 60], ['cebolla', 50, 40], ['arroz', 120, 80], OIL] },
    ],
  },
  {
    name: 'Jueves',
    short: 'J',
    meals: [
      { kind: 'Desayuno', menu: 'Tostadas integrales con palta y huevo poché + mandarina', el: '2 tostadas · ¼ palta · 3 huevos', ella: '1 tostada · ⅛ palta · 2 huevos', ing: [['pan', 2, 1], ['palta', 0.25, 0.125], ['huevo', 3, 2], ['mandarina', 1, 1]] },
      { kind: 'Almuerzo', menu: 'Wok de tofu y vegetales con arroz yamaní', el: '200 g tofu · 120 g arroz', ella: '130 g tofu · 80 g arroz', ing: [['tofu', 200, 130], ['yamani', 120, 80], ['morron', 80, 60], ['zanahoria', 60, 50], ['zapallito', 80, 60], ['cebolla', 50, 40], ['soja', 15, 10], OIL] },
      { kind: 'Merienda', menu: 'Yogur natural + manzana con canela + nueces', el: '250 g yogur · 1 manzana · 20 g nueces', ella: '170 g yogur · 1 manzana · 10 g nueces', ing: [['yogur', 250, 170], ['manzana', 1, 1], ['nueces', 20, 10]] },
      { kind: 'Colación', menu: 'Hummus casero + bastones de zanahoria y apio', el: '100 g hummus', ella: '60 g hummus', ing: [['garbanzos', 70, 42], ['tahini', 15, 9], ['limon', 0.25, 0.15], ['zanahoria', 100, 80], ['apio', 60, 50]] },
      { kind: 'Cena', menu: 'Guiso de lentejas con calabaza, zanahoria y papa + queso rallado', el: '250 g lentejas · 20 g queso', ella: '170 g lentejas · 10 g queso', ing: [['lentejas', 250, 170], ['calabaza', 150, 100], ['zanahoria', 60, 50], ['papa', 100, 80], ['cebolla', 50, 40], ['quesoRallado', 20, 10], OIL] },
    ],
  },
  {
    name: 'Viernes',
    short: 'V',
    meals: [
      { kind: 'Desayuno', menu: 'Panqueques de avena, huevo y banana + ricota', el: '60 g avena · 3 huevos · 80 g ricota', ella: '40 g avena · 2 huevos · 50 g ricota', ing: [['avena', 60, 40], ['huevo', 3, 2], ['banana', 1, 0.5], ['ricota', 80, 50]] },
      { kind: 'Almuerzo', menu: 'Bowl de quinoa, tofu o tempeh marinado, palta y vegetales asados', el: '120 g quinoa · 150 g tofu/tempeh · ¼ palta', ella: '80 g quinoa · 100 g tofu/tempeh · ⅛ palta', ing: [['quinoa', 120, 80], ['tempeh', 150, 100], ['palta', 0.25, 0.125], ['berenjena', 100, 80], ['morron', 60, 50], ['zapallito', 80, 60], OIL] },
      { kind: 'Merienda', menu: 'Leche con cacao amargo + tostadas con queso', el: '250 ml leche · 2 tostadas · 40 g queso', ella: '180 ml leche · 1 tostada · 25 g queso', ing: [['leche', 250, 180], ['cacao', 10, 5], ['pan', 2, 1], ['quesoFresco', 40, 25]] },
      { kind: 'Colación', menu: 'Fruta + almendras', el: '1 fruta · 20 g almendras', ella: '1 fruta · 10 g almendras', ing: [['fruta', 1, 1], ['almendras', 20, 10]] },
      { kind: 'Cena', menu: 'Pizza casera integral (salsa natural, muzzarella, verduras) + ensalada', el: '3 porciones', ella: '2 porciones', ing: [['lechuga', 60, 50], ['rucula', 30, 20], ['tomate', 60, 50], OIL], recipe: ['pizza', 3 / 8, 2 / 8] },
    ],
  },
  {
    name: 'Sábado',
    short: 'S',
    meals: [
      { kind: 'Desayuno', menu: 'Revuelto de huevos con champiñones + pan integral + fruta', el: '4 huevos · 2 rebanadas', ella: '2 huevos · 1 rebanada', ing: [['huevo', 4, 2], ['champignon', 80, 60], ['pan', 2, 1], ['fruta', 1, 1]] },
      { kind: 'Almuerzo', menu: 'Fideos integrales con boloñesa de lentejas + queso rallado', el: '100 g fideos secos · 150 g lentejas', ella: '70 g fideos secos · 100 g lentejas', ing: [['fideos', 100, 70], ['lentejas', 150, 100], ['pureTomate', 150, 100], ['cebolla', 50, 40], ['zanahoria', 50, 40], ['quesoRallado', 15, 10], OIL] },
      { kind: 'Merienda', menu: 'Yogur griego con frutos rojos y chía', el: '250 g yogur', ella: '170 g yogur', ing: [['yogurGriego', 250, 170], ['frutosRojos', 80, 60], ['chia', 10, 5]] },
      { kind: 'Colación', menu: 'Licuado de leche, avena y cacao amargo', el: '300 ml leche · 30 g avena', ella: '200 ml leche · 20 g avena', ing: [['leche', 300, 200], ['avena', 30, 20], ['cacao', 10, 5]] },
      { kind: 'Cena', menu: 'Tortilla de espinaca al horno (huevo + ricota) + ensalada de tomate', el: '3 huevos · 100 g ricota', ella: '2 huevos · 60 g ricota', ing: [['huevo', 3, 2], ['ricota', 100, 60], ['espinaca', 100, 80], ['tomate', 150, 120], OIL] },
    ],
  },
  {
    name: 'Domingo',
    short: 'D',
    meals: [
      { kind: 'Brunch', menu: 'Huevos revueltos + palta + pan integral + yogur con fruta', el: '3 huevos · ¼ palta · 2 rebanadas · 150 g yogur', ella: '2 huevos · ⅛ palta · 1 rebanada · 100 g yogur', ing: [['huevo', 3, 2], ['palta', 0.25, 0.125], ['pan', 2, 1], ['yogur', 150, 100], ['fruta', 1, 1]] },
      { kind: 'Almuerzo', menu: 'Comida libre — un plato razonable, sin repetir', el: '—', ella: '—', ing: [], free: true },
      { kind: 'Merienda', menu: 'Fruta + frutos secos', el: '1 fruta · 20 g', ella: '1 fruta · 10 g', ing: [['fruta', 1, 1], ['mixFrutos', 20, 10]] },
      { kind: 'Cena', menu: 'Crema de calabaza + ensalada tibia de garbanzos con huevo duro', el: '180 g garbanzos · 2 huevos', ella: '120 g garbanzos · 1 huevo', ing: [['calabaza', 250, 200], ['cebolla', 50, 40], ['leche', 100, 80], ['garbanzos', 180, 120], ['huevo', 2, 1], ['lechuga', 50, 40], OIL] },
    ],
  },
];

/* Lo de todos los días que no es una comida: omega-3 vegetal. */
export const DAILY: Ing[] = [['lino', 10, 10]];

export const PROFILE: Record<Person, { label: string; kcal: string; prot: string; goal: string }> = {
  el: { label: 'Él', kcal: '2.500', prot: '150', goal: '95 → 85 kg' },
  ella: { label: 'Ella', kcal: '1.750', prot: '100', goal: '58 → 55 kg' },
};

export const OIL_RULE: Record<Person, string> = { el: '1 cda de aceite', ella: '2 cdtas de aceite' };

export const RULES = [
  'Legumbres, arroz y quinoa: pesos en cocido.',
  'Verduras de hoja y no feculentas: libres.',
  'Aceite de oliva medido: 1 cda (él) / 2 cdtas (ella) por comida principal.',
  'Agua: 2,5–3 L por día.',
  'Sal yodada.',
  'Colación: antes o después de entrenar.',
];

export const SUPPLEMENTS = [
  ['B12', '1000 mcg, 2 veces por semana.'],
  ['Creatina', '3–5 g todos los días, con cualquier comida.'],
  ['Omega-3', '1 cda de lino molido o chía por día, o omega-3 de algas.'],
  ['Vitamina D', 'Hacer un análisis antes de suplementar.'],
  ['Hierro', 'Legumbres + vitamina C (limón, morrón, cítricos). Café o mate lejos de las comidas.'],
];

export const ADJUSTMENTS = [
  'Pesarse 2–3 veces por semana en ayunas y mirar el promedio semanal.',
  'Si en 2 semanas no baja: sacar media colación o ½ porción de carbohidratos en la cena.',
  'Si baja más de 1 kg/sem (él) o 0,5 kg/sem (ella), o rinden mal entrenando: sumar ½ porción de carbohidratos los días de entrenamiento.',
];

export const MAIN_MEALS = ['Almuerzo', 'Cena'];
