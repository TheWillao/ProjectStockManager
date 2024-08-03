import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const items = JSON.parse(localStorage.getItem("items"));

  const limitDate = new Date().setDate(new Date().getDate() - 10);

  let recentItems;
  let lowQuantityItems;
  let totalInventory;

  if (items && items.length > 0) {
    recentItems = items.filter((item) => {
      return item.createdAt.toString() >= limitDate.toString();
    });
    lowQuantityItems = items.filter((item) => item.amount < 10);
    totalInventory = items.reduce((sum, item) => +sum + +item.amount, 0);

    return (
      <div className="h-100 p-5">
        <h1>Dashboard</h1>
        <div className="row gap-4 mt-5">
          <div className="d-flex flex-column col text-center bg-black rounded py-4 gap-3">
            <span>Diversidade de itens</span>
            <h3>{items?.length}</h3>
          </div>
          <div className="d-flex flex-column col text-center bg-black rounded py-4 gap-3">
            <span>Inventário total</span>
            <h3>{totalInventory}</h3>
          </div>
          <div className="d-flex flex-column col text-center bg-black rounded py-4 gap-3">
            <span>Itens recentes</span>
            <h3>{recentItems?.length}</h3>
          </div>
          <div className="d-flex flex-column col text-center bg-black rounded py-4 gap-3">
            <span>Itens acabando</span>
            <h3>{lowQuantityItems?.length}</h3>
          </div>
        </div>
        <div className="w-100 gap-4 mt-4 d-flex">
          <div className="d-flex w-50 text-center bg-black rounded py-4 px-5 gap-3 justify-content-between">
            <strong>Itens recentes</strong>
            <strong>Ações</strong>
          </div>
          <div className="d-flex w-50 text-center bg-black rounded py-4 px-5 gap-3 justify-content-between">
            <strong className="w-25">Itens acabando</strong>
            <strong className="ms-5">Qtde</strong>
            <strong>Ações</strong>
          </div>
        </div>
        <div className="w-100 d-flex gap-4 mt-2">
          <div className="rounded py-4 px-5 bg-black w-50 d-flex flex-column gap-4">
            {recentItems && recentItems.length > 0 ? (
              recentItems.map((item) => {
                return (
                  <div className="justify-content-between d-flex" key={item.id}>
                    <span className="w-25 text-truncate">{item.name}</span>
                    <Link to={`/items/${item.id}`}>
                      <button title="Visualizar">
                        <RemoveRedEyeOutlinedIcon />
                      </button>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="row d-flex w-100 px-5 justify-content-center">
                Não há itens recentemente cadastrados.
              </div>
            )}
          </div>
          <div className="rounded py-4 px-5 bg-black w-50 d-flex flex-column gap-4">
            {lowQuantityItems && lowQuantityItems?.length > 0 ? (
              lowQuantityItems.map((item) => {
                return (
                  <div className="justify-content-between d-flex" key={item.id}>
                    <span className="w-25 text-truncate">{item.name}</span>
                    <span className="ms-5">{item.amount}</span>
                    <Link to={`/items/${item.id}`}>
                      <button title="Visualizar">
                        <RemoveRedEyeOutlinedIcon />
                      </button>
                    </Link>
                  </div>
                );
              })
            ) : (
              <div className="row d-flex w-100 px-5 justify-content-center">
                Não há itens cadastrados acabando.
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="h-100 w-100 p-5">
        <h1>Dashboard</h1>
        <div className="pt-5 mt-5 w-100 d-flex justify-content-center">
          <h5>
            Nenhum item cadastrado. Clique <Link to="/items/new">aqui</Link>{" "}
            para cadastrar um novo item.
          </h5>
        </div>
      </div>
    );
  }
}
