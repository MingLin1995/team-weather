/** @format */

document.addEventListener("DOMContentLoaded", function () {
  // 選擇地圖上的所有<path>元素
  let pathElements = document.querySelectorAll("path[data-name]");

  // console.log("pathElements", pathElements);

  // 創建 tooltip 元素的引用
  let tooltip = document.querySelector(".tooltip");

  // 獲取包裹 .tooltip 的 .wrapper 元素
  let wrapper = document.querySelector(".wrapper");

  // 為每個<path>元素添加點擊事件監聽器
  pathElements.forEach(function (path) {
    // path.classList.remove("is-active");

    path.addEventListener("click", function (event) {
      updateWeatherElements();
      updateWeather36HElements();
      getAstronomicalData();

      cityName = event.currentTarget.getAttribute("data-name");
      const pokemon = document.querySelector("#pokemon");
      changePokemon(cityName, pokemon);

      // console.log("地圖被點擊");

      tooltip.textContent = "";
      tooltip.style.display = "none";

      // 首先，從所有<path>元素中移除 'is-active' 類
      pathElements.forEach(function (innerPath) {
        innerPath.classList.remove("is-active");
      });

      // 為被點擊的<path>元素添加 'is-active' 類
      let currentPath = event.currentTarget;
      currentPath.classList.add("is-active");

      // 獲取被點擊<path>元素的 data-name 屬性值
      let countyName = currentPath.getAttribute("data-name");

      // 查找頁面上的顯示縣市名稱的元素，並更新其內容
      let countyElement = document.getElementById("county");
      if (countyElement) {
        countyElement.textContent = countyName;
      }
    });

    // 添加滑鼠移動事件監聽器
    path.addEventListener("mousemove", function (e) {
      tooltip.textContent = path.getAttribute("data-name");
      tooltip.style.display = "block";

      tooltip.style.left = `${e.pageX + 8}px`;
      tooltip.style.top = `${e.pageY - 35}px`;

      // 計算相對於 .wrapper 的位置
      // let wrapperRect = wrapper.getBoundingClientRect();
      // tooltip.style.left = `${e.clientX - wrapperRect.left + 8}px`;
      // tooltip.style.top = `${e.clientY - wrapperRect.top - 35}px`;

      // console.log(tooltip.textContent, tooltip.style.left, tooltip.style.top);
    });

    // 添加滑鼠移出事件監聽器
    path.addEventListener("mouseout", function (e) {
      tooltip.textContent = "";
      tooltip.style.display = "none";
      // console.log(tooltip.style.left, tooltip.style.top);
    });
  });
});
