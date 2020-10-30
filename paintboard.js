const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");     // 픽셀들을 다룰 수 있는 html의 태그, canvas태그의 속성(context)을 정함으로써 픽셀에 접근가능  2d, 3d에 따라 속성의 형식이 다르기 때문에 2d라고 지정
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraser = document.querySelector(".jsEraser");
const reset = document.getElementById("jsReset");

const INICIAL_COLOR = "#2c2c2c"

canvas.width =700;        // 캔버스를 css로만 크기를 정의해 줬는데 pixel로 접근하려면 이런 정의 필요, 즉 윈도우에서 canvas가 어느정도의 픽셀을 차지하는지 알려주는 것 
canvas.height=700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);                 // 이거 없이 저장하면 처음 배경색이 투명으로 저장됨 --> HTML에서만 하얀색으로 지정했기 때문
ctx.strokeStyle = INICIAL_COLOR;    // stroke 색깔을 지정
ctx.fillStyle = INICIAL_COLOR;    // fillStyle 지정
ctx.lineWidth = 2.5;            // line굵기를 지정

let painting = false;
let filling = false;
let current_bgColor = "white";

function stopPainting(){
	painting = false;
}

function startPainting(){
	painting = true;
}

function onMouseMove(event){
	const x = event.offsetX;   // 캔버스 내에서 마우스가 가지는 좌표값 중 x 값 (이때 clientX 값은 모니터 전체 중 나타나는 마우스의 봐표값이다. )
	const y = event.offsetY;
	if(!painting){
		ctx.beginPath();    //path를 만들 시작점을 찍는 것이다.
		ctx.moveTo(x,y);    //path의 시작점을 x,y로 옮기는 것이다. 즉 클릭을 하지않으면 painting이 false이고 if문이 실행되어서 path의 시작점을 마우스가 이동하는 것에 따라 이동하는 것이다. 
	}
	else{
		ctx.lineTo(x,y);    //path의 시작점과 x,y를 직선으로 이어준다. 여기서는 x,y가 계속 변하므로 x,y가 바뀔 때마다 선 생성--> 매우 짧은 선 생성
		ctx.stroke();       // 위에서 지정해준 strokeStyle대로 선을 그린다. 
	}
}

function handleColorClick(event){
	const color = event.target.style.backgroundColor;    //이벤트가 발생한 곳의 태그를 가져오는 것이 target까지의 역할이고 그 다음 속성들은 그 태그의 backgroudColor만 가져오도록 하는 것 
	ctx.strokeStyle = color;                             //선의 색깔을 클릭이라는 이벤트가 발생한 태그의 색깔 속성을 가져와 선의 색깔로 사용한다. 
	ctx.fillStyle = color;													//이때 태그를 가져왔는데 그 때 태그의 배경색 요소를 어떻게 알아냈는가? console.log(event.target)하면 태그를 불러온다. 이때 출력된 것을 열어보면 안에 이벤트가 발생되었을 때 태그에 전해지는 정보들이 쭉 나오는데 그중 무슨 요소가 있는지를 보면 된다.
	if(filling){
		current_bgColor = color;
	}
}														

function handleRangeChange(event) {
	const size = event.target.value;                      //이벤트가 발생한 곳의 태그를 가져오는 것이 target까지의 역할이고 그 다음 속성들은 그 태그의 value만 가져오도록 하는 것 
	ctx.lineWidth = size;                                     //선의 굵기를 input이라는 이벤트가 발생한 태그의 value속성을 가져와 선의 굴기로 사용한다. 	
}														//이때 태그를 가져왔는데 그 때 태그의 value 요소를 어떻게 알아냈는가? console.log(event.target)하면 태그를 불러온다. 이때 출력된 것을 열어보면 안에 이벤트가 발생되었을 때 태그에 전해지는 정보들이 쭉 나오는데 그중 무슨 요소가 있는지를 보면 된다.

function handleModeClick(event){
	if (filling === true){
		filling = false;
		mode.innerText = "FILL";
	}
	else{ 
		filling =true;
		mode.innerText = "PAINT";
	}
}

function handleCanvasClick(event){
	if(filling){
		ctx.fillRect(0,0,canvas.width,canvas.height);
	}
}

function handleRightClick(event){
	event.preventDefault();
}

function handleSaveClick(event){
	const image = canvas.toDataURL("image/jpeg");   // 캔버스의 그림을 jpeg형태로 이미지 생성 후 이미지 URL을 image에 담는다. 
	const link = document.createElement("a");      // document에 a태그를 추가한다. 
	link.href = image;      // a태그의 href 속성은 이미지 URL이다.
	link.download = "my masterpiece";    // a태그의 속성으로 download를 주면 링크를 다운받는 특징이 있다. 이 코드는 링크를 다운받으며 이미지 저장 이름을 설정하는 것.
	link.click();              //?????
}

function handleEraser(){
	ctx.strokeStyle = current_bgColor;
}

function handleReset(){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

if (canvas){                                                 //항상 실행, 같은 개념으로 무한반복도 있는데 그건 무한반복 외의 코드를 실행x 이건 가능 
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleRightClick);   //마우스 우클릭 금지 --> 보통 이미지 저장하려고 마우스 우클릭함.
} 

Array.from(colors).forEach(potato => potato.addEventListener("click", handleColorClick));   // colors로 받은 html 태그들을 배열에 넣는 것, 그리고 그것들 각각에 대해서 클릭했을 때의 이벤트를 부여 
																							// 여기서 potato는 배열의 각 요소를 대표하는 것일뿐이라서 아무거나 들어가도 okay.

if(eraser){
	eraser.addEventListener("click", handleEraser);
}

if(range){
	range.addEventListener("input", handleRangeChange);
}

if (mode){
	mode.addEventListener("click", handleModeClick);
}

if(saveBtn){
	saveBtn.addEventListener("click", handleSaveClick);
}

if(reset){
	reset.addEventListener("click", handleReset);
}

