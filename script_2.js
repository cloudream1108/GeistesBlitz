// 雙人版

let object = ['0', "book", "bottle", "ghost", "mouse", "sofa"];
let color = ['0', "blue", "green", "white", "grey", "red"];
let A = [false, false, 0, 0];  // A的 [輸入?, 答對?, right, wrong]
let B = [false, false, 0, 0];  // B的 [輸入?, 答對?, right, wrong]

// ob:物品 co:顏色
let ob1, co1, ob2, co2;
let Ans;

let card, cardNow;
let First = 0;

hideImg("item-container");

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
  First = 0;
  A[0] = false; A[1] = false; A[2] = 0; A[3] = 0;
  B[0] = false; B[1] = false; B[2] = 0; B[3] = 0;

  card = Number(cardInput.value);

  //清空score
  var scoreA = document.getElementById("scoreA");
  var scoreB = document.getElementById("scoreB");
  var finalScoreA = document.getElementById("finalScoreA");
  var finalScoreB = document.getElementById("finalScoreB");
  scoreA.innerHTML = " ";
  scoreB.innerHTML = " ";
  finalScoreA.innerHTML = " ";
  finalScoreB.innerHTML = " ";

  showImg("item-container");
  changeImage();
}

// 隨機圖

// 選第一張圖
function first() {

  ob1 = getRandomInt(1, 6);
  co1 = getRandomInt(1, 6);

  let p1 = "picture/" + object[ob1] + "/" + object[ob1] + "_" + color[co1] + ".png";
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

  let p2 = "picture/" + object[ob2] + "/" + object[ob2] + "_" + color[co2] + ".png";
  return p2;
}

// 判定答案
function checkAns(ans, num) {
  if (num == 1) {
    if (First == 0) {
      First = 1;
    }
    if (ans == Ans) {
      A[1] = true;
    }
  }
  else if (num == 2) {
    if (First == 0) {
      First = 2;
    }
    if (ans == Ans) {
      B[1] = true;
    }
  }

  if (A[0] && B[0]) {
    cardNow = cardNow + 1;

    let str;
    if (A[1] || B[1]) {
      str = "Good! The answer is " + object[Ans];
      if (First == 1) {
        if (A[1]) {
          A[2] = A[2] + 1;
        }
        else if (B[1]) {
          B[2] = B[2] + 1;
        }
      }
      else if (First == 2) {
        if (B[1]) {
          B[2] = B[2] + 1;
        }
        else if (A[1]) {
          A[2] = A[2] + 1;
        }
      }
    }
    else {
      str = "HAHA! The answer is " + object[Ans];
    }

    var ans = document.getElementById("ans");
    ans.innerHTML = str;

    changeImage();
  }
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
  else if (cardNow == card) {
    // 隱藏圖片
    hideImg("item-container");
    // 清空答案欄
    var ans = document.getElementById("ans");
    ans.innerHTML = " ";
  }

  // 算分數
  let AendScore = "scoreA: " + A[2] + "/" + cardNow;
  let BendScore = "scoreB: " + B[2] + "/" + cardNow;
    if (cardNow != card) {
      scoreA.innerHTML = AendScore;
      scoreB.innerHTML = BendScore;
    }
    else if (cardNow == card) {
      scoreA.innerHTML = " ";
      scoreB.innerHTML = " ";
      finalScoreA.innerHTML = AendScore;
      finalScoreB.innerHTML = BendScore;
    }

  A[0] = false; A[1] = false;
  B[0] = false; B[1] = false;
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
body.addEventListener('keydown', key, false) //偵測按下按鍵的行為
function key(e) {
  if (cardNow != card) {
    console.log(e.keyCode);
    switch (e.keyCode) {
      case 65:
        if (!A[0]) {
          A[0] = true;
          checkAns(1, 1);
        }
        break;
      case 83:
        if (!A[0]) {
          A[0] = true;
          checkAns(2, 1);
        }
        break;
      case 68:
        if (!A[0]) {
          A[0] = true;
          checkAns(3, 1);
        }
        break;
      case 70:
        if (!A[0]) {
          A[0] = true;
          checkAns(4, 1);
        }
        break;
      case 71:
        if (!A[0]) {
          A[0] = true;
          checkAns(5, 1);
        }
        break;
      case 72:
        if (!B[0]) {
          B[0] = true;
          checkAns(1, 2);
        }
        break;
      case 74:
        if (!B[0]) {
          B[0] = true;
          checkAns(2, 2);
        }
        break;
      case 75:
        if (!B[0]) {
          B[0] = true;
          checkAns(3, 2);
        }
        break;
      case 76:
        if (!B[0]) {
          B[0] = true;
          checkAns(4, 2);
        }
        break;
      case 186:
        if (!B[0]) {
          B[0] = true;
          checkAns(5, 2);
        }
        break;
    }
  }
  else {
    return;
  }
}
