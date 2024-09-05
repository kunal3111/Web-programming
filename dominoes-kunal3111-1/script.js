// * randomInt:
// * Returns a random positive integer from min to max
// * @Parameters: min - the smallest possible number, max - largest possible number
// * @Return: Int
// * @Source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// */
function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function Creating_Dots(POSITION) {
  const $dots_oF_dominoes = document.createElement('div');
  $dots_oF_dominoes.classList.add('dot');
  $dots_oF_dominoes.style.backgroundColor = 	'#330000'
  if (POSITION) {
    $dots_oF_dominoes.style.gridColumn = POSITION.column;
    $dots_oF_dominoes.style.gridRow = POSITION.row;
  }
  return $dots_oF_dominoes;
}
function POSITIONING_OF_DOTS(Counting_Of_Dots) {
  const Positioning = {
    1: [{ row: 2, column: 2 }],
    2: [{ row: 1, column: 1 }, { row: 3, column: 3 }],
    3: [{ row: 1, column: 1 }, { row: 2, column: 2 }, { row: 3, column: 3 }],
    4: [{ row: 1, column: 1 }, { row: 1, column: 3 }, { row: 3, column: 1 }, { row: 3, column: 3 }],
    5: [{ row: 1, column: 1 }, { row: 1, column: 3 }, { row: 2, column: 2 }, { row: 3, column: 1 }, { row: 3, column: 3 }],
    6: [{ row: 1, column: 1 }, { row: 1, column: 3 }, { row: 2, column: 1 }, { row: 2, column: 3 }, { row: 3, column: 1 }, { row: 3, column: 3 }],
  };
  return Positioning[Counting_Of_Dots] || [];
}
function MakingSections(DOT_COUNT) {
  const section = document.createElement('div');
  section.classList.add('Section_Dots');
  const positions = POSITIONING_OF_DOTS(DOT_COUNT);
  positions.forEach(pos => {
    section.appendChild(Creating_Dots(pos));
  });
  return section;
}
function DOMINO() {
  const $RANDOM_DOMINOES = document.createElement('div');
  $RANDOM_DOMINOES.classList.add('domino');
  const Upper_Dots = randomInt(1, 6);
  const Lower_Dots = randomInt(1, 6);
  $RANDOM_DOMINOES.appendChild(MakingSections(Upper_Dots));
  $RANDOM_DOMINOES.appendChild(MakingSections(Lower_Dots));
  return $RANDOM_DOMINOES;
}
function SHOW_DOMINOES() {
  const DOMINO_CONTAINER = document.getElementById('dominoContainer');
  for (let i = 0; i < 50; i++) {
    DOMINO_CONTAINER.appendChild(DOMINO());
  }
}
window.onload = SHOW_DOMINOES;