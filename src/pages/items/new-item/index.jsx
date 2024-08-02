import { useState } from "react";

export default function NewItem() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  // eslint-disable-next-line no-unused-vars
  const [items, setItems] = useState(() => {
    const items = localStorage.getItem("items");
    if (!items) {
      return [];
    }
    return JSON.parse(items);
  });

  function generateRandomID() {
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const length = 6;
    let result = "";

    function getRandomSegment() {
      let segment = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        segment += characters[randomIndex];
      }
      return segment;
    }

    result = `${getRandomSegment()}-${getRandomSegment()}-${getRandomSegment()}`;

    return result;
  }

  const handleSubmit = (ev) => {
    ev.preventDefault();

    const newItem = {
      id: generateRandomID(),
      name: name,
      amount: +amount,
      price: +price,
      category: category,
      description: description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setItems((state) => {
      const itemsList = [...state, newItem];

      localStorage.setItem("items", JSON.stringify(itemsList));

      return itemsList;
    });

    setName("");
    setAmount("");
    setPrice("");
    setCategory("");
    setDescription("");

    alert(`Item "${name}" cadastrado com sucesso!`);
  };

  return (
    <>
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
          Cadastrar
        </button>
      </form>
    </>
  );
}
