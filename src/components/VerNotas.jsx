import { format } from "@formkit/tempo";
import { deleteNota } from "../utils/api";
import { FaCalendar, FaUser } from "react-icons/fa6";
const VerNotas = ({ titulo, autor, fecha, contenido, id }) => {
  return (
    <a href={`/notas/${id}`}>
      <div
        id="editNoteId"
        className="bg-slate-950 hover:bg-black/10 transition-all p-2 border-l-4 border-blue-500 w-full font-Poppins shadow-2xl rounded-br-lg rounded-tr-lg text-white"
      >
        <h2 className="text-xl font-extrabold">{titulo}</h2>
        <div className="flex items-center gap-4">
          <span className="text-gray-200 text-sm flex items-center gap-2">
            <FaUser />
            {autor}
          </span>
          <span className="text-gray-200 text-sm flex items-center gap-2">
            <FaCalendar />
            {format(fecha, "full")}
          </span>
          <input type="hidden" value={id} id="elementId" />
        </div>
        <p className="text-lg">{contenido}</p>
      </div>
    </a>
  );
};

export default VerNotas;
