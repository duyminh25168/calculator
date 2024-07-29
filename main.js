var button = [
  document.querySelector(".btn-zero"),
  document.querySelector(".btn-one"),
  document.querySelector(".btn-two"),
  document.querySelector(".btn-three"),
  document.querySelector(".btn-four"),
  document.querySelector(".btn-five"),
  document.querySelector(".btn-six"),
  document.querySelector(".btn-seven"),
  document.querySelector(".btn-eight"),
  document.querySelector(".btn-nine"),
  document.querySelector(".btn-summation"),
  document.querySelector(".btn-subtraction"),
  document.querySelector(".btn-multiplication"),
  document.querySelector(".btn-division"),
  document.querySelector(".btn-clear"),
  document.querySelector(".btn-return"),
  document.querySelector(".btn-equal"),
];
let result = document.querySelector(".screen-result");
// let clear = document.querySelector(".btn-clear");
// let btnReturn = document.querySelector(".btn-return");
// let equal = document.querySelector(".btn-equal");

let resultTmp = "";
let CalcArray = [];
function arrange(a, point, index) {
  a[point] = index;
  for (let i = point + 1; i < a.length; i++) {
    a[i] = a[i + 2];
  }
  a.length -= 2;
}
function Calc2(a) {
  for (let i = 0; i < a.length; i++) {
    kq = 0;
    if (a[i] === button[13].innerText || a[i] === button[12].innerText) {
      if (a[i] === button[13].innerText) {
        arrange(a, i - 1, a[i - 1] / a[i + 1]);
        i--;
      }
      if (a[i] === button[12].innerText) {
        arrange(a, i - 1, a[i - 1] * a[i + 1]);
        i--;
      }
    }
  }
  kq = 0;
  for (let i = 0; i <= a.length; i++) {
    if (a.length === 1) {
      return Number(a[0].toFixed(9));
    }
    if (a[i] === button[10].innerText) {
      arrange(a, i - 1, Number((a[i - 1] + a[i + 1]).toFixed(9)));
      i--;
    } else if (a[i] === button[11].innerText) {
      arrange(a, i - 1, Number((a[i - 1] - a[i + 1]).toFixed(9)));
      i--;
    } else if (a[i] === button[13].innerText) {
      arrange(a, i - 1, Number((a[i - 1] / a[i + 1]).toFixed(9)));
      i--;
    } else if (a[i] === button[12].innerText) {
      arrange(a, i - 1, Number((a[i - 1] * a[i + 1]).toFixed(9)));
      i--;
    }
  }
}
function Calc(resultTmp, array) {
  let point = 0;
  let index = 0;
  for (let i = 0; i < resultTmp.length; i++) {
    if (!Number(resultTmp[i]) && i + 1 === resultTmp.length) {
      break;
    }
    if (!Number(resultTmp[i + 1])) {
      if (Number(resultTmp.slice(point, i + 1))) {
        array[index] = Number(resultTmp.slice(point, i + 1));
        point = i + 1;
        index++;
      }
    }
    if (isNaN(Number(resultTmp[i]))) {
      array[index] = resultTmp.slice(point, i + 1);
      point++;
      index++;
    }
  }
}

//hàm hiển thị
function Console(element, resultConsole) {
  if (typeof resultConsole === "string") {
    result.innerText = resultConsole;
    resultConsole = null;
    return;
  }
  element.addEventListener("click", () => {
    resultTmp = resultTmp + element.innerText;
    result.innerText = resultTmp;
    console.log(element.innerText);
  });
}

button.forEach((element, index) => {
  if (element instanceof HTMLElement) {
    if (index === 14) {
      element.addEventListener("click", () => {
        resultTmp = "";
        result.innerText = "0";
      });
    } else if (index === 15) {
      console.log(resultTmp.length);
      element.addEventListener("click", () => {
        if (resultTmp.length === 1) {
          result.innerText = "0";
        } else {
          resultTmp = resultTmp.slice(0, resultTmp.length - 1);
          result.innerText = resultTmp;
        }
      });
    } else if (index === 16) {
      element.addEventListener("click", () => {
        // console.log(resultTmp);
        Calc(resultTmp, CalcArray);
        // console.log(CalcArray);
        resultTmp = String(Calc2(CalcArray));
        result.innerText = resultTmp;
      });
    } else {
      Console(element);
    }
  }
});
