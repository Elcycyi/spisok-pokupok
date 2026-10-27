import { type Product } from '../types/product'

interface ProductItemProps {
    product: Product;
    onDelete: (id: number) => void;
}

function ProductItem({ product, onDelete }: ProductItemProps) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center">
            <span>{product.name}</span>
            <span>
                <span className="me-3">{product.price} сом</span>
                <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(product.id)}
                >
                    Удалить
                </button>
            </span>
        </li>
    )
}

export default ProductItem;
