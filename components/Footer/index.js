import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-secondary bg-gradient p-3">
            <div className="container-fluid p-0">
                <Link href="/">
                    <a className="text-white fs-4 fw-bold text-decoration-none">
                        Country App
                    </a>
                </Link>
            </div>
        </footer>
        
    );
}
 
export default Footer;