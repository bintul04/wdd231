const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Intro to programming using Python.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Intro to HTML and CSS.',
        technology: ['HTML', 'CSS'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Functions, debugging, and structure.',
        technology: ['Python'],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Object-oriented programming in C#.',
        technology: ['C#'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'JavaScript for dynamic content.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'Advanced front-end development.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

const grid = document.getElementById('courseGrid');
const allBtn = document.getElementById('all');
const cseBtn = document.getElementById('cse');
const wddBtn = document.getElementById('wdd');

function renderCourses(list) {
    grid.innerHTML = '';
    list.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card loaded';
        card.innerHTML = `
        <h3>${course.subject} ${course.number}: ${course.title}</h3>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
        <p>${course.description}</p>
      `;
        grid.appendChild(card);
    });
}

allBtn.addEventListener('click', () => renderCourses(courses));
cseBtn.addEventListener('click', () => renderCourses(courses.filter(course => course.subject === 'CSE')));
wddBtn.addEventListener('click', () => renderCourses(courses.filter(course => course.subject === 'WDD')));

window.addEventListener('DOMContentLoaded', () => renderCourses(courses));
  