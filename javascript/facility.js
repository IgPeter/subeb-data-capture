const handleFacilityFormData = () => {
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = event.target;

    const blocksOfClassrooms = input.blocksOfClassroom.value;
    const pupilsNumOfClassroom = input.numPupilsClassroom.value;
    const numPupilsComment = input.numPupilsComment.value;
    const numStudentsClassroom = input.numStudentsClassroom.value;
    const numStudentsComment = input.numStudentsComment.value;
    const numEccdeClassroom = input.numEccdeClassroom.value;
    const numEccdeComment = input.numEccdeComment.value;

    //collecting ventilated data
    const venPupils = input.pupils - ventilated.value;
    const venPupilsComment = input.venPupilsComment.value;
    const venStudents = input.students - ventilated.value;
    const venStudentsComment = input.venStudentsComment.value;
    const venEccde = input.eccde - ventilated.value;
    const venEccdeComment = input.venEccdeComment.value;

    //collecting furniture data
    const numFurniturePupils = input.pupils - furniture.value;
    const numFurniturePupilsComment = input.furniture - pupils - comment.value;
    const numFurnitureStudents = input.students - furniture.value;
    const numFurnitureStudentsComment =
      input.furniture - students - comment.value;
    const numFurnitureEccde = input.eccde - furniture.value;
    const numFurnitureEccdeComment = input.eccde - furniture - comment.value;
    const teacherFurniture = input.teachers - furniture.value;
    const teacherFurnitureComment = input.teachers - furniture - comment.value;

    //collecting toilet okay data
    const toiletPupils = input.pupils - toilet - okay.value;
    const toiletPupilsComment = input.pupils - toilet - comment.value;
    const toiletStudents = input.students - toilet - okay.value;
    const toiletStudentsComment = input.students - toilet - comment.value;
    const toiletEccde = input.eccde - toilet - okay.value;
    const toiletEccdeComment = input.eccde - toilet - comment.value;
    const toiletTeachers = input.toilet - teachers.value;
    const toiletTeachersComment = input.toilet - teachers - comment.value;

    //collecting fencing data
    const fencing = input.fencing.value;
    const fencingComment = input.fencing - comment.value;

    //collecting teacher aid and learning material data
    const blackboard = input.blackboard.value;
    const blackboardComment = input.blackboard - comment.value;
    const textbook = input.textbook.value;
    const textbookComment = input.textbook - comment.value;
    const whiteboard = input.whiteboard.value;
    const whiteboardComment = input.whiteboard - comment.value;
    const lessonNotes = input.lessonNotes.value;
    const lessonNotesComment = input.lessonNotes - comment.value;

    //collecting Agric Farm Data
    const agricFarm = input.agric - farm.value;
    const agricFarmComment = input.agric - farm - comment.value;

    //collecting sports Facility Data
    const sportFacility = input.sport - facility.value;
    const sportFacilityComment = input.sport - facility - comment.value;

    const facilityData = {
      blocksOfClassrooms: blocksOfClassrooms,
      pupilsNumOfClassroom: pupilsNumOfClassroom,
      numPupilsComment: numPupilsComment,
      numStudentsClassroom: numStudentsClassroom,
      numStudentsComment: numStudentsComment,
      numEccdeClassroom: numEccdeClassroom,
      numEccdeComment: numEccdeComment,
      venPupils: venPupils,
      venPupilsComment: venPupilsComment,
      venStudents: venStudents,
      venStudentsComment: venStudentsComment,
      venEccde: venEccde,
      venEccdeComment: venEccdeComment,
      numFurniturePupils: numFurniturePupils,
      numFurniturePupilsComment: numFurniturePupilsComment,
      numFurnitureStudents: numFurnitureStudents,
      numFurnitureStudentsComment: numFurnitureStudentsComment,
      numFurnitureEccde: numFurnitureEccde,
      numFurnitureEccdeComment: numFurnitureEccdeComment,
      teacherFurniture: teacherFurniture,
      teacherFurnitureComment: teacherFurnitureComment,
      toiletPupils: toiletPupils,
      toiletPupilsComment: toiletPupilsComment,
      toiletStudents: toiletStudents,
      toiletStudentsComment: toiletStudentsComment,
      toiletEccde: toiletEccde,
      toiletEccdeComment: toiletEccdeComment,
      toiletTeachers: toiletTeachers,
      toiletTeachersComment: toiletTeachersComment,
      fencing: fencing,
      fencingComment: fencingComment,
      blackboard: blackboard,
      blackboardComment: blackboardComment,
      textbook: textbook,
      textbookComment: textbookComment,
      whiteboard: whiteboard,
      whiteboardComment: whiteboardComment,
      lessonNotes: lessonNotes,
      lessonNotesComment: lessonNotesComment,
      agricFarm: agricFarm,
      agricFarmComment: agricFarmComment,
      sportFacility: sportFacility,
      sportFacilityComment: sportFacilityComment,
    };

    //making request to store the data in the database
    fetch("https://usbeb-backend.onrender.com/api/v1/facilityCapture", {
      method: "POST",
      body: JSON.stringify(facilityData),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
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

function toggleFields(event) {
  const classroomSubfields = document.getElementById("classroomSubfields");
  const ventilatedSubfields = document.getElementById("ventilatedSubfields");
  const furnitureSubfields = document.getElementById("furnitureSubfields");
  const toiletSubfields = document.getElementById("toiletSubfields");
  const tlaSubfields = document.getElementById("tlaSubfields");

  switch (event.target.innerText) {
    case "Classrooms":
      classroomSubfields.style.display =
        classroomSubfields.style.display === "block" ? "none" : "block";
      break;
    case "Ventilated And Conducive For Learning":
      ventilatedSubfields.style.display =
        ventilatedSubfields.style.display === "block" ? "none" : "block";
      break;
    case "Number Of Furnitures":
      furnitureSubfields.style.display =
        furnitureSubfields.style.display === "block" ? "none" : "block";
      break;
    case "Is Toilet Okay ?":
      toiletSubfields.style.display =
        toiletSubfields.style.display === "block" ? "none" : "block";
      break;
    case "Teaching Aid/Learning Materials":
      tlaSubfields.style.display =
        tlaSubfields.style.display === "block" ? "none" : "block";
      break;
    default:
      return;
  }
}

//creating facility
handleFacilityFormData();
//toggleForms
toggleFields(event);
