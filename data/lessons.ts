export interface LessonContent {
  type: 'text' | 'code';
  content: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export interface Lesson {
  id: string;
  title: string;
  content: LessonContent[];
  quiz?: QuizQuestion[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: 'basics',
    title: 'JavaScript Basics',
    description: 'Learn the fundamentals of JavaScript.',
    lessons: [
      {
        id: 'intro',
        title: 'Introduction to JavaScript',
        content: [
          {
            type: 'text',
            content: 'JavaScript is a programming language that adds interactivity to your website. It is one of the core technologies of the World Wide Web, alongside HTML and CSS.'
          },
          {
            type: 'code',
            content: 'console.log("Hello, World!");'
          },
          {
            type: 'text',
            content: 'The code above prints "Hello, World!" to the console. This is often the first program people write.'
          }
        ],
        quiz: [
          {
            question: 'What is JavaScript primarily used for?',
            options: [
              'Styling web pages',
              'Adding interactivity to web pages',
              'Structuring web pages',
              'Managing databases'
            ],
            correctAnswer: 1
          }
        ]
      },
      {
        id: 'variables',
        title: 'Variables',
        content: [
          {
            type: 'text',
            content: 'Variables are containers for storing data values. In JavaScript, we use "let", "const", and "var" to declare variables.'
          },
          {
            type: 'code',
            content: 'let message = "Hello";\nconst pi = 3.14;'
          }
        ],
        quiz: [
          {
            question: 'Which keyword is used to declare a constant variable?',
            options: [
              'let',
              'var',
              'const',
              'steady'
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 'functions',
        title: 'Functions',
        content: [
          {
            type: 'text',
            content: 'Functions are reusable blocks of code that perform a specific task. They help you organize your code and avoid repetition.'
          },
          {
            type: 'code',
            content: 'function greet(name) {\n  return "Hello, " + name + "!";\n}\n\nconsole.log(greet("World"));'
          },
          {
            type: 'text',
            content: 'You can also use arrow functions, which are a shorter syntax introduced in ES6:'
          },
          {
            type: 'code',
            content: 'const greet = (name) => {\n  return "Hello, " + name + "!";\n};'
          }
        ],
        quiz: [
          {
            question: 'What keyword is used to define a traditional function?',
            options: [
              'func',
              'def',
              'function',
              'method'
            ],
            correctAnswer: 2
          },
          {
            question: 'What does "return" do in a function?',
            options: [
              'Stops the function and outputs a value',
              'Prints to console',
              'Declares a variable',
              'Creates a loop'
            ],
            correctAnswer: 0
          }
        ]
      },
      {
        id: 'arrays',
        title: 'Arrays',
        content: [
          {
            type: 'text',
            content: 'Arrays are used to store multiple values in a single variable. Each item has an index starting from 0.'
          },
          {
            type: 'code',
            content: 'const fruits = ["Apple", "Banana", "Cherry"];\nconsole.log(fruits[0]); // "Apple"\nconsole.log(fruits.length); // 3'
          },
          {
            type: 'text',
            content: 'Common array methods include push(), pop(), map(), and filter():'
          },
          {
            type: 'code',
            content: 'fruits.push("Date"); // Adds to end\nfruits.pop(); // Removes last item\n\n// Map creates a new array\nconst upperFruits = fruits.map(f => f.toUpperCase());'
          }
        ],
        quiz: [
          {
            question: 'What index does the first element of an array have?',
            options: [
              '1',
              '0',
              '-1',
              'first'
            ],
            correctAnswer: 1
          },
          {
            question: 'Which method adds an element to the end of an array?',
            options: [
              'add()',
              'append()',
              'push()',
              'insert()'
            ],
            correctAnswer: 2
          }
        ]
      },
      {
        id: 'objects',
        title: 'Objects',
        content: [
          {
            type: 'text',
            content: 'Objects store data as key-value pairs. They are perfect for representing real-world entities with properties.'
          },
          {
            type: 'code',
            content: 'const person = {\n  name: "Alice",\n  age: 25,\n  isStudent: true\n};\n\nconsole.log(person.name); // "Alice"\nconsole.log(person["age"]); // 25'
          },
          {
            type: 'text',
            content: 'You can add methods (functions) to objects:'
          },
          {
            type: 'code',
            content: 'const person = {\n  name: "Alice",\n  greet: function() {\n    return "Hi, I am " + this.name;\n  }\n};\n\nconsole.log(person.greet());'
          }
        ],
        quiz: [
          {
            question: 'How do you access the "name" property of an object called "person"?',
            options: [
              'person->name',
              'person.name',
              'person::name',
              'name.person'
            ],
            correctAnswer: 1
          },
          {
            question: 'What does "this" refer to inside an object method?',
            options: [
              'The global window',
              'The function itself',
              'The object the method belongs to',
              'Nothing'
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  }
];
