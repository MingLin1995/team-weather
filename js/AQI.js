//API使用說明：https://drive.google.com/file/d/13kPG4SJ_4IQI2mVBK_-i422U41BUb-d5/view
//API https://data.moenv.gov.tw/swagger/#/%E5%A4%A7%E6%B0%A3/get_aqx_p_432

//取得API資料
function getAQIData() {
  //自己去申請帳號就有了
  const apiKey = "540e2ca4-41e1-4186-8497-fdd67024ac44";

  //format JSON格式；offset 跳過筆數；limit 取幾筆資料
  const apiUrl = `https://data.moenv.gov.tw/api/v2/aqx_p_432?format=json&offset=0&limit=100&api_key=${apiKey}`;

  fetch(apiUrl, { method: "GET" })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`狀態碼： ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      //console.log(data.records);
      getSiteSelect(data.records);
    })
    .catch((error) => {
      console.error("發生錯誤：", error);
    });
}

//取得該縣市“區域”
function getSiteSelect(data) {
  const countyElement = document.getElementById("county");
  let countyValue = countyElement.textContent;
  const sitenameSelect = document.getElementById("sitenameSelect");

  // 取得符合選擇 county 的 sitename 選項
  const sitenamesForCounty = data
    .filter((item) => item.county === countyValue)
    .map((item) => item.sitename);

  sitenameSelect.innerHTML = "";
  // 將 sitename 選項加入選單
  sitenamesForCounty.forEach((sitename) => {
    const option = document.createElement("option");
    option.value = sitename;
    option.textContent = sitename;
    sitenameSelect.appendChild(option);
  });

  //首次載入畫面時取得該區域資訊
  getInformation(data);

  sitenameSelect.addEventListener("change", function () {
    getInformation(data);
  });
}

//取出AQI相關資料
function getInformation(data) {
  const sitenameSelect = document.getElementById("sitenameSelect");
  const informationElement = document.getElementById("information");

  //找出符合 selectedSitename 的資料
  const siteData = data.find((item) => item.sitename === sitenameSelect.value);
  console.log("test", siteData);

  if (siteData.pollutant == "") {
    siteData.pollutant = "無";
  }
  // 找到符合 county 和 sitename 的資料，顯示相關資訊
  const aqiNumber = document.getElementById("aqi");
  const lastAqi = parseInt(aqiNumber.textContent);
  const nowAqi = parseInt(siteData.aqi)

  animateValue("aqi", lastAqi, nowAqi, 1000, "", "aqi");


  aqiNumber.textContent = siteData.aqi;

  const pollutantInformation = document.getElementById("pollutant");
  pollutantInformation.textContent = siteData.pollutant;

  const statusInformation = document.getElementById("aqiStatus");
  statusInformation.textContent = siteData.status;
  changeAQIImg(siteData.aqi);
}

getAQIData(); //取得API資料
