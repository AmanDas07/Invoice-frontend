import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RootState } from '../../Reducers/app/store';
import Layout from './Layout/layout';

interface Product {
    productName: string;
    quantity: number;
    rate: number;
    amount: number;
}

const HomePage = () => {
    const navigate = useNavigate();
    const token = useSelector((state: RootState) => state.auth.token);

    const [products, setProducts] = useState<Product[]>([]);
    const [productName, setProductName] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(0);
    const [rate, setRate] = useState<number>(0);
    const [amount, setAmount] = useState<number>(0);
    const [companyName, setCompanyName] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {

            const deleteProducts = async () => {
                try {
                    await axios.delete(`${import.meta.env.VITE_API_URL}/products/deleteRecords`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    console.log('All products deleted successfully');
                } catch (error) {
                    console.error('Error deleting products:', error);
                }
            };

            deleteProducts();
        }
    }, [token, navigate]);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]);

    const addProduct = () => {
        if (!productName || quantity <= 0 || rate <= 0) {
            alert('Please fill out all product fields.');
            return;
        }

        setProducts([
            ...products,
            {
                productName,
                quantity,
                rate,
                amount: quantity * rate,
            },
        ]);

        setProductName('');
        setQuantity(0);
        setRate(0);
        setAmount(0);
    };

    useEffect(() => {
        setAmount(quantity * rate);
    }, [quantity, rate]);

    const createInvoice = async () => {
        if (!companyName || !dueDate || products.length === 0) {
            alert('Please fill out all fields and add at least one product.');
            return;
        }

        const invoiceData = {
            products,
            companyName,
            dueDate,
        };


        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/products/addProducts`, invoiceData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Invoice created successfully');
            navigate('/invoice');
        } catch (error) {
            console.error('Error creating invoice', error);
            alert('Failed to create invoice');
        }
    };

    const isFormValid = () => {
        return companyName && dueDate && products.length > 0;
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="flex justify-between items-center mb-4">
                    <div className="text-right">
                        <h1 className="text-4xl font-bold">INVOICE</h1>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="col-span-3 md:col-span-1">
                        <label htmlFor="from" className="block text-sm mb-1">Who is this invoice from? (required)</label>
                        <textarea
                            id="from"
                            className="w-full border p-2"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                        ></textarea>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-1 gap-4 mb-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="dueDate" className="block text-sm mb-1">Due Date</label>
                            <input
                                type="date"
                                id="dueDate"
                                className="w-full border p-2"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">Products</h2>
                    <div className="grid grid-cols-4 gap-4 mb-4">
                        <div>
                            <label htmlFor="product" className="block text-sm mb-1">Product</label>
                            <input
                                type="text"
                                id="product"
                                className="w-full border p-2"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="quantity" className="block text-sm mb-1">Quantity</label>
                            <input
                                type="number"
                                id="quantity"
                                className="w-full border p-2"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label htmlFor="rate" className="block text-sm mb-1">Rate</label>
                            <input
                                type="number"
                                id="rate"
                                className="w-full border p-2"
                                value={rate}
                                onChange={(e) => setRate(Number(e.target.value))}
                            />
                        </div>
                        <div>
                            <label htmlFor="amount" className="block text-sm mb-1">Amount</label>
                            <input
                                type="number"
                                id="amount"
                                className="w-full border p-2"
                                value={amount}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex justify-start">
                        <button
                            type="button"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            onClick={addProduct}
                        >
                            Add Product
                        </button>
                    </div>
                </div>
                <table className="min-w-full bg-white mb-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Rate</th>
                            <th className="py-2 px-4 border-b">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{product.productName}</td>
                                <td className="py-2 px-4 border-b">{product.quantity}</td>
                                <td className="py-2 px-4 border-b">{product.rate}</td>
                                <td className="py-2 px-4 border-b">{product.amount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-start">
                    <button
                        className={`px-4 py-2 rounded text-white ${isFormValid() ? 'bg-black' : 'bg-gray-400 cursor-not-allowed'}`}
                        onClick={createInvoice}
                        disabled={!isFormValid()}
                    >
                        Create Invoice
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default HomePage;
