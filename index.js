const btn = document.getElementById("btn");
const resUi = document.getElementById("value");
import { currencies } from "./db.js";

let currency = null;

const writeOption = () => {
  let from = document.querySelector("#from");
  let to = document.querySelector("#to");
  currencies.map((item) => {
    from.innerHTML += ` <option value=${item} class="fromVal">${item}</option>`;
    to.innerHTML += ` <option value=${item} class="toVal">${item}</option>`;
  });
};

writeOption();

let key = "cur_live_qwx5nwo5bHvNOodMcCvvIOsAM30hfnEiBEQJ8HlJ";
let api = "https://api.currencyapi.com/v3/latest";

const getData = async () => {
  if (currency) return currency;
  try {
    let getTodata = await fetch(`${api}?apikey=${key}`);
    let data = await getTodata.json();
    currency = data.data;
    return currency;
  } catch (error) {
    console.log(error);
  }
};

const result = async () => {
  const amount = document.querySelector("#input").value;

  if (isNaN(amount)) return alert("Yalniz eded !!!");
  if (amount === "") return alert("Eded daxil edin  !!!");
  if (amount < 0) return alert("Menfi deyer ola bilmez !!!");

  const fromVal = document.querySelector("#from").value;
  const toVal = document.querySelector("#to").value;
  if (fromVal == toVal)
    return alert("Cevirmek istediyiniz valyutani daxil edin");
  // console.log("from", fromVal);
  // console.log("to", toVal);

  let data = await getData();
  // console.log(data);
  let fromRate = data[fromVal].value;
  let toRate = data[toVal].value;

  // console.log(fromRate);
  // console.log(toRate);

  const cavab = (amount / fromRate) * toRate;
  resUi.innerText = `${amount}  ${fromVal} = ${cavab.toFixed(2)} ${toVal}`;
};

btn.addEventListener("click", result);
