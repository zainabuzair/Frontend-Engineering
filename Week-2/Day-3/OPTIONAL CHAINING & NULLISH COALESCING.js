const processUserContacts = (users) => {
  return users.map((user) => {
    const email = user.contact?.email ?? "no-email@provided.com";
    const phone = user.contact?.phone ?? "N/A";

    return {
      id: user.id,
      name: user.name,
      email,
      phone,
    };
  });
};