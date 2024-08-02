import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

export default function AllItems() {
  const items = JSON.parse(localStorage.getItem("items"));

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const confirmDelete = () => {
    const newItems = items.filter((item) => item.id !== selectedItem.id);
    localStorage.setItem("items", JSON.stringify(newItems));
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const theme = createTheme({
    palette: {
      primary: amber,
    },
  });

  return (
    <>
      <div className="w-100">
        <div className="d-flex w-100 bg-black rounded py-4 px-5 row text-center">
          <strong className="col-3">ID</strong>
          <strong className="col-3">Nome</strong>
          <strong className="col-2">Em estoque</strong>
          <strong className="col-2">Categoria</strong>
          <div className="col-2 d-flex justify-content-center ps-5">
            <strong>Ações</strong>
          </div>
        </div>
      </div>
      <div className="w-100 d-flex gap-4 mt-2">
        <div className="rounded py-4 bg-black w-100 row gap-4">
          {items && items.length > 0 ? (
            items.map((item) => (
              <div className="row d-flex w-100 px-5 text-center" key={item.id}>
                <span className="col-3">{item.id}</span>
                <span className="col-3 ps-5">{item.name}</span>
                <span className="col-2 ps-4">{item.amount} unid.</span>
                <span className="col-2 ps-4">{item.category}</span>
                <div className="col-2 d-flex gap-2 justify-content-end">
                  <Link to={item.id}>
                    <button title="Visualizar">
                      <RemoveRedEyeOutlinedIcon />
                    </button>
                  </Link>
                  <Link to={`edit/${item.id}`}>
                    <button title="Editar">
                      <EditOutlinedIcon />
                    </button>
                  </Link>
                  <button title="Remover" onClick={() => handleOpen(item)}>
                    <DeleteOutlineOutlinedIcon />
                  </button>
                  {selectedItem && (
                    <Modal
                      open={open}
                      onClose={handleClose}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    >
                      <Box sx={style}>
                        <Typography
                          id="modal-modal-title"
                          variant="h6"
                          component="h2"
                          className="text-center"
                        >
                          Remover {selectedItem.name}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                          Tem certeza que deseja remover este item?
                        </Typography>
                        <ThemeProvider theme={theme}>
                          <div className="w-100 d-flex justify-content-center mt-4 gap-3">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={confirmDelete}
                            >
                              Sim
                            </Button>
                            <Button variant="outlined" onClick={handleClose}>
                              Não
                            </Button>
                          </div>
                        </ThemeProvider>
                      </Box>
                    </Modal>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="row d-flex w-100 px-5 justify-content-center">
              Não há itens cadastrados. Clique
              <Link to="new" className="w-auto">
                aqui
              </Link>
              para cadastrar um item.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
