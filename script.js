let object = ['0', "book", "bottle", "ghost", "mouse", "sofa"];
let color = ['0', "blue", "green", "white", "grey", "red"];

// ob:物品 co:顏色
let ob1, co1, ob2, co2;
let Ans;

let card, cardNow;
let right, wrong;

hideImg("item-container");

rules.addEventListener("click", showImg("item-container"));

// 顯示圖
function showImg(id) {
  let img = document.getElementById(id);
  img.style.display = "block";
}
// 隱藏圖
function hideImg(id) {
  let img = document.getElementById(id);
  img.style.display = "none";
}
// 圖片張數
function cardNumber() {
  // 歸零
  cardNow = 0;
  right = 0, wrong = 0;

  card = Number(cardInput.value);
  // typeof cardInput.value = string
  // console.log(typeof card);      number
  // console.log(typeof cardNum);   number

  showImg("item-container");
  changeImage();
}

// 隨機圖

// 選第一張圖
function first() {

  ob1 = getRandomInt(1, 6);
  co1 = getRandomInt(1, 6);

  let p1 = "images/" + object[ob1] + "/" + object[ob1] + "_" + color[co1] + ".png";
  return p1;
}
// 選第二張圖
function second() {

  ob2 = getRandomInt(1, 6);
  co2 = getRandomInt(1, 6);

  if (ob1 === co1) {
    // 記錄答案
    Ans = ob1;

    // ans: ob1+co1
    while (ob2 === co2 || ob2 === ob1 || co2 === co1 || co2 === ob1) {
      ob2 = getRandomInt(1, 6);
      co2 = getRandomInt(1, 6);
    }
  }
  // ans: 物品＆顏色都沒出現的
  else if (ob1 !== co1) {

    while (ob2 === ob1 || ob2 === co1 || co2 === ob1 || co2 === co1) {
      ob2 = getRandomInt(1, 6);
      co2 = getRandomInt(1, 6);
    }

    // 記錄答案
    if (ob2 === co2) {
      Ans = ob2;
    }
    else {
      Ans = 15 - ob1 - co1 - ob2 - co2;
    }
  }

  let p2 = "images/" + object[ob2] + "/" + object[ob2] + "_" + color[co2] + ".png";
  return p2;
}

// 切換難度
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
    // hell 挑戰人類極限(x
    case 'hell':
      break;
  }
}

// 判定答案
function checkAns(ans) {
  let str;

  if (ans === Ans) {
    str = "Good! The answer is " + object[Ans];
    right = right + 1;
  }
  else {
    str = "HAHA! The answer is " + object[Ans];
    wrong = wrong + 1;
  }

  cardNow = cardNow + 1;
  console.log(typeof cardNow);
  console.log(typeof card);

  var ans = document.getElementById("ans");
  ans.innerHTML = str;

  changeImage();
}

// 換圖
function changeImage() {
  // 清空圖
  const imageContainer = document.getElementById("card-container");
  imageContainer.innerHTML = "";

  if (cardNow !== card) {
    // 隨機圖
    for (let i = 0; i < 2; i++) {
      const img = document.createElement("img");

      if (i === 0) img.src = first();
      else if (i === 1) img.src = second();

      img.alt = "Image " + (i + 1);
      imageContainer.appendChild(img);
    }
  }
  else if (cardNow === card)
  {
    // 隱藏圖片
    hideImg("item-container");
    //清空答案欄
    var ans = document.getElementById("ans");
    ans.innerHTML = " ";
  }

    // 算分數
    let endScore = "score: " + right + "/" + card;
    var score = document.getElementById("score");
    score.innerHTML = endScore;
}

// 隨機取數(random)
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
// https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Math/random

// 鍵盤點擊
let body = document.body;
body.addEventListener('keydown', key(), false) // 偵測按下按鍵的行為

function key(e) {
  if (cardNow !== card) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 65:  // a
        checkAns(1);
        break;
      case 83:  // s
        checkAns(2);
        break;
      case 68:  // d
        checkAns(3);
        break;
      case 70:  // f
        checkAns(4);
        break;
      case 71:  // g
        checkAns(5);
        break;
    }
  }
  else if (cardNow === card) {
    return;
  }
}
