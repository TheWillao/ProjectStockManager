import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber } from "@mui/material/colors";

export default function ViewItem() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const items = JSON.parse(localStorage.getItem("items"));
  const item = items.find((item) => item.id === id);
  if (item?.createdAt && item?.updatedAt) {
    item.createdAt = new Date(item.createdAt).toLocaleString("pt-BR");
    item.updatedAt = new Date(item.updatedAt).toLocaleString("pt-BR");
  }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const confirmDelete = () => {
    const newItems = items.filter((it) => it.id !== item.id);
    localStorage.setItem("items", JSON.stringify(newItems));
    handleClose();
    navigateTo(-1);
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

  function formatToBRL(amount) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(amount);
  }

  if (!item) {
    return (
      <div className="w-100 d-flex justify-content-center mt-5">
        <h5>Item não encontrado.</h5>
      </div>
    );
  } else {
    return (
      <>
        <div className="w-100">
          <hr />
          <div className="w-100 my-4 d-flex justify-content-between">
            <div className="d-flex align-items-center gap-1">
              <button
                className="me-5"
                onClick={() => navigateTo(-1)}
                title="Voltar"
              >
                <KeyboardBackspaceOutlinedIcon />
              </button>
              <h5 className="me-3">{item.name}</h5>
              <Link to={`../edit/${item.id}`}>
                <button title="Editar">
                  <EditOutlinedIcon />
                </button>
              </Link>
              <button title="Remover" onClick={handleOpen}>
                <DeleteOutlineOutlinedIcon />
              </button>
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
                    Remover {item.name}
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
            </div>
            <div className="d-flex me-4">
              <strong className="me-2">Cadastrado em:</strong>
              <span>{item.createdAt.toLocaleString()}</span>
              <strong className="ms-5 me-2">Atualizado em:</strong>
              <span>{item.updatedAt.toLocaleString()}</span>
            </div>
          </div>
          <div className="d-flex w-100 bg-black rounded py-4 px-5 row text-center">
            <strong className="col-3">ID</strong>
            <strong className="col-3">Nome</strong>
            <strong className="col-2">Em estoque</strong>
            <strong className="col-2">Categoria</strong>
            <strong className="col-2">Preço</strong>
            <div></div>
          </div>
        </div>
        <div className="w-100 d-flex gap-4 mt-2">
          <div className="rounded py-4 w-100 row gap-4">
            <div className="row d-flex w-100 px-5 text-center">
              <span className="col-3">{item.id}</span>
              <span className="col-3 ps-5">{item.name}</span>
              <span className="col-2 ps-4">{item.amount} unid.</span>
              <span className="col-2 ps-4">{item.category}</span>
              <span className="col-2 ps-4">{formatToBRL(item.price)}</span>
            </div>
          </div>
        </div>
        <hr />
        <div className="w-100 d-flex align-items-center flex-column mt-5">
          <div className="w-75 text-center rounded-4 bg-black p-4 d-flex flex-column gap-3">
            <strong>Descrição</strong>
            <p>{item.description}</p>
          </div>
        </div>
      </>
    );
  }
}
