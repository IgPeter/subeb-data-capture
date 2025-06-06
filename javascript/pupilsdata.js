const displayStudentData = async () => {
  try {
    const res = await fetch(
      "https://usbeb-backend.onrender.com/api/v1/studentData",
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      alert("Could not get student data check database/backend");
      return;
    }

    const students = await res.json();

    const studentList = students.students;

    const studentDataDiv = document.getElementById("student-data");
    const containerText = document.getElementById("container-text");
    containerText.innerHTML = students.message;

    studentList.forEach((studentData) => {
      const studentCon = document.createElement("div");

      const studentImg = document.createElement("img");
      studentImg.src = studentData.image;

      const studentName = document.createElement("h2");
      studentName.innerHTML = studentData.name;

      const classID = document.createElement("p");
      classID.innerHTML = studentData.class;

      const studentSex = document.createElement("p");
      studentSex.innerHTML = studentData.sex;

      const studentAge = document.createElement("p");
      studentAge.innerHTML = studentData.age;

      const studentAddress = document.createElement("p");
      studentAddress.innerHTML = studentData.address;

      const studentParent = document.createElement("p");
      studentParent.innerHTML = studentData.parent;

      studentCon.appendChild(studentImg);
      studentCon.appendChild(studentName);
      studentCon.appendChild(classID);
      studentCon.appendChild(studentSex);
      studentCon.appendChild(studentAge);
      studentCon.appendChild(studentAddress);
      studentCon.appendChild(studentParent);

      studentDataDiv.appendChild(studentCon);
    });
  } catch (error) {
    throw new Error(`Something went wrong ${error}`);
  }
};

displayStudentData();
