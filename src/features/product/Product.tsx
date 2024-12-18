import { Link } from 'react-router-dom';
import { path } from 'src/constants';
import { Product as ProductType } from 'src/types/product.type';
import {
    formatCurrency,
    formatNumberToSocialStyle,
    generateNameId,
} from 'src/utils';
import ProductRating from './ProductRating';

interface ProductProps {
    product: ProductType;
}

const Product = ({ product }: ProductProps) => {
    console.log(
        `${path.home}${generateNameId({
            id: product._id,
            name: product.name,
        })}`,
    );
    return (
        <Link
            to={`${path.home}${generateNameId({
                id: product._id,
                name: product.name,
            })}`}
        >
            <div className="overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-md">
                <div className="relative w-full pt-[100%]">
                    <img
                        src={product.image}
                        alt="product"
                        className="absolute left-0 top-0 h-full w-full bg-white object-cover"
                    />
                </div>

                <div className="overflow-hidden p-2">
                    <div className="line-clamp-2 min-h-[2rem] text-xs">
                        {product.name}
                    </div>

                    <div className="mt-3 flex items-center">
                        <div className="max-w-[50%] truncate text-gray-500 line-through">
                            <span className="text-xs">₫</span>
                            <span className="text-sm">
                                {formatCurrency(product.price_before_discount)}
                            </span>
                        </div>
                        <div className="ml-1 truncate text-primary">
                            <span className="text-xs">₫</span>
                            <span className="text-sm">
                                {formatCurrency(product.price)}
                            </span>
                        </div>
                    </div>

                    <div className="mt-3 flex items-center justify-end">
                        <ProductRating rating={product.rating} />
                        <div className="ml-2 text-sm">
                            <span>
                                {formatNumberToSocialStyle(product.sold)}
                            </span>
                            <span className="ml-1">Đã bán</span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Product;
