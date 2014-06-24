
var gameover =false;
function checkCombination(b1,b2,b3){
  
  if((b1.innerHTML!=""&& b2.innerHTML!="" && b3.innerHTML!="" ) && (b1.innerHTML == b2.innerHTML && b1.innerHTML==b3.innerHTML)){
  
  b1.style.backgroundColor=b2.style.backgroundColor=b3.style.backgroundColor='limeGreen';
  gameover=true;
  alert("Player "+b1.innerHTML+" Won!");
  }
  
}
function checkWin(){
  checkCombination(button1,button5,button9);
  checkCombination(button3,button5,button7);
  checkCombination(button1,button2,button3);
  checkCombination(button4,button5,button6);
  checkCombination(button7,button8,button9);
  checkCombination(button1,button4,button7);
  checkCombination(button2,button5,button8);
  checkCombination(button3,button6,button9);  
}


function pickSquare(b){

  if(b.innerHTML=="" && !gameover){
  b.innerHTML = selectTurn.value;
  
  
  }
  else  return;
  selectTurn.value=(selectTurn.value=="X")?"O":"X";
  checkWin();
}
function resetGame(){
  button1.innerHTML='';
  button2.innerHTML='';
  button3.innerHTML='';
  button4.innerHTML='';
  button5.innerHTML='';
  button6.innerHTML='';
  button7.innerHTML='';
  button8.innerHTML='';
  button9.innerHTML='';
  button1.style.backgroundColor=button2.style.backgroundColor=button3.style.backgroundColor='';
  button4.style.backgroundColor=button5.style.backgroundColor=button6.style.backgroundColor='';
  button7.style.backgroundColor=button8.style.backgroundColor=button9.style.backgroundColor='';
  gameover=false;
}


playbutton.addEventListener("click", resetGame);

//todo-implement ai 

//todo create an ai for tic-tac-toe

//check wheather two in a row or not
function ai(){
function twoinarow(player){

}

//Win:if you have two in a row, you can place a third to get three in a row.
function win(player){

}

//Block:If the opponent has two in a row, you must play the third to block the opponent.
function block(player){

}

//Fork:Create an opportunity where you have two threats to win (two non-blocked lines of 2).
function fork(player){

}

//Blocking an opponent's fork:If there is a configuration where the opponent can fork, you must block that fork.
function blockfork(player){

}

//Center:You play the center if open.
function center(player){

}

//Opposite corner:If the opponent is in the corner, you play the opposite corner.
function oppositecorner(player){

}
//Empty corner:You play in a corner square.
function emptycorner(player){


}

//Empty side:You play in a middle square on any of the 4 sides.
function emptyside(player){


}

}