/* Apis para traer datos del backend */

/* Obtener usuarios */
export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

/* Iniciar sesion */
export const loginUser = async (correo, contrasena) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ correo, contrasena }),
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

export const deleteUser = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/users/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      }
    );
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
}

export const updateUser = async (id, user) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/${id}`,
        {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        }
        );
        return response;
    } catch (error) {
        throw new Error({ error });
    }
    }
export const createUser = async (user) => {
    
        const token = localStorage.getItem("token");
        return await fetch(
        `${process.env.REACT_APP_API_URL}/users/register`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(user),
        }
        );


    }

