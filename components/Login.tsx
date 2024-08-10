// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import  {login} from '../app/login/actions'

const Login = () => {
    /* const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await login(email, password);
            console.log("Logged in successfully!");
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }; */

    return (
        <form  className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                    id="password"
                    type="password"
                    name="password"
                    // value={password}
                    // onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
            </div>
            {/* {error && <p className="text-red-500">{error}</p>} */}
            {/* <Button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
            </Button> */}
            <button formAction={login}>Submit</button>
        </form>
    );
};

export default Login;
