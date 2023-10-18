

//自己申請帳號就有了
const apiKey = "CWA-C5FE3759-4C7F-4E48-ADEA-8581BA76A0A2";

//取得當前縣市名稱
const countyElement = document.getElementById("county");
let countyValue;

//  日期 ＆ 時間
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

//今天日期
function getCurrentDate() {
  const now = new Date();

  let years = formatNumber(now.getFullYear());
  let months = formatNumber(now.getMonth() + 1);
  let days = formatNumber(now.getDate());

  let nowDate = `${years}-${months}-${days}`;

  return nowDate;
}

//明天日期
function getNextDate() {
  const now = new Date();

  let years = formatNumber(now.getFullYear());
  let months = formatNumber(now.getMonth() + 1);
  let days = formatNumber(now.getDate() + 1);

  let nextDate = `${years}-${months}-${days}`;

  return nextDate;
}

//當下時間
function getCurrentTime() {
  const now = new Date();

  let hours = formatNumber(now.getHours());
  let minutes = formatNumber(now.getMinutes());
  let seconds = formatNumber(now.getSeconds());

  let currentTime = `${hours} : ${minutes} : ${seconds}`;
  return currentTime;
}

//日期為個位數，就補0
function formatNumber(number) {
  return number < 10 ? `0${number}` : number;
}

//更新現在時間
function updateDateTimeElements() {
  const nowDate = getCurrentDate();
  const currentTime = getCurrentTime();

  dateElement.textContent = `日期：${nowDate}`;
  // timeElement.textContent = `現在時間：${currentTime}`;
}

//每秒更新一次現在時間
setInterval(updateDateTimeElements, 1000);

// 當天天氣
// https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${key}

