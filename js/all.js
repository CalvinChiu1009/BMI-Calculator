var send = document.querySelector('#send');
var result = document.querySelector('.result');
var list = document.querySelector('.list');
var clear = document.querySelector('#h-clear');
var data = JSON.parse(localStorage.getItem('BMIdata')) || [];
var judge = '';
var color = '';
var bmiColor = '';
var bmi = 0;

// 設定（看結果）按鈕功能
function remind(e) {
    e.preventDefault();
    // Number()提取選擇html標籤中的數字
    var height = Number(document.querySelector('#userHeight').value);
    var weight = Number(document.querySelector('#userWeight').value);
    if (isNaN(height) || isNaN(weight)) {
        // 如果沒有正確的輸入數字，則會跳出警示，並且清空填空處
        alert('請輸入數值');
        document.querySelector('#userHeight').value = '';
        document.querySelector('#userWeight').value = '';
        return;
    }
    //  若沒輸入身高或體重的數值，或是輸入數值小於0，則跳出警示，並清空填空處
    if (height == '' || height <= 0) {
        alert('小提示：請確實輸入身高唷');
        document.querySelector('#userHeight').value = '';
        return;
    }
    if (weight == '' || weight <= 0) {
        alert('小提示：請確實輸入體重唷')
        document.querySelector('#userWeight').value = '';
        return;
    }
    // calBmi帶入計算出來的結果
    calBmi(height, weight);
    // addObj將計算結果帶入localStorage
    addObj(height, weight, bmi);
    // 更新資料庫
    updateList(data);
    // changeBtn()計算後更新按鈕顯示的結果
    changeBtn();
    // 計算後將填空處清空（帶入空字串）
    document.querySelector('#userHeight').value = '';
    document.querySelector('#userWeight').value = '';
}

// 利用輸入的身高體重，計算BMI
// 使用parseFloat解析數字字串，因會判定到小數點後的數字，故解析到第二個小數點才會使其返回NaN
// parseInt則是解析到一個非數字字元就會返回NaN
// 計算BMI時因為會有小數點以下的計算，因此使用parseFloat
// Math.pow可用於次方計算，身高需換算為公尺以後進行平方運算(^2)，因此參數設定為2
// 寫法：Math.pow(a,計算的次方數)
// toFixed作用為將計算後小數點後的數字設定在小數點後位數，此部分因只需帶到小數點第二位，因此寫2
// toFixed(#(欲設定小數點位數))
function calBmi(h, w) {
    bmi = parseFloat((w / Math.pow((h / 100), 2)).toFixed(2));
    if (bmi >= 40) {
        judge = '重度肥胖';
        color = 'color1';
    } else if (bmi >= 35) {
        judge = '中度肥胖';
        color = 'color 2';
    } else if (bmi >= 30) {
        judge = '輕度肥胖';
        color = 'color3';
    } else if (bmi >= 25) {
        judge = '過重';
        color = 'color4';
    } else if (bmi >= 18.5) {
        judge = '理想';
        color = 'color5';
    } else {
        judge = '過輕';
        color = 'color6'
    }
}

// addObj將計算結果帶入localStorage
function addObj(height, weight) {
    var todo = {
        colorBar: color,
        recordHeight: height,
        recordWeight: weight,
        recordBMI: bmi,
        recordJudge: judge,
        time: time(),
    }
    // 將計算結果以push的方式新增進record物件中
    data.push(todo);
    // 再將物件資料轉化為字串(string)後存進localStorage
    localStorage.setItem('BMIdata', JSON.stringify(data));
}

// 更新資料(item)，並列出BMI計算結果
function updateList(items) {
    let str = '';
    let len = items.length;
    for (let i = 0; i < len; i++) {
        str += `
        <li>
        <div class="color" id="${items[i].colorBar}"></div>
        <p><span>${items[i].recordJudge}</span></p>
        <p>BMI<span>${items[i].recordBMI}</span><p>
        <p>Height<span>${items[i].recordHeight}</span>cm</p>
        <p>Wight<span>${items[i].recordWeight}</span>kg</p>
        <p>${items[i].time}</p>
        </li>`
    }
    list.innerHTML = str;
}

// 設定輸入身高體重以後，原本的點擊按鈕會直接顯示BMI結果
function changeBtn() {
    var showResult = `
        <div class="newBtn"><p class="bmiResult">${bmi}</p></div>
        <div class="BMI">BMI</div>
        <div class="showJudge">${judge}</div>
        <a class="refreshBtn "href="#">
        <img src="https://imgur.com/vmTeCqJ.png"></a>
    `;
    result.innerHTML = showResult;
    var newBtn = document.querySelector('.newBtn');
    var refreshBtn = document.querySelector('.refreshBtn');
    // 根據judge，判定BMI結果，改變按鈕樣式
    switch (judge) {
        case '過輕':
            result.setAttribute('style', 'color:#31BAF9');
            newBtn.setAttribute('style', 'border: 10px solid #31BAF9');
            refreshBtn.setAttribute('style', 'background-color: #31BAF9;border: 3px solid #424242');
            break;
        case '理想':
            result.setAttribute('style', 'color:#86D73F');
            newBtn.setAttribute('style', 'border: 6px solid #86D73F');
            refreshBtn.setAttribute('style', 'background-color: #86D73F;border: 3px solid #424242');
            break;
        case '過重':
            result.setAttribute('style', 'color:#FF982D');
            newBtn.setAttribute('style', 'border: 6px solid #FF982D');
            refreshBtn.setAttribute('style', 'background-color: #FF982D;border: 3px solid #424242');
            break;
        case '輕度肥胖':
            result.setAttribute('style', 'color:#FF6C03');
            newBtn.setAttribute('style', 'border: 6px solid #FF6C03');
            refreshBtn.setAttribute('style', 'background-color: #FF6C03;border: 3px solid #424242');
            break;
        case '中度肥胖':
            result.setAttribute('style', 'color:#FF6C03');
            newBtn.setAttribute('style', 'border: 6px solid #FF6C03');
            refreshBtn.setAttribute('style', 'background-color: #FF6C03;border: 3px solid #424242');
            break;
        case '重度肥胖':
            result.setAttribute('style', 'color:#FF1200');
            newBtn.setAttribute('style', 'border: 6px solid #FF1200');
            refreshBtn.setAttribute('style', 'background-color: #FF1200;border: 3px solid #424242');
            break;
    }
    refreshBtn.addEventListener('click', refresh)
}

// 設定計算當下的日期
function time() {
    let d = new Date();
    let today = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
    return today;
}

// 重新載入頁面
function refresh(e) {
    e.preventDefault;
    window.location.reload();
}

// 清除locaStorage並重新載入頁面
function clearHistory(e) {
    e.preventDefault(e);
    localStorage.clear();
    window.location.reload();
    updateList(data);
}

// 
send.addEventListener('click', remind);
clear.addEventListener('click', clearHistory);
updateList(data);