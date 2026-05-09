const courses = [
  { code: "WDD 130", credits: 2, completed: true, subject: "WDD" },
  { code: "WDD 231", credits: 2, completed: false, subject: "WDD" },
  { code: "CSE 110", credits: 2, completed: true, subject: "CSE" },
  { code: "CSE 111", credits: 2, completed: false, subject: "CSE" }
];

const container = document.getElementById("courses");
const creditsDisplay = document.getElementById("credits");

function displayCourses(list) {
  container.innerHTML = "";

  list.forEach(course => {
    const div = document.createElement("div");
    div.textContent = course.code;

    if (course.completed) {
      div.style.background = "lightgreen";
    }

    container.appendChild(div);
  });

  const total = list.reduce((sum, c) => sum + c.credits, 0);
  creditsDisplay.textContent = total;
}

displayCourses(courses);

document.getElementById("all").onclick = () => displayCourses(courses);
document.getElementById("wdd").onclick = () =>
  displayCourses(courses.filter(c => c.subject === "WDD"));
document.getElementById("cse").onclick = () =>
  displayCourses(courses.filter(c => c.subject === "CSE"));