function getWeatherData() {
  const nowDate = getCurrentDate();
  const nextDate = getNextDate();
  countyValue = countyElement.textContent;
  const apiUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${apiKey}&locationName=${countyValue}&timeFrom=${nowDate}&timeTo=${nextDate}`;

  return fetch(apiUrl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data.records.locations[0].location[0]);
      return data.records.locations[0].location[0];
    })
    .catch((e) => {
      console.log(e);
    });
}

async function updateWeatherElements() {
  try {
    const weatherData = await getWeatherData();

    const Wx = weatherData.weatherElement[1].time[0].elementValue[0].value;
    const T = weatherData.weatherElement[3].time[0].elementValue[0].value;
    const PoP6h = weatherData.weatherElement[7].time[0].elementValue[0].value;
    const Ws = weatherData.weatherElement[8].time[0].elementValue[0].value;

    const WxElement = document.getElementById("Wx");
    const TElement = document.getElementById("T");
    const PoP6hElement = document.getElementById("PoP6h");
    const WsElement = document.getElementById("Ws");

    WxElement.textContent = `天氣現象：${Wx}`;
    TElement.textContent = `溫度：${T} ℃`;
    PoP6hElement.textContent = `6小時降雨機率：${PoP6h} %`;
    WsElement.textContent = `風速：${Ws} m/s`;
  } catch (e) {
    console.log(e);
  }
}

// 36小時天氣
// https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${key}

function getWeatherData36H() {
  const nowDate = getCurrentDate();
  const nextDate = getNextDate();
  countyValue = countyElement.textContent;
  const apiUrl = `https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-091?Authorization=${apiKey}&locationName=${countyValue}&timeFrom=${nowDate}&timeTo=${nextDate}`;
  console.log("城市", countyValue);
  return fetch(apiUrl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(
      //     data.records.locations[0].location[0].weatherElement[6].time[1]
      //       .elementValue[0].value
      //   );
      let weatherData36H = data.records.locations[0].location[0];
      let weatherData36HArray = [];

      for (let i = 1; i <= 3; i++) {
        let startTime = weatherData36H.weatherElement[6].time[i].startTime;
        let endTime = weatherData36H.weatherElement[6].time[i].endTime;
        let timeDescribe;
        let timeBase = startTime.substr(11);
        let dateBase = startTime.substr(0, 10);
        console.log(timeBase);

        if (
          (dateBase == nowDate && timeBase == "06:00:00") ||
          (dateBase == nowDate && timeBase == "12:00:00")
        ) {
          timeDescribe = "今天白天";
        } else if (dateBase == nowDate && timeBase == "18:00:00") {
          timeDescribe = "今晚明晨";
        } else if (dateBase == nextDate && timeBase == "06:00:00") {
          timeDescribe = "明天白天";
        } else if (dateBase == nextDate && timeBase == "18:00:00") {
          timeDescribe = "明天晚上";
        } else {
          timeDescribe = "後天白天";
        }

        let Wx = weatherData36H.weatherElement[6].time[i].elementValue[0].value;
        let T = weatherData36H.weatherElement[1].time[i].elementValue[0].value;
        let PoP12h =
          weatherData36H.weatherElement[0].time[i].elementValue[0].value;

        let weatherInterval = {
          startTime: startTime,
          endTime: endTime,
          timeDescribe: timeDescribe,
          Wx: Wx,
          T: T,
          PoP12h: PoP12h,
        };
        weatherData36HArray.push(weatherInterval);
      }
      return weatherData36HArray;
    })
    .catch((e) => {
      console.log(e);
    });
}

async function updateWeather36HElements() {
  try {
    const weatherData36H = await getWeatherData36H();
    console.log(weatherData36H);

    weatherData36H.forEach((item, index) => {
      const content = `
		  <div id="timeDescribe">日期描述：${item.timeDescribe}</div>
		  <div id="Wx">天氣現象：${item.Wx}</div>
		  <div id="T">溫度：${item.T} ℃</div>
		  <div id="PoP12h">降雨機率：${item.PoP12h} %</div>`;

      const container = document.getElementById(`weatherData${index + 1}`);
      if (container) {
        container.innerHTML = content;
      }
    });
  } catch (e) {
    console.log(e);
  }
}

updateWeatherElements();
updateWeather36HElements();

//日出、日落
function getAstronomicalData() {
  //自己去申請帳號就有了

  const Today = new Date(); //月份是從0開始計算，所以+1
  const nowDate = getCurrentDate();
  const nextDate = `${Today.getFullYear()}-${Today.getMonth() + 1}-${
    Today.getDate() + 1
  }`;

  //yyyy-MM-dd
  countyValue = countyElement.textContent;
  const apiUrl = `https://opendata.cwa.gov.tw/api/v1/rest/datastore/A-B0062-001?Authorization=${apiKey}&limit=365&offset=0&format=JSON&CountyName=${countyValue}&timeFrom=${nowDate}&timeTo=${nextDate}`;

  fetch(apiUrl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`狀態碼： ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      //   console.log(data);
      //   console.log(data.records);
      //   console.log(data.records.locations.location[0].time[0].SunRiseTime);
      const astronomicalData = data.records.locations.location[0].time[0];
      getSunRiseSet(astronomicalData);
    })
    .catch((error) => {
      console.error("發生錯誤：", error);
    });
}

function getSunRiseSet(astronomicalData) {
  const sunRiseTimeElement = document.getElementById("sunRiseTime");
  const sunSetTimeElement = document.getElementById("sunSetTime");
  const sunRiseTime = astronomicalData.SunRiseTime;
  const sunSetTime = astronomicalData.SunSetTime;
  sunRiseTimeElement.innerHTML = `日出： ${sunRiseTime}`;
  sunSetTimeElement.innerHTML = `日落： ${sunSetTime}`;
}

getAstronomicalData();

// 选择地图元素
let mapElement = document.querySelector(".map");
console.log("地圖", mapElement);

// 如果地图元素存在，则附加点击事件监听器
if (mapElement) {
  mapElement.addEventListener("click", async function () {
    console.log("地图被点击");

    // 更新天气数据
    try {
      await updateWeatherElements();
      await updateWeather36HElements();
      await getAstronomicalData();
      await getAQIData();
    } catch (error) {
      console.error("更新天气数据时发生错误:", error);
    }
  });
}
