import {
    useState,
    useEffect
} from "react";

type Firework = {
    id: number;
    name: string;
    description: string;
    category: string;
    inventory: number;
    price: number;
};

const InventoryPage = () => {
    const [fireworks, setFireworks] = useState<Firework[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [password, setPassword] = useState<string>("");

    const predefinedPassword = "firecracker321"; // Replace with your actual password

    useEffect(() => {
        if (authenticated) {
            const fetchFireworks = async () => {
                try {
                    const response = await fetch('/api/get-inventory');
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setFireworks(data.fireworks);
                } catch (error: any) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchFireworks();
        }
    }, [authenticated]);

    const handleLogin = () => {
        if (password === predefinedPassword) {
            setAuthenticated(true);
        } else {
            alert("Incorrect password. Please try again.");
        }
    };

    if (!authenticated) {
        return (
            <div className="container mx-auto p-4 mt-10">
                <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
                    <h2 className="text-xl font-semibold text-center mb-4">Enter Password</h2>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        placeholder="Password"
                    />
                    <button
                        onClick={handleLogin}
                        className="mt-4 w-full bg-red-500 text-white py-2 rounded-md"
                    >
                        Submit
                    </button>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div>Retrieving Inventory...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (fireworks.length === 0) {
        return <div>No fireworks available.</div>;
    }

    return (
        <div className="container mx-auto">
            <div className="overflow-x-auto max-h-screen">
                <table className="min-w-full bg-white border border-gray-200">
                    <thead className="sticky top-0 bg-gray-200 z-10">
                        <tr>
                            <th className="py-2 px-4 border-b border-gray-200">ID</th>
                            <th className="py-2 px-4 border-b border-gray-200">Name</th>
                            <th className="py-2 px-4 border-b border-gray-200">Description</th>
                            <th className="py-2 px-4 border-b border-gray-200">Price</th>
                            <th className="py-2 px-4 border-b border-gray-200">Inventory</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fireworks.map((product) => (
                            <tr key={product.id} className="odd:bg-gray-100 even:bg-white">
                                <td className="py-2 px-4 border-b border-gray-200" data-label="ID">{product.id}</td>
                                <td className="py-2 px-4 border-b border-gray-200" data-label="Name">{product.name}</td>
                                <td className="py-2 px-4 border-b border-gray-200" data-label="Description">{product.description}</td>
                                <td className="py-2 px-4 border-b border-gray-200" data-label="Price">${product.price}</td>
                                <td className="py-2 px-4 border-b border-gray-200" data-label="Inventory">{product.inventory}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default InventoryPage;
