// import { useState } from "react";
// import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { signup } from "@/app/login/actions";

const Register = () => {
    // const { register } = useAuth();
    // const [email, setEmail] = useState("");
    // const [password, setPassword] = useState("");
    // const [confirmPassword, setConfirmPassword] = useState("");
    // const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);

    // const handleRegister = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError(null);

    //     try {
    //         await register(email, password);
    //         console.log("Registered successfully!");
    //     } catch (error) {
    //         setError(error.message);
    //         setLoading(false);
    //         return;
    //     }
    // };

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
            <div className="space-y-1">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                    id="confirm-password"
                    type="password"
                    name="confirmPassword"
                    // value={password}
                    // onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                />
            </div>
            {/* {error && <p className="text-red-500">{error}</p>} */}
            {/* <Button type="submit" disabled={loading}>
                {loading ? "Registering..." : "Register"}
            </Button> */}
            <button formAction={signup}>Register</button>
        </form>
    );
};

export default Register;
