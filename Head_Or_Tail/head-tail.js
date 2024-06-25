let score=JSON.parse(localStorage.getItem('score'))||{
    win:0,
    loss:0
};
updateScoreElement();
function playGame(playerClick){
    const computerMove= pickComputerMove();
    let result='';
    if(playerClick==='head'){
        if(computerMove==='head'){
            result='You win';
        }
        else if(computerMove==='tail'){
            result='You lose';
        }
    }
    else if(playerClick==='tail'){
        if(computerMove==='tail'){
            result='You win';
        }
        else if(computerMove==='head'){
            result='You lose';
        }
    }
    if(result==='You win'){
        score.win+=1;
    }
    else if(result==='You lose'){
        score.loss+=1;
    }
    localStorage.setItem('score',JSON.stringify(score));
    updateScoreElement();
    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You
    <img src="${playerClick}.png" class="pic1">
    <img src="${computerMove}.png" class="pic1">
    Computer`;
}
function updateScoreElement(){
    document.querySelector('.js-score').innerHTML=`Win:${score.win}, Loss:${score.loss}`;
}

function pickComputerMove(){
    const randomNumber=Math.random();
    let computerMove='';
    if(randomNumber>=0&&randomNumber<1/2){
        computerMove= 'head';
    }
    else if(randomNumber>=1/2&&randomNumber<=1){
        computerMove='tail';
    }
    return computerMove;
}