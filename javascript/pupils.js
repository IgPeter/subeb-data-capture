//let fingerprintData = null;
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
      const nameOfSchool = formInput.nameOfSchool.value;
      const classNumber = formInput.classID.value;
      const dateOfBirth = formInput.dateOfBirth.value;
      const age = formInput.age.value;
      const nin = formInput.nin.value;
      const sex = formInput.sex.value;
      const address = formInput.address.value;
      const parents = formInput.parents.value;
      const lga = formInput.lga.value;
      const disability = formInput.disability.value;
      const resInput = formInput.disabilityInfo.value;

      const formData = new FormData();

      formData.append("fullName", fullName);
      formData.append("nameOfSchool", nameOfSchool);
      formData.append("classID", classNumber);
      formData.append("dateOfBirth", dateOfBirth);
      formData.append("age", age);
      formData.append("nin", nin);
      formData.append("sex", sex);
      formData.append("address", address);
      formData.append("parents", parents);
      formData.append("lga", lga);
      formData.append("disability", disability);
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

displayOtherDisabilityField = () => {
  document.getElementById("disability").addEventListener("change", (event) => {
    const disabilityCon = document.getElementById("disabilityCon");
    const disabilityInfo =document.getElementById("disabilityInfo");

    if(event.target.value == "yes") {
      disabilityCon.style.display = "block";  
    }else {
      disabilityCon.style.display = "none";
      disabilityInfo.value = '';
    }
    
  });
};

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

displayOtherDisabilityField();
handleFormUpload();
//xmlSecuGenHandler();
handleFileSelect();
