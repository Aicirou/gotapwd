/**
 * Generates a random password with a specified length and character set.
 */
function generatePassword() {
  const characterSet = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    number: "0123456789",
    symbol: "!@#$%^&*([{_;:,.?/<'>}])",
  };

  let password = "";
  const passwordLength = 21;
  // Helper function to get a random character from a given character set.
  function getRandomCharacter(charSet) {
    return charSet.charAt(Math.floor(Math.random() * charSet.length));
  }
  // Ensure at least one character from each category is included, fill the rest with random characters.
  for (let i = 0; i < passwordLength; i++) {
    if (i % 4 == 0 && i < passwordLength - 4) {
      for (const type in characterSet) {
        password += getRandomCharacter(characterSet[type]);
      }
    }
  }
  // Fill the rest of the password with random characters.
  for (let i = password.length; i < passwordLength; i++) {
    let randomType =
      Object.keys(characterSet)[
        Math.floor(Math.random() * Object.keys(characterSet).length)
      ];
    password += getRandomCharacter(characterSet[randomType]);
  }

  // Function to shuffle a string randomly.
  function shuffleString(string) {
    return string
      .split("")
      .sort(() => Math.random() - 0.5)
      .join("");
  }
  // Shuffle the password to make it more random.
  password = shuffleString(password);

  document.getElementById("password").textContent = password;
  updatePasswordStyle(password);
  document.getElementById("copyMessage").textContent = "";
}

function updatePasswordStyle(password) {
  var passwordElement = document.getElementById("password");
  const characterTypes = {
    uppercase: /[A-Z]/,
    lowercase: /[a-z]/,
    number: /\d/,
    symbol: /[^A-Za-z0-9]/,
  };
  let countTypes = {};

  // Style the password based on character types
  let styledPassword = "";
  for (const char of password) {
    let charClass = "";
    for (const type in characterTypes) {
      if (characterTypes[type].test(char)) {
        charClass = type;
        countTypes[type] = countTypes[type] + 1 || 1;
        break;
      }
    }
    styledPassword += `<span class="${charClass}">${char}</span>`;
  }

  passwordElement.innerHTML = styledPassword;
  document.getElementById("countTypes").innerHTML = Object.keys(countTypes)
    .map((type) => `<span class="${type}">${type}: ${countTypes[type]}</span>`)
    .join(" ");
}

function copyToClipboard() {
  // var copyText = document.getElementById("password");
  // copyText.select();
  // copyText.setSelectionRange(0, 99999);
  // document.execCommand("copy");
  var range = document.createRange();
  range.selectNode(document.getElementById("password"));
  window.getSelection().removeAllRanges(); // Clear previous selections
  window.getSelection().addRange(range); // Select the text
  document.execCommand("copy"); // Copy the selected text
  document.getElementById("copyMessage").textContent =
    "Password copied to clipboard!";
  setTimeout(() => {
    // document.getElementById("copyMessage").textContent = "";
    // window.getSelection().removeAllRanges(); // Clear previous selections
  }, 3000);
}

// Generate password on page load
generatePassword();

// Button event listener
document.getElementById("refreshButton").addEventListener("click", function () {
  generatePassword();
  window.getSelection().removeAllRanges(); // Clear previous selections
  document.getElementById("title").innerHTML =
    "<span class='grey-text'>Got</span> a" +
    "<span class='title-color'> random pwd </span>" +
    "<span class='grey-text'> for me</span>" +
    "<span title='fuk uuu!' id='question-mark'>...?</span>";
  //rotate refresh button
  document.getElementById("refreshButton").classList.add("rotate");
  //question mark color change to green
  document.getElementById("question-mark").classList.add("question-mark-color");

  // Add a class to the grey-text span to change the color to grey
  Array.from(document.getElementsByClassName("title-color")).forEach(
    (element) => {
      element.classList.add("grey-color");
    }
  );
  setTimeout(() => {
    document.getElementById("refreshButton").classList.remove("rotate");
    document
      .getElementById("question-mark")
      .classList.remove("question-mark-color");

    Array.from(document.getElementsByClassName("title-color")).forEach(
      (element) => {
        element.classList.remove("grey-color");
      }
    );
  }, 600);
});

// Copy password on click
document.getElementById("password").addEventListener("click", function () {
  copyToClipboard();
  document.getElementById("countTypes").textContent = "";

  //chabge h1 title to "Got a pwd for you!", where God n pwd are in green color and ! is in grey color
  document.getElementById("title").innerHTML =
    "<span class='title-color'>Got</span> a" +
    "<span class='title-color'> pwd </span>" +
    "<span class='grey-text'> 4u</span>" +
    "<span title='fuk uuu!' id='question-mark'>!</span>";
});

//css animation
let img;
const mouses = [];
let noise;
function preload() {
  img = loadImage(
    "https://s3-us-west-2.amazonaws.com/s.cdpn.io/127738/mouse.png"
  );
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noise = new SimplexNoise();
  noStroke();
  for (let i = 0; i < 500; i++) {
    mouses.push(new Mouse());
  }
}

class Mouse {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.randomX = Math.random() * 300;
    this.randomY = Math.random() * 300;
    this.speed = Math.random() * 0.00015 + 0.00001;
    this.width = Math.random() * 15 + 5;
    this.height = this.width * (img.height / img.width);

    // Load the pixels of the image and modify them to make the image green
    img.loadPixels();
    for (let i = 0; i < img.pixels.length; i += 4) {
      img.pixels[i + 1] = 255; // set green channel to maximum, making it green
    }
    img.updatePixels();
  }

  update() {
    this.x =
      ((noise.noise3D(this.randomX, 0, millis() * this.speed) + 1) / 2) * width;
    this.y =
      ((noise.noise3D(this.randomY, 0, millis() * this.speed) + 1) / 2) *
      height;
  }

  draw() {
    image(img, this.x, this.y, this.width, this.height);
  }
}

function draw() {
  clear();
  mouses.forEach((mouse) => {
    mouse.update();
    mouse.draw();
  });
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
