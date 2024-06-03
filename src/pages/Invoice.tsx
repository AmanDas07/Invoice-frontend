import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './Layout/layout';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useSelector } from 'react-redux';
import { RootState } from '../../Reducers/app/store';

interface Product {
    productName: string;
    quantity: number;
    rate: number;
    amount: number;
}

const InvoicePage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [dueDate, setDueDate] = useState<string>('');
    const [total, setTotal] = useState<number>(0);
    const GST_RATE = 0.18;
    const token = useSelector((state: RootState) => state.auth.token);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/products/getProductData`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                const data = response.data;

                setProducts(data.products);
                setDueDate(data.dueDate);
                const totalAmount = data.products.reduce((acc: number, product: Product) => acc + product.amount, 0);
                setTotal(totalAmount);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [token]);

    const gstAmount = total * GST_RATE;
    const grandTotal = total + gstAmount;

    const downloadPDF = () => {
        const doc = new jsPDF();
        doc.text('INVOICE GENERATOR', 10, 10);

        autoTable(doc, {
            head: [['Product', 'Qty', 'Rate', 'Total']],
            body: products.map(product => [
                product.productName,
                product.quantity,
                product.rate,
                `INR ${product.amount.toLocaleString()}`
            ]),
        });

        const finalY = (doc as any).lastAutoTable.finalY;
        doc.text(`Total: INR ${total.toLocaleString()}`, 10, finalY + 10);
        doc.text(`GST: 18%`, 10, finalY + 20);
        doc.text(`Grand Total: ₹ ${grandTotal.toLocaleString()}`, 10, finalY + 30);
        doc.text(`Valid until: ${new Date(dueDate).toLocaleDateString()}`, 10, finalY + 40);
        doc.save('invoice.pdf');
    };

    return (
        <Layout>
            <div className="container mx-auto p-4">
                <div className="text-right">
                    <h1 className="text-4xl font-bold">INVOICE GENERATOR</h1>
                </div>
                <table className="min-w-full bg-white my-4">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b text-left">Product</th>
                            <th className="py-2 px-4 border-b text-left">Qty</th>
                            <th className="py-2 px-4 border-b text-left">Rate</th>
                            <th className="py-2 px-4 border-b text-left">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{product.productName}</td>
                                <td className="py-2 px-4 border-b">{product.quantity}</td>
                                <td className="py-2 px-4 border-b">{product.rate}</td>
                                <td className="py-2 px-4 border-b">INR {product.amount.toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="flex justify-end my-4">
                    <div className="w-1/3">
                        <div className="flex justify-between py-2">
                            <span>Total</span>
                            <span>INR {total.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>GST</span>
                            <span>18%</span>
                        </div>
                        <div className="flex justify-between py-2">
                            <span>Grand Total</span>
                            <span className="text-blue-500">₹ {grandTotal.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
                <div className="my-4">
                    <p>Valid until: <strong>{new Date(dueDate).toLocaleDateString()}</strong></p>
                </div>
                <div className="flex justify-start">
                    <button className="px-4 py-2 bg-black text-white rounded" onClick={downloadPDF}>
                        Download PDF
                    </button>
                </div>
            </div>
        </Layout>
    );
};

export default InvoicePage;
