const displayStaffData = async () => {
  try {
    const res = await fetch(
      "https://usbeb-backend.onrender.com/api/v1/captureDevice",
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      alert("Could not get staff data check database/backend");
      return;
    }

    const staffs = await res.json();

    const staffList = staffs.staffs;

    const containerText = document.getElementById("container-text");
    const staffDataDiv = document.getElementById("staff-data");
    containerText.innerHTML = staffs.message;

    staffList.forEach((staffData) => {
      const staffCon = document.createElement("div");

      const staffImg = document.createElement("img");
      staffImg.src = staffData.image;

      const staffName = document.createElement("h2");
      staffName.innerHTML = staffData.name;

      const nameOfSchool = document.createElement("p");
      nameOfSchool.textContent = staffData.nameOfSchool;

      const staffGender = document.createElement("p");
      staffGender.innerHTML = staffData.gender;

      const staffDob = document.createElement("p");
      staffDob.innerHTML = staffData.dob;

      staffCon.appendChild(staffImg);
      staffCon.appendChild(staffName);
      staffCon.appendChild(nameOfSchool);
      staffCon.appendChild(staffGender);
      staffCon.appendChild(staffDob);

      staffDataDiv.appendChild(staffCon);
    });
  } catch (error) {
    throw new Error(`Something went wrong ${error}`);
  }
};

window.onload = displayStaffData();
