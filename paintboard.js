const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");     // �ȼ����� �ٷ� �� �ִ� html�� �±�, canvas�±��� �Ӽ�(context)�� �������ν� �ȼ��� ���ٰ���  2d, 3d�� ���� �Ӽ��� ������ �ٸ��� ������ 2d��� ����
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const eraser = document.querySelector(".jsEraser");
const reset = document.getElementById("jsReset");

const INICIAL_COLOR = "#2c2c2c"

canvas.width =700;        // ĵ������ css�θ� ũ�⸦ ������ ��µ� pixel�� �����Ϸ��� �̷� ���� �ʿ�, �� �����쿡�� canvas�� ��������� �ȼ��� �����ϴ��� �˷��ִ� �� 
canvas.height=700;

ctx.fillStyle = "white";
ctx.fillRect(0,0,canvas.width,canvas.height);                 // �̰� ���� �����ϸ� ó�� ������ �������� ����� --> HTML������ �Ͼ������ �����߱� ����
ctx.strokeStyle = INICIAL_COLOR;    // stroke ������ ����
ctx.fillStyle = INICIAL_COLOR;    // fillStyle ����
ctx.lineWidth = 2.5;            // line���⸦ ����

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
	const x = event.offsetX;   // ĵ���� ������ ���콺�� ������ ��ǥ�� �� x �� (�̶� clientX ���� ����� ��ü �� ��Ÿ���� ���콺�� ��ǥ���̴�. )
	const y = event.offsetY;
	if(!painting){
		ctx.beginPath();    //path�� ���� �������� ��� ���̴�.
		ctx.moveTo(x,y);    //path�� �������� x,y�� �ű�� ���̴�. �� Ŭ���� ���������� painting�� false�̰� if���� ����Ǿ path�� �������� ���콺�� �̵��ϴ� �Ϳ� ���� �̵��ϴ� ���̴�. 
	}
	else{
		ctx.lineTo(x,y);    //path�� �������� x,y�� �������� �̾��ش�. ���⼭�� x,y�� ��� ���ϹǷ� x,y�� �ٲ� ������ �� ����--> �ſ� ª�� �� ����
		ctx.stroke();       // ������ �������� strokeStyle��� ���� �׸���. 
	}
}

function handleColorClick(event){
	const color = event.target.style.backgroundColor;    //�̺�Ʈ�� �߻��� ���� �±׸� �������� ���� target������ �����̰� �� ���� �Ӽ����� �� �±��� backgroudColor�� ���������� �ϴ� �� 
	ctx.strokeStyle = color;                             //���� ������ Ŭ���̶�� �̺�Ʈ�� �߻��� �±��� ���� �Ӽ��� ������ ���� ����� ����Ѵ�. 
	ctx.fillStyle = color;													//�̶� �±׸� �����Դµ� �� �� �±��� ���� ��Ҹ� ��� �˾Ƴ´°�? console.log(event.target)�ϸ� �±׸� �ҷ��´�. �̶� ��µ� ���� ����� �ȿ� �̺�Ʈ�� �߻��Ǿ��� �� �±׿� �������� �������� �� �����µ� ���� ���� ��Ұ� �ִ����� ���� �ȴ�.
	if(filling){
		current_bgColor = color;
	}
}														

function handleRangeChange(event) {
	const size = event.target.value;                      //�̺�Ʈ�� �߻��� ���� �±׸� �������� ���� target������ �����̰� �� ���� �Ӽ����� �� �±��� value�� ���������� �ϴ� �� 
	ctx.lineWidth = size;                                     //���� ���⸦ input�̶�� �̺�Ʈ�� �߻��� �±��� value�Ӽ��� ������ ���� ����� ����Ѵ�. 	
}														//�̶� �±׸� �����Դµ� �� �� �±��� value ��Ҹ� ��� �˾Ƴ´°�? console.log(event.target)�ϸ� �±׸� �ҷ��´�. �̶� ��µ� ���� ����� �ȿ� �̺�Ʈ�� �߻��Ǿ��� �� �±׿� �������� �������� �� �����µ� ���� ���� ��Ұ� �ִ����� ���� �ȴ�.

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
	const image = canvas.toDataURL("image/jpeg");   // ĵ������ �׸��� jpeg���·� �̹��� ���� �� �̹��� URL�� image�� ��´�. 
	const link = document.createElement("a");      // document�� a�±׸� �߰��Ѵ�. 
	link.href = image;      // a�±��� href �Ӽ��� �̹��� URL�̴�.
	link.download = "my masterpiece";    // a�±��� �Ӽ����� download�� �ָ� ��ũ�� �ٿ�޴� Ư¡�� �ִ�. �� �ڵ�� ��ũ�� �ٿ������ �̹��� ���� �̸��� �����ϴ� ��.
	link.click();              //?????
}

function handleEraser(){
	ctx.strokeStyle = current_bgColor;
}

function handleReset(){
	ctx.fillStyle = "white";
	ctx.fillRect(0,0,canvas.width,canvas.height);
}

if (canvas){                                                 //�׻� ����, ���� �������� ���ѹݺ��� �ִµ� �װ� ���ѹݺ� ���� �ڵ带 ����x �̰� ���� 
	canvas.addEventListener("mousemove", onMouseMove);
	canvas.addEventListener("mousedown", startPainting);
	canvas.addEventListener("mouseup", stopPainting);
	canvas.addEventListener("mouseleave", stopPainting);
	canvas.addEventListener("click", handleCanvasClick);
	canvas.addEventListener("contextmenu", handleRightClick);   //���콺 ��Ŭ�� ���� --> ���� �̹��� �����Ϸ��� ���콺 ��Ŭ����.
} 

Array.from(colors).forEach(potato => potato.addEventListener("click", handleColorClick));   // colors�� ���� html �±׵��� �迭�� �ִ� ��, �׸��� �װ͵� ������ ���ؼ� Ŭ������ ���� �̺�Ʈ�� �ο� 
																							// ���⼭ potato�� �迭�� �� ��Ҹ� ��ǥ�ϴ� ���ϻ��̶� �ƹ��ų� ���� okay.

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

