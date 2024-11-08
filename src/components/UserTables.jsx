import { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { Spinner } from "@nextui-org/spinner";

export const UserTables = ({ users, handleEditClick }) => {
  const customStyles = {
    header: {
      style: {
        minHeight: '56px',
      },
    },
    headRow: {
      style: {
        borderTopStyle: 'solid',
        borderTopWidth: '1px',
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        '&:not(:last-of-type)': {
          borderRightStyle: 'solid',
          borderRightWidth: '1px',
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };

  const columns = [
    {
      name: "Acción",
      cell: (row) => (
        <button onClick={() => handleEditClick(row)} className="text-white bg-babyblue rounded-md py-2 px-4 my-1 hover:bg-blue-400">
          Editar
        </button>
      ),
      grow:0

    },
    {
      name: "DNI",
      selector: (row) => row.username,
      sortable: true,
      grow:0
    },
    {
      name: "Nombres",
      selector: (row) => row.nombres,
      sortable: true,
      grow:1

    },
    {
      name: "Correo",
      selector: (row) => row.email,
      sortable: true,
      
    },
    {
      name: "Contraseña",
      selector: (row) => "***********",
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.rol,
      sortable: true,
      grow:0

    },
    {
      name: "Estado",
      selector: (row) => row.estado,
      sortable: true,
      grow:0

    },
  ];

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (users && users.length > 0) {
      setRecords(users);
      setLoading(false);
    }
  }, [users]);

  const handleChange = (e) => {
    const filteredRecords = users.filter((record) =>
      record.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setRecords(filteredRecords);
  };

  function Loader() {
    return <Spinner label="Cargando..." color="warning" />;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-primary font-bold text-2xl lg:text-4xl mb-4">
        Dashboard de usuarios registrados
      </h1>
      <label htmlFor="email" className="text-primary my-5 block text-sm">
        Busca por DNI:
      </label>
      <input
        type="text"
        className="p-3 rounded block mb-2 border-2 border-babyblue text-black w-1/4 my-4"
        onChange={handleChange}
      />
      {!loading && records.length > 0 ? (
        <div className="w-full overflow-x-auto">
          <DataTable
            className="mt-4"
            columns={columns}
            data={records}
            customStyles={customStyles}
            dense
            pagination
            fixedHeader
            progressPending={loading}
            progressComponent={<Loader />}
          />
        </div>
      ) : loading ? (
        <Loader />
      ) : (
        <p className="text-secondary text-sm">No hay registros para mostrar.</p>
      )}
    </div>
  );
};
