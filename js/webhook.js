document.addEventListener("DOMContentLoaded", function () {
  const paths = document.querySelectorAll(".map path");

  paths.forEach(path => {
    path.addEventListener("click", function (e) {
      const cityName = e.currentTarget.getAttribute("data-name");

      const wx = document.querySelector("#Wx");
      const weatherImage = wx.nextElementSibling

      weatherImage.addEventListener("click", function (e) {
        sendDataToZapier(cityName);
      });
    });
  });
});


async function sendDataToZapier() {
  const zapierWebhookURL = "https://hooks.zapier.com/hooks/catch/15050980/3sjsmi4/";

  // County
  const county = document.querySelector("#county").textContent;

  const dateText = document.querySelector("#date").textContent;
  const removedPrefix = dateText.replace("日期：", "").trim();
  const dateParts = removedPrefix.split("-");
  const year = dateParts[0];
  const month = dateParts[1];
  const day = dateParts[2];

  // Date
  const newDateStr = `${month}/${day}, ${year}`;

  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const period = hours >= 12 ? "下午" : "上午";
  const currentHour = hours % 12 === 0 ? 12 : hours % 12;  // 將 24 小時制轉換為 12 小時制

  // Time
  const currentTime = `${period} ${currentHour < 10 ? "0" : " "}${currentHour}:${minutes < 10 ? "0" : ""}${minutes}`;

  // Wx image
  const wx = document.querySelector("#Wx");
  const weatherImage = wx.nextElementSibling.src;

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
    "avatar_url": "https://i.imgur.com/YsdUgwS.jpg",
    "embeds": [
      {
        "author": {
          "name": "The Sky goes nuts",
          "icon_url": "https://i.imgur.com/JkkfA8i.png"
        },
        "title": "天空生氣氣報告",
        "description": "天氣還好嗎？",
        "fields": [
          {
            "name": "天氣",
            "value": `${wxStr}`,
            "inline": true
          },
          {
            "name": "溫度",
            "value": `${temperatureStr}`,
            "inline": true
          },
          {
            "name": "風速",
            "value": `${windSpeedStr}`,
            "inline": true
          },
          {
            "name": "降雨率(6h)",
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
          "text": "👆 請注意以上天氣變化, special thanks to [PastLeo](https://pastleo.me/post/20221220-webgl-ironman-book)"
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
      console.log("訊息發送成功:", data);
    })
    .catch((error) => {
      console.log("訊息發送失敗:", error);
    });
};
