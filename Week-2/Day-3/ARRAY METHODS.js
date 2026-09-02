// map(): Transform array elements into a simplified profile
const userSummaries = rawUsers.map(({ name, role, skills }) => ({
  name,
  role,
  primarySkill: skills[0] ?? "None",
}));

// filter(): Get high-performing developers (score >= 80)
const topDevelopers = rawUsers.filter(
  (user) => user.role === "developer" && user.stats.score >= 80
);

// find(): Locate the first user skilled in "Architecture"
const architect = rawUsers.find((user) =>
  user.skills.includes("Architecture")
);

// some(): Check if at least one user has zero completed tasks
const hasIncompleteUsers = rawUsers.some(
  (user) => user.stats.completedTasks === 0
);

// every(): Check if all users have at least one skill listed
const allAreSkilled = rawUsers.every((user) => user.skills.length > 0);

// reduce(): Calculate the average score across all users
const averageScore =
  rawUsers.reduce((accumulator, user) => accumulator + user.stats.score, 0) /
  rawUsers.length;

// reduce(): Group users by role
const usersByRole = rawUsers.reduce((acc, user) => {
  const role = user.role;
  if (!acc[role]) {
    acc[role] = [];
  }
  acc[role].push(user.name);
  return acc;
}, {});