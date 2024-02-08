# Got a pwd for you!

This application generates a random password, displays it on the screen, and allows the user to copy it to the clipboard. It also includes a CSS animation of moving mouse cursors.

## Features

### Password Generation

The `generatePassword` function is responsible for creating the password. It defines a set of characters to use in the password, including uppercase and lowercase letters, numbers, and symbols. It then uses a helper function, `getRandomCharacter`, to select a random character from a given character set. The password is initially filled with at least one character from each category. The rest of the password is filled with random characters from any category. The password is then shuffled to ensure randomness.

### Password Styling

The `updatePasswordStyle` function styles the password based on the types of characters it contains. It uses regular expressions to identify the types of characters in the password and wraps each character in a span element with a class corresponding to its type. It also counts the number of each type of character and displays this count.

### Copy to Clipboard

The `copyToClipboard` function copies the generated password to the clipboard when the user clicks on it. It uses the `document.execCommand("copy")` method to copy the text. It also displays a message to the user indicating that the password has been copied, and this message is cleared after one second.

### CSS Animation

The `Mouse` class and the `preload`, `setup`, and `draw` functions are part of a p5.js sketch that creates an animation of moving mouse cursors. The `Mouse` class defines the properties and behaviors of each mouse cursor in the animation. The `preload` function loads an image of a mouse cursor, the `setup` function creates the canvas and initializes the mouse cursors, and the `draw` function updates and draws each mouse cursor on each frame.

The `windowResized` function is an event handler that resizes the canvas whenever the window is resized, ensuring that the animation always fills the entire window.

## License

MIT License
