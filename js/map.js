/** @format */

document.addEventListener("DOMContentLoaded", function () {
  // 選擇地圖上的所有<path>元素
  let pathElements = document.querySelectorAll("path[data-name]");

  // 創建 tooltip 元素的引用
  var tooltip = document.querySelector(".tooltip");

  // 為每個<path>元素添加點擊事件監聽器
  pathElements.forEach(function (path) {
    path.addEventListener("click", function (event) {
      updateWeatherElements();
      updateWeather36HElements();
      getAstronomicalData();
      console.log("地圖被點擊");
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
      tooltip.style.left = `${e.pageX + 8}px`;
      tooltip.style.top = `${e.pageY - 35}px`;
      tooltip.style.display = "block";
      console.log("滑鼠移入");
    });

    // 添加滑鼠移出事件監聽器
    path.addEventListener("mouseout", function (e) {
      tooltip.textContent = "";
      tooltip.style.display = "none";
      console.log("滑鼠移入");
    });
  });
});
