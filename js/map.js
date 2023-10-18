document.addEventListener("DOMContentLoaded", function () {
  // 选择地图上的所有<path>元素
  let pathElements = document.querySelectorAll("path[data-name]");

  // 为每个<path>元素添加点击事件监听器
  pathElements.forEach(function (path) {
    path.addEventListener("click", function (event) {
      updateWeatherElements();
      updateWeather36HElements();
      getAstronomicalData();
      // 首先，从所有<path>元素中移除 'is-active' 类
      pathElements.forEach(function (innerPath) {
        innerPath.classList.remove("is-active");
      });

      // 为被点击的<path>元素添加 'is-active' 类
      let currentPath = event.currentTarget;
      currentPath.classList.add("is-active");

      // 获取被点击<path>元素的data-name属性值
      let countyName = currentPath.getAttribute("data-name");

      // 查找页面上的显示县市名称的元素，并更新其内容
      let countyElement = document.getElementById("county");
      if (countyElement) {
        countyElement.textContent = countyName;
      }
    });
  });
});
