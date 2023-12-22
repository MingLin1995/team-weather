//自己申請帳號就有了
const apiKey = "CWA-762E79D6-BEEF-4897-AE57-CED139A9CFDC";

//取得當前縣市名稱
const countyElement = document.getElementById("county");
const cityElement = document.getElementById("city");
let countyValue;

//  日期 ＆ 時間
const dateElement = document.getElementById("date");
const timeElement = document.getElementById("time");

let sunRiseTimeGlobal = "";
let sunSetTimeGlobal = "";

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
  timeElement.textContent = `現在時間：${currentTime}`;
}

//每秒更新一次現在時間
// setInterval(updateDateTimeElements, 1000);

// 當天天氣
// https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-D0047-089?Authorization=${key}

function getWeatherData() {
  const nowDate = getCurrentDate();
  const nextDate = getNextDate();
  countyValue = countyElement.textContent;
  cityElement.textContent = countyValue;
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
    const WxNum = weatherData.weatherElement[1].time[0].elementValue[1].value;
    // console.log("天氣WX", Wx);
    // console.log("天氣WXNum", WxNum);
    const T = weatherData.weatherElement[3].time[0].elementValue[0].value;
    const PoP6h = weatherData.weatherElement[7].time[0].elementValue[0].value;
    const Ws = weatherData.weatherElement[8].time[0].elementValue[0].value;
    console.log("風速Ws", Ws);

    const WxElement = document.getElementById("Wx");
    const TElement = document.getElementById("T");
    const PoP6hElement = document.getElementById("PoP6h");
    const WsElement = document.getElementById("Ws");

    const lastWx = WxElement.textContent;
    const nowWx = `${Wx}天`;
    // const lastTel = TElement.textContent.replace(/℃/g, "");
    // const nowTel = `${T}`;
    // const lastPoP6h = PoP6hElement.textContent.replace(/%/g, "");
    // const nowPoP6h = `${PoP6h}`;
    // const lastWs = WsElement.textContent.replace(/m\/s/g, "").trim();
    // const nowWs = `${Ws}`;

    const lastTel = parseInt(TElement.textContent.replace(/℃/g, ""), 10);
    const nowTel = parseInt(`${T}`, 10);  // 請將"新的T值"替換為實際的值

    const lastPoP6h = parseInt(PoP6hElement.textContent.replace(/%/g, ""), 10);
    console.log("剛才的降雨率", lastPoP6h)
    const nowPoP6h = parseInt(`${PoP6h}`, 10);  // 請將"新的PoP6h值"替換為實際的值

    const lastWs = Math.round(parseFloat(WsElement.textContent.replace(/m\/s/g, "").trim()));
    const nowWs = Math.round(parseFloat(`${Ws}`));  // 請將"新的Ws值"替換為實際的值

    animateValue("T", lastTel, nowTel, 1800, "°C", "T" );
    animateValue("PoP6h", lastPoP6h, nowPoP6h, 300,  "%", "PoP6h");
    animateValue("Ws", lastWs, nowWs, 1000, " m/s", "Ws");

    // animateValue("AQI", 50, 100, 2000, "", aqi);

    WxElement.textContent = `${Wx}天`;
    TElement.textContent = `${T} ℃`;
    PoP6hElement.textContent = `${PoP6h}%`;
    WsElement.textContent = `${Ws} m/s`;

    changeWXImg(WxNum, sunRiseTimeGlobal, sunSetTimeGlobal);
    changeWsImg(Ws);
    changePopImg(PoP6h);
    changeTImg(T);

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
        // console.log(timeBase);

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
        let WxNum =
          weatherData36H.weatherElement[6].time[i].elementValue[1].value;
        let T = weatherData36H.weatherElement[1].time[i].elementValue[0].value;
        let PoP12h =
          weatherData36H.weatherElement[0].time[i].elementValue[0].value;

        let weatherInterval = {
          startTime: startTime,
          endTime: endTime,
          timeDescribe: timeDescribe,
          Wx: Wx,
          WxNum: WxNum,
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
    // console.log(weatherData36H);
    weatherData36H.forEach((item, index) => {
      const content = `
		  <div id="timeDescribe">${item.timeDescribe}</div>
		  <div id="T">${item.T} ℃</div>
		  <div id="PoP12h"><span>🌧️ </span>${item.PoP12h} %</div>
		  <div id="Wx">${item.Wx}</div>
      <img id="36HImg${index + 1}" 
      style="
      position: absolute;
      bottom: -30px;
      right: -30px;
      z-index: 3;
      max-width : 160px;
      opacity: 0.7;" src="images/Sunset.svg">`;
      const container = document.getElementById(`weatherData${index + 1}`);
      if (container) {
        container.innerHTML = content;
      }
      const imgId = `36HImg${index + 1}`;
      changeWXImg36H(item.WxNum, imgId, sunRiseTimeGlobal, sunSetTimeGlobal);

      if (index == 0 || index == 2) {
        changeWXImg36H(item.WxNum, imgId, sunRiseTimeGlobal, sunSetTimeGlobal, true);
      }

      console.log(`第${imgId}是${item.WxNum}`);
    });
  } catch (e) {
    console.log(e);
  }
}

