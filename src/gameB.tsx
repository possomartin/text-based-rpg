import React, { useState } from "react";

function GameB() {
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState(
    "You wake up in a dark room. There's a door to the north."
  );
  const [gameOver, setGameOver] = useState(false);

  const handleAction = (action) => {
    if (gameOver) return;

    if (level === 1) {
      if (action === "open door") {
        setMessage(
          "You open the door and enter a long hallway. There's a staircase going up and a door to the east."
        );
        setLevel(2);
      } else if (action === "fall down well") {
        triggerGameOver("You fall into a deep well and perish.");
      } else {
        setMessage("Invalid action. Try: 'open door' or 'fall down well'.");
      }
    } else if (level === 2) {
      if (action === "go upstairs") {
        setMessage(
          "You climb the stairs and find yourself in a library. There's a book on the table."
        );
        setLevel(3);
      } else if (action === "open door") {
        setMessage("You open the door and find a small, empty room.");
      } else if (action === "step on landmine") {
        triggerGameOver("You step on a landmine and explode. Game over.");
      } else {
        setMessage(
          "Invalid action. Try: 'go upstairs', 'open door', or 'step on landmine'."
        );
      }
    } else if (level === 3) {
      if (action === "read book") {
        setMessage(
          "You read the book and discover the secrets of the universe. You win!"
        );
      } else if (action === "walk into fire") {
        triggerGameOver("You walk into a fire and burn to ashes.");
      } else {
        setMessage("Invalid action. Try: 'read book' or 'walk into fire'.");
      }
    }
  };

  const triggerGameOver = (finalMessage) => {
    setMessage(finalMessage);
    setGameOver(true);
    document.body.classList.add("game-over");
  };

  return (
    <div className="game-container">
      <div className="message-box">{message}</div>
      {!gameOver && (
        <>
          <input type="text" id="actionInput" className="input-box" />
          <button
            onClick={() =>
              handleAction(
                document.getElementById("actionInput").value.toLowerCase()
              )
            }
            className="action-button"
          >
            Do it
          </button>
        </>
      )}
    </div>
  );
}

export default GameB;
