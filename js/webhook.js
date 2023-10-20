

document.addEventListener("DOMContentLoaded", function () {
  let cityName = "臺中市";
  const paths = document.querySelectorAll(".map path");

  // Weather
  const weatherImage = document.querySelector("#wx-img");

  weatherImage.addEventListener("click", function (e) {
    console.log("以點擊");
    sendDataToZapier(cityName);
  });

  const aqiIcon = document.getElementById("aqiIcon");

  aqiIcon.addEventListener("click", function (e) {
    sendAirToZapier(cityName, selectedOption);
  });

  // Air
  const selectElement = document.querySelector("#sitenameSelect");
  let selectedOption;
  selectElement.addEventListener("change", function() {
      selectedOption = selectElement.value;
  });

  // Sun

  const sunRiseTime = document.querySelector("#sunRiseTime");
  const sunSetTime = document.querySelector("#sunSetTime");

  const sunRiseImg = document.querySelector(".sunrise");
  const sunSetImg = document.querySelector(".sunset");

  console.log("sunRiseImg:", sunRiseImg);

  sunRiseImg.addEventListener("click", function (e) {
    sendSunToZapier(cityName, sunRiseTime, sunSetTime, true );
  });
  sunSetImg.addEventListener("click", function (e) {
    sendSunToZapier(cityName, sunRiseTime, sunSetTime, false );
  });

  paths.forEach(path => {
    path.addEventListener("click", function (e) {
      cityName = e.currentTarget.getAttribute("data-name");
    });
  });
});

function timeCatch(night){

  const year = document.querySelector("#year").textContent;
  const monthDay = document.querySelector("#monthDay").textContent;
  const weekDay = document.querySelector("#weekDay").textContent;

  const monthMap = {
    "Jan": "1",
    "Feb": "2",
    "Mar": "3",
    "Apr": "4",
    "May": "5",
    "Jun": "6",
    "Jul": "7",
    "Aug": "8",
    "Sep": "9",
    "Oct": "10",
    "Nov": "11",
    "Dec": "12"
  };

  const regexMonthDay = /^([A-Za-z]+)\.(\d+)/;

  const dateParts = monthDay.match(regexMonthDay);

  // const dateText = document.querySelector("#date").textContent;
  // const removedPrefix = dateText.replace("日期：", "").trim();
  // const dateParts = removedPrefix.split("-");
  // const year = dateParts[0];
  const monthWord = dateParts[1];
  const day = dateParts[2];

  const month = monthMap[monthWord];

  // Date
  const newDateStr = `${month}/${day}, ${year}`;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const period = hours >= 12 ? "下午" : "上午";
  const currentHour = hours % 12 === 0 ? 12 : hours % 12;  // 將 24 小時制轉換為 12 小時制
  if(hours >= 18 || hours < 6) {
    night = true;
  }
  // Time
  const currentTime = `${period} ${currentHour < 10 ? "0" : " "}${currentHour}:${minutes < 10 ? "0" : ""}${minutes}`;

  return {
    newDateStr,
    currentTime,
    night
  };
}

