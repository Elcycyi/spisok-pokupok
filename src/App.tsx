import { useState } from 'react'
import { type Product } from './types/product'
import ProductItem from './components/ProductItem'

// Пара товаров, чтобы список не был пустым при первом открытии
const начальныеТовары: Product[] = [
    { id: 1, name: "Телефон", price: 25000 },
    { id: 2, name: "Наушники", price: 3500 },
];

function App() {
    // state — то, что React отслеживает: поменялось, значит надо перерисовать
    const [products, setProducts] = useState<Product[]>(начальныеТовары);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    // Общая стоимость: складываем цены всех товаров.
    // Считается заново при каждой перерисовке, хранить отдельно не нужно.
    const total = products.reduce((сумма, product) => сумма + product.price, 0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();                 // иначе страница перезагрузится

        if (name.trim() === "" || price === "") {
            return;                         // пустое не добавляем
        }

        const newProduct: Product = {
            id: Date.now(),                 // простой способ получить разные id
            name: name,
            price: Number(price),
        };

        // Новый массив, а не push: React сравнивает ссылки, а не содержимое,
        // и при push ссылка осталась бы прежней — перерисовки бы не случилось.
        setProducts([...products, newProduct]);

        setName("");
        setPrice("");
    };

    const handleDelete = (id: number) => {
        // filter оставляет все товары, КРОМЕ того, у кого совпал id
        setProducts(products.filter((product) => product.id !== id));
    };

    return (
        <div className="container py-5" style={{ maxWidth: 640 }}>
            <h1 className="mb-4">Список покупок</h1>

            <ul className="list-group mb-3">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        onDelete={handleDelete}
                    />
                ))}
            </ul>

            {products.length === 0 && (
                <p className="text-muted">Список пуст, добавь первый товар.</p>
            )}

            <p className="fs-5">
                <strong>Общая стоимость: {total} сом</strong>
            </p>

            <form className="row g-2 mt-4" onSubmit={handleSubmit}>
                <div className="col-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Название"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="col-4">
                    <input
                        type="number"
                        className="form-control"
                        placeholder="Цена"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="col-2">
                    <button type="submit" className="btn btn-primary w-100">
                        Добавить
                    </button>
                </div>
            </form>
        </div>
    )
}

export default App;
