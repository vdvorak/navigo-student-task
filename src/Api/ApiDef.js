export const IdParam = {
  className: "IdParam",
  props: {
    id: {}
  }
}

export const UserData = {
  className: "UserData",
  props: {
    id: {
      optional: true
    },
    name: {},
    surname: {},
    hourlyRate: {},
    email: {
      optional: true
    }
  }
}

export const UsersFilter = {
  className: "UsersFilter",
  props: {
    fulltext: {
      optional: true
    }
  }
}

export const UsersList = {
  className: "UsersList",
  props: {
    items: {}
  }
}
