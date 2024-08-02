import { useState } from "react";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";
import { useParams, useNavigate } from "react-router-dom";

export default function EditItem() {
  const { id } = useParams();
  const navigateTo = useNavigate();
  const itemsStorage = JSON.parse(localStorage.getItem("items"));
  const item = itemsStorage.find((item) => item.id === id);

  const [name, setName] = useState(item.name);
  const [amount, setAmount] = useState(item.amount);
  const [price, setPrice] = useState(item.price);
  const [category, setCategory] = useState(item.category);
  const [description, setDescription] = useState(item.description);

  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState(() => itemsStorage);

  const handleSubmit = (ev) => {
    ev.preventDefault();
    item.updatedAt = new Date().toLocaleString();

    setItems((state) => {
      const i = state.findIndex((i) => i.id === id);
      state[i].name = name;
      state[i].amount = +amount;
      state[i].price = +price;
      state[i].category = category;
      state[i].description = description;
      state[i].updatedAt = new Date();

      localStorage.setItem("items", JSON.stringify(state));

      return state;
    });

    alert(`Item "${name}" editado com sucesso!`);

    navigateTo(-1);
  };

  return (
    <>
      <hr />
      <div className="d-flex">
        <button className="me-5" onClick={() => navigateTo(-1)} title="Voltar">
          <KeyboardBackspaceOutlinedIcon />
        </button>
        <h5 className="me-3">Editar item - {item.name}</h5>
      </div>
      <form
        className="w-100 mt-5 d-flex flex-column gap-3 align-items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-75 d-flex justify-content-center row">
          <div className="d-flex flex-column col-3">
            <label htmlFor="name">Nome</label>
            <input
              value={name}
              id="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="amount">Quantidade</label>
            <input
              value={amount}
              id="amount"
              type="number"
              onChange={(e) => setAmount(e.target.value)}
              required
              min="1"
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="price">Preço</label>
            <input
              value={price}
              id="price"
              type="number"
              onChange={(e) => setPrice(e.target.value)}
              required
              min="1"
              step="0.01"
            />
          </div>
          <div className="d-flex flex-column col-3">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled hidden>
                Selecione uma categoria
              </option>
              <option value="Jogos">Jogos</option>
              <option value="Filmes">Filmes</option>
              <option value="Livros">Livros</option>
              <option value="Action Figures">Action Figures</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-center row w-75">
          <div className="d-flex flex-column col-12">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              rows={3}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-warning mt-4" type="submit">
          Salvar
        </button>
      </form>
    </>
  );
}
