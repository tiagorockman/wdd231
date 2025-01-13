
window.onload = function() {
    const currentYear = new Date().getFullYear();
    document.getElementById('currentyear').appendChild(document.createTextNode(currentYear));

    const lastModifiedDate = formatDateTime(new Date(document.lastModified));
    document.getElementById('lastModified').appendChild(document.createTextNode(lastModifiedDate));

    const courses = [
        {
            subject: 'CSE',
            number: 110,
            title: 'Introduction to Programming',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 130,
            title: 'Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
            technology: [
                'HTML',
                'CSS'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 111,
            title: 'Programming with Functions',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
            technology: [
                'Python'
            ],
            completed: true
        },
        {
            subject: 'CSE',
            number: 210,
            title: 'Programming with Classes',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
            technology: [
                'C#'
            ],
            completed: true
        },
        {
            subject: 'WDD',
            number: 131,
            title: 'Dynamic Web Fundamentals',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        },
        {
            subject: 'WDD',
            number: 231,
            title: 'Frontend Web Development I',
            credits: 2,
            certificate: 'Web and Computer Programming',
            description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
            technology: [
                'HTML',
                'CSS',
                'JavaScript'
            ],
            completed: false
        }
    ]

    const filterButtons = document.querySelectorAll("#button-head-courses-filter .button");
    const coursesContainer = document.querySelector(".body-courses-buttons");
    const totalCoursesEl = document.getElementById("total-courses");
    const totalCreditsEl = document.getElementById("total-credits");

    function renderCourses(filter) {
      coursesContainer.innerHTML = ""; //cleaning the div container where the course will be located

      // Filter courses based on the filter
      const filteredCourses = filter === "All" ? courses : courses.filter(course => course.subject === filter);

      // Calculate total credits using reduce
      const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);

      // Render the courses as buttons
      filteredCourses.forEach(course => {
        const button = document.createElement("button");
        button.classList.add("button");
        button.classList.add("courses");
        button.textContent = `${course.subject} ${course.number} - ${course.title}`;
        if (course.completed) {
          button.classList.add("completed");
        }
        coursesContainer.appendChild(button);
      });

      // Update counters
      totalCoursesEl.textContent = `Total courses displayed: ${filteredCourses.length}`;
      totalCreditsEl.textContent = `Total credits required: ${totalCredits}`;
    }

    // Add event listeners to filter buttons
    filterButtons.forEach(button => {
      button.addEventListener("click", () => renderCourses(button.id));
    });

    // Initial render with all courses
    renderCourses("All");
}

function formatDateTime(receivedDate) {
  
    const day = String(receivedDate.getDate()).padStart(2, "0");
    const month = String(receivedDate.getMonth() + 1).padStart(2, "0");
    const year = receivedDate.getFullYear();
  
    const hours = String(receivedDate.getHours()).padStart(2, "0");
    const minutes = String(receivedDate.getMinutes()).padStart(2, "0");
    const seconds = String(receivedDate.getSeconds()).padStart(2, "0");
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }
