import Link from 'next/link'
import { useState } from 'react'

export const getStaticProps = async () => {

    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json()

    return {
        props: { countries: data }
    }
}

export default function Home({ countries }) {
    const [searchTerm, setSearchTerm] = useState('');


    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <input onChange={event => setSearchTerm(event.target.value)} placeholder="Search Country" />
                </div>
            </div>
            <div className="row pt-5">
                {
                    countries.filter((country) => {
                        if (searchTerm === '') {
                            return country
                        } else if (country.name.toLowerCase().includes(searchTerm.toLowerCase())) {
                            return country
                        }  
                    }).map(country => (
                        <div className="col-3 mb-3" key={country.name}>
                            <div className="card">
                                <img src={country.flag} alt={country.name} className="card-img-top" style={{ height: '175px' }} />
                                <div className="card-body">
                                    <h5 className="card-title">{country.name}</h5>
                                    <Link href={`/country/${country.alpha3Code}`}>
                                        <a className="btn btn-primary">Go {country.name} detail</a>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}