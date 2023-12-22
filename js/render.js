const yearElement = document.getElementById("year");
const weekDayElement = document.getElementById("weekDay");
const monthDayElement = document.getElementById("monthDay");

setInterval(() => {
  const now = new Date();
  const currentTimeElement = document.getElementById("currentTime");
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
  currentTimeElement.innerHTML = `<span style="font-size:16px;font-weight:400;">目前時間</span> ${currentTime}`;
}, 1000); 


function getYear() {
  const today = new Date();
  let year = formatNumber(today.getFullYear());

  return year;
}
yearElement.textContent = getYear();

function getMonthDay() {
  const today = new Date();
  let Month = today.getMonth();

  const monthNames = [
    "Jan.",
    "Feb.",
    "Mar.",
    "Apr.",
    "May",
    "Jun.",
    "Jul.",
    "Aug.",
    "Sep.",
    "Oct.",
    "Nov.",
    "Dec.",
  ];

  const monthName = monthNames[Month];

  
  let day = today.getDate();

  
  MonthDay = `${monthName}${day}`;

  return MonthDay;
}
monthDayElement.textContent = getMonthDay();

function getDayOfWeekName() {
  const today = new Date();
  const dayOfWeekNumber = today.getDay();

  // 根據整數值轉換為星期的英文縮寫
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // 取得當前星期的名稱
  const dayOfWeekName = daysOfWeek[dayOfWeekNumber];

  return dayOfWeekName;
}

weekDayElement.textContent = getDayOfWeekName();

function changePopImg(PoP6h) {
  const image = document.getElementById("PoPImg");
  if (PoP6h < 10) {
    image.src = "images/PoP0.svg";
  } else if (PoP6h >= 10 && PoP6h < 30) {
    image.src = "images/PoP10.svg";
  } else if (PoP6h >= 30 && PoP6h < 50) {
    image.src = "images/PoP30.svg";
  } else if (PoP6h >= 50 && PoP6h < 70) {
    image.src = "images/PoP50.svg";
  } else if (PoP6h >= 70 && PoP6h < 90) {
    image.src = "images/PoP70.svg";
  } else {
    image.src = "images/PoP90.svg";
  }
}

// function changeWXImg(WxNum) {
//   const wxImg = document.getElementById("wx-img");
//   if (WxNum == "01") {
//     wxImg.src = "images/sunny.svg";
//     // console.log("晴天 images/sunny.svg");
//   } else if (WxNum >= "02" && WxNum <= "03") {
//     wxImg.src = "images/sunCloudMorining.svg";
//     // console.log("晴天 多雲 images/sunCloudMorining.svg");
//   } else if (WxNum >= "04" && WxNum <= "07") {
//     wxImg.src = "images/cloud.svg";
//     // console.log("多雲 images/cloud.svg");
//   } else if (WxNum == "21") {
//     wxImg.src = "images/morningRain.svg";
//     // console.log("晴午後雷陣雨 images/morningRain.svg");
//   } else if (WxNum >= "22") {
//     wxImg.src = "images/rain.svg";
//     // console.log("雷陣雨 images/rain.svg");
//   } else {
//     wxImg.src = " images/cloudRain.svg";
//     // console.log("下雨 images/cloudRain.svg");
//   }
// }

function changeWXImg36H(WxNum, imgId, sunRiseTime, sunSetTime, isNight) {
  const wxImg = document.getElementById(imgId);

  if (WxNum == "01" && isNight) {
    wxImg.src = "images/moon.png";
  } else if (WxNum == "01") {
    wxImg.src = "images/sunny.svg";
  } else if (WxNum >= "02" && WxNum <= "03" && isNight) {
    wxImg.src = "images/moon_cloud.png";
  } else if (WxNum >= "02" && WxNum <= "03") {
    wxImg.src = "images/sunCloudMorining.svg";
  } else if (WxNum >= "04" && WxNum <= "07") {
    wxImg.src = "images/cloud.svg";
  } else if (WxNum == "21") {
    wxImg.src = "images/morningRain.svg";
  } else if (WxNum >= "22") {
    wxImg.src = "images/rain.svg";
  } else {
    wxImg.src = "images/cloudRain.svg";
  }
}

function changeWXImg(WxNum, sunRiseTime, sunSetTime) {
  const wxImg = document.getElementById("wx-img");
  const now = new Date();
  const today = new Date(now);
  const sunRiseToday = new Date(today.toDateString() + ' ' + sunRiseTime);
  const sunSetToday = new Date(today.toDateString() + ' ' + sunSetTime);

  const isNight = now < sunRiseToday || now > sunSetToday;

  // const isNight = true;

  const pokemon = document.querySelector("#pokemon");
  const county = document.querySelector("#county").textContent;
  const mainAqiInside = document.querySelector(".main-AQI-inside");
  const sunRiseTimeEle = document.querySelector("#sunRiseTime");
  const mainCity = document.querySelector(".main-city");
  const mainT = document.querySelector(".main-T");
  const PoP6h = document.querySelector("#PoP6h");
  const mainRain = document.querySelector(".main-rain");
  const mainDashboard = document.querySelector(".main-dashboard");

  if(isNight) {
    changePokemon(county, pokemon);
    document.body.style.backgroundColor = "rgba(10, 10, 10, 0.05)";
  //   document.body.style.color = "white";
    // mainAqiInside.style.color = "rgba(10, 15, 10, 0.3)";
  //   sunRiseTimeEle.style.color = "black";
  //   mainCity.style.color = "white";
  //   mainRain.style.background = "rgba(255,230,230, 0.3)"
  //   mainDashboard.style.background = "rgba(255,230,230, 0.3)"
  }

  if (WxNum == "01" && isNight) {
    wxImg.src = "images/moon.png";
  } else if (WxNum == "01") {
    wxImg.src = "images/sunny.svg";
  } else if (WxNum >= "02" && WxNum <= "03" && isNight) {
    wxImg.src = "images/moon_cloud.png";
  } else if (WxNum >= "02" && WxNum <= "03") {
    wxImg.src = "images/sunCloudMorining.svg";
  } else if (WxNum >= "04" && WxNum <= "07") {
    wxImg.src = "images/cloud.svg";
  } else if (WxNum == "21") {
    wxImg.src = "images/morningRain.svg";
  } else if (WxNum >= "22") {
    wxImg.src = "images/rain.svg";
  } else {
    wxImg.src = "images/cloudRain.svg";
  }
}

