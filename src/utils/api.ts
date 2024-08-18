const api = import.meta.env.PUBLIC_API_URL;
import axios from "axios";
interface DataInterface {
  id: number;
  titulo: string;
  contenido: string;
  username: string;
  fecha: string;
}

export const obtenerNotasPorUsuario = async (
  username: string | undefined
): Promise<Array<DataInterface>> => {
  try {
    const res = await fetch(`${api}/notas/usuario/${username}`);

    // Verifica si la respuesta fue exitosa
    if (!res.ok) {
      throw new Error("Error al obtener las notas");
    }

    const data = await res.json();

    // Si 'data' es un array, lo puedes retornar directamente, pero necesitas asegurar que cumple con la interfaz.
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const crearNota = async (titulo: string, contenido: string) => {
  const username = getCookie("x-user-data");

  // Verificar que username está disponible
  if (!username) {
    console.error("No se pudo obtener el username de la cookie");
    return;
  }
  try {
    const res = await fetch(`${api}/notas`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        titulo: titulo,
        contenido: contenido,
        username: username,
      }),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.log("Hola");
    console.log(error);

    console.error("Error al crear la nota:");
  }
};
export const obtenerNota = async (id: number | string) => {
  try {
    const res = await fetch(`${api}/notas/${id}`);
    if (!res.ok) {
      return { error: "Hubo un error" };
    }
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: "Error interno de: " + error };
  }
};
export const updateNota = async (id: string, content: object) => {
  console.log(content);
  try {
    const res = await fetch(`${api}/notas/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(content),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    return { error: "Error interno: " + error };
  }
};
export const deleteNota = async (id: number) => {
  try {
    const res = await fetch(`${api}/notas/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      return { error: "Algo salio mal" };
    }

    const data = await res.json();
    console.log(data);

    return data;
  } catch (error) {
    return { error: "Error interno: " + error };
  }
};

function getCookie(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()!.split(";").shift();
}
