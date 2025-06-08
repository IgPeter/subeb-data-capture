const handleFacilityFormData = () => {
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = event.target;

    const numClassrooms = input.numOfClassrooms.value;
    const classroomOkay = input.classroomOkay.value;
    const venCon = input.venCon.value;
    const numTables = input.numTables.value;
    const numChairs = input.numChairs.value;
    const furnitureOkay = input.furnitureOkay.value;
    const toiletOkay = input.toiletOkay.value;
    const comment = input.comment.value;
    const functionalLib = input.functionalLib.value;
    const wasteDisposal = input.wasteDisposal.value;
    const boreHoles = input.boreHoles.value;
    const backupPower = input.backupPower.value;
    const fencing = input.fencing.value;
    const teachingAid = input.teachingAid.value;
    const learningMat = input.learningMat.value;

    const formData = new FormData();

    formData.append("numOfClassrooms", numClassrooms);
    formData.append("classroomOkay", classroomOkay);
    formData.append("venCon", venCon);
    formData.append("numTables", numTables);
    formData.append("numChairs", numChairs);
    formData.append("furnitureOkay", furnitureOkay);
    formData.append("toiletOkay", toiletOkay);
    formData.append("comment", comment);
    formData.append("functionalLib", functionalLib);
    formData.append("wasteDisposal", wasteDisposal);
    formData.append("boreHoles", boreHoles);
    formData.append("backupPower", backupPower);
    formData.append("fencing", fencing);
    formData.append("teachingAid", teachingAid);
    formData.append("learningMat", learningMat);

    //making request to store the data in the database
    fetch("https://usbeb-backend.onrender.com/api/v1/facilityCapture", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        alert(`${result.message}`);
      })
      .catch((error) => {
        alert("Facility Data was not uploaded, Please try again");
        throw new Error("Something happened", error);
      });
  });
};

//creating facility
handleFacilityFormData();
