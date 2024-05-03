let ob1n = 0;
let co1n = 0;
let ob2n = 0;
let co2n = 0;
let Ans = 0;

let card = 0;
let right = 0;
let wrong = 0;

function cardNumber() {
  card = cardInput.value;
  changeImage();
}

function first() { // 選第一張圖
  // ob:物品 co:顏色
  ob1n = getRandomInt(1, 6);
  co1n = getRandomInt(1, 6);
  let ob1 = object(ob1n);
  let co1 = color(co1n);
  let p1 = "images/" + ob1 + "/" + ob1 + "_" + co1 + ".png";
  return p1;
}

function second() { // 選第二張圖

  ob2n = getRandomInt(1, 6);
  co2n = getRandomInt(1, 6);

  if (ob1n === co1n) {
    while (ob2n === co2n || ob2n === ob1n || co2n === ob1n) {  // ans:ob1+co1
      ob2n = getRandomInt(1, 6);
      co2n = getRandomInt(1, 6);
    }

    Ans = ob1n;
  }
  else if (ob1n !== co1n) {  // ans:物品＆顏色都沒出現的
    while (ob2n === ob1n || ob2n === co1n || co2n === ob1n || co2n === co1n) {
      ob2n = getRandomInt(1, 6);
      co2n = getRandomInt(1, 6);
    }

    if (ob2n === co2n) {
      Ans = ob2n;
    }
    else {
      Ans = 15 - ob1n - co1n - ob2n - co2n;
    }
  }

  let ob2 = object(ob2n);
  let co2 = color(co2n);

  let p2 = "images/" + ob2 + "/" + ob2 + "_" + co2 + ".png";
  return p2;
}

function object(ob) { // 物品
  if (ob === 1)
    return "book";
  else if (ob === 2)
    return "bottle";
  else if (ob === 3)
    return "ghost";
  else if (ob === 4)
    return "mouse";
  else if (ob === 5)
    return "sofa";
  else
    return 0;
}

function color(co) { // 物品
  if (co === 1)
    return "blue";
  else if (co === 2)
    return "green";
  else if (co === 3)
    return "white";
  else if (co === 4)
    return "grey";
  else if (co === 5)
    return "red";
  else
    return 0;
}

// 難度（在一隨機時間內選擇正確答案）
function changeMode(mode) {
  switch (mode) {
    // peaceful
    case 'p':
      break;
    // easy
    case 'e':
      break;
    // normal
    case 'n':
      break;
    // hard
    case 'h':
      break;
    // hell
    case 'hell':
      break;
  }
}

// 判定答案
function checkAns(ans) {

  if (ans === Ans) {
    Ans = object(Ans);
    let str = "Good! Ans is " + Ans;
    const x = document.createElement("div");
    x.textContent = str;
    document.body.appendChild(x);
    right = right + 1;
  }
  else {
    Ans = object(Ans);
    let str = "HAHA! Ans is " + Ans;
    const x = document.createElement("div");
    x.textContent = str;
    document.body.appendChild(x);
    wrong = wrong + 1;
  }

  changeImage();

  return;
}

// 換圖片
function changeImage() {

  if (card > 0){
    // 清空圖片
    const imageContainer = document.getElementById("card-container");
    imageContainer.innerHTML = "";

    // 隨機圖片
    for (let i = 0; i < 2; i++) {
      const img = document.createElement("img");

      if (i === 0) img.src = first();
      else if (i === 1) img.src = second();

      img.alt = "Image " + (i + 1);
      imageContainer.appendChild(img);}
    card = card - 1;
  }
  else {
    let str = "score:" + right + "/" + (right+wrong);
    const x = document.createElement("div");
    x.textContent = str;
    document.body.appendChild(x);
  }

  return;
}

document.getElementById("btn").addEventListener("click", changeImage());

//random
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}
//https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random