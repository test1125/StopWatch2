//Wake Lock API 変数
const screenLockStatus = document.querySelector('.screen-lock__status');
const seceenLockCheckBox = document.querySelector('.screen-lock__check-box');
let screenLock = true;

//StopWatch1 変数
let idList = [document.querySelector('#stop-watch-0')];
let stopWatchList = [];


//wake Lock API利用可否の判定
if ('wakeLock' in navigator) {
    isSupported = true;
    screenLockStatus.textContent = '利用できます';
    seceenLockCheckBox.checked = true;
  } else {
    screenLockStatus.textContent = '利用できません';
    seceenLockCheckBox.disabled = true;
  }

  

class StopWatch{
    constructor(target){
        //ストップウォッチ
        this.target = target;

        //各部品
        this.startStopBtn = target.querySelector('.stop-watch__start-and-stop-button');
        this.time = target.querySelector('.stop-watch__time');
        this.resetButton = target.querySelector('.stop-watch__reset-button');
        this.addButton = target.querySelector('.stop-watch__add-btn');
        this.deleteButton = target.querySelector('.stop-watch__del-btn');

        //idの番号取得、ストップウォッチのひな型 
        this.idText = "stop-watch-"
        this.idNum = Number(target.id.split("stop-watch-").join(""));
        this.template = 
        `    <div id="stop-watch-${this.idNum+1}" class="stop-watch mt-5 mx-auto p-3 text-center w-[500px] bg-sky-400">
        <div class="mb-3 flex justify-center relative">
            <input class="grow text-center border-b-2 border-black focus:outline-none text-xl text-white mr-2 bg-sky-400" type="text">
            <div>
                <button class="stop-watch__del-btn">
                    <i class="stop-watch__del-icon fa-sharp fa-solid fa-trash"></i> 削除
                </button>
                <button class="stop-watch__add-btn pl-2">
                    <i class="fa-sharp fa-solid fa-plus"></i> 追加
                </button>
            </div>
        </div>     
        <div class="stop-watch__time pb-3 text-5xl">00:00:00</div>
        <div>
            <button class="stop-watch__start-and-stop-button bg-blue-500 hover:bg-blue-700 text-white px-2 py-1" type="button">start</button>
            <button class="stop-watch__reset-button bg-blue-500 hover:bg-blue-700 text-white px-2 py-1" type="button">reset</button>
        </div>`

        //変数の初期化
        this.stopTime = 0;
        this.startTime = 0;
        this.run = false;

        //関数呼び出し
        this.delete();
        this.startStop();
        this.reset();
        this.add();

    }

    //時間の表示
    getElapsedTime=()=>{
        this.elapsedTime = Date.now() -this.startTime + this.stopTime
        this.h = String(Math.floor(this.elapsedTime / (60*60*1000))).padStart(2, '0');
        this.m = String(Math.floor(this.elapsedTime % (60*60*1000) /(60*1000))).padStart(2, '0');
        this.s = String(Math.floor(this.elapsedTime % (60*1000) / 1000)).padStart(2, '0');
        // console.log(`${this.h}:${this.m}:${this.s}`);
        this.time.textContent = `${this.h}:${this.m}:${this.s}`;
        this.timeoutID = setTimeout(this.getElapsedTime, 10);
    }

    //スタート/ストップボタンの挙動
    startStop = ()=>{
        this.startStopBtn.addEventListener('mousedown', () => {
            if(this.run==false) {
                this.startTime = Date.now();
                this.startStopBtn.textContent = "stop";
                this.run = true;
                this.getElapsedTime();
            }   
            else {
                clearTimeout(this.timeoutID);
                this.stopTime += (Date.now() - this.startTime);
                this.startStopBtn.textContent = "start";
                this.run = false;
            }
        })
    }
    
    //リセットボタンの挙動
    reset = () => {
        this.resetButton.addEventListener('mousedown', () => {
            clearTimeout(this.timeoutID);
            this.startTime = 0;
            this.stopTime = 0;
            this.time.textContent = "00:00:00";
            this.startStopBtn.textContent = "start";
            this.run = false;
        })
    }

    //削除ボタンの挙動
    delete = () => {
        this.deleteButton.addEventListener('mousedown', () => {
            // console.log('delete');
            this.node = document.querySelector(`#${this.target.id}`);
            console.log(this.node);
            this.target.parentNode.removeChild(this.node);
        })
    }

    //追加ボタンの挙動
    add = () => {
        this.addButton.addEventListener('mousedown', () => {
            this.newIdNum = this.idNum + 1;
            this.target.insertAdjacentHTML("afterend", this.template);
            this.newId = this.idText + String(this.newIdNum);
            idList[this.newIdNum] = document.querySelector(`#${this.newId}`);
            console.log('---idList---');
            console.log(idList);
            console.log('------------');
            console.log('---stopWatchList---');
            console.log(stopWatchList);
            console.log('-------------------');
            stopWatchList[this.newIdNum] = new StopWatch(idList[this.newIdNum]);

            // stopWatchList[this.newIdNum].delete();
            // stopWatchList[this.newIdNum].startStop();
            // stopWatchList[this.newIdNum].reset();
            // stopWatchList[this.newIdNum].add();
            
        })
    }


}

stopWatchList[0] = new StopWatch(idList[0]);
// stopWatchList[0].delete();
// stopWatchList[0].startStop();
// stopWatchList[0].reset();
// stopWatchList[0].add();