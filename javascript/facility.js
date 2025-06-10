const handleFacilityFormData = () => {
  document.getElementById("myForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const input = event.target;

    //first section
    const blocksOfClassrooms = input.blocksOfClassroom.value;
    const nameOfSchool = input.nameOfSchool.value;

    //number of classroom section
    const numEccdeClassroom = input.numEccdeClassroom.value;
    const numEccdeComment = input.numEccdeComment.value;
    const numPrimaryClassroom = input.numPrimaryClassroom.value;
    const numPrimaryClassroomComment = input.numPrimaryComment.value;
    const numUbeJssClassroom = input.numUbeJssClassroom.value;
    const numUbeJssClassroomComment = input.numUbeJssComment.value;

    //collecting ventilated data
    const venEccde = input.venEccde.value;
    const venEccdeComment = input.venEccdeComment.value;
    const venPrimary = input.venPrimary.value;
    const venPrimaryComment = input.venPrimaryComment.value;
    const venUbeJss = input.venUbeJss.value;
    const venUbeJssComment = input.venUbeJssComment.value;

    //collecting furniture data
    const eccdeFurniture = input.eccdeFurniture.value;
    const eccdeFurnitureComment = input.eccdeFurnitureComment.value;
    const primaryFurniture = input.primaryFurniture.value;
    const primaryFurnitureComment = input.primaryFurnitureComment.value;
    const ubeJssFurniture = input.ubeJssFurniture.value;
    const ubeJssFurnitureComment = input.ubeJssFurnitureComment.value;
    const teachersFurniture = input.teachersFurniture.value;
    const teachersFurnitureComment = input.teachersFurnitureComment.value;

    //collecting toilet okay data
    const toilet = input.toilet.value;
    const toiletComment = input.toiletComment.value;

    //collecting fencing data
    const fencing = input.fencing.value;
    const fencingComment = input.fencingComment.value;

    //collecting teacher aid and learning material data
    const blackboard = input.blackboard.value;
    const blackboardComment = input.blackboardComment.value;
    const textbook = input.textbook.value;
    const textbookComment = input.textbookComment.value;
    const whiteboard = input.whiteboard.value;
    const whiteboardComment = input.whiteboardComment.value;
    const lessonNotes = input.lessonNotes.value;
    const lessonNotesComment = input.lessonNotesComment.value;
    const curriculum = input.curriculum.value;
    const curriculumComment = input.curriculumComment.value;
    const eccdeLearningMaterials = input.eccdeLearningMaterials.value;
    const elmComment = input.elmComment.value;

    //collecting Agric Farm Data
    const agricFarm = input.agricFarm.value;
    const agricFarmComment = input.agricFarmComment.value;

    //collecting sports Facility Data
    const sportFacility = input.sportFacility.value;
    const sportFacilityComment = input.sportFacilityComment.value;

    const facilityData = {
      blocksOfClassrooms: blocksOfClassrooms,
      nameOfSchool: nameOfSchool,
      numEccdeClassroom: numEccdeClassroom,
      numEccdeComment: numEccdeComment,
      numPrimaryClassroom: numPrimaryClassroom,
      numPrimaryClassroomComment: numPrimaryClassroomComment,
      numUbeJssClassroom: numUbeJssClassroom,
      numUbeJssClassroomComment: numUbeJssClassroomComment,
      venEccde: venEccde,
      venEccdeComment: venEccdeComment,
      venPrimary: venPrimary,
      venPrimaryComment: venPrimaryComment,
      venUbeJss: venUbeJss,
      venUbeJssComment: venUbeJssComment,
      eccdeFurniture: eccdeFurniture,
      eccdeFurnitureComment: eccdeFurnitureComment,
      primaryFurniture: primaryFurniture,
      primaryFurnitureComment: primaryFurnitureComment,
      ubeJssFurniture: ubeJssFurniture,
      ubeJssFurnitureComment: ubeJssFurnitureComment,
      teachersFurniture: teachersFurniture,
      teachersFurnitureComment: teachersFurnitureComment,
      toilet: toilet,
      toiletComment: toiletComment,
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
      curriculum: curriculum,
      curriculumComment: curriculumComment,
      eccdeLearningMaterials: eccdeLearningMaterials,
      elmComment: elmComment,
      agricFarm: agricFarm,
      agricFarmComment: agricFarmComment,
      sportFacility: sportFacility,
      sportFacilityComment: sportFacilityComment,
    };

    //making request to store the data in the database
    fetch("https://usbeb-backend.onrender.com/api/v1/facilityData", {
      method: "POST",
      body: JSON.stringify(facilityData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        document.getElementById("myForm").reset();
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
