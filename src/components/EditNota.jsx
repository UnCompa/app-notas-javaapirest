import { format } from "@formkit/tempo";
import React, { useState } from "react";
import { deleteNota, updateNota } from "../utils/api";
import { FaCalendar, FaUser } from "react-icons/fa6";

// Asegúrate de importar funciones necesarias para la API

const EditNota = ({ titulo, contenido, fecha, username, id }) => {
  const [edited, setEdited] = useState(false);
  const [newTitulo, setNewTitulo] = useState(titulo);
  const [newContenido, setNewContenido] = useState(contenido);

  // Maneja la actualización de la nota
  const handleSave = async () => {
    const updatedNota = {
      titulo: newTitulo,
      contenido: newContenido,
      fecha: new Date().toISOString(),
      username: username,
    };
    try {
      const data = await updateNota(id, updatedNota);
      console.log(data);
      setEdited(false);
      window.location.reload()
    } catch (error) {
      console.error("Error al guardar los cambios:", error);
    }
  };

  // Maneja la eliminación de la nota
  const handleDelete = async (id) => {
    try {
      const data = await deleteNota(id);
      console.log(data);
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la nota:", error);
    }
  };

  return (
    <section>
      {edited ? (
        <div
          id="editNoteId"
          className="bg-zinc-950 p-4 text-white border-2 border-blue-500 w-full font-Poppins shadow-2xl rounded-lg"
        >
          <input
            type="text"
            value={newTitulo}
            onChange={(e) => setNewTitulo(e.target.value)}
            className="p-2 text-2xl font-bold rounded bg-slate-900 w-full outline-none"
          />
          <textarea
            value={newContenido}
            onChange={(e) => setNewContenido(e.target.value)}
            className="p-2 my-4 rounded bg-slate-900 w-full outline-none"
          />
          <div className="flex items-center gap-4 my-2">
            <span className="text-gray-200 text-sm flex items-center gap-2">
              <FaUser />
              {username}
            </span>
            <span className="text-gray-200 text-sm flex items-center gap-2">
              <FaCalendar />
              {format(fecha, "full")}
            </span>
            <input type="hidden" value={id} id="elementId" />
          </div>
          <div className="flex gap-4">
            <button
              className="flex-1 bg-green-500 text-white my-2 rounded"
              onClick={handleSave}
            >
              Guardar
            </button>
            <button
              className="flex-1 bg-sky-500 text-white my-2 rounded"
              onClick={() => setEdited(false)}
            >
              Cancelar
            </button>
            <button
              className="flex-1 bg-red-800/10 border-2 border-red-900 text-red-900 my-2 rounded"
              onClick={() => handleDelete(id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        <div
          id="editNoteId"
          className="bg-zinc-950 p-4 text-white border-2 border-blue-500 w-full font-Poppins shadow-2xl rounded-lg"
        >
          <h2 className="text-3xl font-extrabold">{titulo}</h2>
          <div className="flex items-center gap-4 my-2">
            <span className="text-gray-200 text-sm flex items-center gap-2">
              <FaUser />
              {username}
            </span>
            <span className="text-gray-200 text-sm flex items-center gap-2">
              <FaCalendar />
              {format(fecha, "full")}
            </span>
            <input type="hidden" value={id} id="elementId" />
          </div>
          <p className="text-lg my-2">{contenido}</p>
          <div className="flex gap-4">
            <button
              className="flex-1 bg-sky-500 text-white my-2 rounded"
              onClick={() => setEdited(true)}
            >
              Editar
            </button>
            <button
              className="flex-1 bg-red-800/10 border-2 border-red-900 text-red-900 my-2 rounded"
              onClick={() => handleDelete(id)}
            >
              Eliminar
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default EditNota;