function changeWsImg(Ws) {
  const wsImg = document.getElementById("ws-img");
  //   Ws = 50
  if (Ws <= 3) {
    wsImg.src = "images/wind3.svg";
  } else if (Ws > 3 && Ws <= 5) {
    wsImg.src = "images/wind5.svg";
  } else if (Ws > 5 && Ws <= 10) {
    wsImg.src = "images/wind10.svg";
  } else if (Ws > 10 && Ws <= 17) {
    wsImg.src = "images/wind17.svg";
  } else if (Ws > 17 && Ws <= 21) {
    wsImg.src = "images/wind21.svg";
  } else if (Ws > 21 && Ws <= 30) {
    wsImg.src = "images/wind30.svg";
  } else {
    wsImg.src = "images/wind50.svg";
  }
}

function changeTImg(T) {
  const image = document.getElementById("TImg");
  if (T < 10) {
    image.src = "images/temperature10.svg";
  } else if (T >= 10 && T < 15) {
    image.src = "images/temperature15.svg";
  } else if (T >= 15 && T < 20) {
    image.src = "images/temperature20.svg";
  } else {
    image.src = "images/temperature25.svg";
  }
}

function changeAQIImg(aqi) {
  console.log(aqi);
  const image = document.getElementById("aqiIcon"); //HTML尚未建立
  if (aqi <= 50) {
    image.src = "images/AQI50.svg";
  } else if (aqi >= 51 && aqi <= 100) {
    image.src = "images/AQI100.svg";
  } else if (aqi >= 101 && aqi <= 150) {
    image.src = "images/AQI150.svg";
  } else if (aqi >= 151 && aqi <= 200) {
    image.src = "images/AQI2000.svg";
  } else if (aqi >= 201 && aqi <= 300) {
    image.src = "images/AQI3000.svg";
  } else {
    image.src = "images/AQI4000.svg";
  }
}

function animateValue(id, start, end, duration, unit, formalName, callback) {
  const element = document.getElementById(id);
  const range = end - start;
  let elapsed = 0;  // 已經過的時間

  const getColorForPoP6h = (value) => {
    let r = 0, g = 0, b = 0, a = 1;
    if (value <= 20) {
        g = 150;
        b = 200;
        a = 0.5;
    } else if (value <= 40) {
        g = 100;
        b = 255;
        a = 0.7;
    } else if (value <= 70) {
        g = 50;
        b = 200;
        a = 0.9;
    } else {
        r = 0;
        g = 0;
        b = 0;
        a = 1;
    }
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  };

  const getColorForT = (value) => {
      let r = 0, g = 0, b = 0;
      if (value < 20) {
          r = 0;
          g = Math.floor((100 * (20 - value)) / 20);
          b = Math.floor((200 * (20 - value)) / 20);
      } else if (value <= 30) {
          r = Math.floor((200 * (value - 20)) / 10);
          g = Math.floor((100 * (30 - value)) / 10);
          b = 0;
      } else {
          r = 200 + Math.floor((55 * (value - 30)) / 20);
          g = 0;
          b = Math.floor((100 * (value - 30)) / 20);
      }
      return `rgb(${r}, ${g}, ${b})`;
  };

  const step = (time) => {
      if (!elapsed) elapsed = time;

      const timeElapsed = time - elapsed;
      const progress = timeElapsed / duration;
      const easing = 0.5 - 0.5 * Math.cos(progress * Math.PI);
      const current = Math.round(start + (range * easing));

      if (formalName === "PoP6h") {
          const color = getColorForPoP6h(current);
          element.style.color = color;
      } else if (formalName === "T") {
          const color = getColorForT(current);
          element.style.color = color;
      }

      if (callback) {
        callback(current);
      } else {
        element.textContent = current + unit;
      }

      if (timeElapsed < duration) {
          requestAnimationFrame(step);
      } else {
          element.textContent = end + unit;
      }
  };

  requestAnimationFrame(step);
}

// 轉換 hh:mm 到 分鐘
function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}

// 轉換 分鐘 到 hh:mm
function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
}

function to12HourFormat(time24) {
  const [hour, minute] = time24.split(':');
  let newHour = parseInt(hour, 10);
  const ampm = newHour >= 12 ? 'PM' : 'AM';

  if (newHour === 0) {
    newHour = 12;
  } else if (newHour > 12) {
    newHour -= 12;
  }

  return `${newHour}:${minute} ${ampm}`;
}

// 取得當前日期 yyyy-MM-dd
function getCurrentDate() {
  const date = new Date();
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}
