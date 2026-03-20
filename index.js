document.addEventListener("DOMContentLoaded", () => {
  const qrInput = document.getElementById("qr-input");
  const generateBtn = document.querySelector(".btn.primary");
  const clearBtn = document.querySelector(".btn.secondary");
  const qrImage = document.getElementById("qr-image");
  const startButton = document.querySelector(".start-button");

  // QR GENERATOR PAGE
  if (qrInput && generateBtn && clearBtn && qrImage) {

    generateBtn.addEventListener("click", async () => {
      const inputValue = qrInput.value.trim();

      if (!inputValue) {
        alert("Please enter some text or a URL to generate a QR code.");
        return;
      }

      //  QR Generate
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(inputValue)}`;
      qrImage.innerHTML = `<img src="${qrUrl}" alt="QR Code" />`;

      // Save to localStorage
      let savedData = JSON.parse(localStorage.getItem("qrHistory")) || [];
      savedData.push(inputValue);
      localStorage.setItem("qrHistory", JSON.stringify(savedData));

      // Fetch image and download properly
      try {
        const response = await fetch(qrUrl);
        const blob = await response.blob();

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "QR_" + Date.now() + ".png";
        link.click();
      } catch (error) {
        console.error("Download failed:", error);
      }
    });

    clearBtn.addEventListener("click", () => {
      qrInput.value = "";
      qrImage.innerHTML = "";
    });
  }

  // LANDING PAGE
  if (startButton) {
    startButton.addEventListener("click", () => {
      startButton.textContent = "Loading...";
      startButton.style.opacity = "0.7";

      setTimeout(() => {
        window.location.href = "home.html";
      }, 300);
    });
  }
});