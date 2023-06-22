import { useState, useEffect } from "react";
import Galaxy from "./components/Galaxy.jsx";
import Header from "./components/Header.jsx";
import Tombol from "./components/Tombol.jsx";
import {
  AiOutlinePlus,
  AiOutlineZoomOut,
  AiOutlineZoomIn,
  AiFillDelete,
} from "react-icons/Ai";
// import {from "react-icons/Ai";
import { RxUpdate } from "react-icons/Rx";
import "./App.css";

const App = () => {
  // Nambah
  const [newGalaxy, setNewGalaxy] = useState({
    id: "",
    name: "",
    diameter: 0,
  });
  // Hapus
  const [editGalaxy, setEditGalaxy] = useState({
    id: "",
    name: "",
  });

  const [galaxies, setGalaxies] = useState([
    {
      id: 1,
      name: "Andromeda",
      diameter: 220000,
    },
    {
      id: 2,
      name: "Bima Sakti",
      diameter: 1000000,
    },
    {
      id: 3,
      name: "Triangular",
      diameter: 60000,
    },
  ]);
  // ID
  let nextId = galaxies.length + 1;
  // untuk memperbarui nama bedasarkan id
  useEffect(() => {
    const selectedGalaxy = galaxies.find(
      (galaxy) => galaxy.id === editGalaxy.id
    );
    if (selectedGalaxy) {
      setEditGalaxy((prevEditGalaxy) => ({
        ...prevEditGalaxy,
        name: selectedGalaxy.name,
      }));
    } else {
      const initialName =
        galaxies.find((galaxy) => galaxy.id === editGalaxy.id)?.name || "";
      setEditGalaxy((prevEditGalaxy) => ({
        ...prevEditGalaxy,
        name: initialName,
      }));
    }
  }, [editGalaxy.id, galaxies]);

  return (
    <>
      <Header />
      <div className="box">
        <div>
          {galaxies.map((value) => (
            <Galaxy
              key={value.id}
              id={value.id}
              name={value.name}
              diameter={value.diameter}
            />
          ))}
        </div>
        {/* TABEL TAMBAH */}
        <div className="Card1">
          <form>
            <h1>Tambah</h1>
            <label>
              ID:
              <input type="Number" value={nextId} readOnly />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={newGalaxy.name}
                onChange={(e) =>
                  setNewGalaxy({ ...newGalaxy, name: e.target.value })
                }
              />
            </label>
            <label>
              Diameter:
              <input
                type="Number"
                value={newGalaxy.diameter}
                onChange={(e) =>
                  setNewGalaxy({
                    ...newGalaxy,
                    diameter: parseInt(e.target.value),
                  })
                }
              />
            </label>
            <div className="Tombol">
              <Tombol
                handleClick={(e) => {
                  e.preventDefault();
                  setGalaxies([...galaxies, { ...newGalaxy, id: nextId }]);
                }}
                icon={AiOutlinePlus}
                teks="Tambah Depan"
              />
              <Tombol
                handleClick={(e) => {
                  e.preventDefault();
                  setGalaxies([{ ...newGalaxy, id: nextId }, ...galaxies]);
                  setNewGalaxy({ id: "", name: "", diameter: 0 });
                }}
                icon={AiOutlinePlus}
                teks="Tambah Belakang"
              />
            </div>
          </form>
        </div>
        <div>
          {/* TABEL EDIT & HAPUS ID */}
          <form className="Card">
            <h4>EDIT & HAPUS ID</h4>
            <label>
              ID:
              <input
                type="number"
                value={editGalaxy.id}
                onChange={(e) =>
                  setEditGalaxy((prevEditGalaxy) => ({
                    ...prevEditGalaxy,
                    id: parseInt(e.target.value),
                  }))
                }
              />
            </label>
            <label>
              Name:
              <input
                type="text"
                value={editGalaxy.name || ""}
                onChange={(e) =>
                  setEditGalaxy({ ...editGalaxy, name: e.target.value })
                }
              />
              <Tombol
                handleClick={(e) => {
                  e.preventDefault();
                  const updatedGalaxies = galaxies.map((galaxy) => {
                    if (galaxy.id === editGalaxy.id) {
                      return { ...galaxy, name: editGalaxy.name };
                    }
                    return galaxy;
                  });

                  setGalaxies(updatedGalaxies);
                }}
                icon={RxUpdate}
                teks="Update"
              ></Tombol>
            </label>

            <div className="Tombol">
              <label>
                Diameter:
                <Tombol
                  handleClick={(e) => {
                    e.preventDefault();
                    const increment = galaxies.map((galaxy) => {
                      if (parseInt(editGalaxy.id) === galaxy.id) {
                        return {
                          ...galaxy,
                          diameter: parseInt(galaxy.diameter) + 1,
                        };
                      } else {
                        return galaxy;
                      }
                    });
                    setGalaxies(increment);
                  }}
                  icon={AiOutlineZoomOut}
                  teks="Perbesar"
                ></Tombol>
                <Tombol
                  handleClick={(e) => {
                    e.preventDefault();
                    const decrement = galaxies.map((galaxy) => {
                      if (parseInt(editGalaxy.id) === galaxy.id) {
                        return {
                          ...galaxy,
                          diameter: parseInt(galaxy.diameter) - 1,
                        };
                      } else {
                        return galaxy;
                      }
                    });
                    setGalaxies(decrement);
                  }}
                  icon={AiOutlineZoomIn}
                  teks=" Perkecil"
                ></Tombol>
              </label>
            </div>
            <label>
              <Tombol
                handleClick={(e) => {
                  e.preventDefault();
                  const deleteId = galaxies.filter((galaxy) => {
                    return parseInt(editGalaxy.id) !== galaxy.id;
                  });
                  setGalaxies(deleteId);
                }}
                icon={AiFillDelete}
                teks="DELETE"
              />
            </label>
          </form>
        </div>
                {/* HAPUS */}
                <form className="Card3">
                  <h4>HAPUS</h4>
                  <div>
                    <Tombol
                      handleClick={(e) => {
                        e.preventDefault();
                        setGalaxies(galaxies.slice(1));
                      }}
                      icon={AiFillDelete}
                      teks=" Depan"
                    />
      
                    <Tombol
                      handleClick={(e) => {
                        e.preventDefault();
                        setGalaxies(galaxies.slice(0, -1));
                      }}
                      icon={AiFillDelete}
                      teks=" Belakang"
                    />
      
                    <Tombol
                      handleClick={(e) => {
                        e.preventDefault();
                        setGalaxies((galaxies) => []);
                      }}
                      icon={AiFillDelete}
                      teks="Semua"
                    />
                  </div>
                </form>
      </div>
    </>
  );
};

export default App;
