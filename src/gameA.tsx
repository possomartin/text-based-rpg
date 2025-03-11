import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function GameA() {
  const [level, setLevel] = useState(1);
  const [message, setMessage] = useState(
    "You wake up in a dark room.  What do you do?\n\nOptions: open door"
  );
  const [gameOver, setGameOver] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [actionInput, setActionInput] = useState("");

  const handleAction = () => {
    const action = actionInput.toLowerCase();

    if (gameOver) return; // Prevent actions after game over

    if (level === 1) {
      if (action === "open door") {
        setMessage(
          "You open the door and enter a long hallway. There are stairs going up and a door to the east. What do you do?\n\nOptions: go upstairs, open door, fall down well"
        );
        setLevel(2);
      } else if (action === "fall down well") {
        setMessage("You fall down a well and perish. GAME OVER!");
        setGameOver(true);
        setIsFlashing(true);
      } else {
        setMessage("Invalid action. Try again.\n\nOptions: open door");
      }
    } else if (level === 2) {
      if (action === "go upstairs") {
        setMessage(
          "You climb the stairs and find yourself in a library. There's a book on the table. What do you do?\n\nOptions: read book, leave library"
        );
        setLevel(3);
      } else if (action === "open door") {
        setMessage(
          "You open the door and find a small, empty room.  You go back to the hallway.\n\nOptions: go upstairs, open door, fall down well"
        );
      } else if (action === "fall down well") {
        setMessage("You fall down a well and perish. GAME OVER!");
        setGameOver(true);
        setIsFlashing(true);
      } else {
        setMessage(
          "Invalid action. Try again.\n\nOptions: go upstairs, open door, fall down well"
        );
      }
    } else if (level === 3) {
      if (action === "read book") {
        setMessage(
          "You read the book and discover the secrets of the universe. You win!"
        );
        setGameOver(true);
      } else if (action === "leave library") {
        setMessage(
          "You leave the library and find yourself back in the hallway.\n\nOptions: go upstairs, open door, fall down well"
        );
        setLevel(2);
      } else {
        setMessage(
          "Invalid action. Try again.\n\nOptions: read book, leave library"
        );
      }
    }

    setActionInput(""); // Clear the input after handling
  };

  useEffect(() => {
    let interval;
    if (isFlashing) {
      interval = setInterval(() => {
        document.body.style.backgroundColor =
          document.body.style.backgroundColor === "white" ? "red" : "white";
      }, 250); // Flash every 250ms
    } else {
      document.body.style.backgroundColor = "#f0f0f0"; // Reset background
    }

    return () => clearInterval(interval); // Cleanup on unmount or state change
  }, [isFlashing]);

  return (
    <div
      className="min-h-screen bg-gray-100 flex items-center justify-center"
      style={{
        backgroundColor: isFlashing
          ? document.body.style.backgroundColor || "#f0f0f0"
          : "#f0f0f0",
      }}
    >
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-lg mb-4 whitespace-pre-line" // Use whitespace-pre-line
        >
          {message}
        </motion.div>

        {gameOver && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-red-600 mb-4"
          >
            GAME OVER
          </motion.div>
        )}

        {!gameOver && (
          <div className="flex items-center justify-center mb-4">
            <input
              type="text"
              id="actionInput"
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
              className="border p-2 rounded mr-2"
              placeholder="Enter your action..."
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAction}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Do it
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}

export default GameA;
