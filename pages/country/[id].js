import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Detail = ({ country }) => {
    const router = useRouter()
    const id = router.query

    


    return (
        <div>
            <Head>
                <title>{country.name } - Country Knowloedge App | kdrgny.dev</title>
            </Head>
            <div className="container vh-100">
                {/* top */}
                <div className="row pt-3 border-bottom border-2">
                    <div className="col">
                        <h1>{country.name}</h1>
                    </div>
                    <div className="col d-flex justify-content-end align-items-center">
                        <Link href="/">
                            <a className="btn btn-primary">Go Home</a>
                        </Link>
                    </div>
                </div>
                {/* content */}
                <div className="row pt-2 justify-content-between">
                    <div className="col-lg-3 col-md-12">
                        <div className="position-relative">
                            <img src={country.flag} alt={country.name} className="card-img-top" />
                            <div className="position-absolute bottom-0 end-0 translate-bottom pe-2 pb-2 text-white">
                                <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#flagModal">
                                    <i className="bi bi-zoom-in"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-12">
                        <ul className="list-group">
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Capital</strong>
                                <span className="badge bg-primary rounded-pill">{country.capital}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Population</strong>
                                <span className="badge bg-primary rounded-pill">{country.population?.toLocaleString('tr-TR')}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Area</strong>
                                <span className="badge bg-primary rounded-pill">{country.area?.toLocaleString('tr-TR')} km²</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Native Name</strong>
                                <span className="badge bg-primary rounded-pill">{country.nativeName}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Time Zones</strong>
                                <span className="badge bg-primary rounded-pill">{country.timezones}</span>
                            </li>
                            {
                                country.currencies.map(cur => (
                                    <li key={cur.name} className="list-group-item d-flex justify-content-between align-items-center">
                                        <strong>Currencies</strong>
                                        <span className="badge bg-primary rounded-pill">{cur.name} - {cur.symbol}</span>
                                    </li>
                                ))
                            }
                            {
                                country.languages.map(lang => (
                                    <li key={lang.name} className="list-group-item d-flex justify-content-between align-items-center">
                                        <strong>Language</strong>
                                        <span className="badge bg-primary rounded-pill">{lang.name}</span>
                                    </li>
                                ))
                            }
                            {
                                country.languages.map(lang => (
                                    <li key={lang.nativeName} className="list-group-item d-flex justify-content-between align-items-center">
                                        <strong>Native Name</strong>
                                        <span className="badge bg-primary rounded-pill">{lang.nativeName}</span>
                                    </li>
                                ))
                            }
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Calling Code</strong>
                                <span className="badge bg-primary rounded-pill">{country.callingCodes}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Region</strong>
                                <span className="badge bg-primary rounded-pill">{country.region}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                <strong>Sub Region</strong>
                                <span className="badge bg-primary rounded-pill">{country.subregion}</span>
                            </li>
                            {
                                country.regionalBlocs.map(bloc => (
                                    <li key={bloc.name} className="list-group-item d-flex justify-content-between align-items-center">
                                        <strong>Regional Bloc</strong>
                                        <span className="badge bg-primary rounded-pill">{bloc.name}</span>
                                    </li>
                                ))
                            }

                        </ul>

                    </div>

                    <div className="col-lg-4 col-md-12">
                        <div>
                            <iframe
                                width={"100%"}
                                height={"500"}
                                frameBorder={"0"}
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyD6-PjisbRt3L07W9s8phZueN_OAsHWaF4&q=${country.name}&zoom=4`}>
                            </iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal" id="flagModal">
                <div className="modal-dialog modal-dialog-centered modal-xl">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1>{country.name} Flag</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <img src={country.flag} alt={country.name} className="w-100" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export const getStaticPaths = async () => {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();

    // Get the paths we want to pre-render based on posts
    const paths = data.map(country => {
        return {
            params: { id: country.alpha3Code.toLowerCase() }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async (context) => {
    const id = context.params.id;

    const res = await fetch('https://restcountries.eu/rest/v2/alpha/' + id);
    const data = await res.json();

    return {
        props: {
            country: data
        }
    }
}



export default Detail;