//日出、日落
function getAstronomicalData() {
  //自己去申請帳號就有了

  const Today = new Date(); //月份是從0開始計算，所以+1
  const nowDate = getCurrentDate();
  const nextDate = `${Today.getFullYear()}-${Today.getMonth() + 1}-${
    Today.getDate() + 1
  }`;

  // const nowDate = getCurrentDate();

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

let intervalId = null;

function getSunRiseSet(astronomicalData) {
  const sunRiseTimeElement = document.getElementById("sunRiseTime");
  const sunSetTimeElement = document.getElementById("sunSetTime");
  const sunRiseTime = astronomicalData.SunRiseTime;
  const sunSetTime = astronomicalData.SunSetTime;

  sunRiseTimeGlobal = astronomicalData.SunRiseTime;
  console.log("日出時間", sunRiseTimeGlobal);
  sunSetTimeGlobal = astronomicalData.SunSetTime;

  const sunRiseTime12 = to12HourFormat(sunRiseTime);
  const sunSetTime12 = to12HourFormat(sunSetTime);
  sunRiseTimeElement.innerHTML = `日出<br> ${sunRiseTime12}`;
  sunSetTimeElement.innerHTML = `日落<br> ${sunSetTime12}`;

  const currentTimeElement = document.getElementById("currentTime");
  const sunRiseTimeFromNow = document.querySelector(".sunRiseTime-show");
  const sunSetTimeFromNow = document.querySelector(".sunSetTime-show");

  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }

  intervalId = setInterval(() => {
    const now = new Date();
    const today = new Date(now);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
  
    let sunRiseToday = new Date(today.toDateString() + ' ' + sunRiseTime);
    let sunSetToday = new Date(today.toDateString() + ' ' + sunSetTime);
  
    let sunRiseTomorrow = new Date(tomorrow.toDateString() + ' ' + sunRiseTime);
    
    let diffToSunRise = (sunRiseToday - now) / 60000; // 轉換成分鐘
    let diffToSunSet = (sunSetToday - now) / 60000;  // 轉換成分鐘
    
    let sunRiseMessage = '';
    let sunSetMessage = '';
  
    // 如果日出已經發生，則考慮隔天的日出
    if (diffToSunRise < 0) {
      if (Math.abs(diffToSunRise) <= 15) {
        sunRiseMessage = '剛剛才日出過';
      } else {
        diffToSunRise = (sunRiseTomorrow - now) / 60000; // 轉換成分鐘
      }
    }
  
    // 如果還沒有發生日出
    if (diffToSunRise >= 0) {
      if (diffToSunRise <= 15) {
        sunRiseMessage = '馬上就日出了';
      } else {
        sunRiseMessage = `離日出還有 ${Math.floor(diffToSunRise / 60)} 小時 ${Math.floor(diffToSunRise % 60)} 分鐘`;
      }
    }
  
    // 如果日落已經發生
    if (diffToSunSet < 0) {
      if (Math.abs(diffToSunSet) <= 15) {
        sunSetMessage = '剛剛才日落了';
      }
    }
    
    // 如果還沒有發生日落
    if (diffToSunSet >= 0) {
      if (diffToSunSet <= 15) {
        sunSetMessage = '馬上就日落了';
      } else {
        sunSetMessage = `離日落還有 ${Math.floor(diffToSunSet / 60)} 小時 ${Math.floor(diffToSunSet % 60)} 分鐘`;
      }
    }
    
    sunRiseTimeFromNow.innerHTML = sunRiseMessage;
    sunSetTimeFromNow.innerHTML = sunSetMessage;

  }, 500);
}

getAstronomicalData();
updateWeatherElements();
updateWeather36HElements();

//選擇地圖元素
let mapElement = document.querySelector(".map");
console.log("地圖", mapElement);

// 如果地圖存在則監聽
if (mapElement) {
  mapElement.addEventListener("click", async function (e) {
    cityName = e.currentTarget.getAttribute("data-name");
    // 更新天氣資料
    try {
      await getAstronomicalData(cityName);
      await updateWeatherElements();
      await updateWeather36HElements();
      await getAQIData();
    } catch (error) {
      console.error("更新天氣資料發生錯誤:", error);
    }
  });
}
