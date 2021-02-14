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
    const [input, setInput] = useState('')
    const [select, setSelect] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()
        setInput(e.target.value)
    }

    const handleSelect = (e) => {
        e.preventDefault()
        setSelect(e.target.value)
        console.log(e.target.value)
    }

    // const bloc = countries.regionalBlocs.map((blocs) => {
    //     blocs.acronym
    // })

    if (input.length > 0) {
        countries = countries.filter((i) => {
            return i.name.toLowerCase().match(input)
        })
    }

    if (select) {
        countries = countries.filter((i) => {
            return i.region.toLowerCase().match(select);
        })
    }



    return (
        <div className="container pt-5 pb-5">
            <div className="row">
                <div className="col">
                    <input className="form-control" onChange={handleSearch} placeholder="Search Country..." id="search_input"/>
                </div>
                <div className="col">
                    <select className="form-select" aria-label="Order by Region" onChange={handleSelect} id="select_region">
                        <option value="all">Order by Region</option>
                        <option value="africa">Africa</option>
                        <option value="americas">Americas</option>
                        <option value="asia">Asia</option>
                        <option value="europe">Europe</option>
                        <option value="oceania">Oceania</option>
                    </select>
                </div>
            </div>
            <div className="row pt-5">
                {
                    countries.map(country => (
                        <div className="col-lg-3 col-md-6 mb-3 col-sm-12" key={country.name}>
                            <div className="card">
                                <Link href={`/country/${encodeURIComponent(country.alpha3Code.toLowerCase())}`}>
                                    <a><img src={country.flag} alt={country.name} className="card-img-top" style={{ height: '175px' }} /></a>
                                </Link>
                                
                                <div className="card-body">
                                    <h5 className="card-title text-center">{country.name}</h5>
                                    <Link href={`/country/${encodeURIComponent(country.alpha3Code.toLowerCase())}`}>
                                        <a className="btn btn-outline-secondary">Go {country.name} Detail</a>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
            <style jsx>
                {`
                    .card-body {
                        min-height:150px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                    }
                `}
            </style>
        </div>
        
    )
}