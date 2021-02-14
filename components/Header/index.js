import Link from "next/link";

const Header = () => {
    return (
        <header className="bg-secondary bg-gradient p-3 shadow">
            <div className="container-fluid p-0">

                <Link href="/">
                    <a className="text-white fs-1 fw-bold text-decoration-none">
                        Country App
                    </a>
                </Link>
            </div>
        </header>
        
    );
}
 
export default Header;