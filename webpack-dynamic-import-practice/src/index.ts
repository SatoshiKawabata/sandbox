// import { a } from "./a";

// const elem = document.createElement("button");
// elem.textContent = "click";
// elem.addEventListener("click", () => {
//   alert(a);
// });

// document.body.appendChild(elem);

const elem = document.createElement("button");
elem.textContent = "click";
elem.addEventListener("click", () => {
  import(/* webpackPrefetch: true*/ "./a").then((res) => {
    alert(res.a);
  });
});

document.body.appendChild(elem);
