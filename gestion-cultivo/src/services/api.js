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
    /* return await response.json(); */ //mostrar datos perfil OJO new line
    const result = await response.json(); //new line
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result.user)); //new line
    return result; //new line
  } catch (error) {
    return console.log(error);
  }
};

/* Eliminar usuario */
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

/* Actualizar usuario */
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

/* Crear usuario */
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

///////////////////////////////////////////////////

//CULTIVOS
//crear cultivo
export const createCrop = async (crop) => {
  const token = localStorage.getItem("token");
  return await fetch(
    `${process.env.REACT_APP_API_URL}/crops/crear/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(crop),
    }
  );
};

//obtener cultivos para listar
export const getCrops = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/crops/`, {
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

//eliminar cultivo
export const deleteCrop = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/crops/${id}/`,
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

//actualizar cultivo
export const updateCrop = async (id, crop) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/crops/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(crop),
      }
    );
    return response;
  } catch (error) {
    throw new Error({ error });
  }
}

////////////////////////////////////////////////
/* PREDIOS */
/* Obtener Predios */
export const getProperty = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/propertys`, {
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

/* Eliminar Predios */
export const deleteProperty = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/propertys/${id}`,
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

/* Actualizar Predios */
export const updateProperty = async (id, property) => {
    try {
        const token = localStorage.getItem("token");
        const response = await fetch(
        `${process.env.REACT_APP_API_URL}/propertys/${id}`,
        {
            method: "PATCH",
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(property),
        }
        );
        return response;
    } catch (error) {
        throw new Error({ error });
    }
    }

/* Crear Predio */

export const createProperty = async (property) => {
    
        const token = localStorage.getItem("token");
        return await fetch(
        `${process.env.REACT_APP_API_URL}/propertys/register/`,
        {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(property),
        }
        );
      }

///////////////////////////////////////////////////

//PARAMETROS
//crear parámetro
export const createParameter = async (crop) => {
  const token = localStorage.getItem("token");
  return await fetch(
    `${process.env.REACT_APP_API_URL}/parameters/crear/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(crop),
    }
  );
};

//obtener parámetro para listar
export const getParameters = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/parameters/`, {
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

//eliminar parametros
export const deleteParameter = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/parameters/${id}`,
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

//actualizar parámetros
export const updateParameter = async (id, crop) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/parameters/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(crop),
      }
    );
    return response;
  } catch (error) {
    throw new Error({ error });
  }
}

////////////////////////////////////////////////

//CONFIGURACIONES

//crear configuración
export const createConfig = async (config) => {
  const token = localStorage.getItem("token");
  return await fetch(
    `${process.env.REACT_APP_API_URL}/configs/register/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(config),
    }
  );
};
//obtener configuraciones para listar
export const getConfigs = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/configs/`, {
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

//eliminar configuración
export const deleteConfig = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/configs/${id}/`,
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
//actualizar configuración
export const updateConfig = async (id, crop) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/configs/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(crop),
      }
    );
    return response;
  } catch (error) {
    throw new Error({ error });
  }
}

/* Calculos modal de configuraciones */
export const calculateConfig = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${process.env.REACT_APP_API_URL}/configs/${id}`, {
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
