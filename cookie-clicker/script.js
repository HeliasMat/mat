let score = 0;

function clickCookie() {
    score++;
    document.getElementById("score").textContent = "Score: " + score;

    // Add the 'clicked' class to the cookie image
    const cookieImage = document.getElementById("cookie");
    cookieImage.classList.add("clicked");

    // Remove the 'clicked' class after a short delay to reset the animation
    setTimeout(() => {
        cookieImage.classList.remove("clicked");
    }, 200);
}


function resetGame() {
    score = 0;
    document.getElementById("score").textContent = "Score: " + score;
}
