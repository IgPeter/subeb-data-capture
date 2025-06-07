let fingerprintData = null;

const handleFileSelect = async () => {
  document.getElementById("uploadBtn").addEventListener("click", () => {
    document.querySelector(".hidden").click();

    document
      .getElementById("uploadInput")
      .addEventListener("change", async (fileInput) => {
        const file = fileInput.target.files[0];

        if (!file) {
          alert("You ought to upload a file here ");
          return;
        }

        const uploadArea = document.getElementById("form-sec2");
        const imgDiv = document.createElement("div");
        const uploadedImg = document.createElement("img");
        uploadedImg.src = URL.createObjectURL(file);

        alert("file added");
        imgDiv.appendChild(uploadedImg);
        uploadArea.appendChild(imgDiv);
        imgDiv.style.maxWidth = "15%";
        imgDiv.style.maxHeight = "15%";
        uploadedImg.style.maxWidth = "100%";
        uploadedImg.style.maxHight = "100%";
        uploadedImg.onload = URL.revokeObjectURL(uploadedImg.src);
      });
  });

  document.getElementById("uploadInput").addEventListener("cancel", () => {
    alert("You ought to upload an image here ");
  });
};

const handleFormUpload = async () => {
  document
    .getElementById("myForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      /*if (!fingerprintData) {
        alert("Please scan fingerprint before submit");
        return;
      }*/

      const formInput = event.target;
      const file = formInput.passport.files[0];

      const fullName = formInput.fullName.value;
      const classNumber = formInput.classID.value;
      const dateOfBirth = formInput.dateOfBirth.value;
      const age = formInput.age.value;
      const nin = formInput.nin.value;
      const sex = formInput.sex.value;
      const address = formInput.address.value;
      const parents = formInput.parents.value;
      const lga = formInput.lga.value;
      const resInput = formInput.disabilityInfo.value;

      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("classID", classNumber);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("age", age);
      formData.append("nin", nin);
      formData.append("sex", sex);
      formData.append("address", address);
      formData.append("parents", parents);
      formData.append("lga", lga);
      formData.append("disabilityInfo", resInput);
      formData.append("passport", file);
      //formData.append("fingerprintImage", fingerprintData.BitmapData); // base64 string
      //formData.append("fingerprintTemplate", fingerprintData.TemplateBase64); // base64 string

      if (!file || !file.type.startsWith("image/")) {
        alert("Upload passport photograph");
        return;
      }

      //handling file upload here
      const res = await fetch(
        "https://usbeb-backend.onrender.com/api/v1/studentData",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!res.ok) {
        console.log("form data upload failed");
        alert("Form Data was not uploaded successfully");
        return;
      }

      alert("User information is created successfully");
    });
};

const handleFingerprintScanning = async () => {
  document.getElementById("scannowID").addEventListener("click", async () => {
    document.getElementById("display-fingerprint-image").style.display =
      "block";

    alert("Please ensure Secu Gen scanner is connected");

    try {
      const response = await fetch("https://localhost:8443/SGIFPCapture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Quality: 60,
          Timeout: 10000,
          ImageWSQRate: 0.75,
          TemplateFormat: "ISO",
        }),
      });

      const result = await response.json();

      if (result.ErrorCode == 0) {
        fingerprintData = result;
        document.getElementById("fingerprint-imageID").src =
          "./images/scanaccepted.jpg";
      } else {
        alert(`${result.errorDescription}`);
      }
    } catch (error) {
      alert("I failed to scan to i am in the catch block");
      throw new Error("scanning error, try again ", error);
    }
  });
};

const clearForm = () => {
  document.getElementById("clear-form").addEventListener("click", () => {
    document.getElementById("myForm").reset();
  });
};

displayOtherDisabilityField = () => {
  document.getElementById("disability").addEventListener("change", (event) => {
    if (event.target.value == "yes") {
      const disabilitySelect = document.getElementById("disability-select");
      const responseInput = document.createElement("input");
      responseInput.name = "disabilityInfo";
      responseInput.type = "text";
      responseInput.placeholder = "Give information of the disability";
      responseInput.value = "";
      responseInput.style.marginTop = "1rem";

      disabilitySelect.appendChild(responseInput);

      responseInput.addEventListener("change", (event) => {
        responseInput.value = event.target.value;
      });

      responseInput.addEventListener("focusout", () => {
        responseInput.style.display = "none";
      });

      console.log(responseInput.value);
    }
  });
};

displayOtherDisabilityField();
handleFormUpload();
handleFingerprintScanning();
handleFileSelect();
clearForm();
