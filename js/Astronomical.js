// 氣象局資訊
//API https://opendata.cwa.gov.tw/dist/opendata-swagger.html#/%E5%A4%A9%E6%96%87/get_v1_rest_datastore_A_B0062_001

getAstronomicalData();
//取得天文資料
function getAstronomicalData() {
  //自己去申請帳號就有了
  const apiKey = "CWA-C5FE3759-4C7F-4E48-ADEA-8581BA76A0A2";

  const countyElement = document.querySelector(".county");
  const countyValue = countyElement.textContent;

  const Today = new Date(); //月份是從0開始計算，所以+1
  const nowDate = `${Today.getFullYear()}-${
    Today.getMonth() + 1
  }-${Today.getDate()}`;
  const nextDate = `${Today.getFullYear()}-${Today.getMonth() + 1}-${
    Today.getDate() + 1
  }`;

  //yyyy-MM-dd
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
