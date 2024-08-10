import { Button } from "@/components/ui/button";
import { signOut } from "@/utils/actions/signOut";

const Logout = () => {
    return (
        <form action={signOut} method="POST">
            <Button type="submit">Logout</Button>
        </form>
    );
};

export default Logout;
