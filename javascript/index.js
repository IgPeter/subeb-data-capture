//Global variables for the finger print and open cage api key;
let fingerprintData = null;
const OPENCAGE_API_KEY = "62ebbe3af66b45c9bebbb33f77a316c9";

//get location function
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handleLocation, showError);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

//handle location function to be used by getLocation
function handleLocation(position) {
  const { latitude, longitude } = position.coords;

  // Call OpenCage Reverse Geocoding API
  fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${OPENCAGE_API_KEY}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data && data.results && data.results.length > 0) {
        const components = data.results[0].components;
        const area =
          components.suburb ||
          components.neighbourhood ||
          components.town ||
          components.estate ||
          components.residential ||
          "";
        const lga = components.county || components.municipality || "";
        const city = components.city || components.county || "";
        const road = components.road || "";
        const country = components.country || "";

        const output = `
          Area: ${area}<br>
          LGA (County): ${lga} City: ${city}<br>
          Street: ${road}<br>
          Country: ${country}
        `;

        const mainDiv = document.getElementById("main");
        const pText = document.createElement("p");
        pText.className = "locationText";
        pText.innerHTML = output;
        mainDiv.appendChild(pText);

        // Send to server
        window.userLocationData = {
          latitude,
          longitude,
          area,
          lga,
          city,
          road,
          country,
        };
      }
    })
    .catch((err) => console.error("Geocoding error:", err));
}

//show error used by getLocation
function showError(error) {
  console.error("Geolocation error:", error.message);
}

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
        imgDiv.id = "uploadImgDiv";
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
//handle file select ends here.

const handleFormUpload = async () => {
  document
    .getElementById("myForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      if (!fingerprintData) {
        alert("Please scan fingerprint before submit");
        return;
      }

      const locationInfo = { ...window.userLocationData };
      const formInput = event.target;
      const file = formInput.passport.files[0];

      const fullName = formInput.fullName.value;
      const staffId = formInput.staffId.value;
      const dateOfBirth = formInput.dateOfBirth.value;
      const gender = formInput.gender.value;
      const nameOfSchool = formInput.nameOfSchool.value;
      const contact = formInput.contact.value;
      const address = formInput.address.value;
      const dateOfFA = formInput.dateOfFA.value;
      const dateOfLP = formInput.dateOfLP.value;
      const nin = formInput.nin.value;
      const lga = formInput.lga.value;

      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("staffId", staffId);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("gender", gender);
      formData.append("nameOfSchool", nameOfSchool);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("dateOfFA", dateOfFA);
      formData.append("dataOfLP", dateOfLP);
      formData.append("nin", nin);
      formData.append("lga", lga);
      formData.append("location", JSON.stringify(locationInfo));
      formData.append("passport", file);
      formData.append("fingerprintImage", fingerprintData.BMPBase64); // base64 string
      formData.append("fingerprintTemplate", fingerprintData.TemplateBase64); // base64 string

      if (!file || !file.type.startsWith("image/")) {
        alert("Upload passport photograph");
        return;
      }

      //handling file upload here
      const res = await fetch(
        "https://usbeb-backend.onrender.com/api/v1/staffData",
        {
          method: "POST",
          body: formData,
          /*headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },*/
        }
      );

      if (!res.ok) {
        console.log("form data upload failed");
        alert("Form Data was not uploaded successfully");
        return;
      }

      clearForm();
      alert("User information is created successfully");
    });
};

function clearForm() {
  const uploadArea = document.getElementById("form-sec2");
  const uploadImgDiv = document.getElementById("uploadImgDiv");
  uploadArea.removeChild(uploadImgDiv);
  document.getElementById("myForm").reset();
}

const xmlSecuGenHandler = () => {
  document.getElementById("scannowID").addEventListener("click", () => {
    alert("Please ensure Secu Gen scanner is connected");

    document.getElementById("display-fingerprint-image").style.display =
      "block";

    CallSGIFPGetData(success, fail);
  });
};

function CallSGIFPGetData(success, fail) {
  // 8.16.2017 - At this time, only SSL client will be supported.
  var uri = "https://localhost:8443/SGIFPCapture";

  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      const fpobject = JSON.parse(xmlhttp.responseText);
      success(fpobject);
    } else if (xmlhttp.status == 404) {
      fail(xmlhttp.status);
    }
  };
  var params = "Timeout=" + "10000";
  params += "&Quality=" + "50";
  params += "";
  params += "&templateFormat=" + "ISO";
  params += "&imageWSQRate=" + "0.75";

  xmlhttp.open("POST", uri, true);
  xmlhttp.send(params);

  xmlhttp.onerror = function () {
    fail(xmlhttp.statusText);
  };
}

const success = (result) => {
  if (result.ErrorCode == 0) {
    if (result != null && result.BMPBase64.length > 0) {
      fingerprintData = result;
      document.getElementById("fingerprint-imageID").src =
        "./images/scanaccepted.jpg";
    } else {
      alert("Please capture fingerprint");
    }
  } else {
    alert(
      "Fingerprint Capture Error Code:  " +
        result.ErrorCode +
        ".\nDescription:  " +
        ErrorCodeToString(result.ErrorCode) +
        "."
    );
  }
};

const fail = (status) => {
  alert("Check if SGIBIOSRV is running; Status = " + status + ":");
};

handleFormUpload();
xmlSecuGenHandler();
handleFileSelect();

window.onload = getLocation();
