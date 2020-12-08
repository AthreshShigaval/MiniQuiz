const username = document.getElementById('username');
const submitScoreBtn = document.getElementById('submitScoreBtn');

const latestScore = localStorage.getItem('latestScore');
const finalScore = document.getElementById('finalScore');

const highScore = JSON.parse(localStorage.getItem('highScore')) || [];

const Top_score = 5;

finalScore.innerText= `Your final score is: ${latestScore}`;

username.addEventListener('keyup', () => {
    /* console.log(username.value); */
    submitScoreBtn.disabled = !username.value;
});

submitHighScore = (e) => {
    console.log("clicked the submit button");
    e.preventDefault();
    
    const score = {
        score: latestScore, 
        name: username.value
    };
    highScore.push(score);

    highScore.sort( (a,b) => {
        return b.score - a.score;
    });

    highScore.splice(Top_score);
    localStorage.setItem('highScore',JSON.stringify(highScore));
    window.location.assign("/");

  /*  console.log(highScore); */
};

