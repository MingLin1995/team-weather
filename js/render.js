const yearElement = document.getElementById("year");
const weekDayElement = document.getElementById("weekDay");
const monthDayElement = document.getElementById("monthDay");


function getYear(){
    const today = new Date(); 
    let year = formatNumber(today.getFullYear());

    return year
}
yearElement.textContent=getYear()

function getMonthDay(){
    const today = new Date(); 
    let Month = today.getMonth();

    const monthNames = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

    const monthName = monthNames[Month];
    let day = today.getDate();

    MonthDay=`${monthName}${day}`

    return  MonthDay
}
monthDayElement.textContent=getMonthDay()


function getDayOfWeekName(){
    const today = new Date();
    const dayOfWeekNumber = today.getDay();

    // 根據整數值轉換為星期的英文縮寫
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // 取得當前星期的名稱
    const dayOfWeekName = daysOfWeek[dayOfWeekNumber];
    
    return dayOfWeekName
}

weekDayElement.textContent=getDayOfWeekName()




function judgePoP6hElement(){
    const PoP6hElement = document.getElementById('PoP6h');
    const PoP6hElementString = PoP6hElement.textContent;

    if(PoP6hElementString==""){
        setTimeout(judgePoP6hElement,1000);
    }
    else{
    // 將百分比轉為數字（例如從"70%"轉為0.7）
    let PoP6hElementNumber = parseFloat(PoP6hElementString) / 100;
    

    }
}


