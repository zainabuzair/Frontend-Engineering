// Default parameters + Destructuring + Rest operator
function createUser(name, role = "contributor", ...initialSkills) {
  return {
    id: Date.now(),
    name,
    role,
    skills: initialSkills, 
    stats: { score: 0, completedTasks: 0 },
  };
}

const newUser = createUser("Eve Online", undefined, "Go", "Docker");

// Array Destructuring
const [firstUser, secondUser, ...remainingUsers] = rawUsers;

// Object Destructuring + Nested Destructuring
const {
  name: leadName,
  stats: { score: leadScore },
} = rawUsers[3];

// Spread Operator 
const updatedUsers = [
  ...rawUsers,
  {
    ...newUser,
    stats: { ...newUser.stats, score: 50 }, 
  },
];