async function sendDataToZapier(county) {
  const zapierWebhookURL = "https://hooks.zapier.com/hooks/catch/15050980/3sjsmi4/";

  // County
  // const county = document.querySelector("#county").textContent;

  let night = false;
  const result = timeCatch(night);
  const newDateStr = result.newDateStr;
  const currentTime = result.currentTime;
  night = result.night;

  let imgUrl, iconUrl, welcome;
  if(night){
    imgUrl = "https://i.imgur.com/C67obDr.png"
    iconUrl = "https://i.imgur.com/C67obDr.png";
    welcome = "晚安 🌛，";
  } else {
    imgUrl = "https://i.imgur.com/YsdUgwS.jpg"
    iconUrl = "https://i.imgur.com/JkkfA8i.png";
    welcome = "安安 🌞，";
  }

  // Wx image
  const wx = document.querySelector("#Wx");
  const weatherImage =document.querySelector("#wx-img");

  // Wx
  const wxContent = wx.textContent;
  const wxStr = wxContent.replace("天氣現象：", "").trim();
  console.log("wxStr:", wxStr);

  // T
  const temperature = document.querySelector("#T").textContent;
  const temperatureStr = temperature.replace("溫度：", "").trim();

  // Ws
  const windSpeed = document.querySelector("#Ws").textContent;
  const windSpeedStr = windSpeed.replace("風速：", "").trim();

  // PoP6h
  const rainFall6h = document.querySelector("#PoP6h").textContent;
  const rainFall6hStr = rainFall6h.replace("6小時降雨機率：", "").trim();

  // weather-one
  const weatherOne = document.querySelector("#weatherData1");
  const weatherOneTime = weatherOne.querySelector("#timeDescribe").textContent;
  const weatherOneTimeStr = weatherOneTime.replace("日期描述：", "").trim();
  const weatherOneWeather = weatherOne.querySelector("#Wx").textContent;
  const weatherOneWeatherStr = weatherOneWeather.replace("天氣現象：", "").trim();

  const weatherOneTemperature = weatherOne.querySelector("#T").textContent;
  const weatherOneTemperatureStr = weatherOneTemperature.replace("溫度：", "").trim();
  // const weatherOneWindSpeed = weatherOne.querySelector("#Ws").textContent;
  // const weatherOneWindSpeedStr = weatherOneWindSpeed.replace("風速：", "").trim();
  const weatherOneRainFall = weatherOne.querySelector("#PoP12h").textContent;
  const weatherOneRainFallStr = weatherOneRainFall.replace("降雨機率：", "").trim();

  //weatherTwo 
  const weatherTwo = document.querySelector("#weatherData2");
  const weatherTwoTime = weatherTwo.querySelector("#timeDescribe").textContent;
  const weatherTwoTimeStr = weatherTwoTime.replace("日期描述：", "").trim();
  const weatherTwoWeather = weatherTwo.querySelector("#Wx").textContent;
  const weatherTwoWeatherStr = weatherTwoWeather.replace("天氣現象：", "").trim();
  const weatherTwoTemperature = weatherTwo.querySelector("#T").textContent;
  const weatherTwoTemperatureStr = weatherTwoTemperature.replace("溫度：", "").trim();
  // const weatherTwoWindSpeed = weatherTwo.querySelector("#Ws").textContent;
  // const weatherTwoWindSpeedStr = weatherTwoWindSpeed.replace("風速：", "").trim();
  const weatherTwoRainFall = weatherTwo.querySelector("#PoP12h").textContent;
  const weatherTwoRainFallStr = weatherTwoRainFall.replace("降雨機率：", "").trim();

  //weatherThree
  const weatherThree = document.querySelector("#weatherData3");
  const weatherThreeTime = weatherThree.querySelector("#timeDescribe").textContent;
  const weatherThreeTimeStr = weatherThreeTime.replace("日期描述：", "").trim();
  const weatherThreeWeather = weatherThree.querySelector("#Wx").textContent;
  const weatherThreeWeatherStr = weatherThreeWeather.replace("天氣現象：", "").trim();
  const weatherThreeTemperature = weatherThree.querySelector("#T").textContent;
  const weatherThreeTemperatureStr = weatherThreeTemperature.replace("溫度：", "").trim();
  // const weatherThreeWindSpeed = weatherThree.querySelector("#Ws").textContent;
  // const weatherThreeWindSpeedStr = weatherThreeWindSpeed.replace("風速：", "").trim();
  const weatherThreeRainFall = weatherThree.querySelector("#PoP12h").textContent;
  const weatherThreeRainFallStr = weatherThreeRainFall.replace("降雨機率：", "").trim();

  const payload = {
    "content": `${newDateStr} ${currentTime}，${county}的天氣如下`,
    "username": "天空生氣人",
    "avatar_url": `${imgUrl}`,
    "embeds": [
      {
        "author": {
          "name": "The Sky goes nuts",
          "icon_url": `${iconUrl}`
        },
        "title": "天空生氣氣報告",
        "description": `${welcome}, 天氣還好嗎？`,
        "color": 16426522,
        "fields": [
          {
            "name": "☁️天氣",
            "value": `${wxStr}`,
            "inline": true
          },
          {
            "name": "🌡️ 溫度",
            "value": `${temperatureStr}`,
            "inline": true
          },
          {
            "name": "🌬風速",
            "value": `${windSpeedStr}`,
            "inline": true
          },
          {
            "name": "🌧️ 降雨率(6h)",
            "value": `${rainFall6hStr}`,
            "inline": true
          },
          {
            "name": `${weatherOneTimeStr}`,
            "value": `${weatherOneWeatherStr}, 🌡️ ${weatherOneTemperatureStr}, 🌧️ ${weatherOneRainFallStr}(12h)`
          },
          {
            "name": `${weatherTwoTimeStr}`,
            "value": `${weatherTwoWeatherStr}, 🌡️ ${weatherTwoTemperatureStr}, 🌧️ ${weatherTwoRainFallStr}(12h)`
          },
          {
            "name": `${weatherThreeTimeStr}`,
            "value": `${weatherThreeWeatherStr}, 🌡️ ${weatherThreeTemperatureStr}, 🌧️ ${weatherThreeRainFallStr}(12h)`
          }
        ],
        "footer": {
          "text": "👆 請注意以上天氣變化, special thanks to [PastLeo](https://pastleo.me/)"
        },
        "image": {
          "url": `https://i.imgur.com/7Clp18f.jpg`
        }
      }
    ]
  };

  console.log("payload:", payload);

  // 發送訊息
    await fetch(zapierWebhookURL, {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    .then(response => response.json())
    .then(data => {
      console.log("天氣訊息發送成功:", data);
    })
    .catch((error) => {
      console.log("天氣訊息發送失敗:", error);
    });
};


async function sendAirToZapier(cityName, selectedOption){
  const zapierWebhookURL = "https://hooks.zapier.com/hooks/catch/15050980/3sjsmi4/";

  let night = false;
  const result = timeCatch(night);
  const newDateStr = result.newDateStr;
  const currentTime = result.currentTime;
  night = result.night;

  // let imgUrl, iconUrl;
  // if(night){
  //   imgUrl = "https://i.imgur.com/C67obDr.png"
  //   iconUrl = "https://i.imgur.com/C67obDr.png";
  // } else {
  //   imgUrl = "https://i.imgur.com/YsdUgwS.jpg"
  //   iconUrl = "https://i.imgur.com/JkkfA8i.png";
  // }

  let imgUrl = "https://i.imgur.com/iZ90pFJ.jpg"
  let iconUrl = "https://i.imgur.com/iZ90pFJ.jpg";


  const aqi = document.querySelector("#aqi").textContent;
  const status = document.querySelector("#aqiStatus").textContent;
  const pollutant = document.querySelector("#pollutant").textContent;

  let caution, allergicCaution;

  if (status === "良好") {
     caution =  "正常戶外活動";
     allergicCaution = "正常戶外活動";
  } else if (status === "普通") {
    caution = "正常戶外活動";
    allergicCaution = "注意咳嗽或呼吸急促";
  } else if (status === "對敏感族群不健康") {
    caution = "建議減少長時間劇烈運動";
    allergicCaution = "建議減少戶外活動及體力消耗";
  } else if (status === "對所有族群不健康") {
    caution = "減少戶外活動";
    allergicCaution = "建議留在室內並減少體力消耗"; 
  } else if (status === "非常不健康") {
     caution = "減少或停止戶外活動";
    allergicCaution = "必須留在室內並減少體力消耗";
  } else if (status === "危害") {
    caution = "停止戶外活動、關緊門窗";
    allergicCaution = "必須留在室內並減少體力消耗";
  } 


  const payload = {
    "content": `${newDateStr} ${currentTime}，${cityName} ${selectedOption} 觀測站的空氣品質如下`,
    "username": "空氣臭不臭",
    "avatar_url": `${imgUrl}`,
    "embeds": [
      {
        "author": {
          "name": "The Air cuts the cheese",
          "icon_url": `${iconUrl}`
        },
        "title": "空氣臭不臭偵信社",
        "description": "空氣還好嗎？",
        "color": 4437377,
        "fields": [
          {
            "name": "🔢 空氣品質指標(AQI)",
            "value": `${aqi}`,
            "inline": true
          },
          {
            "name": "🏭污染物",
            "value": `${pollutant}`,
            "inline": true
          },
          {
            "name": "❓空氣品質",
            "value": `${status}`,
            "inline": true
          },
          {
            "name": "😊 一般人的健康建議",
            "value": `${caution}`
          },
          {
            "name": "😣 敏感族群健康建議",
            "value": `${allergicCaution}`
          },
        ],
        "footer": {
          "text": `👆 請尤其注意以上活動建議`
        },
        "image": {
          "url": `https://i.imgur.com/4EUmVCg.png`
        }
      }
    ]
  };

  console.log("payload:", payload);

  await fetch(zapierWebhookURL, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  .then(response => response.json())
  .then(data => {
    console.log("空氣訊息發送成功:", data);
  })
  .catch((error) => {
    console.log("空氣訊息發送失敗:", error);
  });
}

async function sendSunToZapier(cityName, sunRiseTime, sunSetTime, sunRise){

  const zapierWebhookURL = "https://hooks.zapier.com/hooks/catch/15050980/3sjsmi4/";

  const result = timeCatch();
  const newDateStr = result.newDateStr;
  const currentTime = result.currentTime;

  const sunRiseTimeStr = sunRiseTime.textContent.replace( "日出", "").trim();
  const sunSetTimeStr = sunSetTime.textContent.replace( "日落", "").trim();


  let mainImgUrl, keyword, avatarUrl ="";
  if (sunRise) {
    mainImgUrl = "https://www.gomaji.com/blog/wp-content/uploads/2021/06/%E9%A6%96%E5%9C%96_%E9%9A%99%E9%A0%82%E4%BA%8C%E5%BB%B6%E5%B9%B3%E6%AD%A5%E9%81%93_ooxx2081.jpg";
    keyword = "出";
    avatarUrl ="https://i.imgur.com/UkkOa1y.jpg";
  } else {
    mainImgUrl = "https://www.winnews.com.tw/wp-content/uploads/2020/03/%E6%B7%A1%E6%B0%B4%E6%B2%99%E5%B4%99%E4%B8%96%E7%95%8C%E5%8D%81%E5%A4%A7%E5%A4%95%E9%99%BD-scaled.jpg";
    keyword = "落";
    avatarUrl ="https://i.imgur.com/7qwB1oy.jpg";
  }

  const payload = {
    "content": `${newDateStr} ${currentTime}，${cityName} 今天的日${keyword}時間為`,
    "username": "浪漫 na 機器人",
    "avatar_url": `${avatarUrl}`,
    "embeds": [
      {
        "author": {
          "name": `Always look at the sun${keyword == "出" ? "rise 🌄 " : "set 🌇 "}; I will be there`,
          "icon_url": "https://i.imgur.com/JkkfA8i.png"
        },
        "title": `日${keyword}獵手`,
        "description": `想看日${keyword}嗎？`,
        "color": 15746887,
        "fields": [
          {
            "name": `日${keyword == "出" ? "出 🌄 " : "落 🌇 "}時間`,
            "value": `${keyword == "出" ? sunRiseTimeStr : sunSetTimeStr}`,
            "inline": true
          },
          {
            "name": `日${keyword == "落" ? "出 🌄 " : "落 🌇 "}時間`,
            "value": `${keyword == "落" ? sunRiseTimeStr : sunSetTimeStr}`,
            "inline": true
          },
          {
            "name": "🌹浪漫小語",
            "value": `${keyword == "出" ? "畢竟，日出總是滿懷希望" : "每一次夕陽總總與眾不同。"}`
          }
        ],
        "footer": {
          "text": `👆 請享受美麗的日${keyword}`
        },
        "image": {
          "url": `${mainImgUrl}`
        }
      }
    ]
  };
  console.log("payload:", payload);

  await fetch(zapierWebhookURL, {
    method: "POST",
    headers: {
      // "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  .then(response => response.json())
  .then(data => {
    console.log("日出日落訊息發送成功:", data);
  })
  .catch((error) => {
    console.log("日出日落訊息發送失敗:", error);
  });
  
}

function convertTo12HourTime(time) {
  const [hours, minutes] = time.split(":");
  
  // 將小時部分轉換為數字
  const hour = parseInt(hours, 10);
  
  // 判斷時間是上午還是下午
  let period;
  if (hour < 1) {
      period = "午夜";
  } else if (hour < 6) {
      period = "凌晨";
  } else if(hour < 8) {
      period = "清晨";
  } else if (hour < 12) {
      period = "上午";
  } else if (hour < 13) {
      period = "中午";
  } else if (hour < 18) {
      period = "下午";
  } else if (hour < 23) {
      period = "晚上";
  } else if (hour < 24) {
      period = "午夜";
  }
  
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  
  const formattedTime = `${period} ${hour12}:${minutes}`;
  
  return formattedTime;
}



