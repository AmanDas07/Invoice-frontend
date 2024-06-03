import React, { useEffect, ReactNode } from 'react';
import Header from '../components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface LayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, keywords, author }) => {
    useEffect(() => {
        if (title) {
            document.title = title;
        }
        if (description) {
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) {
                metaDescription.setAttribute('content', description);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'description';
                meta.content = description;
                document.head.appendChild(meta);
            }
        }
        if (keywords) {
            const metaKeywords = document.querySelector('meta[name="keywords"]');
            if (metaKeywords) {
                metaKeywords.setAttribute('content', keywords);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'keywords';
                meta.content = keywords;
                document.head.appendChild(meta);
            }
        }
        if (author) {
            const metaAuthor = document.querySelector('meta[name="author"]');
            if (metaAuthor) {
                metaAuthor.setAttribute('content', author);
            } else {
                const meta = document.createElement('meta');
                meta.name = 'author';
                meta.content = author;
                document.head.appendChild(meta);
            }
        }
    }, [title, description, keywords, author]);

    return (
        <div>
            <Header />
            <main style={{ minHeight: '75vh' }}>
                <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                {children}
            </main>

        </div>
    );
}



export default Layout;
