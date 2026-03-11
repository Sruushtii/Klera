import React, { useEffect, useRef, useState } from "react";

const PongGame = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState("");

  const paddleSpeed = 7; // Paddle movement speed
  let ballSpeed = 5; // Initial ball speed
  const paddleHeight = 100;
  const paddleWidth = 10;
  const canvasWidth = 800;
  const canvasHeight = 400;

  let ball = {
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    dx: ballSpeed,
    dy: ballSpeed,
    radius: 10,
  };

  let leftPaddle = {
    x: 20,
    y: canvasHeight / 2 - paddleHeight / 2,
    dy: 0,
  };

  let rightPaddle = {
    x: canvasWidth - 30,
    y: canvasHeight / 2 - paddleHeight / 2,
    dy: 0,
  };

  let scores = { left: 0, right: 0 };
  const maxScore = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const drawRect = (x, y, width, height, color) => {
      context.fillStyle = color;
      context.fillRect(x, y, width, height);
    };

    const drawCircle = (x, y, radius, color) => {
      context.fillStyle = color;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.closePath();
      context.fill();
    };

    const drawText = (text, x, y, color) => {
      context.fillStyle = color;
      context.font = "30px Arial";
      context.fillText(text, x, y);
    };

    const render = () => {
      drawRect(0, 0, canvasWidth, canvasHeight, "black");

      // Draw paddles
      drawRect(leftPaddle.x, leftPaddle.y, paddleWidth, paddleHeight, "white");
      drawRect(rightPaddle.x, rightPaddle.y, paddleWidth, paddleHeight, "white");

      // Draw ball
      drawCircle(ball.x, ball.y, ball.radius, "red");

      // Draw scores
      drawText(scores.left, canvasWidth / 4, 50, "white");
      drawText(scores.right, (3 * canvasWidth) / 4, 50, "white");
    };

    const update = () => {
      // Move paddles
      leftPaddle.y += leftPaddle.dy;
      rightPaddle.y += rightPaddle.dy;

      // Prevent paddles from leaving the canvas
      if (leftPaddle.y < 0) leftPaddle.y = 0;
      if (leftPaddle.y > canvasHeight - paddleHeight)
        leftPaddle.y = canvasHeight - paddleHeight;
      if (rightPaddle.y < 0) rightPaddle.y = 0;
      if (rightPaddle.y > canvasHeight - paddleHeight)
        rightPaddle.y = canvasHeight - paddleHeight;

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Ball collision with top/bottom walls
      if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvasHeight) {
        ball.dy = -ball.dy;
      }

      // Ball collision with paddles
      if (
        ball.x - ball.radius < leftPaddle.x + paddleWidth &&
        ball.y > leftPaddle.y &&
        ball.y < leftPaddle.y + paddleHeight
      ) {
        ball.dx = -ball.dx;
        ballSpeed += 0.5; // Increase ball speed on paddle hit
      }

      if (
        ball.x + ball.radius > rightPaddle.x &&
        ball.y > rightPaddle.y &&
        ball.y < rightPaddle.y + paddleHeight
      ) {
        ball.dx = -ball.dx;
        ballSpeed += 0.01; // Increase ball speed on paddle hit
      }

      // Check for scoring
      if (ball.x - ball.radius < 0) {
        scores.right += 1;
        resetBall();
      }
      if (ball.x + ball.radius > canvasWidth) {
        scores.left += 1;
        resetBall();
      }

      // Check for game over
      if (scores.left >= maxScore || scores.right >= maxScore) {
        setGameOver(true);
        setWinner(scores.left >= maxScore ? "Player 1" : "Player 2");
      }
    };

    const resetBall = () => {
      ball.x = canvasWidth / 2;
      ball.y = canvasHeight / 2;
      ball.dx = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
      ball.dy = ballSpeed * (Math.random() > 0.5 ? 1 : -1);
    };

    const gameLoop = () => {
      if (!gameOver) {
        update();
        render();
        requestAnimationFrame(gameLoop);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "w") leftPaddle.dy = -paddleSpeed;
      if (e.key === "s") leftPaddle.dy = paddleSpeed;
      if (e.key === "ArrowUp") rightPaddle.dy = -paddleSpeed;
      if (e.key === "ArrowDown") rightPaddle.dy = paddleSpeed;
    };

    const handleKeyUp = (e) => {
      if (e.key === "w" || e.key === "s") leftPaddle.dy = 0;
      if (e.key === "ArrowUp" || e.key === "ArrowDown") rightPaddle.dy = 0;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    gameLoop();

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameOver]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      {gameOver ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{winner} Wins!</h1>
          <button
            onClick={() => window.location.reload()}
            className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-600"
          >
            Play Again
          </button>
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="border-2 border-white"
        ></canvas>
      )}
    </div>
  );
};

export default PongGame;
