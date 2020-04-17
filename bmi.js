

var star = document.querySelector('.click');
//取得本地資料庫並轉換JSON
var web = JSON.parse(localStorage.getItem('webData')) || [];
var hi = document.querySelector('.history');


//取的資料庫陣列並列出
function updata() {
    var webLen = web.length;
    var str = '';

    for (var h = 0; h < web.length; h++) {
        var historyContent = 
        `<div class="liList ${web[h].name}">
            <div class="notice1">${web[h].height}</div>
            <div class="notice2">${web[h].weight}</div>
            <div class="notice3">${web[h].number}</div>
            <div class="notice4">${web[h].time}</div>
            <span data-num="${h}">×</span>
        </div>`
        str += historyContent;
    }
    hi.innerHTML = str;
    // 當資料庫不等於0則執行
    if(webLen !== 0 ){
        document.getElementById('resulteShow').textContent = web[webLen-1].status + 'BMI：'+ web[webLen-1].number;
    }

}
//執行
updata();


//刪除單筆數據
var historyLen = document.querySelectorAll('.history div').length;
var historyList = document.querySelectorAll('.history .liList');
var historyListLen = document.querySelectorAll('.history .liList').length;
var historyListbtn = document.querySelectorAll('.history div span');

function removeBmi(e){
    var num = e.target.dataset.num;
    if(e.target.nodeName !== 'SPAN'){return};
    web.splice(num,1);
    hi.removeChild(historyList[num],1);
    localStorage.setItem('webData', JSON.stringify(web));
    location.reload();
}

hi.addEventListener('click',removeBmi);


// 刪除整個數據
var del = document.querySelector('.allClear');

function removeBmiAll(){
    hi.innerHTML='';
    localStorage.removeItem('webData');
    location.reload();
}

del.addEventListener('click',removeBmiAll);


//顯示計算結果
function bmiResulte() {

    var kg = document.querySelector('.kg').value;
    var m = document.querySelector('.m').value;
    var YY = new Date().getFullYear();
    var MM = new Date().getMonth()+1;
    var DD = new Date().getDate();
    var hour = new Date().getHours();
    var min = new Date().getMinutes();
    var nowTime = YY +'/'+ MM +'/'+ DD +'  '+ hour +':'+ min;
    var total1 = (kg / (m * m * 0.00001)) * 0.1;
    var total = Math.round(total1*10)/10;
    
    if(kg =='' || m ==''){
        alert('身高、體重不可為空')
        return
    }

    //顯示計算結果
    var resulte = document.getElementById('resulteShow');

    if ( total < 15 ){
        nowStatus= '非常嚴重的體重不足';
        statusName= 'resulte1';
        star.style.backgroundColor = "#ff001a";
        star.value = "非常嚴重的體重不足";
    }
    else if( total <= 16 ){
        nowStatus= '嚴重體重不足';
        statusName= 'resulte2';
        star.style.backgroundColor = "#ff6925";
        star.value = "嚴重體重不足";
    }
    else if( total <= 18.5){
        nowStatus= '體重過輕';
        statusName= 'resulte3';
        star.style.backgroundColor = "#00b9f5";
        star.value = "體重過輕";
    }
    else if( total <= 25){
        nowStatus= '體重正常';
        statusName= 'resulte4';
        star.style.backgroundColor = "#65db52";
        star.value = "體重正常";
    }
    else if( total <= 30){
        nowStatus= '體重過重';
        statusName= 'resulte5';
        star.style.backgroundColor = "#ff9840";
        star.value = "體重過重";
    }
    else if( total <= 35){
        nowStatus= '中等肥胖';
        statusName= 'resulte6';
        star.style.backgroundColor = "#ff6925";
        star.value = "中等肥胖";
    }
    else if (total <= 40){
        nowStatus= '嚴重肥胖';
        statusName= 'resulte7';
        star.style.backgroundColor = "#ff6925";
        star.value = "嚴重肥胖";
    }
    else if(total > 40){
        nowStatus= '非常嚴重肥胖';
        statusName= 'resulte8';
        star.style.backgroundColor = "#ff001a";
        star.value = "非常嚴重肥胖";
    }

    var bmiArray = {
        status: nowStatus,
        name: statusName,
        weight: kg,
        height: m,
        number: total,
        time: nowTime,
    };

    resulte.textContent = nowStatus + 'BMI：'+ total;

    //將結果新增 localStorage
    web.push(bmiArray);
    localStorage.setItem('webData', JSON.stringify(web));
    
    //新增單筆紀錄
    var hiData = document.createElement('div');

    hiData.setAttribute('class','liList' + ' ' + statusName)
    hiData.innerHTML = `
        <div class="notice1">${kg}</div>
        <div class="notice2">${m}</div>
        <div class="notice3">${total}</div>
        <div class="notice4">${nowTime}</div>
    `
    hi.appendChild(hiData);
    var hiDataRemove = document.createElement('span');
    // hiDataRemove.setAttribute('data-num',historyListLen);
    hiDataRemove.textContent = '×';
    hiData.appendChild(hiDataRemove);
    // location.reload();
    
}

star.addEventListener('click', bmiResulte);










