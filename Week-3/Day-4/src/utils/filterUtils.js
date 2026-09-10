export const filterUsers = (users, searchTerm) => {
  if (!searchTerm.trim()) return users;
  
  const query = searchTerm.toLowerCase();
  return users.filter(
    (user) =>
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
};