export const IdParam = {
  _className: "IdParam",
  properties: {
    id: {
      required: true,
    },
  },
}

export const UserData = {
  _className: "UserData",
  properties: {
    id: {
      required: false,
    },
    name: {
      required: true,
    },
    surname: {
      required: true,
    },
    hourlyRate: {
      required: true,
    },
  },
}

export const UsersFilter = {
  _className: "UsersFilter",
  properties: {
    fulltext: {
      required: false,
    },
  },
}

export const UsersList = {
  _className: "UsersList",
  properties: {
    items: {
      required: true,
    },
  },
}
